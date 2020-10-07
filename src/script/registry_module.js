define(['jquery'], function () {
    return {
        init: function () {
            // 用户名验证
            $('#username').on('input', function () {
                let reg = /^[A-z]\w{5,15}$/;
                if (reg.test($('#username').val())) {

                    $('.us').attr('data-pass', true);
                    $('.us').text('验证通过');
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/registry.php",
                        data: { username: $('#username').val() },
                        dataType: "json",
                        success: function (res) {
                            console.log(res)
                            if (res.pd) {
                                $('.us').attr('data-pass', true);
                                $('.us').text('用户名可用');
                            } else {
                                $('.us').attr('data-pass', false);
                                $('.us').text('用户名已存在');
                            }
                        }
                    });
                } else {
                    $('.us').attr('data-pass', false)
                    $('.us').text('验证失败');
                }
            });

            // 邮箱验证
            $('#email').on('input',function(){
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                if(reg.test($('#email').val())){
                    $('.em').attr('data-pass',true)
                    $('.em').text('验证通过')
                }else {
                    $('.em').attr('data-pass', false)
                    $('.em').text('验证失败')
                }
            })

            // 手机号验证
            $('#phone').on('input', function () {
                let reg = /^[1][3-9]\d{9}$/
                if (reg.test($('#phone').val())) {
                    $('.ph').attr('data-pass', true);
                    $('.ph').text('验证通过');
                } else {
                    $('.ph').attr('data-pass', false)
                    $('.ph').text('验证失败')
                }
            });

            // 密码验证
            $('#password').on('input', function () {
                let reg = /^.{5,15}$/
                if (reg.test($('#password').val())) {
                    $('.ps').attr('data-pass', true)
                    $('.ps').text('验证通过')
                } else {
                    $('.ps').attr('data-pass', false)
                    $('.ps').text('验证失败')
                }
            })

            $('#checkpass').on('input', function () {
                if ($('#checkpass').val() == $('#password').val()) {
                    $('.cp').attr('data-pass', true)
                    $('.cp').text('验证通过')
                } else {
                    $('.cp').attr('data-pass', false)
                    $('.cp').text('验证失败')
                }
            })

            // 注册
            $('.btn').on('click', function () {
                if ($('[data-pass=true]').length == 5 && $('.check').is(':checked')) {
                    $.ajax({
                        type: "get",
                        url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/zc.php",
                        data: {
                            username: $('#username').val(),
                            phone: $('#phone').val(),
                            password: $('#password').val(),
                            email:$('#email').val()
                        },
                        dataType: "json",
                        success: function (res) {
                            if (res.zt) {
                                alert('注册成功')
                                location = "http://127.0.0.1/h5-2006/gree.com/projectname/src/login.html";
                            }
                        }
                    });
                }
            })
        }
    }
})