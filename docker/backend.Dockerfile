# ベースイメージとして Python 3.11 を使用
FROM python:3.10-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存ライブラリをインストール
RUN apt-get update && \
    apt-get install -y libgl1 libglib2.0-0 && \
    rm -rf /var/lib/apt/lists/*

# 必要なファイルをコピー
COPY src/backend /app/src/backend
COPY pyproject.toml /app

# 依存関係をインストール
RUN pip install --no-cache-dir uv && uv sync
