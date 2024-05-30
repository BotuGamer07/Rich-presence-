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
    .setName('Gamer Botu')
    .setDetails(`THE NAME IT SHOWS YOUR STREAMING [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1242932547659501640/1245856238407909427/a_251d4e9c5504e98fa0d56832dc55da94_1.gif?ex=665a458a&is=6658f40a&hm=2d2f1b840b1a75ff2d32ad5d8a2c284f09a4cf1cbf8be39545718cd29479e87d&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Lord') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1242932547659501640/1245856237908922502/a_22fcb441e8a064bee1fe9d704e5bec52.gif?ex=665a458a&is=6658f40a&hm=b1066259b3fc69cc74851f2802ce2c0aa3276318cd7a3b9d77159450f4d9c3bc&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('Botu') //Text when you hover the Small image
    .addButton('YT', 'https://youtube.com/@wolfisback3461?feature=shared')
    .addButton('DC', 'https://discord.com/invite/mRFzXjw7Jt');

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
