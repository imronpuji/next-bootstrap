
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

const Joi = require('joi');

const index = async (req, res) => await res.json(await prisma.role_type.findMany())

const show = async (req, res) => {
	const schema = Joi.object({
    	username: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const role = await prisma.role_type.findUnique({where:{id:req.params.id}})
		return await  res.json(role)
	}
	return res.status(422).json(validate.error.details) 
}
	
const create = async (req, res) => {
	const schema = Joi.object({
    	role: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const role = await prisma.role_type.create({data: req.body})
		return await res.json(role)
	}
	return res.status(422).json(validate.error.details)
	
};

const edit = async(req, res) => {
	const schema = Joi.object({
    	name: Joi.string().alphanum().min(3).max(30).required()
	})
	const validate = schema.validate(req.body);
	if(!validate.error) {
		const role = await prisma.role_type.update({where:{id:req.body.id},data: req.body})
		return await res.json(role)
	}
	return res.status(422).json(validate.error.details) 
};

const remove = async (req, res) => {
	const schema = Joi.object({
    	id: Joi.string().alphanum().min(1).required()
	})

	const validate = schema.validate(req.params);
	if(!validate.error) {
		const role = await prisma.role_type.delete({where: {id:req.params.id}})
		return await res.json(role)
	}
	return res.status(422).json(validate.error.details) 
	
}

const role = {index, show, create, remove, edit}
module.exports = role