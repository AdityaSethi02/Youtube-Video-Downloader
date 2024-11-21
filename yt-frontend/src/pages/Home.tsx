import React, { useState } from "react";
import axios from "axios";
import { VideoCropper } from "../components/VideoCropper";
import { QualitySelector } from "../components/QualitySelector";

const Home: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [videoDetails, setVideoDetails] = useState<any>(null);

    const fetchDetails = async () => {
        try {
            console.log("Fetching details for:", url);
            const response = await axios.post("http://localhost:5000/api/video/details", { url });
            setVideoDetails(response.data);
        } catch (error) {
            console.error("Error fetching video details:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">YouTube Downloader</h1>
            <input
                type="text"
                placeholder="Paste YouTube URL"
                className="p-2 border rounded w-full mb-4"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <br />
            <button
                onClick={fetchDetails}
                className="bg-blue-500 text-white p-2 rounded w-full mb-4"
            >
                Fetch Details
            </button>
            {videoDetails && (
                <>
                <QualitySelector videoDetails={videoDetails} />
                <VideoCropper url={url} />
                </>
            )}
        </div>
    );
};

export default Home;
