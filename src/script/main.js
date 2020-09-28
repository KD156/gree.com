require.config({
    paths: {
        'jquery': './lib/jquery',
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