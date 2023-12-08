const { StatusCodes } = require('http-status-codes')
const user = require('../model/userModel')

 // read all users list
    const readAll = async (req,res) => {
        try {
            let users = await user.find({}) // model.find() => to read all values in db collection
            // filter the admin
            let fUsers = users.filter(item => item.role !== "admin")

            return res.status(StatusCodes.OK).json({ length: fUsers.length, users: fUsers })
        } catch (err) {
                 return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mag: err.message })
        }
    }

 // change role
            const changeRole = async (req,res) => {
                try {
                    let id = req.params.id

                    let extUser = await user.findById({_id : id})
                        if(!extUser)
                            return res.status(StatusCodes.NOT_FOUND).json({ msg: `Requested user id not found` })

                    await user.findByIdAndUpdate({ _id : id}, {role: req.body.role } )

                    res.status(StatusCodes.ACCEPTED).json({ msg: `User role updated successfully`})

                } catch (err) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mag: err.message })
                }
            }
 // bolcked the user
            const blockUser = async (req,res) => {
                try {
                    let id = req.params.id

                    let extUser = await user.findById({_id : id})
                        if(!extUser)
                            return res.status(StatusCodes.NOT_FOUND).json({ msg: `Requested user id not found` })

                    if (extUser.isBlocked === true) {
                        await user.findByIdAndUpdate({ _id : id}, { isBlocked: req.body.isBlocked } )
                            res.status(StatusCodes.ACCEPTED).json({ msg: `User unblocked successfully`}) 
                    } else {
                        await user.findByIdAndUpdate({ _id : id}, { isBlocked: req.body.isBlocked } )
                            res.status(StatusCodes.ACCEPTED).json({ msg: `User blocked successfully`}) 
                    }

                } catch (err) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mag: err.message })
                }
            }

            // disable the account
            const disableUser = async (req,res) => {
                try {
                    let id = req.params.id

                    let extUser = await user.findById({_id : id})
                        if(!extUser)
                            return res.status(StatusCodes.NOT_FOUND).json({ msg: `Requested user id not found` })

                    if (extUser.isActive === true) {
                        await user.findByIdAndUpdate({ _id : id}, { isActive: req.body.isActive } )
                            res.status(StatusCodes.ACCEPTED).json({ msg: `User disabled successfully`}) 
                    } else {
                        await user.findByIdAndUpdate({ _id : id}, { isActive: req.body.isActive } )
                            res.status(StatusCodes.ACCEPTED).json({ msg: `User is active now`}) 
                    }


                } catch (err) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ mag: err.message })
                }
            }


// validate user email
const validateEmail = async (req,res) => {
    try {
        let { email } = req.body

        let extEmail = await user.findOne({ email })
            if(!extEmail)
                return res.status(StatusCodes.NOT_FOUND).json({ msg : `Requested email id not found`})

                return res.status(StatusCodes.ACCEPTED).json({ msg : `valid User email id`})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message})
    }
}

            module.exports = { readAll, changeRole, blockUser, disableUser, validateEmail }