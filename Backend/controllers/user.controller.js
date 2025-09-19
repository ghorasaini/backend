
import User from "../model/user.model.js";



const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        const updates = req.body;
        const user =  await User.updateOne({_id : id}, updates, {
            new: true,
        })
        if (!user) {
            return res.status (404).json({
                message: "User not found",
            })
        }
        res.status (200).json({
            message: "User updated",
            user,
        })
    }catch (error){}
    
}

// deleteUser
const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;
       
        const user =  await User.findByIdAndDelete(id);
        if (!user) {
            return res.status (404).json({
                message: "User not found",
            })
        }
        res.status (200).json({
            message: "User deleted",
            user,
        })
    }catch (error){}
    
}
 export {updateUser, deleteUser}