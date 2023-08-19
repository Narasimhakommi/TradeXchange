
exports.isValidId = (req,res,next) => {
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let error = new Error('Invalid Id');
        error.status = 400;
        next(error);
    }
    else{
        next();
    }
}