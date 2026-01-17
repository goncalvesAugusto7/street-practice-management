import api from "./api"

export const createLocation = (data) => {
    return api.post("/locations/",data)
}