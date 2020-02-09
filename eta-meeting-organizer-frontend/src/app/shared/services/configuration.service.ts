import { Inject, Injectable } from '@angular/core';
import { AppConfiguration } from '~/app/shared/models/app-configuration.model';
import { AuthResponse } from '~/app/shared/models/auth-response.model';
import { LOCAL_STORAGE } from '~/app/shared/services/local-storage.service';
import { environment } from '~/environment/environment';

@Injectable()
export class ConfigurationService {
  private config: AppConfiguration;

  constructor(@Inject(LOCAL_STORAGE) private readonly LStorage: Storage) {
    this.setConfig({baseUrl: environment.baseUrl, storagePrefix: environment.storagePrefix});
  }

  /**
   * Set configuration values
   * @param config: AppConfiguration - The new configuration object
   */
  public setConfig(config: AppConfiguration) {
    this.config = config;
  }

  /**
   * Get configuration values
   * @returns AppConfiguration - The current configuration object
   */
  public getConfig(): AppConfiguration {
    return this.config;
  }

  /**
   * Set authorization tokens to localStorage
   * @param token: AuthResponse - The authorization response object
   */
  public setToken(token: AuthResponse) {
    this.LStorage.setItem(this.fetchStorageName(), JSON.stringify(token));
  }

  /**
   * Fetch token by parameter
   * @param key - A key from AuthResponse to fetch the corresponding token
   * @returns string - The authorization token with the key parameter
   */
  public fetchToken(key: string): string {
    return JSON.parse(this.LStorage.getItem(this.fetchStorageName()) as string) ?
      JSON.parse(this.LStorage.getItem(this.fetchStorageName()) as string)[key] : undefined;
  }

  /**
   * Clear tokens from localStorage
   */
  public clearToken() {
    this.LStorage.removeItem(this.fetchStorageName());
  }

  /**
   * Returns a configuration value
   * @param key: string - A key from AppConfiguration to fetch the corresponding configuration
   * @param fallback: string - An optional fallback if configuration fetch fails
   * @returns string - The configuration value
   */
  public fetchConfig(key: string, fallback?: string): string {
    const config = this.getConfig();
    return typeof config[key] !== 'undefined' ? config[key] : fallback;
  }

  /**
   * Fetch localStorage key where the token is in
   * @returns string - The storage name with prefix
   */
  private fetchStorageName(): string {
    return this.fetchConfig('storagePrefix') + 'auth_token';
  }
}
