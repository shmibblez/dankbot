import Discord from 'discord.js'

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
                msg.reply('sorry homes, no esta listo todavia!')
                break;
            case 'fritar':
                msg.reply('sorry homes, no esta listo todavia!')
                break;
            default:
            case 'ayuda':
                msg.reply(ElChingon.help)
                break;
        }
    }
}