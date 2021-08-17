import { ParkingLotManager } from './index'

describe('ParkingLotManager', () => {
  let parkingLotManager

  beforeAll(() => {
    parkingLotManager = new ParkingLotManager()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.resetModules()
  })

  describe('processLineByLine', () => {
    it('processes a normal input parking file successfully', async () => {
      parkingLotManager = new ParkingLotManager()
      try {
        await parkingLotManager.processLineByLine('input.txt')
      } catch (err) {
        expect(err).toBeFalsy()
      }
    })
    it('processes an input parking file with blank lines successfully', async () => {
      parkingLotManager = new ParkingLotManager()
      try {
        await parkingLotManager.processLineByLine(`${__dirname}/testHelper/withBlankLines.txt`)
      } catch (err) {
        expect(err).toBeFalsy()
      }
    })
    it('throws error while processing a random file', async () => {
      parkingLotManager = new ParkingLotManager()
      try {
        await parkingLotManager.processLineByLine(`${__dirname}/testHelper/randomText.txt`)
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toEqual('Invalid action: random')
      }
    })
  })

  describe('validateAction', () => {
    it('validates that enter and are allowed actions', async () => {
      try {
        await parkingLotManager.validateAction('enter')
        await parkingLotManager.validateAction('exit')
      } catch (err) {
        expect(err).toBeFalsy()
      }
    })
    it('throws error if invalid actions are invoked', async () => {
      try {
        await parkingLotManager.validateAction('invalid')
      } catch (err) {
        expect(err).toBeTruthy()
        expect(err.message).toEqual('Invalid action: invalid')
      }
    })
  })
})
