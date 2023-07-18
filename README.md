# mezamashibot
Alarm BOT for Discord

# どんなBOTか

朝、６時、７時、８時、９時にボイスに入って概ね５分間音声ファイルををランダムで鳴らしてくれます。  
音声ファイルが終わったら次の音声ファイルが流れます。  
５分を超えた場合は音声ファイルが再生し終わってから落ちます。


音声ファイルは、各自用意してください。 サンプルとして公開しているものは、ご自由にお使いください。

# 使い方

node.jsをインストールしてください。  
その後以下のコマンドでpackageのインストールを行ってください。
> npm install

index.js内の各設定ファイルを設定してください。

YOUR_DISCORD_TOKEN  

TEXT_CHANNEL_ID 

VOICE_CHANNEL_ID 

MESSAGEIN 

MESSAGEOUT
