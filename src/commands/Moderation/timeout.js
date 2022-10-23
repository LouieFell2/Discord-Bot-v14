const ms = require('ms');

module.exports = {
    name: 'timeout',
    category: 'Moderation',
    description: 'Timeouts a user.',
    default_member_permissions: (1 << 13), // MANAGE_MESSAGES
    options: [{
        type: 6,
        name: 'user',
        description: 'The user to timeout.',
        required: true
    }, {
        type: 3,
        name: 'duration',
        description: 'The duration of the timeout.',
        required: true
    }, {
        type: 3,
        name: 'reason',
        description: 'The reason for the timeout.',
        required: false
    }],
    run: async (interaction) => {
        const user = interaction.options.getMember('user');
        const duration = interaction.options.getString('duration');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        if (!user) return interaction.reply({
            content: `You must provide a user to timeout.`,
            ephemeral: true
        });

        if (!ms(duration) || ms(duration) < ms('1m') || ms(duration) > ms('28d')) return interaction.reply({
            content: `I cannot timeout ${user.user.tag}.\n**Reason:** The duration must be between 5 minutes and 28 days.\n- Example: \`5m\`, \`1h\`, \`1d\`, \`1w\``,
            ephemeral: true
        });

        if (!user.moderatable) return interaction.reply({
            content: `I cannot timeout ${user.user.tag}.\n**Reason:** The user is either a moderator, administrator, or their highest role is higher than or equal to your highest role.`,
            ephemeral: true
        });

        user.timeout(ms(duration), reason).catch(err => {
            return interaction.reply({
                content: `I cannot timeout ${user.user.tag}.\n**Reason:** ${err.message}`,
                ephemeral: true
            });
        }).then(() => {
            return interaction.reply({
                content: `Successfully timed out ${user.user.tag} for ${duration}.\n- **Moderator:** ${interaction.user.tag} (${interaction.user.id})\n- **Reason:** ${reason}`,
                ephemeral: true
            });
        });
    }
}