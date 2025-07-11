const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
    clean: true, // Clean dist folder before each build
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              declaration: false, // Disable .d.ts files
              declarationMap: false, // Disable .d.ts.map files
              sourceMap: false, // Disable .js.map files
              noEmit: false, // Allow emit for webpack
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
