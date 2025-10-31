import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { predictBreed } from "./api/api"; // ✅ FIXED PATH

// ================== Home Page ==================
const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        Welcome to Moo Connect 🐃
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Identify buffalo breeds with AI — upload an image to get started!
      </p>
      <button
        onClick={() => navigate("/predict")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Try Breed Classifier
      </button>
    </div>
  );
};

// ================== Breed Classifier Page ==================
const BuffaloBreedClassifier: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult("");
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    setLoading(true);
    try {
      const response = await predictBreed(selectedFile);
      setResult(response.breed || "Unknown");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Buffalo Breed Classifier
      </h1>

      <div className="flex flex-col items-center gap-4 bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded w-full cursor-pointer"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 w-64 h-64 object-cover rounded-xl border"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Predicting..." : "Predict Breed"}
        </button>

        {result && (
          <p className="mt-6 text-xl font-medium text-green-600">
            Predicted Breed: {result}
          </p>
        )}
      </div>
    </div>
  );
};

// ================== Not Found Page ==================
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600">The page you’re looking for doesn’t exist.</p>
  </div>
);

// ================== App Wrapper ==================
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/predict" element={<BuffaloBreedClassifier />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
