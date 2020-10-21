"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElChingon = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
class ElChingon {
    static get help() {
        return `
hola cabrones! si quieren me pueden pedir memes, o con la ayuda de mi amigo dankbot les puedo fritar un meme tambien!
- para pedir memes no es mas que escribir: \`.gon meme\`, y changale que les envio un meme! (todavia no esta listo)
- para fritar memes nomas tienen que escribir: \`.gon fritar\` (todavia no esta listo)

me disculpo que nada funcione todavia, pero todo chingon necesita dias de descanso!
no se preocupen que llegara pronto...
`;
    }
    /**
     * creates el chingon client, still needs to be logged in
     */
    static create() {
        const gon = new discord_js_1.default.Client();
        gon.on('message', msg => ElChingon.onMessage(msg));
        return gon;
    }
    static onMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.content.startsWith('.gon'))
                return;
            const commands = msg.content.split(' ');
            switch (commands[1]) {
                case 'meme':
                    msg.reply('sorry viejo, no esta listo todavia!');
                    break;
                default:
                case 'ayuda':
                    msg.reply(ElChingon.help);
                    break;
            }
        });
    }
}
exports.ElChingon = ElChingon;
