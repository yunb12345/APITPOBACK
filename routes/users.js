const {Router} = require('express');
const UserController = require('../controllers/users');
const {body,check} = require('express-validator');
const validateRequest = require('../middlewares/request_validator');
const multer = require('multer');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: id autogenerado
 *         username:
 *           type: string
 *           description: nombre de usuario
 *         email:
 *           type: string
 *           description: el mail del usuario
 *         password:
 *           type: string
 *           description: la password del usuario
 *         balance:
 *           type: int
 *           description: el balance que tiene el usuario
 *         imageUrl:
 *           type: string
 *           description: la url del imagen del usuario
 *       example:
 *         id: 1
 *         username: "Bam"
 *         email: "asd@asd.com"
 *         password: "djklsa213djkasl"
 *         balance: 500
 *         imageUrl: "dasdsa.com"
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retorna todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/',UserController.getUsers); //http://localhost:8080/api/users/       endpoint final trae todos los usuarios

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Retorna usuario con el ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El id del usuario
 *     responses:
 *       200:
 *         description: El usuario del ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: El usuario no se encontro
 */
router.get('/:id', UserController.getUserById); //http://localhost:8080/api/users/:id

router.post('/username', UserController.getUserByUserName); 
router.post('/login',  [
    check("email").not().isEmpty(),
    check("password").not().isEmpty(),
    validateRequest,
],
UserController.login);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El mail de usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 description: La password del usuario
 *               balance:
 *                 type: number
 *                 format: float
 *                 description: El balance del usuario
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 description: la url del img
 *             required:
 *               - username
 *               - email
 *               - password
 *               - balance
 *           example:
 *             username: "test321"
 *             email: "321@321.com"
 *             password: "321"
 *             balance: 550
 *             imageUrl: null
 *     responses:
 *       200:
 *         description: El usuario fue creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/',
    upload.single('file'),
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,
    ],
    UserController.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario con ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: El mail de usuario
 *               password:
 *                 type: string
 *                 format: password
 *                 description: La password del usuario
 *               balance:
 *                 type: number
 *                 format: float
 *                 description: El balance del usuario
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *                 description: la url del img
 *             required:
 *               - username
 *               - email
 *               - password
 *               - balance
 *           example:
 *             username: "test321"
 *             email: "321@321.com"
 *             password: "321"
 *             balance: 550
 *             imageUrl: null
 *     responses:
 *       200:
 *         description: El usuario se actualizo correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: El usaurio no existe
 *       500:
 *         description: Ocurrio un error
 */
router.put('/:id',
    [
        check("username").not().isEmpty(),
        check("email").not().isEmpty(),
        validateRequest,
    ]
    ,UserController.updateUser);

router.delete('/:id',UserController.deleteUserById);
/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [Users]
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
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: El usuario no se encuentra
 */

module.exports = router;