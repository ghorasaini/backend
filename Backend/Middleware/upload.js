import multer from "multer";

const storage = multer.diskStorage({
    // where file are temporary store
    destination:function(req, file, cd){
        cd(null, "./public/temp");
    },

    filename:function(req, file, cb){
        cb(null, file.originalname);
    },
})

const upload = multer ({ storage: storage});
 export { upload}