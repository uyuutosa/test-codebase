# ベースイメージとして Node 18 を使用
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# パッケージファイルをコピーして依存関係をインストール
COPY src/frontend/package*.json ./
RUN npm install

# フロントエンドのファイルをコピー
COPY src/frontend /app

# React アプリをビルド
RUN npm install
