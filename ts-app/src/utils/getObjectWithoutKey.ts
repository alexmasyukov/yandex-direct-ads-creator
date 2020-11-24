export function getObjectWithoutKey<T, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: omitted, ...rest } = obj
  return rest
}

// todo: MOVE TO TEST

// interface With {
//   id: number
//   len: number
// }

// const a = { id: 1, text: 'sdf', len: 10 }
// const b: With = getObjectWithoutKey(a, 'text')
// console.log(b)
