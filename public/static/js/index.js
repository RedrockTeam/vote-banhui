var $navBarWrap = $('.nav-bar-wrap');
var $listWrap = $('.list-wrap');

$navBarWrap.delegate('.nav-bar', 'click', function(e) {
    var $target = $(e.target);
    var index = 0;

    if($target.hasClass('nav-bar-active')) return;

    $navBarWrap.children().each(function(index, navbar) {
        $(navbar).removeClass('nav-bar-active');
        $listWrap.eq(index).hide();
    })

    $target.addClass('nav-bar-active');

    index = ~~$target.attr('data-list-index');

    $listWrap.eq(index).show();
});



var $thumb = $('.thumb');

$thumb.on('click', function(e) {
    var $this = $(this);

    var college = $this.attr('data-college');
    var id = this.attr('data-id');
    
    $.post('/path/to/file', {college: college, id: id}, function(data, textStatus, xhr) {
        var status = data.status;
        
    });

});




// var type = 'preside';
// ;(function () {

//     $('.the_main').on('click', function () {

//         type = 'preside';

//         changeButtonStyle(
//             '.the_main', '.person_button',
//             '#wrap_1', '#wrap_2'
//         );

//     });

//     $('.person_button').on('click', function () {

//         type = 'song';

//         changeButtonStyle(
//             '.person_button', '.the_main',
//             '#wrap_2', '#wrap_1'
//         );

//     });

//     function changeButtonStyle (id1, id2, w1, w2) {

//         $(id1).css({
//             'color': '#fff',
//             'background': '#3787fb'
//         });

//         $(id2).css({
//             'color': '#333',
//             'background': '#fff'
//         });

//         $(w1).css('display', 'block');
//         $(w2).css('display', 'none');

//     }

// }());

// ;(function () {

//     var warp1Arr = [],
//         warp2Arr = [];

//     $('.song_list_wrap')
//         .on('click', function (e) {

//             if (e.target.nodeName === 'I') {
                
//                 var target = $(e.target);
//                 var flag = changeStyle(target);

//                 var index;

//                 if (target.attr('data-belong') === 'warp_1') {

//                     if (flag) {

//                         if (warp1Arr.length > 2) {
//                             changeStyle(target);
//                             return alert('投票不超过3票');                
//                         }
//                         warp1Arr.push(target.attr('data-id'));

//                     } else {

//                         index = warp1Arr.indexOf(target.attr('data-id'));
//                         warp1Arr.splice(index, 1);

//                     }

//                 } else {

//                     if (flag) {

//                         if (warp2Arr.length > 2) {
//                             changeStyle(target);
//                             return alert('投票不超过3票');                
//                         }
//                         warp2Arr.push(target.attr('data-id'));

//                     } else {

//                         index = warp2Arr.indexOf(target.attr('data-id'));
//                         warp2Arr.splice(index, 1);

//                     }
//                 }

//             }

//         });

//         $('#submit_btn')
//             .on('click', function () {

//                 if (type === 'preside' && warp1Arr.length < 3) {

//                     return alert('至少投3票');
//                 } else if (type === 'song' && warpArr.length < 3) {

//                     return alert('至少投3票');
//                 }

//                 $.post('/vote_dayituan_2016/vote', {
//                     type: type,
//                     work_ids: type === 'preside' ? warp1Arr : warp2Arr
//                 }, function (res) {
                    
//                     // 原来返回的是字符串,现在改成json, 不用 parse 了
//                     // res = JSON.parse(res);

//                     if (res.status == 200) {
//                         alert('投票成功');
//                     } else if (res.status == 403) {
//                         alert('投票失败，你今天已投过');
//                     } else {
//                         alert('投票失败，请稍后重试');
//                     }
//                     window.location.href = window.location.href.replace(/\?.+$/, '');

//                 })

//             });

//     function changeStyle (target) {

//         if (target.hasClass('red-icon')) {
//             target.removeClass('red-icon');
//             return false;
//         } else {
//             target.addClass('red-icon');
//             return true;
//         }

//     }

// }());