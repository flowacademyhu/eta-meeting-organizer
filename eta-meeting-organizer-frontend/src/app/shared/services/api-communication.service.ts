import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { WelcomeApiConnector } from '~/app/shared/api-connectors/WelcomeApiConnector';
import { ConfigurationService } from '~/app/shared/services/configuration.service';

export enum Connector {
  WELCOME = '[Welcome]',
}

@Injectable()
export class ApiCommunicationService {
  private readonly apiBaseUrl: string;
  private connectors: Map<Connector, AbstractApiConnector>;

  constructor(private readonly http: HttpClient,
              private readonly configurationService: ConfigurationService) {
    // set base url
    this.apiBaseUrl = this.configurationService.fetchConfig('baseUrl');

    // map of connectors
    this.connectors = new Map<Connector, AbstractApiConnector>();

    // register connectors
    this.registerConnector(
      Connector.WELCOME,
      new WelcomeApiConnector(this.http, this.apiBaseUrl)
    );
  }

  /**
   * Registers a connector to the connector pool.
   * @param id: Connector - The unique identifier for a connector.
   * @param connector:AbstractApiConnector} - The connector to register.
   */
  private registerConnector(id: Connector, connector: AbstractApiConnector) {
    if (this.connectors.has(id)) {
      throw new Error('A connector with ID \'' + id + '\' has already been registered.');
    }
    try {
      this.connectors.set(id, connector);
    } catch (e) {
      throw new Error('Could not register connector: ' + e);
    }
  }

  /**
   * Gets a connector from the connector pool.
   * @param connector: Connector - The unique identifier for a connector.
   * @returns AbstractApiConnector | undefined - The connector itself
   */
  private getConnector(connector: Connector): AbstractApiConnector | undefined {
    if (!this.connectors.has(connector)) {
      throw new Error('No connector is registered for: ' + connector);
    }

    return this.connectors.get(connector);
  }

  // API connector getters
  public welcome(): WelcomeApiConnector {
    return this.getConnector(Connector.WELCOME) as WelcomeApiConnector;
  }
}
