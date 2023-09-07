import request from '@/utils/request'

/**
 * 查询渠道列表
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function channelInfoTableSelectList(data = {}) {
  return request({
    url: '/lowCodeChannelInfoTableSelectList',
    method: 'post',
    data,
  })
}

/**
 * 新增渠道
 * @param { channelName } 渠道名称（如：电子渠道、新网贷等）
 * @param { remarks } 备注
 */
 export function channelInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodeChannelInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 修改渠道信息
 * @param { channelName } 渠道名称（如：电子渠道、新网贷等）
 * @param { channelId } 渠道id
 * @param { channelStatus } 渠道状态（true-正常，false-关闭）
 * @param { remarks } 备注
 */
 export function channelInfoTableUpdateById(data = {}) {
  return request({
    url: '/lowCodeChannelInfoTableUpdateById',
    method: 'post',
    data,
  })
}

/**
 * 查询模块列表
 * @param { channelId } 归属渠道
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function moduleInfoTableSelectList(data = {}) {
  return request({
    url: '/lowCodeModuleInfoTableSelectList',
    method: 'post',
    data,
  })
}

/**
 * 新增模块
 * @param { moduleName } 模块名称（如：手机银行、企业网银等）
 * @param { channelId } 归属渠道
 * @param { remarks } 备注
 */
 export function moduleInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodeModuleInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 修改模块信息
 * @param { moduleId } 模块id
 * @param { moduleName } 模块名称（如：手机银行、企业网银等）
 * @param { moduleStatus } 模块状态（true-正常，false-关闭）
 * @param { remarks } 备注
 */
 export function moduleInfoTableUpdateById(data = {}) {
  return request({
    url: '/lowCodeModuleInfoTableUpdateById',
    method: 'post',
    data,
  })
}

/**
 * 查询页面列表
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function pageInfoTableSelectList(data = {}) {
  return request({
    url: '/lowCodePageInfoTableSelectList',
    method: 'post',
    data,
  })
}

/**
 * 新增页面
 * @param { pageName } 页面名称
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { remarks } 备注
 */
 export function pageInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodePageInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 修改页面信息
 * @param { pageId } 页面编号
 * @param { pageName } 页面名称
 * @param { pageStatus } 页面状态（true-正常，false-关闭）
 * @param { remarks } 备注
 */
 export function pageInfoTableUpdateById(data = {}) {
  return request({
    url: '/lowCodePageInfoTableUpdateById',
    method: 'post',
    data,
  })
}

/**
 * 查询模板列表（指定页面）
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pageId } 归属页面
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function templateInfoListSelect(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoListSelect',
    method: 'post',
    data,
  })
}

/**
 * 新增模板
 * @param { templateName } 模板名称
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pageId } 归属页面
 * @param { templateContext } 模板内容
 * @param { remark } 备注
 */
 export function templateInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 查询模板信息（单个）
 * @param { templateId } 模版编号
 */
 export function templateInfoTableSelectById(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoTableSelectById',
    method: 'post',
    data,
  })
}

/**
 * 修改模板信息
 * @param { templateId } 模板编号
 * @param { templateName } 模板名称
 * @param { templateContext } 模板内容
 * @param { remark } 备注
 */
 export function templateInfoTableUpdateById(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoTableUpdateById',
    method: 'post',
    data,
  })
}

/**
 * 模板应用
 * @param { pageId } 归属页面
 * @param { templateId } 模板编号
 */
 export function templateInfoUse(data = {}) {
  return request({
    url: '/lowCodeTemplateInfoUse',
    method: 'post',
    data,
  })
}

/**
 * 获取模板操作页面的下拉列表（实时）
 */
 export function userPermissionList(data = {}) {
  return request({
    url: '/userPermissionList',
    method: 'post',
    data,
  })
}

/**
 * 模板变更日志查询
 * @param { userName } 用户名称
 * @param { transDate } 交易日期
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function templateLogTableSelectAll(data = {}) {
  return request({
    url: '/lowCodeTemplateLogTableSelectAll',
    method: 'post',
    data,
  })
}

/**
 * 图片上传
 * @param { pictureName } 中文名称
 * @param { pictureFormat } 图片格式（jpg，png等）
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pictureBase64 } 图片内容（base64字符串）
 * @param { remark } 备注
 */
 export function pictureInfoTableInsert(data = {}) {
  return request({
    url: '/lowCodePictureInfoTableInsert',
    method: 'post',
    data,
  })
}

/**
 * 图片上传
 * @param { pictureId } 图片编号
 */
 export function pictureInfoTableSelectById(data = {}) {
  return request({
    url: '/lowCodePictureInfoTableSelectById',
    method: 'post',
    data,
  })
}

/**
 * 查询图片列表
 * @param { pictureName } 中文名称
 * @param { channelId } 归属渠道
 * @param { moduleId } 归属模块
 * @param { pageNo } 当前页面页码
 * @param { pageSize } 页面大小（单页面最大记录数）
 */
 export function pictureInfoTableSelectList(data = {}) {
  return request({
    url: '/lowCodePictureInfoTableSelectList',
    method: 'post',
    data,
  })
}
