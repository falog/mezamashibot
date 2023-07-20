//Discord Token
const YOUR_DISCORD_TOKEN =''; 
//メッセージを出力したいテキストチャンネル (DiscordのチャンネルIDをコピー)
const TEXT_CHANNEL_ID='';
//入りたいボイスチャンネル (DiscordのチャンネルIDをコピー)
const VOICE_CHANNEL_ID=''; 
// メッセージ
const MESSAGE = '今日はYYYY年MM月DD日HH時mm分 ボイスに入るねー！　今回はどんなアラームが鳴るかな？'; 

const { Client, GatewayIntentBits } = require('discord.js');
const {
  joinVoiceChannel,
  VoiceConnectionStatus,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  entersState
} = require('@discordjs/voice');
const moment = require('moment');
const cron = require('node-cron');
const glob = require('glob');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

let shouldStop = false;

cron.schedule('0 8 * * *', async function() {
  const currentTime = moment();
  const textChannel = client.channels.cache.get(TEXT_CHANNEL_ID);
  
  if (textChannel && (textChannel.type === 0 || textChannel.type === 2)) {
    textChannel.send(
      currentTime.format(
        MESSAGE
      )
    );
  }

  const voiceChannel = client.channels.cache.get(VOICE_CHANNEL_ID);

  if (voiceChannel && voiceChannel.type === 2) {
    const player = createAudioPlayer();
    const files = glob.sync('./alerm/*.+(mp3|mp4|m4a|wav|flv|ogg|flac)');

    async function playFile(channel, filePath) {
      const resource = createAudioResource(filePath);
      player.play(resource);

      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      await entersState(connection, VoiceConnectionStatus.Ready, 20e3);
      connection.subscribe(player);

      player.once(AudioPlayerStatus.Idle, () => {
        connection.destroy();
      });

      player.on('error', error => {
        console.error(error);
        connection.destroy();
      });
    }

    await playFile(voiceChannel, files[Math.floor(Math.random() * files.length)]);
  }
});

client.on('ready', () => {
  console.log("Running BOT");
});

client.login(YOUR_DISCORD_TOKEN);