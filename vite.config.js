import { defineConfig } from 'vite'
import { resolve } from 'path'

import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
			// https://rollupjs.org/guide/en/#big-list-of-options
		},
	},
})
