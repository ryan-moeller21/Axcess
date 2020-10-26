const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./src/app/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

module.exports = {
    /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
    mode: "development",
    entry: {
        app: path.join(__dirname, "./src/static/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].js"
    },
    devtool: 'cheap-module-source-map',
    resolve: {
      extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: "Axcess", 
          meta: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            "theme-color": "#000000"
          },
          manifest: "manifest.json",
          filename: "index.html",
          template: "./src/static/index.html",
          hash: true
        }),
        new CopyPlugin({
          patterns:[
            { 
              from: path.join(__dirname, "./src/app/icons"),
              to : "icons"
            }
          ]
        }),
        new WebpackExtensionManifestPlugin({
          config: {
            base: baseManifest
          }
        })
      ],
    module: {
        rules: require('./webpack.rules')
    }
}
