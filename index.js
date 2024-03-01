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
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1200845159169015828/1213004934371606558/kakashi-naruto.gif?ex=65f3e5e0&is=65e170e0&hm=09b5fae2da414e89494b38523e3b450480f2bf6900ba2ce8dd737eee2a1196fb&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('Botu') //Text when you hover the Large image
    .setAssetsSmallImage('https://media.discordapp.net/attachments/1200845159169015828/1213004992894730341/kakashi-hatake-anime.gif?ex=65f3e5ee&is=65e170ee&hm=0e28a23442ff122633586b1b7df022bb107c7eddfe552ac0f193902ee2cad2f6&') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('OP') //Text when you hover the Small image
    .addButton('Im Botu ', 'https://youtube.com/@Imbotu?feature=shared')
    .addButton('Im Botu ', 'https://dsc.gg/botugamerop');

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
