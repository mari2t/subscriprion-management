# plan-log

## overview

1. サブスクリプション料金の一定期間の金額を目視したい
2. サブスクリプションの利用状況を簡単に知りたい
3. 継続するかどうかの参考とするため、サブスクリプションを使用した感想を投稿したい

## DB設計

### サブスクリプションテーブル

| FieldName       | DataType  | Extra              |
| --------------- | --------- | ------------------ |
| id              | number    | サブスクテーブルID |
| name            | string    | サブスク名         |
| overview        | string    | 概要               |
| fee             | number    | 料金               |
| billingType     | string    | 課金タイプ         |
| billingInterval | number    | 課金間隔           |
| url             | string    | 課金URL            |
| contracted_at   | timestamp | 契約日             |
| updated_at      | timestamp | 情報を更新した日   |
| image           | string    | 画像               |

### 感想テーブル

| FiledName     | DataType  | Extra                  |
| ------------- | --------- | ---------------------- |
| impression_id | number    | 感想テーブルID         |
| id            | number    | サブスクテーブルID     |
| comment       | string    | 感想                   |
| rating        | number    | レイティング（５段階） |
| posted_at     | timestamp | 投稿した日             |

## やらないこと

1. サブスクリプションの料金が契約途中で変更されたときの処理
2. うるう年の2月月末での契約（特殊な契約日）の処理
3. お試し無料期間の算定
