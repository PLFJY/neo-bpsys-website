export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    let path = url.pathname;

    // 若请求的是根路径，就返回 index.html
    if (path === '/') {
      path = '/index.html';
    }

    try {
      // 尝试获取静态资源
      const asset = await env.ASSETS.fetch(url);
      return asset;
    } catch (e) {
      // 若资源不存在，返回 404
      return new Response('Not Found', { status: 404 });
    }
  },
};
