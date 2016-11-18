var $select = $('select')
var $checkbox = $('input[type="checkbox"]')
var $list = $('.class-list')
var $button_sp_area = $('.button_sp_area')
var showType

var voteStatus = ['pending', 'voting', 'finish']

$checkbox.each(function (index, item) {
    item.click()
})

$select.on('change', function () {
    showType = this.value
    filterList()
})

$checkbox.on('click', function () {
    if (this.checked) {
        voteStatus.push($(this).attr('data-status'))
    } else {
        voteStatus.splice(
            voteStatus.indexOf($(this).attr('data-status')),
            1
        )
    }
    filterList()
})

$button_sp_area.on('click', function (e) {
    var $target = $(e.target)
    if (!$target.hasClass('weui_btn'))
        return
    var active = $target.attr('data-active')
    $.post('/vote_drx/changeStatus', {
        type: $target.parents('.list').attr('data-id'),
        status: active
    }, function (res) {
        if (res.status === 200) {
            alert('修改成功')
            $target.parents('.list').attr('data-vote', active)
            $target.parents('.button_sp_area').prev().html(active)
        } else {
            alert(res.msg)
        }
    })
})

function filterList () {
    $list.each(function (index, item) {
        var $item = $(item)
        if (voteStatus.indexOf($item.attr('data-vote')) === -1 || (showType !== '所有' && $item.attr('data-type') !== showType)) {
            $item.hide()
        } else {
            $item.show()
        }
    })
}

(function(){
    $('#delete-all-vote').on('click', function() {
        var a, b;
        a = confirm('你确定要清除所有投票吗?! 请谨慎操作!');
        b = confirm('你真的真的确定要清除所有投票吗??!!  请谨慎操作!');

        if( a && b ) {
            $.post('/vote_drx/delete_all_vote', function(res) {
                if(res.status === 200) {
                    alert('删除成功');
                } else {
                    alert(res.msg);
                }
            })
        }

    });
}())