import React from "https://esm.sh/react@18?dev";
import { renderToStream } from "https://esm.sh/react-streaming/server?dev";
import { serve } from "https://deno.land/std@0.139.0/http/server.ts";

const port = 8080;

function App() {
  return <div>Hello World!</div>;
}

const handler = async (): Promise<Response> => {
  const { readable } = await renderToStream(<App />);

  return new Response(readable, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

await serve(handler, { port });
