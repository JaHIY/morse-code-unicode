import R from "ramda";

// The morseTable is from https://github.com/hustcc/xmorse
const morseTable = {
      /* Letters                               */
        "A": "01",      /* A                   */
        "B": "1000",    /* B                   */
        "C": "1010",    /* C                   */
        "D": "100",     /* D                   */
        "E": "0",       /* E                   */
        "F": "0010",    /* F                   */
        "G": "110",     /* G                   */
        "H": "0000",    /* H                   */
        "I": "00",      /* I                   */
        "J": "0111",    /* J                   */
        "K": "101",     /* K                   */
        "L": "0100",    /* L                   */
        "M": "11",      /* M                   */
        "N": "10",      /* N                   */
        "O": "111",     /* O                   */
        "P": "0110",    /* P                   */
        "Q": "1101",    /* Q                   */
        "R": "010",     /* R                   */
        "S": "000",     /* S                   */
        "T": "1",       /* T                   */
        "U": "001",     /* U                   */
        "V": "0001",    /* V                   */
        "W": "011",     /* W                   */
        "X": "1001",    /* X                   */
        "Y": "1011",    /* Y                   */
        "Z": "1100",    /* Z                   */
      /* Numbers                               */
        "0": "11111",   /* 0                   */
        "1": "01111",   /* 1                   */
        "2": "00111",   /* 2                   */
        "3": "00011",   /* 3                   */
        "4": "00001",   /* 4                   */
        "5": "00000",   /* 5                   */
        "6": "10000",   /* 6                   */
        "7": "11000",   /* 7                   */
        "8": "11100",   /* 8                   */
        "9": "11110",   /* 9                   */
      /* Punctuation                           */
        ".": "010101",  /* Full stop           */
        ",": "110011",  /* Comma               */
        "?": "001100",  /* Question mark       */
        "'": "011110",  /* Apostrophe          */
        "!": "101011",  /* Exclamation mark    */
        "/": "10010",   /* Slash               */
        "(": "10110",   /* Left parenthesis    */
        ")": "101101",  /* Right parenthesis   */
        "&": "01000",   /* Ampersand           */
        ":": "111000",  /* Colon               */
        ";": "101010",  /* Semicolon           */
        "=": "10001",   /* Equal sign          */
        "+": "01010",   /* Plus sign           */
        "-": "100001",  /* Hyphen1minus        */
        "_": "001101",  /* Low line            */
        "\"": "010010", /* Quotation mark      */
        "$": "0001001", /* Dollar sign         */
        "@": "011010",  /* At sign             */
};

const reverseMorseTable = R.invertObj(morseTable);

const convertUnicodeToMorseBinary = ch => ch.charCodeAt(0).toString(2);

const convertMorseBinaryToUnicode = bin => String.fromCharCode(parseInt(bin, 2));

const defaultOptions = {
    delimiter: "/",
    short: ".",
    long: "-"
};

/**
 *  @since 0.0.1
 *
 *  Returns the morse code of message passed to the function.
 *
 *  @example <caption>ascii</caption>
 *  encodeMorseCode("I have an apple.")
 *
 *  @example <caption>unicode</caption>
 *  encodeMorseCode("もぎゅっと“love”で接近中！")
 *
 *  @example <caption>options</caption>
 *  const options = {
 *      long: "2",
 *      short: "1",
 *      delimiter: "0",
 *  };
 *  encodeMorseCode("爱してるばんざーい！", options);
 *
 *  @param {!string} msg - original message
 *  @param {!Object} [options={}] - optional config
 *  @param {!string} [options.long="-"] - the long signal in morse code
 *  @param {!string} [options.short="."] - the short signal in morse code
 *  @param {!string} [options.delimiter="/"] - the delimiter in morse code
 *  @return {!string} morse code
 */
export function encodeMorseCode(
    msg,
    {
        long = defaultOptions.long,
        short = defaultOptions.short,
        delimiter = defaultOptions.delimiter
    } = {}
) {
    const codeList = [
        short,
        long,
        delimiter,
    ];

    return R.compose(
        R.join(""),
        R.map(R.nth(R.__, codeList)),
        R.split(""),
        R.join("2"),
        R.map(
            R.ifElse(
                R.has(R.__, morseTable),
                R.prop(R.__, morseTable),
                convertUnicodeToMorseBinary
            )
        ),
        R.split(""),
        R.toUpper,
        R.replace(/\s+/g, "")
    )(msg);
}

/**
 *  @since 0.0.1
 *
 *  Returns the original message of morse code passed to the function.
 *
 *  @example <caption>ascii</caption>
 *  decodeMorseCode("../..../.-/...-/./.-/.--././-./.-.-.-")
 *
 *  @example <caption>unicode</caption>
 *  decodeMorseCode("--....--.-----/--.....--.----/---..---../.----./.../../-.-./--.....--.---./--....--.-----")
 *
 *  @example <caption>options</caption>
 *  const options = {
 *      long: "2",
 *      short: "1",
 *      delimiter: "0",
 *  };
 *  decodeMorseCode("222112221101222210111", options);
 *
 *  @param {!string} morseCode - morse code
 *  @param {!Object} [options={}] - optional config
 *  @param {!string} [options.long="-"] - the long signal in morse code
 *  @param {!string} [options.short="."] - the short signal in morse code
 *  @param {!string} [options.delimiter="/"] - the delimiter in morse code
 *  @return {!string} original code
 */
export function decodeMorseCode(
    morseCode,
    {
        long = defaultOptions.long,
        short = defaultOptions.short,
        delimiter = defaultOptions.delimiter
    } = {}
) {
    const codeTable = {
        [short]: 0,
        [long]: 1,
        [delimiter]: 2,
    };

    return R.compose(
        R.join(""),
        R.map(
            R.ifElse(
                R.has(R.__, reverseMorseTable),
                R.prop(R.__, reverseMorseTable),
                convertMorseBinaryToUnicode,
            )
        ),
        R.split("2"),
        R.join(""),
        R.map(
            R.ifElse(
                R.has(R.__, codeTable),
                R.prop(R.__, codeTable),
                R.always("")
            )
        ),
        R.split("")
    )(morseCode);
}
