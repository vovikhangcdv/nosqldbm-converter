const convertCollection = require("./convertCollection.js");

module.exports = function convert(data) {
    if (Array.isArray(data)) {
        var arraySchemas = [];
        data.forEach(function (Collection) {
            arraySchemas.push(convertCollection(Collection));
        })
        return arraySchemas;
    }
    if (typeof (data) === "object") {
        return convertCollection(data);
    }
}