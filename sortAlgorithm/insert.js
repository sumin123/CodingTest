function insertSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    const insertVal = arr[i];
    let insertPos = i;
    for(let j = 0; j < i; j++) {
      if (arr[j] >= insertVal) continue;
      else {
        insertPos = j;
        break;
      }
    }
    for (let j = i; j > insertPos; j--) {
      arr[j] = arr[j-1];
    }
    arr[insertPos] = insertVal;
  }
  return arr;
}

console.log(insertSort([1,4,53,26,3,6]));