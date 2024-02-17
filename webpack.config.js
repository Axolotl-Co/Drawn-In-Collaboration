const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: '.', //will update with top-level file later
    output: {
        filename: main.jsx,
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
             test: /\.jsx?$/, 
             exclude: /node_modules/,
             use: [
                {loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
             ],
            },
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',

            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true, //makes a g zip compression- aka quicker
      port: 8080,
      open: true,
      hot: true,
      proxy: [
        {
        context: ['/api', 'signup', 'drawing'], // add routes here as needed
        target: 'http//localhost:3000', // this is the backend/server 
        secure: false, //if proxy should verify SSL cert, needed for dev enviroment to be false
        changeOrigin: true, // will change origin header to domain of target b4 forwarding. can be necesary to prevent CSRF attack

    },
]
    },  
};

