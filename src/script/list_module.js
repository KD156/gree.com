define(['jquery', 'jlazyload', 'pagination'], function () {
    return {
        init: function () {
            let array_default = []; //排序前的li数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null;
            let page = null;
            $('.menu-left').hover(function () {
                $('.nav').css("display", "block")
            },
                function () {
                    $('.nav').css("display", "none")
                });

            $.ajax({
                type: "post",
                url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/index.php",
                dataType: "json",
                success: function (res) {
                    page = Math.ceil(res.length / 12)
                    localStorage.setItem("fy", page);
                }
            });


            // 数据渲染
            $.ajax({
                type: "get",
                url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/listdata.php",
                dataType: "json",
                success: function (res) {
                    let strlist = '';
                    res.forEach(function (elm, i) {
                        strlist += `
                        <li>
                        <a href="javascript:;" id=${elm.sid}>
                        <p class="li-top">
                            <img class="lazy" data-original="${elm.url}" alt="">
                        </p>
                        <p class="li-m">${elm.title}</p>
                        <p class="li-b">顺丰到付是哒是哒三十多</p>
                        <span class="li-p">￥${elm.price}</span>
                        </a>
                        </li>
                        `
                    })
                    $('.list1').html(strlist);


                    //重置数组
                    array_default = []; //排序前的li数组
                    array = []; //排序中的数组
                    prev = null;
                    next = null;
                    //将页面的li元素追加到两个数组中。
                    $('.list1 li').each(function (index, element) {
                        array[index] = $(this);
                        array_default[index] = $(this);
                    });

                    // 懒加载
                    $(function () {
                        $("img.lazy").lazyload({ effect: "fadeIn" });
                    });



                }
            })


            // 分页
            $('.page').pagination({
                pageCount: localStorage.getItem("fy"),
                jump: true,
                coping: true,
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '末页',
                callback: function (api) {
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/listdata.php",
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                            let strlist = '';
                            res.forEach(function (elm, i) {
                                strlist += `
                                    <li>
                                    <a href="javascript:;" id=${elm.sid}>
                                    <p class="li-top">
                                        <img class="lazy" data-original="${elm.url}" alt="">
                                    </p>
                                    <p class="li-m">${elm.title}</p>
                                    <p class="li-b">顺丰到付是哒是哒三十多</p>
                                    <span class="li-p">￥${elm.price}</span>
                                    </a>
                                    </li>
                                `
                            })
                            $('.list1').html(strlist);

                            $(function () {
                                $("img.lazy").lazyload({ effect: "fadeIn" });
                            });

                            //重置数组
                            array_default = []; //排序前的li数组
                            array = []; //排序中的数组
                            prev = null;
                            next = null;
                            //将页面的li元素追加到两个数组中。
                            $('.list1 li').each(function (index, element) {
                                array[index] = $(this);
                                array_default[index] = $(this);
                            });
                        }
                    })
                }
            })


            // 排序
            $('.paixu-list li').eq(0).on('click', function () {
                $.each(array_default, function (index, value) {
                    $('.list1').append(value);
                });
                console.log(array_default)
                return;
            })

            // 升序
            $('.paixu-list li').eq(1).on('click', function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.li-p').text().substring(1))
                        next = parseFloat(array[j + 1].find('.li-p').text().substring(1))

                        if (prev < next) {
                            let n = array[j]
                            array[j] = array[j + 1]
                            array[j + 1] = n
                        }
                    }
                }
                $.each(array, function (i, val) {
                    $('.list1').append(val)
                })
            })


            // 降序
            $('.paixu-list li').eq(2).on('click', function () {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.li-p').text().substring(1))
                        next = parseFloat(array[j + 1].find('.li-p').text().substring(1))

                        if (prev > next) {
                            let n = array[j]
                            array[j] = array[j + 1]
                            array[j + 1] = n
                        }
                    }
                }
                $.each(array, function (i, val) {
                    $('.list1').append(val)
                })
            })
        }
    }
})