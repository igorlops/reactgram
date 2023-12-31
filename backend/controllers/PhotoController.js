const Photo = require("../models/Photo")
const mongoose = require("mongoose")
const User = require("../models/User")

// Insert a photo, with an user related to it

const insertPhoto = async (req, res) => {
    const { title } = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        username: user.name,
    });

    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problem, por favor tente novamente"]
        })
        return
    }
    res.status(201).json(newPhoto)
}

const deletePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))
    // Checks if photo exists
    if (!photo) {
        console.log("A foto nao existe")
        res.status(404).json({ errors: ["Foto não encontrada!"] })
        return
    }
    // Check if photo belongs to user
    if (!photo.userId.equals(reqUser._id)) {
        console.log("Problema com o usuario do id")
        res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
    }
    await Photo.findOneAndDelete(photo._id)
    res.status(200).json({ id: photo._id, message: "Foto deletada com sucesso!" })

}

// Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    return res.status(200).json(photos)
}

const getUserPhoto = async (req, res) => {
    const { id } = req.params

    const photos = await Photo.find({ userId: id })
        .sort([['createdAt', -1]])
        .exec()
    return res.status(200).json(photos)
}

// Get photo byID
const getPhotoById = async (req, res) => {
    const { id } = req.params
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id))

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada"] })
        return
    }

    res.status(200).json(photo)
}

//  Update photo

const updatePhoto = async (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const reqUser = req.user
    const photo = await Photo.findById(id)

    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada"] })
        return
    }
    if (!photo.userId.equals(reqUser._id)) {
        res.status(422).json({ errors: ["Ocorreu um erro, por favor tente novamente mais tarde."] })
        return
    }
    if (title) {
        photo.title = title
    }
    await photo.save()
    res.status(200).json({ photo, message: "Foto atualizada com sucesso" })

}
// Like functionaly
const likePhoto = async (req, res) => {
    const { id } = req.params
    const reqUser = req.user
    const photo = await Photo.findById(id)

    // Check if photo exists
    if (!photo) {
        res.status(404).json({ errors: ["Foto não encontrada"] })
        return;
    }

    // Check if user already liked  the photo
    if (photo.likes.includes(reqUser._id)) {
        const indice = photo.likes.indexOf(reqUser._id)
        if(indice !== -1){
            photo.likes.splice(indice,1)
            console.log(indice, photo.likes)
            photo.save()
        }
        res.status(200).json({ photoId: id, userId: reqUser._id, message: "Curtida removida com sucesso" })
        return;
    }

    // Put user id in likes array
    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({ photoId: id, userId: reqUser._id, message: "A foto foi curtida com sucesso" })

}

const commentPhoto = async(req,res) => {
    const {id} = req.params
    const {comment} = req.body

    const reqUser = req.user
    const user = await User.findById(reqUser._id)
    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors:["Foto não encontrada"]})
        return
    }

    // Put comment in the array comments
    const userComment = {
        comment,
        userName:user.name,
        userImage:user.profileImage,
        userId: user._id
    };

    photo.comments.push(userComment)

    await photo.save()

    res.status(200).json({
        comment:userComment,
        message: "O comentário foi adicionado com sucesso!"

    })
}

const searchPhotos = async(req,res) => {
    const {q} = req.query

    const photos = await Photo.find({title: new RegExp(q,"i")}).exec()

    res.status(200).json(photos)
}

module.exports = {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhoto,
    getPhotoById,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos
}