define(['jquery', 'jcookie'], function () {
    return {
        init: function () {
            let id = location.search.split("=")[1];

            if (!id) {
                id = 1
            }
            // 数据渲染
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/detail.php",
                data: {
                    sid: id
                },
                dataType: "json",
                success: function (res) {
                    // console.log(res)
                    let smallpic = res.piclisturl.split(",")
                    // console.log(smallpic)
                    $('.midimg img').attr("src", res.url)
                    $('.title-top p').text(res.title)
                    $('.bpic').attr("src", "https://gelimall.oss-cn-shenzhen.aliyuncs.com/album/2019/1/27/7d9556b6-cb5a-45d4-8f52-f4ed03c5984a.jpg")
                    $('.sailnumber').text(`${res.sailnumber}件`)
                    $('.price').text(`￥${parseFloat(res.price).toFixed(2)}`)
                    let small = ''
                    smallpic.forEach(function (elm, i) {
                        small += `
                                <li><img src="${elm}" alt=""></li>
                            `
                    })
                    $('.pro-list').html(small);

                    $('.btn').on('click', function () {
                        additem(id, $('#add').val());
                    })

                    show()
                }
            });


            // 存cookie
            function additem(id, num) {
                let shop = cookie.get("shop");

                let product = {
                    id: id,
                    num: num
                };

                if (shop) {
                    shop = JSON.parse(shop);
                    if (shop.some((elm) => elm.id == id)) {
                        shop.forEach(elm => {
                            elm.id === id ? elm.num = num : null;
                        })
                    } else {
                        shop.push(product);
                    }
                } else {
                    shop = [];
                    shop.push(product);
                }
                cookie.set("shop", JSON.stringify(shop), 1);
            }


            // 放大镜
            // 小放/大放=小图/大图
            const spic = $('.midimg')
            const sf = $('.sf')
            const bf = $('.bf')
            const bpic = $('.bpic')

            spic.hover(function () {
                let bl = bpic.width() / spic.width();
                sf.css({
                    visibility: 'visible',
                    width: spic.width() * bf.width() / bpic.width(),
                    height: spic.height() * bf.height() / bpic.height()
                });
                bf.css('visibility', 'visible');
                $(this).on('mousemove', function (ev) {
                    let lf = ev.pageX - $('.leftpic').offset().left - sf.width() / 2;
                    let tp = ev.pageY - $('.leftpic').offset().top - sf.height() / 2;

                    if (lf < 0) {
                        lf = 0
                    } else if (lf >= spic.width() - sf.width()) {
                        lf = spic.width() - sf.width()
                    }

                    if (tp < 0) {
                        tp = 0;
                    } else if (tp >= spic.height() - sf.height()) {
                        tp = spic.height() - sf.height()
                    }

                    sf.css({
                        left: lf,
                        top: tp
                    });

                    bpic.css({
                        left: -lf * bl,
                        top: -tp * bl
                    });
                })
            },
                function () {
                    sf.css('visibility', 'hidden');
                    bf.css('visibility', 'hidden');
                })


            // 小图切换
            $('.pro-list').on('click', 'li', function () {
                let imgurl = $(this).find("img").attr("src")
                $('.spic').attr("src", imgurl)
                $('.bpic').attr("src", imgrul)
            })

            let num = 4;
            $('.right').on('click', function () {
                let list = $('.pro-list li');
                if (list.length > num) {
                    num++;
                    $('.left').css('color', '#333');
                    if (list.length == num) {
                        $('.right').css('color', '#ccc');
                    }
                    $('.pro-list').animate({
                        left: -(num - 4) * list.eq(0).outerWidth(true)
                    });
                }
            });

            $('.left').on('click', function () {
                // alert(1)
                let list = $('.pro-list li');
                if (num > 4) {
                    num--;
                    $('.right').css('color', '#333');
                    if (num <= 4) {
                        $('.left').css('color', '#ccc');
                    }
                    $('.pro-list').animate({
                        left: -(num - 4) * list.eq(0).outerWidth(true)
                    });
                }
            });

            function show() {
                // console.log($('#list ul li').size())
                if ($('.pro-list li').length <= num) {
                    $('.right').css({
                        color: '#ccc'
                    })
                }
            }

            $('.jia').on('click', function () {
                if ($('#add').val() < 100) {
                    $('#add')[0].value = parseInt($('#add').val()) + 1
                }
            })
            $('.jian').on('click', function () {
                if ($('#add').val() > 1) {
                    $('#add')[0].value = $('#add').val() - 1
                }
            })
        }
    }
})