// src/routes/picture.routes.ts
import { Router } from 'express'
import {
    createPicture,
    getPictures,
    getPictureById,
    updatePicture,
    deletePicture,
} from '../controllers/picture.controller.js'

const router = Router()

router.post('/', createPicture)
router.get('/', getPictures)
router.get('/:pictureID', getPictureById)
router.put('/:pictureID', updatePicture)
router.delete('/:pictureID', deletePicture)

export default router
