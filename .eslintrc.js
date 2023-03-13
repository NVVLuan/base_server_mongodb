module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	// plugins: ['prettier'],
	// rules: {
	// 	'prettier/prettier': [
	// 		'error',
	// 		{
	// 			printWidth: 120,
	// 			tabWidth: 4,
	// 			singleQuote: true,
	// 			trailingComma: 'all',
	// 			bracketSpacing: false,
	// 		},
	// 	],
	// },
	"rules": {
		"no-console": "error",
		"no-empty": "error",
		"no-multiple-empty-lines": "warn",
		"no-var": "error",
		"@typescript-eslint/no-var-requires": "error"

	}
}
