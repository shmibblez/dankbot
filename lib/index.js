"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dankbot_1 = require("./botz/dankbot/dankbot");
const el_chingon_1 = require("./botz/el chingon/el chingon");
require('dotenv').config();
console.log("process.env");
// console.log(process.env)
const dankbot = dankbot_1.Dankbot.create();
dankbot.login(process.env.dankbot_login_key);
const elCabron = el_chingon_1.ElChingon.create();
elCabron.login(process.env.el_chingon_login_key);
