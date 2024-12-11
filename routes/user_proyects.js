const {Router} = require('express');
const UserProyectController = require('../controllers/user_proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     UsersProyects:
 *       type: object
 *       properties:
 *         UserId:
 *           type: integer
 *           description: id autogenerado
 *         ProyectId:
 *           type: integer
 *           description: id autogenerado
 *         balance:
 *           type: float
 *           description: nombre de usuario
 *       example:
 *         UserId: 12
 *         ProyectId: 10
 *         balance: 0
 */

/**
 * @swagger
 * tags:
 *   name: UsersProyects
 *   description: Usuario-Proyecto
 */

/**
 * @swagger
 * /api/user_proyects/users/{id}:
 *   get:
 *     summary: Retorna usuarios con el id del proyecto
 *     tags: [UsersProyects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: Los usuarios con ese ID de proyecto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       404:
 *         description: El proyecto no se encontro
 */
router.get('/users/:id',UserProyectController.getUsersByProyect); 
/**
 * @swagger
 * /api/user_proyects/proyects/{id}:
 *   get:
 *     summary: Retorna proyectos con el id del usuario
 *     tags: [UsersProyects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: Los proyectos con ese ID de usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       404:
 *         description: El proyecto no se encontro
 */
router.get('/proyects/:id', UserProyectController.getProyectsByUser); //http://localhost:8080/api/user_proyects/proyects/
/**
 * @swagger
 * /api/user_proyects:
 *   delete:
 *     summary: Eliminar usuarioproyecto con el UsuarioID y ProyecttoID
 *     tags: [UsersProyects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *                 description: ID del usuario
 *               proyectid:
 *                 type: integer
 *                 description: ID del proyecto
 *     responses:
 *       200:
 *         description: El usuario fue eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       404:
 *         description: El usuario no se encuentra
 */
router.delete('/', UserProyectController.removeUserFromProyect);
/**
 * @swagger
 * /api/user_proyects:
 *   post:
 *     summary: Agregar un usuario a un proyecto
 *     tags: [UsersProyects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UsersProyects'
 *     responses:
 *       200:
 *         description: El usuario fue asignado a un proyecto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       500:
 *         description: Ocurrio un error
 */
router.post('/',[
    check("balance").not().isEmpty(),
    validateRequest,
],
UserProyectController.assignUser); 
/**
 * @swagger
 * /api/user_proyects:
 *   put:
 *     summary: Actualizar balance
 *     tags: [UsersProyects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UsersProyects'
 *     responses:
 *       200:
 *         description: La informacion se actualizo correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       500:
 *         description: Ocurrio un error
 */
router.put('/',UserProyectController.updateBalance);

module.exports = router;