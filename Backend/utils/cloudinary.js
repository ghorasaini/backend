import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:"dwqxvfr9j",
    api_key: "757316792457632",
    api_secret:"gBf4bkmJNo04exgttnIsragD8Tk"
})

const uploadToCloudinary = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload (filePath, {
            resource_type:"auto",
        })

        return result;
    }catch (error){}
}
export { uploadToCloudinary};