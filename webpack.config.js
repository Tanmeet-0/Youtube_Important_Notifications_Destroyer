const Terser_Plugin = require("terser-webpack-plugin");
const Path = require("path");

module.exports = {
    entry: {
        restructure_notifications: "./src/restructure_notifications.ts",
        popup: "./src/popup.ts",
    },
    output: { filename: "[name].js", path: Path.resolve(__dirname, "scripts") },
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
    },
    resolve: { extensions: [".ts"] },
    mode: "none",
    optimization: {
        concatenateModules: true,
        minimize: true,
        minimizer: [
            new Terser_Plugin({
                terserOptions: {
                    ecma: 2022,
                    compress: false,
                    mangle: false,
                    output: { comments: false, beautify: true },
                },
            }),
        ],
    },
};
