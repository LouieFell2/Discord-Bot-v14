module.exports = {
    name: 'dice',
    category: 'Fun',
    description: 'Rolls a dice',
    usage: 'dice',
    run: async (interaction, client) => {
        const dice = ['1', '2', '3', '4', '5', '6'];
        const random = Math.floor(Math.random() * dice.length);
        const result = dice[random];
        
        const embed = {};
        embed.title = 'Dice';
        embed.description = `The dice landed on **${result}**!`;
        embed.color = 0xff7f00;
        embed.footer = { text: `Requested by ${interaction.user.tag}` };
        return interaction.reply({ embeds: [embed] });
    }
};