import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs'
export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Mvvm',
        file: 'dist/md/mvvm.js',
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        serve({
            open: true,
            port: 3333,
            contentBase: '',
            openPage: '/index.html'
        }),
        commonjs()
    ]
}