const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: integer
 *           description: ID tự động tăng của khách hàng
 *         name:
 *           type: string
 *           description: Tên khách hàng
 *         address:
 *           type: string
 *           description: Địa chỉ khách hàng
 *         phone:
 *           type: string
 *           description: Số điện thoại khách hàng
 *   responses:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *         details:
 *           type: object
 */

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Lấy danh sách tất cả khách hàng
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Danh sách khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/customers", customerController.list);

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Tạo khách hàng mới
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       201:
 *         description: Khách hàng đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.post("/customers", customerController.save);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Lấy thông tin một khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của khách hàng
 *     responses:
 *       200:
 *         description: Thông tin khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Không tìm thấy khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.get("/customers/:id", customerController.edit);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Cập nhật thông tin khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của khách hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Thông tin khách hàng đã được cập nhật
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Customer'
 *       400:
 *         description: Dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       404:
 *         description: Không tìm thấy khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.put("/customers/:id", customerController.update);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Xóa một khách hàng
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID của khách hàng
 *     responses:
 *       200:
 *         description: Khách hàng đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy khách hàng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 *       500:
 *         description: Lỗi server
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/Error'
 */
router.delete("/customers/:id", customerController.delete);

module.exports = router;
