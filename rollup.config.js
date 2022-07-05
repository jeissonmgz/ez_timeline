import merge from 'deepmerge';
import {createBasicConfig} from '@open-wc/building-rollup';

const baseConfig = createBasicConfig();

const simpleUse = merge(baseConfig, {
  input: './build/index.js',
  output: {
    dir: 'dist',
  },
});

// Contents of the file /rollup.config.js

import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';
import commonjs from '@rollup/plugin-commonjs';

const config = [
  {
    input: 'build/index.d.ts',
    output: {
      file: 'dist/timeline.d.ts',
      format: 'es',
    },
    plugins: [dts()],
  },
  {
    input: 'build/index.js',
    output: {
      file: 'dist/timeline.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [localResolve(), typescript(), commonjs(), babel()],
  },
  {
    ...simpleUse,
    output: {
      file: 'dist/timeline-dist.js',
      format: 'es',
    },
  },
];
export default config;
