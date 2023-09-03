const express = require("express")
const router = express.Router()
const checkIsAdmin = require("../middleware/CheckIsAdmin")

const role = require("../controllers/role")
router.get("/", (req, res) => role.index(req, res))
router.get(":/id", (req, res) => role.show(req, res))
router.post("/", checkIsAdmin, (req, res) => role.create(req, res))
router.put("/:id", (req, res) => role.edit(req, res))
router.delete("/:id", (req, res) => role.remove(req, res))

module.exports = router
