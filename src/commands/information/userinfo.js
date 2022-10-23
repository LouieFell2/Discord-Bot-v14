module.exports = {
    name: 'userinfo',
    category: 'Information',
    description: 'Displays information about a user.',
    options: [
        {
            type: 6,
            name: 'user',
            description: 'The user to display information about.',
            required: false
        }
    ],
    run: async (interaction, client, guild) => {
        const user = await interaction.options.getUser('user') || interaction.user;

        const embed = {};
        embed.title = `${user.tag} (${user.id})`;
        embed.description = `**Created:** ${user.createdAt.toUTCString()}`;
        embed.color = 0x00FF00;
        embed.thumbnail = {
            url: user.displayAvatarURL({ dynamic: true })
        };
        embed.fields = [];
        embed.fields.push({
            name: 'Bot',
            value: user.bot ? 'Yes' : 'No',
            inline: true
        });

        if (user.presence && user.presence.activities.length > 0) {
            embed.fields.push({
                name: 'Activity',
                value: user.presence.activities[0].name,
                inline: true
            });
        }

        if (user.presence && user.presence.status) {
            embed.fields.push({
                name: 'Status',
                value: user.presence.status,
                inline: true
            });
        }

        if (interaction.guild.members.cache.has(user.id)) {
            embed.fields.push({
                name: 'Joined Server',
                value: interaction.guild.members.cache.get(user.id).joinedAt.toUTCString(),
                inline: true
            });

            embed.fields.push({
                name: `Roles [${interaction.guild.members.cache.get(user.id).roles.cache.size - 1}]`,
                value: interaction.guild.members.cache.get(user.id).roles.cache.filter(role => role.id != interaction.guild.id).map(role => role.toString()).join(' '),
            });

            embed.fields.push({
                name: `Permissions [${interaction.guild.members.cache.get(user.id).permissions.toArray().length}]`,
                value: interaction.guild.members.cache.get(user.id).permissions.toArray().map(permission => permission.replace(/([A-Z])/g, ' $1')).join(', '),
            });

            embed.fields.push({
                name: 'Status',
                // make first letter uppercase
                value: interaction.guild.members.cache.get(user.id).presence.status.charAt(0).toUpperCase() + interaction.guild.members.cache.get(user.id).presence.status.slice(1),
            });
        }

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
};
