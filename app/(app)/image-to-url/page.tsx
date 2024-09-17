"use client";
import { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "image_to_url"
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setImageUrl(data.secure_url); // Set the URL in the UI
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleCopyUrl = () => {
    if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Image Uploader</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered file-input-primary w-full mb-2"
      />

      {previewUrl && (
        <div className="max-w-full overflow-hidden rounded-lg shadow-lg">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto object-contain mb-2"
          />
        </div>
      )}

      {image && (
        <div className="mb-4">
          <button onClick={handleUpload} className="btn btn-primary w-full">
            Upload Image
          </button>
          <progress
            className="progress w-full mt-2"
            value={uploadProgress}
            max="100"
          ></progress>
        </div>
      )}

      {imageUrl && (
        <div className="mt-4">
          <input
            type="text"
            readOnly
            value={imageUrl}
            className="input input-bordered w-full mb-2"
          />
          <button onClick={handleCopyUrl} className="btn btn-secondary w-full">
            {isCopied ? "Copied!" : "Copy URL"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
