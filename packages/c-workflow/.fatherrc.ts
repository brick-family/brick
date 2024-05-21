import { defineConfig } from 'father';
export default defineConfig({
  alias: {
    // '@': path.resolve(__dirname, 'src'),
  },
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: { output: 'dist' },
});
