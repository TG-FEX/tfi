var path = fis.config.get('roadmap.path');
fis.config.set('roadmap.path', path.concat({
    reg: /^\/(.*?)([^/]+)(?:\/_)?\.(html|cshtml|aspx)$/i,
    release: '/view/$1$2.$3',
    isHtmlLike: true
},{
    reg: /^\/(.*?)([^/]+)(?:\/_)?\.(js)$/i,
    release: '/js/$1$2.$3',
    id: '$1$2',
    isJsLike: true
},{
    reg: /^\/(.*?)([^/]+)(?:\/_)?\.(scss)$/i,
    release: '/css/$1$2.$3',
    isCssLike: true
}));