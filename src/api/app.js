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
