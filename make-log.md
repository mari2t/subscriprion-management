# make-log

## 2023/12/28

1. 感想を削除したあとにリロードした画面で感想が消えていない。
2. サブスクリプション登録同様、void allImpressions.refetch();を入れたら感想消去後即消えるようになった。
3. 今月の課金金額追加。
4. 削除後の処理はawaitを使うことにした。（2の処理だと即時反映されない場合があったので）
5. 完成
6. [Readme作成](./README.md)

## 2023/12/27

1. styleを統一。
2. 平均レーティングを追加。

## 2023/12/26

1. Next.jsにはlayout.tsxがあってそこでHeaderを設定したけどT3にはlayout.tsxは無いらしい。
2. Header作成。

## 2023/12/25

1. 感想ページ作成。感想削除削除機能追加。
2. サブスクの削除機能追加。サブスクとその感想すべて削除。
3. 画像の取り扱いが難しい。保存はS3とかじゃないとWebアプリはダメっぽい？
4. 画像はやめて文字に変えた。

## 2023/12/24

1. 編集ページ、入力がある場合とない場合向けに修正。

## 2023/12/23

1. 編集のidページ作成。

## 2023/12/22

1. prismaのスキーマに1行追加したらマイグレーションでエラー。
   既存のデータを削除したらマイグレーションできた。
2. DBに登録できないエラー。billingIntervalRef.current.valueがstringだった。
3. 1時間くらいDB登録できなくて悩んでいたけど解決。
   ChatGPTにコード入れたりして修正している間に契約URL入力欄がなくなっていて
   urlRef.currentが無かった…。

## 2023/12/21

1. prismaのブラウザ確認。npx prisma studio
2. Postテーブル（デフォルトで記載あったもの）削除、変数名変更したあとnpx prisma studioでエラー。  
   マイグレーションしなかったため。下記手順で直った。
   1. npx prisma migrate dev --name modify_impression
   2. npx prisma generate
3. 感想テーブルからeditを削除（感想を書き直す機会はあまりなさそうだったため）
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
