# make-log

## 2023/12/20

1. スキーマ構築、マイグレーション手順
   1. Googleスプレッドシートでざっと書く
   2. md形式へ変換
   3. md形式→スキーマ変換
   4. npx prisma migrate dev --name init
   5. npx prisma generate

## 2023/12/19

1. テーブルの要素名等決定。感想は「thoughts」「feelings」「impressions」「comments」？どれ？

## 2023/12/17

1. plan-logに目的、DB設計等記述。

## 2023/12/16

1. 作成
2. npm run devでエラー。  
   （エラー）For Next.js, Node.jp version >= v18.17.0 is required.  
   （解決）nodeのサイトからLTSをダウンロードしてインストール後エラーが解消された。
