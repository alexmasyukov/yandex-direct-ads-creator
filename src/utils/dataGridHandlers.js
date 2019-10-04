import React from "react"
// str.includes(s) – проверяет, включает ли одна строка в себя другую, возвращает true/false.
// str.endsWith(s) – возвращает true, если строка str заканчивается подстрокой s.
// str.startsWith(s) – возвращает true, если строка str начинается со строки s.
// str.repeat(times) – повторяет строку str times раз
const initMaxLength = 33

export const deleteNeedless = (maxLength = initMaxLength, needless = []) =>
  (value = '', prevCellValue = '') => {
    // console.log(value, prevCellValue);
    if (prevCellValue.length < maxLength) return prevCellValue

    let newValue = prevCellValue.slice(0, maxLength)
    // Если следующий после обрезки символ в исходнике не пробел,
    // значит мы обрезали слово, удаляем его остатки
    if (prevCellValue[newValue.length] !== ' ')
      newValue = newValue.slice(0, newValue.lastIndexOf(' '))
    // console.log(newValue, '*' + prevCellValue[newValue.length] + '*', newValue.lastIndexOf(' '))

    const lastWord = newValue.split(' ').pop()
    for (let word of needless) {
      if (word.trim() === lastWord) {
        newValue = newValue.slice(0, newValue.lastIndexOf(' '))
        return newValue
      }
    }

    return newValue
  }


export const addNeedless = (maxLength = initMaxLength, needless = []) =>
  (value = '', prevCellValue = '') => {
    const length = prevCellValue.length
    // if (length >= maxLength) return prevCellValue

    // console.log(prevCellValue);
    for (let word of needless) {
      if (word.length + length <= maxLength) {
        prevCellValue += word
        break
      }
    }

    return prevCellValue
  }


export const highlightMaxLength = (maxLength = initMaxLength) => (value = '') => {
  if (value && value.length > maxLength) {
    // return `${value.slice(0, maxLength)}|${value.slice(maxLength)}|`
    return (
      <>
        {value.slice(0, maxLength)}
        <span style={{ background: '#ffebeb', color: 'red' }}>{value.slice(maxLength)}</span>
      </>
    )
  }
  return value
}