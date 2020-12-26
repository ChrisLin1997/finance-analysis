export const getOpenDay = () => {
  const time = new Date()
  const year = time.getFullYear().toString()
  const month = time.getMonth() + 1 < 10 ? '0' + time.getMonth() + 1 : (time.getMonth() + 1).toString()
  const day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate().toString()
  return year + month + day
}

export function ObjectDeepAssign(target, source) {
  if (isObject(target) && isObject(source)) {
    for (const property in source) {
      if (isObject(source[property])) {
        if (!target[property]) Object.assign(target, { [property]: {} });
        ObjectDeepAssign(target[property], source[property]);
      } else {
        Object.assign(target, { [property]: source[property] });
      }
    }
  }

  return target

  function isObject(item) {
    return (item && Object.prototype.toString.call(item)  === '[object Object]');
  }
}