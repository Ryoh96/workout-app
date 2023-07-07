const transposeMatrix = (matrix: number[][]): number[][] => {
  const rows = matrix.length
  const cols = matrix[0].length

  const transposedMatrix: number[][] = []
  for (let i = 0; i < cols; i++) {
    transposedMatrix[i] = []
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      transposedMatrix[j][i] = matrix[i][j]
    }
  }

  return transposedMatrix
}

export default transposeMatrix
