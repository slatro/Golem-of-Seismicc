import sys

file_path = "golem-of-seismic-playable.js"
with open(file_path, "r") as f:
    content = f.read()

# 1. Update globals
globals_old = """let currentStage = 0;
let inInterior = false;
let papyrusOpen = false;
let time = 0;
let logosCollected = 0;
let lastShootTime = 0;"""

globals_new = """let currentStage = 0;
let inInterior = false;
let papyrusOpen = false;
let time = 0;
let logosCollected = 0;
let lastShootTime = 0;

let chestOpened = false;
let chestGemY = 0;
let golemEmpowered = false;"""

content = content.replace(globals_old, globals_new)


# 2. drawBrandLogo case 10
logo_old = """    case 10: // Seismic - Grand Palace S
      fillColor = "#7e22ce"; // Royal purple
      glowColorStr = "168, 85, 247"; // Neon purple/pink glow
      ctx.beginPath();
      ctx.moveTo(px + 32, py + 14); // Top point
      ctx.lineTo(px + 44, py + 24);
      ctx.lineTo(px + 38, py + 29);
      ctx.lineTo(px + 32, py + 22);
      ctx.lineTo(px + 24, py + 28);
      ctx.lineTo(px + 32, py + 36); // Middle crossover
      ctx.lineTo(px + 44, py + 30);
      ctx.lineTo(px + 44, py + 38);
      ctx.lineTo(px + 32, py + 48); // Bottom point
      ctx.lineTo(px + 20, py + 38);
      ctx.lineTo(px + 26, py + 33);
      ctx.lineTo(px + 32, py + 40);
      ctx.lineTo(px + 40, py + 34);
      ctx.lineTo(px + 32, py + 26); // Middle crossover
      ctx.lineTo(px + 20, py + 32);
      ctx.lineTo(px + 20, py + 24);
      ctx.closePath();
      break;"""

logo_new = """    case 10: // Seismic - Low Poly Pink Gemstone
      glowColorStr = "255, 120, 180"; // Bright neon pink glow
      sparkColor = "rgba(255, 120, 180, 0.9)";
      ctx.shadowColor = `rgba(255, 120, 180, ${pulse})`;
      
      const drawFacet = (pts, color) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(px + pts[0][0], py + pts[0][1]);
        for(let i=1; i<pts.length; i++) ctx.lineTo(px + pts[i][0], py + pts[i][1]);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.25)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      };
      
      // Main front facing large polygon
      drawFacet([[20, 24], [36, 16], [46, 30], [32, 46], [16, 34]], "#c67a92"); 
      // Top left polygon
      drawFacet([[26, 10], [36, 16], [20, 24]], "#dba2b6");
      // Top right polygon
      drawFacet([[36, 16], [42, 12], [46, 30]], "#954963");
      // Bottom right polygon
      drawFacet([[46, 30], [38, 48], [32, 46]], "#71304a");
      // Bottom left polygon
      drawFacet([[32, 46], [26, 52], [16, 34]], "#8c3b5a");
      // Far left polygon
      drawFacet([[16, 34], [10, 26], [20, 24]], "#a35470");
      // Upper far left polygon
      drawFacet([[10, 26], [26, 10], [20, 24]], "#b26480");

      ctx.restore();
      return sparkColor;"""

content = content.replace(logo_old, logo_new)


# 3. STAGE_TEMPLATES
stage_old = """  ],
  [ // Stage 10 - Seismic (Final Majestic Palace Walk)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#..........................................................#",
    "#..........................................................#",
    "############################################################",
    "############################################################",
    "############################################################"
  ]
];"""

stage_new = """  ]
];"""

content = content.replace(stage_old, stage_new)


# 4. initStage
init_old = """  if (inInterior) {
    map = generateInteriorMap(currentStage);
  } else if (currentStage < 11) {
    map = parseTemplate(STAGE_TEMPLATES[currentStage % STAGE_TEMPLATES.length]);
  } else {
    // Final Sanctum
    map = parseTemplate([
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      ".........C..........",
      ".......#####........",
      "T.....#######.....T.",
      "....................",
      "####################",
      "####################"
    ]);
  }"""

init_new = """  if (currentStage === 10) {
    // Final Room (Seismic) has no outdoor stage, directly load interior palace
    inInterior = true;
    map = generateInteriorMap(10);
  } else if (inInterior) {
    map = generateInteriorMap(currentStage);
  } else if (currentStage < 10) {
    map = parseTemplate(STAGE_TEMPLATES[currentStage]);
  } else {
    // Post-game or empty
    map = parseTemplate([
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      ".......#####........",
      "T.....#######.....T.",
      "....................",
      "####################",
      "####################"
    ]);
  }"""

content = content.replace(init_old, init_new)


# 5. updateUI
ui_old = """  if (inInterior) {
    const r = ROOMS[currentStage];
    spaceName.textContent = `Sanctum: ${r.name}`;
    roomTitle.textContent = `${r.name} Anıtı`;
    roomSubtitle.textContent = "Güvenli bölge. Bilgeliği dinle.";
    inscriptionText.textContent = "E ile anıtı oku. Ardından sağdaki kapıdan çık.";
  } else if (currentStage < 11) {
    spaceName.textContent = `Stage ${currentStage + 1}`;
    roomTitle.textContent = "Yolculuk";
    roomSubtitle.textContent = "Engelleri aş, portala ulaş.";
    inscriptionText.textContent = "Kafanla bloklara vur, F tuşu ile ışın atarak düşmanları yok et.";
  } else {
    spaceName.textContent = "Final";
    roomTitle.textContent = "The Core";
    roomSubtitle.textContent = "Kutsal sismik çekirdeğe ulaştın.";
    inscriptionText.textContent = "Oyun tamamlandı.";
  }"""

ui_new = """  if (currentStage === 10) {
    const r = ROOMS[10];
    spaceName.textContent = "Final: " + r.name;
    roomTitle.textContent = r.name + " Palace";
    roomSubtitle.textContent = r.subtitle;
    inscriptionText.textContent = "Sandığa ulaş ve efsanevi gücü al (E tuşu).";
  } else if (inInterior) {
    const r = ROOMS[currentStage];
    spaceName.textContent = `Sanctum: ${r.name}`;
    roomTitle.textContent = `${r.name} Anıtı`;
    roomSubtitle.textContent = "Güvenli bölge. Bilgeliği dinle.";
    inscriptionText.textContent = "E ile anıtı oku. Ardından sağdaki kapıdan çık.";
  } else if (currentStage < 10) {
    spaceName.textContent = `Stage ${currentStage + 1}`;
    roomTitle.textContent = "Yolculuk";
    roomSubtitle.textContent = "Engelleri aş, portala ulaş.";
    inscriptionText.textContent = "Kafanla bloklara vur, F tuşu ile ışın atarak düşmanları yok et.";
  } else {
    spaceName.textContent = "The End";
    roomTitle.textContent = "Oyun Bitti";
    roomSubtitle.textContent = "Tüm güçleri topladın.";
    inscriptionText.textContent = "Teşekkürler.";
  }"""

content = content.replace(ui_old, ui_new)


# 6. tryInteract
interact_old = """    if (nearExit) { inInterior = false; currentStage++; initStage(); }
  }
}"""

interact_new = """    if (nearExit) { inInterior = false; currentStage++; initStage(); }
  } else if (currentStage === 10) {
    let nearChest = false;
    for(let y=ty-2; y<=ty+2; y++) {
      for(let x=tx-2; x<=tx+2; x++) {
        if(y>=0 && y<mapHeight && x>=0 && x<mapWidth && map[y][x] === 4) {
          nearChest = true;
        }
      }
    }
    if (nearChest) {
      if (!chestOpened) {
        chestOpened = true; // crystal starts rising
      } else if (chestGemY >= 60 && !golemEmpowered) {
        golemEmpowered = true; // touch crystal to empower
      }
    }
  }
}"""

content = content.replace(interact_old, interact_new)


# 7. drawPlayer Scale
scale_old = """  ctx.save();
  ctx.translate(player.x + player.w/2, player.y + player.h);
  if (!player.facingRight) ctx.scale(-1, 1);
  ctx.scale(0.6, 0.6); 
  ctx.translate(-55, -133 + bob); """

scale_new = """  ctx.save();
  ctx.translate(player.x + player.w/2, player.y + player.h);
  if (!player.facingRight) ctx.scale(-1, 1);
  if (golemEmpowered) {
    ctx.scale(0.85, 0.85); // Golem grows significantly!
  } else {
    ctx.scale(0.6, 0.6); 
  }
  ctx.translate(-55, -133 + bob); """

content = content.replace(scale_old, scale_new)


# 8. drawPlayer Glow
glow_old = """  fillShape("#48414e", [[67, 34], [72, 40], [74, 52], [67, 43]]); // Chest shade

  fillShape("#00ffcc", [[64, 44], [67, 50], [64, 58], [61, 50]]); // Core diamond (Glowing)"""

glow_new = """  fillShape("#48414e", [[67, 34], [72, 40], [74, 52], [67, 43]]); // Chest shade

  if (golemEmpowered) {
    ctx.shadowColor = "#ff55ff";
    ctx.shadowBlur = 40;
  }
  fillShape("#00ffcc", [[64, 44], [67, 50], [64, 58], [61, 50]]); // Core diamond (Glowing)
  if (golemEmpowered) {
    ctx.shadowBlur = 0;
  }"""

content = content.replace(glow_old, glow_new)


# 9. drawMap Background
bg_old = """function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#030406"; ctx.fillRect(0, 0, canvas.width, canvas.height);"""

bg_new = """function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (currentStage === 10) {
    // Starry Night Sky for Seismic Palace
    ctx.fillStyle = "#020412"; // Deep night blue
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    for (let i = 0; i < 60; i++) {
       const sx = (i * 83 + time * 15) % canvas.width;
       const sy = (i * 101) % (canvas.height / 1.5);
       const sAlpha = Math.max(0.1, Math.sin(time * 3 + i));
       ctx.globalAlpha = sAlpha;
       ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.globalAlpha = 1.0;
  } else {
    ctx.fillStyle = "#030406"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  }"""

content = content.replace(bg_old, bg_new)


# 10. drawMap Pillars & Chest
tiles_old = """      } 
      else if (tile === 5) { // Background Pillar
        ctx.fillStyle = "#1e2430"; ctx.fillRect(px + 16, py, 32, TILE_SIZE);
        ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(px + 16, py, 4, TILE_SIZE);
        ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(px + 44, py, 4, TILE_SIZE);
      }"""

tiles_new = """      } 
      else if (tile === 5) { // Background Pillar
        if (currentStage === 10) {
          // Prince of Persia style Ornate Arabic Pillar
          ctx.fillStyle = "#d5b47a"; // Beige/Sandstone base
          ctx.fillRect(px + 12, py, 40, TILE_SIZE);
          ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(px + 12, py, 6, TILE_SIZE);
          ctx.fillStyle = "rgba(255,255,255,0.1)"; ctx.fillRect(px + 46, py, 6, TILE_SIZE);
          
          // Draw horizontal bands
          ctx.fillStyle = "#8b5a2b";
          if (py % 128 === 0) ctx.fillRect(px + 10, py, 44, 12);

          // Arch springing at the very top (y=1)
          if (y > 0 && map[y-1] && map[y-1][x] !== 5 && map[y-1][x] !== 1) {
             ctx.fillStyle = "#ebd59f";
             ctx.fillRect(px + 4, py, 56, 16);
             // Left curve
             ctx.beginPath();
             ctx.moveTo(px + 4, py + 16);
             ctx.quadraticCurveTo(px - 16, py + 32, px - 32, py + 32);
             ctx.lineTo(px - 32, py); ctx.lineTo(px + 4, py);
             ctx.fill();
             // Right curve
             ctx.beginPath();
             ctx.moveTo(px + 60, py + 16);
             ctx.quadraticCurveTo(px + 80, py + 32, px + 96, py + 32);
             ctx.lineTo(px + 96, py); ctx.lineTo(px + 60, py);
             ctx.fill();
             
             // Ornate dot pattern on arch top
             ctx.fillStyle = "#8b5a2b";
             for (let i = 0; i < 56; i+= 8) {
               ctx.fillRect(px + 8 + i, py + 6, 4, 4);
             }
          }
        } else {
          ctx.fillStyle = "#1e2430"; ctx.fillRect(px + 16, py, 32, TILE_SIZE);
          ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(px + 16, py, 4, TILE_SIZE);
          ctx.fillStyle = "rgba(255,255,255,0.05)"; ctx.fillRect(px + 44, py, 4, TILE_SIZE);
        }
      }
      else if (tile === 4) { // Treasure Chest
        // Golden ornate chest base
        ctx.fillStyle = "#b8860b"; ctx.fillRect(px + 8, py + 32, 48, 32);
        ctx.fillStyle = "#d4af37"; ctx.fillRect(px + 12, py + 36, 40, 24);
        
        if (chestOpened) {
           // Chest lid open
           ctx.fillStyle = "#d4af37";
           ctx.beginPath(); 
           ctx.moveTo(px+8, py+32); 
           ctx.lineTo(px+24, py+4); 
           ctx.lineTo(px+64, py+4); 
           ctx.lineTo(px+48, py+32); 
           ctx.fill();
           ctx.strokeStyle = "#8b4513"; ctx.lineWidth = 2; ctx.stroke();
           
           // Draw Rising Gemstone!
           ctx.save();
           // use drawBrandLogo case 10 style inline to draw the gem
           const gy = py + 32 - chestGemY;
           const pulse = (Math.sin(time * 5) + 1) / 2;
           ctx.shadowColor = `rgba(255, 120, 180, ${pulse})`;
           ctx.shadowBlur = 15;
           
           const drawFacet = (pts, color) => {
             ctx.fillStyle = color; ctx.beginPath();
             ctx.moveTo(px + pts[0][0], gy + pts[0][1] - 32);
             for(let i=1; i<pts.length; i++) ctx.lineTo(px + pts[i][0], gy + pts[i][1] - 32);
             ctx.closePath(); ctx.fill();
             ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 0.5; ctx.stroke();
           };
           drawFacet([[20, 24], [36, 16], [46, 30], [32, 46], [16, 34]], "#c67a92"); 
           drawFacet([[26, 10], [36, 16], [20, 24]], "#dba2b6");
           drawFacet([[36, 16], [42, 12], [46, 30]], "#954963");
           drawFacet([[46, 30], [38, 48], [32, 46]], "#71304a");
           drawFacet([[32, 46], [26, 52], [16, 34]], "#8c3b5a");
           drawFacet([[16, 34], [10, 26], [20, 24]], "#a35470");
           drawFacet([[10, 26], [26, 10], [20, 24]], "#b26480");
           ctx.restore();

        } else {
           // Chest lid closed
           ctx.fillStyle = "#b8860b";
           ctx.beginPath(); ctx.arc(px + 32, py + 32, 24, Math.PI, 0); ctx.fill();
           ctx.fillStyle = "#d4af37";
           ctx.beginPath(); ctx.arc(px + 32, py + 32, 20, Math.PI, 0); ctx.fill();
           ctx.fillStyle = "#8b4513"; ctx.fillRect(px+28, py+24, 8, 12); // lock
        }
      }"""

content = content.replace(tiles_old, tiles_new)


# 11. loop update
loop_old = """function loop() {
  time += 0.016;
  updatePhysics();
  draw();"""

loop_new = """function loop() {
  time += 0.016;
  if (chestOpened && chestGemY < 60) {
    chestGemY += 1;
  }
  updatePhysics();
  draw();"""

content = content.replace(loop_old, loop_new)

# Generate palace map dynamically for 10
map_gen_old = """  } else { // Stage 10 - Seismic (Grand Royal Palace)
    temp = [
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      ".........C..........",
      ".......#####........",
      "T.....#######.....T.",
      "....................",
      "####################",
      "####################"
    ];
  }"""

map_gen_new = """  } else { // Stage 10 - Seismic (Grand Royal Palace)
    temp = [
      "....................",
      ".5.......5.......5..",
      ".5.......5.......5..",
      ".5.......5.......5..",
      ".5.......5.......5..",
      ".5.......5.......5..",
      ".5.......C.......5..",
      ".5.....#####.....5..",
      ".5....#######....5..",
      ".5...#########...5..",
      "####################",
      "####################"
    ];
  }"""

content = content.replace(map_gen_old, map_gen_new)

with open(file_path, "w") as f:
    f.write(content)
print("Updated successfully.")
