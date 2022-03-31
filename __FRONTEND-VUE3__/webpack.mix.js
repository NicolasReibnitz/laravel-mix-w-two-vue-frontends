/* global path */
const mix = require('laravel-mix');
const path = require('path');
// require('./webpack.mix.addon');
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

const sassOptions = {
	sassOptions: {
		quietDeps: true
	}
};
// const outputPath = path.resolve('../public/vue3-manifest');
// mix.setPublicPath(outputPath);

// mix.setPublicPath('../public/vue3-manifest');
mix.setPublicPath('../public');
// console.log(outputPath + '/js/scapegoat-vue3.js');
mix.options({
	manifest: 'mix-manifest-vue3.json'
});
//  mix.setResourceRoot('/css');
mix.webpackConfig({
	resolve: {
		alias: {
			'@': path.resolve('../resources/assets/sass/cockpit'),
			'~': path.resolve('../public')
			// vue: '@vue/compat'
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						compatConfig: {
							MODE: 2
						}
					}
				}
			}
		]
	},
	stats: 'normal'
	// plugins: [new BundleAnalyzerPlugin()]
});

// fixes the issue: https://github.com/laravel-mix/laravel-mix/issues/2030
mix.js('./src/_global/js/scapegoat.js', '/js/scapegoat-vue3.js').sourceMaps();
mix.sass('./src/_global/css/scapegoat.scss', '/css/scapegoat/scapegoat-vue3.css', sassOptions)
	.sourceMaps()
	.then(() => {
		console.log('DONE: scapegoat-vue3');
	});

/**
 * LOGIN PAGE (FOR YOURSIMPLESHOW AND GUEST PLAYLIST)
 */
mix.js('src/login-page/js/login.js', '/js/login-page.js').vue().sourceMaps();
// mix.sass('src/login-page/css/styles.scss', '/css/login-page/styles.css', sassOptions).sourceMaps();
mix.sass('src/login-page/css/vendor.scss', '/css/login-page/vendor.css', sassOptions)
	.sourceMaps()
	.then(() => {
		console.log('DONE: login-page');
	});

/**
 * YOURSIMPLESHOW (SALES DEMOS)
 */
mix.js('src/yoursimpleshow/js/app.js', '/js/yoursimpleshow.js').vue().sourceMaps();
mix.js('src/yoursimpleshow-backend/js/app.js', '/js/yoursimpleshow-backend.js').vue().sourceMaps();
mix.sass('src/yoursimpleshow/css/styles.scss', '/css/yoursimpleshow/styles.css', sassOptions).sourceMaps();
mix.sass('src/yoursimpleshow/css/vendor.scss', '/css/yoursimpleshow/vendor.css', sassOptions)
	.sourceMaps()
	.then(() => {
		console.log('DONE: yoursimpleshow');
	});

/**
 * PRODUCTION ONLY
 */
if (mix.inProduction()) {
	// mix.js('../resources/assets/js/frontend/app.js', '/js/frontend.js')
	// 	.vue()
	// 	.sass('../resources/assets/sass/frontend/app.scss', '/css/frontend/')
	// 	.then(() => {
	// 		console.log('DONE: frontend');
	// 	});
	mix.js('./src/dashboard/js/backend.js', '/js/backend.js')
		.sass('./src/dashboard/css/app.scss', '/css/backend/', sassOptions)
		.then(() => {
			console.log('DONE: backend');
		});
}

/**
 * COCKPIT
 */
// mix.js('../resources/assets/js/cockpit/app.js', '/js/cockpit.js').vue({ version: 3 }).sourceMaps();
// mix.sass('src/cockpit/css/vendor.scss', '/css/cockpit/').sourceMaps();
// mix.sass('src/cockpit/css/backend.scss', '/css/cockpit/').sourceMaps();
// mix.sass('src/_global/css/cockpit-theme/index.scss', '/css/cockpit/cockpit-theme.css', sassOptions)
// 	.sourceMaps()
// 	.then(() => {
// 		console.log('DONE: cockpit');
// 	});

/**
 * GUEST PLAYLISTS
 */
// mix.sass('src/guest-playlist/css/vendor.scss', '/css/guest-playlist/vendor.css', sassOptions).sourceMaps();
// mix.sass('src/guest-playlist/css/styles.scss', '/css/guest-playlist/styles.css', sassOptions).sourceMaps();
// mix.js('src/guest-playlist/js/app.js', '/js/guest.js')
// 	.vue({ version: 3 })
// 	.sourceMaps()
// 	.then(() => {
// 		console.log('DONE: guest');
// 	});

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
// mix.dump();
