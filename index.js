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
                '\n\ncommands are seperated by spaces, for example: `!dankbot fry` deepfries the latest picture in the chat' +
                '\n\nhere are some commands:' +
                '\n - `deepfry`, with sub-commands `mild`, `medium`, and `brutal` to determine how long to fry the image for, default is `medium`' +
                '\n - `help`')
            break;
        case 'fry':
            msg.reply('currently the fryer is out of service, it\'s coming soon though')
            break;
    }
    return Promise.resolve();
})
client.login(process.env.login_key);