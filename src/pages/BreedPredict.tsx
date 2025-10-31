import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ImageIcon } from "lucide-react";

export default function BreedPredict() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(`Predicted Class: ${data.predicted_class}`);
      }
    } catch (err) {
      console.error(err);
      setResult("Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Buffalo Breed Classifier
          </h1>

          {preview ? (
            <img
              src={preview}
              alt="Uploaded Preview"
              className="w-64 h-64 object-cover rounded-xl border"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center border-2 border-dashed rounded-xl text-gray-400">
              <ImageIcon className="w-10 h-10" />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer text-blue-600 hover:underline"
          >
            {file ? "Change Image" : "Upload an Image"}
          </label>

          <Button
            onClick={handlePredict}
            disabled={!file || loading}
            className="w-full mt-3 bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" /> Predicting...
              </>
            ) : (
              "Predict Breed"
            )}
          </Button>

          {result && (
            <div className="mt-4 p-3 text-center bg-gray-100 rounded-md text-gray-800 w-full">
              {result}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
