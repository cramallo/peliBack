var userid="";

exports.verifyuser=function(req,res,next){
    var id = req.body.userid;
    if(userid!=req.body.userid){
        return res.status(401).json({
            
        });
    }
}

exports.login=function(req){
    setUserid(req);
}

function setUserid(req){
    userid=req.body.userid;
}