import { defineConfig } from 'vite';
import sass from 'sass';
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
  plugins: [
    sassDts()
  ]
});