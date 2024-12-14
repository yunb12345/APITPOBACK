const {Router} = require('express');
const ProyectController = require('../controllers/proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const validateJwt = require("../middlewares/jwtvalidator");

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Proyects:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: id autogenerado
 *         proyectName:
 *           type: string
 *           description: nombre del proyecto
 *         proyectDesc:
 *           type: string
 *           description: descripcion del proyecto
 *       example:
 *         id: 1
 *         proyectName: "GrupoPibes"
 *         proyectDesc: "Grupo para compartir gastos con los pibes"
 */

/**
 * @swagger
 * tags:
 *   name: Proyects
 *   description: Proyectos
 */

/**
 * @swagger
 * /api/proyects:
 *   get:
 *     summary: Retorna todos los proyectos
 *     tags: [Proyects]
 *     responses:
 *       200:
 *         description: Lista de todos los proyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Proyects'
 */
router.get('/',ProyectController.getProyects); //http://localhost:8080/api/proyects/       endpoint final trae todos los proyectos
/**
 * @swagger
 * /api/proyects/{id}:
 *   get:
 *     summary: Retorna proyecto con el ID
 *     tags: [Proyects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del proyecto
 *     responses:
 *       200:
 *         description: Proyecto con el ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       404:
 *         description: El usuario no se encontro
 */
router.get('/:id', ProyectController.getProyectById);
/**
 * @swagger
 * /api/proyects:
 *   post:
 *     summary: Crear un proyecto
 *     tags: [Proyects]
 *     security:
 *       - jwt: [] # Este endpoint requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proyects'
 *     responses:
 *       201:
 *         description: Proyecto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/',
    [
        check("proyectName").not().isEmpty(),
        check("proyectDesc").not().isEmpty(),
        validateRequest,
    ],
    validateJwt,ProyectController.createProyect);
/**
 * @swagger
 * /api/proyects/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Proyects]
 *     security:
 *       - jwt: [] # Este endpoint requiere JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Proyects'
 *     responses:
 *       200:
 *         description: Proyecto actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       404:
 *         description: No se encontró el proyecto
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:id',validateJwt,ProyectController.updateProyect);

/**
 * @swagger
 * /api/proyects/{id}:
 *   delete:
 *     summary: Eliminar un proyecto por su ID
 *     tags: [Proyects]
 *     security:
 *       - jwt: [] # Este endpoint requiere JWT
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proyecto
 *     responses:
 *       200:
 *         description: Proyecto eliminado con éxito
 *       404:
 *         description: No se encontró el proyecto
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id',validateJwt,ProyectController.deleteProyectById);



module.exports = router;