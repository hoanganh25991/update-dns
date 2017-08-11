"use strict"
const fs = require('fs');
const host = 'tinker.press';
const subdomain = 'pitinker';
const token = require('./token');

const writeLog = function(err, stdout){
		if (err) throw err;
		let timezone = 7; //HCM City
		let now = new Date(new Date().getTime() - timezone*60*1000);
		
		let content = '';
		content += `--------------------------\n`;
		content += `Update at: ${now.toString()}\n`;
		content += `Update to: ${subdomain}.${host}\n`;
		content += `Log: ${stdout}--------------------------\n`;
			
		fs.writeFile(`${__dirname}/updater.log`, content, ()=>{console.log('Review log file');});
	}

const run = function(){
	let exec = require('child_process').exec;
	let cmd = `php ${__dirname}/updater.php ${token} ${host} ${subdomain} A`
	let child1 = exec(cmd, writeLog);
	setTimeout(run, 300000);
}

// Start run
run();

