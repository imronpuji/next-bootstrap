const { PrismaClient, Prisma } = require("@prisma/client")
const generateJwt = require("../middleware/GenerateToken")
const prisma = new PrismaClient()
const Joi = require("joi")
const { sendCode } = require("../helpers/OTP")
const bcrypt = require("bcryptjs")

const withEmailPassword = async (req, res) => {
  const schema = Joi.object({
    nickname: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().alphanum().min(6).max(20).required(),
  })

  const validate = schema.validate(req.body)
  if (!validate.error) {
    try {
      const login = await prisma.user.findMany({
        where: { nickname: req.body.nickname },
        include: { roles: { include: { role_type: true } } },
      })

      const isPasswordMatch =
        login.length > 0 && (await bcrypt.compareSync(req.body.password, login?.[0].password))

      if (login.length > 0 && isPasswordMatch) {
        const token = generateJwt(...login)

        return await res.json({
          sucess: true,
          message: "Selamat Anda Berhasil Login",
          token,
          profile: login,
        })
      }

      return await res
        .status(403)
        .json({ error: { success: false, message: "Username atau Password Salah" } })
    } catch (e) {
      return await res
        .status(501)
        .json({ error: { success: false, message: "Internal Server Error" } })
    }
  }
  return res.status(422).json(validate.error.details)
}
const login = { withEmailPassword }
module.exports = login
