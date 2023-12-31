const express = require("express")
const router = express.Router()

// Controller
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhoto, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } = require("../controllers/PhotoController")

// Middlewares
const {photoInsertValidation,photoUpdateValidator,commentValidation} = require("../middlewares/photoValidator")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidations")
const {imageUpload} = require("../middlewares/imageUpload")
// Routes
router.post("/",authGuard,imageUpload.single("image"),photoInsertValidation(),validate,insertPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhoto)
router.get("/search", authGuard, searchPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard,photoUpdateValidator(),validate, updatePhoto)
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)


module.exports = router