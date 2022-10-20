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
const promises_1 = __importDefault(require("fs/promises"));
const images_1 = __importDefault(require("../../../api/configs/images"));
const images_2 = require("../../../api/services/images");
const parseDimensions_1 = __importDefault(require("../../../api/services/images/parseDimensions"));
describe("Image methods", () => __awaiter(void 0, void 0, void 0, function* () {
    let imageName;
    let imageExtension;
    let imageFile;
    // Set up an image for testing
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const fullImagesDir = yield promises_1.default.readdir(images_1.default.dir.full);
        imageName = fullImagesDir[0].substring(0, fullImagesDir[0].lastIndexOf("."));
        imageExtension = fullImagesDir[0].substring(fullImagesDir[0].lastIndexOf(".") + 1);
        imageFile = yield promises_1.default.readFile(`${images_1.default.dir.full}/${imageName}.${imageExtension}`);
    }));
    describe("searchForImage()", () => __awaiter(void 0, void 0, void 0, function* () {
        it("verifies if image exists", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield (0, images_2.searchForImage)(imageName)).toEqual({
                exists: true,
                extension: imageExtension,
                type: "original",
            });
        }));
        it("verifies if image doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield (0, images_2.searchForImage)("animag/*%^$&/ethatdoesntexist")).toEqual({
                exists: false,
            });
        }));
    }));
    describe("getImageFile()", () => __awaiter(void 0, void 0, void 0, function* () {
        it("gets image file content and extension", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield (0, images_2.getImageFile)(imageName)).toEqual({
                file: imageFile,
                extension: imageExtension
            });
        }));
        it("returns false if image doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(yield (0, images_2.getImageFile)("animag/*%^$&/ethatdoesntexist")).toBeFalse();
        }));
    }));
    describe("parseDimensions()", () => {
        it("parses width and height correctly", () => {
            expect((0, parseDimensions_1.default)("100", "100")).toEqual({ width: 100, height: 100 });
        });
        it("returns false if inputs are not valid", () => {
            expect((0, parseDimensions_1.default)("stringwidth", "100")).toBeFalse();
            expect((0, parseDimensions_1.default)("100", "stringheight")).toBeFalse();
            expect((0, parseDimensions_1.default)("stringwidth", "stringheight")).toBeFalse();
        });
    });
}));
