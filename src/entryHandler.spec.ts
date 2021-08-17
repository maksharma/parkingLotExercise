import EntryHandler from './entryhandler'
import Entryhandler from './entryhandler'
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

describe('entryHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })
  describe('handleEntry', () => {
    it('checks and parks a car', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.handleEntry(testArray, [], 'car', 'testCar', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(updatedSlots.carParkingSlots).toBeTruthy()
      expect(updatedSlots.carParkingSlots[1]).toEqual({ testCar: timestamp })
    })
    it('checks and parks a motorcycle', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.handleEntry([], testArray, 'motorcycle', 'testMotorcycle', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(updatedSlots.motorcycleParkingSlots).toBeTruthy()
      expect(updatedSlots.motorcycleParkingSlots[1]).toEqual({ testMotorcycle: timestamp })
    })
    it('throws error for invalid vehicle type', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      try {
        await EntryHandler.checkAndPark([], testArray, 'newVehicle', 'testNewVehicle', timestamp)
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toEqual('Invalid vehicle type: newVehicle')
      }
    })
    it('fails parking if slots are full', async () => {
      const testArray = new Array(...generateTestArray(3))
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.checkAndPark([], testArray, 'motorcycle', 'testMotorcycle', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('Reject')
    })
  })
  describe('checkAndPark', () => {
    it('checks and parks a car', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.checkAndPark(testArray, [], 'car', 'testCar', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(updatedSlots.carParkingSlots).toBeTruthy()
      expect(updatedSlots.carParkingSlots[1]).toEqual({ testCar: timestamp })
    })
    it('checks and parks a motorcycle', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.checkAndPark([], testArray, 'motorcycle', 'testMotorcycle', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(updatedSlots.motorcycleParkingSlots).toBeTruthy()
      expect(updatedSlots.motorcycleParkingSlots[1]).toEqual({ testMotorcycle: timestamp })
    })
    it('throws error for invalid vehicle type', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const timestamp = generateCurrTimestamp()
      try {
        await EntryHandler.checkAndPark([], testArray, 'newVehicle', 'testNewVehicle', timestamp)
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toEqual('Invalid vehicle type: newVehicle')
      }
    })
    it('fails parking if slots are full', async () => {
      const testArray = new Array(...generateTestArray(3))
      const timestamp = generateCurrTimestamp()
      const updatedSlots = await EntryHandler.checkAndPark([], testArray, 'motorcycle', 'testMotorcycle', timestamp)
      expect(updatedSlots).toBeTruthy()
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('Reject')
    })
  })
  describe('getMinAvailableSlot', () => {
    it('returns first slot for empty parking', async () => {
      const testArray = new Array(...generateTestArray(2))
      delete (testArray[0])
      delete (testArray[1])
      const emptyIndex = EntryHandler.getMinAvailableSlot(testArray)
      expect(emptyIndex).toEqual(0)
    })
    it('returns first empty element in non-empty parking', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[1])
      const emptyIndex = EntryHandler.getMinAvailableSlot(testArray)
      expect(emptyIndex).toBeTruthy()
      expect(emptyIndex).toEqual(1)
    })
    it('returns -1 in non-empty array', async () => {
      const testArray = new Array(...generateTestArray(3))
      const emptyIndex = EntryHandler.getMinAvailableSlot(testArray)
      expect(emptyIndex).toBeTruthy()
      expect(emptyIndex).toEqual(-1)
    })
  })
  describe('enter', () => {
    it('successfully parks a car', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[2])
      const timestamp = generateCurrTimestamp()
      const parkingSlots = await Entryhandler.enter(2, testArray, 'testCar', timestamp, 'car')
      expect(parkingSlots).toBeTruthy()
      expect(parkingSlots[2]).toEqual({ 'testCar': timestamp })
    })
    it('successfully parks a motorcycle', async () => {
      const testArray = new Array(...generateTestArray(3))
      delete (testArray[2])
      const timestamp = generateCurrTimestamp()
      const parkingSlots = await Entryhandler.enter(2, testArray, 'testMotorcycle', timestamp, 'motorcycle')
      expect(parkingSlots).toBeTruthy()
      expect(parkingSlots[2]).toEqual({ 'testMotorcycle': timestamp })
    })
  })
  describe('handleParkingSuccess', () => {
    it('prints success message for car parking', async () => {
      Entryhandler.handleParkingSuccess('car', 4)
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('Accept CarLot5')
    })
    it('prints success message for motorcycle parking', async () => {
      Entryhandler.handleParkingSuccess('motorcycle', 4)
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('Accept MotorcycleLot5')
    })
  })
  describe('handleParkingFailure', () => {
    it('prints reject message for parking failure', async () => {
      Entryhandler.handleParkingFailure()
      expect(logSpy).toBeCalledTimes(1)
      expect(logSpy).toBeCalledWith('Reject')
    })
  })
})
