const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const interactionHint = document.getElementById("interaction-hint");
const loreModal = document.getElementById("lore-modal");
const loreTitle = document.getElementById("lore-title");
const loreText = document.getElementById("lore-text");
const closeModalBtn = document.getElementById("close-modal");
const fadeOverlay = document.getElementById("fade-overlay");

let width, height;
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener("resize", resize);
resize();

// ----------------------------------------------------
// Assets Loading
// ----------------------------------------------------
const images = {};
let assetsLoaded = 0;
const totalAssets = 5;

function loadImage(name, src) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    assetsLoaded++;
  };
  images[name] = img;
}

loadImage("crystal", "./crystal-reference.png");
loadImage("canyon", "./env-canyon.png");
loadImage("layered", "./env-layered-block.png");
loadImage("arch", "./env-question-arch.png");
loadImage("gold", "./env-gold-mountain.png");

// ----------------------------------------------------
// Game State & Room System
// ----------------------------------------------------
let coreAwakening = 0; 
let isModalOpen = false;
let isFading = false;

const ROOMS = {
  "GreatHall": {
    name: "The Great Hall",
    width: 12000,
    doors: [
      { x: 1000, target: "Brookwell", label: "ACCOUNTS WING: BROOKWELL" },
      { x: 2000, target: "Avvio", label: "ACCOUNTS WING: AVVIO" },
      { x: 3000, target: "Via", label: "ACCOUNTS WING: VIA" },
      { x: 4000, target: "Shift", label: "ACCOUNTS WING: SHIFT" },
      { x: 5000, target: "Blend", label: "YIELD WING: BLEND" },
      { x: 6000, target: "Promis", label: "YIELD WING: PROMIS" },
      { x: 7000, target: "Vend", label: "COMMERCE WING: VEND" },
      { x: 8000, target: "DashX", label: "COMMERCE WING: DASHX" },
      { x: 9000, target: "Specie", label: "MARKETS WING: SPECIE" },
      { x: 10000, target: "PortMarkets", label: "MARKETS WING: PORT MARKETS" }
    ],
    pillars: [],
    bgLayer1: "canyon",
    bgLayer2: "arch",
    floorColor: "#1e161a"
  },
  "Brookwell": {
    name: "Brookwell Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "BROOKWELL", text: "Safe holding. Open access. Silent stability.", visited: false }],
    bgLayer1: "layered", bgLayer2: "gold", floorColor: "#15161c"
  },
  "Avvio": {
    name: "Avvio Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "AVVIO", text: "One account. Many thresholds.", visited: false }],
    bgLayer1: "gold", bgLayer2: "layered", floorColor: "#181716"
  },
  "Via": {
    name: "Via Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "VIA", text: "Capital travels farther on silent rails.", visited: false }],
    bgLayer1: "canyon", bgLayer2: "layered", floorColor: "#1c1819"
  },
  "Shift": {
    name: "Shift Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "SHIFT", text: "Trust remains with the holder.", visited: false }],
    bgLayer1: "layered", bgLayer2: "arch", floorColor: "#14151a"
  },
  "Blend": {
    name: "Blend Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "BLEND", text: "Idle value should still move.", visited: false }],
    bgLayer1: "gold", bgLayer2: "arch", floorColor: "#201b15"
  },
  "Promis": {
    name: "Promis Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "PROMIS", text: "Yield must answer the real world.", visited: false }],
    bgLayer1: "layered", bgLayer2: "canyon", floorColor: "#17181c"
  },
  "Vend": {
    name: "Vend Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "VEND", text: "Commerce lives in motion.", visited: false }],
    bgLayer1: "canyon", bgLayer2: "gold", floorColor: "#1e161a"
  },
  "DashX": {
    name: "DashX Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "DASHX", text: "Distribution is the visible shape of the invisible rail.", visited: false }],
    bgLayer1: "arch", bgLayer2: "gold", floorColor: "#1a181b"
  },
  "Specie": {
    name: "Specie Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "SPECIE", text: "Settlement without friction. Reach without border.", visited: false }],
    bgLayer1: "gold", bgLayer2: "canyon", floorColor: "#15181c"
  },
  "PortMarkets": {
    name: "Port Markets Chamber",
    width: 2500,
    doors: [{ x: 300, target: "GreatHall", label: "RETURN TO GREAT HALL" }],
    pillars: [{ x: 1500, title: "PORT MARKETS", text: "Trade survives when flow finds structure.", visited: false }],
    bgLayer1: "layered", bgLayer2: "arch", floorColor: "#1a1c1d"
  }
};

let currentRoomKey = "GreatHall";
let currentRoom = ROOMS[currentRoomKey];

const player = {
  x: 500,
  y: 0,
  w: 56,
  h: 78,
  vx: 0,
  speed: 4.0,
  facing: 1
};

let cameraX = 0;
let time = 0;
let groundY = 0;

// Particles
let particles = [];
function spawnParticles(x, y, color, count, force = 1.5) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * force * 2.4,
      vy: (Math.random() - 0.7) * force * 2.2,
      life: 40 + Math.random() * 40,
      maxLife: 80,
      color,
      size: 1 + Math.random() * 3,
    });
  }
}

const dustParticles = Array.from({length: 80}).map(() => ({
  x: Math.random() * 3000,
  y: Math.random() * 1000,
  speed: 0.1 + Math.random() * 0.4,
  size: Math.random() * 2
}));

// ----------------------------------------------------
// Input & Interaction
// ----------------------------------------------------
const keys = new Set();
window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if (e.key.toLowerCase() === 'e') {
    handleInteraction();
  }
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

closeModalBtn.addEventListener("click", closeLore);

let activeInteractable = null; // { type: 'door' | 'pillar', data: object }

function handleInteraction() {
  if (isFading) return;
  
  if (isModalOpen) {
    closeLore();
    return;
  }

  if (activeInteractable) {
    if (activeInteractable.type === 'door') {
      transitionToRoom(activeInteractable.data.target);
    } else if (activeInteractable.type === 'pillar') {
      openLore(activeInteractable.data);
    }
  }
}

function transitionToRoom(targetRoomKey) {
  isFading = true;
  fadeOverlay.classList.add("active");
  
  setTimeout(() => {
    currentRoomKey = targetRoomKey;
    currentRoom = ROOMS[currentRoomKey];
    player.x = 400; // spawn point
    player.vx = 0;
    cameraX = 0;
    
    setTimeout(() => {
      fadeOverlay.classList.remove("active");
      isFading = false;
    }, 800);
  }, 800);
}

function openLore(pillar) {
  isModalOpen = true;
  loreTitle.textContent = pillar.title;
  loreText.textContent = pillar.text;
  loreModal.classList.remove("hidden");
  interactionHint.classList.add("hidden");

  if (!pillar.visited) {
    pillar.visited = true;
    coreAwakening++;
    spawnParticles(player.x + 28, player.y - 40, "#f0a9c8", 40, 2.5);
  }
}

function closeLore() {
  isModalOpen = false;
  loreModal.classList.add("hidden");
}

// ----------------------------------------------------
// Update
// ----------------------------------------------------
function update() {
  time++;
  groundY = height - 120;
  player.y = groundY;

  if (!isModalOpen && !isFading) {
    const left = keys.has("a") || keys.has("arrowleft");
    const right = keys.has("d") || keys.has("arrowright");

    if (left && !right) {
      player.vx = -player.speed;
      player.facing = -1;
    } else if (right && !left) {
      player.vx = player.speed;
      player.facing = 1;
    } else {
      player.vx *= 0.82; 
      if (Math.abs(player.vx) < 0.1) player.vx = 0;
    }

    player.x += player.vx;
    player.x = Math.max(100, Math.min(currentRoom.width - 200, player.x));
  } else {
    player.vx = 0;
  }

  // Camera Follow
  const targetCameraX = player.x - width / 2;
  cameraX += (targetCameraX - cameraX) * 0.06;
  cameraX = Math.max(0, Math.min(currentRoom.width - width, cameraX));

  // Check interactions
  let nearest = null;
  let minDist = 150;

  for (const door of currentRoom.doors) {
    const dist = Math.abs(player.x - door.x);
    if (dist < minDist) {
      minDist = dist;
      nearest = { type: 'door', data: door };
    }
  }

  for (const pillar of currentRoom.pillars) {
    const dist = Math.abs(player.x - pillar.x);
    if (dist < minDist) {
      minDist = dist;
      nearest = { type: 'pillar', data: pillar };
    }
  }

  if (nearest && !isModalOpen && !isFading) {
    activeInteractable = nearest;
    interactionHint.innerHTML = `<span class="key">E</span> ${nearest.type === 'door' ? nearest.data.label : 'Kitabeyi Oku'}`;
    interactionHint.classList.remove("hidden");
  } else {
    activeInteractable = null;
    interactionHint.classList.add("hidden");
  }

  // Update particles
  particles = particles.filter((p) => p.life > 0);
  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy -= 0.03; 
    p.life--;
  }

  for (const d of dustParticles) {
    d.y -= d.speed;
    d.x += Math.sin(time * 0.01 + d.y * 0.01) * 0.5;
    if (d.y < 0) {
      d.y = height + 10;
      d.x = Math.random() * (width + 400) - 200;
    }
  }
}

// ----------------------------------------------------
// Rendering
// ----------------------------------------------------
function drawImageParallax(imgKey, parallaxFactor, yOffset, alpha) {
  if (!images[imgKey] || images[imgKey].width === 0) return;
  const img = images[imgKey];
  ctx.save();
  ctx.globalAlpha = alpha;
  const offsetX = (cameraX * parallaxFactor) % img.width;
  
  // Draw multiple times to cover screen
  const segments = Math.ceil(width / img.width) + 1;
  for (let i = -1; i < segments; i++) {
    const drawX = i * img.width - offsetX;
    ctx.drawImage(img, drawX, yOffset, img.width, img.height);
  }
  ctx.restore();
}

function drawBackground() {
  ctx.clearRect(0, 0, width, height);
  
  // Base dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
  bgGrad.addColorStop(0, "#0a0709");
  bgGrad.addColorStop(1, "#050304");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  if (assetsLoaded === totalAssets) {
    // Deep layer
    drawImageParallax(currentRoom.bgLayer1, 0.15, height - images[currentRoom.bgLayer1].height - 100, 0.4);
    // Mid layer
    drawImageParallax(currentRoom.bgLayer2, 0.35, height - images[currentRoom.bgLayer2].height - 60, 0.6);
  }

  ctx.save();
  ctx.translate(-cameraX, 0);

  // Ground glowing rail
  const railGlow = ctx.createLinearGradient(0, 0, currentRoom.width, 0);
  const glowIntensity = 0.15 + (coreAwakening / 10) * 0.85;
  railGlow.addColorStop(0, `rgba(240, 169, 200, ${glowIntensity})`);
  railGlow.addColorStop(1, `rgba(240, 169, 200, ${glowIntensity * 0.2})`);
  
  ctx.fillStyle = railGlow;
  ctx.fillRect(0, groundY + 2, currentRoom.width, 4);

  // Ground
  ctx.fillStyle = currentRoom.floorColor;
  ctx.fillRect(0, groundY, currentRoom.width, height - groundY);

  // Draw Doors
  for (const door of currentRoom.doors) {
    ctx.fillStyle = "#110c0e";
    ctx.fillRect(door.x - 60, groundY - 240, 120, 240);
    ctx.fillStyle = "#22191d";
    ctx.fillRect(door.x - 50, groundY - 230, 100, 230);
    
    // Door label
    ctx.fillStyle = "#bda3b0";
    ctx.font = "14px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(door.label, door.x, groundY - 260);

    // Door glow if near
    if (activeInteractable && activeInteractable.data === door) {
      ctx.shadowColor = "#f0a9c8";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "rgba(240, 169, 200, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(door.x - 50, groundY - 230, 100, 230);
      ctx.shadowBlur = 0;
    }
  }

  // Draw Pillars
  for (const pillar of currentRoom.pillars) {
    const isAwake = pillar.visited;
    
    // Altar base
    ctx.fillStyle = "#2c2026";
    ctx.beginPath();
    ctx.moveTo(pillar.x - 80, groundY);
    ctx.lineTo(pillar.x + 80, groundY);
    ctx.lineTo(pillar.x + 50, groundY - 40);
    ctx.lineTo(pillar.x - 50, groundY - 40);
    ctx.fill();

    // Pillar body
    ctx.fillStyle = "#1e1519";
    ctx.fillRect(pillar.x - 25, groundY - 200, 50, 160);
    
    // Glowing inscription
    if (isAwake) {
      ctx.shadowColor = "#f0a9c8";
      ctx.shadowBlur = 15;
      ctx.fillStyle = "#f0a9c8";
    } else {
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#5c404c";
    }
    
    ctx.fillRect(pillar.x - 6, groundY - 180, 12, 120);
    ctx.shadowBlur = 0; 
  }

  ctx.restore();
}

function drawPlayer() {
  const x = player.x - cameraX;
  const y = player.y;
  
  const walkAmount = Math.min(1, Math.abs(player.vx) / player.speed);
  const walkPhase = time * 0.045;
  const bob = Math.sin(walkPhase * 2) * 5 * walkAmount;
  
  ctx.save();
  const ox = x - 26;
  const oy = y - 90 + bob;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.beginPath();
  ctx.ellipse(x + 28, y - 5, 26, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#110b0e";
  ctx.lineWidth = 2.2;

  const fillShape = (color, points) => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i][0], points[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  };

  // Back Arm
  fillShape("#4d3527", [
    [ox + 18, oy + 28], [ox + 7, oy + 36], [ox + 2, oy + 54],
    [ox + 7, oy + 84], [ox + 20, oy + 82], [ox + 25, oy + 45],
  ]);

  // Back Leg
  const legSwingBack = Math.sin(walkPhase) * 18 * walkAmount;
  fillShape("#3a271c", [
    [ox + 18 + legSwingBack, oy + 70], [ox + 25 + legSwingBack, oy + 90], [ox + 15 + legSwingBack, oy + 90],
  ]);

  // Body Main
  fillShape("#6e4e3b", [
    [ox + 10, oy + 20], [ox + 45, oy + 10], [ox + 60, oy + 35],
    [ox + 40, oy + 75], [ox + 15, oy + 70],
  ]);

  // Chest Plates
  fillShape("#5a3e2e", [
    [ox + 20, oy + 25], [ox + 50, oy + 20], [ox + 55, oy + 40], [ox + 25, oy + 50],
  ]);

  // The Pink Core
  const coreGlow = 0.5 + (coreAwakening / 10) * 0.7;
  ctx.shadowColor = `rgba(240, 169, 200, ${coreGlow})`;
  ctx.shadowBlur = 25 * coreGlow;
  fillShape("#f0a9c8", [
    [ox + 35, oy + 28], [ox + 42, oy + 32], [ox + 38, oy + 42], [ox + 30, oy + 38],
  ]);
  ctx.shadowBlur = 0;

  // Front Leg
  const legSwingFront = Math.sin(walkPhase + Math.PI) * 18 * walkAmount;
  fillShape("#4d3527", [
    [ox + 38 + legSwingFront, oy + 65], [ox + 45 + legSwingFront, oy + 90], [ox + 30 + legSwingFront, oy + 90],
  ]);

  // Front Arm
  const armSwingFront = Math.sin(walkPhase) * 14 * walkAmount;
  fillShape("#8c644c", [
    [ox + 35, oy + 25], [ox + 50, oy + 28], [ox + 55 + armSwingFront, oy + 55],
    [ox + 45 + armSwingFront, oy + 85], [ox + 35 + armSwingFront, oy + 80], [ox + 30, oy + 50],
  ]);

  // Head
  fillShape("#5a3e2e", [
    [ox + 25, oy + 5], [ox + 40, oy + 0], [ox + 45, oy + 15], [ox + 28, oy + 20],
  ]);

  // Two white eyes matching the size (1.8 radius) and horizontal placement
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(ox + 34, oy + 10, 1.8, 0, Math.PI * 2);
  ctx.arc(ox + 40, oy + 9, 1.8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawDustAndParticles() {
  ctx.save();
  ctx.fillStyle = "rgba(240, 169, 200, 0.45)";
  for (const d of dustParticles) {
    const px = (d.x - cameraX * 0.7) % width;
    const drawX = px < 0 ? px + width : px;
    ctx.beginPath();
    ctx.arc(drawX, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const p of particles) {
    const px = p.x - cameraX;
    ctx.globalAlpha = p.life / p.maxLife;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ----------------------------------------------------
// Game Loop
// ----------------------------------------------------
function loop() {
  update();
  drawBackground();
  drawPlayer();
  drawDustAndParticles();
  
  // Room Name UI
  ctx.fillStyle = "rgba(240, 169, 200, 0.8)";
  ctx.font = "18px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(currentRoom.name.toUpperCase(), 40, 50);

  // Vignette
  const grad = ctx.createRadialGradient(width/2, height/2, height*0.35, width/2, height/2, width*0.75);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  requestAnimationFrame(loop);
}

// Start
fadeOverlay.classList.remove("active");
requestAnimationFrame(loop);
