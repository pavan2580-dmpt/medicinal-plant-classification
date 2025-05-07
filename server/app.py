from flask import Flask, request, jsonify,send_from_directory
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import os
from werkzeug.utils import secure_filename
from pymongo import MongoClient
import bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from datetime import timedelta, datetime

app = Flask(__name__)

CORS(app)

# MongoDB Configuration using MongoClient
MONGO_URI = "mongodb+srv://pavanganesh:pavanganesh@cluster0.axrs7n2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # Change if using MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["plant_db"]
users_collection = db["users"]
collection = db["plant_data"]
history_collection = db["prediction_history"]




# Configure JWT Secret Key
app.config["JWT_SECRET_KEY"] = "supersecretkey"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)
jwt = JWTManager(app)

# Load the saved model
loaded_model = tf.keras.models.load_model('plant_classification_model.h5')

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to preprocess the image
def preprocess_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.  # Normalize pixel values
    return img_array

# Replace with actual class labels
class_labels = [
    "Alstonia Scholaris", "Arjun", "Bael", "Basil", "Chinar", "Gauva", 
    "Jamun", "Jatropha", "Lemon", "Mango", "Pomegranate", "Pongamia Pinnata"
]

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to Plant Classification API'})

# User Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # Check if the user already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already registered'}), 400

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Store user in the database
    users_collection.insert_one({'name': name, 'email': email, 'password': hashed_password})

    # Generate JWT token
    access_token = create_access_token(identity=email)

    return jsonify({'message': 'User registered successfully', 'token': access_token, 'email': email, 'name': name}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = users_collection.find_one({'email': email})

    if not user or not bcrypt.checkpw(password.encode('utf-8'), user['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    # Generate JWT Token
    access_token = create_access_token(identity=email)

    return jsonify({
        'message': 'Login successful',
        'token': access_token,
        'email': user['email'],
        'name': user.get('name', 'User')  # Assuming 'name' field exists
    }), 200

# Plant Prediction Route (Protected)
@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Secure the filename and save the file
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Preprocess the image
    preprocessed_image = preprocess_image(file_path)

    # Make a prediction
    prediction = loaded_model.predict(preprocessed_image)
    predicted_class_index = np.argmax(prediction)
    predicted_class_label = class_labels[predicted_class_index]

    # Fetch plant data from the database
    plant_data = collection.find_one({
    "$or": [
        {"_id": predicted_class_label},
        {"Common Name": predicted_class_label}
    ]
})
    
    if not plant_data:
        return jsonify({'error': 'Plant data not found'}), 404

    # Get logged-in user's email
    email = get_jwt_identity()

    # Extract preparation usage for history
    preparation_usage = list(plant_data.get("Preparation & Usage", []))  # Convert set to list

    # Store image path in the history
    history_entry = {
        "email": email,
        "plant": predicted_class_label,
        "preparation_usage": preparation_usage,
        "image_path": file_path  # Store image path in history
    }
    history_collection.insert_one(history_entry)

    return jsonify({
        'predicted_class': predicted_class_label,
        'medical_data': plant_data,
        'image_path': file_path
    }), 200


@app.route('/plant_history', methods=['GET'])
@jwt_required()
def plant_history():
    # Get logged-in user's email from JWT
    email = get_jwt_identity()

    # Fetch history for the user
    user_history = list(history_collection.find({"email": email}, {"_id": 0}))

    if not user_history:
        return jsonify({'message': 'No history found for this user'}), 404

    # Modify the image path to return a full URL
    for entry in user_history:
        if 'image_path' in entry:
            entry['image_url'] = request.host_url + entry['image_path'].replace("\\", "/")  # Convert Windows path to URL format

    return jsonify({'history': user_history}), 200

@app.route('/uploads/<path:filename>')
def get_image(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True)
