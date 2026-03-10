import { Router } from 'express'
import { body } from 'express-validator'
import { createProduct } from './handlers/product'
import { handleInputErrors } from './middleware' // Nombre corregido aquí

const router = Router()

router.get('/', (req, res) => {
  res.json('Hola desde Get en puerto 4000')
})

// POST - Proceso: Validaciones -> Middleware de Errores -> Handler Final
router.post('/', 
  // 1. Validaciones
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ir vacio'),

  body('price')
    .isNumeric()
    .withMessage('Valor no valido')
    .notEmpty()
    .withMessage('El precio del producto no puede ir vacio')
    .custom(value => value > 0)
    .withMessage('Precio no valido menor a 0'),

  // 2. Tu middleware (Nombre corregido para que coincida con el import)
  handleInputErrors, 

  // 3. Tu controlador final
  createProduct
)

router.put('/', (req, res) => {
  res.json('Hola desde Put en puerto 4000')
})

router.patch('/', (req, res) => {
  res.json('Hola desde Patch en puerto 4000')
})

router.delete('/', (req, res) => {
  res.json('Hola desde Delete en puerto 4000')
})

export default router