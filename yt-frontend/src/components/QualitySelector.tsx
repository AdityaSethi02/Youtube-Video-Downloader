import React, { useState } from "react";

interface QualitySelectorProps {
    videoDetails: any;
}

export const QualitySelector: React.FC<QualitySelectorProps> = ({ videoDetails }) => {
    const [quality, setQuality] = useState<string>("720p");
    const [format, setFormat] = useState<"video" | "audio">("video");

    const handleDownload = () => {
        console.log("Downloading:", quality, format);
    };

    return (
        <div className="my-4">
        <h2 className="text-xl font-semibold">Select Quality</h2>
        <select
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            className="p-2 border rounded"
        >
            {videoDetails.formats.map((format: any) => (
            <option key={format.itag} value={format.resolution}>
                {format.resolution}
            </option>
            ))}
        </select>

        <div className="mt-4">
            <button
            onClick={() => setFormat("video")}
            className={`p-2 border rounded mr-2 ${format === "video" ? "bg-blue-500" : ""}`}
            >
            Video
            </button>
            <button
            onClick={() => setFormat("audio")}
            className={`p-2 border rounded ${format === "audio" ? "bg-blue-500" : ""}`}
            >
            Audio
            </button>
        </div>

        <button
            onClick={handleDownload}
            className="bg-green-500 text-white p-2 rounded w-full mt-4"
        >
            Download {format === "video" ? "Video" : "Audio"}
        </button>
        </div>
    );
};
