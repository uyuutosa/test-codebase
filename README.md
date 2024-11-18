## セットアップ

### 前提条件

- Node.js 18.x
- Python 3.11
- Docker

### フロントエンドのセットアップ

1. 必要な依存関係をインストールします。

   ```sh
   cd src/frontend
   npm install
   ```

2. 開発サーバーを起動します。

   ```sh
   npm run dev
   ```

### バックエンドのセットアップ

1. 必要な依存関係をインストールします。

   ```sh
   pip install --no-cache-dir uv && uv sync
   ```

2. 開発サーバーを起動します。

   ```sh
   uvicorn src.backend.app:app --reload
   ```

### Docker を使用したセットアップ

1. Docker Compose を使用して、フロントエンドとバックエンドの両方を起動します。

   ```sh
   docker compose -f docker/docker-compose.yaml up
   ```

## 使用方法

### 画像のアップロードと処理

1. フロントエンドのアプリケーションにアクセスします。
2. 画像をアップロードすると、バックエンドで処理され、処理後の画像が表示されます。

## ディレクトリ構造の詳細

### フロントエンド

- [App.tsx](http://_vscodecontentref_/4): 画像のアップロードと処理を行うコンポーネント。
- [vite.config.ts](http://_vscodecontentref_/5): Vite の設定ファイル。
- [tsconfig.json](http://_vscodecontentref_/6): TypeScript の設定ファイル。

### バックエンド

- [app.py](http://_vscodecontentref_/7): FastAPI アプリケーションのエントリーポイント。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は`LICENSE`ファイルを参照してください。
