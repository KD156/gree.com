define(['jquery', 'jcookie'], function () {
    return {
        init: function () {
            let shop = cookie.get('shop')

            // 数据渲染
            if (shop) {
                shop = JSON.parse(shop)
                let idList = shop.map(elm => elm.id).join()

                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/cart.php",
                    data: {
                        idList: idList
                    },
                    dataType: "json",
                    success: function (res) {
                        // console.log(res)
                        let temp = '';
                        res.forEach((elm, i) => {

                            let arr = shop.filter(val => val.id == elm.sid);
                            // console.log(arr)
                            temp += `
                            <div class="content-list">
                        <ul class="cart-list">
                        <li><input type="checkbox" class="ch" checked></li>
                        <li class="cart-img"><img src="${elm.url}" alt=""></li>
                        <li class="cart-tit"><p>${elm.title}</p></li>
                        <li class="cart-price"><span class="jiage${elm.sid}">￥${elm.price}</span></li>
                        <li class="cart-add">
                            <div>
                                <input type="button" class="delitem" value="-">
                                <input type="text" class="val" value="${arr[0].num}" id="${elm.sid}">
                                <input type="button" class="additem" value="+">
                            </div>
                        </li>
                        <li class="cart-hj"><span class="zj${elm.sid}">￥${(elm.price * arr[0].num).toFixed(2)}</span></li>
                        <li class="cart-del" id="${arr[0].id}">【删除】</li>
                        </ul>
                        </div>
                                `
                            zj()
                        })
                        $('.mm').html(temp)



                        // 左
                        $('.main-border').on('click', '.delitem', function () {
                            let shop = cookie.get('shop')
                            shop = JSON.parse(shop)
                            // console.log(shop)

                            let id = $(this).next().attr('id')
                            // console.log(id)
                            let a = parseInt($(this).next().val());
                            // console.log(a)
                            let b = $('.jiage' + id + '').text().substring(1);
                            console.log(b)

                            if (a > 1) {
                                $(this).next('.val')[0].value = a - 1;
                                if (shop.some(elm => elm.id == id)) {
                                    shop.forEach(elm => {
                                        elm.id === id ? elm.num = a - 1 : null;
                                    });
                                    cookie.set('shop', JSON.stringify(shop), 1);
                                    $('.zj' + id + '').text(`￥${((a - 1) * b).toFixed(2)}`);
                                }
                            }

                            zj()
                        })

                        // 右
                        $('.main-border').on('click', '.additem', function () {
                            let shop = cookie.get('shop')
                            shop = JSON.parse(shop)
                            // console.log(shop)

                            let id = $(this).prev().attr('id')
                            // console.log(sid)
                            let a = parseInt($(this).prev().val());
                            // console.log(a)
                            let b = $('.jiage' + id + '').text().substring(1);
                            // console.log(b)
                            if (a < 100) {
                                $(this).prev('.val')[0].value = a + 1;
                                if (shop.some(elm => elm.id == id)) {
                                    shop.forEach(elm => {
                                        elm.id === id ? elm.num = a + 1 : null;
                                    });
                                    cookie.set('shop', JSON.stringify(shop), 1);
                                    $('.zj' + id + '').text(`￥${((a + 1) * b).toFixed(2)}`);
                                }
                            }
                            zj()
                        })

                        // 计算价格
                        function zj() {
                            let price = 0;
                            let num = 0;

                            $('.content-list').each(function (i, elm) {
                                // console.log(elm)
                                if ($(elm).find('.ch').is(':checked')) {
                                    price += parseFloat($(elm).find('.cart-hj span').html().substring(1))
                                    console.log(price)
                                    num += parseInt($(elm).find('.val').val())
                                }
                            })
                            $('.num').html(num)
                            $('.price_font').html('￥' + price.toFixed(2))
                        }
                        zj()


                        // 删除
                        $('.main-border').on('click', '.cart-del', function (ev) {
                            let id = $(ev.target).attr('id')
                            let shop = cookie.get('shop')
                            shop = JSON.parse(shop)
                            shop = shop.filter(function (val) {
                                return val.id != id
                            })
                            cookie.set('shop', JSON.stringify(shop), 1)
                            ev.target.parentNode.parentNode.remove();
                            zj()
                        })

                        // 批量删除
                        $('.shop_set').on('click', '.alldel', function () {
                            if (window.confirm('你确定要全部删除吗?')) {
                                $('.mm').each(function (i, elm) {
                                    if ($(elm).find(':checkbox').is(':checked')) {
                                        $(elm).children('.content-list').remove();
                                        cookie.remove('shop')
                                    }
                                });
                            }
                            zj();
                        });


                        // 全选
                        $('.allsel').on('change', function () {
                            $('.ch').prop('checked', $(this).prop('checked'));
                            $('.allsel').prop('checked', $(this).prop('checked'));
                            zj();
                        });
                        let $inputs = $('.ch');
                        $('.main-border').on('change', $inputs, function () {
                            if ($('.ch').length === $('.ch:checked').length) {
                                $('.allsel').prop('checked', true);
                            } else {
                                $('.allsel').prop('checked', false);
                            }
                            zj();
                        });
                    }
                });


            }
        }
    }
})