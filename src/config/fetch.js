import axios from 'axios'
import qs from 'qs'
const baseUrl = 'http://api.toutiaojk.com/e/extend/jkh/'
const ajaxPhp = {
    login: 'Logincc.php',
    article: 'List.php',
    edit: 'Edit.php',
    uploadFile: 'upload_file.php'
}
export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = baseUrl + ajaxPhp[url]

    if (type === 'GET') {
        await axios.get(url, { params: data })
        .then(res => {
            result = res.data
        })
    } else if (type === 'POST') {
        await axios.post(url, qs.stringify(data))
        .then(res => {
            result = res.data
        })
    }
    return result
}
