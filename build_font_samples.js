var figlet = require('figlet');
var fs = require('fs');
let filename = 'sample-fonts.txt';

figlet.fonts(function(err, fonts) {
    if (err) {
        console.log('something went wrong...');
        console.dir(err);
        return;
    }
    fonts.forEach(function(f){
        figlet.text('Ninebee',{
            font: f
        }, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }

            fs.appendFileSync(filename, '\n#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#@#\n'+f+':\n'+data);

            console.log('added: '+f);
        });
    });
});