"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Lightweight preview + convert fallback component.
export default function FilePreviewWithConvert({ filename, base64Data, tool, contentType }) {
  const router = useRouter();
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleConvert = async () => {
    setStatus("processing");
    try {
      const res = await fetch(`/api/utilities/${encodeURIComponent(tool)}/fileprocess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tool, data: base64Data, filename }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.success) {
        setStatus("done");
        setMessage("Conversion queued");
        if (body.result?.downloadUrl) {
          // redirect to result if provided
          router.push(body.result.downloadUrl);
        }
      } else if (res.status === 429) {
        setStatus("blocked");
        setMessage(body.message || "Usage limit reached");
      } else {
        setStatus("error");
        setMessage(body.message || "Conversion failed");
      }
    } catch (err) {
      setStatus("error");
      setMessage(String(err));
    }
  };

  if (!filename && !base64Data) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <p>No file data. Please upload first.</p>
        <button onClick={() => router.push('/utilities')} className="mt-4 text-blue-600">Back to tools</button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h3 className="font-semibold mb-2">Preview & Convert</h3>
      <p className="text-sm text-gray-600">{filename}</p>
      <div className="mt-4 flex gap-3">
        <button onClick={() => router.back()} className="text-sm text-blue-600">Back</button>
        <button onClick={handleConvert} className="px-4 py-2 bg-green-600 text-white rounded">
          {status === "processing" ? "Processing..." : "Convert"}
        </button>
      </div>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </div>
  );
}
