import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@ecomerse/db";

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

// ===== PRODUCTS =====

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Create product
app.post("/products", async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        stock: parseInt(stock) || 0,
      },
    });
    res.json(product);
  } catch {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// ===== USERS =====

// Create user
app.post("/users", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password, // NOTE: Use bcrypt or similar in production!
      },
    });
    res.json(user);
  } catch {
    res.status(400).json({ error: "Failed to create user" });
  }
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: {
        orders: true,
        cart: { include: { items: { include: { product: true } } } },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// ===== ORDERS =====

type CreateOrderItem = {
  productId: string;
  quantity: number;
};

// Create order
app.post("/orders", async (req, res) => {
  try {
    const { userId, items } = req.body as {
      userId: string;
      items: CreateOrderItem[];
    };
    let total = 0;

    // Calculate total
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
        });
        if (!product) throw new Error("Product not found");
        total += product.price * item.quantity;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      })
    );

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: { include: { product: true } },
      },
    });
    res.json(order);
  } catch {
    res.status(400).json({ error: "Failed to create order" });
  }
});

// Get user orders
app.get("/users/:userId/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.params.userId },
      include: {
        items: { include: { product: true } },
      },
    });
    res.json(orders);
  } catch {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.listen(5000, () => {
  console.log("API running on http://localhost:5000");
});
