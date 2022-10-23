module.exports = {
    name: 'invite',
    category: 'General',
    description: 'Displays the bot\'s invite link.',
    usage: 'invite',
    run: async (interaction, client) => {
        return interaction.reply({
            content: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=2184310032&scope=bot%20applications.commands`,
            ephemeral: true
        });
    }
}