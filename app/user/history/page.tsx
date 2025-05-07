"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";


export default function RecentSearchesPage() {
  interface SearchItem {
    image_url?: string;
    plant: string;
    preparation_usage?: string[];
  }

  const [recentSearches, setRecentSearches] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentSearches = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/plant_history", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Replace with actual token storage
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("No history found");
        }

        const data = await response.json();
        setRecentSearches(data.history); // Assuming the response contains a `history` array
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentSearches();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Searches</CardTitle>
          <CardDescription>View your recent leaf identification history</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="space-y-4">
              {recentSearches.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.svg?height=64&width=64"} // Use image_url if available
                      alt={item.plant}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.plant}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.preparation_usage?.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
