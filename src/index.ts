// const Discord = require('discord.js')
import Discord, { TextChannel } from 'discord.js'
import { inspect } from 'util'
import { readFile } from 'fs'
const GifEncoder = require('gif-encoder')
import { GifUtil, GifFrame } from 'gifwrap'
import { extname } from 'path'
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
    const messages = await msg.channel.messages.fetch({ limit: 10 }, false)
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

    const fileExt = extname(url ?? '') || '.jpg'
    const imgPath = __dirname + '/toasty' + randomBytes(10).toString('hex') + fileExt;
    console.log('new image path: ' + imgPath)
    console.time('jimping')

    const mimeType = mime.lookup(fileExt)
    if (mimeType === 'image/gif') {
        await deepfryGif({ url: url, filePath: imgPath, msg: msg })
    } else if (mimeType.toString().includes('image')) {
        await deepFryImg({ url: url, filePath: imgPath, msg: msg })
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
function deepFryImg({ url, filePath, msg }: { url: string, filePath: string, msg: Discord.Message }): Promise<boolean> {
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
async function deepfryGif({ url, filePath, msg }: { url: string, filePath: string, msg: Discord.Message }): Promise<boolean> {
    console.log('frying gif')
    await Jimp.read(url).
        then(jimage => {
            console.log('processing image')
            jimage
                .write(filePath)
            return true;
        })
        .catch(err => {
            console.error(err)
            msg.reply('something failed homie')
            return false;
        })
    return GifUtil.read(filePath)
        .then(async gif => {
            const frames = gif.frames
            if (frames.length > 1000) {
                msg.reply('too many frames')
                return false;
            }
            const friedFrames: GifFrame[] = []
            console.log('total frames: ' + frames.length)
            for (const frame of frames) {
                console.log('frying frame')
                const friedJimp = (GifUtil.shareAsJimp(Jimp, frame) as Jimp).quality(20)
                    .contrast(0.7)
                    .posterize(1)
                    .pixelate(1.7)
                friedFrames.push(new GifFrame(friedJimp.bitmap))
            }
            await GifUtil.write(filePath, friedFrames).then(gif => {
                console.log('gif:\n' + inspect(gif))
            }).catch(e => {
                console.error(e)
                msg.reply('failed to fry gif')
                throw e
            })
            console.log('replying with gif')
            msg.reply('nice', {
                files: [filePath]
            })
            return true
        })
        .catch(e => {
            console.log(e)
            msg.reply('failed to fry gif')
            return false
        })

}
client.login(process.env.login_key);