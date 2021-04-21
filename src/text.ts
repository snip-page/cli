import { readFile } from 'fs'
import { resolve } from 'path'

const getText = async (path: string) => {
	path = resolve(path)

	try {
		return await new Promise((resolve, reject) => {
			readFile(path, 'utf8', (error, text) => {
				error ? reject(error) : resolve(text)
			})
		})
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
