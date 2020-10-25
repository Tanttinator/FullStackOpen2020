import Axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    return Axios.get(baseUrl).then(response => response.data)
}

const create = obj => {
    return Axios.post(baseUrl, obj).then(response => response.data)
}

const update = (id, obj) => {
    return Axios.put(`${baseUrl}/${id}`, obj).then(response => response.data)
}

const remove = id => {
    return Axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, update, remove}