const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
	const { Client, Collection, Intents } = require('discord.js');
const fs = require('fs')
// getting normal data from config.json
const data = require("./config.json")

// secure environment for sensitive data such as token
const dotenv = require('dotenv')
dotenv.config()


setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60);


// the client
let client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"], repliedUser: true, intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
module.exports = client


	
	
	// Commands && SlashCommands && Events Handling and Initializing The Whole Project..
	
	client.config = data
	client.commands = new Collection();
	client.aliases = new Collection();
	client.events = new Collection();
	client.slashCommands = new Collection();
	client.queue = new Map();
	require(`./source/handlers/cmdHandler/command.js`)(client);
	require(`./source/handlers/slashHandler/slash.js`)(client);
	require(`./source/handlers/eventHandler/events.js`)(client);
	
// handling errors 
process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});
process.on('typeError', error => {
	console.error('Unhandled type rejection:', error);
});


client.login('MTE0MDMyODAxNjA2OTc5MTkwNA.GJLjQb.y4yzoD9tLTmMdQA0MPY-slLXP-yg7nPb6FRsbk');



setTimeout(() => {
  if (!client || !client.user) {
    console.log("Client Not Login, Process Kill")
    process.kill(1);
  } else {
    console.log("Client Login")
  }
}, 3*1000*60);