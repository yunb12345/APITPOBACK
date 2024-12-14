const {Router} = require('express');
const UserProyectController = require('../controllers/user_proyects');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const validateJwt = require("../middlewares/jwtvalidator");

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
 *     summary: Elimina la relación Usuario-Proyecto
 *     tags: [UsersProyects]
 *     security:
 *       - jwt: [] # Indica que este endpoint requiere JWT
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
 *         description: La relación fue eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       404:
 *         description: La relación no se encontró
 */
router.delete('/',validateJwt, UserProyectController.removeUserFromProyect);
/**
 * @swagger
 * /api/user_proyects:
 *   post:
 *     summary: Asigna un usuario a un proyecto
 *     tags: [UsersProyects]
 *     security:
 *       - jwt: [] # Indica que este endpoint requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersProyects'
 *     responses:
 *       200:
 *         description: El usuario fue asignado al proyecto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       500:
 *         description: Ocurrió un error
 */
router.post('/',[
    check("balance").not().isEmpty(),
    validateRequest,
],
validateJwt,UserProyectController.assignUser);

/**
 * @swagger
 * /api/user_proyects:
 *   put:
 *     summary: Actualiza el balance de un usuario en un proyecto
 *     tags: [UsersProyects]
 *     security:
 *       - jwt: [] # Indica que este endpoint requiere JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsersProyects'
 *     responses:
 *       200:
 *         description: El balance fue actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UsersProyects'
 *       500:
 *         description: Ocurrió un error
 */
router.put('/',validateJwt,UserProyectController.updateBalance); //hay que cambiar el swagger para validar

module.exports = router;