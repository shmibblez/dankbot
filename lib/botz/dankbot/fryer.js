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
exports.Fryer = void 0;
const mime = __importStar(require("mime-types"));
const crypto_1 = require("crypto");
const path_1 = require("path");
const jimp_1 = __importDefault(require("jimp"));
class Fryer {
    /**
     *
     * @param url url of image/gif
     * @returns whether success, and either path of processed file (image or gif), or error message -> [success, file path/error msg]
     */
    static fry({ url }) {
        return __awaiter(this, void 0, void 0, function* () {
            const ext = path_1.extname(url !== null && url !== void 0 ? url : '') || '.jpg';
            const mimeType = mime.lookup(ext);
            let result;
            if (mimeType === 'image/gif') {
                result = yield Fryer.fryGif({ url: url, ext: ext });
            }
            else if (mimeType.toString().includes('image')) {
                result = yield Fryer.fryImg({ url: url, ext: ext });
            }
            else {
                return [false, 'file type not supported homie'];
            }
            return result;
        });
    }
    static fryImg({ url, ext }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = __dirname + '/toasty' + crypto_1.randomBytes(10).toString('hex') + ext;
            const result = jimp_1.default.read(url).
                then(jimage => {
                console.log('processing image');
                jimage
                    .quality(20)
                    .contrast(0.7)
                    .posterize(1)
                    .pixelate(1.7)
                    .write(filePath);
                //
                return [true, filePath];
            })
                .catch(err => {
                console.error(err);
                return [false, filePath];
            });
            return result;
        });
    }
    static fryGif({ url, ext }) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = __dirname + '/toasty' + crypto_1.randomBytes(10).toString('hex') + ext;
            // TODO: split gif into frames, fry, then combine again, might need to first convert gif into supported format
            return [true, '[file path]'];
        });
    }
}
exports.Fryer = Fryer;
