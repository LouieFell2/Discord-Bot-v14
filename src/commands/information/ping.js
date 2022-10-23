module.exports = {
    name: 'ping',
    category: 'Information',
    description: 'Get bot ping.',
    run: async (interaction, client) => {
        interaction.reply({
            content: `🏓 **${client.user.username}**'s Latency is \`${Date.now() - interaction.createdTimestamp}ms\`. API Latency is \`${client.ws.ping}ms\`.`,
            allowedMentions: {
                parse: []
            },
            ephemeral: true
        });
    }
}