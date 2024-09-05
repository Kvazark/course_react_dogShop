import { defineConfig } from 'cypress';
// export default defineConfig({
// 	e2e: {
// 		setupNodeEvents(on, config) {
// 			// implement node event listeners here
// 		},
// 	},
// });

export default defineConfig({
	e2e: {
		video: false,
		screenshotOnRunFailure: false,
		supportFile: false,
		baseUrl: 'http://localhost:8080/',
	},
	component: {
		devServer: {
			framework: 'react',
			bundler: 'webpack',
		},
	},
});
