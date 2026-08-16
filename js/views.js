// ============================================================================
// HP Elektroleitfaden – Ansichten
// ----------------------------------------------------------------------------
// Jede render*-Funktion baut eine komplette Ansicht in den übergebenen
// Container. Es wird ausschließlich mit der DOM-API gearbeitet (kein
// innerHTML mit dynamischem Inhalt), damit die Ausgabe immer sauber und
// vorhersehbar bleibt.
// ============================================================================

import {
  MANUFACTURERS,
  REGELUNGEN,
  ADDONS,
  getBaseDatasheets,
  getAddonDatasheet,
  getDatasheetById,
  searchDatasheets,
  DATASHEETS,
} from './data.js';
import { getSelection, setSelection, resetSelection } from './state.js';

// ---------------------------------------------------------------------------
// Kleine DOM-Hilfsfunktion
// ---------------------------------------------------------------------------

function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(options).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  });
  const kids = Array.isArray(children) ? children : [children];
  kids.forEach((child) => {
    if (child === null || child === undefined || child === false) return;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return node;
}

function clear(container) {
  container.textContent = '';
}

function navigate(path) {
  window.location.hash = path;
}

function openDatasheet(id) {
  const url = `${window.location.origin}${window.location.pathname}#/datenblatt/${id}`;
  window.open(url, '_blank', 'noopener');
}

// ---------------------------------------------------------------------------
// Wiederkehrende Bausteine
// ---------------------------------------------------------------------------

function appHeader(subtitle) {
  return el('header', { class: 'app-header' }, [
    el('div', { class: 'app-header__inner' }, [
      el('span', { class: 'app-header__mark', 'aria-hidden': 'true' }, '⏚'),
      el('div', {}, [
        el('p', { class: 'app-header__title', text: 'HP Elektroleitfaden' }),
        subtitle ? el('p', { class: 'app-header__subtitle', text: subtitle }) : null,
      ]),
    ]),
  ]);
}

function wizardSteps(hersteller) {
  return hersteller === 'nibe'
    ? ['Hersteller', 'Regelung', 'Zusatzinstallationen']
    : ['Hersteller', 'Zusatzinstallationen'];
}

function stepper(steps, activeIndex) {
  const list = el(
    'ol',
    { class: 'stepper' },
    steps.map((label, index) =>
      el('li', { class: `stepper__item${index === activeIndex ? ' is-active' : ''}${index < activeIndex ? ' is-done' : ''}` }, [
        el('span', { class: 'stepper__index', text: String(index + 1) }),
        el('span', { class: 'stepper__label', text: label }),
      ])
    )
  );
  return el('nav', { class: 'stepper-wrap', 'aria-label': 'Fortschritt der Systembestimmung' }, [list]);
}

function badge(text, tone) {
  return el('span', { class: `badge badge--${tone}`, text });
}

function availabilityBadge(available) {
  return available ? badge('Verfügbar', 'ok') : badge('In Bearbeitung', 'pending');
}

/** Klickbare Kachel für ein Datenblatt in einer Ergebnis- bzw. Suchliste. */
function datasheetListItem(datasheet) {
  return el(
    'button',
    {
      class: 'sheet-item',
      type: 'button',
      onClick: () => openDatasheet(datasheet.id),
    },
    [
      el('div', { class: 'sheet-item__text' }, [
        el('p', { class: 'sheet-item__category', text: datasheet.category }),
        el('p', { class: 'sheet-item__title', text: datasheet.title }),
      ]),
      el('div', { class: 'sheet-item__meta' }, [availabilityBadge(datasheet.available), el('span', { class: 'sheet-item__arrow', 'aria-hidden': 'true', text: '↗' })]),
    ]
  );
}

// ---------------------------------------------------------------------------
// Generischer Auswahl-Schritt (Hersteller / Regelung / Zusatzinstallationen)
// ---------------------------------------------------------------------------

function renderChoicePage(container, config) {
  const {
    subtitle,
    steps,
    stepIndex,
    heading,
    description,
    options,
    multi = false,
    initialSelected,
    onBack,
    onContinue,
    continueLabel = 'Weiter',
    allowEmpty = false,
  } = config;

  let selected = multi ? new Set(initialSelected || []) : initialSelected || null;

  clear(container);

  const continueBtn = el('button', {
    class: 'btn btn--primary',
    type: 'button',
    onClick: () => onContinue(multi ? Array.from(selected) : selected),
  }, continueLabel);

  function refreshContinueState() {
    const hasSelection = multi ? selected.size > 0 : Boolean(selected);
    continueBtn.disabled = !(hasSelection || allowEmpty);
  }

  const optionCards = options.map((option) => {
    const isChecked = multi ? selected.has(option.id) : selected === option.id;
    const card = el(
      'button',
      {
        class: `option-card${isChecked ? ' is-selected' : ''}`,
        type: 'button',
        role: multi ? 'checkbox' : 'radio',
        'aria-checked': String(isChecked),
        onClick: () => {
          if (multi) {
            if (selected.has(option.id)) selected.delete(option.id);
            else selected.add(option.id);
          } else {
            selected = option.id;
          }
          syncCards();
          refreshContinueState();
        },
      },
      [
        el('span', { class: 'option-card__control', 'aria-hidden': 'true' }),
        el('span', { class: 'option-card__text' }, [
          el('span', { class: 'option-card__label', text: option.label }),
          option.description ? el('span', { class: 'option-card__description', text: option.description }) : null,
        ]),
      ]
    );
    card.dataset.optionId = option.id;
    return card;
  });

  function syncCards() {
    optionCards.forEach((card) => {
      const isChecked = multi ? selected.has(card.dataset.optionId) : selected === card.dataset.optionId;
      card.classList.toggle('is-selected', isChecked);
      card.setAttribute('aria-checked', String(isChecked));
    });
  }

  refreshContinueState();

  const footer = el('div', { class: 'wizard-footer' }, [
    onBack ? el('button', { class: 'btn btn--ghost', type: 'button', onClick: onBack }, 'Zurück') : el('span'),
    continueBtn,
  ]);

  container.appendChild(
    el('div', { class: 'page page--wizard' }, [
      appHeader(subtitle),
      el('div', { class: 'page__content' }, [
        stepper(steps, stepIndex),
        el('h1', { class: 'page__heading', text: heading }),
        description ? el('p', { class: 'page__description', text: description }) : null,
        el('div', { class: 'option-list' }, optionCards),
        footer,
      ]),
    ])
  );
}

// ---------------------------------------------------------------------------
// Startseite
// ---------------------------------------------------------------------------

export function renderStart(container) {
  clear(container);

  const determineCard = el('button', { class: 'entry-card entry-card--primary', type: 'button', onClick: () => {
    resetSelection();
    navigate('/wizard/hersteller');
  } }, [
    el('span', { class: 'entry-card__eyebrow', text: 'Geführte Bestimmung' }),
    el('span', { class: 'entry-card__title', text: 'Komplettes System bestimmen' }),
    el('span', { class: 'entry-card__description', text: 'Schritt für Schritt durch Hersteller, Regelung und Zusatzinstallationen zu den passenden Datenblättern.' }),
    el('span', { class: 'entry-card__cta', text: 'Bestimmung starten →' }),
  ]);

  const searchCard = el('button', { class: 'entry-card', type: 'button', onClick: () => navigate('/suche') }, [
    el('span', { class: 'entry-card__eyebrow', text: 'Direktzugriff' }),
    el('span', { class: 'entry-card__title', text: 'Datenblatt direkt suchen' }),
    el('span', { class: 'entry-card__description', text: 'Ohne Bestimmungsassistent direkt zu einem einzelnen Datenblatt springen.' }),
    el('span', { class: 'entry-card__cta', text: 'Zur Suche →' }),
  ]);

  container.appendChild(
    el('div', { class: 'page page--start' }, [
      appHeader('Elektroleitfaden für die Wärmepumpen-Installation'),
      el('div', { class: 'page__content' }, [
        el('div', { class: 'entry-grid' }, [determineCard, searchCard]),
      ]),
    ])
  );
}

// ---------------------------------------------------------------------------
// Schritt 1: Hersteller
// ---------------------------------------------------------------------------

export function renderWizardHersteller(container) {
  const selection = getSelection();

  renderChoicePage(container, {
    subtitle: 'Systembestimmung',
    steps: wizardSteps(selection.hersteller),
    stepIndex: 0,
    heading: 'Welcher Hersteller wird verbaut?',
    description: 'Wähle den Hersteller der zu installierenden Wärmepumpe.',
    options: MANUFACTURERS,
    initialSelected: selection.hersteller,
    onBack: () => navigate('/'),
    onContinue: (hersteller) => {
      const resetRegelung = hersteller !== selection.hersteller;
      setSelection({ hersteller, regelung: resetRegelung ? null : selection.regelung });
      navigate(hersteller === 'nibe' ? '/wizard/regelung' : '/wizard/zusatz');
    },
  });
}

// ---------------------------------------------------------------------------
// Schritt 2 (nur Nibe): Regelung
// ---------------------------------------------------------------------------

export function renderWizardRegelung(container) {
  const selection = getSelection();

  renderChoicePage(container, {
    subtitle: 'Systembestimmung',
    steps: wizardSteps(selection.hersteller),
    stepIndex: 1,
    heading: 'Welche Regelung kommt zum Einsatz?',
    description: 'Bei Nibe-Systemen wird zwischen SMO-Regelung und Standard-Regelung unterschieden.',
    options: REGELUNGEN,
    initialSelected: selection.regelung,
    onBack: () => navigate('/wizard/hersteller'),
    onContinue: (regelung) => {
      setSelection({ regelung });
      navigate('/wizard/zusatz');
    },
  });
}

// ---------------------------------------------------------------------------
// Schritt 3: Zusatzinstallationen
// ---------------------------------------------------------------------------

export function renderWizardZusatz(container) {
  const selection = getSelection();
  const steps = wizardSteps(selection.hersteller);
  const availableAddons = ADDONS.filter((addon) => addon.manufacturers.includes(selection.hersteller));

  renderChoicePage(container, {
    subtitle: 'Systembestimmung',
    steps,
    stepIndex: steps.length - 1,
    heading: 'Welche zusätzlichen Installationen gibt es?',
    description: 'Mehrfachauswahl möglich. Wenn keine Zusatzinstallation vorliegt, einfach direkt fortfahren.',
    options: availableAddons,
    multi: true,
    initialSelected: selection.zusatz,
    allowEmpty: true,
    continueLabel: 'Zu den Datenblättern',
    onBack: () => navigate(selection.hersteller === 'nibe' ? '/wizard/regelung' : '/wizard/hersteller'),
    onContinue: (zusatz) => {
      setSelection({ zusatz });
      navigate('/ergebnisse');
    },
  });
}

// ---------------------------------------------------------------------------
// Ergebnisseite
// ---------------------------------------------------------------------------

export function renderErgebnisse(container) {
  clear(container);
  const selection = getSelection();

  const baseSheets = getBaseDatasheets(selection.hersteller, selection.regelung);
  const addonSheets = selection.zusatz.map((id) => getAddonDatasheet(id)).filter(Boolean);
  const allSheets = [...baseSheets, ...addonSheets];

  const herstellerLabel = MANUFACTURERS.find((m) => m.id === selection.hersteller)?.label || '—';
  const regelungLabel = REGELUNGEN.find((r) => r.id === selection.regelung)?.label || '—';
  const zusatzLabels = selection.zusatz
    .map((id) => ADDONS.find((a) => a.id === id)?.label)
    .filter(Boolean);

  const summary = el('div', { class: 'summary-panel' }, [
    el('div', { class: 'summary-row' }, [el('span', { class: 'summary-row__label', text: 'Hersteller' }), el('span', { class: 'summary-row__value', text: herstellerLabel })]),
    selection.hersteller === 'nibe'
      ? el('div', { class: 'summary-row' }, [el('span', { class: 'summary-row__label', text: 'Regelung' }), el('span', { class: 'summary-row__value', text: regelungLabel })])
      : null,
    el('div', { class: 'summary-row' }, [
      el('span', { class: 'summary-row__label', text: 'Zusatzinstallationen' }),
      el('span', { class: 'summary-row__value', text: zusatzLabels.length ? zusatzLabels.join(', ') : 'keine' }),
    ]),
  ]);

  container.appendChild(
    el('div', { class: 'page page--results' }, [
      appHeader('Ergebnis der Systembestimmung'),
      el('div', { class: 'page__content' }, [
        summary,
        el('h2', { class: 'section-heading', text: 'Passende Datenblätter' }),
        el('div', { class: 'sheet-list' }, allSheets.map(datasheetListItem)),
        el('div', { class: 'results-footer' }, [
          el('button', { class: 'btn btn--ghost', type: 'button', onClick: () => navigate('/wizard/zusatz') }, 'Auswahl anpassen'),
          el('button', { class: 'btn btn--primary', type: 'button', onClick: () => { resetSelection(); navigate('/'); } }, 'Neue Bestimmung starten'),
        ]),
      ]),
    ])
  );
}

// ---------------------------------------------------------------------------
// Suche
// ---------------------------------------------------------------------------

export function renderSuche(container) {
  clear(container);

  const resultsWrap = el('div', { class: 'sheet-list' });

  function renderResults(query) {
    clear(resultsWrap);
    const items = query.trim() ? searchDatasheets(query) : DATASHEETS;
    if (items.length === 0) {
      resultsWrap.appendChild(el('p', { class: 'empty-state', text: 'Keine Datenblätter gefunden.' }));
      return;
    }
    items.forEach((item) => resultsWrap.appendChild(datasheetListItem(item)));
  }

  const input = el('input', {
    class: 'search-input',
    type: 'search',
    placeholder: 'z. B. Bosch, Inneneinheit, Unterverteilung …',
    'aria-label': 'Datenblätter durchsuchen',
    onInput: (event) => renderResults(event.target.value),
  });

  renderResults('');

  container.appendChild(
    el('div', { class: 'page page--search' }, [
      appHeader('Datenblatt-Suche'),
      el('div', { class: 'page__content' }, [
        el('button', { class: 'btn btn--ghost btn--back', type: 'button', onClick: () => navigate('/') }, '← Zur Startseite'),
        input,
        resultsWrap,
      ]),
    ])
  );

  input.focus();
}

// ---------------------------------------------------------------------------
// Datenblatt (immer im eigenen Fenster / Tab geöffnet)
// ---------------------------------------------------------------------------

function specTable(rows) {
  return el(
    'div',
    { class: 'terminal-block' },
    rows.map((row) =>
      el('div', { class: 'terminal-row' }, [
        el('span', { class: 'terminal-row__label', text: row.bezeichnung }),
        el('span', { class: 'terminal-row__value', text: row.wert }),
      ])
    )
  );
}

function cableTable(rows) {
  return el(
    'div',
    { class: 'cable-list' },
    rows.map((row, index) =>
      el('div', { class: 'cable-item' }, [
        el('span', { class: 'cable-item__index', 'aria-hidden': 'true', text: String(index + 1).padStart(2, '0') }),
        el('div', { class: 'cable-item__body' }, [
          el('p', { class: 'cable-item__verwendung', text: row.verwendung }),
          el('p', { class: 'cable-item__kabeltyp', text: row.kabeltyp }),
          el('p', { class: 'cable-item__anschlussort', text: `Anschluss: ${row.anschlussort}` }),
          row.hinweis ? el('p', { class: 'cable-item__hinweis', text: row.hinweis }) : null,
        ]),
      ])
    )
  );
}

export function renderDatenblatt(container, id) {
  clear(container);
  const sheet = getDatasheetById(id);

  if (!sheet) {
    renderNotFound(container);
    return;
  }

  const closeBtn = el('button', {
    class: 'btn btn--ghost',
    type: 'button',
    onClick: () => {
      window.close();
      // Falls das Fenster nicht per Skript geöffnet wurde, lässt sich
      // window.close() nicht ausführen – dann zur Startseite navigieren.
      navigate('/');
    },
  }, 'Fenster schließen');

  const header = el('header', { class: 'sheet-header' }, [
    el('div', {}, [
      el('p', { class: 'sheet-header__category', text: sheet.category }),
      el('h1', { class: 'sheet-header__title', text: sheet.title }),
    ]),
    closeBtn,
  ]);

  const body = sheet.available
    ? el('div', { class: 'sheet-body' }, [
        el('p', { class: 'sheet-body__intro', text: sheet.content.kurzbeschreibung }),
        el('h2', { class: 'section-heading', text: 'Absicherung' }),
        specTable(sheet.content.absicherung),
        sheet.content.kabel.length
          ? el('div', {}, [el('h2', { class: 'section-heading', text: 'Benötigte Kabel' }), cableTable(sheet.content.kabel)])
          : null,
        sheet.content.hinweise && sheet.content.hinweise.length
          ? el(
              'ul',
              { class: 'hint-list' },
              sheet.content.hinweise.map((hint) => el('li', { text: hint }))
            )
          : null,
      ])
    : el('div', { class: 'placeholder-panel' }, [
        el('p', { class: 'placeholder-panel__title', text: 'Dieses Datenblatt wird in Kürze ergänzt.' }),
        el('p', { class: 'placeholder-panel__text', text: 'Die Seite ist bereits angelegt, der technische Inhalt folgt.' }),
      ]);

  container.appendChild(el('div', { class: 'page page--sheet' }, [header, el('div', { class: 'page__content page__content--sheet' }, [body])]));
}

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

export function renderNotFound(container) {
  clear(container);
  container.appendChild(
    el('div', { class: 'page page--notfound' }, [
      appHeader(),
      el('div', { class: 'page__content' }, [
        el('h1', { class: 'page__heading', text: 'Seite nicht gefunden' }),
        el('button', { class: 'btn btn--primary', type: 'button', onClick: () => navigate('/') }, 'Zur Startseite'),
      ]),
    ])
  );
}
