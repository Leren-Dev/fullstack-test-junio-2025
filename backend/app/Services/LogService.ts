export type LevelTypes =
  | 'emergency'
  | 'alert'
  | 'critical'
  | 'error'
  | 'warning'
  | 'notice'
  | 'info'
  | 'debug'

export default class LogService {
  public static LEVELS = {
    EMERGENCY: 'emergency' as const,
    ALERT: 'alert' as const,
    CRITICAL: 'critical' as const,
    ERROR: 'error' as const,
    WARNING: 'warning' as const,
    NOTICE: 'notice' as const,
    INFO: 'info' as const,
    DEBUG: 'debug' as const,
  }

  public static log(
    type: 'local',
    level: LevelTypes,
    msg: string,
    data?: { platform?: string; appName?: string; payload?: [] | {}; exception?: any }
  ) {
    switch (type) {
      case 'local':
        this.localLog(level, msg, data)
        break

      default:
        break
    }
  }

  private static async localLog(
    level: LevelTypes,
    msg: string,
    data?: { platform?: string; appName?: string; payload?: [] | {}; exception?: any }
  ) {
    const timestamp = new Date().toJSON()
    console.log(`[${timestamp}]: LOGLEVEL: ${level} - MSG: ${msg}`, data)
  }
}
