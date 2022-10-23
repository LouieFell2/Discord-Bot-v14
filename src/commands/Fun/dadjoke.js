module.exports = {
    name: 'dadjoke',
    category: 'Fun',
    description: 'Sends a random dad joke',
    usage: 'dadjoke',
    run: async (interaction, client) => {
        const url = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json"
            }
        });
        const random = await url.json();
        const embed = {};
        embed.title = 'Dad Joke';
        embed.description = random.joke;
        embed.color = 0xff7f00;
        embed.footer = { text: `Requested by ${interaction.user.tag}` };
        return interaction.reply({ embeds: [embed] });
    }
};