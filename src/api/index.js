import { request } from '@/utils/request'

// 登录
export function getLogin({ enews, username, password, equestion }) {
    let res = request('/ecmsadmin.php', 'POST', { enews, username, password, equestion })
    return res
}

// 用户信息
export function getUser(token) {
    let res = request('/ecmsadmin.php', 'POST', { enews: 'check', token })
    return res
}

// 获取文章列表
export async function getArticleList({ type, page }) {
    let res = await request('/List.php', 'GET', { type, page })
    return res
}

// 获取文章
export async function getArticle(id) {
    let res = await request('/List.php', 'GET', { type: 'edit', id })
    return res
}

// 提交文章
export async function postArticle(params) {
    let res = await request('/Edit.php', 'POST', params)
    return res
}

// 获取任务
export async function getTask() {
    let res = await request('/kwdata.php', 'POST', { type: 'list' })
    return res
}

// 提交任务
export async function postTask({ type, title, describe, kword, gzword, ctword, id }) {
    let res = await request('/kwdata.php', 'POST', { type, title, describe, kword, gzword, ctword, id })
    return res
}

// 获取图片
export async function getPicture({ key, page }) {
    let res = await request('/picsearch', 'GET', { key, page })
    return res.data
}
