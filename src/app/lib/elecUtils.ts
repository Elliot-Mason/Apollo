import axios from "axios"

/**
 * The base path for the electron-playground api
 */
const apiBase: string = 'http://localhost:3000'

/**
 * Retrieve the data.json from the electron-playground api
 *
 * @returns{any | false} False if the data failed to load, otherwise the applicable data
 */
export async function jsonDataGet() {
    return axios({
        method: 'get',
        url: `${apiBase}/load/dataJson`,
        withCredentials: false
    })
    .then(({data}) => data)
    .catch(e => {
        console.log('ERROR', e)
        return false
    })
}
