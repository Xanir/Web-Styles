var less = require('less');
var fs = require('fs');
var path = require('path');

var getFileName = function(fullPath) {
    var fileName = fullPath.replace( path.dirname(fullPath), '');
    fileName = fileName.replace( path.extname(fileName), '' );
    fileName = fileName.replace(/[\\\/]/, '');

    return fileName;
};

var distPath = path.join(__dirname, '../dist');
var buildCSS = function (lessFile) {
    fs.readFile(lessFile, {encoding: 'utf-8'}, function(err, data){
        if (err) {
            throw err;
        }

        var cssFile = path.join(distPath, getFileName(lessFile));
        cssFile +=  '.css';

        less.render(data,
            {
              paths: ['./less'],  // Specify search paths for @import directives
              filename: 'dist/less-build.log', // Specify a filename, for better error messages
              compress: true          // Minify CSS output
            },
            function (e, output) {
                fs.writeFile(cssFile, output.css, {encoding: 'utf-8'});
            }
        );

    });
};

var lessHomePath = path.join(__dirname, '../less');
fs.readdir(lessHomePath, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(lessHomePath, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile() && /[^[\\\/]]*(.*?)\.less$/.test(file);
    }).forEach(function (file) {
        buildCSS(file)
    });
});