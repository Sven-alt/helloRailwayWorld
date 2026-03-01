const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

const { app, server } = require('../index');

function request(path) {
  return new Promise((resolve, reject) => {
    const url = `http://localhost:${server.address().port}${path}`;
    http.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve({ status: res.statusCode, body: JSON.parse(body) });
      });
    }).on('error', reject);
  });
}

after(() => {
  server.close();
});

describe('GET /health', () => {
  it('should return healthy status', async () => {
    const res = await request('/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'healthy');
    assert.strictEqual(res.body.version, '0.1.0');
  });
});

describe('GET /', () => {
  it('should return a greeting with environment', async () => {
    const res = await request('/');
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.message, 'Response should have a message');
    assert.ok(res.body.environment, 'Response should have an environment');
  });
});

describe('GET /api/example', () => {
  it('should return example data', async () => {
    const res = await request('/api/example');
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body.data), 'data should be an array');
    assert.ok(res.body.data.length > 0, 'data should not be empty');
  });
});
