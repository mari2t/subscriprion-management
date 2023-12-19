# plan-log

## overview

1. サブスクリプション料金の一定期間の金額を目視したい
2. サブスクリプションの利用状況を簡単に知りたい
3. 継続するかどうかの参考とするため、サブスクリプションを使用した感想を投稿したい

## DB設計

### サブスクリプションテーブル

| FiledName     | DataType  | Extra      |
| ------------- | --------- | ---------- |
| id            | number    | ID         |
| name          | string    | サブスク名 |
| overview      | string    | 概要       |
| contracted_at | timestamp | 登録した日 |
| fee           | number    | 料金       |
| frequency     | number    | 課金頻度   |
| url           | string    | 課金URL    |
| image         | string    | 画像       |

### 感想テーブル

| FiledName     | DataType  | Extra                  |
| ------------- | --------- | ---------------------- |
| impression_id | number    | ID                     |
| name          | string    | サブスク名             |
| comment       | string    | 感想                   |
| rating        | number    | レイティング（５段階） |
| posted_at     | timestamp | 投稿した日             |

## やらないこと

1. サブスクリプションの料金が契約途中で変更されたときの処理
