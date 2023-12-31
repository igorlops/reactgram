import { api, requestConfig } from "../utils/config";

// Publish an user photo
const publishPhotos = async(data,token) => {
    const config = requestConfig("POST",data,token,true)

try {
    const res = await fetch(api+"/photos" , config)
    .then((res) => res.json())
    .catch((err) => err)

    return res
    } catch(error){
        console.log(error)
    }
}

// Get user photo
const getUserPhoto = async (id,token) => {
    const config= requestConfig("GET",null,token)


    try {
        const res = await fetch(api + "/photos/user/" + id, config)
        .then((res) => res.json())
        .then((err) => err)
        return res
    }
    catch(error){
        console.log(error)
    }

}

const deletePhoto = async(id, token) => {
    const config = requestConfig("DELETE","", token);

    try{
    const res = await fetch(api + "/photos/"+id,config)
    .then((res) => res.json())
    .catch((err) => err)

    return res
    }catch(error){
        console.log(error)
    }
}

const updatePhoto = async(data,id,token) => {
    const config = requestConfig("PUT", data, token)
    try {
        const res = await fetch(api + "/photos/" +id, config)
        .then((res) => res.json())
        .catch((error) => error)
        return res
    }catch(error){
        console.log(error)
    }
}

// get a photo by id

const getPhoto = async(id,token) => {
    const config = requestConfig("GET",null,token)

    try {
        const res = await fetch(api + "/photos/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)
        return res
    }catch(error){
        console.log(error)
    }
}

const like = async(id, token ) => {
    const config = requestConfig("PUT",null, token)
    try {
        const res = await fetch(api + "/photos/like/" + id, config)
        .then((res) => res.json())
        .catch((err) => err)
        return res
    }catch (error) {
        console.log(error)
    }
}

const comment = async(data, id, token) => {
    const config = requestConfig("PUT", data, token)

    try{
        const res = await fetch(api+"/photos/comment/" + id, config)
        .then((res) => res.json())
        .catch((err) => err);

        return res
    }catch(error){
        console.log(error)
    }
}
const getPhotos = async(token) => {
    const config = requestConfig("GET",null, token)
    try {
        const res = await fetch(api + "/photos", config)
        .then((res) => res.json())
        .catch((res)=> res)
        return res
    }
    catch(error){
        console.log(error)
    }
}


// Search photo by title
const searchPhotos = async(query, token) => {
    const config = requestConfig("GET", null, token)

    try {
        const res = await fetch(api + "/photos/search?q=" + query, config) 
        .then((res)=> res.json())
        .catch((err) => err)
        return res
    } catch(error){
        console.log(error)
    }
}

const photoService = {
    publishPhotos,
    getUserPhoto,
    deletePhoto,
    updatePhoto,
    getPhoto,
    like,
    comment,
    getPhotos,
    searchPhotos
}

export default photoService