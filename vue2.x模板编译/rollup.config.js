import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'
import commonjs from 'rollup-plugin-commonjs'
export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/md/vue.js',
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