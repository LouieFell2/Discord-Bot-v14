module.exports = {
    name: 'unban',
    category: 'Moderation',
    description: 'Unbans a member.',
    default_member_permissions: (1 << 2), // BAN_MEMBERS
    options: [
        {
            type: 6,
            name: 'member',
            focused: true,
            description: 'The user to unban.',
            required: true
        }, {
            type: 3,
            name: 'reason',
            description: 'The reason for the member\'s unban.',
            required: false
        }
    ],
    run: async (interaction, client) => {
        const member = await interaction.options.getUser('member');
        const reason = interaction.options.getString('reason') || 'No reason provided.';

        let bans = await interaction.guild.bans.fetch();
        if (!bans.has(member.id)) return interaction.reply({ content: `User ${member.tag} *(${member.id})* is not banned.`, ephemeral: true });
        else {
            if (member.id == interaction.user.id) return interaction.reply({ content: `You can't unban yourself.`, ephemeral: true });
            else if (member.id == client.user.id) return interaction.reply({ content: `You can't unban me.`, ephemeral: true });
            else if (member.id == interaction.guild.ownerId) return interaction.reply({ content: `You can't unban the server owner.`, ephemeral: true });
            else {
                await interaction.guild.members.unban(member, reason).then(() => {
                    return interaction.reply({ content: `Successfully unbanned ${member.tag} *(${member.id})*.`, ephemeral: true });
                }).catch(err => {
                    console.error(err);
                    return interaction.reply({ content: 'An error occurred while trying to unban this member.', ephemeral: true });
                });
            }
        }
    }
}