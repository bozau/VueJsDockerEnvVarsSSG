// Utility function for providing a default value if one wasn't injected
// envDefault - The default value you'd apply if nothing is provided or replaced
// envStringName - The string you're expecting to be replaced by the nginx-entrypoint
const SetDefaultIfEmpty = (envDefault: string, envStringName: string): string => {
  if (
    (envStringName.startsWith('__') && envStringName.endsWith('__')) ||
    envStringName.length == 0
  ) {
    return envDefault
  }
  return envStringName
}

// We can use interfaces for more complex or boxed configurations
interface SentryConfig {
  dsn: string
  tracesSampleRate: number
  replaysSessionSampleRate: number
  replaysOnErrorSampleRate: number
  tracePropagationTargets: (string | RegExp)[]
}

// Basic configuration values can just sit as normal variables
export const envName: string = SetDefaultIfEmpty('local', '__APP_ENVIRONMENT_NAME__')
export const versionNumber: string = SetDefaultIfEmpty('0.0.1', '__APP_VERSION_NUMBER__')

const sentryConfig: SentryConfig = {
  dsn: SetDefaultIfEmpty('https://sentryio.input', '__SENTRY_DSN__'),
  tracesSampleRate: Number(SetDefaultIfEmpty('1.0', '__SENTRY_TRACES_SAMPLE_RATE__')),
  replaysSessionSampleRate: Number(
    SetDefaultIfEmpty('0.1', '__SENTRY_REPLAYS_SESSION_SAMPLE_RATE__')
  ),
  replaysOnErrorSampleRate: Number(
    SetDefaultIfEmpty('1.0', '__SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE__')
  ),
  tracePropagationTargets: ['localhost', /^https:\/\/.{0,4}api\.domain\.com/]
}

export default {
  envName,
  versionNumber,
  sentryConfig
}
