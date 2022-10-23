export const getReadableDate = (time) => {
  let timestamp = new Date(time * 1000)
  let hours = timestamp.getHours()
  let minutes = timestamp.getMinutes()
  let day = timestamp.getDate()
  let month = timestamp.getMonth() + 1
  let dateString = `${hours < 10 ? `0${hours}` : `${hours}`}:${
    minutes < 10 ? `0${minutes}` : `${minutes}`
  } ${day < 10 ? `0${day}` : `${day}`}.${
    month < 10 ? `0${month}` : `${month}`
  }.${timestamp.getFullYear()}`
  return dateString
}
