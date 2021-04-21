import { NAME_MAX_LENGTH } from './constants'

const getName = (path: string) => {
	const name = path.slice(path.lastIndexOf('/') + 1)

	if (!name.length) throw new Error('Invalid filename')

	if (name.length > NAME_MAX_LENGTH)
		throw new Error(`The filename '${name}' is too long`)

	return name
}

export default getName
