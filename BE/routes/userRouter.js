const express = require("express")
const router = express.Router()
const checkIsAdmin = require("../middleware/CheckIsAdmin")
const checkAllowedPost = require("../middleware/CheckAllowedPost")

const user = require("../controllers/user")
router.post("/user", (req, res) => user.create(req, res))
router.get("/users", (req, res) => user.index(req, res))
router.get("/user/profile", (req, res) => user.showProfile(req, res))
router.get("/user/:id", (req, res) => user.show(req, res))
router.put("/user/:id", (req, res) => user.edit(req, res))
router.post("/user/:id/role", checkAllowedPost, (req, res) => user.addRole(req, res))
router.delete("/user/:id", checkIsAdmin, (req, res) => user.remove(req, res))

// export
module.exports = router
