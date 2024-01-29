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
    .setName('BOTU GAMER')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1191074543469592597/1201416511252865055/standard_10.gif?ex=65c9bd51&is=65b74851&hm=8342543ae7a2cdd6aac899534b85502f3ce65192dc8b9172ece5303918188a90&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Botu') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1191074543469592597/1201418095185641532/20240115_073430.gif?ex=65c9becb&is=65b749cb&hm=27e98260be09cb8ab720ce2961ed2db3b66917333a3a26f10a959d59df22fccc&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('op') //Text when you hover the Small image
    .addButton('ImDoremon ', 'https://discord.com/invite/hdtUhc8p')
    .addButton('Botu op ', 'https://discord.com/invite/MHHfwyGn');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `BOTU GAMER on Top [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
