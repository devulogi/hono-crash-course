import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, RouteHandler, z } from "@hono/zod-openapi";
import { logger } from "hono/logger";

const app = new OpenAPIHono();

// Middlewares
app.use("*", logger());

const rootRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["root"],
  responses: {
    200: {
      description: "Welcome message",
      content: {
        "application/json": {
          schema: z.string(),
        },
      },
    },
  },
});

const rootHandler: RouteHandler<typeof rootRoute> = async (c) => {
  return c.json("Welcome to the Bus Ticket Booking API");
};

app.openapi(rootRoute, rootHandler);

app.doc('/openapi.json', {
  openapi: '3.0.0',
  info: {
    title: 'Bus Ticket Booking API',
    version: '1.0.0',
    description: 'API documentation for the Bus Ticket Booking application',
  },
});

app.use("/docs", swaggerUI({ url: "/openapi.json" }));

app.notFound((c) => {
  return c.json({ message: "Route not found" }, 404);
});


app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ message: "Internal server error" }, 500);
});

serve({
  fetch: app.fetch,
  port: 3000,
})

console.log("Server is running on http://localhost:3000");
