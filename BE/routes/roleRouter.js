/**
 * @openapi
 *  schemes:
 *    - http
 *    - https
 *	components:
 *	  securitySchemes:
 *	    bearerAuth:            # arbitrary name for the security scheme
 *	      type: http
 *	      scheme: bearer
 *	      bearerFormat: JWT
 *	paths:
 *	  /role:
 *	    post:
 *       summary: API Untuk membuat role, hanya admin yang dapat mengakses.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:          # <!--- form field name
 *                   type: string
 *       description: API Untuk Melakukan Login Lewat Nomor Whatsapp!
 *       responses: 
 *         200 :   
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/

/**
 * @openapi
 *  schemes:
 *    - http
 *    - https
 *	components:
 *	  securitySchemes:
 *	    bearerAuth:            # arbitrary name for the security scheme
 *	      type: http
 *	      scheme: bearer
 *	      bearerFormat: JWT
 *	paths:
 *	  /role:
 *	    get:
 *       summary: API Untuk menampilkan semua jenis role, hanya admin yang dapat mengakses.
 *       responses: 
 *         200 :   
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/

/**
 * @openapi
 *  schemes:
 *    - http
 *    - https
 *	components:
 *	  securitySchemes:
 *	    bearerAuth:            # arbitrary name for the security scheme
 *	      type: http
 *	      scheme: bearer
 *	      bearerFormat: JWT
 *	paths:
 *	  /role/{id}:
 *	    delete:
 *	      parameters:
 *	        - in: path
 *	          name: id   # Note the name is the same as in the path
 *	          required: true
 *	          schema:
 *	            type: integer
 *	            minimum: 1
 *	          description: The user ID
 *       description: API Untuk Melakukan Login Lewat Nomor Whatsapp!
 *       responses: 
 *         200 :   
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/

/**
 * @openapi
 *  schemes:
 *    - http
 *    - https
 *	components:
 *	  securitySchemes:
 *	    bearerAuth:            # arbitrary name for the security scheme
 *	      type: http
 *	      scheme: bearer
 *	      bearerFormat: JWT
 *	paths:
 *	  /role/{id}:
 *	    put:
 *	      parameters:
 *	        - in: path
 *	          name: id   # Note the name is the same as in the path
 *	          required: true
 *	          schema:
 *	            type: integer
 *	            minimum: 1
 *	          description: The user ID
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:          # <!--- form field name
 *                   type: string
 *       description: API Untuk Melakukan Login Lewat Nomor Whatsapp!
 *       responses: 
 *         200 :   
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/





const express = require('express')
const router = express.Router()
const checkIsAdmin = require('../middleware/CheckIsAdmin')

const role = require('../controllers/role')
router.get('/', (req, res)=> role.index(req,res))
router.get(':/id', (req, res)=> role.show(req,res))
router.post('/', checkIsAdmin, (req, res)=> role.create(req, res))
router.put('/:id', (req, res)=> role.edit(req,res))
router.delete('/:id', (req, res)=> role.remove(req, res))

module.exports = router