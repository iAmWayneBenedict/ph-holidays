const getDates = require("../model/getDatesModel")

const getYear = (year) => {
    let dates = getDates(year)

    dates = dates.filter((date) => date);

    return dates.filter((date) => {
        let dateObj = new Date(date.date)
        if (dateObj.getFullYear() === parseInt(year)) return date
        return true
    })
}

const getMonth = (year, month) => {
    let dates = getDates(year)

    dates = dates.filter((date) => date);

    return dates.filter((date) => {
        let dateObj = new Date(date.date)
        if (dateObj.getMonth()+1 === parseInt(month)) return date
    })
}

const isHolidayToday = () => {
    let date = new Date()
    let dates = getDates(date.getFullYear())
    dates = dates.filter((date) => date);
    let result = dates.find((d) => {
        let newDate = new Date(d.date)
        return (date.getDate() === newDate.getDate() && date.getMonth() === newDate.getMonth())
    })

    if (result) return {today: new Date(result.date).toDateString(), message: "Today is " + result.type, data: result}
    else return {today: new Date().toDateString(), message: "Today is not Holiday", data: ""}
//    return result
}
module.exports = {
    getYear,
    getMonth,
    isHolidayToday
}