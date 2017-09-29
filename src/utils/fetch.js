import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://api.toutiaojk.com:8181/e/extend/jkh/'
const ajaxPHP = {
    login: 'Logincc.php',
    list: 'List.php',
    edit: 'Edit.php',
    uploadFile: 'upload_file.php',
    loginText: 'ecmsadmin.php'
}
export var fetch = async(type = 'POST', url = '', data = {}) => {
    let result
    type = type.toUpperCase()
    url = ajaxPHP[url]

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
