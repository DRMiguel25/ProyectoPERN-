import { Request, Response } from "express";
import Product from "../models/Product.model";

// ─── 1. GET /Api/products ─────────────────────────────────────────────────────
// Devuelve todos los productos ordenados por precio descendente.
// Respuesta: { data: Product[] }
export const getProducts = async (_req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [["price", "DESC"]],
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        res.json({ data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al obtener los productos" });
    }
};

// ─── 2. GET /Api/products/:id ─────────────────────────────────────────────────
// Devuelve un producto por su PK.
// Respuesta: { data: Product } | 404
export const getProductById = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        res.json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Hubo un error al obtener el producto" });
    }
};

// ─── 3. POST /Api/products ────────────────────────────────────────────────────
// Crea un producto nuevo.
// Body esperado: { name, price, image?, description?, availability? }
// Respuesta: 201 { data: Product }
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, price, image, description, availability } = req.body;

        const product = await Product.create({
            name,
            price,
            image:        image        ?? null,
            description:  description  ?? null,
            availability: availability ?? true,
        });

        res.status(201).json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el producto" });
    }
};

// ─── 4. PUT /Api/products/:id ─────────────────────────────────────────────────
// Reemplaza TODOS los campos de un producto (reemplazo completo).
// Body esperado: { name, price, image, description, availability }
// Respuesta: { data: Product } | 404
export const updateProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        const { name, price, image, description, availability } = req.body;

        await product.update({
            name,
            price,
            image:        image        ?? product.dataValues.image,
            description:  description  ?? product.dataValues.description,
            availability: availability ?? product.dataValues.availability,
        });

        res.json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

// ─── 5. PATCH /Api/products/:id ───────────────────────────────────────────────
// Alterna (toggle) únicamente el campo `availability`.
// Respuesta: { data: Product } | 404
export const updateAvailability = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        product.availability = !product.dataValues.availability;
        await product.save();

        res.json({ data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar la disponibilidad" });
    }
};

// ─── 6. DELETE /Api/products/:id ─────────────────────────────────────────────
// Elimina un producto por su PK.
// Respuesta: { data: "Producto eliminado" } | 404
export const deleteProduct = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const product = await Product.findByPk(req.params.id);

        if (!product) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }

        await product.destroy();
        res.json({ data: "Producto eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};