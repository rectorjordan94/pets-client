// this is where our api calls for the pets resource will live

// need to import apiUrl and axios package
import apiUrl from '../apiConfig'
import axios from 'axios'

//! READ -> Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

//! READ -> Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

//! CREATE (create a pet)


//! UPDATE (update a pet)


//! DELETE (delete a pet)
