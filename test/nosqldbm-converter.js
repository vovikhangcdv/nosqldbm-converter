const assert = require('assert')
const convert = require('../source/convert.js');
const convertType = require('../source/convertType.js');
const convertElement = require('../source/convertElement.js');


describe("Convert https://nosqldbm.ru/ JSON data to Moongose Schema.", function () {
    describe("ConvertType", function () {
        it("should return [type, null] if type is not Array or Enum", function () {
            assert.deepEqual(convertType("String"), ["String", null]);
        });
        it("should return [[type], null] if type is Array", function () {
            assert.deepEqual(convertType("Array<String>"), [["String"], null]);
        });
        it("should return [type, enumData] if type is Enum", function () {
            assert.deepEqual(convertType("Enum{a,b,c}"), ["String", ["a", "b", "c"]]);
        });
    });

    describe("ConvertElement", function () {
        it("should ignore _id field", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "_id",
                        "type": "ObjectId",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                ]
            }
            assert.deepEqual(convertElement(input), { User: {} });
        });

        it("should convert correct type, required and unique value", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "email",
                        "type": "String",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false },
                    email: { type: 'String', required: true, unique: true }
                }
            }
            assert.deepEqual(convertElement(input), expect);
        });

        it("should convert correct defaultValue", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "John",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false, default: 'John' },
                }
            }
            assert.deepEqual(convertElement(input), expect);
        });

        it("should convert correct enum value", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "type",
                        "type": "Enum{Public,Private}",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                User: {
                    type: { type: 'String', required: true, unique: true, enum: ['Public', 'Private'] }
                }
            }
            assert.deepEqual(convertElement(input), expect);
        });

        it("should convert correct array value", function () {
            const input = {
                "schemaType": "Collection",
                "name": "Task",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "type",
                        "type": "Array<String>",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "type2",
                        "type": "Array<Array>",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                Task: {
                    type: { type: ['String'], required: true, unique: true },
                    type2: { type: [[]], required: true, unique: true }
                }
            }
            assert.deepEqual(convertElement(input), expect);
        }
        );
    });

    describe("Convert", function () {
        it("should convert correct seperated object", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "email",
                        "type": "String",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false },
                    email: { type: 'String', required: true, unique: true }
                }
            }
            assert.deepEqual(convert(input), expect);
        });

        it("should convert correct array of objects", function () {
            const input = [
                {
                    "schemaType": "Collection",
                    "name": "User",
                    "type": "ObjectId",
                    "required": true,
                    "unique": true,
                    "defaultValue": "",
                    "description": "",
                    "index": 0,
                    "customProps": [],
                    "fields": [
                        {
                            "schemaType": "Field",
                            "name": "name",
                            "type": "String",
                            "required": true,
                            "unique": false,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        },
                        {
                            "schemaType": "Field",
                            "name": "email",
                            "type": "String",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        }
                    ]
                },
                {
                    "schemaType": "Collection",
                    "name": "Task",
                    "type": "ObjectId",
                    "required": true,
                    "unique": true,
                    "defaultValue": "",
                    "description": "",
                    "index": 0,
                    "customProps": [],
                    "fields": [
                        {
                            "schemaType": "Field",
                            "name": "type",
                            "type": "Array<String>",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        },
                        {
                            "schemaType": "Field",
                            "name": "type2",
                            "type": "Array<Array>",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        }
                    ]
                }
            ]
            const expect = [
                {
                    User: {
                        name: { type: 'String', required: true, unique: false },
                        email: { type: 'String', required: true, unique: true }
                    }
                },
                {
                    Task: {
                        type: { type: ['String'], required: true, unique: true },
                        type2: { type: [[]], required: true, unique: true }
                    }
                }
            ]
            assert.deepEqual(convert(input), expect);
        });

    });
});