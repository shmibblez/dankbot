import fetch from 'node-fetch'
import ch from 'cheerio'
import { inspect } from 'util'
import { strict } from 'assert'

// TODO: add comments and likes
type meme = { title: string, imgUrl: string, pgUrl: string }
/**
 * helps el chingon handle url storage, retrieval, and generation (when to get/scrape more)
 */
export class LittleHomie {

    static async getMeme(): Promise<[boolean, meme]> {
        // handle stored urls here and individual server indexes
        const [success, memes] = await Scraper.cuantoCabronAleatorio()
        return [success, memes[0]]
    }

}

/**
 * scrapes meme websites for urls
 */
export class Scraper {

    // TODO: find out how to get random meme first, then do this:
    // .
    // every day at 11:59AM get all new image urls (from spanish meme websites) and store in map
    // Then store in map for the day and clear previous one, and for each sub that 
    //      asks for meme, keep track of which memes have already been sent and send fresh meme.
    //      If run out of memes, get more, or send message saying 'ran out of memes for today'

    /**
     * get urls from cuanto cabron group of websites (all similar layout)
     */
    static parseCuantoCabronRed(text: string): meme[] {

        const elements = ch('.box.story.rounded3px', text).toArray()
        const memes = elements.map(
            (el, i) => {
                // TODO: check if fields empty and if yes make it say 'zonas batman, el joker tiene guacamole en el pelo?' so you know its serious
                // check with below function, and if any field empty, return [false, null] (and pass on in other functions)
                // function hasEmpty(vars: []) {
                //     for (const v of vars)
                //         if (!v) return true
                //     return false
                // }
                const children = el.children
                const title: string = ch('.storyTitle', el).children().first().contents().toString()
                const pgUrl: string = ch('.storyTitle', el).children().first().attr('href').toString()
                const imgUrl: string = ch('.cclink', el).contents().attr('src')?.toString()
                if (i === 0) {
                    console.log('--------element stuff below')
                    console.log(el)
                    console.log(children)
                    console.log(`title: ${title}, \nurl: ${imgUrl}`)
                }
                const meme: meme = { title: title, imgUrl: imgUrl, pgUrl: pgUrl }
                return meme
            }
        )

        return memes
    }

    static async cuantoCabronAleatorio(): Promise<[boolean, meme[]]> {
        const url = 'https://www.cuantocabron.com/aleatorio/p/1'
        console.log('fetching website...')
        const [success, text] = await fetch(url)
            .then<[boolean, meme[]]>(async res => {
                const text = await res.text()
                const memes = this.parseCuantoCabronRed(text)
                return [true, memes]
            }).catch<[boolean, meme[]]>(err => {
                console.log('failed to fetch website, error below')
                console.error(err)
                return [false, null]
            })

        if (success) {
            console.log('website text below')
            console.log(text)
            return [true, text]
        }
        else {
            return [false, text]
        }


    }
    static getMemeWebsite() {

    }
}