import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const SETTING = {
    // Define the build mode
    BuildMode: { DEBUG: 'debug', DEV: 'dev', PROD: 'prod' },
    // Define the output format for SDK
    OutputFormat: { UMD: 'umd' },
    // Extension to included when build
    Extension: ['.ts', '.tsx', '.json']
};

export default (commandLineArgs) => {
    // Define the plugins
    const plugins = [
        alias({
            entries: {
                '~': './src'
            },
            resolve: SETTING.Extension
        }),
        replace({ preventAssignment: true }),
        typescript({ clean: true }),
        babel({
            babelrc: false,
            extensions: SETTING.Extension,
            presets: ['@babel/env', '@babel/typescript'],
            plugins: [
                '@babel/plugin-transform-object-rest-spread',
                [
                    '@babel/plugin-transform-runtime',
                    {
                        regenerator: true
                    }
                ]
            ],
            exclude: 'node_modules/**',
            babelHelpers: 'runtime'
        }),
        resolve({ extensions: SETTING.Extension, preferBuiltins: false }),
        commonjs({ sourceMap: false }) // use CommonJS syntax require(), etc
    ];
    // remove console log
    // plugins.push(strip({ include: ['**/*.js', '**/*.ts'], functions: ['console.*'] }));

    // minify bundle
    plugins.push(terser());

    return {
        input: 'src/index.ts',
        output: [
            {
                name: '@lib/template',
                format: SETTING.OutputFormat.UMD,
                sourcemap: false,
                file: path.resolve('dist', 'index.js')
            }
        ],
        watch: {
            include: './src/**'
        },
        external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
        plugins: plugins
    };
};
