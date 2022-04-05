function showMatrixSingleArg(matrix) {
  if (typeof (matrix) === 'number') {
    console.log(matrix);
  } else {
    for (let i = 0; i < matrix.length; i++) {
      showMatrixSingleArg(matrix[i]);
    }
  }
}

function showArray(matrix, cur) {
  if (typeof (matrix) === 'number') {
    console.log(matrix);
    cur++;
    showArray(matrix[cur]);
  }
  else if (cur == (matrix.length - 1)) {
    return false;
  } else {
    showArray(matrix[cur]);
  }
}

// showMatrixSingleArg([[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[10, 11, 12], [13, 14, 15], [16, 17, 18]], [[19, 20, 21], [22, 23, 24], [25, 26, 27]]]);