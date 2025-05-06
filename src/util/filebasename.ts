import path from "path";

export const getFileBaseName = (filePath: string): string => {
    return path.basename(filePath.substring(0, filePath.lastIndexOf(".")));
}