# AlexaSkillsのデバッグ方法

### AWS Lambda側の手順

[Amazon AWS](https://aws.amazon.com/)サイトからサインインする

![image](https://user-images.githubusercontent.com/28590220/28912949-45f5f0ec-7871-11e7-9002-2e2de3f9ea8c.png)

Lambdaを選択し、

![image](https://user-images.githubusercontent.com/28590220/28913038-91f5c7ec-7871-11e7-93df-d9dd7d8433de.png)

自分が作ったFunction nameをダブルクリックする


![image](https://user-images.githubusercontent.com/28590220/28913097-ce5b9cf2-7871-11e7-8565-36eef90c374b.png)

この画面が出たら、自分が作ったコードのindex.jsとnode_modulesフォルダをzipファイルにまとめて、Function Packageの部分にUploadする。

![image](https://user-images.githubusercontent.com/28590220/28913138-f5961a9a-7871-11e7-939d-294354cd7af7.png)

アップできれば、左上の部分にSaveとSave&Testが出てくるので、Saveボタンを押す。こちら側はこれで完了。

## AmazonDeveloper(Alexa側)

[AmazonDeveloper](https://developer.amazon.com/)サイトからサインインする
左上のサインインボタンから入り、パスワードとメールアドレスを入力する

![image](https://user-images.githubusercontent.com/28590220/28913336-9e05178a-7872-11e7-97ab-55c1a0de5a25.png)

サインインした後に、この画面のAlexaのボタンを押す

![image](https://user-images.githubusercontent.com/28590220/28913435-f7dae474-7872-11e7-91bb-b486fe1bfb13.png)

Alexa Skills KitのGet Startedボタンを押し、

![image](https://user-images.githubusercontent.com/28590220/28913481-2b086aec-7873-11e7-89bb-39e88f1d8e93.png)

Building Alexa Skills with the Alexa Skills Kitの画面が出てきたら、右上のAdd a New Skillボタンをおす(画像割愛)

Create a New Alexa Skill画面が出たら、適当に自分の作成したSkillの名前とInvocation Nameを作成して、下部のSaveボタンをおした後、Nextボタンが表示されるので、押す。


![image](https://user-images.githubusercontent.com/28590220/28913589-824bbfa2-7873-11e7-82e7-2b36d2bbfd4e.png)

この画面が出てきたら、おそらく自分が作ったフォルダの中のspeechAssetsフォルダの中にIntentSchema.jsonがあるはずなのでそれをコピーして貼り付ける。

![amazon](https://user-images.githubusercontent.com/28590220/28914419-8bc18712-7876-11e7-82b7-59bfdae410fa.png)

<br>

逆に、Enter Valuesは何もしなくて良い。
同じくspeechAssetsフォルダの中のUtterances.txtをコピーしてSample Utterancesに貼り付けてNextボタンを押す。

![image](https://user-images.githubusercontent.com/28590220/28913795-3a75a9f8-7874-11e7-8b5e-92924ee1671b.png)

EndpointのService Endpoint TypeをAWS Lambda ARN(Amazon Resource Name)を選択し、NorthAmericaにチェックをつける。

[AWS Lambda](https://aws.amazon.com/)のZIPフォルダをアップロードするページの右上にARN - arn:aws:lambda~~　のような部分があるのでarnから以下をコピーしてNorthAmericaの下のチェックボックスに貼り付ける。

Nextボタンを押す。

![amazon](https://user-images.githubusercontent.com/28590220/28914372-5ca34420-7876-11e7-96e5-e55f4c663aea.png)

テスト画面に以降したら、Enter Utteranceから指示をだし、LambdaResponceを見ながらデバッグをしよう。

![image](https://user-images.githubusercontent.com/28590220/28914092-63b31296-7875-11e7-91f9-47881b96d4f4.png)




<br>
<br>
<br>

how to make original slot

![image](https://user-images.githubusercontent.com/28590220/28924689-8ba19552-789d-11e7-99d3-0960508678b6.png)