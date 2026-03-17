import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';

const dev = process.env.ROLLUP_WATCH;
const production = process.env.BUILD === 'production';

export default {
  input: 'src/parqet-card.ts',
  output: {
    file: 'dist/parqet-homeassistant-companion.js',
    format: 'iife',
    name: 'ParqetCard',
    sourcemap: !production,
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      clean: true,
    }),
    production && terser({ format: { comments: false } }),
    dev &&
      serve({
        contentBase: ['dist', '.'],
        port: 3000,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }),
  ].filter(Boolean),
};
