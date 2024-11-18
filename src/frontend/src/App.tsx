import React, { useState } from "react";
import axios from "axios";
import "./ImageUpload.scss";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [processedImageUrl, setProcessedImageUrl] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const apiUrl = import.meta.env.REACT_APP_API_URL || "http://localhost:8000";

  // ファイル選択ハンドラー
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // オリジナル画像の表示URLを設定
    const objectUrl = URL.createObjectURL(selectedFile);
    setOriginalImageUrl(objectUrl);

    // 画像を自動でアップロード
    await handleUpload(selectedFile);
  };

  // 画像のアップロードと処理された画像の取得
  const handleUpload = async (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // FastAPI サーバーに画像を送信
      const response = await axios.post(`${apiUrl}/upload-image/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // 画像をバイナリデータとして取得
      });

      // 処理後の画像URLを設定
      const processedImageUrl = URL.createObjectURL(response.data);
      setProcessedImageUrl(processedImageUrl);
    } catch (error) {
      console.error("画像のアップロードエラー", error);
    }
  };

  return (
    <div className="image-upload-container">
      <h2>画像のアップロードと処理</h2>

      {/* カスタムラベルでファイル入力をラップ */}
      <label className="custom-file-upload">
        画像のアップロード
        <input type="file" onChange={handleFileChange} style={{ display: "none" }} />
      </label>

      <div className="images-container">
        {/* 処理前の画像を左側に配置 */}
        {originalImageUrl && (
          <div className="image-wrapper">
            <h3>処理前の画像</h3>
            <img src={originalImageUrl} alt="Original" />
          </div>
        )}

        {/* 処理後の画像を右側に配置 */}
        {processedImageUrl && (
          <div className="image-wrapper">
            <h3>処理後の画像</h3>
            <img src={processedImageUrl} alt="Processed" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
