import fetch from 'node-fetch'
import clipboard from 'clipboardy'
import chalk from 'chalk'

import getName from './name'
import getText from './text'
import { ORIGIN } from './constants'

const getLink = async (
	path: string,
	name: string | undefined,
	isPublic: boolean
) => {
	name = getName(name || path)

	process.stdout.write(chalk`{gray.bold snipping...}\r`)

	const response = await fetch(`${ORIGIN}/snips`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({
			name,
			text: await getText(path),
			public: isPublic
		})
	})

	if (response.status !== 200) throw new Error(await response.text())

	const link = `${ORIGIN}/${await response.text()}`
	await clipboard.write(link)

	return link
}

export default getLink
