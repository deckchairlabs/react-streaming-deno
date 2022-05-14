import React, { Suspense } from "https://esm.sh/react@18?dev";
import { renderToStream } from "https://esm.sh/react-streaming@0.2.8/server?dev";
import { serve } from "https://deno.land/std@0.139.0/http/server.ts";

const port = 8080;

function App() {
  return <div>Hello World!</div>;
}

const handler = async (): Promise<Response> => {
  const { readable, injectToStream } = await renderToStream(
    <html lang="en">
      <head>
        <title>Stream</title>
      </head>
      <body>
        <Suspense>
          <App />
        </Suspense>
      </body>
    </html>,
    {
      disable: true,
      webStream: true,
    },
  );

  injectToStream("<div>Injected</div>");

  return new Response(readable, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
};

await serve(handler, { port });
