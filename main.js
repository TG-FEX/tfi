var fis = module.exports = require('fis');
fis.cli.name = 'tfi';
fis.cli.info = fis.util.readJSON(__dirname + '/package.json');
var path = [];
var bowerDir = '/bower_components';
fis.util.find('.' + bowerDir, /.*bower\.json$/i).map(function(item){
    var s = item.toString();
    var i = s.lastIndexOf('/');
    s = s.substring(0, i);
    i = s.lastIndexOf('/');
    s = s.substring(i + 1);
    path.push({
        reg: RegExp('^\\' + bowerDir + '\\/' + s + '\\/(.*)$'),
        release: '/lib/' + s + '/' + fis.util.readJSON(item).version + '/' + '$1'
    })
});
fis.config.merge({
    project: {
        exclude: /^\/node_modules\//i
    },
    modules: {
        parser: {
            coffee : 'coffee-script',
            scss: 'sass'
        }
    },
    roadmap: {
        ext: {
            scss: 'css',
            coffee: 'js',
            md: 'html'
        },
        path: path.concat({
            reg: /.*bower.json$/,
            release: false
        },{
            reg: /.*package.json$/,
            release: false
        },{
            reg: /.*_.json$/i,
            release: false
        },{
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
        })
    }
});
Object.defineProperty(global, 'tgfis', {
    enumerable : true,
    writable : false,
    value : fis
});

