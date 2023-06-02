// vite.config.js
import { defineConfig } from 'vite';
import virtualIndex from '../lib/dev-server/virtual-index-html-plugin.js';

export default defineConfig(async () => {
	const data = await virtualIndex();
	return {
		build: {
			emptyOutDir: false,
		},
		plugins: [data],
	}
  })