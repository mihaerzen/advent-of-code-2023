const races: Array<[time: number, distance: number]> = [
  [61709066, 643118413621041],
]

function waysToBeatRecord(time: number, distance: number) {
  let ways = 0

  for (let holdTime = 1; holdTime < time; holdTime++) {
    const travelTime = time - holdTime
    const traveledDistance = holdTime * travelTime
    if (traveledDistance > distance) {
      ways++
    }
  }

  return ways
}

console.log(
  races.reduce((product, race) => product * waysToBeatRecord(...race), 1)
)
// 35150181
