require('dotenv').config();
const Discord = require('discord.js');

const honeypot = new Discord.Client();
const bot = new Discord.Client();

let attractChannel;
let moderationChannel;
let moderationGuild;

const ATTRACT_MESSAGES = [
  'I hope everyone is having a great day :)',
  'hello :)',
  'how are you all doing today?',
  'whats up',
  'what is up friends',
  'hello fellow teens',
  'hi there everyone',
  'how is everyones day going',
  'hi!',
  'good morning',
  'good afternoon',
  'good evening',
  'hello!!',
  ':)',
  'hola amigos',
  'hola friends',
  'hows it goin everyone',
  'hey-o amigos',
  'hi how is everyone today',
  'greetings friends',
  'greetings fellow teens',
  'how are you doing today everyone??',
];

function attractMsg() {
  attractChannel.send(ATTRACT_MESSAGES[Math.floor(Math.random() * ATTRACT_MESSAGES.length)]);
  setTimeout(attractMsg, Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 3) + (1000 * 60 * 60 * 24 * 14));
}

honeypot.on('ready', () => {
  console.log(`Honeypot logged in as ${honeypot.user.tag}!`);
  attractChannel = honeypot.channels.get(process.env.ATTRACT_CHANNEL);
  attractMsg();
});
honeypot.on('error', console.error);
honeypot.on('warn', console.warn);
bot.on('ready', () => {
  console.log(`Bot logged in as ${bot.user.tag}!`);
  moderationChannel = bot.channels.get(process.env.MODERATION_CHANNEL);
  moderationGuild = bot.guilds.get(process.env.MODERATION_GUILD);
});
bot.on('error', console.error);
bot.on('warn', console.warn);

honeypot.on('message', async (msg) => {
  if (msg?.channel?.type !== 'dm' || msg?.author?.id === honeypot?.user?.id) return;
  moderationChannel.send(`Banned <@${msg.author.id}> (${msg.author.id}) for spam.`);
  const member = await moderationGuild.fetchMember(msg.author.id, false);
  member.ban();
});

honeypot.login(process.env.SELF_TOKEN);
bot.login(process.env.BOT_TOKEN);
