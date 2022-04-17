

const { User } = require("../models/User");


module.exports = {

    //function to  users....
    getUsers: () => {
        return new Promise(async (resolve, reject) => {
            await User.find({}).then((result) => {
                resolve(result)
            }).catch((error) => {
                console.log("Error: ", error.message);

                reject(error)
            })



        }
        )
    },

    //helper to update user
    updateuser: (data) => {
        return new Promise(async (resolve, reject) => {
            await User.updateOne({ _id: data.id }, {
                $set: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    mobile: data.mobile
                }
            }).then((resp) => {
                resolve(resp)
            })

        })
    },

    //search a user
    searchUser: (search) => {
        return new Promise(async (resolve, reject) => {
            console.log(search);
            let keyword = (search == "nofilter" ) ? {} : { firstName: { $regex: search, $options: "i" } }
            console.log("  <====.....  " + keyword + "  ........>");
            await User.find(keyword).then((resp) => {
                console.log(resp);
                resolve(resp)
            })
        })
    },


    //delete user
    deleteUser: (id) => {
        return new Promise(async (request, response) => {
            try {
                console.log(id);
                await User.deleteOne({ _id: id });
                response.status(200).json("User deleted Successfully");
            } catch (error) {
                console.log(error.message);

            }
        })
    },

    //get details of a specific user
    getSpecificUser: (id) => {
        return new Promise(async (resolve, reject) => {
            await User.findOne({ _id: id }).then((resp) => {
                resolve(resp)
            })
        })
    }




}