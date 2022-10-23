module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {
        if (!interaction.isChatInputCommand()) return;
        try {
            let commandName = interaction.commandName;
            let command = client.commands.get(commandName);
            if (!command) {
                return interaction.reply({
                    content: 'Command not found.'
                });
            } else {
                const args = (value) => {
                    try {
                        const options = interaction.options._hoistedOptions;

                        if (!options) return console.error('No options found.');
                        if (!Array.isArray(options)) return console.error('Options are not an array.');
                        let option = options.find(o => o.name === value);

                        return option ? option.value : null;
                    } catch (error) {
                        return console.error(error);
                    }
                }
                if (command.default_member_permissions) {
                    if (!interaction.member.permissions.has(command.default_member_permissions)) {
                        return interaction.reply({
                            content: `You don't have the required permissions to use this command.`,
                            ephemeral: true
                        });
                    } else {
                        command.run(interaction, client, interaction.guild, args);
                    }
                } else {
                    command.run(interaction, client, interaction.guild, args);
                }
                if (command.cooldown) {
                    if (!client.cooldowns.has(command.name)) {
                        client.cooldowns.set(command.name, new Map());
                    }
                    const now = Date.now();
                    const timestamps = client.cooldowns.get(command.name);
                    const cooldownAmount = (command.cooldown || 3) * 1000;
                    if (timestamps.has(interaction.user.id)) {
                        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
                        if (now < expirationTime) {
                            const timeLeft = (expirationTime - now) / 1000;
                            return interaction.reply({
                                content: `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`,
                                ephemeral: true
                            });
                        }
                    }
                    timestamps.set(interaction.user.id, now);
                    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
                }
            }
        } catch (error) {
            console.log(error);
            const embed = {};
            embed.author = {
                name: interaction.member.user.tag,
                icon_url: interaction.member.user.displayAvatarURL()
            };
            embed.title = 'Command Error';
            embed.description = 'An error occured while executing this command.';
            embed.fields = [{
                    name: 'Command',
                    value: interaction.commandName
                },
                {
                    name: 'Error',
                    value: error.message
                }
            ];
            embed.color = 0xff0000;
            embed.timestamp = new Date();

            return interaction.reply({
                embeds: [embed]
            });
        }
    }
}