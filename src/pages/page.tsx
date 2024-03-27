
"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

const LeftPage: React.FC = () => {
  const [bcfData, setBcfData] = useState<any>(null);
  const [promptsData, setPromptsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch BCF data
        const bcfResponse = await fetch(
          "https://demo6396395.mockable.io/bcf-board"
        );
        const bcfJson = await bcfResponse.json();
        setBcfData(bcfJson);

        // Fetch Prompts data
        const promptsResponse = await fetch(
          "https://demo6396395.mockable.io/promts"
        );
        const promptsJson = await promptsResponse.json();
        setPromptsData(promptsJson);

        // Data fetched successfully, set loading to false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If an error occurs, set loading to false to handle error state
        setLoading(false);
      }
    };

    // Call fetchData function when component mounts
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      {loading ? (
        // Display Skeleton component while data is being fetched
        <Skeleton />
      ) : (
        <div>
          <h1>Left Page</h1>
          {/* Render BCF data */}
          <div>
            <h2>BCF Data</h2>
            {bcfData && (
              <ul>
                {bcfData.map((item: any, index: number) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Render Prompts data */}
          <div>
            <h2>Prompts Data</h2>
            {promptsData && (
              <ul>
                {promptsData.map((item: any, index: number) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPage;
