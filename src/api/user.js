import request from '@/utils/request'

/**
 * 登录
 * @param { userId } 用户号或用户名称
 * @param { passWd } 密码（当前的）
 */
export function userLogin(data = {}) {
    return request({
        url: '/userLoginLowCode',
        method: 'post',
        data,
    })
}
