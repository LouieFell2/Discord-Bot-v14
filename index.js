console.clear();
const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
global.config = config;

const client = (global.client = new Client({
    fetchAllMembers: true,
    intents: [
        // Intents https://discord-api-types.dev/api/discord-api-types-v10/enum/GatewayIntentBits#Index
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
    ]
}));

require('cute-logs')
const fs = require('fs');
const { fetch } = require('undici');
global.fetch = fetch;

client.commands = new Map();
client.cooldowns = new Map();
client.categories = fs.readdirSync('./src/commands/');

['events', 'commands'].map(handler => {
    require(`./src/handlers/${handler}`)(client);
});

try {
    client.login(config.token);
} catch (error) {
    if (error.message === 'TOKEN_INVALID') console.error('The token you provided is invalid.');
    else if (error.message === 'TOKEN_MISSING') console.error('The token you provided is missing.');
    else console.error("An error occurred while logging in:\n" + error.stack);
}