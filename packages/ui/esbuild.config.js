import * as esbuild from 'esbuild';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';

export const esbuildConfig = {
  entryPoints: ['src/index.tsx', 'src/next/index.ts'],
  bundle: true,
  minify: true,
  splitting: true,
  platform: 'node',
  sourcemap: true,
  format: 'esm',
  packages: 'external',
  outdir: 'dist',
  jsx: 'automatic',
  plugins: [
    styledComponentsPlugin({
      minify: true,
      meaninglessFileNames: ['index', 'style'],
      transpileTemplateLiterals: true,
    }),
  ],
};

async function build() {
  await esbuild
    .build({
      entryPoints: ['src/css/main.css'],
      bundle: true,
      outfile: 'dist/main.css',
      format: 'esm',
      minify: true,
    })
    .catch(() => process.exit(1));

  await esbuild.build(esbuildConfig);
}

build();
