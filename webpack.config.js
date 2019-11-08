const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

// "publicPath" allows you to specify the base path for all the assets within your application. 
// "historyAPIFallback" will redirect 404s to /index.html.

module.exports = {

    devtool: 'inline-source-map', // for devtools for better debugging in chrome
    devServer: {  //used to build server in dist folder
        inline: true,
        contentBase: path.join(__dirname, 'dist'),
        port: config.PORT,
        watchContentBase: true,
        progress: true,
        historyApiFallback: true //will redirect history 404 to index.html
    },
    entry: './src/index.js',  //entry point into webapp
    output: {
        filename: 'bundle.js',
        publicPath: "/",
        path: path.resolve(__dirname, 'dist') //location to throw output compiled file
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"] },
            
            {
                test:/\.worker\.js$/ ,
                loader: 'worker-loader',
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: ['file-loader']
            },

            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /(\.css|\.scss|\.sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')
                            ],
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, 'src', 'scss')],
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ // to generate file
            template: './public/index.html',
            filename: 'index.html',
            inject: 'body' 
        }) 
    ]

}