import chalk from 'chalk'

const logError = (error: unknown) => {
	const message =
		error instanceof Error ? error.message : 'An unknown error occurred'

	console.error(chalk`{red {bold Error:} ${message}}`)
}

export default logError
