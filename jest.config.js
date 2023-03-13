/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/src'],
	modulePaths: ['./__test__'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	moduleNameMapper: {
		'@alias/(.*)': '<rootDir>/src/path/to/alias/$1'
	}
};
