import * as mime from 'mime-types'
import { randomBytes } from 'crypto'
import { extname } from 'path'
import Jimp from 'jimp'

export class Fryer {

    /**
     * 
     * @param url url of image/gif
     * @returns whether success, and either path of processed file (image or gif), or error message -> [success, file path/error msg]
     */
    static async fry({ url }: { url: string }): Promise<[boolean, string]> {

        const ext = extname(url ?? '') || '.jpg'
        const mimeType = mime.lookup(ext)

        let result: [boolean, string]
        if (mimeType === 'image/gif') {
            result = await Fryer.fryGif({ url: url, ext: ext })
        } else if (mimeType.toString().includes('image')) {
            result = await Fryer.fryImg({ url: url, ext: ext })
        } else {
            return [false, 'file type not supported homie']
        }

        return result
    }

    static async fryImg({ url, ext }: { url: string, ext: string }): Promise<[boolean, string]> {
        const filePath = __dirname + '/toasty' + randomBytes(10).toString('hex') + ext;

        const result = Jimp.read(url).
            then<[boolean, string]>(jimage => {
                console.log('processing image')
                jimage
                    .quality(20)
                    .contrast(0.7)
                    .posterize(1)
                    .pixelate(1.7)
                    .write(filePath)
                //
                return [true, filePath]
            })
            .catch<[boolean, string]>(err => {
                console.error(err)
                return [false, filePath]
            })
        return result
    }

    static async fryGif({ url, ext }: { url: string, ext: string }): Promise<[boolean, string]> {
        const filePath = __dirname + '/toasty' + randomBytes(10).toString('hex') + ext;

        // TODO: split gif into frames, fry, then combine again, might need to first convert gif into supported format

        return [true, '[file path]']
    }

}