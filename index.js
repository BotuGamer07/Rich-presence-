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
    .setName('BOTU')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1242932547659501640/1247379504943337582/3c3d83b3953c1dfbb42946042ddf67c6.gif?ex=665fd031&is=665e7eb1&hm=03f5e6ca80a0c71ab0a7426f62cfb59240f8b6fc5b4796f0299be89e4d9a34cb&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Lord') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1242932547659501640/1247379504326770758/IMG_0731.jpg?ex=665fd031&is=665e7eb1&hm=fa2c38339cd96e49055b482983fe194fa99a46eb4d795e0455b40d2e4d9669c3&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Botu') //Text when you hover the Small image
    .addButton('Youtube', 'https://youtube.com/@botu-mp3qv?feature=shared')
    .addButton('Discord', 'https://discord.com/invite/5cxxSVjmvM');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `Botu always on Top[${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
