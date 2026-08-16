// ============================================================================
// HP Elektroleitfaden – Datenmodell
// ----------------------------------------------------------------------------
// Diese Datei enthält ausschließlich Daten (keine Logik). Neue Datenblätter
// oder Zusatzinstallationen werden ausschließlich hier ergänzt.
//
// Ein Datenblatt mit available:false besitzt bereits eine Detailseite in der
// App, zeigt dort aber einen Platzhalter an, bis content befüllt wird.
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
 */
export const DATASHEETS = [
  // ---------------------------------------------------------------------
  // BOSCH – Basisgeräte
  // ---------------------------------------------------------------------
  {
    id: 'bosch-aussen',
    title: 'Bosch Wärmepumpe – Außeneinheit (Compress AW-Serie)',
    category: CATEGORY.BASIS,
    manufacturer: 'bosch',
    regelung: null,
    addon: null,
    available: true,
    tags: ['bosch', 'außeneinheit', 'aw', 'compress', 'split', 'wärmepumpe'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss der Bosch Wärmepumpen-Außeneinheit (Compress AW-Serie). Der Anschluss ist bei allen Baugrößen identisch.',
      absicherung: [
        { bezeichnung: 'Außeneinheit', wert: 'LS C 16A, 1~230V' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'nicht erforderlich' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss)',
          kabeltyp: 'NYM-J 3x1,5 mm² (Querschnitt abhängig von Leitungslänge prüfen)',
          anschlussort: 'Netzanschlussklemmen im Schaltkasten der Außeneinheit, eigener Kabelkanal',
          hinweis: 'Getrennt vom CAN-BUS-Kabelkanal verlegen.',
        },
        {
          verwendung: 'Kommunikation (CAN-BUS zur Inneneinheit)',
          kabeltyp: 'mind. 4x0,75 mm², geschirmt (z. B. LiYCY)',
          anschlussort: 'CAN-BUS-Klemmen im Schaltkasten der Außeneinheit, eigener Kabelkanal',
          hinweis: 'Max. Länge 30 m. Mindestabstand 100 mm zu Starkstromleitungen einhalten.',
        },
        {
          verwendung: 'Rohrbegleitheizung (Kondensatablauf, Zubehör)',
          kabeltyp: 'Anschlussleitung des Heizbandes gemäß Zubehör-Installationsanleitung',
          anschlussort: 'Anschlussklemme im Schaltkasten der Außeneinheit',
          hinweis: 'Nur bei frostgefährdeter Verlegung des Kondensatablaufs erforderlich.',
        },
      ],
      hinweise: [
        'Netz- und Kommunikationsleitung getrennt voneinander verlegen, um Störungen zu vermeiden.',
        'Leiterquerschnitte immer nach tatsächlicher Leitungslänge und Verlegeart prüfen.',
      ],
    },
  },
  {
    id: 'bosch-innen',
    title: 'Bosch Inneneinheit – Compress-Serie',
    category: CATEGORY.BASIS,
    manufacturer: 'bosch',
    regelung: null,
    addon: null,
    available: true,
    tags: ['bosch', 'inneneinheit', 'compress', 'wärmepumpe'],
    content: {
      kurzbeschreibung:
        'Elektrischer Anschluss der Bosch Compress-Inneneinheit. Der Anschluss ist bei allen Baugrößen identisch.',
      absicherung: [
        { bezeichnung: 'Inneneinheit', wert: 'LS B 16A, 3~400V' },
        { bezeichnung: 'FI-Schutzschalter', wert: 'nicht erforderlich' },
      ],
      kabel: [
        {
          verwendung: 'Zuleitung (Netzanschluss)',
          kabeltyp: 'NYM-J 5x1,5 mm² (Querschnitt abhängig von Leitungslänge prüfen)',
          anschlussort: 'Netzklemmen im Schaltkasten der Inneneinheit',
          hinweis: '',
        },
        {
          verwendung: 'Kommunikation (CAN-BUS zur Außeneinheit)',
          kabeltyp: 'mind. 4x0,75 mm², geschirmt (z. B. LiYCY)',
          anschlussort: 'CAN-BUS-Klemmen im Schaltkasten der Inneneinheit',
          hinweis: 'Max. Länge 30 m. Mindestabstand 100 mm zu Starkstromleitungen einhalten.',
        },
        {
          verwendung: 'Außenfühler (T1)',
          kabeltyp: '2x0,75 mm² Fühlerleitung (z. B. LiYY)',
          anschlussort: 'Installationsmodul, Klemme T1',
          hinweis: '',
        },
        {
          verwendung: 'Trinkwasserspeicher-Fühler (TW1)',
          kabeltyp: '2x0,75 mm² Fühlerleitung (z. B. LiYY)',
          anschlussort: 'Installationsmodul, Klemme TW1',
          hinweis: '',
        },
        {
          verwendung: 'Zirkulationspumpe (PW2)',
          kabeltyp: 'Steuerleitung 2x0,75 mm² + Netzanschluss 230V (Querschnitt je nach Pumpenleistung)',
          anschlussort: 'Installationsmodul, Klemme PW2',
          hinweis: '',
        },
        {
          verwendung: '§14a EnWG / Smart Grid (Externer Eingang 4)',
          kabeltyp: '2-adrige, potentialfreie Steuerleitung',
          anschlussort: 'Installationsmodul, Klemme „Externer Eingang 4 (Smart Grid)“',
          hinweis: 'Ansteuerung durch den Netzbetreiber bzw. die Steuerbox.',
        },
        {
          verwendung: 'Internet / LAN',
          kabeltyp: 'Patchkabel Cat.5e/6',
          anschlussort: 'LAN-Buchse der Bedieneinheit bzw. des Internet-Gateways',
          hinweis: '',
        },
      ],
      hinweise: [
        'Fühler- und Buskabel mit Mindestabstand 100 mm getrennt von Netzleitungen verlegen.',
        'Leiterquerschnitte immer nach tatsächlicher Leitungslänge und Verlegeart prüfen.',
      ],
    },
  },

  // ---------------------------------------------------------------------
  // NIBE – Basisgeräte (Platzhalter, folgen separat)
  // ---------------------------------------------------------------------
  {
    id: 'nibe-standard',
    title: 'Nibe Wärmepumpensystem – Standard-Regelung',
    category: CATEGORY.BASIS,
    manufacturer: 'nibe',
    regelung: 'standard',
    addon: null,
    available: false,
    tags: ['nibe', 'standard', 'wärmepumpe'],
    content: null,
  },
  {
    id: 'nibe-smo',
    title: 'Nibe Wärmepumpensystem – SMO-Regelung',
    category: CATEGORY.BASIS,
    manufacturer: 'nibe',
    regelung: 'smo',
    addon: null,
    available: false,
    tags: ['nibe', 'smo', 'wärmepumpe'],
    content: null,
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
