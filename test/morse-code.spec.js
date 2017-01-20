import { expect } from "chai";
import { encodeMorseCode, decodeMorseCode } from "../src/main";

describe("Morse Code", () => {
    it("should have a encode function", () => {
        expect(encodeMorseCode).to.be.a("function");
    });

    it("should encode morse code from ANSI characters", () => {
        expect(encodeMorseCode("abcd")).to.be.equal(".-/-.../-.-./-..");
    });

    it("should encode morse code from Unicode characters", () => {
        expect(encodeMorseCode("你好")).to.be.equal("-..----.--...../-.--..-.-----.-");
    });

    it("should encode morse code from mixed characters", () => {
        expect(encodeMorseCode("ab你")).to.be.equal(".-/-.../-..----.--.....");
    });

    it("should have options for delimiter in encode function", () => {
        expect(encodeMorseCode("ab你", { delimiter: "1" })).to.be.equal(".-1-...1-..----.--.....");
    });

    it("should have options for long in encode function", () => {
        expect(encodeMorseCode("ab你", { long: "1" })).to.be.equal(".1/1.../1..1111.11.....");
    });

    it("should have options for short in encode function", () => {
        expect(encodeMorseCode("ab你", { short: "1" })).to.be.equal("1-/-111/-11----1--11111");
    });

    it("should have options for long, short and delimiter in encode function", () => {
        expect(encodeMorseCode("ab你", { long: "0", short: "2", delimiter: "1" })).to.be.equal("20102221022000020022222");
    });

    it("should have a decode function", () => {
        expect(decodeMorseCode).to.be.a("function");
    });

    it("should decode morse code from ANSI characters", () => {
        expect(decodeMorseCode(".-/-.../-.-./-..")).to.be.equal("ABCD");
    });

    it("should decode morse code from Unicode characters", () => {
        expect(decodeMorseCode("-..----.--...../-.--..-.-----.-")).to.be.equal("你好");
    });

    it("should decode morse code from mixed characters", () => {
        expect(decodeMorseCode(".-/-.../-..----.--.....")).to.be.equal("AB你");
    });

    it("should have options for delimiter in decode function", () => {
        expect(decodeMorseCode(".-1-...1-..----.--.....", { delimiter: "1" })).to.be.equal("AB你");
    });

    it("should have options for long in decode function", () => {
        expect(decodeMorseCode(".1/1.../1..1111.11.....", { long: "1" })).to.be.equal("AB你");
    });

    it("should have options for short in decode function", () => {
        expect(decodeMorseCode("1-/-111/-11----1--11111", { short: "1" })).to.be.equal("AB你");
    });

    it("should have options for long, short and delimiter in decode function", () => {
        expect(decodeMorseCode("20102221022000020022222", { long: "0", short: "2", delimiter: "1" })).to.be.equal("AB你");
    });

});
