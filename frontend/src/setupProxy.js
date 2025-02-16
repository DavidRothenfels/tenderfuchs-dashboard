const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://pocketbase.tenderfuchs.de',
      changeOrigin: true,
      secure: true,
      onProxyReq: (proxyReq) => {
        // Entferne eventuell vorhandene CORS-Header
        proxyReq.removeHeader('Origin');
        proxyReq.removeHeader('Referer');
      },
      onProxyRes: (proxyRes) => {
        // Entferne CORS-Header aus der Antwort
        delete proxyRes.headers['access-control-allow-origin'];
        delete proxyRes.headers['access-control-allow-methods'];
        delete proxyRes.headers['access-control-allow-headers'];
      },
    })
  );
};