const path = require("path");

exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  devTool: "source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.tsx?$/,
        exclude: "/node_modules/",
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env"] },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
};
