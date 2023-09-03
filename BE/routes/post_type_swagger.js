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
 *	  /post/type:
 *	    post:
 *       summary: API Untuk membuat Jenis Sebuah Postingan, hanya admin yang dapat mengakses.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:          # <!--- form field name
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
 *	  /post/types:
 *	    get:
 *       summary: API Untuk memperoleh Jenis Sebuah Postingan, hanya admin yang dapat mengakses.
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
 *	  /post/{id}/type:
 *	    delete:
 *	      parameters:
 *	        - in: path
 *	          name: id   # Note the name is the same as in the path
 *	          required: true
 *	          schema:
 *	            type: integer
 *	            minimum: 1
 *	          description: The user ID
 *       summary: API Untuk menghapus Jenis Sebuah Postingan, hanya admin yang dapat mengakses
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
 *	  /post/{id}/type/:
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
 *       summary: API Untuk mengubah Jenis Sebuah Postingan, hanya admin yang dapat mengakses 
 *       responses: 
 *         200 :   
 *           description : OK!
 *       security:
 *         - bearerAuth: []
 */
/**/

