module.exports = {
    name: 'kick',
    category: 'Moderation',
    description: 'Kicks a member.',
    default_member_permissions: (1 << 1), // KICK_MEMBERS
    options: [
        {
            type: 6,
            name: 'member',
            focused: true,
            description: 'The user to kick.',
            required: true
        }, {
            type: 3,
            name: 'reason',
            description: 'The cause for the member\'s ejection.',
            required: false
        }
    ],
    run: async (interaction, client) => {
        const member = await interaction.options.getUser('member');
        const reason = interaction.options.getString('reason') || 'No reason provided.';
        
        if (!interaction.guild.members.cache.get(member.id)) return interaction.reply({ content: `User ${member.tag} *(${member.id})* is not in this server.`, ephemeral: true });
        else {
            if (member.id == interaction.user.id) return interaction.reply({ content: `You can't kick yourself.`, ephemeral: true });
            else if (member.id == client.user.id) return interaction.reply({ content: `You can't kick me.`, ephemeral: true });
            else if (member.id == interaction.guild.ownerId) return interaction.reply({ content: `You can't kick the server owner.`, ephemeral: true });
            else if (!member.kickable) return interaction.reply({ content: `I can't kick the member.`, ephemeral: true });
            else {
                await interaction.guild.members.kick(member, reason).then(() => {
                    return interaction.reply({ content: `Successfully kicked ${member.tag} *(${member.id})*.`, ephemeral: true });
                }).catch(err => {
                    return interaction.reply({ content: 'An error occurred while trying to kick this member.', ephemeral: true });
                });
            }
        }
    }
}