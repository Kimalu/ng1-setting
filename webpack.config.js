var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var autoprefixer = require('autoprefixer');
var args = require('yargs').argv;

// parameters
var isProd = args.prod;
var isMock = args.mock;

var base = './';
// use mock api or not
var entryJs = base + 'src/app/index.js';
var plugins = [
    new webpack.DefinePlugin({
        __PROD__: isProd,
        __MOCK__: isMock
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', isProd ? 'vendor.[hash].js' : 'vendor.js'),
    new ExtractTextPlugin(isProd ? '[name].[hash].css' : '[name].css'),
    new HtmlWebpackPlugin({
        template: './src/app/index.html',
        filename: 'index.html',
        inject: 'body',
        minify: false,
        chunks: ['app', 'vendor']
    }),
    new CopyWebpackPlugin([{
            from: 'node_modules/babel-core/browser-polyfill.min.js',
            to: 'polyfill.js'
        }, {
            from: 'src/app/components',
            to: 'components'
        }, {
        from: 'src/mock',
        to: 'mock'
    }
    ])
];

if (isProd) {
    plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            drop_console: true,
            },
            mangle: false
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    );
}

module.exports = {
    entry: {
        app: [
            entryJs

        ],
        // auth: [authJs],
        vendor: [
            'angular',
            'angular-ui-router',
            'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'angular-bindonce',
            'angular-animate',
            'angular-messages',
            'angular-loading-bar',
            'oclazyload'
        ]
    },
    output: {
        path: base + 'build',
        filename: isProd ? '[name].[hash].js' : '[name].js',
        chunkFilename: isProd ? '[name].[hash].chunk.js' : '[name].chunk.js'
    },
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint",
            exclude: /node_modules/
        }],
        loaders: [{
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('vue-style', 'css?sourceMap!postcss!stylus')
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css-loader') //'vue-style', 'css?sourceMap'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader: 'file?name=assets/fonts/[name].[ext]?[hash]'
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=8192&name=assets/images/[name].[hash].[ext]'
            }
        ]
    },

    plugins: plugins,
    debug: !isProd,
    devtool: false,
    devServer: {
        contentBase: base + 'build',
        historyApiFallback: true,
        stats: {
            modules: false,
            cached: false,
            colors: true,
            chunk: false
        },
        host: '0.0.0.0',
        port: 3000
    }
    // ,
    // postcss: function () {
    //     return [autoprefixer];
    // }
};
