function showMatrix(matrix, i = 0, j = 0) {
  if (!Array.isArray(matrix)) {
    return false;
  }
  console.log(matrix[i][j]);
  if (i == (matrix.length - 1)) {
    if (j == (matrix[0].length - 1)) {
      return false;
    }
  }
  if (j == (matrix[0].length - 1)) {
    console.log("\n");
    j = 0;
    i++;
  } else {
    j++;
  }
  return showMatrix(matrix, i, j);
}

let matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
showMatrix(matrix, 0, 0);