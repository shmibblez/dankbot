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
                '\ncommands are seperated by spaces, for example: `!dankbot deepfry` deepfries the latest picture in the chat' +
                '\nhere are some commands:' +
                '\n * `deepfry`, with sub-commands `mild`, `medium`, and `brutal` to determine how long to fry the image for, default is `medium`' +
                '\n * `help` to see all commands')
            break;
        case 'deepfry':
    }
    return Promise.resolve();
})
client.login(process.env.login_key);