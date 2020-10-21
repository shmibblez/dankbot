import { Dankbot } from './botz/dankbot/dankbot'
import { ElChingon } from './botz/el chingon/el chingon'
require('dotenv').config()

console.log("process.env")
// console.log(process.env)

const dankbot = Dankbot.create();
dankbot.login(process.env.dankbot_login_key);

const elCabron = ElChingon.create();
elCabron.login(process.env.el_chingon_login_key);


// TODO
// 
// PROBLEMS
// - dankbot can't fry memes retrieved by el_chingon