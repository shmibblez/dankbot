const Discord = require('discord.js')
const client = new Discord.Client()
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
    if (msg.content.includes("ping")) {
        msg.reply("Pong!")
    }
})
client.login("NzQzMjI1NzMyMjI2MDg5MDIx.XzRk5w.-nJ1XGHPgJJfP8Lf88Vl0UMkNLA");