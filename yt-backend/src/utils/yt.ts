import ytDlp from "yt-dlp-exec";
import path from "path";
import fs from "fs";

export const getVideoDetails = async (url: string) => {
    try {
        const result = await ytDlp(url, {
            dumpSingleJson: true,
        });

        const formats = result.formats.map((format: any) => ({
            itag: format.itag,
            resolution: format.resolution || format.format_note,
            fileType: format.ext,
        }));
        
        return { title: result.title, thumbnail: result.thumbnail, formats };
    } catch (error) {
        console.error("Error in getVideoDetails:", error);
        throw new Error("Failed to fetch video details");
    }
};

export const processVideo = async (url: string, format: string, quality: string) => {
    try {
        const outputDir = path.join(__dirname, "../../temp");
            if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        const outputPath = path.join(outputDir, `video.${format}`);
            await ytDlp(url, {
            output: outputPath,
            format: `${quality}+bestaudio`,
        });

        return outputPath;
    } catch (error) {
        console.error("Error in processVideo:", error);
        throw new Error("Failed to process video");
    }
};
