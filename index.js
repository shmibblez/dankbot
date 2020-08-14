const Discord = require('discord.js')
const client = new Discord.Client()
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve()
})
client.on("message", msg => {
    if (!msg.content.startsWith('!dankbot')) return;
    const commands = msg.content.split(' ');
    switch (commands[1]) {
        default:
        case 'help':
            msg.reply('whats good homie' +
                '\n\ncommands are seperated by spaces, for example: `!dankbot fry brutal` deepfries the latest picture in the chat' +
                '\n\nhere are some commands:' +
                '\n  - `deepfry`' +
                '\n    - `mild`' +
                '\n    - `medium` (default)' +
                '\n    - `brutal`' +
                '\n - `help`')
            break;
        case 'fry':
            msg.reply('this feature is coming soon')
            break;
    }
    return Promise.resolve();
})
client.login(process.env.login_key);