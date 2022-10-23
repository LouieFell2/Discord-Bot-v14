module.exports = {
    name: 'say',
    category: 'Moderation',
    description: 'Says a message.',
    default_member_permissions: (1 << 13), // MANAGE_MESSAGES
    options: [
        {
            type: 7,
            name: 'channel',
            description: 'The channel to send the message to.',
            required: true
        }, {
            type: 3,
            name: 'message',
            description: 'The message to send.',
            required: true
        }
    ],
    run: async (interaction, client, guild) => {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        if (channel.type !== 0) return interaction.reply({ content: 'You can only send messages to text channels.', ephemeral: true });
        else {
            if (!channel.permissionsFor(client.user).has((1 << 12))) return interaction.reply({ content: `I don't have permissions to send messages in ${channel}.`, ephemeral: true });
            else {
                const embed = {};
                embed.author = {
                    name: interaction.user.tag,
                    icon_url: interaction.user?.displayAvatarURL({ dynamic: true }) || 'https://cdn.discordapp.com/embed/avatars/0.png'
                };
                embed.description = message;
                embed.color = guild.color || 0x2F3136;
                embed.timestamp = new Date();

                channel.send({ embeds: [embed] }).catch(err => {
                    return interaction.reply({ content: `I cannot send a message to ${channel}.\n**Reason:** ${err.message}`, ephemeral: true });
                }).then(() => {
                    return interaction.reply({ content: `Successfully sent a message to ${channel}.`, ephemeral: true });
                });
            }
        }
    }
}