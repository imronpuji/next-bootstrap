var isAllowedMakePost = require("express")();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

isAllowedMakePost.use(function(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

      jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

            req.user = user
        user.roles.map((val, index)=>{
          if(val.role_type.role == 'admin' || val.role_type.role == 'moderator') {
            next()
        } else if(user.roles.length == index + 1) {
           return res.status(401).json({success:false, message:"upps maaf sepertinya anda bukan admin "})
       }
   })
    })
})

module.exports = isAllowedMakePost