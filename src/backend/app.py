from io import BytesIO

import cv2
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 必要に応じてフロントエンドのURLを指定
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    # 画像を読み込む
    image = Image.open(BytesIO(await file.read())).convert("L")  # グレースケールに変換
    image_np = np.array(image)

    # Cannyエッジ検出を適用
    edges = cv2.Canny(image_np, 100, 200)

    # 結果をPILイメージに変換
    result_image = Image.fromarray(edges)

    # バイトストリームに結果を保存
    img_byte_arr = BytesIO()
    result_image.save(img_byte_arr, format="PNG")
    img_byte_arr.seek(0)

    # 画像をレスポンスとして返す
    return StreamingResponse(img_byte_arr, media_type="image/png")
