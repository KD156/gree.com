require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/3.3.0/jquery.min',
        'index': './index'
    },
    shim: {

    }
});

require(['jquery'], function () {
    let pagmod = $('#page').attr('data-page');
    require([pagmod], function (page) {
        page.init();
    })
});