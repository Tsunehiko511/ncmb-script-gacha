# ncmb-script-gacha

Sample 'Gacha' script implement for Nifty-Cloud mobile backend.

  Copyright (c) 2016  KOYAMA Tetsuji
  This software is released under the MIT License, see LICENSE.txt.

[ニフティクラウドmobile backend](http://mb.cloud.nifty.com/) (NCMB) の[スクリプト](http://mb.cloud.nifty.com/function.htm#script)を用いた、ガチャ機能のサンプル実装です。

## ファイルの説明

* config.js
  * ガチャの設定情報を読み取る Config クラス
* chooser.js
  * 設定値を元に抽選を行う Chooser クラス
* logger.js
  * 抽選結果をログに書き出す Logger クラス
* main.js
  * リクエストのやり取りを行う本体
* nodegacha.js
  * ローカルの Node 環境でガチャ機能を実行するデバッグ用の本体
* call_script.js
  * NCMBにアップロードした gacha.js を実行する Node のサンプル

## gacha.js の作成

NCMB にアップロードする gacha.js は上記のファイルに分かれて実装されていますので、以下のコマンドで一つにまとめて下さい。

```
cat config.js chooser.js logger.js main.js > gacha.js
```

## 実行の前準備

gacha.js を実行する前に、NCMB のデータストアに前準備が必要です。

### ガチャの設定
Items クラスを作り、そこにガチャが出現する重みを記述します。
例えばスーパーレア(SR) が 1、レア(R) が 10 の割合で出したい場合、

| id | SR | R  |
|----|----|----|
|  1 |  1 | 10 |

というレコードを追加します。NCMB によって objectId, createDate, updateDate というフィールドが自動で追加されますが、無視されるので気にする必要はありません。

項目数に制限はありません、上記の設定にノーマル(N) 100 を追加したい場合は

| id | SR | R  |  N  |
|----|----|----|-----|
|  1 |  1 | 10 | 100 |

となります。

id はそのガチャの id で、複数のガチャ設定を持てるようになっています。整数であれば何でも構いません。


### ログ用のクラスを作成

ガチャの記録用に Counter, Log という 2 つのクラスをデータストアに作成しておきます。ここにはレコードが自動で追加されます。

## ガチャの実行

gacha.js は HTTP GET によるパラメータを2つ取ります。

* item
  * Items クラスの id フィールドに相当します。どのガチャ設定を用いるかを表します。
* user
  * ガチャを引いたユーザ名です。Log クラスに記録されます。

NCMB のウェブコンソールからは、Query フォームに

```
item=1&user=gachasample
```

のようにして実行できます。

## 記録

Log クラスに、userId, itemId, item が1件ずつ記録されます。

Counter クラスに、その itemId のガチャがそれぞれいくつ排出されたかの合計値が記録されます。
