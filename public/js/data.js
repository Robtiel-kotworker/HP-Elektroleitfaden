// ============================================================================
// HP Elektroleitfaden – Datenmodell
// ----------------------------------------------------------------------------
// Diese Datei enthält ausschließlich Daten (keine Logik). Neue Datenblätter
// oder Zusatzinstallationen werden ausschließlich hier ergänzt.
//
// Ein Datenblatt mit available:false besitzt bereits eine Detailseite in der
// App, zeigt dort aber einen Platzhalter an, bis content befüllt wird.
//
// Alle Klemmenbezeichnungen stammen aus den Installationsanleitungen der
// Hersteller:
//   Bosch Compress CS5800i AW – Außeneinheit AW 4|5|7 OR-S  6721840669
//   Bosch Compress CS5800i AW – Inneneinheit CS5800iAW 12 E 6721830740
//   NIBE S2125    Installateurhandbuch 631676
//   NIBE VVM S320 Installateurhandbuch 531158
//   NIBE SMO S40  Installateurhandbuch 631927
// ============================================================================

export const MANUFACTURERS = [
  { id: 'bosch', label: 'Bosch' },
  { id: 'nibe', label: 'Nibe' },
];

export const REGELUNGEN = [
  {
    id: 'smo',
    label: 'SMO-Regelung',
    description: 'Nibe Anlage mit separatem SMO-Regelgerät.',
  },
  {
    id: 'standard',
    label: 'Standard-Regelung',
    description: 'Nibe Anlage mit werksseitiger Standardregelung in der Inneneinheit.',
  },
];

// Zusätzliche Installationen zur Mehrfachauswahl im Bestimmungsassistenten.
// manufacturers: für welche Hersteller die Option angezeigt wird.
export const ADDONS = [
  {
    id: 'unterverteilung',
    label: 'Unterverteilung',
    description: 'Zusätzliche Unterverteilung im Zuge der Wärmepumpen-Installation.',
    manufacturers: ['bosch', 'nibe'],
  },
  {
    id: 'apz-feld',
    label: 'Ext. APZ-Feld',
    description: 'Erweiterung des Zählerplatzes um ein zusätzliches APZ-Feld.',
    manufacturers: ['bosch', 'nibe'],
  },
  {
    id: 'bem',
    label: 'Bosch Energie Management (BEM)',
    description: 'Bosch Home Energy Manager zur Einbindung von PV, Speicher und Wärmepumpe.',
    manufacturers: ['bosch'],
  },
  {
    id: 'sg-ready-box',
    label: 'Zusätzliche §14a-/SG-Ready-Steuerbox',
    description: 'Externe Steuerbox für steuerbare Verbrauchseinrichtungen nach §14a EnWG.',
    manufacturers: ['bosch', 'nibe'],
  },
  {
    id: 'pv-kommunikation',
    label: 'PV-Wechselrichter-Kommunikation',
    description: 'Datenanbindung des Wärmepumpensystems an einen PV-Wechselrichter.',
    manufacturers: ['bosch', 'nibe'],
  },
];

// Kategorien, in die Datenblätter einsortiert werden.
export const CATEGORY = {
  BASIS: 'Basisgerät',
  ZUSATZ: 'Zusätzliche Installation',
};

/**
 * Ein Datenblatt-Eintrag:
 * id            eindeutige Kennung, auch als Routen-Parameter genutzt
 * title         Anzeigetitel
 * category      CATEGORY.BASIS | CATEGORY.ZUSATZ
 * manufacturer  'bosch' | 'nibe' | null (null = herstellerunabhängig)
 * regelung      'smo' | 'standard' | null (null = nicht regelungsabhängig)
 * addon         Addon-ID, falls das Datenblatt zu einer Zusatzinstallation gehört
 * available     ob content bereits vollständig gepflegt ist
 * tags          Suchbegriffe für die freie Suche
 * content       strukturierter Inhalt oder null (Platzhalter)
 *
 * Ein Kabel-Eintrag in content.kabel:
 * verwendung    wofür die Leitung gebraucht wird
 * kabeltyp      Kabeltyp und Querschnitt
 * anschlussort  wo angeschlossen wird (Gerät, Platine, Klemmenkasten)
 * klemmen       optional: Ader-zu-Klemme-Zuordnung [{ ader, klemme }]
 * hinweis       optional: zusätzlicher Hinweis zu dieser Leitung
 */
export const DATASHEETS = [
  // ---------------------------------------------------------------------
  // BOSCH – Basisgeräte (Baureihe Compress CS5800i AW)
  // ---------------------------------------------------------------------
  {
    id: 'bosch-aussen',
    title: 'Bosch Wärmepumpe – Außeneinheit (Compress CS5800i AW)',
    category: CATEGORY.BASIS,
    manufacturer: 'bosch',
    regelung: null,
    addon: null,
    available: true,
    tags: ['bosch', 'außeneinheit', 'aw', 'or-s', 'compress', 'cs5800i', 'split', 'wärmepumpe', 'can-bus', 'klemme'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss der Bosch Außeneinheit AW 4 | 5 | 7 OR-S (Compress CS5800i AW, 1~230 V). Netzanschluss und CAN-BUS werden im Klemmenkasten hinter der seitlichen Abdeckung aufgelegt. Der Anschluss ist bei allen Baugrößen identisch.',
      absicherung: [
        { bezeichnung: 'Außeneinheit AW 4 | 5 | 7 OR-S', wert: 'LS C 16 A, 1~230 V (230 V 1N AC 50 Hz)' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'Typ B, 30 mA – vom Hersteller empfohlen (Wechselrichter)' },
        { bezeichnung: 'Trenneinrichtung', wert: 'allpoliger Sicherheitsschalter, Überspannungskategorie III' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss)',
          kabeltyp: 'NYY-J 3x2,5 mm² (Mindestquerschnitt) – empfohlen NYY-J 3x4 mm²',
          anschlussort: 'Klemmenkasten der Außeneinheit, Netzanschluss – rechte Kabeldurchführung',
          klemmen: [
            { ader: 'Außenleiter L1', klemme: 'L' },
            { ader: 'Neutralleiter N', klemme: 'N' },
            { ader: 'Schutzleiter PE', klemme: 'PE (Erdungsklemme)' },
          ],
          hinweis: 'Adern auf 10 mm abisolieren. Netzleitung getrennt vom CAN-BUS führen, Mindestabstand 100 mm.',
        },
        {
          verwendung: 'Kommunikation (CAN-BUS zur Inneneinheit)',
          kabeltyp: 'LiYCY (TP) 2x2x0,75 mm², abgeschirmt (oder gleichwertiges Twisted-Pair-Kabel, mind. 0,75 mm², für den Außenbereich zugelassen)',
          anschlussort: 'Klemmenkasten der Außeneinheit, CAN-BUS-Anschluss – linke Kabeldurchführung',
          klemmen: [
            { ader: '24 V DC (+)', klemme: 'Vcc' },
            { ader: 'Masse', klemme: 'GND' },
            { ader: 'CAN High', klemme: 'H' },
            { ader: 'CAN Low', klemme: 'L' },
          ],
          hinweis: 'Max. 30 m. Aderpaare beibehalten: Vcc/GND als ein Paar, H/L als zweites Paar. Adern auf 8 mm abisolieren. H und L nicht vertauschen, sonst kommt keine Kommunikation zustande.',
        },
        {
          verwendung: 'Rohrbegleitheizung Kondensatablauf (Zubehörheizkabel)',
          kabeltyp: 'Anschlussleitung des Heizkabels gemäß Zubehör-Installationsanleitung',
          anschlussort: 'Klemmenkasten der Außeneinheit, Anschluss für Zubehörheizkabel',
          hinweis: 'Nur bei frostgefährdeter Verlegung des Kondensatablaufs erforderlich.',
        },
      ],
      hinweise: [
        'Die 24-V- und die CAN-BUS-Anschlüsse dürfen nicht verwechselt werden – die Kommunikationskreise sind nicht für eine Dauerspannung von 24 V DC ausgelegt.',
        'An die Stromversorgung der Außeneinheit dürfen außer dem vorgesehenen Zubehör keine weiteren Verbraucher angeschlossen werden.',
        'Bei einer 3~400-V-Außeneinheit (AW 10 | 12 OR-T) ist die Zuleitung 5-adrig auszuführen (NYY-J 5x2,5 mm², empfohlen 5x4 mm², Klemmen L1/L2/L3/N/PE); Sicherungsgröße nach Typenschild.',
        'Leiterquerschnitte immer nach tatsächlicher Leitungslänge und Verlegeart prüfen.',
      ],
    },
  },
  {
    id: 'bosch-innen',
    title: 'Bosch Inneneinheit – Compress CS5800i AW',
    category: CATEGORY.BASIS,
    manufacturer: 'bosch',
    regelung: null,
    addon: null,
    available: true,
    tags: ['bosch', 'inneneinheit', 'compress', 'cs5800i', 'xcu-thh', 'wärmepumpe', 'ems-bus', 'klemme'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss der Bosch Inneneinheit CS5800iAW 12 E/M. Netz- und Pumpenleitungen werden im Klemmenkasten aufgelegt, Fühler- und Busleitungen am Modul XCU-THH (XCU HY). Der Anschluss ist bei allen Baugrößen identisch.',
      absicherung: [
        { bezeichnung: 'Inneneinheit / elektrischer Zuheizer', wert: 'LS B 16 A, 3~400 V (bei > 210 W externer Last an den Ausgängen: 3x20 A)' },
        { bezeichnung: 'Bedieneinheit (2. Zuleitung bei EVU-Sperre/SG)', wert: 'LS B 16 A, 1~230 V' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'Typ B, 30 mA – vom Hersteller empfohlen; Ausführung nach nationalen Vorschriften' },
        { bezeichnung: 'Trenneinrichtung', wert: 'allpoliger Sicherheitsschalter, Überspannungskategorie III – je Zuleitung einer' },
        { bezeichnung: 'Interne Sicherung Pumpenausgänge', wert: 'Sicherungseinsatz 250 V, 5x20 mm, 5 A träge (PC1, PW2, PK2)' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung Inneneinheit (elektrischer Zuheizer)',
          kabeltyp: 'NYM-J 5x2,5 mm² (Mindestquerschnitt lt. Kabelplan, H07V2 5G2,5)',
          anschlussort: 'Klemmenkasten der Inneneinheit, Zugentlastung verwenden',
          klemmen: [
            { ader: 'Außenleiter L1', klemme: 'L1' },
            { ader: 'Außenleiter L2', klemme: 'L2' },
            { ader: 'Außenleiter L3', klemme: 'L3' },
            { ader: 'Neutralleiter N', klemme: 'N' },
            { ader: 'Schutzleiter PE', klemme: '1PE' },
          ],
          hinweis: 'Brückenanordnung im Klemmenkasten beachten. Bei der 3-kW-Ausführung genügt NYM-J 3x2,5 mm² auf L3 / N / 1PE.',
        },
        {
          verwendung: 'Zuleitung Bedieneinheit (2. Netzkabel bei EVU-Sperre / §14a EnWG)',
          kabeltyp: 'NYM-J 3x1,5 mm² (Mindestquerschnitt)',
          anschlussort: 'Klemmenkasten der Inneneinheit, Versorgungseingang Bedieneinheit',
          klemmen: [
            { ader: 'Außenleiter L', klemme: '1L' },
            { ader: 'Neutralleiter N', klemme: '1N' },
            { ader: 'Schutzleiter PE', klemme: '2PE' },
          ],
          hinweis: 'Nur erforderlich, wenn EVU-Sperre bzw. Smart Grid genutzt wird – die Bedieneinheit bleibt dann im Sperrzeitraum versorgt (Frostschutz).',
        },
        {
          verwendung: 'Kommunikation (CAN-BUS zur Außeneinheit)',
          kabeltyp: 'LiYCY (TP) 2x2x0,75 mm², abgeschirmt',
          anschlussort: 'Modul XCU-THH (XCU HY) im Klemmenkasten, Steckverbinder CAN-BUS (Klemmen 1–4)',
          klemmen: [
            { ader: '24 V DC (+)', klemme: 'CAN-BUS: Vcc' },
            { ader: 'Masse', klemme: 'CAN-BUS: GND' },
            { ader: 'CAN High', klemme: 'CAN-BUS: H' },
            { ader: 'CAN Low', klemme: 'CAN-BUS: L' },
          ],
          hinweis: 'Max. 30 m. Schirm nur einseitig an der Inneneinheit auflegen. H und L an beiden Enden gleich belegen.',
        },
        {
          verwendung: 'Vorlauftemperaturfühler (T0)',
          kabeltyp: 'LiYY 2x0,75 mm²',
          anschlussort: 'Modul XCU-THH (XCU HY), Steckverbinder T0',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'T0: 1' },
            { ader: 'Fühler Ader 2', klemme: 'T0: 2' },
          ],
          hinweis: 'Bei der Ausführung mit Pufferspeicher am Speicher montieren, sonst werkseitig eingebaut.',
        },
        {
          verwendung: 'Außentemperaturfühler (T1)',
          kabeltyp: 'LiYY 2x0,75 mm² (bis 20 m), LiYY 2x1,0 mm² (über 20 m)',
          anschlussort: 'Modul XCU-THH (XCU HY), Steckverbinder T1',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'T1: 1' },
            { ader: 'Fühler Ader 2', klemme: 'T1: 2' },
          ],
          hinweis: 'Max. 30 m. Fühler an der kältesten Gebäudeseite (in der Regel Nord) montieren, nicht direkt unter dem Dach.',
        },
        {
          verwendung: 'Warmwasserspeicher-Temperaturfühler (TW1 / TW2)',
          kabeltyp: 'LiYY 2x0,75 mm²',
          anschlussort: 'Modul XCU-THH (XCU HY), Steckverbinder TW1 bzw. TW2',
          klemmen: [
            { ader: 'TW1 Ader 1 / Ader 2', klemme: 'TW1: 1 / 2' },
            { ader: 'TW2 Ader 1 / Ader 2 (nur bei bestimmten Speichern)', klemme: 'TW2: 1 / 2' },
          ],
        },
        {
          verwendung: 'Kondensationsfühler (MD1, Zubehör für Kühlbetrieb)',
          kabeltyp: 'LiYY 2x0,5 mm²',
          anschlussort: 'Modul XCU-THH (XCU HY), Steckverbinder MD1',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'MD1: 1' },
            { ader: 'Fühler Ader 2', klemme: 'MD1: 2' },
          ],
        },
        {
          verwendung: 'EVU-Sperre (Tarifsteuerung)',
          kabeltyp: 'LiYY 2x0,5 mm², potentialfrei',
          anschlussort: 'Modul XCU-THH (XCU HY), externer Eingang I13',
          klemmen: [
            { ader: 'Steuerkontakt Ader 1', klemme: 'I13: 1' },
            { ader: 'Steuerkontakt Ader 2', klemme: 'I13: 2' },
          ],
          hinweis: 'Schaltkontakt muss für 3,3 V und 1 mA ausgelegt sein – nur Relais mit Goldkontakten verwenden.',
        },
        {
          verwendung: '§14a EnWG / Smart Grid (SG)',
          kabeltyp: 'LiYY 2x0,5 mm², potentialfrei',
          anschlussort: 'Modul XCU-THH (XCU HY), externer Eingang I16',
          klemmen: [
            { ader: 'Steuerkontakt Ader 1', klemme: 'I16: 1' },
            { ader: 'Steuerkontakt Ader 2', klemme: 'I16: 2' },
          ],
          hinweis: 'Ansteuerung durch den Netzbetreiber bzw. die Steuerbox. Schaltkontakt für 3,3 V / 1 mA, Relais mit Goldkontakten.',
        },
        {
          verwendung: 'Zubehör und Kommunikationsmodule (EMS-BUS)',
          kabeltyp: 'LiYY 2x0,5 mm² – bei induktiven Einflüssen (z. B. PV-Anlage) LiYCY 2x0,5 mm² abgeschirmt',
          anschlussort: 'EMS-BUS-Anschlussklemme im Klemmenkasten der Inneneinheit',
          klemmen: [
            { ader: 'EMS +', klemme: 'PWR BUS: EMS+' },
            { ader: 'EMS −', klemme: 'PWR BUS: EMS−' },
          ],
          hinweis: 'EMS-BUS und CAN-BUS sind nicht kompatibel. Ist die Klemme belegt, parallel auf dieselbe Klemme auflegen.',
        },
        {
          verwendung: 'Heizkreispumpe (PC1)',
          kabeltyp: 'H05VV-F 3G1,5 mm² bzw. NYM-J 3x1,5 mm², 230 V~1N',
          anschlussort: 'Klemmenkasten der Inneneinheit, Relaisausgang PC1',
          klemmen: [
            { ader: 'Außenleiter L (geschaltet)', klemme: '1SL' },
            { ader: 'Neutralleiter N', klemme: '3N' },
            { ader: 'Schutzleiter PE', klemme: '4PE' },
          ],
        },
        {
          verwendung: 'Zirkulationspumpe Warmwasser (PW2)',
          kabeltyp: 'H05VV-F 3G1,5 mm² bzw. NYM-J 3x1,5 mm², 230 V~1N',
          anschlussort: 'Klemmenkasten der Inneneinheit, Relaisausgang PW2',
          klemmen: [
            { ader: 'Außenleiter L (geschaltet)', klemme: '2SL' },
            { ader: 'Neutralleiter N', klemme: '4N' },
            { ader: 'Schutzleiter PE', klemme: '5PE' },
          ],
        },
        {
          verwendung: 'Umwälzpumpe Kühlbetrieb (PK2)',
          kabeltyp: 'H05VV-F 3G1,5 mm² bzw. NYM-J 3x1,5 mm², 230 V~1N',
          anschlussort: 'Klemmenkasten der Inneneinheit, Relaisausgang PK2',
          klemmen: [
            { ader: 'Außenleiter L (geschaltet)', klemme: '3SL' },
            { ader: 'Neutralleiter N', klemme: '5N' },
            { ader: 'Schutzleiter PE', klemme: '6PE' },
          ],
        },
        {
          verwendung: 'Heizkreismodul MM100 (Zubehör, gemischter Kreis)',
          kabeltyp: 'H05VV-F 3G1,5 mm² bzw. NYM-J 3x1,5 mm², 230 V~1N',
          anschlussort: 'Klemmenkasten der Inneneinheit, Ausgang zum Zubehörmodul',
          klemmen: [
            { ader: 'Außenleiter L', klemme: '2L' },
            { ader: 'Neutralleiter N', klemme: '2N' },
            { ader: 'Schutzleiter PE', klemme: '3PE' },
          ],
          hinweis: 'Die Datenverbindung des MM100 erfolgt zusätzlich über den EMS-BUS.',
        },
      ],
      hinweise: [
        'Fühler- und Busleitungen mit Mindestabstand 100 mm getrennt von Netzleitungen verlegen.',
        'Anzugsmoment der Steckverbinder am XCU-THH (XCU HY)-Modul: 0,5 Nm. Vor jedem Steckverbinder einen Kabelbinder setzen.',
        'Alle Leitungen müssen für Temperaturen bis 70 °C ausgelegt sein; Kabel dürfen keine heißen Oberflächen (Rohre, Zuheizer) berühren.',
        'An die Stromversorgung der Inneneinheit dürfen keine weiteren Verbraucher angeschlossen werden.',
        'Leiterquerschnitte immer nach tatsächlicher Leitungslänge und Verlegeart prüfen.',
      ],
    },
  },

  // ---------------------------------------------------------------------
  // NIBE – Basisgeräte
  // ---------------------------------------------------------------------
  {
    id: 'nibe-aussen',
    title: 'Nibe Wärmepumpe – Außeneinheit S2125',
    category: CATEGORY.BASIS,
    manufacturer: 'nibe',
    regelung: null,
    addon: null,
    available: true,
    tags: ['nibe', 'außeneinheit', 's2125', 'luft-wasser', 'wärmepumpe', 'x22', 'klemme'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss der Nibe Luft-/Wasser-Wärmepumpe S2125. Alle Klemmen liegen im Schaltkasten (Verteilerkasten) der Außeneinheit; die Kabel werden über die Kabelverschraubungen auf der rechten Geräteseite (von vorn gesehen) eingeführt. Das Anschlussschema gilt für die SMO- und die Standard-Regelung gleichermaßen.',
      absicherung: [
        { bezeichnung: 'S2125-8, 1~230 V', wert: 'LS C 16 A (Nennstrom 13 A)' },
        { bezeichnung: 'S2125-12, 1~230 V', wert: 'LS C 20 A (Nennstrom 19,6 A)' },
        { bezeichnung: 'S2125-8, 3~400 V', wert: 'LS C 6 A (Nennstrom 4,6 A)' },
        { bezeichnung: 'S2125-12, 3~400 V', wert: 'LS C 10 A (Nennstrom 6,9 A)' },
        { bezeichnung: 'Sicherungsautomat', wert: 'mindestens Auslösecharakteristik „C“' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'eigener FI, ≤ 30 mA, wenn im Gebäude ein FI vorhanden ist' },
        { bezeichnung: 'Trenneinrichtung', wert: 'allpoliger Sicherheitsschalter (Reparaturschalter) erforderlich' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss) 1~230 V',
          kabeltyp: 'NYY-J 3x2,5 mm² (Mindestquerschnitt) – empfohlen NYY-J 3x4 mm²',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X1 (eingehende Versorgung)',
          klemmen: [
            { ader: 'Außenleiter L1', klemme: 'X1: L' },
            { ader: 'Neutralleiter N', klemme: 'X1: N' },
            { ader: 'Schutzleiter PE', klemme: 'X1: PE' },
          ],
          hinweis: 'Nur bei Geräten für 230 V~ 50 Hz. Querschnitt nach verwendeter Absicherung dimensionieren.',
        },
        {
          verwendung: 'Zuleitung (Netzanschluss) 3~400 V',
          kabeltyp: 'NYY-J 5x2,5 mm² (Mindestquerschnitt) – empfohlen NYY-J 5x4 mm²',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X1 (eingehende Versorgung)',
          klemmen: [
            { ader: 'Außenleiter L1', klemme: 'X1: L1' },
            { ader: 'Außenleiter L2', klemme: 'X1: L2' },
            { ader: 'Außenleiter L3', klemme: 'X1: L3' },
            { ader: 'Neutralleiter N', klemme: 'X1: N' },
            { ader: 'Schutzleiter PE', klemme: 'X1: PE' },
          ],
          hinweis: 'Nur bei Geräten für 400 V 3N~ 50 Hz. Welche Variante vorliegt, steht auf dem Typenschild.',
        },
        {
          verwendung: 'Kommunikation zur Inneneinheit bzw. zum Regelgerät',
          kabeltyp: 'abgeschirmtes 3-adriges Kabel, max. 0,75 mm² (z. B. LiYCY 3x0,75); mind. 0,5 mm² bis 50 m',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X22 (X22:1–4)',
          klemmen: [
            { ader: 'GND (Masse)', klemme: 'X22: GND' },
            { ader: 'A', klemme: 'X22: A' },
            { ader: 'B', klemme: 'X22: B' },
          ],
          hinweis: 'Gegenstelle Standard-Regelung: VVM S320, Grundkarte AA2 – X30:1 (GND), X30:3 (B), X30:4 (A). Gegenstelle SMO-Regelung: SMO S40, Verbindungskarte AA100 – X9:6 (GND), X9:4 (A), X9:5 (B). Immer Ader für Ader gleich belegen (GND↔GND, A↔A, B↔B); die Funktion ist an der Klemme aufgedruckt. Vor dem Anschluss die werkseitigen Steckbrücken in der S2125 lösen.',
        },
        {
          verwendung: 'Externe Steuerspannung (nur bei Tarifsteuerung)',
          kabeltyp: 'NYY-J 3x2,5 mm², 230 V~ 50 Hz',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X5 (externe Steuerspannung)',
          klemmen: [
            { ader: 'Außenleiter L', klemme: 'X5: L' },
            { ader: 'Neutralleiter N', klemme: 'X5: N' },
            { ader: 'Schutzleiter PE', klemme: 'X5: PE' },
          ],
          hinweis: 'Vor dem Anschluss die Brücken an Klemmleiste X5 entfernen. Nur nötig, wenn die Regelung getrennt von den übrigen Komponenten versorgt wird. Beiliegende Warnaufkleber für externe Spannung anbringen.',
        },
        {
          verwendung: 'Verdichtersperre / Tarifsperre',
          kabeltyp: '2-adrige Steuerleitung, mind. 0,5 mm², potentialfreier Schließer',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X21',
          klemmen: [
            { ader: 'Steuerkontakt Ader 1', klemme: 'X21: 1' },
            { ader: 'Steuerkontakt Ader 2', klemme: 'X21: 2' },
          ],
          hinweis: 'Die Verdichtersperre wird entweder hier oder am Innenmodul/Regelgerät ausgeführt – niemals an beiden Stellen gleichzeitig.',
        },
        {
          verwendung: 'Kaskade (zweite Wärmepumpe, optional)',
          kabeltyp: 'abgeschirmtes 3-adriges Kabel, max. 0,75 mm²',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X23',
          klemmen: [
            { ader: 'GND / A / B', klemme: 'X23 → X22 der nächsten Wärmepumpe' },
          ],
          hinweis: 'Jede Wärmepumpe braucht eine eigene Adresse (DIP-Schalter S1, Positionen 1–3 binär codiert).',
        },
        {
          verwendung: 'Kondensatablauf-Begleitheizung (Zubehör KVR 10 / KVR 11)',
          kabeltyp: 'Anschlussleitung des Heizkabels gemäß Zubehör-Installationsanleitung',
          anschlussort: 'Schaltkasten der Außeneinheit, Klemmleiste X9 (Anschluss KVR)',
          hinweis: 'Interne Absicherung über Feinsicherung F3 (250 mA). Bei KVR 11 wird der Sicherungsautomat FC1 durch den Automaten FB1 ersetzt.',
        },
      ],
      hinweise: [
        'Die Belegung der Klemmleisten (L/N/PE bzw. GND/A/B) ist im Schaltkasten an der jeweiligen Klemme aufgedruckt.',
        'Starkstrom- und Signalleitungen getrennt verlegen; Fühler- und Kommunikationsleitungen nicht in der Nähe von Starkstromleitungen führen.',
        'Für die Kommunikation ist zwingend ein abgeschirmtes Kabel zu verwenden.',
        'Die Adresse der Wärmepumpe wird am DIP-Schalter S1 auf der Grundkarte AA2 eingestellt (Werkseinstellung Adresse 1). Für Kühlbetrieb muss S1, Position 4 auf ON stehen. DIP-Schalter nur im spannungslosen Zustand verstellen.',
        'Vor dem Isolationstest der Hausinstallation muss die S2125 abgeklemmt werden.',
        'Die Ladepumpe wird nicht an der Außeneinheit, sondern am Innenmodul bzw. Regelgerät angeschlossen.',
        'Vor dem Start Anschlüsse, Netz- und Phasenspannung prüfen, um Schäden an der Elektronik zu vermeiden.',
      ],
    },
  },
  {
    id: 'nibe-vvm-s320',
    title: 'Nibe Innenmodul – VVM S320 (Standard-Regelung)',
    category: CATEGORY.BASIS,
    manufacturer: 'nibe',
    regelung: 'standard',
    addon: null,
    available: true,
    tags: ['nibe', 'innenmodul', 'inneneinheit', 'vvm', 's320', 'standard', 'wärmepumpe', 'aa2', 'klemme'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss des Nibe Innenmoduls VVM S320 (Standard-Regelung). Bis auf Außenfühler, Raumfühler und Stromwandler ist die gesamte Elektrik werkseitig verdrahtet. Alle bauseitigen Anschlüsse liegen auf der Grundkarte AA2.',
      absicherung: [
        { bezeichnung: 'VVM S320, 3~400 V', wert: 'LS C 16 A, 400 V 3N~ 50 Hz (max. Betriebsstrom 16 A, Zusatzheizung 9 kW)' },
        { bezeichnung: 'VVM S320, 3~230 V', wert: 'LS C 32 A, 230 V 3N~ 50 Hz (max. Betriebsstrom 27,5 A)' },
        { bezeichnung: 'VVM S320, 1~230 V', wert: 'LS C 32 A, 230 V~ 50 Hz (max. Betriebsstrom 32 A, Zusatzheizung 7 kW)' },
        { bezeichnung: 'Sicherungsautomat', wert: 'mindestens Auslösecharakteristik „C“' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'eigener FI, wenn im Gebäude ein FI vorhanden ist' },
        { bezeichnung: 'Trenneinrichtung', wert: 'allpoliger Schalter erforderlich' },
        { bezeichnung: 'Interner Schutz', wert: 'Sicherungsautomat FC1 (nicht bei 3x400 V), Sicherheitstemperaturbegrenzer FQ10 (Reset über FQ10-S2)' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss)',
          kabeltyp: 'Querschnitt nach verwendeter Absicherung – z. B. NYM-J 5x2,5 mm² (3~400 V, 16 A), NYM-J 5x6 mm² (3~230 V, 32 A), NYM-J 3x6 mm² (1~230 V, 32 A)',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X1 sowie X6-1 (PE) – das beiliegende Stromversorgungskabel ist dort werkseitig aufgelegt',
          klemmen: [
            { ader: 'Außenleiter L1 / L2 / L3 (bei 1~230 V nur L)', klemme: 'AA2-X1' },
            { ader: 'Neutralleiter N', klemme: 'AA2-X1' },
            { ader: 'Schutzleiter PE', klemme: 'AA2-X6-1' },
          ],
          hinweis: 'Welche Anschlussvariante vorliegt, steht auf dem Typenschild. Querschnitt zusätzlich nach Leitungslänge und Verlegeart prüfen.',
        },
        {
          verwendung: 'Separate Steuerspannung des Regelgeräts (nur 3~400 V, bei Tarifsteuerung)',
          kabeltyp: 'NYM-J 3x1,5 mm², 230 V~ 50 Hz',
          anschlussort: 'Grundkarte AA2, Anschlussklemmen X5 und X6-2',
          klemmen: [
            { ader: 'Außenleiter L', klemme: 'AA2-X5: L' },
            { ader: 'Neutralleiter N', klemme: 'AA2-X5: N' },
            { ader: 'Schutzleiter PE', klemme: 'AA2-X6-2' },
          ],
          hinweis: 'Vor dem Anschluss die Brücken an Anschlussklemme X5 entfernen. Den betreffenden Schaltschrank mit einer Warnung vor externer Spannung versehen.',
        },
        {
          verwendung: 'Kommunikation zur Luft-/Wasser-Wärmepumpe (S2125)',
          kabeltyp: 'abgeschirmtes 3-adriges Kabel, mind. 0,5 mm² bis 50 m (z. B. LiYCY, EKKX)',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X30',
          klemmen: [
            { ader: 'GND (Masse)', klemme: 'AA2-X30: 1' },
            { ader: 'B', klemme: 'AA2-X30: 3' },
            { ader: 'A', klemme: 'AA2-X30: 4' },
          ],
          hinweis: 'Gegenstelle: Außeneinheit S2125, Klemmleiste X22 (GND / A / B).',
        },
        {
          verwendung: 'Außenfühler (BT1)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Grundkarte AA2, Anschlussklemmen X28 und X29',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'AA2-X28: 14' },
            { ader: 'Fühler Ader 2 (GND)', klemme: 'AA2-X29 (beliebiger Eingang)' },
          ],
          hinweis: 'An der Nord- oder Nordwestseite im Schatten montieren. Kabelrohre abdichten, damit sich im Fühlergehäuse kein Kondensat bildet.',
        },
        {
          verwendung: 'Raumtemperaturfühler (BT50, liegt bei)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Grundkarte AA2, Anschlussklemmen X28 und X29',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'AA2-X28: 13' },
            { ader: 'Fühler Ader 2 (GND)', klemme: 'AA2-X29 (beliebiger Eingang)' },
          ],
        },
        {
          verwendung: 'Stromwandler / Leistungswächter (3~400 V, liegen bei)',
          kabeltyp: 'Mehrfachleiter, mind. 0,5 mm², gekapselt bis direkt an den Schaltkasten',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X30',
          klemmen: [
            { ader: 'gemeinsamer Anschluss der drei Wandler', klemme: 'AA2-X30: 9' },
            { ader: 'Stromwandler Außenleiter 1', klemme: 'AA2-X30: 10' },
            { ader: 'Stromwandler Außenleiter 2', klemme: 'AA2-X30: 11' },
            { ader: 'Stromwandler Außenleiter 3', klemme: 'AA2-X30: 12' },
          ],
          hinweis: 'Je ein Stromwandler auf jede eingehende Phase der Gebäudehauptversorgung, vorzugsweise direkt im Zählerschrank. Hauptsicherungsgröße in Menü 7.1.9 eintragen und Phasenerkennung aktivieren.',
        },
        {
          verwendung: '§14a EnWG / SG Ready',
          kabeltyp: '2x 2-adrige, potentialfreie Steuerleitung, mind. 0,5 mm²',
          anschlussort: 'Grundkarte AA2, zwei freie AUX-Eingänge auf Anschlussklemme X28 (X28:3–11) gegen GND auf X29',
          klemmen: [
            { ader: 'SG Ready A', klemme: 'AA2-X28: freier AUX-Eingang (3–11)' },
            { ader: 'SG Ready B', klemme: 'AA2-X28: zweiter freier AUX-Eingang (3–11)' },
            { ader: 'gemeinsame Masse', klemme: 'AA2-X29 (GND)' },
          ],
          hinweis: 'Beide Eingänge in Menü 7.4 als „SG Ready A“ bzw. „SG Ready B“ zuordnen. A geschlossen / B offen = Blockierung, beide offen = Normalbetrieb, A offen / B geschlossen = Niedrigpreismodus, beide geschlossen = Überkapazitätsmodus.',
        },
        {
          verwendung: 'Externer Wärmemengen-/Stromzähler (BE6, BE7)',
          kabeltyp: '2-adrig, mind. 0,5 mm², Impulsausgang',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X28 oder X30',
          klemmen: [
            { ader: 'Zähler 1', klemme: 'AA2-X28: 1-2' },
            { ader: 'Zähler 2', klemme: 'AA2-X30: 7-8' },
          ],
          hinweis: 'Zähler in Menü 7.2 aktivieren und Energie pro Impuls in Menü 7.2.19 einstellen.',
        },
        {
          verwendung: 'AUX-Ausgang (z. B. Brauchwasser-Zirkulationspumpe, externe Umwälzpumpe)',
          kabeltyp: 'NYM-J 3x1,5 mm², 230 V~ (Schaltleistung max. 2 A)',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X27 (potentialfrei umschaltendes Relais)',
          klemmen: [
            { ader: 'Schließer', klemme: 'AA2-X27: NO' },
            { ader: 'gemeinsamer Kontakt', klemme: 'AA2-X27: C' },
            { ader: 'Öffner', klemme: 'AA2-X27: NC' },
          ],
          hinweis: 'Funktion in Menü 7.4 aktivieren. Bei abgeschaltetem Innenmodul oder im Reservebetrieb liegt das Relais im Alarmzustand. Schaltschrank mit Warnung vor externer Spannung versehen.',
        },
        {
          verwendung: 'Zubehörplatine (AA5, z. B. AXC-Zubehör)',
          kabeltyp: 'LiYY oder EKKX, mind. 0,5 mm²',
          anschlussort: 'Grundkarte AA2, Anschlussklemme X30',
          klemmen: [
            { ader: 'GND', klemme: 'AA2-X30: 1' },
            { ader: 'B', klemme: 'AA2-X30: 3' },
            { ader: 'A', klemme: 'AA2-X30: 4' },
          ],
          hinweis: 'Mehrere Zubehörplatinen werden in Reihe geschaltet.',
        },
        {
          verwendung: 'myUplink (Netzwerkanschluss, alternativ zu WLAN)',
          kabeltyp: 'geschirmtes Netzwerkkabel Cat.5e/6',
          anschlussort: 'Bedienfeld AA4, Netzwerkanschluss XF8',
          hinweis: 'Kabel oben aus dem VVM S320 herausführen.',
        },
      ],
      hinweise: [
        'Beim Einführen der Kabel in das VVM S320 die Kabeldurchführungen UB1 und UB2 verwenden.',
        'Fühlerkabel für externe Schaltkontakte dürfen nicht in der Nähe von Starkstromleitungen verlegt werden.',
        'Kommunikations- und Fühlerkabel: mindestens 0,5 mm² bis 50 m Länge.',
        'Vor dem Isolationstest des Gebäudes darf das VVM S320 nicht angeschlossen sein.',
        'Vor dem Start Anschlüsse, Netz- und Phasenspannung prüfen, um Schäden an der Elektronik zu vermeiden.',
        'Die Anlage erst in Betrieb nehmen, nachdem sie mit Wasser befüllt wurde.',
      ],
    },
  },
  {
    id: 'nibe-smo-s40',
    title: 'Nibe Regelgerät – SMO S40 (SMO-Regelung)',
    category: CATEGORY.BASIS,
    manufacturer: 'nibe',
    regelung: 'smo',
    addon: null,
    available: true,
    tags: ['nibe', 'smo', 's40', 'regelgerät', 'steuermodul', 'wärmepumpe', 'aa100', 'klemme'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss des Nibe Steuermoduls SMO S40 für ein System mit Trinkwasserspeicher und externer, stufengesteuerter Zusatzheizung. Sämtliche bauseitigen Anschlüsse liegen auf der Verbindungskarte AA100 hinter der Frontabdeckung.',
      absicherung: [
        { bezeichnung: 'SMO S40', wert: 'LS C 10 A, 230 V~ 50 Hz (Schutzart IP21)' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'eigener FI, wenn im Gebäude ein FI vorhanden ist' },
        { bezeichnung: 'Trenneinrichtung', wert: 'allpoliger Sicherheitsschalter erforderlich' },
        { bezeichnung: 'Max. Last Relaisausgänge', wert: 'X5:1–4 und X8:1–3 je 2 (1) A; X6/X7 je 2 (0,3) A' },
        { bezeichnung: 'Max. Last Klemme AA100-X4 (L1)', wert: '6 (3) A' },
        { bezeichnung: 'Interne Feinsicherungen', wert: 'AA100-F1 und AA100-F2 je 6,3 AT; AA2-F1 4 AT' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss)',
          kabeltyp: 'NYM-J 3x1,5 mm² – Querschnitt nach verwendeter Absicherung',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemme X1 – Einführung über Kabeldurchführung UB1',
          klemmen: [
            { ader: 'Außenleiter L', klemme: 'AA100-X1: L' },
            { ader: 'Neutralleiter N', klemme: 'AA100-X1: N' },
            { ader: 'Schutzleiter PE', klemme: 'AA100-X1: PE' },
          ],
          hinweis: 'Anzugsmoment 0,5 – 0,6 Nm.',
        },
        {
          verwendung: 'Kommunikation zur Luft-/Wasser-Wärmepumpe (S2125)',
          kabeltyp: 'abgeschirmtes 3-adriges Kabel, mind. 0,5 mm² bis 50 m (z. B. LiYCY, EKKX)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemme X9 – Einführung über Kabeldurchführung UB2',
          klemmen: [
            { ader: 'A', klemme: 'AA100-X9: 4' },
            { ader: 'B', klemme: 'AA100-X9: 5' },
            { ader: 'GND (Masse)', klemme: 'AA100-X9: 6' },
          ],
          hinweis: 'Schirm auf die dafür vorgesehene Kabelschelle auflegen. Gegenstelle: Außeneinheit S2125, Klemmleiste X22 (A / B / GND).',
        },
        {
          verwendung: 'Außenfühler (BT1)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X10 und X11',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'AA100-X10: 1' },
            { ader: 'Fühler Ader 2 (GND)', klemme: 'AA100-X11 (GND)' },
          ],
          hinweis: 'An der Nord- oder Nordwestseite im Schatten montieren. Kabelrohre abdichten.',
        },
        {
          verwendung: 'Raumtemperaturfühler (BT50, liegt bei)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X10 und X11',
          klemmen: [
            { ader: 'Fühler Ader 1', klemme: 'AA100-X10: 2' },
            { ader: 'Fühler Ader 2 (GND)', klemme: 'AA100-X11 (GND)' },
          ],
        },
        {
          verwendung: 'Fühler Brauchwasserbereitung (BT6) und Brauchwasser oben (BT7)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X10 und X11',
          klemmen: [
            { ader: 'BT6 (Bereitung, Tauchhülse im Speicher)', klemme: 'AA100-X10: 3 + X11 (GND)' },
            { ader: 'BT7 (Brauchwasser oben)', klemme: 'AA100-X10: 4 + X11 (GND)' },
          ],
          hinweis: 'BT6 ist für die Brauchwasserbereitung zwingend erforderlich, BT7 optional.',
        },
        {
          verwendung: 'Externer Vorlauffühler (BT25) und externer Rücklauffühler (BT71)',
          kabeltyp: '2-adrig, mind. 0,5 mm² (z. B. LiYY, EKKX)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X10 und X11',
          klemmen: [
            { ader: 'BT25 (Vorlauf)', klemme: 'AA100-X10: 5 + X11 (GND)' },
            { ader: 'BT71 (Rücklauf)', klemme: 'AA100-X10: 6 + X11 (GND)' },
          ],
        },
        {
          verwendung: 'Ladepumpe der Wärmepumpe (AA35-GP12.1-EB101)',
          kabeltyp: 'NYM-J 3x1,5 mm², 230 V~ + Steuerleitung 2x0,5 mm²',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X2 / X3 / X5 (Versorgung) und X12 / X13 (Steuersignal)',
          klemmen: [
            { ader: 'Schutzleiter PE', klemme: 'AA100-X2' },
            { ader: 'Neutralleiter N', klemme: 'AA100-X3' },
            { ader: 'Außenleiter L (230 V, geschaltet)', klemme: 'AA100-X5: 3' },
            { ader: 'Steuersignal PWM / 0–10 V', klemme: 'AA100-X12: 1' },
            { ader: 'Masse Steuersignal', klemme: 'AA100-X13 (GND)' },
          ],
          hinweis: 'Bei einer zweiten Wärmepumpe wird deren Ladepumpe (GP12.2-EB102) auf AA100-X5:4 und AA100-X12:3 gelegt.',
        },
        {
          verwendung: 'Externe Umwälzpumpe Heizungsmedium (GP10)',
          kabeltyp: 'NYM-J 3x1,5 mm², 230 V~',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X2 / X3 / X5',
          klemmen: [
            { ader: 'Schutzleiter PE', klemme: 'AA100-X2' },
            { ader: 'Neutralleiter N', klemme: 'AA100-X3' },
            { ader: 'Außenleiter L (230 V, geschaltet)', klemme: 'AA100-X5: 2' },
          ],
        },
        {
          verwendung: 'Umschaltventil Heizung / Brauchwasser (QN10)',
          kabeltyp: 'NYM-J 3x1,5 mm² bzw. Anschlussleitung des Ventils, 230 V~',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X3 / X4 / X5',
          klemmen: [
            { ader: 'Neutralleiter N', klemme: 'AA100-X3: N' },
            { ader: 'Steuerleitung (230 V, geschaltet)', klemme: 'AA100-X5: 1' },
            { ader: 'Außenleiter L (Dauerspannung)', klemme: 'AA100-X4: L' },
          ],
          hinweis: 'Brauchwasserbereitung anschließend in Menü 7.2.1 aktivieren.',
        },
        {
          verwendung: 'Externe stufengesteuerte Zusatzheizung (bis 3 Stufen)',
          kabeltyp: 'Steuerleitung NYM-J 3x1,5 mm² bzw. je Stufe 1 Ader, 230 V~',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemme X8 (potentialfreie Relais)',
          klemmen: [
            { ader: 'Stufe 1', klemme: 'AA100-X8: 1' },
            { ader: 'Stufe 2', klemme: 'AA100-X8: 2' },
            { ader: 'Stufe 3', klemme: 'AA100-X8: 3' },
            { ader: 'gemeinsame Steuerspannung (Brücke von AA100-X4: L)', klemme: 'AA100-X8: C' },
            { ader: 'Neutralleiter N', klemme: 'AA100-X3: N' },
          ],
          hinweis: 'Werden die Relais für Steuerspannung genutzt, eine Brücke von AA100-X4:L auf AA100-X8:C setzen. Einstellungen in Menü 7.1.5. Zuschaltung im Abstand von mind. 1 Minute, Abschaltung mind. 3 Sekunden. Zwischenverteiler mit Warnung vor externer Spannung kennzeichnen.',
        },
        {
          verwendung: 'Stromwandler / Leistungswächter',
          kabeltyp: 'Mehrfachleiter, mind. 0,5 mm², gekapselt bis direkt an den Zählerschrank',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X14 und X13',
          klemmen: [
            { ader: 'Stromwandler Außenleiter 1', klemme: 'AA100-X14: BE1' },
            { ader: 'Stromwandler Außenleiter 2', klemme: 'AA100-X14: BE2' },
            { ader: 'Stromwandler Außenleiter 3', klemme: 'AA100-X14: BE3' },
            { ader: 'gemeinsame Masse', klemme: 'AA100-X13 (GND)' },
          ],
          hinweis: 'Je ein Stromwandler auf jede eingehende Phase. Hauptsicherungsgröße in Menü 7.1.9 eintragen und Phasenerkennung aktivieren.',
        },
        {
          verwendung: 'Impuls-Energiezähler (BE6–BE8 bzw. BF1–BF3)',
          kabeltyp: '2-adrig, mind. 0,5 mm², Impulsausgang',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemme X14',
          klemmen: [
            { ader: 'Zähler 1', klemme: 'AA100-X14: 6-7' },
            { ader: 'Zähler 2', klemme: 'AA100-X14: 8-9' },
            { ader: 'Zähler 3', klemme: 'AA100-X14: 10-11' },
          ],
          hinweis: 'Zähler in Menü 7.2 aktivieren, Impulswertigkeit in Menü 7.2.19 einstellen.',
        },
        {
          verwendung: '§14a EnWG / SG Ready',
          kabeltyp: '2x 2-adrige, potentialfreie Steuerleitung, mind. 0,5 mm²',
          anschlussort: 'Verbindungskarte AA100, zwei freie AUX-Eingänge auf Anschlussklemme X10 (X10:7–12) gegen GND auf X11',
          klemmen: [
            { ader: 'SG Ready A', klemme: 'AA100-X10: freier AUX-Eingang (7–12)' },
            { ader: 'SG Ready B', klemme: 'AA100-X10: zweiter freier AUX-Eingang (7–12)' },
            { ader: 'gemeinsame Masse', klemme: 'AA100-X11 (GND)' },
          ],
          hinweis: 'Beide Eingänge in Menü 7.4 als „SG Ready A“ bzw. „SG Ready B“ zuordnen. A geschlossen / B offen = Blockierung, beide offen = Normalbetrieb, A offen / B geschlossen = Niedrigpreismodus, beide geschlossen = Überkapazitätsmodus.',
        },
        {
          verwendung: 'AUX-Ausgänge (AUX10 / AUX11, z. B. Brauchwasser-Zirkulationspumpe, Sammelalarm)',
          kabeltyp: 'NYM-J 3x1,5 mm², 230 V~ (Schaltleistung max. 2 (0,3) A)',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemmen X6 (AUX10) und X7 (AUX11) – potentialfrei umschaltende Relais',
          klemmen: [
            { ader: 'Schließer / gemeinsam / Öffner AUX10', klemme: 'AA100-X6: NO / C / NC' },
            { ader: 'Schließer / gemeinsam / Öffner AUX11', klemme: 'AA100-X7: NO / C / NC' },
          ],
          hinweis: 'Bei abgeschaltetem SMO S40 oder im Reservebetrieb liegt das Relais in Stellung C-NC. Schaltschrank mit Warnung vor externer Spannung versehen.',
        },
        {
          verwendung: 'Zubehörplatine (AA5, z. B. AXC-Zubehör)',
          kabeltyp: 'LiYY oder EKKX, mind. 0,5 mm²',
          anschlussort: 'Verbindungskarte AA100, Anschlussklemme X9',
          klemmen: [
            { ader: 'Zubehörbus', klemme: 'AA100-X9: 8–10' },
          ],
          hinweis: 'Mehrere Zubehörplatinen werden in Reihe geschaltet.',
        },
        {
          verwendung: 'myUplink (Netzwerkanschluss, alternativ zu WLAN)',
          kabeltyp: 'Patchkabel Cat.5e/6',
          anschlussort: 'Bedienfeld AA4, Netzwerkanschluss XF8',
        },
      ],
      hinweise: [
        'Beim Einführen der Kabel die Kabeldurchführungen UB1 (Stromversorgung, Zubehörversorgung) und UB2 (Kommunikation) verwenden.',
        'Fühlerkabel für externe Schaltkontakte dürfen nicht in der Nähe von Starkstromleitungen verlegt werden.',
        'Kommunikations- und Fühlerkabel: mindestens 0,5 mm² bis 50 m Länge (z. B. EKKX, LiYY).',
        'Die Verdichtersperre wird entweder am SMO S40 oder an der Wärmepumpe ausgeführt – niemals an beiden Stellen gleichzeitig.',
        'Vor dem Isolationstest des Gebäudes muss das SMO S40 abgeklemmt werden.',
        'Die Anlage erst in Betrieb nehmen, nachdem das Klimatisierungssystem mit Wasser befüllt und entlüftet wurde.',
      ],
    },
  },

  // ---------------------------------------------------------------------
  // ZUSÄTZLICHE INSTALLATIONEN
  // ---------------------------------------------------------------------
  {
    id: 'addon-unterverteilung',
    title: 'Zusätzliche Installation – Unterverteilung',
    category: CATEGORY.ZUSATZ,
    manufacturer: null,
    regelung: null,
    addon: 'unterverteilung',
    available: true,
    tags: ['unterverteilung', 'vorsicherung'],
    content: {
      kurzbeschreibung: 'Vorsicherung für eine zusätzliche Unterverteilung im Rahmen der Wärmepumpen-Installation.',
      absicherung: [{ bezeichnung: 'Vorsicherung Unterverteilung', wert: 'LS C 32A, 3~400V' }],
      kabel: [],
      hinweise: ['Weitere Angaben zu dieser Zusatzinstallation folgen.'],
    },
  },
  {
    id: 'addon-apz-feld',
    title: 'Zusätzliche Installation – Ext. APZ-Feld',
    category: CATEGORY.ZUSATZ,
    manufacturer: null,
    regelung: null,
    addon: 'apz-feld',
    available: false,
    tags: ['apz-feld', 'zählerplatz'],
    content: null,
  },
  {
    id: 'addon-bem',
    title: 'Zusätzliche Installation – Bosch Energie Management (BEM)',
    category: CATEGORY.ZUSATZ,
    manufacturer: 'bosch',
    regelung: null,
    addon: 'bem',
    available: false,
    tags: ['bem', 'bosch', 'energie management', 'home energy manager'],
    content: null,
  },
  {
    id: 'addon-sg-ready-box',
    title: 'Zusätzliche Installation – §14a-/SG-Ready-Steuerbox',
    category: CATEGORY.ZUSATZ,
    manufacturer: null,
    regelung: null,
    addon: 'sg-ready-box',
    available: false,
    tags: ['sg-ready', '§14a', 'steuerbox', 'enwg'],
    content: null,
  },
  {
    id: 'addon-pv-kommunikation',
    title: 'Zusätzliche Installation – PV-Wechselrichter-Kommunikation',
    category: CATEGORY.ZUSATZ,
    manufacturer: null,
    regelung: null,
    addon: 'pv-kommunikation',
    available: false,
    tags: ['pv', 'photovoltaik', 'wechselrichter'],
    content: null,
  },
];

/**
 * Liefert alle Basisgerät-Datenblätter, die zur Hersteller-/Regelungs-
 * Auswahl passen.
 */
export function getBaseDatasheets(hersteller, regelung) {
  return DATASHEETS.filter((d) => {
    if (d.category !== CATEGORY.BASIS) return false;
    if (d.manufacturer !== hersteller) return false;
    if (d.regelung !== null && d.regelung !== regelung) return false;
    return true;
  });
}

/** Liefert das Datenblatt zu einer gewählten Zusatzinstallation. */
export function getAddonDatasheet(addonId) {
  return DATASHEETS.find((d) => d.addon === addonId) || null;
}

/** Liefert ein Datenblatt anhand seiner ID. */
export function getDatasheetById(id) {
  return DATASHEETS.find((d) => d.id === id) || null;
}

/** Freitextsuche über Titel, Kategorie und Tags. */
export function searchDatasheets(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DATASHEETS.filter((d) => {
    const haystack = [d.title, d.category, ...(d.tags || [])].join(' ').toLowerCase();
    return haystack.includes(q);
  });
}
