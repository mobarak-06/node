import type { IncomingMessage, ServerResponse } from "http";
import ProductController from "../controller/product.controller";

const RouteHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    //   console.log("this is root route11")  ;
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this root route111 " }));
  } else if (url?.startsWith("/products")) {
    ProductController(req, res);
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "this root not not  route111 " }));
  }
};

export default RouteHandler;
