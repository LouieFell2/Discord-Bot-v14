module.exports = {
    name: 'purge',
    category: 'Moderation',
    description: 'Purges messages.',
    cooldown: 5,
    default_member_permissions: (1 << 13), // MANAGE_MESSAGES
    options: [
        {
            type: 4,
            name: 'amount',
            max_value: 100,
            min_value: 1,
            max_length: 3,
            min_length: 1,
            focused: true,
            description: 'The amount of messages to purge.',
            required: true
        }, {
            type: 3,
            name: 'type',
            description: 'The type of messages to purge.',
            required: false,
            choices: [
                { name: 'All messages', value: 'all_messages' },
                { name: 'Bot messages only', value: 'bot_messages' },
                { name: 'User messages only', value: 'user_messages' },
                { name: 'Embed messages only', value: 'embed_messages' },
                { name: 'Attachment messages only', value: 'attachments_messages' },
            ]
        }
    ],
    run: async (interaction, client, guild) => {
        const amount = interaction.options.getInteger('amount');
        const type = interaction.options.getString('type');

        const messages = (await interaction.channel.messages.fetch({ limit: amount })).filter(m => {
            if (type === 'all_messages') return !m.pinned;
            else if (type === 'bot_messages') return m.author.bot && !m.pinned;
            else if (type === 'user_messages') return !m.author.bot && !m.pinned;
            else if (type === 'embed_messages') return m.embeds.length && !m.pinned;
            else if (type === 'attachments_messages') return m.attachments.size && !m.pinned;
            else if (type === null) return !m.pinned;
        });

        if (messages.size < 0) return interaction.reply({ content: 'There are no messages to purge.', ephemeral: true });

        interaction.channel.bulkDelete(messages, true).catch(err => {
            return interaction.reply({ content: `I cannot purge messages.\n**Reason:** ${err.message}`, ephemeral: true });
        }).then(() => {
            return interaction.reply({ content: `Successfully purged ${messages.size} messages.`, ephemeral: true });
        });
    }
};
