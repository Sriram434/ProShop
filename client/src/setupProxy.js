const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(App) {
  App.use(
    createProxyMiddleware(["/api", , "/otherApi"], 
		  { target: "https://sriram-fntgn.run-ap-south1.goorm.io",changeOrigin: true })
	  
  );
};
