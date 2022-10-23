const { version } = require('discord.js');

module.exports = {
    name: 'botinfo',
    category: 'Information',
    description: 'Get bot stats.',
    run: async (interaction, client, _guild, _args) => {
        try {
            let owner = await interaction.client.application.fetch();
            const embed = {};
            embed.color = '15548997';
            embed.author = {
                name: interaction.member.user.username,
                icon_url: interaction.member.user.avatarURL()
            };
            embed.title = client.user.username + ' Statisctics';
            embed.fields = [
                { name: 'Bot Owner', value: `${owner.owner.tag} (${owner.owner.id})`, inline: true },
                { name: 'Uptime', value: '```diff\n' + Math.round(client.uptime / 1000 / 60 / 60) + ' hours, ' + Math.round(client.uptime / 1000 / 60) + ' minutes, ' + Math.round(client.uptime / 1000) + ' seconds```' },
                { name: 'Api Latency', value: '```diff\n' + client.ws.ping + 'ms\n```' },
                { name: 'Guilds', value: '```diff\n' + client.guilds.cache.size + '\n```', inline: true },
                { name: 'Cached Members', value: '```diff\n' + client.users.cache.size + '\n```', inline: true },
                { name: 'Cached Channels', value: '```diff\n' + client.channels.cache.size + '\n```', inline: true },
                { name: 'Discord.js Version', value: '```diff\n' + version + '\n```', inline: true },
                { name: 'Node.js Version', value: '```diff\n' + process.version + '\n```', inline: true },
            ];

            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            const embed = {};
            embed.color = '15548997';
            embed.author = {
                name: interaction.member.user.username,
                icon_url: interaction.member.user.avatarURL()
            };
            embed.description = '```js\n' + error.message + '\n```';
            embed.title = 'Error';
            interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
    }
}