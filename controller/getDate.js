const axios = require('axios');
const cheerio = require('cheerio');
const convertDate = require("../controller/convertDate")

//const YEAR = 2026;


async function getDate(req, res) {

    const {year} = req.params
    const jsonFile = {
        year,
        data: [],
    };
    const response = await axios.get(`https://publicholidays.ph/${year}-dates/`);
    const $ = cheerio.load(response.data);

    let counter = 1;
    let date,
    name,
    f = [];
    $(".even, .odd").children(function () {
        let d = $(this).html();
        if (counter === 1) {
            date = convertDate(d.split(" ")[1], d.split(" ")[0], year);
        }
        if (counter === 3) {
            name = $(this).find("a").html();
            f.push({ date, name });
            counter = 0;
        }
        counter++;
    });
    jsonFile.data = f;

    res.send(jsonFile)
}

module.exports = getDate;