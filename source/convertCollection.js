const convertType = require('./convertType.js');

module.exports = function convertElement(obj) {
    var collection = {};
    if (obj["fields"]) {
        obj["fields"].forEach(function (field) {
            if (field["name"] == "_id") return;
            collection[field["name"]] = {
                "type": convertType(field["type"]),
                "required": Boolean(field["required"]),
                "unique": Boolean(field["unique"]),
                "default" : field["defaultValue"],
            }
        })
    }
    return { [obj["name"]]: collection };
}