require.config({
    paths: {
        'jquery': './lib/jquery',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min',
        'pagination':'./lib/pagination',
        'jcookie':'./lib/cookie'
    },
    shim: {
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        },
        'pagination': {
            deps: ['jquery'],
            exports: 'pagination'
        },
        'jcookie': {
            deps: ['jquery'],
            exports: 'jcookie'
        }
    }
});

require(['jquery'], function () {
    let pagmod = $('#page').attr('data-page');
    require([pagmod], function (page) {
        page.init();
    })
});