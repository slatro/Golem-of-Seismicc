const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const progressValue = document.getElementById("progressValue");
const spaceName = document.getElementById("spaceName");
const roomTitle = document.getElementById("roomTitle");
const roomSubtitle = document.getElementById("roomSubtitle");
const inscriptionText = document.getElementById("inscriptionText");
const detailText = document.getElementById("detailText");
const promptBox = document.getElementById("promptBox");
const papyrusOverlay = document.getElementById("papyrusOverlay");
const papyrusClose = document.getElementById("papyrusClose");
const papyrusEyebrow = document.getElementById("papyrusEyebrow");
const papyrusTitle = document.getElementById("papyrusTitle");
const papyrusIntro = document.getElementById("papyrusIntro");
const papyrusBody = document.getElementById("papyrusBody");

const crystalImage = new Image();
const crystalCanvas = document.createElement("canvas");
const crystalCtx = crystalCanvas.getContext("2d");

let crystalReady = false;

crystalImage.src = "./crystal-reference.png";
crystalImage.onload = () => {
  crystalCanvas.width = crystalImage.width;
  crystalCanvas.height = crystalImage.height;
  crystalCtx.clearRect(0, 0, crystalImage.width, crystalImage.height);
  crystalCtx.drawImage(crystalImage, 0, 0);
  const data = crystalCtx.getImageData(0, 0, crystalImage.width, crystalImage.height);
  const px = data.data;
  const bg = { r: px[0], g: px[1], b: px[1], a: px[3] };

  for (let i = 0; i < px.length; i += 4) {
    const diff = Math.abs(px[i] - bg.r) + Math.abs(px[i + 1] - bg.g) + Math.abs(px[i + 2] - bg.b);
    if (diff < 74) {
      px[i + 3] = 0;
    }
  }

  crystalCtx.putImageData(data, 0, 0);
  crystalReady = true;
};

const ROOMS = [
  {
    name: "Brookwell",
    wing: "Accounts & Access",
    x: 568,
    y: 44,
    w: 144,
    h: 104,
    accent: "#f2c7d6",
    subtitle: "Cash access, secure holding, quiet stability.",
    inscription: "Safe holding. Open access. Silent stability.",
    detail:
      "Bu oda modern cash account fikrini taş kasalar ve kontrollü erişim mimarisiyle anlatır.",
    ritual: "Kasadaki çekirdeğe `Space` ile rezonans ver.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Brookwell odası güvenli para tutma, erişilebilir hesap deneyimi ve sakin finansal kullanım fikrini temsil eder.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Cash account experience",
          "Secure access and holding",
          "Simple, stable user flow",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Taş kasalar ve ölçülü geometri, istikrarın gösterişten değil güvenilir yapıdan doğduğunu anlatır.",
      },
    ],
    portalCore: "#8bbf9e",
    portalMid: "#d6f0df",
    ember: "#c7f4da",
  },
  {
    name: "Avvio",
    wing: "Accounts & Access",
    x: 856,
    y: 86,
    w: 144,
    h: 104,
    accent: "#f0b6ca",
    subtitle: "One account, many thresholds.",
    inscription: "One account. Many thresholds.",
    detail:
      "Aynı çekirdeğin farklı eşiklerden geçebilmesi, global account hissini temsil eder.",
    ritual: "Portal eşiğini aktive edip akış yolunu aç.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Avvio odası tek hesapla çok sayıda eşiğe bağlanabilme ve dijital yaşam için global erişim fikrini taşır.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Global account feeling",
          "Access across multiple thresholds",
          "Clean cross-border identity layer",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Açılan taş eşikler, tek çekirdeğin farklı coğrafyalara ve kullanım anlarına bağlanmasını simgeler.",
      },
    ],
    portalCore: "#67cfff",
    portalMid: "#c8f1ff",
    ember: "#99e7ff",
  },
  {
    name: "Via",
    wing: "Accounts & Access",
    x: 1048,
    y: 220,
    w: 144,
    h: 104,
    accent: "#ef9fbe",
    subtitle: "Borderless capital moving on silent rails.",
    inscription: "Capital travels farther on silent rails.",
    detail:
      "Köprü yapısı, sermayenin sınırlar arasında sessizce taşınmasını temsil eder.",
    ritual: "Köprü çekirdeğini tetikle, karşı kıyıyı ışıkla bağla.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Via odası sınırlar arası sermaye akışı, stablecoin-first hareket ve sessiz finans rayları fikrini temsil eder.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Borderless capital movement",
          "Stablecoin-oriented rails",
          "Bridge-like transfer logic",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Köprü biçimli taş kurgu, değerin gürültüsüz ama kararlı biçimde bir uçtan ötekine taşınmasını anlatır.",
      },
    ],
    portalCore: "#ff5ca8",
    portalMid: "#ffd1e7",
    ember: "#ff9fcc",
  },
  {
    name: "Shift",
    wing: "Accounts & Access",
    x: 1048,
    y: 416,
    w: 144,
    h: 104,
    accent: "#ebb7d0",
    subtitle: "Custody, control, and holder-side trust.",
    inscription: "Trust remains with the holder.",
    detail:
      "Bu oda kişisel erişim, kontrol ve mühürlenmiş kimlik fikrine odaklanır.",
    ritual: "Taş mühürdeki kişisel izi uyandır.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Shift odası saklama, erişim kontrolü ve sahibin tarafında kalan güven ilişkisini merkezine alır.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Holder-side trust",
          "Controlled access",
          "Identity and custody seals",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Mühürlü nişler ve kişisel taş yüzeyler, yetkinin merkeze değil taşıyana ait olduğunu vurgular.",
      },
    ],
    portalCore: "#8e72ff",
    portalMid: "#d8ceff",
    ember: "#b6a2ff",
  },
  {
    name: "Blend",
    wing: "Treasury & Yield",
    x: 856,
    y: 516,
    w: 144,
    h: 104,
    accent: "#f1abc9",
    subtitle: "Idle capital should still move.",
    inscription: "Idle value should still move.",
    detail:
      "Dönen halkalar ve besleme olukları, earn infrastructure düşüncesini görselleştirir.",
    ritual: "Halka sistemini çalıştır ve rezervuarı doldur.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Blend odası atıl duran sermayenin çalışmasını sağlayan earn infrastructure mantığını mimariye çevirir.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Yield infrastructure",
          "Capital in motion",
          "Feed loops and reserve cycles",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Dönen taş halkalar ve besleme hatları, değerin beklemeden çalıştırılmasını sembolize eder.",
      },
    ],
    portalCore: "#5f7dff",
    portalMid: "#d7e0ff",
    ember: "#95acff",
  },
  {
    name: "Promis",
    wing: "Treasury & Yield",
    x: 568,
    y: 570,
    w: 144,
    h: 104,
    accent: "#ffd4e8",
    subtitle: "Yield anchored in the real world.",
    inscription: "Yield must answer the real world.",
    detail:
      "Bu sanctum daha ağır ve ciddi. Amaç, soyut getiri değil gerçek akış hissi vermek.",
    ritual: "Rezervuar taşına enerji ver ve seviyeyi yükselt.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Promis odası gerçek ekonomiye dayanan gerçek getiri ve gerçek nakit akışı fikrini ağır bir dille ifade eder.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Real-world anchored yield",
          "Cash-flow awareness",
          "Measured reserve logic",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Derin rezervuarlar ve ağır taş eşikler, soyut değil temelli değer üretimine vurgu yapar.",
      },
    ],
    portalCore: "#9acb64",
    portalMid: "#e4f4b5",
    ember: "#c9ee88",
  },
  {
    name: "Vend",
    wing: "Payments & Commerce",
    x: 280,
    y: 516,
    w: 144,
    h: 104,
    accent: "#f5b0cc",
    subtitle: "Commerce lives in motion.",
    inscription: "Commerce lives in motion.",
    detail:
      "Dağıtım olukları, işlemin harcanan ve akan bir şey olduğunu anlatır.",
    ritual: "Ticaret rayını aç ve çıkış oluğunu besle.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Vend odası ticaretin, ödeme akışının ve gerçek dünyadaki kullanım hareketinin mabetteki karşılığıdır.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Commerce and spend flow",
          "Movement through channels",
          "Practical usage energy",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Oluklar ve dağıtım çizgileri, değerin bir yerde durmak için değil dolaşmak için var olduğunu anlatır.",
      },
    ],
    portalCore: "#ff8c3e",
    portalMid: "#ffe0b7",
    ember: "#ffbe72",
  },
  {
    name: "DashX",
    wing: "Payments & Commerce",
    x: 88,
    y: 416,
    w: 144,
    h: 104,
    accent: "#f6c3da",
    subtitle: "Distribution made visible.",
    inscription: "Distribution is the visible shape of the invisible rail.",
    detail:
      "Merkezden dışarı yayılan çizgiler payout ve orchestration yapısını temsil eder.",
    ritual: "Merkez düğümü aktive et ve kanalları dağıt.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "DashX odası payout, orchestration ve görünmeyen rayların dağıtım şekline dönüşmesini temsil eder.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Payout orchestration",
          "Central-to-edge distribution",
          "Visible channel topology",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Merkezden dışa yayılan taş yollar, tek kaynaktan çok noktaya düzenli değer dağılımını simgeler.",
      },
    ],
    portalCore: "#ff6277",
    portalMid: "#ffd2d8",
    ember: "#ff9ba8",
  },
  {
    name: "Specie",
    wing: "Settlement & Markets",
    x: 88,
    y: 220,
    w: 144,
    h: 104,
    accent: "#eaa0ba",
    subtitle: "Settlement without friction.",
    inscription: "Settlement without friction. Reach without border.",
    detail:
      "Uzun ray koridorları ve karşılıklı kemerler, hızlı settlement mantığını anlatır.",
    ritual: "Karşı kemeri ışıkla senkronize et.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Specie odası sürtünmesiz settlement, business banking hissi ve sınırlar ötesi erişim mantığını taşır.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Fast settlement logic",
          "Business-grade flow",
          "Cross-border reach",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Karşılıklı kemerler ve düz ray aksı, gecikmeyen ve hizalı akışın mekânsal ifadesidir.",
      },
    ],
    portalCore: "#4cc7b1",
    portalMid: "#d3fff6",
    ember: "#89f1de",
  },
  {
    name: "Port Markets",
    wing: "Settlement & Markets",
    x: 280,
    y: 86,
    w: 144,
    h: 104,
    accent: "#f3bdd5",
    subtitle: "Structured flow for trade and markets.",
    inscription: "Trade survives when flow finds structure.",
    detail:
      "Yük olukları ve taş liman havuzu, trade finance temasını taş mabet diline çevirir.",
    ritual: "Taş havuzdaki akışı başlat ve yük çizgisini uyandır.",
    archiveSections: [
      {
        title: "What It Represents",
        body:
          "Port Markets odası yapılandırılmış akış, trade finance ve pazar erişimini taş liman diliyle anlatır.",
      },
      {
        title: "Core Traits",
        bullets: [
          "Structured market flow",
          "Trade-oriented channels",
          "Heavy cargo logic",
        ],
      },
      {
        title: "Sanctum Reading",
        body:
          "Liman havuzu ve oluklar, yüklerin ve kredinin düzen olmadan hareket edemeyeceğini vurgular.",
      },
    ],
    portalCore: "#d7a45b",
    portalMid: "#fff0cf",
    ember: "#f1c57d",
  },
];

const keys = new Set();
const player = {
  x: 640,
  y: 348,
  w: 46,
  h: 78,
  speed: 3.2,
  facing: 1,
  moveAmount: 0,
};

const state = {
  mode: "hall",
  room: null,
  nearDoor: null,
  nearNode: null,
  papyrusOpen: false,
  activated: new Set(),
  finalUnlocked: false,
  finalSeen: false,
};

const hallCore = { x: 640, y: 348, r: 86 };

const roomNodes = [
  { id: "plinth", x: 320, y: 470, r: 52 },
  { id: "archive", x: 960, y: 470, r: 52 },
  { id: "altar", x: 640, y: 248, r: 64 },
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function openPapyrus(room, mode = "archive") {
  const isArchive = mode === "archive";
  papyrusOverlay.classList.remove("hidden");
  papyrusOverlay.setAttribute("aria-hidden", "false");
  state.papyrusOpen = true;

  papyrusEyebrow.textContent = isArchive ? "Project Archive" : "Entry Tablet";
  papyrusTitle.textContent = isArchive ? `${room.name}` : `${room.name} Inscription`;
  papyrusIntro.textContent = isArchive ? room.subtitle : room.inscription;
  papyrusBody.innerHTML = "";

  const sections = isArchive
    ? room.archiveSections
    : [
        { title: "Inscription", body: room.inscription },
        { title: "Reading", body: room.detail },
        { title: "Ritual", body: room.ritual },
      ];

  for (const section of sections) {
    const block = document.createElement("section");
    block.className = "papyrus-block";

    const h3 = document.createElement("h3");
    h3.textContent = section.title;
    block.appendChild(h3);

    if (section.body) {
      const p = document.createElement("p");
      p.textContent = section.body;
      block.appendChild(p);
    }

    if (section.bullets?.length) {
      const ul = document.createElement("ul");
      for (const bullet of section.bullets) {
        const li = document.createElement("li");
        li.textContent = bullet;
        ul.appendChild(li);
      }
      block.appendChild(ul);
    }

    papyrusBody.appendChild(block);
  }
}

function closePapyrus() {
  papyrusOverlay.classList.add("hidden");
  papyrusOverlay.setAttribute("aria-hidden", "true");
  state.papyrusOpen = false;
}

function updateSidebar() {
  progressValue.textContent = `${state.activated.size} / ${ROOMS.length}`;

  if (state.mode === "hall") {
    spaceName.textContent = "Great Hall";
    roomTitle.textContent = "Great Hall";
    roomSubtitle.textContent = state.finalUnlocked
      ? "Bütün odalar uyandı. Merkez çekirdeğe yaklaş ve `E` ile final mühürü aç."
      : "Bir kapıya yaklaş, `E` ile içeri gir, kitabeleri oku ve altar’ı `Space` ile aktive et.";
    inscriptionText.textContent = state.finalUnlocked
      ? "Ten chambers answer. The hall no longer waits in silence."
      : "Ten chambers wait in silence. Each door preserves one function of the network.";
    detailText.textContent = state.finalSeen
      ? "Sanctum tamamlandı. Bu mini build, tam oyunun öğrenme odaklı mabed fikrini temsil ediyor."
      : "Kapı üstlerinde proje isimleri yazılı. Oda aktive olunca pembe raylar merkeze güç taşır.";
    promptBox.textContent = state.nearDoor
      ? `E ile ${state.nearDoor.name} odasına gir.`
      : state.finalUnlocked && distance(player.x, player.y, hallCore.x, hallCore.y) < 118
        ? "E ile merkez çekirdeği aç."
        : "WASD ile yürü ve bir kapıya yaklaş.";
    return;
  }

  const room = state.room;
  spaceName.textContent = room.name;
  roomTitle.textContent = room.name;
  roomSubtitle.textContent = `${room.wing} · ${room.subtitle}`;
  inscriptionText.textContent = room.inscription;

  if (state.activated.has(room.name)) {
    detailText.textContent = `${room.detail} Oda aktive edildi. Q ile Great Hall'a dönebilirsin.`;
  } else {
    detailText.textContent = `${room.detail} ${room.ritual}`;
  }

  if (!state.nearNode) {
    promptBox.textContent = "Q ile salona dön ya da düğümlere yaklaş.";
  } else if (state.nearNode.id === "plinth") {
    promptBox.textContent = "E ile giriş kitabelerini oku.";
  } else if (state.nearNode.id === "archive") {
    promptBox.textContent = "E ile proje yazıtını dinle.";
  } else {
    promptBox.textContent = state.activated.has(room.name)
      ? "Bu altar zaten uyandı. Q ile Great Hall'a dön."
      : "Space ile altar’ı aktive et.";
  }
}

function distance(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return Math.sqrt(dx * dx + dy * dy);
}

function movePlayer() {
  if (state.papyrusOpen) {
    player.moveAmount = 0;
    return;
  }

  let dx = 0;
  let dy = 0;

  if (keys.has("w") || keys.has("arrowup")) dy -= 1;
  if (keys.has("s") || keys.has("arrowdown")) dy += 1;
  if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
  if (keys.has("d") || keys.has("arrowright")) dx += 1;

  if (dx !== 0 || dy !== 0) {
    const len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;
    player.x += dx * player.speed;
    player.y += dy * player.speed;
    if (dx !== 0) player.facing = dx > 0 ? 1 : -1;
    player.moveAmount = 1;
  } else {
    player.moveAmount = 0;
  }

  player.x = clamp(player.x, 80, canvas.width - 80);
  player.y = clamp(player.y, 110, canvas.height - 82);
}

function updateProximity() {
  if (state.mode === "hall") {
    state.nearDoor = null;
    for (const room of ROOMS) {
      const cx = room.x + room.w / 2;
      const cy = room.y + room.h / 2 + 32;
      if (distance(player.x, player.y, cx, cy) < 90) {
        state.nearDoor = room;
        break;
      }
    }
    return;
  }

  state.nearNode = null;
  for (const node of roomNodes) {
    if (distance(player.x, player.y, node.x, node.y + 42) < 96) {
      state.nearNode = node;
      break;
    }
  }
}

function enterRoom(room) {
  closePapyrus();
  state.mode = "room";
  state.room = room;
  state.nearDoor = null;
  player.x = 640;
  player.y = 590;
  updateSidebar();
}

function leaveRoom() {
  closePapyrus();
  state.mode = "hall";
  state.room = null;
  state.nearNode = null;
  player.x = 640;
  player.y = 360;
  state.finalUnlocked = state.activated.size === ROOMS.length;
  updateSidebar();
}

function activateCurrentRoom() {
  if (!state.room || state.nearNode?.id !== "altar") return;
  state.activated.add(state.room.name);
  state.finalUnlocked = state.activated.size === ROOMS.length;
  updateSidebar();
}

function triggerFinal() {
  if (!state.finalUnlocked) return;
  if (distance(player.x, player.y, hallCore.x, hallCore.y) > 118) return;
  state.finalSeen = true;
  roomTitle.textContent = "Central Seal Opened";
  roomSubtitle.textContent = "The sanctum recognizes every activated chamber.";
  inscriptionText.textContent =
    "The first seal preserved the network. The last seal lets it be understood.";
  detailText.textContent =
    "Bu küçük playable slice, Golem of Seismic’in öğrenme odaklı taş mabed hissini temsil ediyor.";
  promptBox.textContent = "Sanctum tamamlandı. İstersen odaları tekrar gezebilirsin.";
}

function drawStoneBackground() {
  ctx.fillStyle = "#09070a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createRadialGradient(640, 180, 40, 640, 220, 560);
  grad.addColorStop(0, "rgba(255, 218, 236, 0.04)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawColumns() {}

function drawColumn() {}

function roundRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawHall() {
  drawStoneBackground();
  drawHallArchitecture();
  drawCentralSeal();
  ROOMS.forEach(drawDoor);
}

function drawHallArchitecture() {
  const wallGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  wallGrad.addColorStop(0, "#120d12");
  wallGrad.addColorStop(1, "#060507");
  ctx.fillStyle = wallGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(640, 350);

  ctx.fillStyle = "#231a1f";
  ctx.beginPath();
  ctx.ellipse(0, 0, 520, 318, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#151015";
  ctx.beginPath();
  ctx.ellipse(0, 0, 430, 248, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,228,240,0.09)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(0, 0, 516, 314, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,228,240,0.05)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(0, 0, 434, 252, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(255,228,240,0.04)";
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 9; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI * 2) / 9;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 170, Math.sin(angle) * 96);
    ctx.lineTo(Math.cos(angle) * 415, Math.sin(angle) * 238);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(255,228,240,0.035)";
  for (let i = 0; i < 5; i += 1) {
    const r1 = 200 + i * 36;
    const r2 = 112 + i * 22;
    ctx.beginPath();
    ctx.ellipse(0, 0, r1, r2, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.fillStyle = "#0f0c10";
  ctx.beginPath();
  ctx.ellipse(0, 0, 140, 84, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  drawColumns();
}

function drawCentralSeal() {
  ctx.save();
  ctx.translate(hallCore.x, hallCore.y + 10);

  const ring = ctx.createRadialGradient(0, 0, 0, 0, 0, 110);
  ring.addColorStop(0, `rgba(240,170,201,${0.03 + state.activated.size * 0.01})`);
  ring.addColorStop(1, "rgba(240,170,201,0)");
  ctx.fillStyle = ring;
  ctx.beginPath();
  ctx.arc(0, 0, 112, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = state.finalUnlocked ? "rgba(240,170,201,0.62)" : "rgba(255,228,240,0.12)";
  ctx.lineWidth = state.finalUnlocked ? 4 : 3;
  ctx.beginPath();
  ctx.arc(0, 0, 64, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = state.finalUnlocked ? "rgba(255,210,230,0.42)" : "rgba(255,228,240,0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, 44, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-26, 0);
  ctx.lineTo(0, -28);
  ctx.lineTo(26, 0);
  ctx.lineTo(0, 28);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawDoor(room) {
  const active = state.activated.has(room.name);
  const near = state.nearDoor?.name === room.name;
  const topTagged = room.name === "Vend" || room.name === "Promis" || room.name === "Blend";
  const core = room.portalCore || "#c6d0ff";
  const mid = room.portalMid || "#f2f4ff";
  const emberColor = room.ember || "#ffb56c";

  const cx = room.x + room.w / 2;
  const cy = room.y + room.h / 2;
  const outerR = 56;
  const ringR = 47;
  const innerR = 34;

  ctx.save();

  ctx.fillStyle = "rgba(0,0,0,0.30)";
  ctx.beginPath();
  ctx.arc(cx + 6, cy + 6, outerR, 0, Math.PI * 2);
  ctx.fill();

  const ringGrad = ctx.createRadialGradient(cx - 14, cy - 18, 12, cx, cy, outerR);
  ringGrad.addColorStop(0, near ? "#b0abd8" : "#9592bd");
  ringGrad.addColorStop(0.58, near ? "#7e79aa" : "#706c97");
  ringGrad.addColorStop(1, "#3a344c");
  ctx.fillStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = near ? "rgba(255,255,255,0.68)" : "rgba(210,199,255,0.24)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
  ctx.stroke();

  const runeCount = 8;
  for (let i = 0; i < runeCount; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI * 2) / runeCount;
    const rx = cx + Math.cos(angle) * 48;
    const ry = cy + Math.sin(angle) * 48;
    const rw = i % 2 === 0 ? 10 : 8;
    const rh = i % 2 === 0 ? 18 : 14;
    ctx.save();
    ctx.translate(rx, ry);
    ctx.rotate(angle);
    roundRect(-rw / 2, -rh / 2, rw, rh, 4);
    ctx.fillStyle = i % 2 === 0 ? "#9f9ace" : "#7d79aa";
    ctx.fill();
    ctx.strokeStyle = near ? "rgba(255,255,255,0.44)" : "rgba(255,255,255,0.16)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  for (let i = 0; i < 4; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI * 2) / 4;
    const px = cx + Math.cos(angle) * 56;
    const py = cy + Math.sin(angle) * 56;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(12, 0);
    ctx.lineTo(0, 18);
    ctx.lineTo(-12, 0);
    ctx.closePath();
    ctx.fillStyle = "#4b445e";
    ctx.fill();
    const ember = ctx.createLinearGradient(0, -10, 0, 10);
    ember.addColorStop(0, mid);
    ember.addColorStop(1, emberColor);
    ctx.fillStyle = ember;
    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(6, 0);
    ctx.lineTo(0, 8);
    ctx.lineTo(-6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  const portalGlow = ctx.createRadialGradient(cx, cy, 6, cx, cy, ringR);
  portalGlow.addColorStop(0, "rgba(255,255,255,0.96)");
  portalGlow.addColorStop(0.16, `${mid}ee`);
  portalGlow.addColorStop(0.5, `${core}aa`);
  portalGlow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = portalGlow;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
  ctx.clip();
  for (let i = 0; i < 5; i += 1) {
    const swirl = ctx.createRadialGradient(
      cx + Math.sin((performance.now() * 0.001) + i) * 12,
      cy + Math.cos((performance.now() * 0.0014) + i) * 12,
      4,
      cx,
      cy,
      innerR + 6
    );
    swirl.addColorStop(0, active ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.72)");
    swirl.addColorStop(0.35, `${core}88`);
    swirl.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = swirl;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + 4, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  ctx.strokeStyle = active ? room.accent : `${core}66`;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
  ctx.stroke();

  if (active) {
    ctx.save();
    ctx.shadowColor = room.accent;
    ctx.shadowBlur = 18;
    ctx.strokeStyle = room.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR + 2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  const tagW = Math.max(104, room.name.length * 10.2);
  const tagH = 28;
  const tagX = cx - tagW / 2;
  const tagY = topTagged ? cy - outerR - 44 : cy + outerR + 18;
  ctx.fillStyle = "#111014";
  ctx.fillRect(tagX, tagY, tagW, tagH);
  ctx.strokeStyle = active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.18)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(tagX, tagY, tagW, tagH);

  ctx.fillStyle = active ? "#ffffff" : "#c7c1c7";
  ctx.font = "bold 15px monospace";
  ctx.textAlign = "center";
  ctx.fillText(active ? "DISCOVERED" : room.name.toUpperCase(), tagX + tagW / 2, tagY + 19);
  ctx.restore();
}

function drawRoom() {
  const room = state.room;
  drawStoneBackground();
  drawRoomArchitecture(room);

  roomNodes.forEach((node) => drawNode(node, room));

  ctx.fillStyle = "rgba(255, 228, 240, 0.84)";
  ctx.font = "bold 28px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(room.name, 640, 112);
  ctx.font = "14px Georgia";
  ctx.fillStyle = "rgba(255, 228, 240, 0.58)";
  ctx.fillText(room.wing, 640, 136);
}

function drawRoomArchitecture(room) {
  const accent = room.accent;
  const wing = room.wing;
  const core = room.portalCore;
  const mid = room.portalMid;

  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, "#0f0b10");
  bg.addColorStop(1, "#070609");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(640, 360);

  const chamberGlow = ctx.createRadialGradient(0, -30, 20, 0, 0, 390);
  chamberGlow.addColorStop(0, `${mid}18`);
  chamberGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = chamberGlow;
  ctx.beginPath();
  ctx.ellipse(0, 0, 540, 278, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#120e12";
  ctx.beginPath();
  ctx.ellipse(0, 0, 500, 250, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `${mid}22`;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 462, 230, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `${mid}12`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.ellipse(0, 0, 344, 164, 0, 0, Math.PI * 2);
  ctx.stroke();

  const haze = ctx.createRadialGradient(0, -30, 20, 0, -30, 250);
  haze.addColorStop(0, `${accent}33`);
  haze.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = haze;
  ctx.beginPath();
  ctx.ellipse(0, 0, 360, 180, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `${mid}12`;
  ctx.lineWidth = 1.2;
  for (let i = 0; i < 8; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI * 2) / 8;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 120, Math.sin(angle) * 60);
    ctx.lineTo(Math.cos(angle) * 420, Math.sin(angle) * 208);
    ctx.stroke();
  }
  ctx.restore();

  if (wing === "Accounts & Access") {
    for (let i = 0; i < 4; i += 1) {
      const x = 144 + i * 250;
      ctx.fillStyle = "rgba(26,20,26,0.88)";
      roundRect(x, 190, 126, 214, 28);
      ctx.fill();
      ctx.strokeStyle = `${mid}18`;
      ctx.lineWidth = 2;
      roundRect(x + 14, 206, 98, 180, 22);
      ctx.stroke();
      ctx.fillStyle = `${core}16`;
      roundRect(x + 34, 232, 58, 90, 18);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,228,240,0.05)";
      ctx.beginPath();
      ctx.moveTo(x + 63, 232);
      ctx.lineTo(x + 63, 322);
      ctx.stroke();
    }
  } else if (wing === "Treasury & Yield") {
    ctx.strokeStyle = `${mid}18`;
    ctx.lineWidth = 2;
    for (let r = 0; r < 3; r += 1) {
      ctx.beginPath();
      ctx.arc(640, 338, 82 + r * 40, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let i = 0; i < 6; i += 1) {
      const angle = (i * Math.PI * 2) / 6;
      const x = 640 + Math.cos(angle) * 178;
      const y = 338 + Math.sin(angle) * 104;
      ctx.fillStyle = `${core}22`;
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = `${mid}20`;
      ctx.beginPath();
      ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(28,21,18,0.9)";
    roundRect(520, 494, 240, 76, 26);
    ctx.fill();
  } else if (wing === "Payments & Commerce") {
    const rails = [
      [218, 476, 492, 336],
      [1062, 476, 788, 336],
      [296, 560, 560, 390],
      [984, 560, 720, 390],
      [400, 462, 640, 316],
      [880, 462, 640, 316],
    ];
    ctx.strokeStyle = `${mid}18`;
    ctx.lineWidth = 2;
    for (const [x1, y1, x2, y2] of rails) {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    for (let i = 0; i < 5; i += 1) {
      const x = 260 + i * 190;
      ctx.fillStyle = "rgba(29,21,19,0.88)";
      roundRect(x, 432 + (i % 2) * 20, 92, 58, 18);
      ctx.fill();
    }
  } else {
    for (let i = 0; i < 5; i += 1) {
      const y = 206 + i * 62;
      ctx.strokeStyle = `${mid}16`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(220, y);
      ctx.lineTo(1060, y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(25,20,18,0.9)";
    roundRect(248, 450, 214, 86, 26);
    roundRect(818, 450, 214, 86, 26);
    ctx.fill();
  }
}

function drawNode(node, room) {
  const near = state.nearNode?.id === node.id;
  const active = node.id === "altar" && state.activated.has(room.name);

  if (node.id === "altar") {
    ctx.fillStyle = "#332629";
    roundRect(node.x - 100, node.y + 4, 200, 130, 22);
    ctx.fill();
    ctx.fillStyle = "#564241";
    roundRect(node.x - 74, node.y - 20, 148, 44, 18);
    ctx.fill();

    if (crystalReady) {
      ctx.save();
      ctx.shadowColor = active ? `${room.accent}bb` : "rgba(255, 196, 223, 0.30)";
      ctx.shadowBlur = active ? 42 : 18;
      ctx.globalAlpha = active ? 0.92 : 0.56;
      ctx.drawImage(crystalCanvas, node.x - 42, node.y - 138, 84, 104);
      ctx.restore();
    }
  } else {
    ctx.fillStyle = "#302225";
    roundRect(node.x - 82, node.y - 16, 164, 134, 18);
    ctx.fill();
    ctx.fillStyle = "#665553";
    roundRect(node.x - 60, node.y - 42, 120, 44, 14);
    ctx.fill();
  }

  ctx.strokeStyle = near ? "rgba(255, 228, 240, 0.60)" : "rgba(255, 228, 240, 0.08)";
  ctx.lineWidth = near ? 3 : 2;
  ctx.beginPath();
  ctx.arc(node.x, node.y + 42, node.r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 228, 240, 0.86)";
  ctx.font = "bold 18px Georgia";
  ctx.textAlign = "center";
  const label =
    node.id === "plinth" ? "Entry Tablet" : node.id === "archive" ? "Project Archive" : "Core Altar";
  ctx.fillText(label, node.x, node.y + 170);
}

function drawPlayer() {
  const time = performance.now();
  const idleAmount = player.moveAmount === 0 ? 1 : 0;
  const walkAmount = player.moveAmount;
  const idlePhase = time * 0.0032;
  const walkPhase = time * 0.017;
  const bob = Math.sin(idlePhase) * 0.9 * idleAmount;
  const headLift = Math.sin(idlePhase + 0.2) * 0.5 * idleAmount;
  const armSwingFront = Math.sin(walkPhase) * 10 * walkAmount;
  const armSwingBack = Math.sin(walkPhase + Math.PI) * 10 * walkAmount;
  const legSwingFront = Math.sin(walkPhase + Math.PI) * 8 * walkAmount;
  const legSwingBack = Math.sin(walkPhase) * 8 * walkAmount;

  ctx.save();
  ctx.translate(player.x - 30, player.y - 98 + bob);
  ctx.scale(0.82, 0.82);

  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(37, 173, 28, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#232126";
  ctx.lineWidth = 2.2;

  const fillShape = (color, points) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  };

  fillShape("#8a6548", [
    [90, 29 + armSwingFront * 0.02],
    [103 + armSwingFront * 0.25, 35],
    [108 + armSwingFront * 0.46, 48],
    [102 + armSwingFront * 0.72, 78],
    [90 + armSwingFront * 0.58, 80],
    [84, 46],
  ]);

  fillShape("#d0b28a", [
    [87 + armSwingFront * 0.62, 80],
    [106 + armSwingFront * 0.76, 80],
    [113 + armSwingFront * 0.82, 89],
    [108 + armSwingFront * 0.76, 100],
    [92 + armSwingFront * 0.66, 100],
    [85 + armSwingFront * 0.6, 90],
  ]);

  fillShape("#7a563f", [
    [35, 4 + headLift],
    [49, -1 + headLift],
    [64, 4 + headLift],
    [66, 16 + headLift],
    [60, 20 + headLift],
    [41, 20 + headLift],
    [34, 16 + headLift],
  ]);

  fillShape("#8f6748", [
    [14, 34],
    [31, 24],
    [82, 24],
    [95, 34],
    [91, 49],
    [74, 60],
    [27, 60],
    [12, 48],
  ]);

  fillShape("#b6936d", [
    [31, 31],
    [72, 31],
    [76, 37],
    [71, 53],
    [38, 53],
    [29, 40],
  ]);

  if (crystalReady) {
    const glow = 10 + Math.sin(time * 0.012) * 2.6;
    ctx.save();
    ctx.globalAlpha = 0.68;
    ctx.shadowColor = "rgba(245,181,214,0.95)";
    ctx.shadowBlur = glow;
    ctx.drawImage(crystalCanvas, 45, 32, 18, 20);
    ctx.restore();
  }

  fillShape("#6d4b37", [
    [59, 86],
    [69 + legSwingBack * 0.34, 84],
    [73 + legSwingBack * 0.62, 118],
    [62 + legSwingBack * 0.48, 122],
    [57 + legSwingBack * 0.16, 99],
  ]);

  fillShape("#8b6448", [
    [57 + legSwingBack * 0.42, 116],
    [75 + legSwingBack * 0.56, 114],
    [79 + legSwingBack * 0.7, 132],
    [60 + legSwingBack * 0.44, 133],
    [52 + legSwingBack * 0.28, 125],
  ]);

  fillShape("#c4a179", [
    [60 + legSwingBack * 0.44, 118],
    [74 + legSwingBack * 0.54, 117],
    [77 + legSwingBack * 0.58, 120],
    [77 + legSwingBack * 0.56, 126],
    [74 + legSwingBack * 0.52, 129],
    [62 + legSwingBack * 0.42, 129],
    [59 + legSwingBack * 0.4, 126],
    [58 + legSwingBack * 0.4, 121],
  ]);

  fillShape("#6f4e39", [
    [35, 74],
    [64, 74],
    [67, 80],
    [63, 89],
    [38, 89],
    [31, 80],
  ]);

  fillShape("#7f5b42", [
    [34, 86],
    [44 + legSwingFront * 0.34, 84],
    [46 + legSwingFront * 0.62, 117],
    [35 + legSwingFront * 0.48, 122],
    [30 + legSwingFront * 0.16, 99],
  ]);

  fillShape("#8b6448", [
    [27 + legSwingFront * 0.42, 116],
    [45 + legSwingFront * 0.56, 114],
    [48 + legSwingFront * 0.7, 132],
    [28 + legSwingFront * 0.44, 133],
    [21 + legSwingFront * 0.28, 125],
  ]);

  fillShape("#6f4d38", [
    [18, 28 + armSwingBack * 0.02],
    [7 + armSwingBack * 0.25, 36],
    [2 + armSwingBack * 0.45, 54],
    [7 + armSwingBack * 0.7, 84],
    [20 + armSwingBack * 0.55, 82],
    [25, 45],
  ]);

  fillShape("#d0b28a", [
    [0 + armSwingBack * 0.72, 84],
    [19 + armSwingBack * 0.64, 84],
    [22 + armSwingBack * 0.68, 95],
    [18 + armSwingBack * 0.68, 100],
    [3 + armSwingBack * 0.7, 99],
    [-2 + armSwingBack * 0.76, 91],
  ]);

  fillShape("#c4a179", [
    [30 + legSwingFront * 0.44, 118],
    [44 + legSwingFront * 0.54, 117],
    [47 + legSwingFront * 0.58, 120],
    [47 + legSwingFront * 0.56, 126],
    [44 + legSwingFront * 0.52, 129],
    [32 + legSwingFront * 0.42, 129],
    [29 + legSwingFront * 0.4, 126],
    [28 + legSwingFront * 0.4, 121],
  ]);

  ctx.fillStyle = "#d7c5bb";
  ctx.beginPath();
  ctx.arc(49, 11 + headLift, 1.8, 0, Math.PI * 2);
  ctx.arc(56, 10 + headLift, 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function loop() {
  movePlayer();
  updateProximity();
  updateSidebar();

  if (state.mode === "hall") {
    drawHall();
  } else {
    drawRoom();
  }

  drawPlayer();
  requestAnimationFrame(loop);
}

function handleInteract() {
  if (state.papyrusOpen) {
    closePapyrus();
    return;
  }

  if (state.mode === "hall") {
    if (state.nearDoor) {
      enterRoom(state.nearDoor);
      return;
    }
    triggerFinal();
    return;
  }

  if (!state.nearNode) return;

  if (state.nearNode.id === "plinth") {
    inscriptionText.textContent = state.room.inscription;
    detailText.textContent = `${state.room.detail} ${state.room.ritual}`;
    openPapyrus(state.room, "plinth");
  } else if (state.nearNode.id === "archive") {
    inscriptionText.textContent = `${state.room.name} · ${state.room.subtitle}`;
    detailText.textContent = state.room.detail;
    openPapyrus(state.room, "archive");
  }
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright", " ", "e", "q"].includes(key) || event.code === "Space") {
    event.preventDefault();
  }

  keys.add(key);

  if (key === "escape" && state.papyrusOpen) {
    closePapyrus();
    return;
  }

  if (key === "e") {
    handleInteract();
  } else if (key === "q" && state.mode === "room") {
    if (state.papyrusOpen) {
      closePapyrus();
      return;
    }
    leaveRoom();
  } else if ((key === " " || event.code === "Space") && state.mode === "room") {
    if (state.papyrusOpen) return;
    activateCurrentRoom();
  }
});

window.addEventListener("keyup", (event) => {
  keys.delete(event.key.toLowerCase());
});

updateSidebar();
papyrusClose.addEventListener("click", closePapyrus);
papyrusOverlay.addEventListener("click", (event) => {
  if (event.target === papyrusOverlay) closePapyrus();
});
loop();
