module.exports = {
    name: 'role',
    category: 'Moderation',
    description: 'Gives or removes a role from a user.',
    default_member_permissions: (1 << 28), // MANAGE_ROLES
    options: [
        {
            type: 3,
            name: 'type',
            description: 'Select on which type of user you want to give or remove a role.',
            required: true,
            choices: [
                { name: 'humans', value: 'humans' },
                { name: 'bots', value: 'bots' },
                { name: 'everyone', value: 'everyone' }
            ]
        }, {
            type: 8,
            name: 'role',
            description: 'The role to give or remove from the user.',
            required: true
        }, {
            type: 3,
            name: 'action',
            description: 'The action to perform.',
            required: true,
            choices: [
                { name: 'Give', value: 'give' },
                { name: 'Remove', value: 'remove' }
            ]
        }
    ],
    run: async (interaction) => {
        const type = interaction.options.getString('type');
        const role = interaction.options.getRole('role');
        const action = interaction.options.getString('action');
        let memberCount = [];

        if (type == 'humans') memberCount = members.filter(m => !m.user.bot);
        else if (type == 'bots') memberCount = members.filter(m => m.user.bot);
        else if (type == 'everyone') memberCount = members;

        if (action == 'give') {
            for (let member of memberCount) {
                interaction.guild.members.cache.get(member[0]).roles.add(role);
            }
        } else if (action == 'remove') {
            for (let member of memberCount) {
                interaction.guild.members.cache.get(member[0]).roles.remove(role);
            }
        }

        return interaction.reply({
            content: `Successfully ${action}d ${role.name} to ${memberCount.size} ${type}.`,
            ephemeral: true
        });
    }
};
