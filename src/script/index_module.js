define(['jquery'], function () {
    return {
        init: function () {
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/index.php",
                data: "data",
                dataType: "json",
                success: function (res) {
                    let temp = '';
                    let strhtml = '';
                    for (let i = 0; i < 6; i++) {
                        temp += `
                            <li>
                                <a href="">
                                    <p class="li-top">
                                        <img src="${res[i].url}" alt="">
                                    </p>
                                    <p class="li-m">${res[i].title}</p>
                                    <p class="li-b">顺丰到付是哒是哒三十多</p>
                                    <span class="li-p">￥${res[i].price}</span>
                                </a>
                            </li>
                            `
                    }
                    for (let i = 6; i < 10; i++) {
                        strhtml += `
                        <li>
                            <a href="">
                                <img src="${res[i].url}" alt="">
                            </a>
                        </li>
                        `
                    }
                    $('.floor-list').html(temp);
                    $('.pro-list').html(strhtml);
                }
            });

            //二级菜单开始
            $('.nav li').hover(function () {
                $('.nav li span').eq($(this).index()).css("color", "#cc0000");
                $('.nav-box').show();
                $(this).addClass('active');
                $('.item').eq($(this).index()).show().siblings().hide();
                let a = $(this)
                // console.log(a.index());
                $('.nav-box').hover(function () {
                    $('.nav-box').show();
                    a.addClass('active').siblings().removeClass('active');
                    a.find("span").css("color", "#cc0000")
                    a.siblings().find("span").css("color", "white");
                },
                    function () {
                        $('.nav-box').hide();
                        a.siblings().removeClass('active');
                        a.find("span").css("color", "white");
                    })
            },
                function () {
                    $('.nav-box').hide();
                    $(this).removeClass('active');
                    $('.nav li span').css("color", "white");
                })
            // 二级菜单结束


            // 头部hover开始
            $('.head-list1 li').eq(5).hover(function () {
                $('.service').stop(true).animate({
                    opacity: 1
                })
            },
                function () {
                    $('.service').stop(true).animate({
                        opacity: 0
                    })
                })

            $('.head-list1 li').eq(4).hover(function () {
                $('.collect').stop(true).animate({
                    opacity: 1
                })
            },
                function () {
                    $('.collect').stop(true).animate({
                        opacity: 0
                    })
                })
            // 头部hover结束


            // 楼梯特效
            $(window).on('scroll', function () {
                let f = $('.floor1:first');
                let top = f.offset().top;
                let height = f.height();
                let win = $(window).scrollTop();
                // console.log(i);
                if (win > top - height) {
                    $('.right-bar').css("display", "block")
                    // $('.right-bar li').addClass('ac');
                } else {
                    $('.right-bar').css("display", "none")
                }
                $('.floor1').each(function (i, elm) {
                    let a = $(elm).offset().top + $(elm).height() / 2;
                    if (a > win) {
                        $('.right-bar li').removeClass('ac');
                        $('.right-bar li').eq(i).addClass('ac');
                        return false;
                    }
                })
            })
        }
    }
});