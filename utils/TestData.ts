import data from "../testdata/testData.json";

export class TestData {

    static getValidLoginData() {
        return data.validLogin;
    }

    static getInvalidLoginData() {
        return data.invalidLogin;
    }
    static getValidFormText() {
        return data.validFormData;
    }
}