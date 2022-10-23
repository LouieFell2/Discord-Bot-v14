const { ActionRowBuilder, SelectMenuBuilder, Collector } = require('discord.js');

module.exports = {
    name: 'help',
    category: 'General',
    description: 'Displays all commands that the bot has.',
    usage: 'help [command]',
    run: async (interaction, client) => {
        let slashCommands = [];
        if (client.commands.size > 0) {
            for (const [name, command] of client.commands.entries()) {
                if (command.category) {
                    slashCommands.push({
                        name: name,
                        category: command.category
                    });
                }
            }
        }

        let categories = [];
        for (const command of slashCommands) {
            if (!categories.includes(command.category)) {
                categories.push(command.category);
            }
        }

        let embed = {};
        embed.title = `${client.user.username}'s Help Menu!`;
        embed.description = 'Welcome to the help menu! Here you can find all the commands that the bot has.\n```diff\nSelect a category to view the commands in that category.\n```';
        embed.color = 0x000000; // Green color code in decimal
        embed.thumbnail = {
            url: interaction.user.displayAvatarURL({
                dynamic: true
            }) ?? 'https://cdn.discordapp.com/embed/avatars/0.png'
        };
        embed.footer = {
            text: 'If 1 minute has passed, you need to re-run the command.'
        };
        embed.image = {
            url: 'https://imgur.com/fZ4CiYW.gif'
        };

        for (const category of categories) {
            let commands = [];
            for (const command of slashCommands) {
                if (command.category === category) {
                    commands.push(command.name);
                }
            }
        }

        let selectMenu = new SelectMenuBuilder()
            .setCustomId('help')
            .setPlaceholder('Select a command')
            .addOptions(
                categories.map(category => {
                    return {
                        label: category,
                        value: category,
                        description: `View all commands in the ${category} category.`
                    };
                })
            );

        let row = new ActionRowBuilder().addComponents(selectMenu);

        let message = await interaction.reply({
            embeds: [embed],
            components: [row],
            fetchReply: true
        });

        const filter = i => i.customId === 'help' && i.user.id === interaction.user.id;
        const collector = message.createMessageComponentCollector({
            filter,
            time: 60000
        });

        collector.on('collect', m => {
            let embed = {};
            embed.title = `${client.user.username}'s Help Menu!`;
            embed.color = 0x000000; // Green color code in decimal
            embed.description = "```diff\n- You are viewing the commands in the " + m.values[0] + " category.\n```";
            embed.thumbnail = {
                url: interaction.user.displayAvatarURL({
                    dynamic: true
                }) ?? 'https://cdn.discordapp.com/embed/avatars/0.png'
            };
            embed.footer = {
                text: 'If 1 minute has passed, you need to re-run the command.'
            };
            embed.image = {
                url: 'https://imgur.com/fZ4CiYW.gif'
            };

            let commands = [];
            for (const command of slashCommands) {
                if (command.category === m.values[0]) {
                    commands.push(command.name);
                }
            }

            commands.sort((a, b) => a.length - b.length);
            embed.fields = [{
                name: 'Commands',
                value: "\`\`\`fix\n" + commands.map(command => `⎯⎯ ${command}`).join('\n') + "\`\`\`"
            }];

            m.update({
                embeds: [embed],
                components: [row]
            });

        });

        collector.on('end', collected => {
            embed.footer = {
                text: 'One minute has passed. You need to re-run the command.'
            };
            if (collected.size === 0) {
                message.edit({
                    embeds: [embed]
                });
            }
        });

        collector.on('error', error => {
            console.error(error);
        });
    }
}