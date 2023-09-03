
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

const Joi = require('joi');

const index = async (req, res) => await res.json(await prisma.user_role.findMany())

const show = async (req, res) => {
	const schema = Joi.object({
    	username: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const user_role = await prisma.user_role.findUnique({where:{id:req.params.id}})
		return await  res.json(user_role)
	}
	return res.status(422).json(validate) 
}
	
const create = async (req, res) => {
	const schema = Joi.object({
    	username: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const user_role = await prisma.user_role.create({data: req.body})
		return await res.json(user_role)
	}
	return res.status(422).json(validate)
	
};

const edit = async(req, res) => {
	const schema = Joi.object({
    	username: Joi.string().alphanum().min(3).max(30).required()
	})
	const validate = schema.validate(req.body);
	if(!validate.error) {
		const user_role = await prisma.user_role.update({where:{id:req.body.id},data: req.body})
		return await res.json(user_role)
	}
	return res.status(422).json(validate) 
};

const remove = async (req, res) => {
	const schema = Joi.object({
    	id: Joi.string().alphanum().min(1).required()
	})

	const validate = schema.validate(req.params);
	if(!validate.error) {
		const user_role = await prisma.user_role.delete({where: {id:req.params.id}})
		return await res.json(user_role)
	}
	return res.status(422).json(validate) 
	
}

const user_role = {index, show, create, remove, edit}
module.exports = user_role