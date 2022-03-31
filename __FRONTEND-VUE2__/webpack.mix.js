/* global path */
let mix = require('laravel-mix');
const path = require('path');
// require('./webpack.mix.addon');
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
const ignorePlugin = new webpack.IgnorePlugin({
	resourceRegExp: /^\.\/gitlog\.json$/,
	contextRegExp: /public$/
});
const sassOptions = {
	sassOptions: {
		quietDeps: true
	}
};

mix.setPublicPath('../public');
mix.options({
	manifest: 'mix-manifest-vue2.json'
});
mix.webpackConfig({
	resolve: {
		alias: {
			'@': path.resolve('./src/cockpit/css'),
			'~': path.resolve('./node_modules')
		}
	},
	plugins: [ignorePlugin]
	// plugins: [new BundleAnalyzerPlugin()]
});

// fixes the issue: https://github.com/laravel-mix/laravel-mix/issues/2030
mix.js('./src/_global/js/scapegoat.js', '../public/js/scapegoat-vue2.js').sourceMaps();
mix.sass('./src/_global/css/scapegoat.scss', '/css/scapegoat/scapegoat-vue2.css', sassOptions)
	.sourceMaps()
	.then(() => {
		console.log('DONE: scapegoat-vue2');
	});

/**
 * YOURSIMPLESHOW (SALES DEMOS)
 */
// mix.js('__FRONTEND__/yoursimpleshow/js/login.js', 'public/js/yoursimpleshow-login.js').sourceMaps();
// mix.js('__FRONTEND__/yoursimpleshow/js/app.js', 'public/js/yoursimpleshow.js').sourceMaps();
// mix.sass('__FRONTEND__/yoursimpleshow/css/styles.scss', 'public/css/yoursimpleshow/styles.css').sourceMaps();
// mix.sass('__FRONTEND__/yoursimpleshow/css/vendor.scss', 'public/css/yoursimpleshow/vendor.css')
// 	.sourceMaps()
// 	.then(() => {
// 		console.log('DONE: yoursimpleshow');
// 	});

/**
 * PRODUCTION ONLY
 */
if (mix.inProduction() || process.env.npm_lifecycle_event !== 'hot') {
	mix.sass('../resources/assets/sass/frontend/app.scss', '../public/css/frontend/', sassOptions).then(() => {
		console.log('DONE: frontend');
	});
	// mix.js('../resources/assets/js/backend/backend.js', '../public/js/backend.js')
	// 	.sass('../resources/assets/sass/backend/app.scss', '../public/css/backend/')
	// 	.then(() => {
	// 		console.log('DONE: backend');
	// 	});
}

/**
 * COCKPIT
 */
mix.js('./src/cockpit/js/app.js', '../public/js/cockpit.js').vue({ version: 2 }).sourceMaps();
mix.sass('./src/cockpit/css/vendor.scss', '../public/css/cockpit/', sassOptions).sourceMaps();
// mix.sass('./src/cockpit/css/backend.scss', '../public/css/cockpit/').sourceMaps();
mix.sass('./src/cockpit/css/app.scss', '../public/css/cockpit/', sassOptions)
	.sourceMaps()
	.then(() => {
		console.log('DONE: cockpit');
	});

/**
 * GUEST PLAYLISTS
 */
// mix.js('./src/guest/js/login.js', '../public/js/login.js').sourceMaps();
mix.js('./src/guest/js/app.js', '../public/js/guest.js')
	.vue({ version: 2 })
	.sourceMaps()
	.then(() => {
		console.log('DONE: guest');
	});

/**
 * OTHER COMPLETELY UNNECESSARY STUFF
 */
// if (mix.inProduction() || process.env.npm_lifecycle_event !== 'hot') {
// 	console.log('######## NOT HOT OR IN PRODUCTION ########');
// 	mix.version();
// }
// .WebpackAutoInjectExtension()
// .foo('some-value');
// .then(() => { console.log('Fuck yeah! Webpack has finished building!'); })

/**
 * WHO KNOWS?
 */
// mix.extend('foo', function (webpackConfig, ...args) {
// console.log('mix.inProduction()', mix.inProduction());
// console.log(webpackConfig); // the compiled webpack configuration object.
// console.log(args); // the values passed to mix.foo(); - ['some-value']
// });
