const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1323',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // remove base path
      },
    })
  );
};