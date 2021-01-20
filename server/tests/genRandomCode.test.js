import {genRandomCode} from '../helpers/genRandomCode.js'

test('generate random sequense', () => {
    const firstCode = genRandomCode()
    const secondCode = genRandomCode()
    expect(secondCode).not.toBe(firstCode)
    expect(secondCode.length).toBe(4)
});