module.exports = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
    }
]
