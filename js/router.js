// ============================================================================
// HP Elektroleitfaden – Router
// ----------------------------------------------------------------------------
// Reines Hash-Routing (#/pfad). Dadurch liefert der Server bei jedem
// Seitenaufruf – auch bei direkt geöffneten Datenblatt-Links – immer nur
// index.html aus. Es sind keine Redirect-/Rewrite-Regeln auf Cloudflare
// Pages nötig.
// ============================================================================

import { getSelection } from './state.js';
import {
  renderStart,
  renderWizardHersteller,
  renderWizardRegelung,
  renderWizardZusatz,
  renderErgebnisse,
  renderSuche,
  renderDatenblatt,
  renderNotFound,
} from './views.js';

const app = document.getElementById('app');

function currentSegments() {
  const hash = window.location.hash || '#/';
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  return path.split('/').filter(Boolean);
}

function redirect(path) {
  window.location.hash = path;
}

function render() {
  const segments = currentSegments();
  const selection = getSelection();

  // Startseite: /
  if (segments.length === 0) {
    renderStart(app);
    return;
  }

  // Bestimmungsassistent: /wizard/...
  if (segments[0] === 'wizard') {
    const step = segments[1];

    if (step === 'hersteller') {
      renderWizardHersteller(app);
      return;
    }

    if (step === 'regelung') {
      if (selection.hersteller !== 'nibe') {
        redirect('/wizard/hersteller');
        return;
      }
      renderWizardRegelung(app);
      return;
    }

    if (step === 'zusatz') {
      if (!selection.hersteller) {
        redirect('/wizard/hersteller');
        return;
      }
      if (selection.hersteller === 'nibe' && !selection.regelung) {
        redirect('/wizard/regelung');
        return;
      }
      renderWizardZusatz(app);
      return;
    }

    renderNotFound(app);
    return;
  }

  // Ergebnisseite: /ergebnisse
  if (segments[0] === 'ergebnisse') {
    if (!selection.hersteller) {
      redirect('/wizard/hersteller');
      return;
    }
    if (selection.hersteller === 'nibe' && !selection.regelung) {
      redirect('/wizard/regelung');
      return;
    }
    renderErgebnisse(app);
    return;
  }

  // Suche: /suche
  if (segments[0] === 'suche') {
    renderSuche(app);
    return;
  }

  // Datenblatt: /datenblatt/:id
  if (segments[0] === 'datenblatt' && segments[1]) {
    renderDatenblatt(app, decodeURIComponent(segments[1]));
    return;
  }

  renderNotFound(app);
}

window.addEventListener('hashchange', render);
render();
