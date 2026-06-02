function lowerBound(arr, target, start, end) {
  while (start < end) {
    let mid = Math.floor((start + end) / 2)
    if (target <= arr[mid]) end = mid
    else start = mid + 1
  }
  return end
}

function upperBound(arr, target, start, end) {
  while (start < end) {
    let mid = Math.floor((start + end) / 2)
    if (target < arr[mid]) end = mid
    else start = mid + 1 // start를 최대한 오른쪽으로 이동
  }
  return end
}

// 정렬된 배열에서 특정 범위에 속하는 원소 개수 구하기
function countByRange(arr, leftValue, rightValue) {
  const rightIdx = upperBound(arr, rightValue, 0, arr.length)
  const leftIdx = lowerBound(arr, leftValue, 0, arr.length)
  return rightIdx - leftIdx
}