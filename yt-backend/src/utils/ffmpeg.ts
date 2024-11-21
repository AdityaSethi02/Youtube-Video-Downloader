import ffmpeg from "fluent-ffmpeg";
import path from "path";

export const cropVideo = (filePath: string, startTime: string, endTime: string): Promise<string> => {
    const croppedPath = path.join(path.dirname(filePath), "cropped_video.mp4");
    return new Promise((resolve, reject) => {
        ffmpeg(filePath)
        .setStartTime(startTime)
        .setDuration(endTime)
        .output(croppedPath)
        .on("end", () => resolve(croppedPath))
        .on("error", (err: any) => reject(err))
        .run();
    });
};
