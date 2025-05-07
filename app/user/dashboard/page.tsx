"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

export default function DashboardPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Reset results
      setResults(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsAnalyzing(false);
      setResults(response.data);
      setActiveTab("results"); // Switch to results tab after analysis
    } catch (error: any) {
      setIsAnalyzing(false);

      // If unauthorized, redirect to login page
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token"); // Clear invalid token
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Error analyzing file:", error);
      }
    }
  };

  // useEffect(() => {
  //   if (activeTab === "results" && !results) {
  //     setActiveTab("upload");
  //   }
  // }, [activeTab, results]);

  return (
    <div className="min-h-screen w-full bg-green-50">
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold text-green-800 mb-6">
          Plant Identification
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Leaf</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <Card>
              <CardHeader>
                <CardTitle>Upload a Leaf Image</CardTitle>
                <CardDescription>
                  Take a clear photo of a medicinal plant leaf to identify its
                  properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:bg-gray-50 cursor-pointer relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    {preview ? (
                      <div className="relative w-full max-w-md h-64">
                        <Image
                          src={preview || "/placeholder.svg"}
                          alt="Leaf preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 text-green-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">
                          Upload an image
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Drag and drop or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supports JPG, PNG, HEIC (max 10MB)
                        </p>
                      </>
                    )}
                  </div>
                  {selectedFile && (
                    <div className="flex justify-center">
                      <Button
                        onClick={handleAnalyze}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={isAnalyzing}
                      >
                        {isAnalyzing ? "Analyzing..." : "Analyze Leaf"}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Identification Results</CardTitle>
                <CardDescription>
                  {results
                    ? "Detailed information about your plant"
                    : "Upload a leaf image to see results"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="flex">
                    {/* Display the analyzed image */}
                    {results.image_path && (
                      <div className="relative w-full max-w-md h-64 mx-auto">
                        <Image
                          src={`http://127.0.0.1:5000/${results.image_path}`}
                          alt="Analyzed Leaf"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      {/* Plant Name */}
                      <h3 className="text-xl font-bold text-green-800">
                        {results.predicted_class}
                      </h3>

                      {/* Medical Data */}
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Medical Uses
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {results.medical_data["Medical Uses"].map(
                            (use: string, index: number) => (
                              <li key={index}>{use}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Medicinal Properties
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {results.medical_data["Medicinal Properties"].map(
                            (prop: string, index: number) => (
                              <li key={index}>{prop}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Preparation & Usage
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {results.medical_data["Preparation & Usage"].map(
                            (prep: string, index: number) => (
                              <li key={index}>{prep}</li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Medicinal Data
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {results.medical_data["Medicinal Data"]}
                        </ul>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">
                          Part Used
                        </h4>
                        <ul className="list-disc list-inside text-gray-600">
                          {results.medical_data["Part Used"].map(
                            (prep: string, index: number) => (
                              <li key={index}>{prep}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-700">
                      No results yet
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 max-w-md">
                      Upload a leaf image and analyze it to see detailed
                      medicinal information
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setActiveTab("upload")}
                    >
                      Go to Upload
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
