export const normalized = (arr) => {
  const normalize = {}
  const keys = Object.keys(arr[0])

  keys.forEach(key => normalize[key] = [])

  arr.forEach(item =>
    keys.forEach(key =>
      normalize[key].push(item[key])
    )
  )

  return normalize
}

export const firstToUpperCase = text => text[0].toUpperCase() + text.slice(1)