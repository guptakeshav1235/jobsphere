import { createProxyMiddleware } from 'http-proxy-middleware';

const API_URL = "https://jobsphere-backend-cu51.onrender.com";

export default function handler(req, res) {
    const proxy = createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        pathRewrite: {
            '^/url': '', // Remove '/url' from the path
        },
        onProxyReq: (proxyReq, req) => {
            // Forward cookies from the request to the proxy request
            if (req.headers.cookie) {
                proxyReq.setHeader('cookie', req.headers.cookie);
            }
        },
    });

    proxy(req, res, (err) => {
        if (err) {
            console.error("Proxy error:", err);
            res.status(500).send("Proxy error");
        }
    });
}