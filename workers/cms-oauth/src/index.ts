type OAuthConfig = {
  id: string;
  secret: string;
};

function randomHex(bytes: number): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function authorizeUrl(config: OAuthConfig, redirectUri: string, scope: string, state: string) {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: config.id,
    redirect_uri: redirectUri,
    scope,
    state,
  });
  return `https://github.com/login/oauth/authorize?${params}`;
}

async function exchangeCode(config: OAuthConfig, code: string, redirectUri: string) {
  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: config.id,
      client_secret: config.secret,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const json = (await response.json()) as { access_token?: string; error?: string };
  if (!json.access_token) {
    throw new Error(json.error || "Failed to exchange OAuth code");
  }
  return json.access_token;
}

function callbackHtml(status: "success" | "error", token = "") {
  const payload =
    status === "success"
      ? `'authorization:github:success:${JSON.stringify({ token })}'`
      : `'authorization:github:error:${JSON.stringify({ message: "OAuth failed" })}'`;

  return `<!DOCTYPE html>
<html>
  <body>
    <script>
      const receiveMessage = () => {
        window.opener.postMessage(${payload}, "*");
        window.removeEventListener("message", receiveMessage, false);
      };
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    </script>
    <p>Authorizing Decap CMS…</p>
  </body>
</html>`;
}

interface Env {
  GITHUB_OAUTH_ID: string;
  GITHUB_OAUTH_SECRET: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const config = { id: env.GITHUB_OAUTH_ID, secret: env.GITHUB_OAUTH_SECRET };
    const redirectUri = `https://${url.hostname}/callback?provider=github`;

    if (url.pathname === "/auth") {
      if (url.searchParams.get("provider") !== "github") {
        return new Response("Invalid provider", { status: 400 });
      }

      const authorizationUri = authorizeUrl(
        config,
        redirectUri,
        "repo,user",
        randomHex(8),
      );

      return Response.redirect(authorizationUri, 302);
    }

    if (url.pathname === "/callback") {
      if (url.searchParams.get("provider") !== "github") {
        return new Response("Invalid provider", { status: 400 });
      }

      const code = url.searchParams.get("code");
      if (!code) {
        return new Response(callbackHtml("error"), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      try {
        const token = await exchangeCode(config, code, redirectUri);
        return new Response(callbackHtml("success", token), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      } catch {
        return new Response(callbackHtml("error"), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    }

    return new Response("Decap CMS GitHub OAuth proxy", { status: 200 });
  },
};
