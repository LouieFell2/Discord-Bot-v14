const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    run: async (client) => {
        try {
            console.success(`[Client] Logged in as ${client.user.tag}`);
            client.user.setPresence({
                activities: [{
                    name: `discord.js v14`, // Custom message
                    type: ActivityType.Watching // Types .Playing, .Streaming, .Listening, .Watching
                }],
                status: 'dnd', // dnd, idle, online, invisible
            });
        } catch (e) {
            console.error(e);
        }
    }
}