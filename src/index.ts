// const Discord = require('discord.js')
import Discord from 'discord.js'
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
    const filter = (m: Discord.Message) => m.attachments.size > 0;
    console.log('getting messages')
    const messages = await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    console.log('got messages:\n' + inspect(messages))
    let url!: string;
    for (const m of messages) {
        url = m[1].url
        if (url) break;
    }
    if (!url) {
        console.log('no url found')
        msg.reply('no image found')
        return;
    }
    console.log('url: ' + url)

    const imgPath = __dirname + '/toasty' + randomBytes(10).toString('hex') + '.png';
    console.log('new image path: ' + imgPath)
    const img = await Jimp.read(url, (e, jimage) => {
        if (e) {
            msg.reply('something failed homie')
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