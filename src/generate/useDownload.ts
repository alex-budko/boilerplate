import JSZip from "jszip";
import { saveAs } from "file-saver";

interface FileResult {
  filename: string;
  content: string;
}

export const useDownload = (codeResults: FileResult[]) => {
  const handleDownload = () => {
    let zip = new JSZip();
    codeResults.forEach((file) => {
      zip.file(file.filename, file.content);
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "generated_code.zip");
    });
  };

  return { handleDownload };
};
