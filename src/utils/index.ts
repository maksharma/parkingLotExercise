export const getFirstEmptyElementInArray = (arr: any[]) => {
  let firstEmpty = -1
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      firstEmpty = i
      break
    }
  }
  return firstEmpty
}

export const findInArray = (arr: any[], key: string) => {
  // find the index of first element with given key (vehicle number) in array
  return arr.findIndex((ele) => { return ele && ele[key] })
}

export const getParkingLotPrefix = (type) => {
  return type == 'car' ? 'CarLot' : 'MotorcycleLot'
}