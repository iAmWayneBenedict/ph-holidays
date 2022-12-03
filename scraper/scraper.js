const cheerio = require("cheerio")
const axios = require("axios")
const scraper = async () => {
    const response = await axios.get(
            `https://en.wikipedia.org/wiki/Public_holidays_in_the_Philippines`
            );
    const $ = cheerio.load(response.data);
    let regularHolidays = $("table.wikitable.plainrowheaders:eq(0)");
    let workingHolidays = $("table.wikitable.plainrowheaders:eq(1)");
    let localObservance = $("table.wikitable.plainrowheaders:eq(2)");

    return [
            ...getRegularHoliday(regularHolidays, $),
            ...getWorkingHolidays(workingHolidays, $),
            ...getLocalObservance(localObservance, $)
            ]
}

function getLocalObservance(localObservance, $) {
    let tempArr = []
    localObservance.find("tbody tr").each(function(i, el) {
        let data = {
            date: "",
            en_name: "",
            fil_name: "",
            trans: "",
            type: "",
            description: ""
        }
        if (i === 0) return

        let firstEl;
        let self = $(this)
        $(this).children().each(function(i, el) {
            if (i === 0) firstEl = $(this)

            let strippedText = $(this).text().replaceAll(/(\[.*?\])|(\n)/g, '');
            if (firstEl.prop("tagName") === "TH" && self.children().length === 4) {
                if(i === 0) data.date = strippedText
                if(i === 1) data.en_name = strippedText
                if(i === 2) data.fil_name = strippedText
                if(i === 3) {
                    data.description = strippedText
                    data.type = "Locally Observed Holiday"
                }
            } else if(firstEl.prop("tagName") === "TH" && self.children().length === 3) {
                if(i === 0) data.date = strippedText
                if(i === 1) data.fil_name = strippedText
                if(i === 2) {
                    data.description = strippedText
                    data.type = "Locally Observed Holiday"
                }
            } else {
                if(i === 0) data.en_name = strippedText
                if(i === 1) data.fil_name = strippedText
                if(i === 2) {
                    data.description = strippedText
                    data.type = "Locally Observed Holiday"
                }
            }
        })
        tempArr.push(data)
    })
    return tempArr
}

function getWorkingHolidays(workingHolidays, $) {
    let tempArr = []
    workingHolidays.find("tbody tr").each(function(i, el) {
        let data = {
            date: "",
            en_name: "",
            fil_name: "",
            trans: "",
            type: "",
            description: ""
        }
        if (i === 0) return
        if ($(this).children().length < 2) return

        $(this).children().each(function(i, el) {
            let strippedText = $(this).text().replaceAll(/(\[.*?\])|(\n)/g, '');
            if (i === 0) data.date = strippedText
            else if (i === 1) data.en_name = strippedText
            else if (i === 2) data.fil_name = strippedText
            else if (i === 3) data.trans = strippedText
            else if (i === 4) data.description = strippedText
            data.type = "Working Holiday"

        })
        tempArr.push(data)
    })

    return tempArr
}

function getRegularHoliday(regularHolidays, $) {
    let tempArr = []
    regularHolidays.find("tbody tr").each(function(i, el) {
        let data = {
            date: "",
            en_name: "",
            fil_name: "",
            trans: "",
            type: "",
            description: ""
        }
        if (i === 0) return
        $(this).children().each(function(i, el) {
            let strippedText = $(this).text().replaceAll(/(\[.*?\])|(\n)/g, '');
            if (i === 0) data.date = strippedText
            else if (i === 1) data.en_name = strippedText
            else if (i === 2) data.fil_name = strippedText
            else if (i === 3) data.trans = strippedText
            else if (i === 4) data.type = strippedText
            else if (i === 5) data.description = strippedText

        })
        tempArr.push(data)
    })

    return tempArr
}

module.exports = scraper