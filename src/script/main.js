require.config({
    paths: {
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min',
        'pagination':'./lib/pagination'
    },
    shim: {
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        },
        'pagination': {
            deps: ['jquery'],
            exports: 'pagination'
        }
    }
});

require(['jquery'], function () {
    let pagmod = $('#page').attr('data-page');
    require([pagmod], function (page) {
        page.init();
    })
});