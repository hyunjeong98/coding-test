function binarySearch(arr, target, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2)
    if (target === arr[mid]) return mid
    else if (target < arr[mid]) end = mid - 1
    else start = mid + 1
  }
  return -1
}