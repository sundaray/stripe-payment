const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/api/users/login",
      "/api/users/register",
      "/api/download",
      "/api/payment/checkout-session",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
