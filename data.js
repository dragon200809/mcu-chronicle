/* ===========================================================
   MCU CHRONICLE — DATA
   PARTS: the 9 sections of the hybrid master watch order
   ITEMS: every movie/series in exact sequence, with real
   researched runtimes (movies/specials) or per-episode
   runtimes (series), so time is logged automatically.
=========================================================== */

const PARTS = [
  { key: "1",   title: "MCU ki Foundation",        color: "#2E6BFF", glow: "rgba(46,107,255,0.6)",  sigil: "STARK",    emblem: "reactor" },
  { key: "2",   title: "Avengers ke Baad",          color: "#1FA070", glow: "rgba(31,160,112,0.6)",  sigil: "ROGERS",   emblem: "burst" },
  { key: "3",   title: "Avengers Break",            color: "#E8342A", glow: "rgba(232,52,42,0.6)",   sigil: "PARKER",   emblem: "web" },
  { key: "3.5", title: "Before No Way Home",        color: "#8A8A9E", glow: "rgba(138,138,158,0.55)",sigil: "LEGACY",   emblem: "diamond", subtitle: "Non-MCU Spider-Verse prep", nonMcu: true },
  { key: "4",   title: "Multiverse Begins",         color: "#7B2FF7", glow: "rgba(123,47,247,0.6)",  sigil: "STRANGE",  emblem: "rings" },
  { key: "5",   title: "After No Way Home",         color: "#F2C230", glow: "rgba(242,194,48,0.6)",  sigil: "MAXIMOFF", emblem: "hex" },
  { key: "6",   title: "Multiverse / Kang Story",   color: "#FF7A1A", glow: "rgba(255,122,26,0.6)",  sigil: "LOKI",     emblem: "horns" },
  { key: "7",   title: "Street Level + Multiverse", color: "#D6216B", glow: "rgba(214,33,107,0.6)",  sigil: "MURDOCK",  emblem: "crescent" },
  { key: "8",   title: "Current MCU",               color: "#14C4C4", glow: "rgba(20,196,196,0.6)",  sigil: "DOOM",     emblem: "shard" },
];

const ITEMS = [
  // Part 1 — Foundation
  { id: "iron-man", title: "Iron Man", year: 2008, type: "movie", part: "1", runtimeMin: 126, blurb: "Tony Stark → Iron Man." },
  { id: "iron-man-2", title: "Iron Man 2", year: 2010, type: "movie", part: "1", runtimeMin: 124, blurb: "Tony + Natasha + S.H.I.E.L.D." },
  { id: "thor", title: "Thor", year: 2011, type: "movie", part: "1", runtimeMin: 115, blurb: "Thor + Loki + Asgard." },
  { id: "cap-1", title: "Captain America: The First Avenger", year: 2011, type: "movie", part: "1", runtimeMin: 124, blurb: "Steve Rogers + Tesseract.", note: "Story WWII mein hai, but yahan dekhna better hai — Avengers-era setup ho jata hai." },
  { id: "avengers-1", title: "The Avengers", year: 2012, type: "movie", part: "1", runtimeMin: 143, rating: 5, blurb: "First BIG team-up." },
  // Part 2 — Avengers ke Baad
  { id: "iron-man-3", title: "Iron Man 3", year: 2013, type: "movie", part: "2", runtimeMin: 130 },
  { id: "thor-dw", title: "Thor: The Dark World", year: 2013, type: "movie", part: "2", runtimeMin: 112 },
  { id: "cap-ws", title: "Captain America: The Winter Soldier", year: 2014, type: "movie", part: "2", runtimeMin: 136, rating: 5 },
  { id: "gotg-1", title: "Guardians of the Galaxy", year: 2014, type: "movie", part: "2", runtimeMin: 122 },
  { id: "gotg-2", title: "Guardians of the Galaxy Vol. 2", year: 2017, type: "movie", part: "2", runtimeMin: 137 },
  { id: "avengers-2", title: "Avengers: Age of Ultron", year: 2015, type: "movie", part: "2", runtimeMin: 141, rating: 4 },
  { id: "antman-1", title: "Ant-Man", year: 2015, type: "movie", part: "2", runtimeMin: 117 },
  // Part 3 — Avengers Break
  { id: "civil-war", title: "Captain America: Civil War", year: 2016, type: "movie", part: "3", runtimeMin: 147, rating: 5, note: "Yahan se Spider-Man ka MCU journey properly start hota hai." },
  { id: "spidey-hc", title: "Spider-Man: Homecoming", year: 2017, type: "movie", part: "3", runtimeMin: 133 },
  { id: "dr-strange-1", title: "Doctor Strange", year: 2016, type: "movie", part: "3", runtimeMin: 115 },
  { id: "black-panther-1", title: "Black Panther", year: 2018, type: "movie", part: "3", runtimeMin: 134 },
  { id: "thor-rag", title: "Thor: Ragnarok", year: 2017, type: "movie", part: "3", runtimeMin: 130, rating: 4 },
  { id: "infinity-war", title: "Avengers: Infinity War", year: 2018, type: "movie", part: "3", runtimeMin: 149, rating: 6 },
  { id: "antman-wasp", title: "Ant-Man and the Wasp", year: 2018, type: "movie", part: "3", runtimeMin: 118 },
  { id: "captain-marvel", title: "Captain Marvel", year: 2019, type: "movie", part: "3", runtimeMin: 124 },
  { id: "endgame", title: "Avengers: Endgame", year: 2019, type: "movie", part: "3", runtimeMin: 181, rating: 6 },
  { id: "spidey-ffh", title: "Spider-Man: Far From Home", year: 2019, type: "movie", part: "3", runtimeMin: 129 },
  // Part 3.5 — Before No Way Home (non-MCU prep)
  { id: "spiderman-2002", title: "Spider-Man", year: 2002, type: "movie", part: "3.5", nonMcu: true, runtimeMin: 121, note: "Tobey Maguire." },
  { id: "spiderman2-2004", title: "Spider-Man 2", year: 2004, type: "movie", part: "3.5", nonMcu: true, runtimeMin: 127, note: "Tobey Maguire." },
  { id: "spiderman3-2007", title: "Spider-Man 3", year: 2007, type: "movie", part: "3.5", nonMcu: true, runtimeMin: 139, note: "Tobey Maguire." },
  { id: "amazing-spiderman", title: "The Amazing Spider-Man", year: 2012, type: "movie", part: "3.5", nonMcu: true, runtimeMin: 136, note: "Andrew Garfield." },
  { id: "amazing-spiderman-2", title: "The Amazing Spider-Man 2", year: 2014, type: "movie", part: "3.5", nonMcu: true, runtimeMin: 142, note: "Andrew Garfield." },
  // Part 4 — Multiverse Begins
  { id: "wandavision", title: "WandaVision", year: 2021, type: "series", part: "4", rating: 4, episodes: [
      { t: "Filmed Before a Live Studio Audience", m: 30 }, { t: "Don't Touch That Dial", m: 36 },
      { t: "Now in Color", m: 33 }, { t: "We Interrupt This Program", m: 35 },
      { t: "On a Very Special Episode...", m: 44 }, { t: "All-New Halloween Spooktacular!", m: 38 },
      { t: "Breaking the Fourth Wall", m: 38 }, { t: "Previously On", m: 46 }, { t: "The Series Finale", m: 50 },
  ]},
  { id: "loki-1", title: "Loki (Season 1)", year: 2021, type: "series", part: "4", rating: 5, episodes: [
      { t: "Glorious Purpose", m: 52 }, { t: "The Variant", m: 54 }, { t: "Lamentis", m: 45 },
      { t: "The Nexus Event", m: 40 }, { t: "Journey Into Mystery", m: 48 }, { t: "For All Time. Always.", m: 45 },
  ]},
  { id: "shang-chi", title: "Shang-Chi and the Legend of the Ten Rings", year: 2021, type: "movie", part: "4", runtimeMin: 132 },
  { id: "eternals", title: "Eternals", year: 2021, type: "movie", part: "4", runtimeMin: 156 },
  { id: "nwh", title: "Spider-Man: No Way Home", year: 2021, type: "movie", part: "4", runtimeMin: 148, rating: 7, note: "Ab Tobey + Andrew wali movies ka payoff milega." },
  // Part 5 — After No Way Home
  { id: "dr-strange-2", title: "Doctor Strange in the Multiverse of Madness", year: 2022, type: "movie", part: "5", runtimeMin: 126 },
  { id: "hawkeye", title: "Hawkeye", year: 2021, type: "series", part: "5", episodes: [
      { t: "Never Meet Your Heroes", m: 49 }, { t: "Hide and Seek", m: 51 }, { t: "Echoes", m: 43 },
      { t: "Partners, Am I Right?", m: 40 }, { t: "Ronin", m: 44 }, { t: "So This Is Christmas?", m: 61 },
  ]},
  { id: "thor-love", title: "Thor: Love and Thunder", year: 2022, type: "movie", part: "5", runtimeMin: 119 },
  { id: "wakanda-forever", title: "Black Panther: Wakanda Forever", year: 2022, type: "movie", part: "5", runtimeMin: 161 },
  { id: "werewolf", title: "Werewolf by Night", year: 2022, type: "special", part: "5", runtimeMin: 53, optional: true },
  { id: "gotg-holiday", title: "Guardians of the Galaxy Holiday Special", year: 2022, type: "special", part: "5", runtimeMin: 42, optional: true },
  // Part 6 — Multiverse / Kang Story
  { id: "antman-q", title: "Ant-Man and the Wasp: Quantumania", year: 2023, type: "movie", part: "6", runtimeMin: 125 },
  { id: "loki-2", title: "Loki (Season 2)", year: 2023, type: "series", part: "6", rating: 5, episodes: [
      { t: "Ouroboros", m: 47 }, { t: "Breaking Brad", m: 51 }, { t: "1893", m: 55 },
      { t: "Heart of the TVA", m: 50 }, { t: "Science/Fiction", m: 45 }, { t: "Glorious Purpose", m: 58 },
  ]},
  { id: "gotg-3", title: "Guardians of the Galaxy Vol. 3", year: 2023, type: "movie", part: "6", runtimeMin: 149 },
  { id: "secret-invasion", title: "Secret Invasion", year: 2023, type: "series", part: "6", episodes: [
      { t: "Resurrection", m: 55 }, { t: "Promises", m: 58 }, { t: "Betrayed", m: 29 },
      { t: "Beloved", m: 38 }, { t: "Harvest", m: 25 }, { t: "Home", m: 38 },
  ]},
  { id: "marvels", title: "The Marvels", year: 2023, type: "movie", part: "6", runtimeMin: 105 },
  { id: "echo", title: "Echo", year: 2024, type: "series", part: "6", episodes: [
      { t: "Face Value", m: 49 }, { t: "View from Above", m: 39 }, { t: "Tototka'me:", m: 42 },
      { t: "Maya", m: 38 }, { t: "Take Me Home", m: 40 },
  ]},
  // Part 7 — Street Level + Multiverse
  { id: "daredevil-ba-1", title: "Daredevil: Born Again (Season 1)", year: 2025, type: "series", part: "7", rating: 4, episodes: [
      { t: "Episode 1", m: 58 }, { t: "Episode 2", m: 47 }, { t: "Episode 3", m: 44 },
      { t: "Episode 4", m: 52 }, { t: "Episode 5", m: 39 }, { t: "Episode 6", m: 42 },
      { t: "Episode 7", m: 40 }, { t: "Episode 8", m: 47 }, { t: "Episode 9", m: 57 },
  ]},
  { id: "deadpool-wolverine", title: "Deadpool & Wolverine", year: 2024, type: "movie", part: "7", runtimeMin: 128, rating: 5 },
  { id: "agatha", title: "Agatha All Along", year: 2024, type: "series", part: "7", episodes: [
      { t: "Seekest Thou the Road", m: 40 }, { t: "Circle, Circle, Time to Try", m: 41 },
      { t: "Is This Style?", m: 37 }, { t: "Death's Hand in Mine", m: 41 },
      { t: "Room for One More", m: 40 }, { t: "Familiar By Thy Side", m: 40 },
      { t: "Follow Me My Friend / To Glory at the End", m: 40 }, { t: "Scarlet, It's Coming", m: 40 },
      { t: "Maiden Mother Crone", m: 42 },
  ]},
  { id: "ironheart", title: "Ironheart", year: 2025, type: "series", part: "7", episodes: [
      { t: "Take Me Home", m: 41 }, { t: "Will the Real Natalie Please Stand Up?", m: 48 },
      { t: "We in Danger, Girl", m: 53 }, { t: "Bad Magic", m: 50 },
      { t: "Karma's a Glitch", m: 57 }, { t: "The Past Is the Past", m: 40 },
  ]},
  // Part 8 — Current MCU
  { id: "cap-bnw", title: "Captain America: Brave New World", year: 2025, type: "movie", part: "8", runtimeMin: 118 },
  { id: "thunderbolts", title: "Thunderbolts*", year: 2025, type: "movie", part: "8", runtimeMin: 126, rating: 4 },
  { id: "fantastic-four", title: "The Fantastic Four: First Steps", year: 2025, type: "movie", part: "8", runtimeMin: 115, rating: 4 },
  { id: "daredevil-ba-2", title: "Daredevil: Born Again (Season 2)", year: 2026, type: "series", part: "8", episodes: [
      { t: "Episode 1", m: 55 }, { t: "Episode 2", m: 45 }, { t: "Episode 3", m: 43 },
      { t: "Episode 4", m: 50 }, { t: "Episode 5", m: 40 }, { t: "Episode 6", m: 44 },
      { t: "Episode 7", m: 42 }, { t: "Episode 8", m: 48 }, { t: "Episode 9", m: 55 },
  ]},
  { id: "spiderman-bnd", title: "Spider-Man: Brand New Day", year: 2026, type: "movie", part: "8", runtimeMin: 144 },
  { id: "doomsday", title: "Avengers: Doomsday", year: 2026, type: "movie", part: "8", unreleased: true, finish: true, note: "Ye woh point hai jahan tak tujhe MCU ka main journey complete karke pahunchna hai." },
];
