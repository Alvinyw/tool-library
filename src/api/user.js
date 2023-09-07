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

/**
 * 退出登录
 */
export function userLoginOut(data = {}) {
    return request({
        url: '/userLoginOutLowCode',
        method: 'post',
        data,
    })
}

/**
* 修改密码
* @param { userId } 用户号或用户名称
* @param { passWd } 密码（当前的）
* @param { newPassWd } 新密码
* @param { confirmPassWd } 确认密码
*/
export function userModPassWd(data = {}) {
    return request({
        url: '/userModPassWdLowCode',
        method: 'post',
        data,
    })
}

/**
 * 新增用户
 * @param { userName } 用户名称
 * @param { userType } 用户类别（lowCodeAdmin-平台管理员，channelAdmin-渠道管理员，commonUser-普通用户）
 * @param { channelAuthArr } 渠道权限（渠道id集合，英文逗号分隔；平台管理员无需配置）
 * @param { templateUseAuth } 模板应用权限（true-有权限，false-无权限；普通用户需配置）
 * @param { remarks } 备注
 */
export function userInfoTableInsert(data = {}) {
    return request({
        url: '/lowCodeUserInfoTableInsert',
        method: 'post',
        data,
    })
}

/**
 * 修改用户信息
 * @param { userId } 用户id
 * @param { userName } 用户名称
 * @param { userStatus } 用户状态（true-正常，false-停用）
 * @param { channelAuth } 渠道权限（渠道id集合，英文逗号分隔；平台管理员无需配置）
 * @param { templateUseAuth } 模板应用权限（true-有权限，false-无权限；普通用户需配置）
 * @param { remarks } 备注
 */
export function userInfoTableUpdateById(data = {}) {
    return request({
        url: '/lowCodeUserInfoTableUpdateById',
        method: 'post',
        data,
    })
}

/**
* 查询用户列表
* @param { userName } 用户名称
* @param { userStatus } 用户状态（true-正常，false-停用）",
* @param { userType } 用户类别（lowCodeAdmin-平台管理员，channelAdmin-渠道管理员，commonUser-普通用户）
* @param { pageNo } 当前页面页码
* @param { pageSize } 页面大小（单页面最大记录数）
*/
export function userInfoTableSelectAll(data = {}) {
    return request({
        url: '/lowCodeUserInfoTableSelectAll',
        method: 'post',
        data,
    })
}