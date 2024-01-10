export { useActivity } from '../hooks/useActivity.js'
export { useCardConfig } from '../hooks/useCardConfig.js'
export { useConfiguration } from '../hooks/useConfiguration.js'
export { useCurrencyConverter } from '../hooks/useCurrencyConverter.js'
export { useIdentity } from '../hooks/useIdentity.js'
export { useSubscription } from '../hooks/useSubscription.js'
export { useTokenBalance } from '../hooks/useTokenBalance.js'
export { useUser } from '../hooks/useUser.js'

export { NDKProvider, useNostrContext, NDKContext } from '../context/NDKContext.js'
export {
  useWalletContext,
} from '../context/WalletContext.js'

export { WalletConfig } from '../context/context.js'

export {
  type AvailableCurrencies,
  type UserConfigProps,
  defaultCurrency,
  defaultUserConfig,
  CurrenciesList,
  CurrenciesMetadata
} from '../types/config.js'
export {
  type AvailableLanguages,
  type Dictionary,
  type DictionaryEntry,
  type ReplacementParams,
  LanguagesList,
  defaultLocale
} from '../types/translations.js'

export {
  formatter,
  decimalsToUse,
  roundNumber,
  roundToDown,
  formatAddress,
  dateFormatter,
  upperText,
  lowerText,
  formatToPreference
} from '../utils/formatter.js'