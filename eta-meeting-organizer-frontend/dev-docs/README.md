**The following description is written in hungarian for the Flow Academy developer team!**

## Projektstruktúra
Az `src` mappán belül három almappa található amit a project során használni fogtok:
 + `src/assets` : ez a mappa tartalmazza (természetesen szükséges esetén almappákra bontva) az összes képet, fontot és nyelvi forditásért felelős fájlt amit a project során használni fogtok, ami itt kiemelendő az `src/assets/i18n` mappa amiben JSON fileok vannak (`src/assets/i18n/hu.json`, `src/assets/i18n/en.json`) ezek szerkesztésével jelenjenek meg a szövegek a teljesen SPA-ban
 + `src/app` : Az oldal megjelenítésével kapcsolatos logika és komponensek.
 + `src/environments` : környezeti változókat tartalmazó fájlok
 
## Internalizáció

A nyelvi fájlok megjelenitéséhez az **ngx-translate** csomagot használjuk.
A következő linken minden fontos információt elértek a csomaggal kapcsolatban: 

https://github.com/ngx-translate/core

#### Használat

A csomag beállitása az `app.module.ts` fájlban már megtörtént. Ezzel további teendők nincsenek. Itt beregisztrálásra került egy HTTP loader annak érdekében hogy XHR requesten keresztül felszivja a szerverről a nyelvi fájlokat:

```typescript
    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
      }
    })
```
Ezen kivül akárcsak a példa `welcome` modul esetében (`welcome.module.ts`) be kell regisztrálni minden almodulra is a nyelvi fájlok betöltéséért felelős csomagot:

```typescript
  imports: [
    SharedModule,
    WelcomeRoutingModule,
    TranslateModule.forChild(),
  ]
```

Ezt követően a használat igen egyszerü a beregisztálás után a templaten elérhető a `translate` pipe, ami az aktuálisan betöltött nyelvi fájlnak megfelelően a kulcsok alapján kikeresi a JSON fájlből a megfelelő forditást és beillesztei az általatok kért helyre.

**A project során semmilyen szöveg ne legyen beégetve, mindent ezeken a nyelvi fájlokon keresztül kezeljetek!**

Pl.:

```typescript
{{'welcome.text' | translate}}
```

#### Használt nyelvek váltása

Lehetőség van az aktuálisan használt nyelv váltására akár gombnyomásra is. Erre is találtok példát a `welcome` példamodulban!

```typescript
  public onLanguageChange() {
    this.translate.use(this.language === 'en' ? 'hu' : 'en');
    this.language = this.translate.currentLang;
  }
```

Az alapértelmezett nyelv szabadon állitható az `app.component.ts` fájl erre kijelölt részében.

```typescript
  private initTranslations() {
    // translation service defaults
    this.translate.setDefaultLang('en');
    this.translate.use('hu');
  }
```

## Környezeti változók

A környezeti változók az `src/environments` mappában érhetőek el. Ezeket fogjátok konfigurálni annak érdekében, hogy az API kapcsolat ne beégetetten müködjön hanem konfigurálhatóan.

Három kulcs található ebben a fájlban:

+ `baseUrl`: Ez a backend alap url-je amin keresztül a hivások történnek
+ `production`: Egy boolean ami az angulart értesiti róla hogy build alatt milyen beállitásokat használjon
+ `storagePrefix`: Abban az esetben ha valamilyen konfigurációt tartósan szeretnénk letárolni, azt a `localStorage`-be tesszük meg (például autentikációhoz szükséges JWT tokenek), ehhez szolgáltat egy prefixet ez a konfigurációs fájl

Ezek használatáról bővebben a **Konfigurációk kezelése** és az **API kapcsolat felállitása, hozzá köthető konnektorok bekötése** résznél olvashattok majd

## Komponensekre vonatkozó általános szabályok

**A komponenseken belül mint a css mint pedig a template inline!**

Erre példát láthattok a `welcome-description.component.ts` fájlban. Ez annyit jelent, hogy a css és a html fájlok nem külön léteznek a typescript fájl mellett hanem a ts fájl component dekorátorában kerülnek be a megfelelő helyre

```typescript
@Component({
  selector: 'app-example',
  styles: [
    `
    .example {
        font-size: 5rem;
    }
  
`,  
],
  template: `
    <mat-card class="example">
        Example
    </mat-card>
  `
})
```

**A saját css-t minimalizálni kell!** A szinezést a komponensek kinézetét a **Material** kezeli míg a layout, a marginok és paddingek kezelését a projectben a **Bootstrap** fogja végezni.

## Modulok felépitése

A modulok mappáján belül almappákat kell létrehozni az áttekinthetőség végett:
+ `components`: A komponenseket tartalmazza
+ `services`: A serviceket tartalmazza
+ `modals`: A felugró ablakok komponenseinek helye
+ `pages`: Modulra jellemző az alaptől eltérő layoutokat lehet ide rakni
+ stb. a lényeg, hogy logikus és áttekinthető legyen

## Layoutok kezelése

Az alap layout a `shared` module pages mappájában lévő `pages`-ben érhető el, ebben egy `container` bootstrap class-t tartalmazó wrapper van egyelőre ami a responsive megjelenítésért felelős.

**Tip:** Ha headert vagy footert készitetek amit minden egyes oldalon szeretnétek megjelentieni azt érdemes a shared module components mappájába lerakni és a pages layoutjába meghivni, mivel minden más route ezen keresztül jön be, igy ez mindenhol megjelenik.

## Lazy loading és új route regisztrálása

A lazy loading alap gondolata igen egyszerü, amikor a felhasználó az oldalunkra navigál a lebuildelt bundle teljes egészét le kell töltenie a böngészőjébe az oldal megnyitásához. Ez egy kisebb project esetében nem zavaró, viszont egy nagyobb projectnél sok időt vehet igénybe ami nem segit a user debounce rate jó szinten tartásában.

Ennek a megoldására használunk lazy loadingot. Ennek a lényege az, hogy a az adott fájl csak akkor töltődik be ha valójában szükség van rá így az alap betöltés gyors, bármekkora is a teljes project maga. Van lehetőség preloading beállitására is az angularban pl. ha már tudjuk hogy a user a webshopunk felületéről a kosárba kattint az esetek 90%-ban akkor azt a modult előre betöltjük miközben a user még csak a termékeket nézi, így gyors az applikáció és észre se veszi, hogy a rendszer dolgozik alatta. Ezt az opciót mi nem fogjuk használni, de az angular hivatalos dokumentációjából minden fontos információ elérhető.

Az új route beregisztrálása a modullal az app-routing.module.ts fájlban történik meg:

```typescript
  {
    component: MainLayoutComponent,
    loadChildren: () => import('./welcome/welcome.module')
      .then((m) => m.WelcomeModule),
    path: '',
    pathMatch: 'full',
  },
```

A `component` kulcs alatt megadjuk jelen esetben az alap layoutot, a `loadChildren` funkció tölti be a modult akkor amikor valaki a `path`-nál meghatározott url-re navigál

## Konfigurációk kezelése

A konfigurációs fájlokat a `configuration.service.ts` fájl kezelni ez már beinjektálásra került a `shared` modulon keresztül a `app` module-ba igy bárhonnan elérhető. Az ebben lévő funkciók működése a felettük található JSDoc-ban le van irva, illetve készitettem nektek egy `CONFIGURATION.md` fájlt is ami tartalmazza az összes funkciót és azok leirásait!

## API kapcsolat felállitása, hozzá köthető konnektorok bekötése

Az API-val történő kapcsolat leegyszerűsítésére csináltam nektek egy `api-communication.service.ts` -t a következőkben pontról pontra végigmegyünk azon, hogyan tudtuk egy új endpointot regisztrálni és használni!
Az ebben lévő funkciók működése a felettük található JSDoc-ban le van irva, illetve készitettem nektek egy `API-COMMUNICATION.md` fájlt is ami tartalmazza az összes funkciót és azok leirásait!


#### Connector elkészitése

+ Először el kell készitenünk a megfelelő connector-t amin keresztül csatlakozunk a backendhez, ezt a `shared/api-connectors`-on belül tudjuk megtenni, itt van egy `AbstractApiConnector.ts` osztály amit kiterjesztve készitjük el jelen esetben a saját connectorunkat

+ Nézzük egy a WelcomeApiConnector.ts osztályt példaként

```typescript
export class WelcomeApiConnector extends AbstractApiConnector {
  protected readonly apiRoute: string = `${this.apiBaseUrl}`;

  public testGet(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiRoute}/users`);
  }
}
```
+ az `apiRoute` irja le azt az urlt amire csatlakozunk ez jelen esetben ugyanaz mint a `baseUrl` nyilván ha egy `UserApiConnector.ts`-t csinálunk amiben minden funkció egy `/users` base endpointra mutat akkor az behelyettesithető

+ ezt követően megirjuk a funkciónkat ami csatlakozik az endpointhoz a beinjektált `httpClient` segitségével, ezt követően nincs más dolgunk mint beregisztrálni az elkészült endpointot az `api-communication.service.ts`-ben 

#### Connector beregisztrálása

+ Az `api-communication.service.ts`-ben lehet látni, hogy a `configuration.service.ts` fájl funkcióit használni az alap URL kinyeréséhez, így az API elérési útvonala szerkeszthető az environment konfigban

```typescript
this.apiBaseUrl = this.configurationService.fetchConfig('baseUrl');
```
+ Az fájlban található egy `Enum` ahova fel tudjuk regisztrálni az endpoint csoportjainkat

```typescript
export enum Connector {
  WELCOME = '[Welcome]',
}
```
+ Ezek után beregisztráljuk az `Connector`-unkat az előre definiált `Map`-ben, és átadjuk neki a `httpClient`-et és az `apiBaseUrl`-t

```typescript
    // register connectors
    this.registerConnector(
      Connector.WELCOME,
      new WelcomeApiConnector(this.http, this.apiBaseUrl)
    );
```

+ Ezt követően egy getteren keresztül elkérjük az Connectorunkat

```typescript
  // API connector getters
  public welcome(): WelcomeApiConnector {
    return this.getConnector(Connector.WELCOME) as WelcomeApiConnector;
  }
```

+ És **injektálás** után már használhatjuk is ott ahol szükségünk van rá
```typescript
    this.users$ = this.api.welcome()
                          .testGet();
```
## Observable szabályok

Egy fontos szabály van amit szeretnék ha mindenki követne, minimalizáljuk a subscribeok számát az observable-re. Az esetek 95%-ban amikor valaki felirakozik egy observable-re akkor igazából nemis volt rá szüksége, minden feliratkozás **növeli a kódtömeget** ezzel együtt a bundle nagyságát továbbá potencionális **memória leakage**-hez vezethet!

Hogy kezeljük akkor az Observableket?

A legjobb az ha hagyjuk hogy a template kezelje az `async` pipe-al és ő leis iratkozik helyettünk:

```typescript
    <mat-card *ngFor="let user of (users$ | async)" class="my-2">
      <strong>{{user.name}}</strong><br>
      {{user.email}}<br>
      {{user.address.city}} - {{user.address.zipcode}} - {{user.address.street}} - {{user.address.suite}}<br>
      {{user.phone}}<br>
      {{user.website}}<br>
    </mat-card>
```

Amennyiben feltétlenül szükséges feliratkozunk iratkozzunk le az `onDestory`-ba mindenképpen lehetőleg deklarativ módon:

https://alligator.io/angular/takeuntil-rxjs-unsubscribe/

Ez alól kivételek a `httpClient` hivásai hiszen azok amikor befejeződnek le is iratkoznak.

**Tip:** Amennyiben nem vagyunk biztosak benne, hogy egy adott Observable-ünk leiratkozik-e mondjuk elnavigáláskor könnyen tesztelhetjük a subscribe-ba.
A subscribe-nak 3 része van a `next`, az `error`, és a `complete`, mindegyik egy függvény, ha a `complete`-be logolunk egyet azonnal látjuk, hogy megtörtént-e a leiratkozás

## Angular Material használata

Minden material modul a `shared` module `material.module.ts`-ébe kerül beregisztrálásra igy projectwide elérhetővé válik, a material modulokat **csak ide** regisztráljuk!

A materialhoz szükséges minden információ elérhető a következő cimen:

https://material.angular.io/

Az ikonokat itt tudjátok megnézni:

https://material.io/resources/icons/?style=baseline

Ha saját szinezést akartok azt is megtudjátok tenni ezen oldal segitségével:

https://materialtheme.arcsine.dev/

## Bootstrap használta

A bootstrapból csak a layout részt használjuk. Hogy ezzel minimalizáljuk a megirandó css mennyiségét.

https://getbootstrap.com/docs/4.4/layout/overview/

A projectbe csak a grid-el kapcsolatos css-ek vannak behivva.

`"./node_modules/bootstrap/dist/css/bootstrap-grid.css"`

