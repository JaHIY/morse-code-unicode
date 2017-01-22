const path = require("path");

const config = {
    resolve: {
        modules: [
            path.resolve(__dirname, "src"),
            "node_modules"
        ],
    },
    context: path.resolve(__dirname, "src"),
    entry: {
        main: ["./main.js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        library: "morse-code",
        libraryTarget: "umd",
    },
    externals: {
        ramda: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: "eslint-loader",
                exclude: /node_modules/,
                enforce: "pre",
            },
        ]
    },
};

module.exports = config;
