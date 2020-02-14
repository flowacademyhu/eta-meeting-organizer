import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiConnector } from '~/app/shared/api-connectors/AbstractApiConnector';
import { BuildingApiConnector } from '~/app/shared/api-connectors/BuildingApiConnector';
import { MeetingRoomApiConnector } from '~/app/shared/api-connectors/MeetingRoomApiConnector';
import { ReservationApiConnector } from '~/app/shared/api-connectors/ReservationApiConnector';
import { WelcomeApiConnector } from '~/app/shared/api-connectors/WelcomeApiConnector';
import { ConfigurationService } from '~/app/shared/services/configuration.service';
import { UserApiConnector } from '../api-connectors/UserApiConnector';

export enum Connector {
  WELCOME = '[Welcome]',
  USER = '[User]',
  MEETINGROOM = '[MeetingRoom]',
  BUILDING = '[Building]',
  RESERVATION = '[Reservation]'
}

@Injectable()
export class ApiCommunicationService {
  private readonly apiBaseUrl: string;
  private connectors: Map<Connector, AbstractApiConnector>;

  constructor(
    private readonly http: HttpClient,
    private readonly configurationService: ConfigurationService
  ) {
    // set base url
    this.apiBaseUrl = this.configurationService.fetchConfig('baseUrl');

    // map of connectors
    this.connectors = new Map<Connector, AbstractApiConnector>();

    // register connectors
    this.registerConnector(
      Connector.WELCOME,
      new WelcomeApiConnector(this.http, this.apiBaseUrl)
    );
    this.registerConnector(
      Connector.USER,
      new UserApiConnector(this.http, this.apiBaseUrl)
    );
    this.registerConnector(
      Connector.MEETINGROOM,
      new MeetingRoomApiConnector(this.http, this.apiBaseUrl)
    );
    this.registerConnector(
      Connector.BUILDING,
      new BuildingApiConnector(this.http, this.apiBaseUrl)
    );
    this.registerConnector(
      Connector.RESERVATION,
      new ReservationApiConnector(this.http, this.apiBaseUrl)
    );
  }

  /**
   * Registers a connector to the connector pool.
   * @param id: Connector - The unique identifier for a connector.
   * @param connector:AbstractApiConnector} - The connector to register.
   */
  private registerConnector(id: Connector, connector: AbstractApiConnector) {
    if (this.connectors.has(id)) {
      throw new Error(
        'A connector with ID \'' + id + '\' has already been registered.'
      );
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

  public user(): UserApiConnector {
    return this.getConnector(Connector.USER) as UserApiConnector;
  }

  public meetingRoom(): MeetingRoomApiConnector {
    return this.getConnector(Connector.MEETINGROOM) as MeetingRoomApiConnector;
  }

  public building(): BuildingApiConnector {
    return this.getConnector(Connector.BUILDING) as BuildingApiConnector;
  }

  public reservation(): ReservationApiConnector {
    return this.getConnector(Connector.RESERVATION) as ReservationApiConnector;
  }
}
