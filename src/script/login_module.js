define(['jquery'], function () {
    return {
        init:function () {

            $('.login-button').on('click', function() {
                $.ajax({
                    type: "get",
                    url: "http://127.0.0.1/h5-2006/gree.com/projectname/php/login.php",
                    data: {
                        username: $('#username').val(),
                        password: $('#password').val()
                    },
                    dataType: "json",
                    success: function(res) {
                        if (res.pd) {
                            location.href = "http://127.0.0.1/h5-2006/gree.com/projectname/src/index.html";
                            localStorage.setItem('username', $('#username').val());
                        } else {
                            alert('用户名或密码错误')
                            location.href = "http://127.0.0.1/h5-2006/gree.com/projectname/src/login.html";
                        }
                    }
                });
            })

        }
    }
})