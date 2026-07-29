// src/controllers/picture.controller.ts
import type { Request, Response } from 'express'
import { Picture } from '../models/index.js'

export async function createPicture(req: Request, res: Response) {
    try {
        const item = await Picture.create(req.body)
        res.status(201).json(item)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function getPictures(req: Request, res: Response) {
    try {
        const items = await Picture.findAll()
        res.json(items)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function getPictureById(req: Request, res: Response) {
    try {
        const item = await Picture.findByPk(req.params.pictureID)
        if (!item) {
            res.status(404).json({ message: 'Picture no encontrado' })
            return
        }
        res.json(item)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export async function updatePicture(req: Request, res: Response) {
    try {
        const item = await Picture.findByPk(req.params.pictureID)
        if (!item) {
            res.status(404).json({ message: 'Picture no encontrado' })
            return
        }
        await item.update(req.body)
        res.json(item)
    } catch (error: any) {
        res.status(400).json({ message: error.message })
    }
}

export async function deletePicture(req: Request, res: Response) {
    try {
        const item = await Picture.findByPk(req.params.pictureID)
        if (!item) {
            res.status(404).json({ message: 'Picture no encontrado' })
            return
        }
        await item.destroy()
        res.status(204).send()
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}
