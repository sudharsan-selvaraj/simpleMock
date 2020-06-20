const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
    entry: {
        vendor: ['jquery', 'bootstrap'],
        main: ['./src/index.jsx']
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    output: {
        path: path.join(__dirname, './docs'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/, /code.js$/],
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /code.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "uglify-loader",
                        options: {
                            mangle: true,
                            compress: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: './src/index.html', to: './' },
                // { from: './src/logo.png', to: './' },
                { from: './node_modules/bootstrap/dist/css/bootstrap.css', to: './' },
                { from: './src/assets/font-awesome.min.css', to: './' },
                { from: './src/assets/webfonts/', to: './webfonts/' },
                { from: './src/assets/logo.png', to: './' }
            ],
        })
    ],

};
