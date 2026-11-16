import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import RouteHandler from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    RouteHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("Server is Running successfully!!");
});
