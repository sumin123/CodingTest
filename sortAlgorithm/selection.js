function swap(arr, a, b) {
  let tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

function selectionSort(arr) {
  for(let i = 0; i < arr.length - 1; i++) {
    let min = -1;
    let minIdx = -1;
    for (let j = i; j < arr.length; j++) {
      if(min === -1 || arr[j] < min) {
        min = arr[j];
        minIdx = j;
      }
    }
    swap(arr, i ,minIdx);
  }
  return arr;
}

console.log(selectionSort([1,4,53,26,3,6]));