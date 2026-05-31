// Cloudflare Worker: Experience sharing + Visitor counter API
// GET  /api/experiences  → list all
// POST /api/experiences  → submit new
// GET  /api/visitors     → get count
// POST /api/visitors     → increment count (debounced per session)

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // ── Visitor counter ──
    if (url.pathname === "/api/visitors") {
      if (request.method === "GET") {
        const raw = await env.EXPERIENCES.get("visitor_count");
        const count = raw ? parseInt(raw) : 88; // seed with a reasonable start
        return new Response(JSON.stringify({ count }), {
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }
      if (request.method === "POST") {
        const raw = await env.EXPERIENCES.get("visitor_count");
        const count = (raw ? parseInt(raw) : 88) + 1;
        await env.EXPERIENCES.put("visitor_count", String(count));
        return new Response(JSON.stringify({ count }), {
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }
    }

    // ── Experiences: list ──
    if (request.method === "GET" && url.pathname === "/api/experiences") {
      const raw = await env.EXPERIENCES.get("list");
      const list = raw ? JSON.parse(raw) : [];
      list.sort((a, b) => b.timestamp - a.timestamp);
      return new Response(JSON.stringify(list), {
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    // ── Experiences: submit ──
    if (request.method === "POST" && url.pathname === "/api/experiences") {
      try {
        const body = await request.json();
        const { name, pathway, content } = body;

        if (!name || !pathway || !content) {
          return new Response(JSON.stringify({ error: "请填写昵称、路径和经历内容" }), {
            status: 400,
            headers: { ...headers, "Content-Type": "application/json" },
          });
        }
        if (content.length < 20) {
          return new Response(JSON.stringify({ error: "经历内容至少20个字" }), {
            status: 400,
            headers: { ...headers, "Content-Type": "application/json" },
          });
        }
        if (name.length > 20) {
          return new Response(JSON.stringify({ error: "昵称最多20个字" }), {
            status: 400,
            headers: { ...headers, "Content-Type": "application/json" },
          });
        }

        const raw = await env.EXPERIENCES.get("list");
        const list = raw ? JSON.parse(raw) : [];

        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          name: name.trim().slice(0, 20),
          pathway: pathway.trim().slice(0, 50),
          content: content.trim().slice(0, 3000),
          timestamp: Date.now(),
        };

        list.push(entry);
        const trimmed = list.length > 200 ? list.slice(-200) : list;
        await env.EXPERIENCES.put("list", JSON.stringify(trimmed));

        return new Response(JSON.stringify({ ok: true, entry }), {
          status: 201,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: "提交失败，请重试" }), {
          status: 500,
          headers: { ...headers, "Content-Type": "application/json" },
        });
      }
    }

    return new Response("Not found", { status: 404, headers });
  },
};
