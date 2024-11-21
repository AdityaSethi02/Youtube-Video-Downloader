import { Router } from "express";
import { getVideoDetails, processVideo } from "../utils/yt";
import { cropVideo } from "../utils/ffmpeg";

const router = Router();

// Fetch video details
router.post("/details", async (req, res) => {
    const { url } = req.body;
    try {
        const details = await getVideoDetails(url);
        res.json(details);
    } catch (error) {
        console.error("Error fetching video details:", error);
        res.status(500).json({ error: "Failed to fetch video details" });
    }
});

// Process video download (full or cropped)
router.post("/process", async (req, res) => {
    const { url, format, quality, startTime, endTime } = req.body;
    try {
        const filePath = await processVideo(url, format, quality);
        
        if (startTime && endTime) {
            const croppedPath = await cropVideo(filePath, startTime, endTime);
            res.download(croppedPath, () => {
                // Delete file after download
            });
        } else {
            res.download(filePath, () => {
                // Delete file after download
        });
        }
    } catch (error) {
        console.error("Error processing video:", error);
        res.status(500).json({ error: "Failed to process video" });
    }
});

export default router;
