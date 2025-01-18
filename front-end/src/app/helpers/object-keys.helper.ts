export function getObjectKeys(obj: any): { field: string }[] {
    return Object.keys(obj).map(key => ({ field: key }));
  }