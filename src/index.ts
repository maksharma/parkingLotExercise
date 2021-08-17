import EntryHandler from './entryHandler'
import ExitHandler from './exitHandler'

import fs from 'fs'
import readline from 'readline'
import { ParkingSlots } from './types'

export class ParkingLotManager {
  private readonly ALLOWED_ACTIONS = ['enter', 'exit']
  private maxCarSlots: number = 0 // max car parking slots available
  private maxMotorcycleSlots: number = 0 // max motorcycle parking slots available
  private carParkingSlots: ParkingSlots[] = [] // stores info about parked cars
  private motorcycleParkingSlots: ParkingSlots[] = [] // stores info about parked motorcycles
  private isInitDone: boolean = false // validates init for only first non-empty line of input file

  initParkingSlots = (carSlots: number, motorcycleSlots: number) => {
    // set default as 0 for invalid entries
    this.maxCarSlots = Number(carSlots) || 0
    this.maxMotorcycleSlots = Number(motorcycleSlots) || 0
    this.carParkingSlots = new Array(this.maxCarSlots)
    this.motorcycleParkingSlots = new Array(this.maxMotorcycleSlots)
    this.isInitDone = true
  }

  manageParkingLot = async (path: string) => {
    try {
      await this.processLineByLine(path)
    } catch (err) {
      console.error(`Caught err in execution:${err}`)
    }
  }

  processLineByLine = async (path: string) => {
    const fileStream = fs.createReadStream(path);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
      // The crlfDelay option to recognize all instances of CR LF
      // ('\r\n') in input.txt as a single line break in readline lib.
    });

    for await (const line of rl) {
      // Each line in input.txt will be successively available here as `line`.
      if (line === '') {
        // ignore empty line input
        continue
      }
      const lineElements = line?.split(' ')
      if (!this.isInitDone) {
        // initialise parking slots using first line
        await this.initParkingSlots(Number(lineElements[0]), Number(lineElements[1]))
        continue
      }
      const action = lineElements[0]?.toLowerCase()
      await this.validateAction(action)
      switch (action) {
        case 'enter':
          const updatedParkingSlotsOnEntry = await EntryHandler.handleEntry(
            this.carParkingSlots, this.motorcycleParkingSlots, lineElements[1], lineElements[2], Number(lineElements[3])
          )
          await this.updateParkingSlotInfo(updatedParkingSlotsOnEntry)
          break
        case 'exit':
          await ExitHandler.handleExit(
            this.carParkingSlots, this.motorcycleParkingSlots, lineElements[1], Number(lineElements[2])
          )
          break
      }
    }
  }

  updateParkingSlotInfo = (updatedParkingSlots: any) => {
    this.carParkingSlots = updatedParkingSlots?.carParkingSlots
    this.motorcycleParkingSlots = updatedParkingSlots?.motorcycleParkingSlots
  }

  validateAction = (action: string) => {
    if (this.ALLOWED_ACTIONS.indexOf(action) === -1) {
      throw new Error(`Invalid action: ${action}`)
    }
    return
  }
}

const parkingLotManager = new ParkingLotManager()
parkingLotManager.manageParkingLot(process.env.INPUT_FILE_PATH || 'input.txt')