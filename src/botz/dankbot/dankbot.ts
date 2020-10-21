import Discord from 'discord.js'
import { Fryer } from './fryer';

export class Dankbot {

    /**
     * creates dank bot client, still needs to be logged in
     */
    static create(): Discord.Client {
        const dbot = new Discord.Client()

        dbot.on('message', msg => Dankbot.onMessage(msg))

        return dbot;
    }

    static async onMessage(msg: Discord.Message) {
        if (!msg.content.startsWith('.db')) return;
        const commands = msg.content.split(' ');
        switch (commands[1]) {
            case 'fry':
                await Dankbot.handleFry(msg)
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
    }

    /**
     * handles frying of image or gif
     */
    static async handleFry(msg: Discord.Message) {
        let url: string | null | undefined;
        let name: string | null | undefined
        const messages = await msg.channel.messages.fetch({ limit: 10 }, false)
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
            msg.reply('couldn\'t find any images')
            return;
        }

        console.log('attempting deepfry')
        const [success, filePath] = await Fryer.fry({ url: url ?? '' })
        if (success) {
            msg.reply('nice', {
                files: [filePath]
            })
        } else {
            msg.reply('something went wrong, but don\'t worry, it wasn\'t my fault')
        }
    }



}