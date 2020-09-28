define(['jquery'], function () {
    return {
        init: function () {
            $('.menu-left').hover(function () {
                $('.nav').css("display", "block")
            },
                function () {
                    $('.nav').css("display", "none")
                })
        }
    }
})