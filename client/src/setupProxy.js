const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'development' ? 'http://localhost:1323' : 'https://guessify-backend.onrender.com',
            changeOrigin: true,
        })
    );
};