const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['./src/handlers/posts/create.ts'],
    outfile: './dist/index.js',
    bundle: true,
    platform: 'node',
    sourcemap: true,
    target: 'es2020',
    external: ['pg','pg-hstore','mysql2','sequelize','@aws-sdk/client-secrets-manager'],
}).catch(() => process.exit(1));
