import { ParkingSlots } from './types'
import { getFirstEmptyElementInArray, getParkingLotPrefix } from './utils'

export default class EntryHandler {
  static handleEntry = async (
    carParkingSlots: ParkingSlots[],
    motorcycleParkingSlots: ParkingSlots[],
    type: string,
    vehicleNumber: string,
    timestamp: number
  ) => {
    type = type?.toLowerCase()
    const updatedSlots = await EntryHandler.checkAndPark(carParkingSlots, motorcycleParkingSlots, type, vehicleNumber, timestamp)
    return updatedSlots
  }

  static checkAndPark = async (
    carParkingSlots: ParkingSlots[],
    motorcycleParkingSlots: ParkingSlots[],
    type: string,
    vehicleNumber: string,
    timestamp: number
  ) => {
    switch (type) {
      case 'car':
        let carParkingRes = {
          carParkingSlots,
          motorcycleParkingSlots
        }
        const minAvailableCarSlot = await EntryHandler.getMinAvailableSlot(carParkingSlots)
        if (minAvailableCarSlot >= 0) {
          const updatedParkingSlots = await EntryHandler.enter(minAvailableCarSlot, carParkingSlots, vehicleNumber, timestamp, type)
          carParkingRes.carParkingSlots = updatedParkingSlots
        } else {
          await EntryHandler.handleParkingFailure()
        }
        return carParkingRes
        break
      case 'motorcycle':
        let motorcycleParkingRes = {
          carParkingSlots,
          motorcycleParkingSlots
        }
        const minAvailableMotorcycleSlot = await EntryHandler.getMinAvailableSlot(motorcycleParkingSlots)
        if (minAvailableMotorcycleSlot >= 0) {
          const updatedMotorcycleParkingSlots = await EntryHandler.enter(minAvailableMotorcycleSlot, motorcycleParkingSlots, vehicleNumber, timestamp, type)
          motorcycleParkingRes.motorcycleParkingSlots = updatedMotorcycleParkingSlots
        } else {
          await EntryHandler.handleParkingFailure()
        }
        return motorcycleParkingRes
        break
      default:
        throw new Error(`Invalid vehicle type: ${type}`)
    }
  }

  static getMinAvailableSlot = (parkingSlots: ParkingSlots[]) => {
    return getFirstEmptyElementInArray(parkingSlots)
  }

  static enter = async (slotIndex: number, parkingSlots: ParkingSlots[], vehicleNumber: string, timestamp: number, type: string) => {
    // insert vehicle details in array
    parkingSlots[slotIndex] = {}
    parkingSlots[slotIndex][vehicleNumber] = timestamp
    await EntryHandler.handleParkingSuccess(type, slotIndex)
    return parkingSlots
  }

  static handleParkingSuccess = (type: string, parkingSlotIndex: number) => {
    console.log(`Accept ${getParkingLotPrefix(type)}${parkingSlotIndex + 1}`)
  }

  static handleParkingFailure = () => {
    console.log('Reject')
  }
}
