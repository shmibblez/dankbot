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
// const Discord = require('discord.js')
const discord_js_1 = __importDefault(require("discord.js"));
const util_1 = require("util");
const fs_1 = require("fs");
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
                '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\nahere are some commands:' +
                '\n  - `fry`' +
                '\n    - `mild`' +
                '\n    - `medium` (default)' +
                '\n    - `brutal`' +
                '\n - `help`');
            break;
    }
    return Promise.resolve();
}));
function deepFry(msg) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        console.log('getting messages');
        const messages = yield msg.channel.messages.fetch({ limit: 5 }, false);
        // await msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
        console.log('got messages:\n' + util_1.inspect(messages));
        let name;
        let url;
        for (const m of messages) {
            url = (_a = m[1].attachments.first()) === null || _a === void 0 ? void 0 : _a.url;
            if (url) {
                name = (_b = m[1].attachments.first()) === null || _b === void 0 ? void 0 : _b.name;
                break;
            }
        }
        if (!url) {
            console.log('no url found');
            // msg.reply('no image found')
            msg.reply('no images found, not cool bro');
            return;
        }
        console.log('url: ' + url);
        const imgPath = __dirname + '/toasty' + crypto_1.randomBytes(10).toString('hex') + '.png';
        console.log('new image path: ' + imgPath);
        console.time('jimping');
        const img = yield jimp_1.default.read(url, (e, jimage) => {
            if (e) {
                console.error(e);
                msg.reply('something failed homie, probably means no images sent or something, in other words stop wasting my time, yo');
                return;
            }
            console.log('processing image');
            jimage
                .pixelate(40)
                .contrast(0.95)
                .posterize(1)
                .write(imgPath);
            console.log('file: ' + util_1.inspect(fs_1.readFile(imgPath, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('file data:\n' + util_1.inspect(data));
            })));
        });
        console.timeEnd('jimping');
        console.log('jimp image: ' + img);
        console.log('sending image');
        msg.channel.send({
            files: [{
                    attachment: imgPath,
                    name: 'dankified_' + name
                }]
        });
        return;
    });
}
client.login(process.env.login_key);
