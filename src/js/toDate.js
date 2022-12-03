const { convertMonthToName, convertMonthToIndex } = require("../../controller/convertMonth");
const fs = require("fs");

const data = () => {
    let dara = fs.readFileSync("./src/Holiday.json");
    let data = JSON.parse(dara);
    data = data.map((el) => {
        let month = convertMonthToIndex(el.date.split(" ")[0]);
        let day = el.date.split(" ")[1];
        if (month !== -1) {
            el.date = `${month}-${day}`;
            return el;
        }
    });

    return data;
}

const setDate = (data) => {
    try {
        fs.writeFileSync("./src/json/date.json", data);
        return "Success";
    } catch(err) {
        console.log(err)
        return err;
    }
}

module.exports = {
    data, setDate
}