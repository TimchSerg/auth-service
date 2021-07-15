export function getEnv(name: string, defaultValue?: string): string {
  const value = process.env[name]

  if (value === undefined) {
    if (defaultValue === undefined) {
      throw Error(`Environment variable '${name}' was not set`)
    } else {
      return defaultValue
    }
  }

  return value
}
