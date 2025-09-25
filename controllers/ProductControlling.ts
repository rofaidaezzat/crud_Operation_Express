import type { Request, Response } from "express";
import ProductService from "../services/productservice";


class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getProducts = async (req: Request, res: Response) => {
  try {
    const data = await this.productService.findAll();
    // render instead of json
    res.render("products", { products: data.products, count: data.count });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).render("notfound", { title: "Internal Server Error" });
  }
};

getAllProducts = async (req: Request, res: Response) => {
    try {
      const data = await this.productService.findAll();
      res.json(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  getProductById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await this.productService.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createProduct = async (req: Request, res: Response) => {
    try {
      const { name, description, price, quantity } = req.body;
      const newProduct = await this.productService.create({
        name,
        description,
        price,
        quantity,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  updatePriduct = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name, description, price, quantity } = req.body;
      const updatedProduct = await this.productService.update(id, {
        name,
        description,
        price,
        quantity,
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  deletePrduct = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const deleted = await this.productService.delete(id); // Use the delete method from the service

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
      }
}

export default ProductController;
