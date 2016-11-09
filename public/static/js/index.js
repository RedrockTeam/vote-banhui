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

    var academy = parseInt($this.attr('data-academy'));
    var id = parseInt($this.attr('data-id'));
    
    var areYouConfirm = confirm("确定将你宝贵的一票投给Ta们吗?");

    if(!areYouConfirm) return;

    $.post('/vote', {data: {academy: academy, id: id}}, function(data, textStatus, xhr) {
        var status = data.status;
        if(status === 200) {
            location.reload();
        } else {
            alert('你已经给该学院投过票')
        }
    });

});




















