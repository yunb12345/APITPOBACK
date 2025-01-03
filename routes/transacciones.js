const {Router} = require('express');
const TransaccionController = require('../controllers/transacciones');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const multer = require('multer');
const validateJwt = require("../middlewares/jwtvalidator");

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
/**
 * @swagger
 * components:
 *   schemas:
 *     Transaccion:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Id de la transaccion
 *         proyectId:
 *           type: integer
 *           description: Id de la transaccion
 *         montoTotal:
 *           type: float
 *           description: Monto total de la transaccion
 *         nombreTransaccion:
 *           type: string
 *           description: El nombre de la transaccion
 *         imageUrl:
 *           type: La url de la imagen de la transaccion
 *       example:
 *         id: 22
 *         proyectId: 13
 *         nombreTransaccion: "puerta triple" 
 *         imageurl: "https://res.cloudinary.com/dcqxs5i6e/image/upload/v1733077550/xeud88tda5wgdls5b0uz.png"
 */

/**
 * @swagger
 * tags:
 *   name: Transaccion
 *   description: Transaccion
 */
/**
 * @swagger
 * /api/transaccion:
 *   post:
 *     summary: Crea una nueva transacción
 *     tags: [Transaccion]
 *     security:
 *       - jwt: [] # Este endpoint requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               proyectId:
 *                 type: integer
 *                 description: ID del proyecto asociado a la transacción
 *               nombreTransaccion:
 *                 type: string
 *                 description: Nombre de la transacción
 *               montoTotal:
 *                 type: number
 *                 format: float
 *                 description: Monto total de la transacción
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Imagen asociada a la transacción
 *             required:
 *               - proyectId
 *               - nombreTransaccion
 *               - montoTotal
 *     responses:
 *       201:
 *         description: Transacción creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaccion'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/',
    upload.single('file'),
    [
        check("nombreTransaccion").not().isEmpty(),
        validateRequest,
    ],
    validateJwt,TransaccionController.createTransaccion); //hay que cambiar el swagger para validar jwt
/**
 * @swagger
 * /api/transaccion/proyects/{id}:
 *   get:
 *     summary: Obtiene las transacciones asociadas a un proyecto por su ID
 *     tags: [Transaccion]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Lista de transacciones asociadas al proyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaccion'
 *       404:
 *         description: No se encontraron transacciones para el proyecto especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No se encontraron transacciones para el proyecto con ID 1"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener las transacciones"
 */
router.get('/proyects/:id', TransaccionController.getTransaccionByProyectId); //http://localhost:8080/api/transacciones/proyects
/**
 * @swagger
 * /api/transaccion/{id}:
 *   get:
 *     summary: Obtiene una transacción por su ID
 *     tags: [Transaccion]
 *     parameters:
 *       - in: header
 *         name: jwt
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT para autenticar al usuario
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Transacción encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaccion'
 *       404:
 *         description: No se encontró la transacción con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No se encontró la transacción con ID 22"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error al obtener la transacción"
 */
router.get('/:id',TransaccionController.getTransaccionById);

module.exports = router;