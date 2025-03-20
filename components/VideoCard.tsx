import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import VideoCard from "@/components/VideoCard";

interface VideoCardProps {
  video: any;
  onDownload: (url: string, title: string) => void;
}

function VideoUpload(props: VideoCardProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleUploadSuccess = useCallback(
    async (result: any) => {
      setIsUploading(true);
      const { public_id, secure_url, bytes, duration } = result.info;

      try {
        const response = await axios.post("/api/video-upload", {
          title,
          description,
          publicId: public_id,
          url: secure_url,
          originalSize: bytes,
          duration,
        });

        if (response.status === 200) {
          setUploadedVideo(response.data);
        }
      } catch (error) {
        console.error("Error saving video details:", error);
        // TODO: Add error notification
      } finally {
        setIsUploading(false);
      }
    },
    [title, description]
  );

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${title}.mp4`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <CldUploadWidget
          uploadPreset="video-upload"
          onSuccess={handleUploadSuccess}
        >
          {({ open }) => (
            <button
              className="btn btn-primary"
              onClick={() => open()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Video"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {uploadedVideo && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Uploaded Video</h2>
          <VideoCard video={uploadedVideo} onDownload={handleDownload} />
        </div>
      )}
    </div>
  );
}

export default VideoUpload;
