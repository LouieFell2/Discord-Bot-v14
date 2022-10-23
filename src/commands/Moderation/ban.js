module.exports = {
    name: 'ban',
    category: 'Moderation',
    description: 'Bans a member.',
    default_member_permissions: (1 << 2), // BAN_MEMBERS
    options: [{
        type: 6,
        name: 'member',
        focused: true,
        description: 'The user to ban.',
        required: true
    }, {
        type: 3,
        name: 'reason',
        description: 'The reason for the member\'s suspension.',
        required: false
    }],
    run: async (interaction, client) => {
        const member = await interaction.options.getUser('member');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        let bans = await interaction.guild.bans.fetch();
        if (bans.has(member.id)) return interaction.reply({ content: `User ${member.tag} *(${member.id})* is already banned.`, ephemeral: true });
        else {
            if (member.id == interaction.user.id) return interaction.reply({ content: `You can't ban yourself.`, ephemeral: true });
            else if (member.id == client.user.id) return interaction.reply({ content: `You can't ban me.`, ephemeral: true });
            else if (member.id == interaction.guild.ownerId) return interaction.reply({ content: `You can't ban the server owner.`, ephemeral: true });
            else if (interaction.guild.members.cache.get(member.id) && !interaction.guild.members.cache.get(member.id).bannable) return interaction.reply({ content: `Sorry, I can't ban this member.\n\nMake sure I have the \`BAN_MEMBERS\` permission and that the member's highest role is lower than mine.`, ephemeral: true });
            else {
                await interaction.guild.members.ban(member, {
                    reason: reason
                }).then(() => {
                    return interaction.reply({ content: `Successfully banned ${member.tag} *(${member.id})*.`, ephemeral: true });
                }).catch(err => {
                    return interaction.reply({ content: 'An error occurred while trying to ban this member.', ephemeral: true });
                });
            }
        }
    }
}