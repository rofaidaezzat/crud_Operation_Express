import type { IProduct } from "../interfaces";
import pool from "../models/db";

// service => data storage and retrieving
class ProductService {
  // Get all products
  async findAll(): Promise<{ products: IProduct[]; count: number }> {
  const result = await pool.query("SELECT * FROM products");
  return {
    products: result.rows,
    count: result.rowCount ?? 0,
  };
}


  // Get product by ID
  async findById(id: number): Promise<IProduct | null> {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    return result.rows[0] || null;
  }

  // Create a new product
  async create(product: Omit<IProduct, "id" | "created_at">): Promise<IProduct> {
    const { name, description, price, quantity } = product;
    const result = await pool.query(
      "INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, price, quantity]
    );
    return result.rows[0];
  }

  // Update product
  async update(id: number, product: Partial<IProduct>): Promise<IProduct | null> {
    const { name, description, price, quantity } = product;

    const result = await pool.query(
      `UPDATE products 
       SET name = COALESCE($1, name), 
           description = COALESCE($2, description), 
           price = COALESCE($3, price), 
           quantity = COALESCE($4, quantity)
       WHERE id = $5
       RETURNING *`,
      [name, description, price, quantity, id]
    );

    return result.rows[0] || null;
  }

  // Delete product
async delete(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM products WHERE id = $1", [id]);
  return (result.rowCount as number) > 0;
}

}

export default ProductService;
