"use client";
import { useState } from "react";

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
    const res = await fetch("/api/notice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
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
