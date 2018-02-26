// import { request, instance } from '@/utils/request'
import { request } from '@/utils/request'

// Tip：
// 1、request方法适用于普遍的GET、POST方法
// 2、instance方法适用于需要做特殊处理的请求，如：自定义Header、其他的http方法等
// 3、使用解构参数，方便阅读和管理
// 4、同一请求不同参数可以另写1个function或着不使用解构参数

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

// 获取图片
export async function getPicture({ key, page }) {
    let res = await request('/picsearch', 'GET', { key, page })
    return res.data
}
