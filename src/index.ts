#!/usr/bin/env node

import chalk from 'chalk'

import getLink from './link'
import logError from './error'

if (process.argv.length <= 2) {
	logError(new Error('You must specify a path'))
	process.exit()
}

getLink(process.argv[2], process.argv[3])
	.then(link => {
		console.log(chalk`{bold {gray ${link}} {cyan copied to clipboard!}}`)
	})
	.catch(logError)
