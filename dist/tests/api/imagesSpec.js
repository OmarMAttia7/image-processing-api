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
const supertest_1 = __importDefault(require("supertest"));
const api_1 = __importDefault(require("../../api"));
describe("/api/images", () => {
    const requset = (0, supertest_1.default)(api_1.default);
    it("responds with status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/api/images").expect(200);
    }));
    /*
      TODO
      - dynamically generate test image names to avoid test bugs if file names change
    */
    it("responds with full image", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset
            .get("/api/images/icelandwaterfall")
            .expect(200)
            .expect("Content-Type", /image/);
    }));
    it("responds with status 404 if image is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset.get("/api/images/doesntexist").expect(404);
    }));
    it("responds with scaled image", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset
            .get("/api/images/fjord?width=100&height=100")
            .expect(200)
            .expect("Content-Type", /image/);
    }));
    it("correctly handles invalid widths", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset
            .get("/api/images/fjord?width=stringWidth&height=100")
            .expect(400);
    }));
    it("correctly handles invalid heights", () => __awaiter(void 0, void 0, void 0, function* () {
        yield requset
            .get("/api/images/fjord?width=100&height=stringHeight")
            .expect(400);
    }));
});
