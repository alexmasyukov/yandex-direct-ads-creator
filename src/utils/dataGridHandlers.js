import React from "react"
// str.includes(s) – проверяет, включает ли одна строка в себя другую, возвращает true/false.
// str.endsWith(s) – возвращает true, если строка str заканчивается подстрокой s.
// str.startsWith(s) – возвращает true, если строка str начинается со строки s.
// str.repeat(times) – повторяет строку str times раз


export const deleteNeedless = (maxLength, endsWords) => (value, prevCellValue) => {
  // console.log(endsWords);
  return prevCellValue.slice(0, maxLength)
  // console.log(prevCellValue);
  // return prevCellValue || ''
}


export const highlightMaxLength = (maxLength) => (value) => {
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