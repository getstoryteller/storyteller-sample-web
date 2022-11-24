module.exports = {
    entry: './index.ts',
    mode: 'development',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        filename: 'index.js',
        path: __dirname
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
};