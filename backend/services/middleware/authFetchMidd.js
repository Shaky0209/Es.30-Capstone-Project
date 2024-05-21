
export const authFetchMidd = async(req, res, next)=>{

    if(!req.headers.authorization){
        res.send("Make Log in!").status(401);
    }else{
        next();
    }
};