const authorisedAdmin=(req,res)=>{
    if(req.session.logged.role=='admin'){
        return true;
    }else{
        res.status(200).send({ success:true,  message:"Only admin authorised to perform" });
        return false;
       
    }
}
function getFileName(path){
    var s= path.replace(/\\/g, '/');
    s= s.substring(s.lastIndexOf('/')+ 1);
    return  s.replace(/[?#].+$/, '');
}

const getPort=()=>{
    return process.env.PORT || 8081;
}
module.exports={authorisedAdmin, getPort, getFileName}