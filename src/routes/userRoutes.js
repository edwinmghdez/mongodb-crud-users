const express = require("express");
const userController = require("../controllers/userController");
const validateMiddleware = require("../middlewares/validationMiddleware");
const createUserValidation = require("../validations/createUserValidation");
const updateUserValidation = require("../validations/updateUserValidation");
const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     responses:
 *      200:
 *         description: Users retrieved successfully
 */
router.get("/", userController.index);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *     tags: [Users]
 *     summary: Get a specific user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: User Id
 *     responses:
 *      200:
 *         description: User retrieved successfully
 *      404:
 *         description: User not found
 */
router.get("/:id", userController.show);

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *     tags: [Users]
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *      201:
 *         description: User created successfully
 *      400:
 *         description: Bad request, invalid data
 */
router.post(
  "/",
  validateMiddleware(createUserValidation),
  userController.store
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *      200:
 *         description: User updated successfully
 *      400:
 *         description: Bad request, invalid data
 *      404:
 *         description: User not found
 */
router.put(
  "/:id",
  validateMiddleware(updateUserValidation),
  userController.update
);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *     tags: [Users]
 *     summary: Delete a user by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *         description: User deleted successfully
 *      404:
 *         description: User not found
 */
router.delete("/:id", userController.delete);

module.exports = router;
