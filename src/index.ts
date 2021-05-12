#!/usr/bin/env node

import chalk from 'chalk'
import arg from 'arg'

import getLink from './link'
import logError from './error'

const args = arg({
	'--help': Boolean,
	'-h': '--help',

	'--private': Boolean,
	'-p': '--private'
})

if (!args._.length || args['--help']) {
	console.log(chalk`{bold {cyan snip [file]} snip a file}`)
	console.log(chalk`{bold {cyan snip [file] [name]} set a custom name}`)

	console.log(chalk`\n{bold options:}`)

	console.log(chalk`  {bold {cyan -p --private} make the snip private}`)

	process.exit()
}

getLink(args._[0], args._[1], !args['--private'])
	.then(link => {
		console.log(chalk`{bold {gray ${link}} {cyan copied to clipboard!}}`)
	})
	.catch(logError)
