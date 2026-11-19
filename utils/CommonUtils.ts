export class CommonUtils {

    static async wait(milliseconds: number) {
        await new Promise(resolve =>
            setTimeout(resolve, milliseconds)
        );
    }
    static generateRandomEmail() {
        const randomNumber = Math.floor(
            Math.random() * 100000
        );
        return `testuser${randomNumber}@gmail.com`;
    }
}