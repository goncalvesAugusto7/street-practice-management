import api from "./api"

export const createUser = (data) => {
    return api.post("/users/",data)
}

export const uploadProfilePicture = (publicId, formData) => {
  return api.post(`/users/${publicId}/profile-picture`, formData)
}

export const deleteUser = (publicId) => {
  return api.delete(`/users/${publicId}`)
}