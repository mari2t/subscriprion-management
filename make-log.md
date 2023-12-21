# make-log

## 2023/12/21

1. prismaのブラウザ確認。npx prisma studio
2. Postテーブル（デフォルトで記載あったもの）削除、変数名変更したあとnpx prisma studioでエラー。  
   マイグレーションしなかったため。下記手順で直った。
   1. npx prisma migrate dev --name modify_impression
   2. npx prisma generate
3. 感想テーブルからeditを削除（感想を書き直すより機会はあまりなさそうだったため）
4. 課金頻度について、●日ごとと毎月●日はどう処理したらいいのだろう。

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
