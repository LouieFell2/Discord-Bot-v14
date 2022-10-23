const { readdirSync } = require("fs");

module.exports = async (client) => {
    let slash = []
    for (const category of global.client.categories) {
        for (const file of await readdirSync(`./src/commands/${category}`)) {
            if (file.endsWith(".js")) {
                try {
                    const command = require(`../commands/${category}/${file}`);
                    if (command.name) {
                        client.commands.set(command.name, command);
                        slash.push(command)
                    }
                } catch (error) {
                    console.error(`Error while loading command ${file}:\n${error.stack}`);
                }
            }
        }
    }
    client.once("ready", async () => {
        await client.application.commands.set(slash);
        console.success(`[Client Commands] loaded ${client.commands.size} commands!`);
    })
}