module.exports = {
    name: 'hack',
    category: 'Fun',
    description: 'Hacks a user',
    usage: 'hack <user>',
    options: [
        {
            name: 'user',
            description: 'The user to hack',
            type: 6,
            required: true
        }
    ],
    run: async (interaction, client) => {
        const user = interaction.options.getUser('user');
        if (!user) return interaction.reply({ content: 'Please specify a user to hack!', ephemeral: true });

        let msg = await interaction.reply({
            content: 'Hacking user...',
            fetchReply: true,
            allowedMentions: {
                parse: []
            }
        });

        Promise.all([
            `Hacking ${user.username}'s email...`,
            `Hacking ${user.username}'s password...`,
            `Hacking ${user.username}'s bank account...`,
            `Hacking ${user.username}'s IP address...`,
            `Hacking ${user.username}'s phone number...`,
            `Hacking ${user.username}'s credit card...`,
            `Hacking ${user.username}'s social security number...`,
            `Hacking ${user.username}'s location...`,
            `Hacking ${user.username}'s saved passwords...`,
            `Hacking ${user.username}'s saved emails...`
        ].map((text, index) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    msg.edit({
                        content: text,
                        allowedMentions: {
                            parse: []
                        }
                    });
                }, index * 1000);
            });
        })).then(async (results) => {
            const embed = {};
            embed.title = 'Hack Results';
            embed.description = `Successfully hacked ${user.tag}!`;
            embed.color = 0xff7f00;
            embed.footer = { text: `Requested by ${interaction.user.tag}` };
            embed.fields = [
                {
                    name: 'Email',
                    value: `${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com`,
                    inline: true
                }, {
                    name: 'Password',
                    value: `${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}`,
                    inline: true
                }, {
                    name: 'Bank Account',
                    value: `${Math.floor(Math.random() * 10000000000000000000)}`,
                    inline: true
                }, {
                    name: 'IP Address',
                    value: `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
                    inline: true
                }, {
                    name: 'Phone Number',
                    value: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                    inline: true
                }, {
                    name: 'Credit Card',
                    value: `${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`,
                    inline: true
                }, {
                    name: 'Social Security Number',
                    value: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9000) + 1000}`,
                    inline: true
                }, {
                    name: 'Location',
                    value: `${[
                        'United States',
                        'Canada',
                        'Mexico',
                        'United Kingdom',
                        'France',
                        'Germany',
                        'Italy',
                        'Spain',
                        'Russia',
                        'China',
                        'Japan',
                        'South Korea',
                        'Australia',
                        'New Zealand',
                        'Brazil',
                        'Argentina',
                        'Chile',
                        'Peru',
                        'Venezuela',
                        'Colombia',
                        'South Africa',
                        'Nigeria',
                        'Egypt',
                        'India',
                        'Pakistan',
                        'Afghanistan',
                        'Iran',
                        'Iraq',
                        'Saudi Arabia',
                        'United Arab Emirates'][Math.floor(Math.random() * 30)]}`,
                    inline: true
                }, {
                    name: 'Saved Passwords',
                    value: `${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}, ${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}, ${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}, ${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}, ${Math.random().toString(36).slice(2)}${Math.floor(Math.random() * 100)}`,
                    inline: true
                }, {
                    name: 'Saved Emails',
                    value: `${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com, ${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com, ${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com, ${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com, ${user.username}@${['gmail', 'yahoo', 'hotmail', 'outlook', 'protonmail'][Math.floor(Math.random() * 5)]}.com`,
                    inline: true
                }
            ];

            await interaction.editReply({
                content: null,
                embeds: [embed],
                allowedMentions: {
                    parse: []
                }
            });
        });
    }
}
