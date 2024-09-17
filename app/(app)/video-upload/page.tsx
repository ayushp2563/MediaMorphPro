// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// function VideoUpload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [isUploading, setIsUploading] = useState(false);

//   const router = useRouter();

//   //max file size of 60 mb
//   const MAX_FILE_SIZE = 70 * 1024 * 1024;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!file) return;

//     if (file.size > MAX_FILE_SIZE) {
//       //TODO: add notification
//       alert("File size too large");
//       return;
//     }

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("originalSize", file.size.toString());

//     try {
//       const response = await axios.post("/api/video-upload", formData);
//       // check for 200 response
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//       // notification for failure
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="label">
//             <span className="label-text">Title</span>
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="input input-bordered w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Description</span>
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="textarea textarea-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="label">
//             <span className="label-text">Video File</span>
//           </label>
//           <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setFile(e.target.files?.[0] || null)}
//             className="file-input file-input-bordered w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           disabled={isUploading}
//         >
//           {isUploading ? "Uploading..." : "Upload Video"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default VideoUpload;

"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/VideoCard";

function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<any>(null);

  const router = useRouter();

  // max file size of 70 mb
  const MAX_FILE_SIZE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      //TODO: add notification
      alert("File size too large");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      const response = await axios.post("/api/video-upload", formData);
      // check for 200 response
      if (response.status === 200) {
        setUploadedVideo(response.data);
      }
    } catch (error) {
      console.log(error);
      // notification for failure
    } finally {
      setIsUploading(false);
    }
  };

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
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>

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
