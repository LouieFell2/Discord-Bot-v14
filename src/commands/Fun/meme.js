module.exports = {
    name: 'meme',
    category: 'Fun',
    description: 'Sends a random meme',
    usage: 'meme',
    run: async (interaction, client) => {
        const url = await fetch("https://www.reddit.com/r/memes/random/.json");
        const random = await url.json();

        const data = random[0].data.children[0].data;
        const embed = {};
        embed.title = data.title;
        embed.url = `https://reddit.com${data.permalink}`;
        embed.image = { url: data.url };
        embed.color = 0xff7f00;
        embed.footer = { text: `👍 ${data.ups} | 💬 ${data.num_comments}` };
        embed.footer = { text: `Requested by ${interaction.user.tag}` };
        return interaction.reply({ embeds: [embed] });
    }
};