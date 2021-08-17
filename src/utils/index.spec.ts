import { getFirstEmptyElementInArray, findInArray, getParkingLotPrefix } from './index'

describe('utils', () => {
  describe('getFirstEmptyElementInArray', () => {
    it('returns first element in empty array', async () => {
      const testArray = new Array(4)
      const emptyIndex = getFirstEmptyElementInArray(testArray)
      expect(emptyIndex).toEqual(0)
    })
    it('returns first empty element in non-empty array', async () => {
      const testArray = new Array(1, 2, undefined, 4)
      const emptyIndex = getFirstEmptyElementInArray(testArray)
      expect(emptyIndex).toBeTruthy()
      expect(emptyIndex).toEqual(2)
    })
    it('returns -1 in non-empty array', async () => {
      const testArray = new Array(1, 2, 3, 4)
      const emptyIndex = getFirstEmptyElementInArray(testArray)
      expect(emptyIndex).toBeTruthy()
      expect(emptyIndex).toEqual(-1)
    })
  })

  describe('findInArray', () => {
    it('returns index of element in array', async () => {
      const testArray = new Array({ key1: 'val1' }, { key2: 'val2' })
      const elementIndex = findInArray(testArray, 'key1')
      expect(elementIndex).toEqual(0)
    })
    it('returns -1 if element not found in array', async () => {
      const testArray = new Array({ key1: 'val1' }, { key2: 'val2' })
      const elementIndex = findInArray(testArray, 'key3')
      expect(elementIndex).toEqual(-1)
    })
  })

  describe('getParkingLotPrefix', () => {
    it('returns prefix for type car', async () => {
      const prefix = getParkingLotPrefix('car')
      expect(prefix).toBeTruthy()
      expect(prefix).toEqual('CarLot')
    })
    it('returns prefix for type motorcycle', async () => {
      const prefix = getParkingLotPrefix('motorcycle')
      expect(prefix).toBeTruthy()
      expect(prefix).toEqual('MotorcycleLot')
    })
  })
})
