export const predictBreed = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Prediction request failed");

  return await response.json();
};

