import { RegexPatterns } from '@/interface'

const regex: RegexPatterns = {
  number: /^[0-9]+$/,
  float: /^[0-9.]+$/,
  englishNumber: /^[a-zA-Z0-9]+$/,
  temporaryAccount: /^[a-zA-Z_.0-9]+$/,
  repeatDotBaseline: /^(?!.*[._]{2})[^._].*[^._]$/,
  frontLast: /^[^._].*[^._]$/,
  nature: /^[a-zA-Z0-9()[\]{}<>+\-*/?,.:;“”"'_|~`!@#$%^&=]+$/,
  common: /^[a-zA-Z0-9\u4e00-\u9fa5()[\]{}<>+\-*/?,.:;“”"'_|~`!@#$%^&=]*$/,
  commonBlock: /^[a-zA-Z0-9\u4e00-\u9fa5()[\]{}<>+\-*/?,.:;“”"'_|~`!@#$%^&= \n\r]*$/,
  noSymbol: /^[a-zA-Z0-9\u4e00-\u9fa5]*$/,
  isPhone: /^1[3|4|5|6|7|8|9]\d{9}$/,
  normalName: /^[\u4e00-\u9fa5\sa-zA-Z0-9()\\[\]{}<>+\-^@*\\/?,.:;“”"'_\\|~`!@#$%^&=]*$/,
  ip: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/,
  commonSpaceFullSymbolsWrap:
    /^[\u4E00-\u9FA5\u0020-\u007E\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF5E\r\n]*$/, // 半形中英數字空格符號、全形符號、換行符
  commonFullSymbols:
    /^[\u4E00-\u9FA5\u0021-\u007E\uFF01-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF40\uFF5B-\uFF5E]*$/ // 半形中英數字符號、全形符號
}
export default regex
