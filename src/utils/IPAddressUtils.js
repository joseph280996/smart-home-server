export const IPToNumber = (ipv4) => {
  return ipv4.split('.').reduce((ipNum, octet) => {
    // eslint-disable-next-line no-bitwise
    return ((ipNum << 8) + parseInt(octet, 10)) >>> 0
  }, 0)
}

export const NumToIPString = (IPNum) => {
  // eslint-disable-next-line no-bitwise
  return `${IPNum >>> 24}.${(IPNum >> 16) & 255}.${(IPNum >> 8) & 255}.${IPNum & 255}`
}
