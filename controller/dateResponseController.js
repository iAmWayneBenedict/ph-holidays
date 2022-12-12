const getDates = require("../model/getDatesModel")

const getYear = (year) => {
    let dates = getDates(year)
    if (dates === 422)
        return {
            status: "error",
            statusCode: 422,
            message: "Invalid year"
        }

    dates = dates.filter((date) => date);

    return foundResponse(dates.filter((date) => {
        let dateObj = new Date(date.date)
        if (dateObj.getFullYear() === parseInt(year)) return date
        return true
    }))
}

const getMonth = (year, month) => {
    let dates = getDates(year)

    dates = dates.filter((date) => date);

    return foundResponse(dates.filter((date) => {
        let dateObj = new Date(date.date)
        if (dateObj.getMonth() + 1 === parseInt(month)) return date
    }))
}

const isHolidayToday = () => {
    return isHoliday(new Date())
}

const isHoliday = (date) => {
    date = new Date(date)
    let dates = getDates(date.getFullYear())
    dates = dates.filter((date) => date);
    let result = dates.find((d) => {
        let newDate = new Date(d.date)
        return (date.getDate() === newDate.getDate() && date.getMonth() === newDate.getMonth())
    })

    if (result) return {
        status: "found",
        statusCode: 200,
        today: new Date(result.date).toDateString(),
        message: "Today is " + result.type,
        data: result
    }

    return {
        status: "found",
        statusCode: 200,
        today: new Date().toDateString(),
        message: "Today is not Holiday",
        data: []
    }
}

const notFoundResponse = () => ({
    status: "not found",
    statusCode: 404,
    message: "Hello stranger, your request is nowhere to be found!"
});

const foundResponse = (data) => ({
    status: "found",
    statusCode: 200,
    message: "Your request is found!",
    data
})

const searchQuery = (query, year = false) => {
    if (!query) return notFoundResponse();

    let d = new Date();
    let dates = getDates(year || d.getFullYear())
    dates = dates.filter((date) => date);
    let data = dates.filter((date) => date.description.toLowerCase().includes(query.toLowerCase()))

    if (data.length === 0) return notFoundResponse();
    return foundResponse(data);
}



module.exports = {
    getYear,
    getMonth,
    isHolidayToday,
    isHoliday,
    searchQuery
}