const {validateImage} = require('../validation/validate') 
const resizeImg = require('resize-image-buffer');
const fs = require('fs')
const path = require('path')
__dirname = path.resolve();

const uploadFile = async (req, name, cb) => {
	if(req.files != null){
		const image = req.files[name]
		await validateImage(image.name, async(result)=>{
			if(result){
				// let uploadPath =await __dirname + '/public/' + image.name;
				let uploadPath =await __dirname + '/public/image/documents/';
				const buff = await resizeImg(image.data, {
				    width: 500,
				    height: null,
		 		});

		 		const randName = Math.random().toString(36).substr(2, 5);
	  			const saveFile = fs.writeFileSync(uploadPath+randName+path.extname(image.name), buff, (err)=>{
	  				console.log(err)
	  				if(err){
	  					cb(false)
	  				} 
	  				cb(true)
	  			})
	  			
			} else {
				return cb(400).json([{
					response:{message:'Upss! Upload failed, file must be an image'},
					success:false,
				}])
			}
		})
	} else {
		return cb([{
				response:{message:"Upss! Upload failed, image file does not exist"},
				success:false,
			}])
	}
}

module.exports = {uploadFile}