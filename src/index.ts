/* eslint-disable no-undef */
import Discord, { TextChannel } from 'discord.js'
// import { inspect } from 'util'
import { extname } from 'path'
import * as mime from 'mime-types'
import Jimp from 'jimp'
import { randomBytes } from 'crypto'
import { readFile } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()
client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve()
})


// TODO: fry images in fryer, return file path, and send reply with deep-fried images here
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
    const messages = await msg.channel.messages.fetch({ limit: 10 }, false)
    // await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    let name: string | null | undefined
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

    const fileExt = extname(url ?? '') || '.jpg'
    const imgPath = __dirname + '/toasty' + randomBytes(10).toString('hex') + fileExt;
    console.log('new image path: ' + imgPath)
    console.time('jimping')

    const mimeType = mime.lookup(fileExt)
    if (mimeType === 'image/gif') {
        await deepfryGif({ url: url, filePath: imgPath, msg: msg })
    } else if (mimeType.toString().includes('image')) {
        await _deepFryImg({ url: url, filePath: imgPath, msg: msg })
    } else {
        msg.reply('file type not supported, only support images and gifs')
    }
    console.timeEnd('jimping')
    return;
}
/**
 * 
 * @param url url of image
 * @param path path to write file to
 * @param msg message that sent command
 * @returns whether successfully fried image
 */
function _deepFryImg({ url, filePath, msg }: { url: string, filePath: string, msg: Discord.Message }): Promise<boolean> {
    console.log('frying image')
    return Jimp.read(url).
        then(jimage => {
            console.log('processing image')
            jimage
                .quality(20)
                .contrast(0.7)
                .posterize(1)
                .pixelate(1.7)
                .write(filePath)
            //
            console.log('replying with image')
            msg.reply('nice', {
                files: [filePath]
            })
            return true;
        })
        .catch(err => {
            console.error(err)
            msg.reply('something failed homie')
            return false;
        })
}
/**
 * 
 * @param url url of image
 * @param path path to write file to
 * @param msg message that sent command
 * @returns whether successfully fried image
 */
function deepfryGif({ url, filePath, msg }: { url: string, filePath: string, msg: Discord.Message }): boolean {
    return true
}





client.login(process.env.login_key);
console.log('----------------------------login key: ' + process.env.login_key)