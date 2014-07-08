var bower = require('bower');
var fis = require('fis');
var _ = fis.util;
var pkgJSON = _.readJSON('./package.json');
_.mkdir('./.fis');
_.write('./.fis/release.bat', 'cd /d %~dp0/../\n' + __dirname + '\\node_modules\\.bin\\fis.cmd' + ' release -c -f .fis\\conf.js');
if (pkgJSON && pkgJSON.bower) {
    _.write('./bower.json', JSON.stringify(pkgJSON.bower));
    bower.commands.install().on('log', function(data){
        console.log('bower ' + '\t' + data.id.blue + '\t\t' + data.message.green)
    }).on('end', function(){
        console.log('bower依赖安装完毕'.bold);
        _.del('./bower.json');
    });
} else {
    console.log('无法安装依赖，缺少package.json或者缺少bower属性')
}

