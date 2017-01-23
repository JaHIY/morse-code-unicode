import babel from "rollup-plugin-babel";
import eslint from "rollup-plugin-eslint";

const pkg = require("./package.json");
const deps = Object.keys(pkg.dependencies || {});
const moduleName = pkg.name;

export default {
    moduleName,
    entry: "src/main.js",
    sourceMap: true,
    external: deps,
    globals: {
        ramda: "R",
    },
    plugins: [
        babel({
            presets: [["es2015", { "modules": false }]],
            plugins: ["external-helpers"],
            babelrc: false,
            exclude: "node_modules/**",
        }),
        eslint(),
    ],
    targets: [
        { dest: "dist/main.umd.js", format: "umd" },
        { dest: "dist/main.es.js", format: "es" },
    ]
};
