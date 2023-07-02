import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import strip from '@rollup/plugin-strip';
import path from 'path';
import babel from 'rollup-plugin-babel';
import dotenv from 'rollup-plugin-dotenv';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import shell from 'shelljs';
import pkg from './package.json';

// Define the build mode
const BUILD_MODE = { DEBUG: 'debug', DEV: 'dev', PROD: 'prod' };

// Define the output format for SDK
const format = {
    UMD: 'umd'
};

// Extension to included when build
const extensions = ['.ts', '.tsx', '.json'];

// Define the pack plugin for rollup
const rollupPackPlugin = () => {
    return {
        name: 'rollup-pack-plugin',
        closeBundle: () => {
            shell.exec('yarn pack');
        }
    };
};

export default (commandLineArgs) => {
    // Define the output file path
    const umdFilePath = path.resolve('dist', 'index.js');

    // Define the plugins
    const plugins = [
        alias({
            entries: {
                '~': './src'
            },
            resolve: extensions
        }),
        replace({ preventAssignment: true }),
        typescript({ rollupCommonJSResolveHack: true, clean: true }),
        babel({
            babelrc: false,
            runtimeHelpers: true,
            extensions,
            presets: ['@babel/env', '@babel/typescript'],
            plugins: [
                '@babel/proposal-object-rest-spread',
                [
                    '@babel/plugin-transform-runtime',
                    {
                        regenerator: true
                    }
                ]
            ],
            exclude: 'node_modules/**'
        }),
        resolve({ extensions, preferBuiltins: false }),
        commonjs({ sourceMap: false }), // use CommonJS syntax require(), etc
        dotenv() // support environment
    ];
    if (process.env.NODE_ENV === BUILD_MODE.DEV || process.env.NODE_ENV === BUILD_MODE.PROD) {
        plugins.push(rollupPackPlugin()); // creates a compressed gzip archive of package dependencies.
        plugins.push(strip({ include: ['**/*.js', '**/*.ts'], functions: ['console.*'] })); // remove console log
        plugins.push(terser()); // minify bundle
    }

    return {
        input: 'src/index.ts',
        output: [
            {
                name: 'RHP',
                sourcemap: false,
                format: format.UMD,
                file: umdFilePath
            }
        ],
        watch: {
            include: './src/**'
        },
        external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
        plugins: plugins
    };
};
