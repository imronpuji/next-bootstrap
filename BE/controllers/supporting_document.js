
const { PrismaClient, Prisma } = require('@prisma/client')

const prisma = new PrismaClient()

const Joi = require('joi');

const {validateImage} = require('../validation/validate')

const resizeImg = require('resize-image-buffer');

const fs = require('fs')

const path = require('path')

const jwt_decode = require('jwt-decode')

__dirname = path.resolve();

const index = async (req, res) => await res.json(await prisma.supporting_document.findMany())

const show = async (req, res) => {
	const schema = Joi.object({
    	username: Joi.string().alphanum().min(3).max(30).required()
	})

	const validate = schema.validate(req.body);
	if(!validate.error) {
		const supporting_document = await prisma.supporting_document.findUnique({where:{id:req.params.id}})
		return await  res.json(supporting_document)
	}
	return res.status(422).json(validate) 
}
	
const create = async (req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
  	const userDecoded = jwt_decode(token)

  	const schema = Joi.object({
    	self_id_card: Joi.required(),
    	photo_id_card: Joi.required(),
    	organization_card: Joi.required()
	})

	const validate = schema.validate(req.files);
	
	if(validate.error){
		return res.status(422).json(validate.error.details)
	} 	

	else {
		const checkDocumentExist = await prisma.supporting_document.findUnique({where:{user_id:userDecoded.id}})
		if(checkDocumentExist){
			validate.error ={}
			return res.status(422).json({message:validate.error['details'] ="Gagal, pengguna sudah mengupload dokumen", success:false})
		}
		let fileName = {}
		if(req.files != null){
			for(file in req.files){
				const image = req.files[file]
				await validateImage(image.name, async(result)=>{
					if(result){
						// let uploadPath =await __dirname + '/public/' + image.name;
						let uploadPath =await __dirname + '/public/image/documents/';
						const buff = await resizeImg(image.data, {
						    width: 500,
						    height: null,
				 		});

				 		const randName = Math.random().toString(36).substr(2, 5);
				 		fileName[file]=randName+path.extname(image.name)
			  			const saveFile = fs.writeFileSync(uploadPath+randName+path.extname(image.name), buff, (err)=>{
			  				console.log(err)
			  				if(err){
			  					return res.status(500).json([{
									response:{message:'Upss! Upload failed, internal error'},
									success:false,
								}])
			  				} 
			  				
			  			})
			  			
					} else {
						return res.status(400).json([{
							response:{message:'Upss! Upload failed, file must be an image'},
							success:false,
						}])
					}
				})
			}
		} else {
			return res.json([{
					response:{message:"Upss! Upload failed, image file does not exist"},
					success:false,
				}])
		}

		if(!validate.error){
			try {
				const documents = await prisma.supporting_document.create({data:{user_id:userDecoded.id, ...fileName}})
				return res.status(200).json(documents)
			} catch(e) {
				return res.status(422).json({message:"Gagal, pengguna sudah mengupload document"})
			}
		}
	}
	
};

const edit = async(req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
  	const userDecoded = jwt_decode(token)

  	const schema = Joi.object({
    	self_id_card: Joi.required(),
    	photo_id_card: Joi.required(),
    	organization_card: Joi.required()
	})

	const validate = schema.validate(req.files);
	
	if(validate.error){
		return res.status(422).json(validate.error.details)
	} 	

	else {
		const checkDocumentExist = await prisma.supporting_document.findUnique({where:{user_id:userDecoded.id}})
		if(checkDocumentExist){
			
		}
		let fileName = {}
		if(req.files != null){
			for(file in req.files){
				const image = req.files[file]
				await validateImage(image.name, async(result)=>{
					if(result){
						// let uploadPath =await __dirname + '/public/' + image.name;
						let uploadPath =await __dirname + '/public/image/documents/';
						const buff = await resizeImg(image.data, {
						    width: 500,
						    height: null,
				 		});

				 		const randName = Math.random().toString(36).substr(2, 5);
				 		fileName[file]=randName+path.extname(image.name)
			  			const saveFile = fs.writeFileSync(uploadPath+randName+path.extname(image.name), buff, (err)=>{
			  				console.log(err)
			  				if(err){
			  					return res.status(500).json([{
									response:{message:'Upss! Upload failed, internal error'},
									success:false,
								}])
			  				} 
			  				
			  			})
			  			
					} else {
						return res.status(400).json([{
							response:{message:'Upss! Upload failed, file must be an image'},
							success:false,
						}])
					}
				})
			}
		} else {
			return res.json([{
					response:{message:"Upss! Upload failed, image file does not exist"},
					success:false,
				}])
		}

		if(!validate.error){
			try {
				const documents = await prisma.supporting_document.update({where:{user_id:userDecoded.id}, data:{...fileName}})
				return res.status(200).json(documents)
			} catch(e) {
				return res.status(422).json({message:"Gagal, pengguna sudah mengupload document"})
			}
		}
	}
	
};

const remove = async (req, res) => {

	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
  	const userDecoded = jwt_decode(token)
	const supporting_document = await prisma.supporting_document.deleteMany({where: {user_id:userDecoded.id}})
	
	if(supporting_document) return await res.json({message:'Berhasil Menghapus Dokumen',supporting_document, success:true})
	
	return res.status(422).json(validate) 
	
}
const removeDoc = async (req, res) => {
	const authHeader = req.headers['authorization']
  	const token = authHeader && authHeader.split(' ')[1]
  	const userDecoded = jwt_decode(token)

	const supporting_document = await prisma.supporting_document.delete({where: {user_id:userDecoded.id}})
	return await res.status(201).json({message:'Berhasil Menghapus Dokumen', supporting_document, success:true})
	
}

const supporting_document = {index, show, create, remove, edit, removeDoc}
module.exports = supporting_document