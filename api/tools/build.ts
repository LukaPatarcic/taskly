import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';

import * as esbuild from 'esbuild';

const nodeVersion = (await fs.readFile('.tool-versions'))
  .toString()
  .match(/nodejs (\d+\.\d+\.\d+)/)
  ?.at(1);

assert(nodeVersion, 'Unable to determine node version from .tool-versions');

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: `dist/server.cjs`,
  platform: 'node',
  target: `node${nodeVersion}`,
  sourcemap: true,
  sourcesContent: false,
});
