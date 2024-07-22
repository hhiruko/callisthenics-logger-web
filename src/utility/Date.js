export function getCurrentDate(separator='/'){
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${day<10?`0${day}`:`${day}`}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
}

export function parseDate(date) {
    let parts = date.split('/')

    let day = parseInt(parts[0], 10)
    let month = parseInt(parts[1], 10) - 1
    let year = parseInt(parts[2], 10)

    return new Date(year, month, day)
}