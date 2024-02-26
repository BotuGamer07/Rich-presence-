const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'America/New_York', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1182941320457748611')
    .setType('STREAMING')
    .setURL('https://twitch.tv/gemop') //Must be a youtube video link 
    .setState('Botu on Top')
    .setName('Im Botu')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1200845159169015828/1211610871466561556/madara-uchiha.gif?ex=65eed38e&is=65dc5e8e&hm=3e7bfe1abe0f323cc5c926c5f7dc8688a5ce937eee4aae4796b1650f3ae6203a&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Botu') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1200845159169015828/1211610871059447848/madara-madara-uchiha.gif?ex=65eed38e&is=65dc5e8e&hm=9dd39ddf577e64672752e17c2bf5abc0114fc065723989f97cb1443b7ec08a2e&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('OP') //Text when you hover the Small image
    .addButton('WOLFISBACK ', 'https://dsc.gg/wolfisback')
    .addButton('Botu OP ', 'https://dsc.gg/botugamerop');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Botu on Top [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
