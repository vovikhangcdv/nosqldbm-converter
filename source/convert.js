const convertElement = require("./convertElement.js");

module.exports = function convert(data) {
    if (Array.isArray(data)) {
        var arraySchemas = [];
        data.forEach(function (element) {
            arraySchemas.push(convertElement(element));
        })
        return arraySchemas;
    }
    if (typeof (data) === "object") {
        return convertElement(data);
    }
}