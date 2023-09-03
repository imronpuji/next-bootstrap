/**
 * @openapi
 * /login:
 *   post:
 *     summary: API Untuk Login.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:          # <!--- form field name
 *                 type: string
 *                 value: 085882843337
 *     description: API Untuk Melakukan Login Lewat Nomor Whatsapp!
 *     responses:
 *       200 :
 *         description : OK!
 * /login/verify:
 *   post:
 *     summary: API Untuk Login.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:          # <!--- form field name
 *                 type: string
 *     description: API Untuk Melakukan Login Verifikasi!
 *     responses:
 *       200 :
 *         description : OK!
 */
/**
 * @openapi
 * /register:
 *   post:
 *     summary: API Untuk Registr5asi.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone_number:          # <!--- form field name
 *                 type: string
 *                 value: 085882843337
 *               nickname:          # <!--- form field name
 *                 type: string
 *     description: API Untuk Melakukan Login Lewat Nomor Whatsapp!
 *     responses:
 *       200 :
 *        description : OK!
 */
const express = require("express")
const router = express.Router()

const login = require("../controllers/login")
router.post("/login", (req, res) => login.withEmailPassword(req, res))

module.exports = router
