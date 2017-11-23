import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://api.toutiaojk.com/e/extend/jkh/'
const ajaxPHP = {
    list: 'List.php',
    edit: 'Edit.php',
    uploadFile: 'upload_file.php',
    login: 'ecmsadmin.php',
    task: 'kwdata.php'
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
