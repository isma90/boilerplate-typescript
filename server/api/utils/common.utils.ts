export class CommonUtils {
  public static isJson(item: any) {
    try {
      item = typeof item !== 'string' ? JSON.stringify(item) : item;
      item = JSON.parse(item);
    } catch (e) {
      return false;
    }
    return typeof item === 'object' && item !== null;
  }
}
