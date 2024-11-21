import React, { useState } from "react";

interface VideoCropperProps {
    url: string;
}

export const VideoCropper: React.FC<VideoCropperProps> = ({ url }) => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const handleCrop = () => {
        console.log("Cropping video from", startTime, "to", endTime);
        console.log(url);
    };

    return (
        <div className="my-4">
        <h2 className="text-xl font-semibold">Crop Video</h2>
        <input
            type="text"
            placeholder="Start Time (HH:MM:SS)"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="p-2 border rounded w-full mb-2"
        />
        <input
            type="text"
            placeholder="End Time (HH:MM:SS)"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="p-2 border rounded w-full mb-4"
        />
        <button
            onClick={handleCrop}
            className="bg-yellow-500 text-white p-2 rounded w-full"
        >
            Crop Video
        </button>
        </div>
    );
};
