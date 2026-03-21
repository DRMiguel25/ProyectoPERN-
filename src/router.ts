import { Router } from 'express'
import { body, param } from 'express-validator'
import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    updateAvailability,
    deleteProduct
} from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

// ─── GET /Api/products ────────────────────────────────────────────────────────
router.get('/', getProducts)

// ─── GET /Api/products/:id ────────────────────────────────────────────────────
router.get(
    '/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductById
)

// ─── POST /Api/products ───────────────────────────────────────────────────────
// Campos requeridos: name, price
// Campos opcionales: image (string), description (string largo)
router.post(
    '/',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('image')
        .optional()
        .isString().withMessage('La imagen debe ser un texto'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto'),
    handleInputErrors,
    createProduct
)

// ─── PUT /Api/products/:id ────────────────────────────────────────────────────
// Reemplaza todos los campos del producto (reemplazo completo).
router.put(
    '/:id',
    param('id').isInt().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('El precio debe ser un número')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('availability')
        .isBoolean().withMessage('Disponibilidad no válida'),
    body('image')
        .optional()
        .isString().withMessage('La imagen debe ser un texto'),
    body('description')
        .optional()
        .isString().withMessage('La descripción debe ser un texto'),
    handleInputErrors,
    updateProduct
)

// ─── PATCH /Api/products/:id ──────────────────────────────────────────────────
// Toggle de disponibilidad únicamente.
router.patch(
    '/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

// ─── DELETE /Api/products/:id ─────────────────────────────────────────────────
router.delete(
    '/:id',
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router