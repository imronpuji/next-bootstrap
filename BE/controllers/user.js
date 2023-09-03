const { PrismaClient, Prisma } = require("@prisma/client")

const prisma = new PrismaClient()

const Joi = require("joi")

const jwt_decode = require("jwt-decode")
const bcrypt = require("bcryptjs")

const salt = bcrypt.genSaltSync(10)

const isNicknameExist = async (nickname) => {
  const isExist = await prisma.user.findMany({
    where: {
      nickname,
    },
  })
  return isExist
}

const isPhoneNumberExist = async (phone_number) => {
  const isExist = await prisma.user.findMany({
    where: {
      phone_number,
    },
  })
  return isExist
}

const index = async (req, res) => {
  const roleQuery = req.query.role

  await res.json(
    await prisma.user.findMany({
      where: {
        roles: {
          every: {
            role_type: {
              is: {
                role: roleQuery,
              },
            },
          },
        },
      },
      include: { roles: { include: { role_type: true } } },
    })
  )
}

const show = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  })

  const validate = schema.validate(req.params)

  if (!validate.error) {
    if ((await prisma.user.findUnique({ where: { id: validate.value.id } })) == null) {
      return res
        .status(204)
        .json({ error: { success: true, message: "upps!, user tidak ditemukan" } })
    }

    const user = await prisma.user.findUnique({ where: { id: validate.value.id } })
    return await res.json(user)
  }
  return res.status(422).json(validate.error.details)
}

const showProfile = async (req, res) => {
  const schema = Joi.object({
    token: Joi.string().min(1).max(900).required(),
  })
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  const validate = schema.validate({ token })

  if (!validate.error) {
    var userDecoded = jwt_decode(token)
    if ((await prisma.user.findUnique({ where: { id: parseInt(userDecoded.id) } })) == null) {
      return res.status(204).json({ error: { success: true, message: "upps!, user tidak ada" } })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userDecoded.id) },
      include: { roles: { include: { role_type: true } } },
    })
    user.token = token
    return await res.json(user)
  }
  return res.status(422).json(validate.error.details)
}

const create = async (req, res) => {
  const schema = Joi.object({
    nickname: Joi.string().min(3).max(30).required(),
    role_id: Joi.number().integer().required(),
    phone_number: Joi.string().min(11).max(13).required(),
    password: Joi.string().min(6).max(13).required(),
    photo: Joi.string().min(6).max(1000),
  })
  const validate = schema.validate(req.body)

  try {
    if (!validate.error) {
      const {
        value: { nickname, role_id, phone_number, password, photo },
      } = validate

      if ((await isPhoneNumberExist(phone_number)).length > 0) {
        return res
          .status(422)
          .json({ error: { success: true, message: "upps!, Phone number Sudah terdaftar" } })
      }

      if ((await isNicknameExist(nickname)).length > 0) {
        return res
          .status(422)
          .json({ error: { success: true, message: "upps!, Nickname Sudah digunakan" } })
      }

      const hashPassword = bcrypt.hashSync(password, salt)
      const user = await prisma.user.create({
        data: { nickname, phone_number, password: hashPassword, photo },
      })

      await prisma.user_Role.create({
        data: { user_id: user.id, role_id },
      })
      return await res.json(user)
    }
    return res.status(422).json(validate.error.details)
  } catch (error) {
    return res.status(500).json({ error: { success: false, message: error.message } })
  }
}

const addRole = async (req, res) => {
  const schema = Joi.object({
    role_id: Joi.string().min(1).max(30).required(),
  })
  const { role_id } = req.body
  const validate = schema.validate(req.body)
  if (!validate.error) {
    const user_role = await prisma.user_Role.create({
      data: { user_id: parseInt(req.params.id), role_id: parseInt(req.body.role_id) },
    })
    return await res.json(user_role)
  }
  return res.status(422).json(validate.error.details)
}

const edit = async (req, res) => {
  const schema = Joi.object({
    nickname: Joi.string().min(3).max(30),
    phone_number: Joi.string().min(6).max(30),
    photo: Joi.string().min(6).max(1000),
  })

  const validate = schema.validate(req.body)

  try {
    if (!validate.error) {
      const { nickname, phone_number, photo } = validate.value
      const user = await prisma.user.update({
        where: { id: parseInt(req.params.id) },
        data: { nickname, phone_number, photo },
      })
      return await res.json({ data: user, message: "Data Berhasil Diubah", status: true })
    }
    return res.status(422).json(validate.error.details)
  } catch (error) {
    return res.status(500).json({ error: { success: false, message: "Internal Server Error" } })
  }
}

const remove = async (req, res) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().min(1).required(),
  })

  const validate = schema.validate(req.params)
  if (!validate.error) {
    try {
      // statements
      const user_role = await prisma.user_Role.deleteMany({
        where: { user_id: parseInt(req.params.id) },
      })
      const user = await prisma.user.delete({ where: { id: parseInt(req.params.id) } })
      return await res.status(200).json({ success: true, message: "Yeaa ! has been remove " })
    } catch (e) {
      // statements
      return await res.status(401).json({ success: false, message: "remove failed!" })
    }
  }
  return res.status(422).json(validate.error.details)
}

const user = { index, show, create, remove, edit, showProfile, addRole }
module.exports = user
