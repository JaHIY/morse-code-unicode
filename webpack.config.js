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
                use: [
                    {
                        loader: "eslint-loader",
                        options: {
                            parserOptions: {
                                ecmaVersion: 2017,
                                sourceType: "module",
                                ecmaFeatures: {
                                    impliedStrict: true,
                                    jsx: true,
                                }
                            },
                            rules: {
                                semi: 0
                            },
                        }
                    }
                ],
                exclude: /node_modules/,
                enforce: "pre",
            },
        ]
    },
};

module.exports = config;
