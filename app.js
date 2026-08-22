/* ===========================================================
   MCU CHRONICLE — APP LOGIC
   State persists to localStorage on every single change, so
   closing the tab/browser or restarting the computer never
   resets progress — it reloads exactly where you left off.
=========================================================== */

const STORAGE_KEY = "mcu_chronicle_watch_data_v1";
const PART_MAP = Object.fromEntries(PARTS.map(p => [p.key, p]));
const ITEM_MAP = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const GEM_COLORS = ["#2E6BFF", "#E8342A", "#7B2FF7", "#F2C230", "#1FA070", "#FF7A1A"];

// flat, ordered list of every watchable unit (movie/special = 1 unit, series = 1 unit per episode)
const FLAT_SEQUENCE = [];
ITEMS.forEach(item => {
  if (item.unreleased) return;
  if (item.type === "series") {
    item.episodes.forEach((_, i) => FLAT_SEQUENCE.push({ itemId: item.id, epIndex: i }));
  } else {
    FLAT_SEQUENCE.push({ itemId: item.id, epIndex: null });
  }
});

/* ---------- state: { itemId: [watchedEpIndexes] }  (movies use [0]) ---------- */
let watchData = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not read saved progress, starting fresh.", e);
    return {};
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchData));
  } catch (e) {
    console.warn("Could not save progress:", e);
  }
}

function isWatched(itemId, epIndex) {
  const idx = epIndex ?? 0;
  return !!(watchData[itemId] && watchData[itemId].includes(idx));
}

function setWatched(itemId, epIndex, shouldWatch) {
  const idx = epIndex ?? 0;
  const set = new Set(watchData[itemId] || []);
  if (shouldWatch) set.add(idx); else set.delete(idx);
  watchData[itemId] = Array.from(set);
  saveState();
}

/* ---------- helpers ---------- */
function pad(n) { return String(n).padStart(2, "0"); }
function fmtHM(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

function getUpNext() {
  return FLAT_SEQUENCE.find(u => !isWatched(u.itemId, u.epIndex)) || { itemId: null, epIndex: null };
}

function getWatchedCount() {
  return FLAT_SEQUENCE.filter(u => isWatched(u.itemId, u.epIndex)).length;
}

function getTotalMinutesWatched() {
  let sum = 0;
  FLAT_SEQUENCE.forEach(u => {
    if (!isWatched(u.itemId, u.epIndex)) return;
    const item = ITEM_MAP[u.itemId];
    sum += item.type === "series" ? item.episodes[u.epIndex].m : item.runtimeMin;
  });
  return sum;
}

function getPartStats() {
  const stats = {};
  FLAT_SEQUENCE.forEach(u => {
    const item = ITEM_MAP[u.itemId];
    stats[item.part] = stats[item.part] || { done: 0, total: 0 };
    stats[item.part].total += 1;
    if (isWatched(u.itemId, u.epIndex)) stats[item.part].done += 1;
  });
  return stats;
}

/* ---------- ambient background (abstract VFX orbs) ---------- */
function renderAmbient() {
  const field = document.getElementById("ambientField");
  field.innerHTML = GEM_COLORS.map((c, i) => {
    const top = 8 + ((i * 41) % 82), left = 4 + ((i * 57) % 92), size = 170 + (i % 3) * 70, delay = i * 1.2;
    return `<div class="ambient-orb" style="top:${top}%; left:${left}%; width:${size}px; height:${size}px; background: radial-gradient(circle at 30% 30%, ${c}55, transparent 70%); animation-delay:${delay}s;"></div>`;
  }).join("") + `<div class="ambient-grid"></div>`;
}

/* ---------- gauntlet (6 gems = overall progress, not tied to part count) ---------- */
function renderGauntlet() {
  const el = document.getElementById("gauntlet");
  const pct = getWatchedCount() / FLAT_SEQUENCE.length;
  const allDone = pct >= 1;
  el.classList.toggle("gauntlet--snap", allDone);
  el.innerHTML = GEM_COLORS.map((c, i) => {
    const segStart = i / 6;
    const segPct = Math.min(1, Math.max(0, (pct - segStart) / (1 / 6)));
    const full = segPct >= 1;
    return `<div class="gem-slot"><div class="gem ${full ? "gem--full" : ""}" style="--gem-color:${c}; --gem-glow:${c}aa; opacity:${0.22 + segPct * 0.78}; transform:scale(${0.68 + segPct * 0.32});"></div></div>`;
  }).join("");
}

/* ---------- watchlist rendering ---------- */
function renderRating(rating, inline) {
  if (!rating) return "";
  const stars = Array.from({ length: rating }).map(() => Icon.star(true)).join("");
  return `<div class="row-rating ${inline ? "row-rating--inline" : ""}">${stars}</div>`;
}

function renderSimpleRow(item, upNext) {
  const watched = isWatched(item.id, null);
  const isUpNext = upNext.itemId === item.id;
  const iconSvg = item.type === "special" ? Icon.sparkle() : Icon.film();
  return `
  <div class="row ${watched ? "row--watched" : ""} ${isUpNext ? "row--upnext" : ""} ${item.finish ? "row--finish" : ""} ${item.unreleased ? "row--unreleased" : ""}"
       style="--stone:${PART_MAP[item.part].color}; --stone-glow:${PART_MAP[item.part].glow};">
    <div class="row-stone"></div>
    <button class="checkbox ${watched ? "checkbox--on" : ""}" ${item.unreleased ? "disabled" : ""}
      data-action="toggle-movie" data-item="${item.id}">
      ${watched ? Icon.check() : (item.unreleased ? Icon.lock() : "")}
    </button>
    <div class="row-main">
      <div class="row-title-line">
        <span class="row-type-icon">${iconSvg}</span>
        <span class="row-title">${esc(item.title)}</span>
        <span class="row-year">${item.year}</span>
        ${!item.unreleased ? `<span class="row-runtime">${fmtHM(item.runtimeMin)}</span>` : ""}
        ${item.nonMcu ? `<span class="tag tag--nonmcu">NON-MCU</span>` : ""}
        ${item.optional ? `<span class="tag tag--optional">OPTIONAL</span>` : ""}
        ${item.unreleased ? `<span class="tag tag--unreleased">RELEASES ${item.year}</span>` : ""}
        ${item.finish ? `<span class="tag tag--finish">${Icon.trophy()} FINISH LINE</span>` : ""}
        ${isUpNext ? `<span class="upnext-badge">${Icon.flame()} UP NEXT</span>` : ""}
      </div>
      ${item.blurb ? `<div class="row-blurb">${esc(item.blurb)}</div>` : ""}
      ${item.note ? `<div class="row-note">⚠ ${esc(item.note)}</div>` : ""}
      ${renderRating(item.rating, false)}
    </div>
  </div>`;
}

function renderSeriesRow(item, upNext, openSeriesSet) {
  const watchedEps = new Set(watchData[item.id] || []);
  const doneCount = item.episodes.filter((_, i) => watchedEps.has(i)).length;
  const allDone = doneCount === item.episodes.length;
  const totalMin = item.episodes.reduce((s, e) => s + e.m, 0);
  const upNextEp = upNext.itemId === item.id ? upNext.epIndex : null;
  const hasUpNext = upNextEp !== null && upNextEp !== undefined;
  const isOpen = openSeriesSet.has(item.id);

  const episodeRows = item.episodes.map((ep, i) => {
    const epWatched = watchedEps.has(i);
    const isEpUpNext = upNextEp === i;
    return `
    <div class="episode-row ${epWatched ? "episode-row--watched" : ""} ${isEpUpNext ? "episode-row--upnext" : ""}">
      <button class="checkbox checkbox--sm ${epWatched ? "checkbox--on" : ""}" data-action="toggle-episode" data-item="${item.id}" data-ep="${i}">
        ${epWatched ? Icon.check() : ""}
      </button>
      <span class="episode-num">E${i + 1}</span>
      <span class="episode-title">${esc(ep.t)}</span>
      <span class="episode-runtime">${ep.m}m</span>
      ${isEpUpNext ? `<span class="upnext-dot" title="Up next"></span>` : ""}
    </div>`;
  }).join("");

  return `
  <div class="row row--series ${allDone ? "row--watched" : ""} ${hasUpNext ? "row--upnext" : ""}"
       style="--stone:${PART_MAP[item.part].color}; --stone-glow:${PART_MAP[item.part].glow};">
    <div class="row-stone"></div>
    <button class="checkbox ${allDone ? "checkbox--on" : ""}" data-action="toggle-season" data-item="${item.id}" data-alldone="${allDone}">
      ${allDone ? Icon.check() : ""}
    </button>
    <div class="row-main">
      <div class="row-title-line" data-action="expand-series" data-item="${item.id}">
        <span class="row-type-icon">${Icon.tv()}</span>
        <span class="row-title">${esc(item.title)}</span>
        <span class="row-year">${item.year}</span>
        <span class="row-runtime">${fmtHM(totalMin)} · ${item.episodes.length} eps</span>
        ${renderRating(item.rating, true)}
        <span class="ep-progress">${doneCount}/${item.episodes.length}</span>
        ${hasUpNext ? `<span class="upnext-badge">${Icon.flame()} UP NEXT</span>` : ""}
        <span class="chev ${isOpen ? "chev--open" : ""}">${Icon.chevron()}</span>
      </div>
      ${isOpen ? `<div class="episode-list">${episodeRows}</div>` : ""}
    </div>
  </div>`;
}

let openSeries = new Set();
let openParts = new Set(PARTS.map(p => p.key));

function renderWatchlist() {
  const container = document.getElementById("watchlistView");
  const upNext = getUpNext();
  const grouped = {};
  ITEMS.forEach(it => { (grouped[it.part] = grouped[it.part] || []).push(it); });

  container.innerHTML = PARTS.map(part => {
    const items = grouped[part.key] || [];
    const doneCount = items.filter(it => {
      if (it.type === "series") return it.episodes.every((_, i) => isWatched(it.id, i));
      return isWatched(it.id, null);
    }).length;
    const isOpen = openParts.has(part.key);
    const rows = items.map(it => it.type === "series" ? renderSeriesRow(it, upNext, openSeries) : renderSimpleRow(it, upNext)).join("");

    return `
    <div class="phase-block ${part.nonMcu ? "phase-block--nonmcu" : ""}">
      <button class="phase-header" style="border-color:${part.color};" data-action="toggle-part" data-part="${part.key}">
        <span class="phase-emblem">${Emblem[part.emblem](part.color)}</span>
        <span class="phase-sigil" style="color:${part.color};">${part.sigil}</span>
        <span class="phase-dot" style="background:${part.color}; box-shadow:0 0 8px ${part.glow};"></span>
        <span class="phase-title">${esc(part.title)}</span>
        ${part.subtitle ? `<span class="phase-stone-name">${esc(part.subtitle)}</span>` : ""}
        <span class="phase-count">${doneCount}/${items.length}</span>
        <span class="chev ${isOpen ? "chev--open" : ""}">${Icon.chevron()}</span>
      </button>
      ${isOpen ? `<div class="phase-rows">${rows}</div>` : ""}
    </div>`;
  }).join("");
}

/* ---------- chronicle (stats) rendering ---------- */
function renderChronicle() {
  const container = document.getElementById("chronicleView");
  const totalMin = getTotalMinutesWatched();
  const totalSeconds = totalMin * 60;
  const h = Math.floor(totalSeconds / 3600), m = Math.floor((totalSeconds % 3600) / 60), s = totalSeconds % 60;
  const days = Math.floor(totalSeconds / 86400);
  const remAfterDays = totalSeconds % 86400;
  const remHours = Math.floor(remAfterDays / 3600);
  const remMinutes = Math.floor((remAfterDays % 3600) / 60);
  const watchedCount = getWatchedCount();
  const partStats = getPartStats();

  const partRows = PARTS.map(part => {
    const stats = partStats[part.key] || { done: 0, total: 0 };
    const pct = stats.total ? Math.round((stats.done / stats.total) * 100) : 0;
    return `
    <div class="pp-row">
      <div class="pp-label"><span class="pp-dot" style="background:${part.color};"></span>${esc(part.title)}</div>
      <div class="pp-track"><div class="pp-fill" style="width:${pct}%; background:${part.color}; box-shadow:0 0 8px ${part.glow};"></div></div>
      <span class="pp-pct">${stats.done}/${stats.total}</span>
    </div>`;
  }).join("");

  container.innerHTML = `
    <div class="total-card">
      <span class="total-label">TOTAL SCREEN TIME</span>
      <div class="total-time"><span>${pad(h)}</span>:<span>${pad(m)}</span>:<span>${pad(s)}</span></div>
      <span class="total-sub">hours : minutes : seconds — auto-logged from real runtimes</span>
    </div>
    <div class="translate-card">
      <span class="translate-icon">${Icon.sparkle()}</span>
      <p>Ab tak <strong>${h} ghante ${m} minute</strong> MCU dekh li hai — matlab
      <strong>${days} din ${remHours} ghante ${remMinutes} minute</strong> ka non-stop marathon ho chuka hai.</p>
    </div>
    <div class="stat-grid">
      <div class="stat-box"><span class="stat-num">${watchedCount}</span><span class="stat-lbl">Units Watched</span></div>
      <div class="stat-box"><span class="stat-num">${FLAT_SEQUENCE.length - watchedCount}</span><span class="stat-lbl">Remaining</span></div>
      <div class="stat-box"><span class="stat-num">${Math.round((watchedCount / FLAT_SEQUENCE.length) * 100)}%</span><span class="stat-lbl">Complete</span></div>
    </div>
    <div class="phase-progress">${partRows}</div>
  `;
}

/* ---------- snap overlay on 100% completion ---------- */
let snapShownThisSession = false;
function maybeShowSnap() {
  const watchedCount = getWatchedCount();
  const allDone = watchedCount === FLAT_SEQUENCE.length;
  const overlay = document.getElementById("snapOverlay");
  if (allDone && watchedCount > 0 && !snapShownThisSession) {
    snapShownThisSession = true;
    overlay.hidden = false;
    overlay.classList.add("snap-overlay--active");
    setTimeout(() => { overlay.hidden = true; overlay.classList.remove("snap-overlay--active"); }, 3200);
  }
}

/* ---------- render everything ---------- */
function renderAll() {
  renderGauntlet();
  renderWatchlist();
  renderChronicle();
}

/* ---------- event delegation ---------- */
document.addEventListener("click", (e) => {
  const partBtn = e.target.closest('[data-action="toggle-part"]');
  if (partBtn) {
    const key = partBtn.dataset.part;
    openParts.has(key) ? openParts.delete(key) : openParts.add(key);
    renderWatchlist();
    return;
  }

  const expandBtn = e.target.closest('[data-action="expand-series"]');
  if (expandBtn) {
    const id = expandBtn.dataset.item;
    openSeries.has(id) ? openSeries.delete(id) : openSeries.add(id);
    renderWatchlist();
    return;
  }

  const movieToggle = e.target.closest('[data-action="toggle-movie"]');
  if (movieToggle) {
    const id = movieToggle.dataset.item;
    if (ITEM_MAP[id].unreleased) return;
    setWatched(id, null, !isWatched(id, null));
    renderAll();
    maybeShowSnap();
    return;
  }

  const epToggle = e.target.closest('[data-action="toggle-episode"]');
  if (epToggle) {
    const id = epToggle.dataset.item, ep = Number(epToggle.dataset.ep);
    setWatched(id, ep, !isWatched(id, ep));
    renderAll();
    maybeShowSnap();
    return;
  }

  const seasonToggle = e.target.closest('[data-action="toggle-season"]');
  if (seasonToggle) {
    const id = seasonToggle.dataset.item;
    const allDone = seasonToggle.dataset.alldone === "true";
    const item = ITEM_MAP[id];
    item.episodes.forEach((_, i) => setWatched(id, i, !allDone));
    renderAll();
    maybeShowSnap();
    return;
  }
});

document.getElementById("tabWatchlist").addEventListener("click", () => switchTab("watchlist"));
document.getElementById("tabChronicle").addEventListener("click", () => switchTab("chronicle"));

function switchTab(tab) {
  document.getElementById("tabWatchlist").classList.toggle("tab--active", tab === "watchlist");
  document.getElementById("tabChronicle").classList.toggle("tab--active", tab === "chronicle");
  document.getElementById("watchlistView").hidden = tab !== "watchlist";
  document.getElementById("chronicleView").hidden = tab !== "chronicle";
}

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Reset all watch progress? This can't be undone.")) return;
  watchData = {};
  saveState();
  snapShownThisSession = false;
  renderAll();
});

/* ---------- boot ---------- */
renderAmbient();
renderAll();
