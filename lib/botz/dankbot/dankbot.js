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
exports.Dankbot = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const fryer_1 = require("./fryer");
class Dankbot {
    /**
     * creates dank bot client, still needs to be logged in
     */
    static create() {
        const dbot = new discord_js_1.default.Client();
        dbot.on('message', msg => Dankbot.onMessage(msg));
        return dbot;
    }
    static onMessage(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!msg.content.startsWith('.db'))
                return;
            const commands = msg.content.split(' ');
            switch (commands[1]) {
                case 'fry':
                    yield Dankbot.handleFry(msg);
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
                        '\n - `help`');
                    break;
            }
        });
    }
    /**
     * handles frying of image or gif
     */
    static handleFry(msg) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let url;
            let name;
            const messages = yield msg.channel.messages.fetch({ limit: 10 }, false);
            for (const m of messages) {
                url = (_b = (_a = m[1].attachments) === null || _a === void 0 ? void 0 : _a.first()) === null || _b === void 0 ? void 0 : _b.url;
                if (url) {
                    name = (_d = (_c = m[1].attachments) === null || _c === void 0 ? void 0 : _c.first()) === null || _d === void 0 ? void 0 : _d.name;
                    break;
                }
                url = (_f = (_e = m[1].embeds[0]) === null || _e === void 0 ? void 0 : _e.image) === null || _f === void 0 ? void 0 : _f.url;
                if (url) {
                    name = 'epic';
                    break;
                }
                url = (_h = (_g = m[1].embeds[0]) === null || _g === void 0 ? void 0 : _g.thumbnail) === null || _h === void 0 ? void 0 : _h.url;
                if (url) {
                    name = 'epic';
                    break;
                }
            }
            if (!url) {
                console.log('no url found');
                msg.reply('couldn\'t find any images');
                return;
            }
            console.log('attempting deepfry');
            const [success, filePath] = yield fryer_1.Fryer.fry({ url: url !== null && url !== void 0 ? url : '' });
            if (success) {
                msg.reply('nice', {
                    files: [filePath]
                });
            }
            else {
                msg.reply('something went wrong, but don\'t worry, it wasn\'t my fault');
            }
        });
    }
}
exports.Dankbot = Dankbot;
