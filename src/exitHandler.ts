import { ParkingSlots } from './types'
import { findInArray, getParkingLotPrefix } from './utils'

export default class ExitHandler {
  private static readonly PARKING_FEE = {
    car: 2,
    motorcycle: 1
  }

  static handleExit = async (
    ParkingSlots: ParkingSlots[],
    motorcycleParkingSlots: ParkingSlots[],
    vehicleNumber: string,
    timestamp: number
  ) => {
    await ExitHandler.checkAndExit(ParkingSlots, motorcycleParkingSlots, vehicleNumber, timestamp)
  }

  static checkAndExit = (
    ParkingSlots: ParkingSlots[],
    motorcycleParkingSlots: ParkingSlots[],
    vehicleNumber: string,
    timestamp: number
  ) => {
    const carSlotIndex = ExitHandler.getSlotIndex(ParkingSlots, vehicleNumber)
    const motorcycleSlotIndex = ExitHandler.getSlotIndex(motorcycleParkingSlots, vehicleNumber)
    if (carSlotIndex >= 0) {
      // found the car
      // calculate fee and delete from car array
      const carParkingFee =
        ExitHandler.calculateParkingFee(ParkingSlots[carSlotIndex][vehicleNumber], timestamp, 'car')
      ExitHandler.handleExitSuccess(carSlotIndex, carParkingFee, 'car')
      delete (ParkingSlots[carSlotIndex])
    } else if (motorcycleSlotIndex >= 0) {
      // found the motorcyle
      // calculate fee and delete from motorcycle array
      const motorcycleParkingFee =
        ExitHandler.calculateParkingFee(motorcycleParkingSlots[motorcycleSlotIndex][vehicleNumber], timestamp, 'motorcycle')
      ExitHandler.handleExitSuccess(motorcycleSlotIndex, motorcycleParkingFee, 'motorcycle')
      delete (motorcycleParkingSlots[motorcycleSlotIndex])
    }
  }

  static calculateParkingFee = (entryTimestamp: number, exitTimestamp: number, type: string) => {
    // timestamps are in seconds
    // round up to nearest hour for calculating fee
    const timeDiffInHours = (exitTimestamp - entryTimestamp) / (60 * 60)
    return Math.ceil(timeDiffInHours) * ExitHandler.PARKING_FEE[type]
  }

  static handleExitSuccess = (parkingSlotIndex: number, parkingFee: number, type: string) => {
    console.log(`${getParkingLotPrefix(type)}${parkingSlotIndex + 1} ${parkingFee}`)
  }

  static getSlotIndex = (parkingSlots: ParkingSlots[], vehicleNumber: string) => {
    const slotIndex = findInArray(parkingSlots, vehicleNumber)
    return slotIndex
  }
}