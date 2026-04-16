// LUMIÈRE 极简后端 - Node.js + 本地 JSON 持久化
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'db.json');

// 读取数据（文件不存在则用 data.json 初始化）
function readData() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    }
    const seed = path.join(__dirname, 'data.json');
    if (fs.existsSync(seed)) {
        const data = JSON.parse(fs.readFileSync(seed, 'utf-8'));
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return data;
    }
    return { storeInfo: {}, products: [], orders: [], customers: [] };
}

function writeData(data) {
    data._savedAt = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// 静态文件 MIME
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

    // API 路由
    if (req.url === '/api/data' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(readData()));
        return;
    }
    if (req.url === '/api/data' && (req.method === 'POST' || req.method === 'PUT')) {
        let body = '';
        req.on('data', c => body += c);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                writeData(data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true }));
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
            }
        });
        return;
    }

    // 静态文件
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    const ext = path.extname(filePath);
    if (!MIME[ext]) { res.writeHead(404); res.end('Not Found'); return; }
    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end('Not Found'); return; }
        res.writeHead(200, { 'Content-Type': MIME[ext] });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`\n  ✦ LUMIÈRE 服务已启动`);
    console.log(`  前台: http://localhost:${PORT}`);
    console.log(`  后台: http://localhost:${PORT}/admin.html`);
    console.log(`  数据: ${DATA_FILE}\n`);
});
