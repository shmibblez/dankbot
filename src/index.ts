// const Discord = require('discord.js')
import Discord, { TextChannel } from 'discord.js'
import { inspect } from 'util'
import Jimp from 'jimp'
import { randomBytes } from 'crypto'
const client = new Discord.Client()
client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve()
})
client.on("message", async msg => {
    if (!msg.content.startsWith('!dankbot')) return;
    if (msg.channel.type != 'text') return;
    const commands = msg.content.split(' ');
    switch (commands[1]) {
        case 'fry':
            // msg.reply('this feature is coming soooooon')
            console.log('attempting deepfry')
            await deepFry(msg)
            break;
        default:
        case 'help':
            msg.reply('whats good homie' +
                '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\nahere are some commands:' +
                '\n  - `fry`' +
                '\n    - `mild`' +
                '\n    - `medium` (default)' +
                '\n    - `brutal`' +
                '\n - `help`')
            break;
    }

    return Promise.resolve();
})

async function deepFry(msg: Discord.Message) {
    console.log('getting messages')
    const messages = await msg.channel.messages.fetch({ limit: 5 }, false)
    // await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    console.log('got messages:\n' + inspect(messages))
    let url!: string | undefined;
    for (const m of messages) {
        url = m[1].attachments.first()?.url
        if (url) break;
    }
    if (!url) {
        console.log('no url found')
        // msg.reply('no image found')
        msg.reply('no images found, not cool bro')
        return;
    }
    console.log('url: ' + url)

    const imgPath = __dirname + '/toasty' + randomBytes(10).toString('hex') + '.png';
    console.log('new image path: ' + imgPath)
    const img = await Jimp.read(url, (e, jimage) => {
        if (e) {
            console.error(e)
            msg.reply('something failed homie, probably means no images sent or something, in other words stop wasting my time, yo')
            return;
        }
        jimage
            .pixelate(40)
            .contrast(0.95)
            .posterize(1)
            .write(imgPath)
    })
    if (img) {
        msg.channel.send({
            files: [{
                attachment: imgPath,
                name: 'epic'
            }]
        })
        return;
    }


}
client.login(process.env.login_key);