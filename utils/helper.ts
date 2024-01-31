export function getStudentLevel(studentClass: number) {
  if (studentClass >= 1 && studentClass <= 6)
    return 'SD'
  else if (studentClass >= 7 && studentClass <= 9)
    return 'SMP'
  else
    return 'SMA'
}

export function shuffleArrayOrder(normalArray: []) {
  // Fisher-Yates algorithm
  const shuffledArray = normalArray
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }

  return shuffledArray
}
