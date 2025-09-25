import { Router } from "express";
import ProductController from "./../controllers/ProductControlling";

const apiRouter = Router();
const controller = new ProductController();

// JSON API under /api/products
apiRouter.get("/", controller.getAllProducts);
apiRouter.get("/:id", controller.getProductById);
apiRouter.post("/", controller.createProduct);
apiRouter.put("/:id", controller.updatePriduct);
apiRouter.delete("/:id", controller.deletePrduct);

export default apiRouter;


