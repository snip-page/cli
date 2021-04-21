import fetch from 'node-fetch'
import clipboard from 'clipboardy'
import chalk from 'chalk'

import getName from './name'
import getText from './text'
import { ORIGIN, NAME_MAX_LENGTH } from './constants'

const getLink = async (path: string, name: string | undefined) => {
	name = getName(name || path)

	if (name.length > NAME_MAX_LENGTH)
		throw new Error(`The filename '${name}' is too long`)

	process.stdout.write(chalk`{gray.bold snipping...}\r`)

	const response = await fetch(`${ORIGIN}/snips`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ name, text: await getText(path) })
	})

	const text = await response.text()
	if (response.status !== 200) throw new Error(text)

	await clipboard.write(text)
	return text
}

export default getLink