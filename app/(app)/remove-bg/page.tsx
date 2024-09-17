"use client";
import { useState } from "react";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [bgRemovedImage, setBgRemovedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setBgRemovedImage(null); // Reset the background removed image
      setError(null); // Reset error on new file selection
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setProgress(0); // Reset progress
    setError(null); // Reset error before upload

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);

    reader.onloadend = async () => {
      const base64data = reader.result;

      try {
        const res = await fetch("/api/remove-bg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: base64data }),
        });

        if (!res.ok) {
          throw new Error("Failed to process the image");
        }

        const json = await res.json();
        setBgRemovedImage(json.url); // Set the background removed image

        setLoading(false);
        setProgress(100); // Set progress to 100% after successful upload
      } catch (err: any) {
        setError("Error: " + err.message); // Set the error message
        setLoading(false);
        setProgress(0); // Reset progress on failure
      }
    };

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setProgress(percentComplete); // Update the progress bar
      }
    };
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">
        Remove Background from Image
      </h1>

      <div className="flex flex-col items-center">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs mb-4"
        />

        {previewUrl && (
          <div className="flex flex-col items-center mb-4">
            <h3 className="mb-2">Selected Image Preview:</h3>
            <img src={previewUrl} alt="Image preview" className="max-w-xs" />
          </div>
        )}

        {loading && (
          <div className="w-56 mb-4">
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max="100"
            ></progress>
            <p>{progress}% completed</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          className={`btn btn-primary ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          Upload and Remove Background
        </button>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}

        {bgRemovedImage && (
          <div className="mt-4 flex flex-col items-center">
            <h3 className="mb-2">Background Removed Image Preview:</h3>
            <img
              src={bgRemovedImage}
              alt="Background removed"
              className="max-w-xs"
            />
            <a
              href={bgRemovedImage}
              download="background_removed_image.png"
              className="btn btn-secondary mt-2"
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
