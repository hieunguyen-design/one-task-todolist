const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point
  output: {
    filename: "main.js", // Output bundle
    path: path.resolve(__dirname, "dist"), // Output folder
    clean: true, // Clean dist/ before build
  },
  mode: "development", // or 'production'
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html", // Handle HTML
    }),
  ],
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
    static: "./dist", // Serve content from /dist
    open: true, // Auto-open browser
    hot: true, // Enable hot module replacement (if applicable)
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Handle CSS
      },
      // {
      //   test: /\.html$/i,
      //   loader: "html-loader", //html-loader for Image
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //Image loader
        type: "asset/resource",
      },
    ],
  },
};
