const organizationUrl = `https://github.com/notekunn-organization`;
const templates = [
	{
		value: 'ts-package-boilerplate',
		name: 'Typescript Package NPM',
	},
	{
		value: 'ts-package-boilerplate',
		name: 'React Chrome Extension',
	},
];
module.exports = templates.map((e) => {
	e.value = `${organizationUrl}/${e.value}`;
	return e;
});
