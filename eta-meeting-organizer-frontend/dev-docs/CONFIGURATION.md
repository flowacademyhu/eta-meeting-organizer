# Configuration Service

## setConfig(config: AppConfiguration)
Set configuration values

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| config  | <code>AppConfiguration</code> | The new configuration object |

## getConfig() ⇒ <code>AppConfiguration</code>
Get configuration values


## setToken(token: AuthResponse)
Set authorization tokens to localStorage

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| token  | <code>AuthResponse</code> | The authorization response object |

## fetchToken(key: string) ⇒ <code>string</code>
Fetch token by parameter

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| key  | <code>string</code> | A key from AuthResponse to fetch the corresponding token |

## clearToken()
Clear tokens from localStorage

## fetchConfig(key: string, fallback?: string) ⇒ <code>string</code>
Returns a configuration value

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| key  | <code>string</code> | A key from AppConfiguration to fetch the corresponding configuration |
| fallback?  | <code>string</code> |  An optional fallback if configuration fetch fails |

## fetchStorageName() ⇒ <code>string</code>
Fetch localStorage key where the token is in

