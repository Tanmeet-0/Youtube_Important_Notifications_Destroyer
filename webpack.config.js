module.exports = {
    entry: {
        restructure_notifications: "./src/restructure_notifications.ts",
        settings: "./src/settings.ts",
    },
    output: { filename: "[name].js", path: __dirname + "/scripts" },
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
    },
    resolve: { extensions: [".ts"] },
    mode: "none",
};
