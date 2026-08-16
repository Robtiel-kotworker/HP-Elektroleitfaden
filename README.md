# HP Elektroleitfaden

Elektroleitfaden für den Wärmepumpen-Elektriker: Systembestimmung per
Assistent (Hersteller → Regelung → Zusatzinstallationen) oder direkte
Suche, danach Anzeige der passenden Datenblätter. Reine Client-Anwendung,
kein Build-Schritt, kein Backend.

## Projektstruktur

```
hp-elektroleitfaden/
├── index.html          Einstiegspunkt / SPA-Shell
├── css/
│   └── styles.css      gesamtes Styling
├── js/
│   ├── data.js          Datenmodell: Hersteller, Regelungen, Zusatz­installationen, Datenblätter
│   ├── state.js         Auswahlstatus des Assistenten (sessionStorage)
│   ├── views.js         Rendering aller Ansichten
│   └── router.js         Hash-Routing (#/pfad)
└── README.md
```

## Deployment auf Cloudflare Pages

Kein Build-Prozess nötig, da reines HTML/CSS/JS.

1. Repository auf GitHub anlegen und diesen Ordnerinhalt pushen (dieser
   Ordner = Repo-Root).
2. In Cloudflare Pages: **Workers & Pages → Create → Pages → Connect to Git**
   und das Repository auswählen.
3. Build-Einstellungen:
   - **Framework preset:** `None`
   - **Build command:** *(leer lassen)*
   - **Build output directory:** `/`
4. Deployen. Fertig – es sind **keine** Redirect-/Rewrite-Regeln nötig,
   da die App reines Hash-Routing (`#/…`) verwendet und der Server bei
   jedem Aufruf ausschließlich `index.html` ausliefert.

## Lokal testen

Jeder einfache statische Webserver reicht, z. B.:

```bash
npx serve .
# oder
python3 -m http.server 8080
```

Anschließend `http://localhost:<port>/` im Browser öffnen.

## Funktionsweise

- **Startseite:** Auswahl zwischen geführter Systembestimmung und freier
  Datenblatt-Suche.
- **Systembestimmung:** Hersteller → (nur bei Nibe: Regelung) →
  Zusatzinstallationen (Mehrfachauswahl) → Ergebnisliste.
- **Ergebnisliste / Suche:** Klick auf ein Datenblatt öffnet es in einem
  neuen Browser-Tab (`window.open`, keine Download-Funktion).
- **Datenblatt-Detailseite:** Absicherung als „Klemmleiste“, benötigte
  Kabel mit Verwendung, Kabeltyp und Anschlussort. Ist ein Datenblatt
  noch nicht gepflegt, wird ein Platzhalterhinweis angezeigt – die Route
  existiert bereits.

## Neue Datenblätter / Zusatzinstallationen ergänzen

Alles wird ausschließlich in `js/data.js` gepflegt, keine weitere Datei
muss angefasst werden:

- **Neuer Hersteller:** Eintrag in `MANUFACTURERS` ergänzen.
- **Neue Zusatzinstallation:** Eintrag in `ADDONS` ergänzen
  (`manufacturers` steuert, bei welchem Hersteller die Option im
  Assistenten erscheint).
- **Neues Datenblatt:** Eintrag in `DATASHEETS` ergänzen. Solange
  `available: false` und `content: null` gesetzt sind, existiert die
  Seite bereits (inkl. Suche und Ergebnisliste), zeigt aber nur den
  Platzhalter „Dieses Datenblatt wird in Kürze ergänzt.“ Sobald der
  Inhalt feststeht, `available: true` setzen und `content` befüllen:

  ```js
  content: {
    kurzbeschreibung: '…',
    absicherung: [{ bezeichnung: '…', wert: '…' }],
    kabel: [
      { verwendung: '…', kabeltyp: '…', anschlussort: '…', hinweis: '…' },
    ],
    hinweise: ['…'],
  }
  ```

Aktuell vollständig gepflegt: **Bosch Außeneinheit** und
**Bosch Compress-Inneneinheit**. Alle übrigen Datenblätter (Nibe,
Unterverteilung-Details, Ext. APZ-Feld, Bosch Energie Management,
§14a-/SG-Ready-Steuerbox, PV-Wechselrichter-Kommunikation) sind als
Platzhalter angelegt.
