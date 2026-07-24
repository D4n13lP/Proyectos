// src/router.ts
import { Router } from 'express'
import productRouter from './routes/product.routes.js'

const router = Router()

router.use('/api/products', productRouter)

export default router
