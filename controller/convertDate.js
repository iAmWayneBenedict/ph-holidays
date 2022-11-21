function convertDate(month, days, year) {
    let mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let index = 0; index < mon.length; index++) {
        if (month.toLowerCase() === mon[index].toLowerCase()) {
            let monthIndex = (index + 1).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
            });
            let day = parseInt(days).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
            });
            return `${year}-${monthIndex}-${day}`;
        }
    }
}

module.exports = convertDate;