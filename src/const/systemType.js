// 系统枚举
export const systemType = {
    PER_PHONE: 1, // 个人手机银行APP
    ENT_PHONE: 2, //企业手机银行APP
    GYKD: 3, // 赣银快贷小程序
};

// 系统映射
export const systemMap = [{
    value: systemType.PER_PHONE,
    name: '个人手机银行APP'
}, {
    value: systemType.ENT_PHONE,
    name: '企业手机银行APP'
}, {
    value: systemType.GYKD,
    name: '赣银快贷小程序'
}];

// 页面枚举
export const pageType = {
    HOME: 1, // 首页
    CAIFU: 2, // 财富
    DAIKUAN: 3, // 贷款
    SHENGHUO: 4, // 生活
    USER_CENTER: 5, // 我的
};

// 页面映射
export const pageMap = [{
    value: pageType.HOME,
    name: '首页'
}, {
    value: pageType.CAIFU,
    name: '财富'
}, {
    value: pageType.DAIKUAN,
    name: '贷款'
},{
    value: pageType.SHENGHUO,
    name: '生活'
},{
    value: pageType.USER_CENTER,
    name: '我的'
}];

// 系统页面映射
export const systemPagesMap = [{
    value: systemType.PER_PHONE,
    pages: [
        pageType.HOME,
        pageType.CAIFU,
        pageType.DAIKUAN,
        pageType.SHENGHUO,
        pageType.USER_CENTER,
    ]
}, {
    value: systemType.ENT_PHONE,
    pages: []
}, {
    value: systemType.GYKD,
    pages: []
}];


// 用户角色
export const userType = {
    PLATFORM_ADMIN: 'lowCodeAdmin', // 平台管理员
    CHANNEL_ADMIN: 'channelAdmin', // 渠道管理员
    COMMON_USER: 'commonUser', // 普通用户,
};

// 用户角色映射
export const userTypeMap = [{
    value: userType.PLATFORM_ADMIN,
    name: '平台管理员'
}, {
    value: userType.CHANNEL_ADMIN,
    name: '渠道管理员'
}, {
    value: userType.COMMON_USER,
    name: '普通用户'
}];