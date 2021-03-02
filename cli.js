#!/usr/bin/env node
const { execSync } = require('child_process');
const clear = require('clear');
const chalk = require('chalk');
const showInfo = require('./lib/showInfo');
const inquirer = require('./lib/inquirer');
const file = require('./lib/file');
const cliSpinners = require('cli-spinners');
const github = require('./lib/github');
const ora = require('ora');

// const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
__GLOBAL = {};
async function main() {
	let shouldForce = false;
	clear();
	showInfo();
	const { projectName, templateUrl } = await inquirer.askTemplate();
	const projectPath = file.getAbsolutePath(projectName);
	//Ask for forcewrite
	if (file.directoryExists(projectPath)) {
		shouldForce = await inquirer.askForForceWrite(projectName).then((e) => e.shouldForce);
		if (!shouldForce) return 'Unforce write project! Stop generator!';
	}
	if (shouldForce) {
		console.log(chalk.yellow('[^_^]: '), chalk.green('Delete old project!'));
		execSync(`rm -rf ${projectPath}`);
		console.log(chalk.magenta('[UwU]: '), chalk.green('Delete old project success!'));
	}
	__GLOBAL.spinner = ora({
		text: chalk.magenta('[UwU]:') + chalk.green('Clone template!\n'),
		spinner: cliSpinners.line,
	});
	__GLOBAL.spinner.start();
	const cloneData = await github.clone(templateUrl, projectPath);
	console.log(chalk.magenta('[UwU]: '), chalk.green(cloneData));
	__GLOBAL.spinner.stop();
	return `Create project ${projectName} success!`;
}
main()
	.then((data) => {
		console.log(chalk.magenta('[UwU]: '), chalk.green(data));
	})
	.catch((error) => {
		console.log(chalk.red('[ERR]: '), error.message);
		__GLOBAL.spinner.stop();
	});
