Page({
  data: {
    cateItems: [
      {
        cate_id: 999,
        cate_name: "热门",
        ishaveChild: true,
        children:
          [
            {
              child_id: 10000001,
              name: '洁面皂',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
            },
            {
              child_id: 10000002,
              name: '卸妆',
              image: "../../resouce/type_select.png"
            },
            {
              child_id: 10000003,
              name: '洁面乳',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117973270.jpg"
            },
            {
              child_id: 10000004,
              name: '面部祛角质',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117981591.jpg"
            }
          ]
      }, {
        cate_id: 1,
        cate_name: "护肤",
        ishaveChild: true,
        children:
          [
            {
              child_id: 10000001,
              name: '洁面皂',
              //image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117972563.jpg"
              image: "../../resouce/1/10000001.png"
            },
            {
              child_id: 10000002,
              name: '卸妆',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161207/148110444480.jpg",
              image: "../../resouce/type_select.png"
            },
            {
              child_id: 10000003,
              name: '洁面乳',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117973270.jpg"
            },
            {
              child_id: 10000004,
              name: '面部祛角质',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161208/148117981591.jpg"
            }
          ]
      },
      {
        cate_id: 2,
        cate_name: "彩妆",
        ishaveChild: true,
        children:
          [
            {
              child_id: 20000001,
              name: '气垫bb',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381301.jpg"
            },
            {
              child_id: 20000002,
              name: '修容/高光',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/14815381411.jpg"
            },
            {
              child_id: 20000003,
              name: '遮瑕',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153815181.jpg"
            },
            {
              child_id: 20000004,
              name: '腮红',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153815759.jpg"
            },
            {
              child_id: 20000005,
              name: '粉饼',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153816983.jpg"
            },
            {
              child_id: 20000006,
              name: '粉底',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153817721.jpg"
            },
            {
              child_id: 20000007,
              name: '蜜粉/散粉',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161212/148153819354.jpg"
            },
            {
              child_id: 20000008,
              name: '隔离霜',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161215/148179053369.jpg"
            }
          ]
      },
      {
        cate_id: 3,
        cate_name: "香水/香氛",
        ishaveChild: true,
        children:
          [
            {
              child_id: 30000001,
              name: '淡香水EDT',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815978910.jpg"
            },
            {
              child_id: 30000002,
              name: '浓香水EDP',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159789883.jpg"
            },
            {
              child_id: 30000003,
              name: '香体走珠',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/14815979307.jpg"
            },
            {
              child_id: 30000004,
              name: '古龙香水男士的最爱',
              image: "http://mz.djmall.xmisp.cn/files/logo/20161213/148159765589.jpg"
            }
          ]
      },
      {
        cate_id: 4,
        cate_name: "个人护理",
        ishaveChild: false,
        children: []
      }
    ],
    curNav: 999,
    curIndex: 0
  },

  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
  }
})  