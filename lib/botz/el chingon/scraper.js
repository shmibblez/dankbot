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
exports.Scraper = exports.LittleHomie = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const cheerio_1 = __importDefault(require("cheerio"));
const discord_js_1 = __importDefault(require("discord.js"));
/**
 * helps el chingon handle:
 * - url storage (adds url to db),
 * - retrieval (gets url from db)
 * - and generation (when to get/scrape more, and a cycle with db)
 *
 * db (database) is discord message where el chingon stores meme objects
 * and index of each server's memes so they get a fresh one every time
 */
class LittleHomie {
    // TODO: store urls in discord, and download file instead of sending url (takes longer to load in app)
    static getMeme() {
        return __awaiter(this, void 0, void 0, function* () {
            // handle stored urls here and individual server indexes
            const [success, memes] = yield Scraper.cuantoCabronAleatorio();
            return [success, memes[0]];
        });
    }
    static sendMemes(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const [success, memes] = yield Scraper.cuantoCabronAleatorio();
            for (const m of memes) {
                let embed = new discord_js_1.default.MessageEmbed()
                    .setTitle(m.title)
                    .setURL(m.pgUrl)
                    .setColor('#ff0000')
                    .setImage(m.imgUrl);
                yield msg.channel.send(embed);
            }
        });
    }
}
exports.LittleHomie = LittleHomie;
/**
 * scrapes meme websites for urls
 */
class Scraper {
    // TODO: find out how to get random meme first, then do this:
    // .
    // every day at 11:59AM get all new image urls (from spanish meme websites) and store in map
    // Then store in map for the day and clear previous one, and for each sub that 
    //      asks for meme, keep track of which memes have already been sent and send fresh meme.
    //      If run out of memes, get more, or send message saying 'ran out of memes for today'
    /**
     * get urls from cuanto cabron group of websites (all similar layout)
     */
    static parseCuantoCabronRed(text) {
        const elements = cheerio_1.default('.box.story.rounded3px', text).toArray();
        const memes = elements.map((el, i) => {
            var _a;
            // TODO: check if fields empty and if yes make it say 'zonas batman, el joker tiene guacamole en el pelo?' so you know its serious
            // check with below function, and if any field empty, return [false, null] (and pass on in other functions)
            // function hasEmpty(vars: []) {
            //     for (const v of vars)
            //         if (!v) return true
            //     return false
            // }
            const children = el.children;
            const title = cheerio_1.default('.storyTitle', el).children().first().contents().toString();
            const pgUrl = cheerio_1.default('.storyTitle', el).children().first().attr('href').toString();
            const imgUrl = (_a = cheerio_1.default('.cclink', el).contents().attr('src')) === null || _a === void 0 ? void 0 : _a.toString();
            if (i === 0) {
                console.log('--------element stuff below');
                console.log(el);
                console.log(children);
                console.log(`title: ${title}, \nurl: ${imgUrl}`);
            }
            const meme = { title: title, imgUrl: imgUrl, pgUrl: pgUrl };
            return meme;
        });
        return memes;
    }
    static cuantoCabronAleatorio() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = 'https://www.cuantocabron.com/aleatorio/p/1';
            console.log('fetching website...');
            const [success, text] = yield node_fetch_1.default(url)
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const text = yield res.text();
                const memes = this.parseCuantoCabronRed(text);
                return [true, memes];
            })).catch(err => {
                console.log('failed to fetch website, error below');
                console.error(err);
                return [false, null];
            });
            if (success) {
                console.log('website text below');
                console.log(text);
                return [true, text];
            }
            else {
                return [false, text];
            }
        });
    }
    static getMemeWebsite() {
    }
}
exports.Scraper = Scraper;
