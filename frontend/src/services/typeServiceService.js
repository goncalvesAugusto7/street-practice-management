import api from "./api"

export const createResident = (data) => {
    return api.post("/types_service/",data)
}