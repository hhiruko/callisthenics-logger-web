export function getCurrentDate(separator='/'){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${day<10?`0${day}`:`${day}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}