import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const productService = () => {
  const result = fs.readFileSync(filePath, "utf-8");
  //   console.log(result);
  return JSON.parse(result);
};
