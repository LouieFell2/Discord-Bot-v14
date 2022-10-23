module.exports = {
    name: 'coinflip',
    category: 'Fun',
    description: 'Flips a coin',
    usage: 'coinflip',
    run: async (interaction, client) => {
        const coin = ['Heads', 'Tails'];
        const random = Math.floor(Math.random() * coin.length);
        const result = coin[random];
        
        const embed = {};
        embed.title = 'Coinflip';
        embed.description = `The coin landed on **${result}**!`;
        embed.color = 0xff7f00;
        embed.footer = { text: `Requested by ${interaction.user.tag}` };
        return interaction.reply({ embeds: [embed] });
    }
};