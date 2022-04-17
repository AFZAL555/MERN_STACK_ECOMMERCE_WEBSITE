const multer = require('multer');

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
});
const filter = (req,file,cb)=>{
    
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png"||file.mimetype == "image/webp"){
        cb(null,true);
    }else{
        cb({message:"This File is Not Supported"},false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter:filter,
});


module.exports = upload; 




