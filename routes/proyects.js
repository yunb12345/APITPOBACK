const {Router} = require('express');
const ProyectController = require('../controllers/proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyectName:
 *                 type: string
 *                 description: Nombre de usuario
 *               proyectDesc:
 *                 type: string
 *                 format: email
 *                 description: El mail de usuario
 *           example:
 *             proyectName: "Asado Sabado"
 *             proyectDesc: "Grupo para el asado"
 *     responses:
 *       200:
 *         description: El proyecto fue creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       500:
 *         description: Some server error
 */
router.post('/',
    [
        check("proyectName").not().isEmpty(),
        check("proyectDesc").not().isEmpty(),
        validateRequest,
    ],
    ProyectController.createProyect);
router.put('/:id',ProyectController.updateProyect);
/**
 * @swagger
 * /api/proyects/{id}:
 *   put:
 *     summary: Actualizar un proyecto
 *     tags: [Proyects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del proyecto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyectName:
 *                 type: string
 *                 description: Nombre de usuario
 *               proyectDesc:
 *                 type: string
 *                 format: email
 *                 description: El mail de usuario
 *           example:
 *             proyectName: "Asado Sabado"
 *             proyectDesc: "Grupo para el asado"
 *     responses:
 *       200:
 *         description: El proyecto fue actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       500:
 *         description: Some server error
 */
router.delete('/:id',ProyectController.deleteProyectById);
/**
 * @swagger
 * /api/proyects/{id}:
 *   delete:
 *     summary: Eliminar proyecto por ID
 *     tags: [Proyects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario
 *     responses:
 *       200:
 *         description: El usuario fue eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Proyects'
 *       404:
 *         description: El proyecto no se encuentra
 */


module.exports = router;