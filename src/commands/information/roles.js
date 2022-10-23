const table = require('text-table');

module.exports = {
    name: 'roles',
    category: 'Information',
    description: 'Displays all roles in the server.',
    run: async (interaction, client, guild, args) => {
        const roles = table(guild.roles.cache.sort((a, b) => b.position - a.position).map(r => [r.name, `(Members ${r.members.size})`]), {
            align: ['l', 'l', 'l'],
            hsep: ' '.repeat(5)
        });

        if (roles.length > 2000) {
            return interaction.reply({
                files: [{
                    name: 'roles.txt',
                    attachment: Buffer.from(roles)
                }],
                ephemeral: true,
            });
        } else {
            return interaction.reply({
                content: `\`\`\`${roles}\`\`\``,
                ephemeral: true,
            });
        }
    }
}