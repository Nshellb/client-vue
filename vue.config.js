module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8000', // 개발서버
                changeOrigin: true
            },
        }
    }
}