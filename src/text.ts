import { readFile } from 'fs'
import { resolve } from 'path'

import { TEXT_MAX_LENGTH } from './constants'

const getText = async (path: string) => {
	path = resolve(path)

	try {
		const text = await new Promise<string>((resolve, reject) => {
			readFile(path, 'utf8', (error, text) => {
				error ? reject(error) : resolve(text)
			})
		})

		if (text.length > TEXT_MAX_LENGTH) throw new Error('File is too big')

		return text
	} catch (error) {
		switch (error?.code) {
			case 'ENOENT':
				throw new Error(`'${path}' does not exist`)
			default:
				throw error
		}
	}
}

export default getText
