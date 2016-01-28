var less = require('less');
var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '../less/Web-Styles.less');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err){
		
		less.render(data,
			{
			  paths: ['./less'],  // Specify search paths for @import directives
			  filename: 'dist/less-build.log', // Specify a filename, for better error messages
			  compress: true          // Minify CSS output
			},
			function (e, output) {
				var resultFile = path.join(__dirname, '../dist/styles.css');
				fs.writeFile(resultFile, output.css, {encoding: 'utf-8'});
			}
		);

    }else{
        console.log(err);
    }

});
