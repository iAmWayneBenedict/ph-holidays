const formatter = (number) => {
    return new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(parseInt(number))
}

module.exports = formatter