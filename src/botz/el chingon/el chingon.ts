import Discord from 'discord.js'
import { LittleHomie } from './scraper'

export class ElChingon {

    static get help() {
        return `
hola cabrones! si quieren me pueden pedir memes, o con la ayuda de mi amigo dankbot les puedo fritar un meme tambien!
- para pedir memes no es mas que escribir: \`.gon meme\`, y changale que les envio un meme! (todavia no esta listo)
- para fritar memes nomas tienen que escribir: \`.gon fritar\` (todavia no esta listo)

me disculpo que nada funcione todavia, pero todo chingon necesita dias de descanso!
no se preocupen que llegara pronto...
`
    }

    /**
     * creates el chingon client, still needs to be logged in
     */
    static create(): Discord.Client {
        const gon = new Discord.Client()

        gon.on('message', msg => ElChingon.onMessage(msg))

        return gon
    }

    static async onMessage(msg: Discord.Message) {
        if (!msg.content.startsWith('.gon')) return;
        const commands = msg.content.split(' ');
        switch (commands[1]) {
            case 'meme':
                const [success, meme] = await LittleHomie.getMeme()
                if (!success) {
                    msg.reply('algo fallo pinche guey! pero tranquilo que no fue mi culpa')
                    return
                }
                const embed = new Discord.MessageEmbed()
                    .setTitle(meme.title)
                    .setURL(meme.pgUrl)
                    .setColor('#ff0000')
                    .setImage(meme.imgUrl)
                await msg.channel.send(embed)
                break;
            case 'fritar':
                await msg.reply('sorry homes, no esta listo todavia!')
                break;
            default:
            case 'ayuda':
                await msg.reply(ElChingon.help)
                break;
        }
    }
}