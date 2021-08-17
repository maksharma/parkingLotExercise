import Exithandler from './exitHandler'
import { ParkingSlots } from './types'


const generateTestArray = (length) => {
  const testArray = new Array(length)
  for (let i = 0; i < length; i++) {
    const obj: ParkingSlots = {}
    const key = `vehicle${i}`
    obj[key] = Math.floor(new Date().getTime() / 1000)
    testArray[i] = obj
  }
  return testArray
}

const generateCurrTimestamp = () => {
  return Math.floor(new Date().getTime() / 1000)
}

const logSpy = jest.spyOn(console, 'log')

describe('exitHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })
  describe('handleExit', () => {
    it('deletes car from array and deducts parking fee', async () => {
      const testArray = new Array(...generateTestArray(3))
      await Exithandler.handleExit(testArray, [], 'vehicle2', generateCurrTimestamp())
      expect(testArray[2]).toBeFalsy()
    })
    it('deletes motorcycle from array and deducts parking fee', async () => {
      const testArray = new Array(...generateTestArray(2))
      await Exithandler.handleExit([], testArray, 'vehicle2', generateCurrTimestamp())
      expect(testArray[2]).toBeFalsy()
    })
  })
  describe('checkAndExit', () => {
    it('deletes car from array and deducts parking fee', async () => {
      const testArray = new Array(...generateTestArray(3))
      Exithandler.checkAndExit(testArray, [], 'vehicle2', generateCurrTimestamp())
      expect(testArray[2]).toBeFalsy()
    })
    it('deletes motorcycle from array and deducts parking fee', async () => {
      const testArray = new Array(...generateTestArray(2))
      Exithandler.checkAndExit([], testArray, 'vehicle1', generateCurrTimestamp())
      expect(testArray[1]).toBeFalsy()
    })
  })
  describe('calculateParkingFee', () => {
    it('return parking fee for an hour for car', async () => {
      const fee = Exithandler.calculateParkingFee(1628922404, 1628922405, 'car')
      expect(fee).toEqual(2)
    })
    it('return parking fee for an hour for motorcycle', async () => {
      const fee = Exithandler.calculateParkingFee(1628922404, 1628922405, 'motorcycle')
      expect(fee).toEqual(1)
    })
  })
  describe('handleExitSuccess', () => {
    it('prints exit message for car', async () => {
      Exithandler.handleExitSuccess(1, 6, 'car')
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('CarLot2 6')
    })
    it('prints exit message for motocycle', async () => {
      Exithandler.handleExitSuccess(1, 6, 'motorcycle')
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('MotorcycleLot2 6')
    })
  })
  describe('getSlotIndex', () => {
    it('returns index of the vehicle in the array', async () => {
      const testArray = new Array(...generateTestArray(3))
      const elementIndex = Exithandler.getSlotIndex(testArray, 'vehicle2')
      expect(elementIndex).toBeTruthy()
      expect(elementIndex).toEqual(2)
    })
    it('returns -1 if vehicle not found in the array', async () => {
      const testArray = new Array(...generateTestArray(3))
      const elementIndex = Exithandler.getSlotIndex(testArray, 'vehicle11')
      expect(elementIndex).toBeTruthy()
      expect(elementIndex).toEqual(-1)
    })
  })
})
