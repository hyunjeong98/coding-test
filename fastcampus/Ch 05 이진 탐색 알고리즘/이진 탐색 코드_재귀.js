function binarySearch(arr, target, start, end) {
  if (start > end) return -1

  let mid = Math.floor((start + end) / 2)

  if (target === arr[mid]) return mid
  else if (target < arr[mid]) return binarySearch(arr, target, start, mid - 1)
  else return binarySearch(arr, target, mid + 1, end)
}