import { AlertOption } from '@/interface'
export default (code: number, content?: AlertOption['content']) => {
  switch (code) {
    case -2002:
      return 'C-2002'
    case -2001:
      return 'C-2001'
    case -1023:
      return 'C-1023'
    case -1022:
      return 'C-1022'
    case -1021:
      return 'C-1021'
    case -1020:
      return 'C-1020'
    case -1019:
      return 'C-1019'
    case -1018:
      return 'C-1018'
    case -1017:
      return 'C-1017'
    case -1016:
      return 'C-1016'
    case -1015:
      return 'C-1015'
    case -1014:
      return 'C-1014'
    case -1013:
      return 'C-1013'
    case -1012:
      return 'C-1012'
    case -1011:
      return 'C-1011'
    case -1010:
      return 'C-1010'
    case -1009:
      return 'C-1009'
    case -1008:
      return 'C-1008'
    case -1007:
      return 'C-1007'
    case -1006:
      return 'C-1006'
    case -1005:
      return 'C-1005'
    case -1004:
      return 'C-1004'
    case -1003:
      return 'C-1003'
    case -1002:
      return 'C-1002'
    case -1001:
      return 'C-1001'
    case -7:
      return 'C-7'
    case -6:
      return 'C-6'
    case -5:
      return 'C-5'
    case -4:
      return 'C-4'
    case -3:
      return 'C-3'
    case -2:
      return 'C-2'
    case -1:
      return 'C-1'
    case 1:
      return content
    case 1001:
      return ['E-1001', { content }]
    case 1002:
      return ['E-1002', { content }]
    default:
      return 'C-DEFAULT'
  }
}
