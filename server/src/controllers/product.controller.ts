// src/controllers/product.controller.ts
import type { Request, Response } from 'express'
import { Product, Category, ProductUnit, Picture, Promo } from '../models/index.js'

export async function createProduct(req: Request, res: Response) {
    try {
        const product = await Product.create(req.body)
        res.status(201).json(product)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function getProducts(req: Request, res: Response) {
    try {
        const products = await Product.findAll({
            include: [Category, ProductUnit, Picture, Promo],
            order: [['productName', 'ASC']],
        })
        res.json(products)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getProductById(req: Request, res: Response) {
    try {
        const product = await Product.findByPk(req.params.prodCode, {
            include: [Category, ProductUnit, Picture, Promo],
        })
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' })
            return
        }
        res.json(product)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updateProduct(req: Request, res: Response) {
    try {
        const product = await Product.findByPk(req.params.prodCode)
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' })
            return
        }
        await product.update(req.body)
        res.json(product)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function deleteProduct(req: Request, res: Response) {
    try {
        const product = await Product.findByPk(req.params.prodCode)
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' })
            return
        }
        await product.destroy()
        res.status(204).send()
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
