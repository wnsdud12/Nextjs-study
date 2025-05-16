"use client";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInsstance";

export default function NoticeForm({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("/api/notice", { title, content });

      const data = res.data;
      console.log("Response:", data);

      if (data.code === 200) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        if (onError) {
          onError(data.message || "Failed to create notice");
        }
      }
    } catch (error) {
      console.error("Error creating notice:", error);
      if (onError) {
        onError("An error occurred while creating the notice.");
      }
    }
  };

  return (
    <div className="w-full mx-auto">
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-1 mb-2"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-1 mb-2"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-1 rounded"
      >
        작성
      </button>
    </div>
  );
}
