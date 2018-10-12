var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
function rdom() {
    var rdm = Math.floor(Math.random() * 20 + 1);
    if (rdm < 10) {
        rdm = 'http://cdn' + '0' + rdm.toString() + '.ttpaicdn.com';
    } else {
        rdm = 'http://cdn' + rdm.toString() + '.ttpaicdn.com';
    }
    return '';
}
module.exports = {
    entry: {       
        home:'./public/js/home/home.js'
    },
    output: {
        path: path.join(__dirname, './public/dist/'),
        filename: 'js/[name].js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },{ 
            test: /\.js$/,
            exclude: /node_modules/, 
            loader: 'babel'
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader")
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=10000&name=images/[name].[ext]'
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=fonts/[name].[ext]"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?name=svg/[name].[ext]"
        }, {
            test: require.resolve("jquery"), 
            loader: "expose-loader?$" 
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime','transform-object-rest-spread','babel-polyfill']
    },
    plugins: [
        new ExtractTextPlugin("css/[name].css"),
        new CleanWebpackPlugin([path.join(__dirname, './public/dist/')]), //清除旧文件
         new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            mangle: {
                except: ['$', 'exports', 'require']
            }
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new AssetsPlugin({
            filename: 'fry.map.json',
            path: path.join(__dirname, './public/dist/'),
            prettyPrint: true,
            fullPath: true,
            processOutput: function(assets) {
                var now = Date.now();

                for (var i in assets) {

                    for (var j in assets[i]) {

                        assets[i][j] = assets[i][j] + "?v=" + now.toString();
                    }

                }
                return JSON.stringify(assets);
            }
        })
    ]
}
