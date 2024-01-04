export abstract class Utils {

    static isEmpty(obj: any): boolean {
        return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
    }

}