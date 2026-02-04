// App
import { app } from "./app";

// Utils
import { env } from "./env";

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() =>
    console.log("🚀 HTTP Server Runing!"),
);
