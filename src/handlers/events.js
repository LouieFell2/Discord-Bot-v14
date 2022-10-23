const { readdir } = require('fs/promises');

module.exports = async (client) => {
    readdir('./src/events').then(async (files) => {
        const allevents = [];
        try {
            for (const file of files) {
                const event = require(`../events/${file}`);
                client.on(event.name, event.run.bind(null, client));
                allevents.push(event.name);
            }
        } catch (error) {
            console.error(`Error while loading event ${file}:\n${error.stack}`);
        }
        client.events = allevents;
        console.success(`[Client Events] Loaded ${files.length} events.`);
    });
}