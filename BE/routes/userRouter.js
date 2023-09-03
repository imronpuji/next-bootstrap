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
 *	  /user/{id}:
 *	    get:
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
 *	  /user/{id}:
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
 *	  /user/{id}:
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
 *                 identity_name:          # <!--- form field name
 *                   type: string
 *                 greeeting:          # <!--- form field name
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
 *	  /user:
 *	    post:
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
 *                 phone_number:          # <!--- form field name
 *                   type: string
 *                 nickname:          # <!--- form field name
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
 *	  /user/profile:
 *	    get:
 *       summary: API Untuk Memperoleh data diri user!
 *       responses:
 *         200 :
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/

const postType = require("./post_type_swagger.js")

const express = require("express")
const router = express.Router()
const checkIsAdmin = require("../middleware/CheckIsAdmin")
const checkAllowedPost = require("../middleware/CheckAllowedPost")

const user = require("../controllers/user")
router.post("/user", (req, res) => user.create(req, res))
router.get("/users", (req, res) => user.index(req, res))
router.get("/user/:id", (req, res) => user.show(req, res))
router.get("/user/profile", (req, res) => user.showProfile(req, res))
router.put("/user/:id", (req, res) => user.edit(req, res))
router.post("/user/:id/role", checkAllowedPost, (req, res) => user.addRole(req, res))
router.delete("/user/:id", checkIsAdmin, (req, res) => user.remove(req, res))

// export
module.exports = router
