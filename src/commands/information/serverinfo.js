module.exports = {
    name: 'serverinfo',
    category: 'Information',
    description: 'Displays information about the server.',
    run: async (interaction, client, guild) => {
        const embed = {}
        let owner = await client.users.fetch(guild.ownerId);
        embed.description = `
- Owner: ${owner.username}#${owner.discriminator}
- Members: ${guild.memberCount ? guild.memberCount : 'Unknown'}
- Channels: ${guild.channels.cache.size ? guild.channels.cache.size : '0'}
- Roles: ${guild.roles.cache.size ? guild.roles.cache.size : '0'}
- Created At: ${guild.createdAt.toLocaleString() ? guild.createdAt.toLocaleString() : 'Unknown'}
- Verification Level: ${guild.verificationLevel ? guild.verificationLevel : 'Unknown'}
- Emojis: ${guild.emojis.cache.size ? guild.emojis.cache.size : '0'}
- Features: ${guild.features.map(f => f.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join(', ') ? guild.features.map(f => f.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join(', ') : 'None'}
- Vanity URL: ${guild.vanityURLCode ? guild.vanityURLCode : 'None'}
- Afk Channel / Duration: ${guild.afkChannel ? guild.afkChannel.name : 'None'} / ${guild.afkTimeout / 60} Minutes
- Boost Level(s) / Boosts: ${guild.premiumTier} / ${guild.premiumSubscriptionCount}`
        embed.author = {
            name: guild.name,
            icon_url: guild.iconURL() ? guild.iconURL() : 'https://cdn.discordapp.com/embed/avatars/0.png'
        }

        embed.description = embed.description.split('\n').sort((a, b) => a.length - b.length).join('\n');
        embed.description = '```\n' + embed.description + '\n```';

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

    }
}