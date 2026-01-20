import api from "./api"

export const createResident = (data) => {
    return api.post("/residents/",data)
}

export const deleteResident = (publicId) => {
  return api.delete(`/residents/${publicId}`)
}