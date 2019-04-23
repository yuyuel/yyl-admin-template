import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|20': [{
        'id|1-100': 10,
        title: '@cparagraph(2, 8)',
        name: '@cname(2, 3)',
        'status|1': ['published', 'draft', 'deleted'],
        author: '@cname(2, 3)',
        image: '@Image',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }],
      total: 100
    })
    return {
      code: 20000,
      data: items
    }
  }
}
