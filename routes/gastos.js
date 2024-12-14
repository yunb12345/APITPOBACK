const {Router} = require('express');
const GastoController = require('../controllers/gastos');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const validateJwt = require("../middlewares/jwtvalidator");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Gasto:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: Id del usuario
 *         transaccioneId:
 *           type: integer
 *           description: Id de la transaccion
 *         porcentaje:
 *           type: integer
 *           description: Porcentaje de lo que paga el usuario
 *       example:
 *         userId: 22
 *         transaccioneId: 23
 *         porcentaje: 50
 */

/**
 * @swagger
 * tags:
 *   name: Gasto
 *   description: Gastos
 */

/**
 * @swagger
 * /api/gastos:
 *   get:
 *     summary: Retorna todos los gastos
 *     tags: [Gasto]
 *     responses:
 *       200:
 *         description: Lista de todos los gastos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gasto'
 */
router.get('/',GastoController.getGastos); //http://localhost:8080/api/gastos/       endpoint final trae todos los gastos
/**
 * @swagger
 * /api/gastos:
 *   post:
 *     summary: Crea un nuevo gasto
 *     tags: [Gasto]
 *     security:
 *       - jwt: [] # Este endpoint requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gasto'
 *     responses:
 *       201:
 *         description: Gasto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Gasto'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/',[
    check("porcentaje").not().isEmpty(),
    validateRequest,
],
validateJwt,GastoController.createGasto); //hay que cambiar el swagger para validarJwt
/**
 * @swagger
 * /api/gastos/transaccion/{id}:
 *   get:
 *     summary: Obtiene los gastos asociados a una transacción por su ID
 *     tags: [Gasto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la transacción
 *     responses:
 *       200:
 *         description: Lista de gastos asociados a la transacción
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gasto'
 *       404:
 *         description: No se encontraron gastos para la transacción especificada
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
 *                   example: "No se encontraron gastos para la transacción con ID 1"
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
 *                   example: "Error al obtener los gastos"
 */
router.get('/transaccion/:id',GastoController.getGastoByTransaccionId);
/**
 * @swagger
 * /api/gastos/user/{id}:
 *   get:
 *     summary: Obtiene los gastos asociados a un usuario por su ID
 *     tags: [Gasto]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de gastos asociados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gasto'
 *       404:
 *         description: No se encontraron gastos para el usuario especificado
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
 *                   example: "No se encontraron gastos para el usuario con ID 1"
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
 *                   example: "Error al obtener los gastos"
 */
router.get('/user/:id',GastoController.getGastosByUserId);

module.exports = router;