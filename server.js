const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 3000;

function sendJson(res, statusCode, data) {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  });
  res.end(payload);
}

function serveStatic(req, res) {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const normalized = path.normalize(filePath);

  if (!normalized.startsWith(path.join(__dirname, 'public'))) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(normalized, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }

    const ext = path.extname(normalized);
    const contentTypes = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8'
    };

    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain; charset=utf-8' });
    res.end(data);
  });
}

async function fetchFacebookPosts(pageId, accessToken) {
  const fields = [
    'id',
    'message',
    'created_time',
    'full_picture',
    'attachments{media_type,media,url,target,type,unshimmed_url,subattachments}'
  ].join(',');

  const graphUrl = new URL(`https://graph.facebook.com/v21.0/${encodeURIComponent(pageId)}/posts`);
  graphUrl.searchParams.set('fields', fields);
  graphUrl.searchParams.set('limit', '25');
  graphUrl.searchParams.set('access_token', accessToken);

  const response = await fetch(graphUrl);
  const result = await response.json();

  if (!response.ok || result.error) {
    const message = result?.error?.message || 'Failed to fetch posts from Facebook Graph API.';
    const code = result?.error?.code || response.status;
    throw new Error(`${message} (code: ${code})`);
  }

  return result.data || [];
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/posts')) {
    try {
      const reqUrl = new URL(req.url, `http://${req.headers.host}`);
      const pageId = reqUrl.searchParams.get('pageId');
      const accessToken = reqUrl.searchParams.get('accessToken');

      if (!pageId || !accessToken) {
        return sendJson(res, 400, {
          error: 'Missing required params: pageId and accessToken.'
        });
      }

      const posts = await fetchFacebookPosts(pageId, accessToken);
      return sendJson(res, 200, { posts });
    } catch (error) {
      return sendJson(res, 502, { error: error.message });
    }
  }

  return serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
