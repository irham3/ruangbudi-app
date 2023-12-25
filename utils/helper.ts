export function getStudentLevel(studentClass: number) {
  if (studentClass >= 1 && studentClass <= 6)
    return 'SD'
  else if (studentClass >= 7 && studentClass <= 9)
    return 'SMP'
  else
    return 'SMA'
}
