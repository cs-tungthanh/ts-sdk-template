import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import strip from '@rollup/plugin-strip';
import replace from '@rollup/plugin-replace';
import path from 'path';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-copy';
import dotenv from 'rollup-plugin-dotenv';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

// Define the build mode
const BUILD_MODE = { DEBUG: 'debug', DEV: 'dev', PROD: 'prod' };

// Define the output format for SDK
const format = {
    UMD: 'umd'
};

// Extension to included when build
const extensions = ['.ts', '.tsx', '.json'];

const cdn = path.join(__dirname, '../../packages/rfis-cdn');
export default (commandLineArgs) => {
    // Make target version directory if not exist
    const version = pkg.version;
    const jsLibraryTemplate = 'rhp-sdk@{version}';
    const targetDirName = jsLibraryTemplate.replace(/{version}/g, version);
    const targetDirPath = path.resolve(cdn, 'sdks', 'sdk', targetDirName);

    // Make latest version directory if not exist
    const latestDirName = jsLibraryTemplate.replace(/{version}/g, 'latest');
    const latestDirPath = path.resolve(cdn, 'sdks', 'sdk', latestDirName);

    // Define the output file path
    const libFileName = process.env.NODE_ENV === BUILD_MODE.PROD ? 'rhp-sdk.production.js' : 'rhp-sdk.development.js';
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
        commonjs(), // use CommonJS syntax require(), etc
        dotenv() // support environment
    ];
    if (process.env.NODE_ENV === BUILD_MODE.DEV || process.env.NODE_ENV === BUILD_MODE.PROD) {
        plugins.push(strip({ include: ['**/*.js', '**/*.ts'], functions: ['console.*'] })); // remove console log
        plugins.push(terser()); // minify bundle
        plugins.push(
            copy({
                targets: [
                    {
                        src: [umdFilePath],
                        dest: targetDirPath,
                        rename: libFileName
                    },
                    {
                        src: [umdFilePath],
                        dest: latestDirPath,
                        rename: libFileName
                    }
                ]
            })
        );
    }

    return {
        input: 'src/index.ts',
        external: ['aws-sdk/global', '@aws-amplify/core', '@aws-amplify/auth', 'axios', 'joi', 'url-parse'],
        output: [
            {
                name: 'RHP',
                sourcemap: true,
                format: format.UMD,
                file: umdFilePath,
                globals: {
                    'aws-sdk/global': 'AWS',
                    '@aws-amplify/core': 'aws_amplify_core',
                    '@aws-amplify/auth': 'aws_amplify_auth',
                    axios: 'axios',
                    joi: 'joi',
                    'url-parse': 'URLParse'
                }
            }
        ],
        watch: {
            include: './src/**'
        },
        plugins: plugins
    };
};
