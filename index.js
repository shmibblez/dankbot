const Discord = require('discord.js')
const client = new Discord.Client()
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve()
})
client.on("message", msg => {
    if (msg.content.includes("ping")) {
        msg.reply("Pong!")
    }
    return Promise.resolve();
})
client.login(process.env.login_key);