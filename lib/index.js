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
Object.defineProperty(exports, "__esModule", { value: true });
// const Discord = require('discord.js')
const Discord = __importStar(require("discord.js"));
const client = new Discord.Client();
client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve();
});
client.on("message", msg => {
    if (!msg.content.startsWith('!dankbot'))
        return;
    const commands = msg.content.split(' ');
    switch (commands[1]) {
        default:
        case 'help':
            msg.reply('whats good homie' +
                '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\nahere are some commands:' +
                '\n  - `deepfry`' +
                '\n    - `mild`' +
                '\n    - `medium` (default)' +
                '\n    - `brutal`' +
                '\n - `help`');
            break;
        case 'fry':
            msg.reply('this feature is coming soooooon');
            break;
    }
    return Promise.resolve();
});
function deepFry() {
}
client.login(process.env.login_key);
