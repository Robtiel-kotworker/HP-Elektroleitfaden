// ============================================================================
// HP Elektroleitfaden – Auswahlstatus
// ----------------------------------------------------------------------------
// Der Fortschritt des Bestimmungsassistenten wird in sessionStorage
// gehalten, damit er einen Seitenwechsel innerhalb des Tabs übersteht,
// aber nicht dauerhaft gespeichert bleibt.
// ============================================================================

const STORAGE_KEY = 'hp-elektroleitfaden-auswahl';

function defaultSelection() {
  return {
    hersteller: null, // 'bosch' | 'nibe'
    regelung: null, // 'smo' | 'standard'
    zusatz: [], // Array von Addon-IDs
  };
}

export function getSelection() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSelection();
    const parsed = JSON.parse(raw);
    return { ...defaultSelection(), ...parsed };
  } catch (err) {
    return defaultSelection();
  }
}

export function setSelection(partial) {
  const current = getSelection();
  const next = { ...current, ...partial };
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function resetSelection() {
  sessionStorage.removeItem(STORAGE_KEY);
}
