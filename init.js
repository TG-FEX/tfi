var bower = require('bower');
var fis = require('fis');
var _ = fis.util;
var pkgJSON = _.readJSON('./package.json');
console.log(pkgJSON)
var tfiAddr = __dirname + '\\..\\.bin\\tfi';
_.write('./.tfi/conf.js', '');
_.write('./.tfi/release.bat', [
    'cd /d %~dp0/../\n',
    tfiAddr + ' release -c -f .tfi\\conf.js',
    tfiAddr + ' server open'
].join('\n'));
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

