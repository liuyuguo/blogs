'use strict';

$(document).ready(function () {
  //导航前端高亮
  $('.header-list').find('li').eq(5).addClass('active');
  //实例化vue对象
  var vueMvvm = new Vue({
    el: '#container',
    data: {
      weblist: PictureOperate,
      itemdata: ItemData
    }
  });
});