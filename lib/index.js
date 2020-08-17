"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// const Discord = require('discord.js')
const discord_js_1 = __importDefault(require("discord.js"));
const mime = __importStar(require("mime-types"));
const jimp_1 = __importDefault(require("jimp"));
const crypto_1 = require("crypto");
const client = new discord_js_1.default.Client();
client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve();
});
client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg.content.startsWith('!dankbot'))
        return;
    if (msg.channel.type != 'text')
        return;
    const commands = msg.content.split(' ');
    switch (commands[1]) {
        case 'fry':
            // msg.reply('this feature is coming soooooon')
            console.log('attempting deepfry');
            yield deepFry(msg);
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
    return Promise.resolve();
}));
function deepFry(msg) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getting messages');
        const messages = yield msg.channel.messages.fetch({ limit: 5 }, false);
        // await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        let name;
        let url;
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
            // msg.reply('no image found')
            msg.reply('no images found');
            return;
        }
        console.log('url: ' + url);
        let imgPath = __dirname + '/toasty' + crypto_1.randomBytes(10).toString('hex');
        console.log('new image path: ' + imgPath);
        console.time('jimping');
        yield jimp_1.default.read(url).
            then(jimage => {
            console.log('processing image');
            imgPath += mime.extension(jimage.getMIME());
            jimage
                .quality(20)
                .contrast(0.7)
                .posterize(1)
                .pixelate(1.7)
                .write(imgPath);
        })
            .catch(err => {
            console.error(err);
            msg.reply('something failed homie');
            return;
        });
        console.timeEnd('jimping');
        console.log('sending image');
        msg.reply('nice', {
            files: [imgPath]
        });
        return;
    });
}
client.login(process.env.login_key);
