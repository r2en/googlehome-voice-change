# 簡易音声合成(.txtファイルから.wavファイルを生成するtip)

自社のAoG製品は、音声を声優に受託することが多い。<br>
声優に受託する前段階でエンジニアが音声ファイルとしてはじめから組み込めるように作成した。<br>

簡易的な音声合成をするために、[open-jtalk](http://open-jtalk.sp.nitech.ac.jp/)を使用する。<br>

### 環境構築
```
$ brew install open-jtalk
```

### 実行
```
$ node convText2Speech.js sample.txt
```

### 注意点
出力する音声ファイルの名前を決めてないため、output[i].wavとして出力されるので注意。
