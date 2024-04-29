const {CustomError} = require("../errors");

function errorHandlerMiddleware(err, req,res,next){
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err.message});
    }
    res.status(500).json({msg:"server error"});
}

module.exports = {errorHandlerMiddleware};