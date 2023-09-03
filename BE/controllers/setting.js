
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

const Joi = require('joi');

const index = async (req, res) => await res.json(await prisma.setting.findMany())

const show = async (req, res) => {
	const schema = Joi.object({
    	id: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.params);
	if(!validate.error) {
		const setting = await prisma.setting.findUnique({where:{id:parseInt(req.params.id)}})
		return await  res.json(setting)
	}
	return res.status(422).json(validate) 
}
	
const create = async (req, res) => {
	const schema = Joi.object({
    	title: Joi.string().min(1).max(30).required(),
    	description: Joi.string().min(1).max(1000).required(),
    	favicon: Joi.string().min(1).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const setting = await prisma.setting.create({data: req.body})
		return await res.json(setting)
	}
	return res.status(422).json(validate)
	
};

const edit = async(req, res) => {
	const schema = Joi.object({
    	title: Joi.string().min(1).max(30).required(),
    	description: Joi.string().min(1).max(1000).required(),
    	favicon: Joi.string().min(1).max(30).required()
	})
	const validate = schema.validate(req.body);
	if(!validate.error) {
		const setting = await prisma.setting.update({where:{id:parseInt(req.params.id)},data: req.body})
		return await res.json(setting)
	}
	return res.status(422).json(validate) 
};

const remove = async (req, res) => {
	const schema = Joi.object({
    	id: Joi.string().alphanum().min(1).required()
	})

	const validate = schema.validate(req.params);
	if(!validate.error) {
		const setting = await prisma.setting.delete({where: {id:parseInt(req.params.id)}})
		return await res.json(setting)
	}
	return res.status(422).json(validate) 
	
}

const setting = {index, show, create, remove, edit}
module.exports = setting