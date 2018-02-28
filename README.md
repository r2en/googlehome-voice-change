## VoiceText Web API

### 環境
- Google Home
- Actions on google(Dialogflow)
- firebase 
- VoiceText Web API
- Google Cloud Storage

### システム概要
言った言葉を違う声で鸚鵡返ししてくれるシステム<br>
男性/女性/その他、の三種類の声を設定することができる<br>
音声ファイルはVoiceText Web APIというサービスを利用する<br>

<br>

![structure](https://user-images.githubusercontent.com/28590220/36677488-98dce4c2-1b51-11e8-9207-4440bce0e3f9.png)

<br>

### システム構成図<br>
1. 喋らせたい文字列をVoiceText Web APIに送信する<br>
2. VoiceText Web APIから mp3等の音声ファイルが送信される<br>
3. Google Homeの仕組み上、再生させたい音声ファイルはURL(hppts)化させてないといけない為、Azure上なり、Heroku上なり、GPC上なり、サーバにアップロードする必要がある<br>
4. サーバにあげた音声ファイルのURLをGoogleHomeのSSMLに乗せて、発言させることができる<br>

### VoiceText Web APIの特徴
| VoiceText Web API | 説明 | 制限 |
|:-----------|------------:|:------------:|
| speaker | ・ 男性(show, takeru)<br>・女性(haruka, hikari)<br>・不明(santa, bear)<br> |  |
| format | ・wav(圧縮なし)<br>・ogg<br>・mp3<br> |  |
| emotion | 感情カテゴリの指定。<br>・happiness <br>・anger <br>・sadness<br> | |
| emotions_level | 感情レベルの指定。<br>1~4を指定することが可能。<br>数値が大きいほど感情が大きくなる <br>|  |
| pitch | 音の高低を数値で指定する。<br>値が小さいほど低い音になる <br>| 50~200(%)まで指定可能 |
| speed | 話す速度を数値で指定する。<br>値が小さいほど遅い話し方になる <br>| 50~400(%)まで指定可能 |
| volume | 音量を数値で指定する。<br>値が小さいほど小さい音になる<br> | 50~200(%)まで指定可能 |

### 登録方法
![image](https://user-images.githubusercontent.com/28590220/36364056-25d86c3e-1585-11e8-9188-2c02c0b7f181.png)

無料利用登録のページから利用登録を行い、メールでAPIキーが届く<br>

<br>

## 音声を合成する ver.1

### 簡易音声合成 -curl-
curl コマンドの仕様で、YOUR_API_KEY の後ろには :(コロン) が必要なことに注意<br>

```rb
$ curl "https://api.voicetext.jp/v1/tts" \
     -o "test.wav" \
     -u "YOUR_API_KEY:" \
     -d "text=おはようございます" \
     -d "speaker=hikari"
```

### 感情を指定して音声を合成する
```rb
$ curl "https://api.voicetext.jp/v1/tts" \
     -u "YOUR_API_KEY:" \
     -d "text=おはようございます" \
     -d "emotion=sadness" \
     -d "emotion_level=2" \
     -d "speaker=hikari" | play -
```

```rb
$ curl "https://api.voicetext.jp/v1/tts" \
       -o "test.wav" \
       -u "YOUR_API_KEY:" \
       -d "text=おはようございます" \
       -d "speaker=hikari" \
       -d "emotion=happiness" \
       -d "emotion_level=2" \
       -d "pitch=105" \
       -d "speed=105"
```

## 音声を合成する ver.2

### 音声合成 -server-
### 1. NPMパッケージからVoiceText Web APIをインストールする

```rb
// VoiceText Web API
$ npm install voicetext --save
```

### 2. Firebaseにアクセスし、Adminの秘密鍵を取得する
![image](https://user-images.githubusercontent.com/28590220/36407774-84fc7dd0-1644-11e8-8a2f-75d4e393f7c1.png)
![image](https://user-images.githubusercontent.com/28590220/36407779-8a8ae3cc-1644-11e8-8fae-9016f1a6e9ed.png)
秘密鍵をダウンロード<br>

### 3. Google Cloud Platformにアクセスしてファイルの読み取り権限を追加する
デフォルトではファイルの読み取り権限がない為、Google Cloud Platformへログインして権限を付与する<br>

![image](https://user-images.githubusercontent.com/28590220/36407794-a9d1327c-1644-11e8-92e7-df4f9ab28011.png)

![image](https://user-images.githubusercontent.com/28590220/36407801-b26a26aa-1644-11e8-9c80-fa7428616302.png)

パケットの権限を編集して、オブジェクトの閲覧者にallUsersを追加する<br>

### 4. VoiceTextWebAPIのAPIキーを取得する
[VoiceTextWebAPI](https://cloud.voicetext.jp/webapi/api_keys/new)にアクセスする<br>
情報を入力した後に、登録したメールアドレスに、APIキーが配布されるので、それをメモする<br>

![image](https://user-images.githubusercontent.com/28590220/36407818-e0aec944-1644-11e8-9d93-69ef02c2fce2.png)

※ 企業名は指定しなくても使用することができる<br>

### 5. プログラム

#### VoiceTextWebAPIの動作をモジュール化<br>
音声を読み書きするために非同期処理のPromiseオブジェクトを使う<br>

VoiceTextWriter.jsを参照<br>

#### メインの処理

index.jsを参照<br>

### 6. 課題

#### 実用に絶えないレスポンスの速度の為に、何がボトルネックになっているのか、改善策はあるのかどうかを調査

##### 1. レスポンスの時間計測
- 計測した
##### 2. wavよりoggの方が早いかもしれないので比較調査
- 調査結果は下にある。正規分布する母集団の平均と分散が未知で且つ、標本サイズが小さく平均の推定を求められたためt分布を使用した
##### 3. stereo monoralでの変換可能か調査
- このAPIでは不可能が濃厚
##### 4. Nodejs WrapperのVoiceTextWebAPIのコードを見てみて、チャンク等をいじれるか調査
- いじれない
#### 5. RealTimeDatabaseに書き込みことで速度が向上するか調査
- ファイルのデータを Base64 エンコードして文字列化したものを、JSON につめて送信すれば一応保存はできるが、現在WEB APIの変換がボトルネックになっていると仮定して調査を中断

### 音声ファイルごとの速度を検証

```rb
                var bucket = admin.storage().bucket();
                const file = bucket.file('voice.ogg');
                const file = bucket.file('voice.mp3');
                const file = bucket.file('voice.wav');
                const stream = file.createWriteStream({
                    metadata: {
                      contentType: "audio/mpeg"
                      contentType: "audio/ogg"
                      contentType: "audio/x-wav"
                    }
```
```rb
                    let play_mp3 = '<speak>'
                    + '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.mp3">再生中...</audio>.'
                    + '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.ogg">再生中...</audio>.'
                    + '<audio src="https://storage.googleapis.com/voicetextwebapi.appspot.com/voice.wav">再生中...</audio>.'
                    + '</speak>'
```

```rb
            self.voice
                .speaker(Speaker)
                .emotion(self.voice.EMOTION.HAPPINESS)
                .emotion_level(self.voice.EMOTION_LEVEL.HIGH)
                .volume(300)
                .format('OGG')
```


### 推測統計を使う
#### 母集団が正規分布であることしか知識を持たず、母分散が未知の状態で少ない標本から母平均を推定する、95%予言的中区間<br>

T = (標本平均 - 母平均)  /  (標本標準偏差) * (Math.sqrt(自由度 - 1))<br>

![image](https://user-images.githubusercontent.com/28590220/36718744-37e0cf04-1be6-11e8-8af5-6515adc67986.png)

自由度(観測データの数) 30
-2.228 <= T <= +2.228


<img width="538" alt="2018-02-27 17 06 00" src="https://user-images.githubusercontent.com/28590220/36717217-95714dca-1be0-11e8-90c9-a9b328d9b90d.png">

自由度30

### wav
```rb
「おはよう」処理時間
女性 
平均値: 3928.633333333333
分散: 768030.8322222221
標準偏差: 876.373682981308

3596.3213011598796 < T < 4260.945365506786

男性
平均値: 3715.4
分散: 725337.7733333333
標準偏差: 851.667642530426

3392.4562483541663 < T < 4038.343751645834

「長文で話すとこれくらいの時間がかかりますよ」処理時間
女性 
平均値: 3847.7
分散: 795967.5433333333
標準偏差: 892.1701313837699

3509.3981144435834 < T < 4186.001885556416

男性
平均値: 3846.8
分散: 704850.3599999999
標準偏差: 839.5536671351033

3528.4497452373957 < T < 4165.150254762604
```

### ogg
```rb
「おはよう」処理時間
女性 
標本平均: 3934.133333333333
標本分散: 826426.1822222224
標本標準偏差: 909.0798547004672

3589.286118478864 < T < 4278.713881521136

男性
平均値: 3735.5666666666666
分散: 583222.3788888888
標準偏差: 763.6899756372927

3445.983156021771 < T < 4025.1501773115624

「長文で話すとこれくらいの時間がかかりますよ」処理時間
女性 
平均値: 3899.2
分散: 815662.9600000001
標準偏差: 903.1406092076693

3556.73822026788 < T < 4241.66177973212

男性
平均値: 3649.6666666666665
分散: 542614.5555555555
標準偏差: 736.6237544062474

3370.346393217515 < T < 3928.986940115818

```


### mp3
```rb
「おはよう」処理時間
女性
平均値: 3715.5333333333333
分散: 691501.9155555555
標準偏差: 831.5659417962928

3400.211943187879 < T < 4030.8547234787875

男性
平均値: 3960.4
分散: 831929.1733333335
標準偏差: 912.1015148180237

3614.5403355398025 < T < 4306.259664460198

「長文で話すとこれくらいの時間がかかりますよ」処理時間
女性
平均値: 3911.266666666667
分散: 778184.9288888891
標準偏差: 882.1479064697082

3576.7651073783345 < T < 4245.768225954999

男性
平均値: 3798
分散: 880431
標準偏差: 938.3128476153356

3442.201263387136 < T < 4153.798736612865
```

※ 今回の時間計測はループして書き込みを多重にしたために、処理時間が回数を重ねるごとに遅くなっている。その為、実際のレスポンスタイムとは異なり体感それらの-2秒したものが実際であると感じている。しかし、今回調べる必要があったのは個々の音声データの書き込みの速度差を求めることである。

参考文献
#### 速度関連
[オブジェクトのメタデータの表示と編集](https://cloud.google.com/storage/docs/viewing-editing-metadata?hl=ja)
[オブジェクトのメタデータ](https://cloud.google.com/storage/docs/metadata?hl=ja#mutable)
[MIME タイプの包括的な一覧](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)
[Firebase Realtime DBを実践投入するにあたって考えたこと](https://qiita.com/1amageek/items/64bf85ec2cf1613cf507)
[Firebase Realtime Databaseを使う手順 〜データ設計からセキュリティ、組み込みまで〜](https://qiita.com/etet-etet/items/56e9b2afaad9c4902a28)
[FirebaseのRealtime Databaseのざっくり概要](https://qiita.com/seiya1121/items/1436fde30752843daa47)
[Firebase Realtime Database](https://firebase.google.com/docs/database/?hl=ja)

#### Google Home アプリ
[サンプルアプリ作成](https://www.gaprot.jp/gaprot-x-chogiken/aiml/googleassistant)

#### 今回使用したAPI
[VoiceText Web API](https://cloud.voicetext.jp/webapi)


### 02/21参考文献
[VoiceText Web APIのNode.jsライブラリ作った](http://pchw.github.io/blog/2014/07/10/voicetext/)<br>
[JavaScriptでメソッドチェーンを作る](https://qiita.com/sawapi/items/279531c88709700d0ff1)<br>
[Raspberry Piをしゃべらせてみたよ。](https://pondad.net/iot/2016/02/13/raspberrypi-voice-text-web-api.html)<br>
https://github.com/pchw/node-voicetext<br>

### 02/22
[NodeJS モジュール定義について学ぶ](http://www.yoheim.net/blog.php?q=20150101)<br>
[VoiceTextを使ってsayコマンドよりいい感じに文章を読み上げる](http://alice345.hatenablog.com/entry/2014/07/16/001218)<br>
[node.jsで階層ディレクトリ作成やコピーをしたいときは？ require('fs')](https://qiita.com/okaxaki/items/981633485594baf622b0)<br>
[Node.jsでテキストファイルやバイナリファイルにデータを書き込む 同期的な書き込み: fs.writeFileSync('xxx', buf);](http://info-i.net/fs-writefile)<br>
[fs.writeFileの使い方。Node.jsでファイルを書き込み](https://photo-tea.com/p/17/fs-write-nodejs/)<br>
[ - Google Cloud Platform と統合する](https://firebase.google.com/docs/storage/gcp-integration?authuser=0)<br>
[Cloud Storage を Cloud Functions で拡張する](https://firebase.google.com/docs/storage/extend-with-functions?authuser=0)<br>
[Webで使ってみる](https://firebase.google.com/docs/storage/web/start?authuser=0)<br>
[Admin Cloud Storage API の概要](https://firebase.google.com/docs/storage/admin/start?hl=ja)<br>
[検索結果: Firebase Storage](https://www.google.co.jp/search?q=firebase+storage&oq=firebase+storage&aqs=chrome.0.69i59l3j69i60l3.3934j0j1&sourceid=chrome&ie=UTF-8)<br>

### 02/23
[Google Home:実機から開発中のGoogle Assistant のappをテストする方法](https://qiita.com/sitopp/items/67f226fa779ea9913951)<br>
[Dialogflow入門](https://qiita.com/kenz_firespeed/items/0979ceb05e4e3299f313)<br>
[Promiseと仲良くなって気持ち良く非同期処理を書こう](https://qiita.com/progre/items/03626b7f4655007d8cb2)<br>
[GCP Bucket](https://console.cloud.google.com/storage/browser/voicetextwebapi.appspot.com?project=voicetextwebapi&hl=ja&pli=1)<br>
[JavaScriptのPromiseで同期処理と非同期処理のタイミングを制御する](https://www.wareko.jp/blog/post-13612)<br>

