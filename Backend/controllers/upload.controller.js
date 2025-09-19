import { uploadToCloudinary } from "../utils/cloudinary.js";
const uploadFile = async (req, res) =>{
    try{

        



        const photoLocalPath = req.files.photo[0].path;

        if (photoLocalPath){
            const image = await uploadToCloudinary (photoLocalPath);
            return res.status(200).json({
                url: image.secure_url,
            })
        }
        res.status (400).json({
            message:"No file uploaded",
        });
        console.log (photoLocalPath);

    }
    catch(error){
        console.log(error);

        console.log();

    }
};
export { uploadFile};
