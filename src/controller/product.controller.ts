import type { IncomingMessage, ServerResponse } from "http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";
import { SendResponse } from "../utils/SendRespone";

const ProductController = async (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;

  const urlParams = url?.split("/");
  const id =
    urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;

  // get all  products
  if (url === "/products" && method === "GET") {
    try {
      const products = productService();
      SendResponse(res, true, 200, "Products retrived successfully", products);
    } catch (error) {
      SendResponse(res, false, 500, "internal server error");
    }
  } else if (method === "GET" && id !== null) {
    const products = productService();
    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      return SendResponse(res, false, 500, "internal server error");
    }
    SendResponse(res, true, 200, "Products retrived successfully", product);
  } else if (method === "POST" && url === "/products") {
    const body = await bodyParser(req);
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    const products = productService();
    products.push(newProduct);
    createProduct(products);

    try {
      SendResponse(res, true, 201, "Products created successfully", newProduct);
    } catch (error) {
      SendResponse(res, false, 500, "internal server error");
    }
  } else if (method === "PUT" && id !== null) {
    const body = await bodyParser(req);
    const products = productService();
    const index = products.findIndex((p: IProduct) => p.id === id);

    products[index] = { id: products[index].id, ...body };

    createProduct(products);

    if (index < 0) {
      return SendResponse(res, false, 500, "internal server error");
    }

    SendResponse(
      res,
      true,
      201,
      "Products created successfully",
      products[index],
    );
  } else if (method === "DELETE" && id !== null) {
    const products = productService();

    const index = products.findIndex((p: IProduct) => p.id === id);


    if (index < 0) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Products Not Found ",
        }),
      );
      return;
    }

    products.splice(index, 1);
    createProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products Deleted successfully ",
      }),
    );
  }
};

export default ProductController;
