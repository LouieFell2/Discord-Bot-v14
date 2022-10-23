module.exports = {
    name: 'messageCreate',
    run: async (client, message) => {
        try {
            if (message.author.bot) return;
            if (message.channel.type === 'DM') return;
            else if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
                message.reply({
                    content: `${message.author.tag}, My prefix for this server is: \`/\``,
                    allowedMentions: {
                        parse: [] // This will prevent the bot from pinging the user,
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    }
}