// const Discord = require('discord.js')
import Discord, { TextChannel } from 'discord.js'
import { inspect } from 'util'
import { readFile } from 'fs'
import * as mime from 'mime-types'
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
                // '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\nhere are some commands:' +
                '\n  - `fry`' +
                // '\n    - `mild`' +
                // '\n    - `medium` (default)' +
                // '\n    - `brutal`' +
                '\n - `help`')
            break;
    }
    return Promise.resolve();
})

async function deepFry(msg: Discord.Message) {
    console.log('getting messages')
    const messages = await msg.channel.messages.fetch({ limit: 5 }, false)
    // await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    let name: string | undefined
    let url: string | undefined | null;
    for (const m of messages) {
        url = m[1].attachments?.first()?.url
        if (url) {
            name = m[1].attachments?.first()?.name
            break;
        }
        url = m[1].embeds[0]?.image?.url
        if (url) {
            name = 'epic'
            break;
        }
        url = m[1].embeds[0]?.thumbnail?.url
        if (url) {
            name = 'epic'
            break;
        }
    }
    if (!url) {
        console.log('no url found')
        // msg.reply('no image found')
        msg.reply('no images found')
        return;
    }
    console.log('url: ' + url)

    let imgPath = __dirname + '/toasty' + randomBytes(10).toString('hex');
    console.log('new image path: ' + imgPath)
    console.time('jimping')
    await Jimp.read(url).
        then(jimage => {
            console.log('processing image')
            imgPath += mime.extension(jimage.getMIME())
            jimage
                .quality(20)
                .contrast(0.7)
                .posterize(1)
                .pixelate(1.7)
                .write(imgPath)
        })
        .catch(err => {
            console.error(err)
            msg.reply('something failed homie')
            return;
        })
    console.timeEnd('jimping')

    console.log('sending image')
    msg.reply('nice', {
        files: [imgPath]
    })
    return;
}
client.login(process.env.login_key);