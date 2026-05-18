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
const papyrusTitle = document.getElementById("papyrusTitle");
const papyrusIntro = document.getElementById("papyrusIntro");
const papyrusBody = document.getElementById("papyrusBody");

const crystalImage = new Image();
let crystalReady = false;
crystalImage.src = "./crystal-reference.png";
crystalImage.onload = () => { crystalReady = true; };

const ROOMS = [
  {
    name: "Brookwell",
    wing: "Accounts & Access",
    subtitle: "Privacy-Enabled Personal and Corporate Cash Accounts",
    portalCore: "#8bbf9e",
    archiveSections: [
      {
        title: "The Vision",
        body: "Brookwell represents the first user-facing financial gateway built on the Seismic network, bridging compliant traditional banking (ACH and international wire rails) with the absolute sovereignty of blockchain technology."
      },
      {
        title: "Core Mechanics",
        body: "By leveraging protocol-level encryption and Trusted Execution Environments (TEEs), Brookwell allows corporations and retail users to hold stablecoin assets and distribute high-volume payroll or rent payments. The entire flow remains fully shielded, securing account balances and counterparty details from public exposure while earning institutional DeFi yields."
      }
    ]
  },
  {
    name: "Avvio",
    wing: "Accounts & Access",
    subtitle: "Modular Multi-Threshold Account Abstraction Enclave",
    portalCore: "#67cfff",
    archiveSections: [
      {
        title: "The Vision",
        body: "Avvio serves as the granular permission and access control vault of the Seismic ecosystem, allowing institutional multi-signature management and customized execution rules to reside within shielded enclaves."
      },
      {
        title: "Core Mechanics",
        body: "Avvio implements advanced account abstraction (ERC-4337 compatibility) powered by private state-shielding. Organizations can set sub-account limits, transaction triggers, and multi-threshold signing permissions. Because the key-sharing and threshold structures are computed within a secure enclave, the underlying operational rules and security parameters are never leaked to public networks."
      }
    ]
  },
  {
    name: "Via",
    wing: "Accounts & Access",
    subtitle: "Confidential Capital Routing and Cross-Border Transfer Rails",
    portalCore: "#ff5ca8",
    archiveSections: [
      {
        title: "The Vision",
        body: "Via operates as the silent transport network for capital, routing corporate and retail funds globally across multiple chains and traditional banking ledgers without leaving public trails."
      },
      {
        title: "Core Mechanics",
        body: "Via employs zero-knowledge path routing to seamlessly execute borderless multi-chain transfers. Transaction sizes, destination addresses, and intermediary nodes are entirely hidden. This eliminates high-frequency front-running and MEV attacks, ensuring that corporate settlement flows remain protected against toxic market exploitation."
      }
    ]
  },
  {
    name: "Shift",
    wing: "Accounts & Access",
    subtitle: "Shielded Regulatory Compliance and Identity Registry",
    portalCore: "#8e72ff",
    archiveSections: [
      {
        title: "The Vision",
        body: "Shift resolves the age-old tension between regulatory compliance and financial privacy, providing an elegant cryptographic portal for KYC, AML, and user accreditation."
      },
      {
        title: "Core Mechanics",
        body: "Using private execution states, Shift allows users to generate zero-knowledge compliance attestations. Financial institutions and decentralized applications can instantly verify that a participant is fully accredited and legally compliant without ever gaining access to or storing their sensitive Personally Identifiable Information (PII), drastically reducing data leak risks."
      }
    ]
  },
  {
    name: "Blend",
    wing: "Treasury & Yield",
    subtitle: "Non-Custodial Corporate Treasury and Shielded Yield Optimizer",
    portalCore: "#5f7dff",
    archiveSections: [
      {
        title: "The Vision",
        body: "Blend transforms corporate treasury management, enabling businesses to deploy idle balances into decentralized money markets to capture yield while maintaining balance sheet secrecy."
      },
      {
        title: "Core Mechanics",
        body: "Blend routes corporate deposits directly into optimized lending enclaves. While traditional on-chain yield farming exposes a corporation's financial runway and liquid reserves, Blend keeps the size, destination, and strategy of the yield optimization fully confidential, guaranteeing holder-side trust and commercial secrecy."
      }
    ]
  },
  {
    name: "Promis",
    wing: "Treasury & Yield",
    subtitle: "Real-World Asset (RWA) Tokenization and Compliant Yield Engine",
    portalCore: "#9acb64",
    archiveSections: [
      {
        title: "The Vision",
        body: "Promis bridges secure, low-risk real-world assets—such as short-term sovereign treasury bills—directly onto the Seismic private ledger."
      },
      {
        title: "Core Mechanics",
        body: "By wrapping institutional real-world yield strategies inside Seismic's secure privacy wrappers, Promis allows businesses to capture stable, RWA-backed interest. Underpinning collateral structures are cryptographically verified through decentralized oracles without exposing the underlying asset documents, securing complete transaction privacy."
      }
    ]
  },
  {
    name: "Vend",
    wing: "Payments & Commerce",
    subtitle: "Shielded Decoupled E-Commerce and Point-of-Sale (POS) Engine",
    portalCore: "#ff8c3e",
    archiveSections: [
      {
        title: "The Vision",
        body: "Vend serves as the transactional commerce engine for the Seismic ecosystem, protecting merchant trade volumes and consumer purchasing habits from data-harvesting networks."
      },
      {
        title: "Core Mechanics",
        body: "Vend provides high-speed, instant stablecoin checkout terminals. Every purchase shields the itemized cart data, consumer wallet identity, and merchant's cumulative daily sales volume. Settlement occurs in milliseconds, establishing a standard for online retail where financial privacy is integrated by default."
      }
    ]
  },
  {
    name: "DashX",
    wing: "Payments & Commerce",
    subtitle: "Shielded programmatic Marketing, Rewards, and Payout Stack",
    portalCore: "#ff6277",
    archiveSections: [
      {
        title: "The Vision",
        body: "DashX enables organizations to execute precise programmatic distributions, digital rewards, and token airdrops to target audiences without exposing recipient profiles."
      },
      {
        title: "Core Mechanics",
        body: "By employing private attribution logic, DashX matches user activities to reward distributions. Stablecoins or utility tokens are delivered directly to target wallets. The network verifies successful attribution and receipt, but the balance history and transaction activities of the receiving wallets are kept completely secret."
      }
    ]
  },
  {
    name: "Specie",
    wing: "Settlement & Markets",
    subtitle: "Sovereign Stablecoin Issuance and Frictionless Business Banking",
    portalCore: "#4cc7b1",
    archiveSections: [
      {
        title: "The Vision",
        body: "Specie serves as the foundational liquidity bedrock for the entire Seismic ecosystem, providing institutional-grade stablecoin infrastructure and frictionless business banking corridors."
      },
      {
        title: "Core Mechanics",
        body: "Specie automates compliance workflows, fiat on/off-ramps, and stablecoin minting/redemption. It functions as a secure, friction-free gateway for international payments and commercial B2B settlements. By leveraging Seismic's shielded EVM ledger, Specie guarantees that large corporate settlements remain secure, compliant, and completely private."
      }
    ]
  },
  {
    name: "Port Markets",
    wing: "Settlement & Markets",
    subtitle: "Shielded Institutional Liquidity Pools and Slippage-Free Order Routing",
    portalCore: "#d7a45b",
    archiveSections: [
      {
        title: "The Vision",
        body: "Port Markets provides deep commercial liquidity pools and advanced order books specifically built to protect large-block institutional trades."
      },
      {
        title: "Core Mechanics",
        body: "On public ledgers, massive trade executions trigger sandwich attacks and front-running bots that extract value from traders. Port Markets hosts limit orders, trade sizes, and execution profiles inside Seismic's secure enclave execution enclaves. Traders receive fair, instant matching and absolute pricing execution without leaking trade intent to front-runners."
      }
    ]
  },
  {
    name: "Seismic",
    wing: "Network Core",
    subtitle: "The Monolithic Foundation of Private Finance",
    portalCore: "#a855f7",
    archiveSections: [
      {
        title: "The Vision",
        body: "Seismic is the absolute bedrock of the entire ecosystem. It provides the secure, private, and high-performance execution layer upon which all other sovereign protocols operate."
      },
      {
        title: "Core Mechanics",
        body: "Operating as a monolithic sovereign L2, Seismic utilizes zero-knowledge execution enclaves and advanced cryptography to guarantee that no internal state or transaction logic is ever leaked to the public, creating the ultimate sanctuary for global finance."
      }
    ]
  }
];

const keys = new Set();
window.addEventListener("keydown", (e) => {
  keys.add(e.key.toLowerCase());
  if(e.key.toLowerCase() === 'e') tryInteract();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

// ==========================================
// CENTRAL BRAND LOGO RENDERING ENGINE
// ==========================================
function drawBrandLogo(ctx, px, py, stageIndex, time) {
  ctx.save();
  const pulse = 0.5 + Math.sin(time * 5) * 0.35;
  
  // Define dynamic colors based on stage
  let glowColorStr = "0, 255, 204"; // Default cyan
  let fillColor = "#0c1015";        // Default black fill
  let sparkColor = "#00ffcc";       // Default cyan sparks
  
  if (stageIndex === 1) { // Avvio (Thick Lime Green 'A')
    glowColorStr = "188, 255, 0";   // Vibrant neon lime green glow
    fillColor = "transparent";      // Bypass global fill
    sparkColor = "#bcff00";         // Vibrant neon lime green sparks
  } else if (stageIndex === 3) { // Shift
    glowColorStr = "255, 255, 255"; // Bright white glow
    fillColor = "transparent";      // Custom silver linear gradient fill
    sparkColor = "#ffffff";         // White sparks
  } else if (stageIndex === 4) { // Blend (Twin Leaves)
    glowColorStr = "110, 184, 96";  // Light leaf green glow
    fillColor = "transparent";      // Bypass global fill to preserve original multi-colors
    sparkColor = "#6eb860";         // Light leaf green sparks
  } else if (stageIndex === 5) { // Promis
    glowColorStr = "255, 255, 255"; // Bright White glow
    fillColor = "transparent";      // Bypass global fill (drawn via strokes)
    sparkColor = "#ffffff";         // White sparks
  } else if (stageIndex === 6) { // Vend
    glowColorStr = "62, 176, 247";  // Light Blue glow
    fillColor = "transparent";      // Bypass global fill (drawn via overlapping shapes)
    sparkColor = "#3eb0f7";         // Light Blue sparks
  } else if (stageIndex === 8) { // Specie
    glowColorStr = "82, 126, 121";  // Vibrant sage green glow (brightened!)
    fillColor = "#527e79";          // Vibrant sage green solid fill (brightened!)
    sparkColor = "#73b0a9";         // Vibrant mint/sage green sparks (brightened!)
  } else if (stageIndex === 9) { // Portmarket
    glowColorStr = "255, 255, 255"; // Bright White glow
    fillColor = "transparent";      // Bypass global fill (drawn explicitly)
    sparkColor = "#ffffff";         // White sparks
  }
  
  ctx.shadowColor = `rgba(${glowColorStr}, ${pulse})`;
  ctx.shadowBlur = 10 + Math.sin(time * 5) * 3;
  
  ctx.beginPath();
  switch (stageIndex) {
    case 0: // Brookwell "B"
      ctx.moveTo(px + 25, py + 18);
      ctx.bezierCurveTo(px + 37, py + 18, px + 37, py + 28, px + 28, py + 28);
      ctx.bezierCurveTo(px + 41, py + 28, px + 41, py + 40, px + 25, py + 40);
      break;
    case 1: // Avvio - Thick Rounded Letter A (Among Us style)
      ctx.beginPath();
      // Outer body
      ctx.moveTo(px + 22, py + 34);
      ctx.lineTo(px + 22, py + 24);
      ctx.bezierCurveTo(px + 22, py + 14, px + 42, py + 14, px + 42, py + 24);
      ctx.lineTo(px + 42, py + 34);
      ctx.bezierCurveTo(px + 42, py + 38, px + 35, py + 38, px + 35, py + 34);
      ctx.bezierCurveTo(px + 35, py + 28, px + 29, py + 28, px + 29, py + 34);
      ctx.bezierCurveTo(px + 29, py + 38, px + 22, py + 38, px + 22, py + 34);
      ctx.closePath();

      // Visor / inner oval hole (sub-path)
      ctx.moveTo(px + 36, py + 23);
      ctx.ellipse(px + 32, py + 23, 4, 2.2, 0, 0, Math.PI * 2);
      
      // Fill using 'evenodd' to carve out the oval hole
      ctx.fillStyle = "#bcff00";
      ctx.fill('evenodd');
      
      // Clear path so global pass does not redraw over the custom fill
      ctx.beginPath();
      break;
    case 2: // Via (Split Wavy 'V' - scaled down slightly)
      ctx.save();
      ctx.translate(px + 32, py + 29);
      ctx.scale(0.88, 0.88);
      ctx.translate(-(px + 32), -(py + 29));

      // Left Shape (Flag-like wave)
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.moveTo(px + 18, py + 25); // Top-left tip
      ctx.lineTo(px + 30, py + 25); // Top-right corner
      // Gap curve (downwards and outwards)
      ctx.bezierCurveTo(px + 34, py + 25, px + 37, py + 30, px + 38, py + 39);
      ctx.lineTo(px + 26, py + 39); // Bottom-left corner
      // Outer swoop (upwards and inwards)
      ctx.bezierCurveTo(px + 24, py + 30, px + 21, py + 26, px + 18, py + 25);
      ctx.fill();

      // Right Shape (Curved Wedge)
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.moveTo(px + 33, py + 18); // Top-left corner
      ctx.lineTo(px + 45, py + 18); // Top-right corner
      ctx.lineTo(px + 40, py + 39); // Bottom sharp point
      // Gap curve (upwards and inwards, paralleling the left shape's gap)
      ctx.bezierCurveTo(px + 39, py + 30, px + 35, py + 22, px + 33, py + 18);
      ctx.fill();
      
      ctx.restore();

      // Clear path for global pass
      ctx.beginPath();
      break;
    case 3: // Shift "S" (Metallic Silver Gradient - scaled down slightly)
      ctx.save();
      ctx.translate(px + 32, py + 29);
      ctx.scale(0.88, 0.88);
      ctx.translate(-(px + 32), -(py + 29));

      const shiftGrad = ctx.createLinearGradient(px + 20, py + 18, px + 42, py + 40);
      shiftGrad.addColorStop(0, "#ffffff");
      shiftGrad.addColorStop(0.5, "#a0a5b0");
      shiftGrad.addColorStop(1, "#ffffff");
      
      ctx.beginPath();
      ctx.fillStyle = shiftGrad;
      
      // Outer Top-Right tip
      ctx.moveTo(px + 43, py + 21);
      // Curve to Top-Left
      ctx.bezierCurveTo(px + 35, py + 18, px + 20, py + 19, px + 20, py + 25);
      // Curve to Middle-Right
      ctx.bezierCurveTo(px + 20, py + 29, px + 38, py + 28, px + 38, py + 33);
      // Curve to Bottom-Left tip
      ctx.bezierCurveTo(px + 38, py + 38, px + 25, py + 39, px + 20, py + 36);
      
      // Move up slightly to inner bottom tip
      ctx.lineTo(px + 21, py + 34);
      
      // Curve back to Bottom-Right
      ctx.bezierCurveTo(px + 26, py + 37, px + 36, py + 36, px + 35, py + 32);
      // Curve to Middle-Left
      ctx.bezierCurveTo(px + 34, py + 28, px + 24, py + 29, px + 24, py + 24);
      // Curve to Inner Top-Right
      ctx.bezierCurveTo(px + 24, py + 21, px + 35, py + 21, px + 41, py + 23);
      
      ctx.closePath();
      ctx.fill();
      
      // Draw crisp white outline for 100% sharpness and glow!
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      ctx.restore();

      // Clear path for global pass
      ctx.beginPath();
      break;
    case 4: // Blend (Twin Leaves - moved from Avvio!)
      // Left Leaf - Light Green Left Half
      ctx.beginPath();
      ctx.fillStyle = "#6eb860";
      ctx.moveTo(px + 28, py + 38);
      ctx.bezierCurveTo(px + 18, py + 32, px + 22, py + 16, px + 28, py + 14);
      ctx.lineTo(px + 28, py + 38);
      ctx.fill();
      
      // Left Leaf - Dark Green Right Half
      ctx.beginPath();
      ctx.fillStyle = "#088c44";
      ctx.moveTo(px + 28, py + 38);
      ctx.lineTo(px + 28, py + 14);
      ctx.bezierCurveTo(px + 34, py + 18, px + 36, py + 32, px + 28, py + 38);
      ctx.fill();
      
      // Right Leaf - Light Green Top Half
      ctx.beginPath();
      ctx.fillStyle = "#7dc06b";
      ctx.moveTo(px + 31, py + 33);
      ctx.lineTo(px + 42, py + 21);
      ctx.bezierCurveTo(px + 36, py + 21, px + 33, py + 23, px + 31, py + 25);
      ctx.fill();
      
      // Right Leaf - Dark Green Bottom Half
      ctx.beginPath();
      ctx.fillStyle = "#088c44";
      ctx.moveTo(px + 31, py + 33);
      ctx.lineTo(px + 42, py + 21);
      ctx.bezierCurveTo(px + 41, py + 32, px + 35, py + 36, px + 28, py + 38);
      ctx.fill();

      // Clear path for global pass
      ctx.beginPath();
      break;
    case 5: // Promis (Hashtag 'P' logo)
      ctx.beginPath();
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#ffffff";
      
      // Left slant
      ctx.moveTo(px + 26, py + 38);
      ctx.lineTo(px + 32, py + 18);
      
      // Middle slant
      ctx.moveTo(px + 38, py + 18);
      ctx.lineTo(px + 34, py + 30);
      
      // Top horizontal & Loop & Bottom horizontal
      ctx.moveTo(px + 24, py + 22);
      ctx.lineTo(px + 38, py + 22);
      // Loop right and down
      ctx.bezierCurveTo(px + 45, py + 22, px + 43, py + 30, px + 36, py + 30);
      ctx.lineTo(px + 22, py + 30);
      
      ctx.stroke();
      
      // Clear path for global pass
      ctx.beginPath();
      break;
    case 6: // Vend (Overlapping Squares - shifted +2px right)
      // Bottom-Right Square (Dark Blue)
      ctx.beginPath();
      ctx.fillStyle = "#0050d6";
      ctx.rect(px + 30, py + 25, 14, 14);
      ctx.fill();
      
      // Top-Left Square (Light Blue)
      ctx.beginPath();
      ctx.fillStyle = "#3eb0f7";
      ctx.rect(px + 22, py + 17, 14, 14);
      ctx.fill();
      
      // Middle Overlap Square (Medium Blue blend)
      ctx.beginPath();
      ctx.fillStyle = "#4480d8";
      ctx.rect(px + 30, py + 25, 6, 6);
      ctx.fill();

      // Clear path for global pass
      ctx.beginPath();
      break;
    case 7: // DashX (Sliced X with Lightning - scaled down slightly)
      ctx.save();
      ctx.translate(px + 32, py + 29);
      ctx.scale(0.88, 0.88);
      ctx.translate(-(px + 32), -(py + 29));

      // 1. Draw White 'X' pieces with White Glow
      ctx.shadowColor = `rgba(255, 255, 255, ${pulse})`;
      ctx.fillStyle = "#ffffff";
      
      // Top-Left piece
      ctx.beginPath();
      ctx.moveTo(px + 20, py + 18);
      ctx.lineTo(px + 28, py + 18);
      ctx.lineTo(px + 32, py + 24);
      ctx.lineTo(px + 24, py + 26);
      ctx.closePath();
      ctx.fill();

      // Bottom-Right piece
      ctx.beginPath();
      ctx.moveTo(px + 36, py + 42);
      ctx.lineTo(px + 44, py + 42);
      ctx.lineTo(px + 40, py + 34);
      ctx.lineTo(px + 32, py + 36);
      ctx.closePath();
      ctx.fill();

      // 2. Draw Blue Lightning Bolt with Blue Glow
      ctx.shadowColor = `rgba(61, 107, 255, ${pulse})`;
      ctx.fillStyle = "#3D6BFF";
      ctx.beginPath();
      ctx.moveTo(px + 32, py + 16);
      ctx.lineTo(px + 46, py + 16);
      ctx.lineTo(px + 36, py + 28);
      ctx.lineTo(px + 42, py + 28);
      ctx.lineTo(px + 22, py + 46);
      ctx.lineTo(px + 28, py + 32);
      ctx.lineTo(px + 22, py + 32);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Clear path for global pass
      ctx.beginPath();
      break;
    case 8: // Specie (Slate Green 'S' Swoosh)
      // Top Swoosh
      ctx.ellipse(px + 33, py + 22, 10, 3.5, -35 * Math.PI / 180, 0, Math.PI * 2);
      ctx.closePath();
      // Bottom Swoosh
      ctx.moveTo(px + 22, py + 34); // Sharp left tip
      ctx.bezierCurveTo(px + 28, py + 42, px + 39, py + 34, px + 41, py + 26); // Outer bottom edge to rounded right tip
      ctx.bezierCurveTo(px + 36, py + 33, px + 28, py + 35, px + 22, py + 34); // Inner top edge back to left tip
      ctx.closePath();
      break;
    case 9: // Portmarket (Opposite angled chevrons - scaled down to fit pedestal)
      ctx.save();
      ctx.translate(px + 32, py + 27);
      ctx.scale(0.72, 0.72);
      ctx.translate(-(px + 32), -(py + 27));

      // Left Shape
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.moveTo(px + 31, py + 38);
      ctx.lineTo(px + 19, py + 38);
      ctx.bezierCurveTo(px + 15, py + 38, px + 14, py + 34, px + 16, py + 31);
      ctx.lineTo(px + 31, py + 16);
      ctx.lineTo(px + 31, py + 21);
      ctx.lineTo(px + 19, py + 33);
      ctx.lineTo(px + 31, py + 33);
      ctx.closePath();
      ctx.fill();

      // Right Shape
      ctx.beginPath();
      ctx.fillStyle = "#ffffff";
      ctx.moveTo(px + 33, py + 16);
      ctx.lineTo(px + 45, py + 16);
      ctx.bezierCurveTo(px + 49, py + 16, px + 50, py + 20, px + 48, py + 23);
      ctx.lineTo(px + 33, py + 38);
      ctx.lineTo(px + 33, py + 33);
      ctx.lineTo(px + 45, py + 21);
      ctx.lineTo(px + 33, py + 21);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      ctx.beginPath();
      break;
    case 10: // Seismic - Low Poly Pink Gemstone
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
      return sparkColor;
    default:
      ctx.moveTo(px + 32, py + 18);
      ctx.lineTo(px + 41, py + 29);
      ctx.lineTo(px + 32, py + 40);
      ctx.lineTo(px + 23, py + 29);
      break;
  }
  ctx.closePath();
  
  if (fillColor !== "transparent") {
    ctx.fillStyle = fillColor;
    ctx.fill('evenodd');
  }
  
  ctx.strokeStyle = `rgba(${glowColorStr}, ${pulse * 0.85})`;
  ctx.lineWidth = 1.8;
  ctx.stroke();
  
  ctx.restore();
  return sparkColor;
}

const logoDeskGrid = document.getElementById("logoDeskGrid");
let logoDeskInitialized = false;

function initLogoDesk() {
  if (!logoDeskGrid) return;
  logoDeskGrid.innerHTML = "";
  
  for (let i = 0; i < 10; i++) {
    const room = ROOMS[i];
    const item = document.createElement("div");
    item.className = "logo-desk-item";
    item.id = `logo-desk-item-${i}`;
    if (i === currentStage) item.classList.add("active");
    
    const canvasEl = document.createElement("canvas");
    canvasEl.className = "logo-desk-canvas";
    canvasEl.id = `desk-canvas-${i}`;
    canvasEl.width = 44;
    canvasEl.height = 38;
    
    const info = document.createElement("div");
    info.className = "logo-desk-info";
    
    const index = document.createElement("span");
    index.className = "logo-desk-index";
    index.textContent = `STAGE 0${i + 1}`;
    
    const name = document.createElement("span");
    name.className = "logo-desk-name";
    name.textContent = room.name;
    name.style.color = room.portalCore;
    
    info.appendChild(index);
    info.appendChild(name);
    
    item.appendChild(canvasEl);
    item.appendChild(info);
    
    item.onclick = (e) => {
      currentStage = i;
      inInterior = e.shiftKey;
      initStage();
      
      papyrusOpen = false;
      papyrusOverlay.classList.add("hidden");
      ThreeJSMonolith.destroy();
    };
    
    logoDeskGrid.appendChild(item);
  }
}

function updateLogoDeskActive() {
  for (let i = 0; i < 10; i++) {
    const item = document.getElementById(`logo-desk-item-${i}`);
    if (item) {
      if (i === currentStage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  }
}

function drawLogoDesk() {
  for (let i = 0; i < 10; i++) {
    const canvasEl = document.getElementById(`desk-canvas-${i}`);
    if (!canvasEl) continue;
    const ctxEl = canvasEl.getContext("2d");
    
    ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);
    
    ctxEl.fillStyle = "#161b24";
    ctxEl.fillRect(0, 0, canvasEl.width, canvasEl.height);
    
    ctxEl.strokeStyle = "rgba(255,255,255,0.06)";
    ctxEl.lineWidth = 1;
    ctxEl.strokeRect(0, 0, canvasEl.width, canvasEl.height);
    
    ctxEl.save();
    // Mathematically center the 64x64 coordinate system logo (centered around 32, 28) into the 44x38 canvas
    const targetCenterX = canvasEl.width / 2;  // 22
    const targetCenterY = canvasEl.height / 2; // 19
    const logoCenterX = 32;
    const logoCenterY = 28;
    const scale = 0.95; // perfectly fits the logo boundaries
    
    ctxEl.translate(targetCenterX, targetCenterY);
    ctxEl.scale(scale, scale);
    ctxEl.translate(-logoCenterX, -logoCenterY);
    
    drawBrandLogo(ctxEl, 0, 0, i, time);
    ctxEl.restore();
  }
}

// ==========================================
// THREE.JS 3D BASALT MONOLITH ENGINE
// ==========================================
const ThreeJSMonolith = {
  scene: null,
  camera: null,
  renderer: null,
  mesh: null,
  emberSystem: null,
  animationFrameId: null,
  mouseX: 0,
  mouseY: 0,
  targetX: 0,
  targetY: 0,
  velocities: [],
  particleCount: 65,

  init() {
    const container = document.getElementById("monolithCanvasContainer");
    if (!container) return;
    
    // Clean existing canvases
    container.innerHTML = "";
    
    const width = container.clientWidth || 580;
    const height = container.clientHeight || 650;
     // 3D Monolith Civilization-themed Styles configuration mapping
    const configs = [
      { // Stage 0: Norse (Brookwell) - Deep basalt & cyan/amber glow
        stoneColor: 0x1a2028,
        light1: 0x00ffcc,
        light2: 0xe67e22,
        emberColor: 0x00ffcc
      },
      { // Stage 1: Egyptian (Avvio) - Sandstone & emerald/amber glow
        stoneColor: 0xc8a261,
        light1: 0x27ae60,
        light2: 0xd35400,
        emberColor: 0x2ecc71
      },
      { // Stage 2: Greek (Via) - Icy white marble & pure blue/purple glow
        stoneColor: 0xe5e7eb,
        light1: 0x3498db,
        light2: 0x8e44ad,
        emberColor: 0x5dade2
      },
      { // Stage 3: Steampunk (Shift) - Mahogany copper & gold/amber glow
        stoneColor: 0x78281f,
        light1: 0xf1c40f,
        light2: 0xe67e22,
        emberColor: 0xf39c12
      },
      { // Stage 4: Mayan (Blend) - Deep mossy green jade & emerald/yellow glow
        stoneColor: 0x1e3f20,
        light1: 0x2ecc71,
        light2: 0xf1c40f,
        emberColor: 0xf1c40f
      },
      { // Stage 5: Gothic (Promis) - Cold iron steel & silver/dark blue glow
        stoneColor: 0x2b3e50,
        light1: 0xecf0f1,
        light2: 0x1f3a52,
        emberColor: 0xffffff
      },
      { // Stage 6: Persian (Vend) - Warm sandstone & turquoise/orange glow
        stoneColor: 0xdfd3b6,
        light1: 0x17a589,
        light2: 0xd35400,
        emberColor: 0x1abc9c
      },
      { // Stage 7: Cyber (Dashx) - Tech carbon black & purple/cyan neon glow
        stoneColor: 0x0d0d13,
        light1: 0xaf7ac5,
        light2: 0x00ffcc,
        emberColor: 0xaf7ac5
      },
      { // Stage 8: Indian (Specie) - Terracotta red clay & golden/orange glow
        stoneColor: 0x6e2c00,
        light1: 0xd4af37,
        light2: 0xe67e22,
        emberColor: 0xd4af37
      },
      { // Stage 9: Cosmic (Port Markets) - Pitch dark cosmic obsidian & stellar gold/white glow
        stoneColor: 0x07080f,
        light1: 0xffd700,
        light2: 0xffffff,
        emberColor: 0xffd700
      }
    ];
    
    const stageCfg = configs[currentStage] || configs[0];
    
    // Scene & Alpha WebGL Renderer (for glassmorphic overlay transparency support!)
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.z = 10.5; // Moved back so the ENTIRE stone frame is perfectly visible!
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);
    
    // Material: Authentic deep-dark weathered basalt stone slab
    const mat = new THREE.MeshStandardMaterial({
      color: stageCfg.stoneColor, // Dynamic coarse basalt dark slate gray
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true // Keeps the chipped, hand-chiseled stone appearance!
    });
    
    this.mesh = new THREE.Group();
    
    // Helper function to carve a heavily weathered stone block
    const createStone = (w, h, d, px, py, pz) => {
      // High segment count for detailed edge chipping
      const geom = new THREE.BoxGeometry(w, h, d, Math.max(2, Math.floor(w * 4)), Math.max(2, Math.floor(h * 4)), 3);
      const pos = geom.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
        
        // Deep edge fracturing
        const isEdgeX = Math.abs(x) > w/2 - 0.2;
        const isEdgeY = Math.abs(y) > h/2 - 0.2;
        
        if (isEdgeX) {
          x -= Math.sign(x) * Math.random() * 0.35;
          z += (Math.random() - 0.5) * 0.3;
        }
        if (isEdgeY) {
          y -= Math.sign(y) * Math.random() * 0.35;
          z += (Math.random() - 0.5) * 0.3;
        }
        
        // General organic surface noise
        if (Math.abs(z) > d/2 - 0.1) {
          z += (Math.random() - 0.5) * 0.15;
        }
        x += (Math.random() - 0.5) * 0.05;
        y += (Math.random() - 0.5) * 0.05;
        
        pos.setX(i, x); pos.setY(i, y); pos.setZ(i, z);
      }
      geom.computeVertexNormals();
      const stoneMesh = new THREE.Mesh(geom, mat);
      stoneMesh.position.set(px, py, pz);
      this.mesh.add(stoneMesh);
    };
 
    // 1. Main Background Slab (recessed, dark) where text sits
    createStone(6.0, 7.8, 0.4, 0, 0, -0.6);
    
    // 2. Thick Outer Frame (Left & Right Pillars)
    createStone(1.2, 8.8, 1.4, -3.2, 0, 0.2); // Left pillar
    createStone(1.2, 8.8, 1.4,  3.2, 0, 0.2); // Right pillar
    
    // 3. Thick Outer Frame (Top Lintel & Bottom Sill)
    createStone(7.6, 1.2, 1.6, 0,  4.0, 0.3); // Top lintel (sticks out a bit more)
    createStone(7.6, 1.2, 1.4, 0, -4.0, 0.2); // Bottom sill
    
    this.scene.add(this.mesh);
    
    // Specular FACET Point Lights
    const pointTeal = new THREE.PointLight(stageCfg.light1, 3.0, 15);
    pointTeal.position.set(4, 4, 3);
    this.scene.add(pointTeal);
    
    const pointAmber = new THREE.PointLight(stageCfg.light2, 2.0, 12);
    pointAmber.position.set(-4, -4, 2);
    this.scene.add(pointAmber);
    
    const ambient = new THREE.AmbientLight(0x11161d, 1.2);
    this.scene.add(ambient);
    
    // Floating Ember System
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(this.particleCount * 3);
    this.velocities = [];
    for (let i = 0; i < this.particleCount; i++) {
      pPositions[i * 3] = (Math.random() - 0.5) * 5; // X
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 3; // Z
      this.velocities.push({
        y: 0.015 + Math.random() * 0.02,
        x: (Math.random() - 0.5) * 0.008
      });
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: stageCfg.emberColor,
      size: 0.07,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    this.emberSystem = new THREE.Points(pGeom, pMat);
    this.scene.add(this.emberSystem);
    
    // Reset mouse targets
    this.targetX = 0;
    this.targetY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    
    // Mouse Move Listener on parent sheet for elastic responsive tilt!
    const sheet = document.querySelector('.papyrus-sheet');
    if (sheet) {
      this.onMouseMove = (e) => {
        const rect = sheet.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width/2;
        const y = e.clientY - rect.top - rect.height/2;
        ThreeJSMonolith.targetX = (x / rect.width) * 0.35; // Target Y rotation
        ThreeJSMonolith.targetY = -(y / rect.height) * 0.22; // Target X rotation
      };
      this.onMouseLeave = () => {
        ThreeJSMonolith.targetX = 0;
        ThreeJSMonolith.targetY = 0;
      };
      sheet.addEventListener('mousemove', this.onMouseMove);
      sheet.addEventListener('mouseleave', this.onMouseLeave);
    }
    
    // Start Render Loop
    let frameCount = 0;
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate);
      frameCount++;
      
      // Floating monolithic rotation & vertical bobbing (tilted slightly by default to display 3D depth profile!)
      if (this.mesh) {
        this.mesh.position.y = Math.sin(frameCount * 0.015) * 0.12;
        
        // Default tilt (0.24 around Y, 0.08 around X) displays thick basalt edges, catching specular lights beautifully
        const targetRotY = 0.24 + this.targetX;
        const targetRotX = 0.08 + this.targetY;
        this.mesh.rotation.y += ( targetRotY - this.mesh.rotation.y ) * 0.06;
        this.mesh.rotation.x += ( targetRotX - this.mesh.rotation.x ) * 0.06;
      }
      
      // Animate floating sparks upwards
      if (this.emberSystem) {
        const posAttr = this.emberSystem.geometry.attributes.position;
        for (let i = 0; i < this.particleCount; i++) {
          let px = posAttr.getX(i);
          let py = posAttr.getY(i);
          px += this.velocities[i].x;
          py += this.velocities[i].y;
          
          if (py > 4.5) {
            py = -4.5;
            px = (Math.random() - 0.5) * 5;
          }
          posAttr.setX(i, px);
          posAttr.setY(i, py);
        }
        posAttr.needsUpdate = true;
      }
      
      this.renderer.render(this.scene, this.camera);
    };
    animate();
    
    // Window Resize Listener
    this.onResize = () => {
      if (!this.renderer || !this.camera) return;
      const w = container.clientWidth || 580;
      const h = container.clientHeight || 650;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
    };
    window.addEventListener('resize', this.onResize);
  },

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    // Clean listeners
    const sheet = document.querySelector('.papyrus-sheet');
    if (sheet) {
      if (this.onMouseMove) sheet.removeEventListener('mousemove', this.onMouseMove);
      if (this.onMouseLeave) sheet.removeEventListener('mouseleave', this.onMouseLeave);
    }
    window.removeEventListener('resize', this.onResize);
    
    // Dispose WebGL Geometries and Materials (0% memory leakage!)
    if (this.mesh) {
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.mesh.material) this.mesh.material.dispose();
    }
    if (this.emberSystem) {
      if (this.emberSystem.geometry) this.emberSystem.geometry.dispose();
      if (this.emberSystem.material) this.emberSystem.material.dispose();
    }
    if (this.renderer) {
      this.renderer.dispose();
      const dom = this.renderer.domElement;
      if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
    }
    
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.mesh = null;
    this.emberSystem = null;
  }
};

papyrusClose.addEventListener("click", () => { 
  papyrusOpen = false; 
  papyrusOverlay.classList.add("hidden"); 
  ThreeJSMonolith.destroy(); // Terminate WebGL resources to keep RAM at 0%
});

const TILE_SIZE = 64;
let currentStage = 0;
let inInterior = false;
let papyrusOpen = false;
let time = 0;
let logosCollected = 0;
let stagesMonumentRead = {};
let lastShootTime = 0;

let chestOpened = false;
let chestGemY = 0;
let golemEmpowered = false;

const player = {
  x: 100, y: 100, w: 46, h: 78, vx: 0, vy: 0, speed: 6, jumpPower: -16, gravity: 0.6,
  grounded: false, facingRight: true, state: "idle"
};

let map = [];
let traps = [];
let enemies = [];
let items = [];
let activeBlocks = [];
let projectiles = [];
let mapWidth = 0;
let mapHeight = 0;
let camera = { x: 0, y: 0 };

const CHAR_MAP = {
  '.': 0, '#': 1, 'P': 2, 'T': 3, 'C': 4, 'B': 8, 'M': 7, 'X': 9,
  'E': 10, 'G': 11, 'Y': 12, '^': 13, 'S': 14, 'A': 15 // Logic markers
};

const STAGE_TEMPLATES = [
  [ // Stage 0 - Brookwell (Flat ground, basic skeletons, easy rhythmic spike pits)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B...T................B............T..........#",
    "#..........................................................#",
    "#.......................................................P..#",
    "#..........E...................................E........P..#",
    "##################..#########.############..################",
    "##################^^#########.############^^################",
    "############################################################"
  ],
  [ // Stage 1 - Avvio (Ceiling-hanging slow swinging axes and walking cultists)
    "############################################################",
    "#..................#............................#..........#",
    "#..................A............................A..........#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..................T.........B....T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#........G...........................G.....................#",
    "############################################################",
    "############################################################",
    "############################################################"
  ],
  [ // Stage 2 - Via (Flat floor rolling saws, floating bats)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..................T.........B....T..........#",
    "#..........................................................#",
    "#.......................................................P..#",
    "#......Y..................Y.............................P..#",
    "#.................S....................S................####",
    "#########...########....########....########....############",
    "#########^^^########^^^^########^^^^########^^^^############",
    "############################################################"
  ],
  [ // Stage 3 - Shift (Step platforms, overhead axes, skeletal guardians)
    "############################################################",
    "#..........#..............................#................#",
    "#..........A..............................A................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#....E....................E................................#",
    "#################...#####################...################",
    "#################^^^#####################^^^################",
    "############################################################"
  ],
  [ // Stage 4 - Blend (Flat floor saws, ledge cultists, safe spike pits)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B.........T..........B.......T...............#",
    "#.......................................................P..#",
    "#..............G.............................G..........P..#",
    "#.......................................................####",
    "#..................S................S.................#....#",
    "#########...############....#############...###########....#",
    "#########^^^############^^^^#############^^^###########....#",
    "############################################################"
  ],
  [ // Stage 5 - Promis (Hanging bridges, ceiling bats, skeleton defenders)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#.....Y..................Y..................Y...............#",
    "#................E...................E.....................#",
    "#########...############....#############...################",
    "#########^^^############^^^^#############^^^################",
    "############################################################"
  ],
  [ // Stage 6 - Vend (Split floor, swinging ceiling axes, skeleton guards)
    "############################################################",
    "#..................#............................#..........#",
    "#..................A............................A..........#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#........E...................E.............................#",
    "#################...#####################...################",
    "#################^^^#####################^^^################",
    "############################################################"
  ],
  [ // Stage 7 - DashX (Floor saws, safe cultist arenas)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#.......G.................G................................#",
    "#.............S..................S.........................#",
    "####################...##################...################",
    "####################^^^##################^^^################",
    "############################################################"
  ],
  [ // Stage 8 - Specie (Stepping platforms over easy spikes, floor saws, bats)
    "############################################################",
    "#..........................................................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#.....Y..................Y..................Y..............#",
    "#..............S................S..........................#",
    "#########...############...##############...################",
    "#########^^^############^^^##############^^^################",
    "############################################################"
  ],
  [ // Stage 9 - Port Markets (Grand final vault, swinging axes, skeletal defenders)
    "############################################################",
    "#..........#..............................#................#",
    "#..........A..............................A................#",
    "#..........................................................#",
    "#..........................................................#",
    "#....T........B..........T........B.............T.......P..#",
    "#.......................................................P..#",
    "#.......................................................####",
    "#....E....................E................................#",
    "#################...#####################...################",
    "#################^^^#####################^^^################",
    "############################################################"
  ]
];

function generateInteriorMap(stageIndex) {
  let temp = [];
  if (stageIndex === 10) {
    temp = [
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "..........C.........",
      "####################",
      "####################",
      "####################",
      "####################",
      "####################"
    ];
  } else {
    // We lower the exit door X to Row 5 and Row 6 and shift it left by 1 tile (index 18) to avoid column overlap!
    // We also shift the monument M to index 10 to center it perfectly between columns at index 8 and 14!
    temp = [
      "....................",
      "....................",
      "....................",
      "....................",
      "....................",
      "..................X.",
      "..........M.......X.",
      "####################",
      "####################",
      "####################",
      "####################",
      "####################"
    ];
  }
  return parseTemplate(temp);
}

function parseTemplate(template) {
  let newMap = [];
  traps = [];
  enemies = [];
  items = [];
  activeBlocks = [];
  projectiles = [];
  mapHeight = template.length;
  mapWidth = template[0].length;

  for (let y = 0; y < mapHeight; y++) {
    newMap[y] = new Array(mapWidth).fill(0);
    for (let x = 0; x < mapWidth; x++) {
      const char = template[y][x];
      const code = CHAR_MAP[char];
      
      if (code !== undefined) {
         if (code < 10) newMap[y][x] = code;
      }
      
      // Traps
      if (char === 'S') {
        traps.push({ type: 'saw', x: x * TILE_SIZE, y: y * TILE_SIZE + TILE_SIZE - 20, radius: 20, vx: 2.2, minX: (x - 1.5) * TILE_SIZE, maxX: (x + 1.5) * TILE_SIZE, angle: 0 });
      } else if (char === '^') {
        traps.push({ type: 'spike', x: x * TILE_SIZE, y: y * TILE_SIZE });
      } else if (char === 'A') {
        traps.push({ type: 'axe', x: x * TILE_SIZE, y: y * TILE_SIZE, angle: 0, timeOffset: Math.random() * 10 });
      }
      
      // Enemies
      if (char === 'E') {
        enemies.push({ type: 'skeleton', x: x * TILE_SIZE, y: y * TILE_SIZE, w: 40, h: 60, vx: 2, minX: (x - 3) * TILE_SIZE, maxX: (x + 3) * TILE_SIZE, dead: false });
      } else if (char === 'G') {
        enemies.push({ type: 'cultist', x: x * TILE_SIZE, y: y * TILE_SIZE, w: 40, h: 60, vx: 3.5, minX: (x - 4) * TILE_SIZE, maxX: (x + 4) * TILE_SIZE, dead: false });
      } else if (char === 'Y') {
        enemies.push({ type: 'bat', x: x * TILE_SIZE, y: y * TILE_SIZE + 68, w: 30, h: 20, vx: 3, vy: 0, minX: (x - 5) * TILE_SIZE, maxX: (x + 5) * TILE_SIZE, timeOffset: Math.random()*10, dead: false });
      }
    }
  }

  // Architectural Pillars in background
  for (let x = 2; x < mapWidth; x += 6) {
    for (let y = 0; y < mapHeight; y++) {
      if (newMap[y][x] === 0) newMap[y][x] = 5;
    }
  }

  return newMap;
}

function initStage() {
  if (!logoDeskInitialized) {
    initLogoDesk();
    logoDeskInitialized = true;
  }
  if (currentStage === 10) {
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
  }
  player.x = 100; player.y = 100; player.vx = 0; player.vy = 0; player.grounded = false;
  updateUI();
}

function updateUI() {
  progressValue.textContent = `${currentStage === 10 ? 10 : currentStage + 1} / 10`;
  updateLogoDeskActive();
  if (currentStage === 10) {
    const r = ROOMS[10];
    spaceName.textContent = "Final: " + r.name;
    roomTitle.textContent = r.name + " Palace";
    roomSubtitle.textContent = r.subtitle;
    inscriptionText.textContent = "Reach the chest and claim the ultimate power (Press E).";
  } else if (inInterior) {
    const r = ROOMS[currentStage];
    spaceName.textContent = `Sanctum: ${r.name}`;
    roomTitle.textContent = `${r.name} Monument`;
    roomSubtitle.textContent = "Sacred ground. Absorb the ancient wisdom.";
    inscriptionText.textContent = "Press E to read the monument. Then leave through the gate on the right.";
  } else if (currentStage < 10) {
    spaceName.textContent = `Stage ${currentStage + 1}`;
    roomTitle.textContent = "The Journey";
    roomSubtitle.textContent = "Navigate the hurdles, reach the sanctuary gate.";
    inscriptionText.textContent = "Explore the cavern, scale the platforms, and reach the sanctuary gateway.";
  } else {
    spaceName.textContent = "The End";
    roomTitle.textContent = "Journey Complete";
    roomSubtitle.textContent = "You have assimilated the entire Seismic core network.";
    inscriptionText.textContent = "Thank you.";
  }
}

function openPapyrus() {
  papyrusOpen = true;
  
  // 1. Populate text content first so the container expands to its final physical height
  const r = ROOMS[currentStage];
  papyrusTitle.textContent = r.name;
  papyrusIntro.textContent = r.subtitle;
  papyrusBody.innerHTML = "";
  r.archiveSections.forEach(sec => {
    const s = document.createElement("section"); s.className = "papyrus-block";
    s.innerHTML = `<h3>${sec.title}</h3>`;
    if(sec.body) s.innerHTML += `<p>${sec.body}</p>`;
    papyrusBody.appendChild(s);
  });
  
  // 2. Set theme class dynamically based on stage index
  const themes = ["norse", "egyptian", "greek", "steampunk", "mayan", "gothic", "persian", "cyber", "indian", "cosmic"];
  const sheet = document.querySelector('.papyrus-sheet');
  if (sheet) {
    // Remove any existing theme classes
    themes.forEach(t => sheet.classList.remove(`theme-${t}`));
    // Add current theme class
    const currentTheme = themes[currentStage] || "norse";
    sheet.classList.add(`theme-${currentTheme}`);

    // Remove any legacy SVG frames
    const oldSvg = sheet.querySelector('.papyrus-svg-frame');
    if (oldSvg) oldSvg.remove();

    // 3. Dynamically inject highly-polished, clean vector SVG frames!
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "papyrus-svg-frame");
    svg.setAttribute("viewBox", "0 0 600 800");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "0";

    if (currentTheme === "norse") {
      svg.innerHTML = `
        <defs>
          <filter id="norse-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <!-- Outer runestone frame with runic border -->
        <rect x="15" y="15" width="570" height="770" rx="12" fill="none" stroke="#00ffcc" stroke-width="2.5" opacity="0.3" filter="url(#norse-glow)"/>
        <rect x="23" y="23" width="554" height="754" rx="8" fill="none" stroke="#00ffcc" stroke-width="1.2" opacity="0.15"/>
        <!-- Runic letters along borders -->
        <g fill="#00ffcc" opacity="0.45" font-family="monospace" font-size="9" font-weight="bold" letter-spacing="2">
          <text x="50" y="21">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛗ ᛚ ᛜ ᛞ ᛟ</text>
          <text x="50" y="789">ᛟ ᛞ ᛜ ᛚ ᛗ ᛒ ᛏ ᛊ ᛉ ᛈ ᛇ ᛃ ᛁ ᚾ ᚺ ᚹ ᚷ ᚲ ᚱ ᚨ ᚦ ᚢ ᚠ</text>
        </g>
        <!-- Celtic knot corners -->
        <path d="M 23 55 L 55 23 M 23 65 L 65 23 M 23 75 L 75 23" stroke="#00ffcc" stroke-width="1.8" opacity="0.6" fill="none"/>
        <path d="M 577 55 L 545 23 M 577 65 L 535 23 M 577 75 L 525 23" stroke="#00ffcc" stroke-width="1.8" opacity="0.6" fill="none"/>
        <path d="M 23 745 L 55 777 M 23 735 L 65 777 M 23 725 L 75 777" stroke="#00ffcc" stroke-width="1.8" opacity="0.6" fill="none"/>
        <path d="M 577 745 L 545 777 M 577 735 L 535 777 M 577 725 L 525 777" stroke="#00ffcc" stroke-width="1.8" opacity="0.6" fill="none"/>
        <!-- Valknut Knot with Glowing Runic Circle -->
        <g transform="translate(300, 52)" filter="url(#norse-glow)">
          <circle cx="0" cy="0" r="28" fill="none" stroke="#00ffcc" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.5"/>
          <g transform="scale(0.72)" stroke="#00ffcc" stroke-width="2.5" stroke-linejoin="round" fill="none">
            <polygon points="0,-25 -22,12 22,12" opacity="0.8"/>
            <polygon points="-12,-6 10,-6 0,16" transform="translate(0, -7)" opacity="0.8"/>
            <polygon points="12,-6 -10,-6 0,16" transform="translate(0, 7)" opacity="0.8"/>
          </g>
        </g>
      `;
    } else if (currentTheme === "egyptian") {
      svg.innerHTML = `
        <defs>
          <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffe082"/>
            <stop offset="50%" stop-color="#ffb300"/>
            <stop offset="100%" stop-color="#ff8f00"/>
          </linearGradient>
        </defs>
        <!-- Frayed fibrous papyrus edges (double outline layered) -->
        <rect x="18" y="18" width="564" height="764" rx="14" fill="none" stroke="url(#gold-grad)" stroke-width="3" opacity="0.65"/>
        <rect x="25" y="25" width="550" height="750" rx="10" fill="none" stroke="#8d6e63" stroke-width="1" opacity="0.3" stroke-dasharray="8,4"/>
        
        <!-- Frayed edge vectors in corners -->
        <path d="M 18 50 Q 25 45 40 40 T 50 18" stroke="#8d6e63" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M 582 50 Q 575 45 560 40 T 550 18" stroke="#8d6e63" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M 18 750 Q 25 755 40 760 T 50 782" stroke="#8d6e63" stroke-width="1.5" fill="none" opacity="0.5"/>
        <path d="M 582 750 Q 575 755 560 760 T 550 782" stroke="#8d6e63" stroke-width="1.5" fill="none" opacity="0.5"/>
        
        <!-- Ankh Key Left & Eye of Horus Right -->
        <g transform="translate(48, 55) scale(0.65)" stroke="url(#gold-grad)" stroke-width="2" fill="none" opacity="0.8">
          <circle cx="0" cy="-14" r="10"/>
          <path d="M -10 0 L 10 0 M 0 -4 L 0 20 M -6 20 L 6 20"/>
        </g>
        <g transform="translate(552, 55) scale(0.6)" stroke="url(#gold-grad)" stroke-width="2.2" fill="none" opacity="0.8">
          <path d="M -15 -5 C -5 -15, 10 -15, 20 -5 L 15 5 C 5 5, -5 2, -15 -5 Z M -15 -5 C -10 10, 5 15, 10 5" fill="none"/>
          <circle cx="2" cy="-2" r="3" fill="url(#gold-grad)"/>
          <path d="M -5 5 C -2 15, -12 25, -15 28 M 5 5 L 8 18"/>
        </g>
        
        <!-- Majestic Winged Sun Disc of Ra at the top center -->
        <g transform="translate(300, 52) scale(0.85)">
          <circle cx="0" cy="0" r="14" fill="#d32f2f" stroke="url(#gold-grad)" stroke-width="2.5"/>
          <!-- Majestic detailed outspread wings -->
          <path d="M -14 0 C -35 -8, -65 2, -95 12 C -70 2, -42 1, -14 3 Z" fill="url(#gold-grad)" stroke="#baf" stroke-width="0.3"/>
          <path d="M -14 3 C -32 6, -55 12, -80 20 C -60 11, -35 8, -14 5 Z" fill="url(#gold-grad)" opacity="0.8"/>
          <path d="M 14 0 C 35 -8, 65 2, 95 12 C 70 2, 42 1, 14 3 Z" fill="url(#gold-grad)" stroke="#baf" stroke-width="0.3"/>
          <path d="M 14 3 C 32 6, 55 12, 80 20 C 60 11, 35 8, 14 5 Z" fill="url(#gold-grad)" opacity="0.8"/>
          <!-- Sacred Uraeus Cobras -->
          <path d="M -6 12 C -10 18, -2 24, -4 28" stroke="url(#gold-grad)" stroke-width="1.8" fill="none"/>
          <path d="M 6 12 C 10 18, 2 24, 4 28" stroke="url(#gold-grad)" stroke-width="1.8" fill="none"/>
        </g>
      `;
    } else if (currentTheme === "greek") {
      svg.innerHTML = `
        <defs>
          <filter id="greek-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Outer thick gold frame -->
        <rect x="18" y="18" width="564" height="764" fill="none" stroke="#d4af37" stroke-width="4.5" opacity="0.9" filter="url(#greek-glow)"/>
        
        <!-- Greek key meander design inner border -->
        <path d="M 28 28 L 572 28 L 572 772 L 28 772 Z" fill="none" stroke="#d4af37" stroke-width="1.2" opacity="0.3"/>
        <g stroke="#d4af37" stroke-width="1.8" fill="none" opacity="0.5">
          <!-- Greek Key corners -->
          <path d="M 28 50 L 40 50 L 40 38 L 48 38 L 48 44 L 44 44"/>
          <path d="M 572 50 L 560 50 L 560 38 L 552 38 L 552 44 L 556 44"/>
          <path d="M 28 750 L 40 750 L 40 762 L 48 762 L 48 756 L 44 756"/>
          <path d="M 572 750 L 560 750 L 560 762 L 552 762 L 552 756 L 556 756"/>
        </g>
        
        <!-- Corinthian Column details on Left and Right borders -->
        <g stroke="#d4af37" stroke-width="1" fill="none" opacity="0.35">
          <line x1="33" y1="80" x2="33" y2="720"/>
          <line x1="39" y1="80" x2="39" y2="720"/>
          <line x1="561" y1="80" x2="561" y2="720"/>
          <line x1="567" y1="80" x2="567" y2="720"/>
        </g>
        
        <!-- Classical Golden Laurel Wreath at top center -->
        <g transform="translate(300, 52) scale(0.9)" stroke="#ffd700" stroke-width="2" fill="none" filter="url(#greek-glow)">
          <!-- Laurel crown leaves -->
          <path d="M -4 -16 C -20 -10, -28 5, -8 18 C -4 14, -12 2, -4 -16 Z M -4 -4 C -16 2, -20 12, -8 20" fill="#ffd700" fill-opacity="0.3"/>
          <path d="M 4 -16 C 20 -10, 28 5, 8 18 C 4 14, 12 2, 4 -16 Z M 4 -4 C 16 2, 20 12, 8 20" fill="#ffd700" fill-opacity="0.3"/>
          <circle cx="0" cy="8" r="4" fill="#ffd700"/>
        </g>
      `;
    } else if (currentTheme === "steampunk") {
      svg.innerHTML = `
        <defs>
          <linearGradient id="copper-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d35400"/>
            <stop offset="60%" stop-color="#b9770e"/>
            <stop offset="100%" stop-color="#5e3300"/>
          </linearGradient>
        </defs>
        <!-- Clockwork riveted copper frame -->
        <rect x="18" y="18" width="564" height="764" rx="8" fill="none" stroke="url(#copper-grad)" stroke-width="4.5" opacity="0.95"/>
        <rect x="26" y="26" width="548" height="748" rx="5" fill="none" stroke="#f39c12" stroke-width="1.2" opacity="0.3" stroke-dasharray="6,4"/>
        
        <!-- Corner Rivet circles -->
        <g fill="#f39c12" opacity="0.75">
          <circle cx="34" cy="34" r="3.2"/><circle cx="566" cy="34" r="3.2"/>
          <circle cx="34" cy="766" r="3.2"/><circle cx="566" cy="766" r="3.2"/>
          <circle cx="300" cy="22" r="2.2"/><circle cx="300" cy="778" r="2.2"/>
        </g>
        
        <!-- Interlocking Clock gears in corners -->
        <g stroke="url(#copper-grad)" stroke-width="1.8" fill="none" opacity="0.65">
          <!-- Top Left Gear -->
          <circle cx="35" cy="35" r="14" stroke-dasharray="4,2"/>
          <!-- Top Right Gear -->
          <circle cx="565" cy="35" r="14" stroke-dasharray="4,2"/>
          <!-- Bottom Left Gear -->
          <circle cx="35" cy="765" r="14" stroke-dasharray="4,2"/>
          <!-- Bottom Right Gear -->
          <circle cx="565" cy="765" r="14" stroke-dasharray="4,2"/>
        </g>
        
        <!-- Mechanical Clock cluster at top center -->
        <g transform="translate(300, 52) scale(0.9)" stroke="#ffd700" stroke-width="2" fill="none">
          <circle cx="0" cy="0" r="18" stroke="url(#copper-grad)" stroke-width="3"/>
          <circle cx="0" cy="0" r="6"/>
          <!-- Gear teeth ticks -->
          <path d="M 0 -18 L 0 -22 M 0 18 L 0 22 M -18 0 L -22 0 M 18 0 L 22 0"/>
          <!-- Clock Hands -->
          <line x1="0" y1="0" x2="0" y2="-10" stroke="#f1c40f" stroke-width="2.5"/>
          <line x1="0" y1="0" x2="8" y2="4" stroke="#f1c40f" stroke-width="2"/>
        </g>
      `;
    } else if (currentTheme === "mayan") {
      svg.innerHTML = `
        <defs>
          <filter id="jade-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Stepped deep jade stone frame -->
        <rect x="20" y="20" width="560" height="760" fill="none" stroke="#1abc9c" stroke-width="4" opacity="0.85" filter="url(#jade-glow)"/>
        
        <!-- Geometric stepped carvings in borders -->
        <g stroke="#16a085" stroke-width="2" fill="none" opacity="0.5">
          <!-- Step corner designs -->
          <path d="M 20 60 L 40 60 L 40 40 L 60 40 L 60 20"/>
          <path d="M 580 60 L 560 60 L 560 40 L 540 40 L 540 20"/>
          <path d="M 20 740 L 40 740 L 40 760 L 60 760 L 60 780"/>
          <path d="M 580 740 L 560 740 L 560 760 L 540 760 L 540 780"/>
        </g>
        
        <!-- Mayan Sun God Mask at the top center -->
        <g transform="translate(300, 52) scale(0.9)" stroke="#1abc9c" stroke-width="2" fill="none" filter="url(#jade-glow)">
          <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#16a085" fill-opacity="0.25" stroke-width="2.5"/>
          <!-- Stylized eyes & mouth -->
          <circle cx="-6" cy="-4" r="3.5" fill="#1abc9c"/>
          <circle cx="6" cy="-4" r="3.5" fill="#1abc9c"/>
          <path d="M -10 6 L 10 6 M -6 10 L 6 10" stroke-width="2.5"/>
          <!-- Forehead crown jewel -->
          <polygon points="0,-14 -6,-8 6,-8" fill="#ffd700" stroke="#ffd700" stroke-width="1"/>
        </g>
      `;
    } else if (currentTheme === "gothic") {
      svg.innerHTML = `
        <defs>
          <filter id="gothic-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Ribbed pointed Gothic Cathedral Arch frame -->
        <path d="M 300 15 C 190 90, 30 170, 30 250 L 30 775 L 570 775 L 570 250 C 570 170, 410 90, 300 15 Z" fill="none" stroke="#a6acaf" stroke-width="3" opacity="0.9" filter="url(#gothic-glow)"/>
        <path d="M 300 28 C 200 100, 42 178, 42 252 L 42 763 L 558 763 L 558 252 C 558 178, 400 100, 300 28 Z" fill="none" stroke="#566573" stroke-width="1.2" opacity="0.4"/>
        
        <!-- Gothic Rose window mandala at top center -->
        <g transform="translate(300, 78) scale(0.95)" stroke="#a6acaf" stroke-width="1.8" fill="none" filter="url(#gothic-glow)">
          <circle cx="0" cy="0" r="22"/>
          <circle cx="0" cy="-11" r="9" fill="rgba(166, 172, 175, 0.1)"/>
          <circle cx="-9" cy="5" r="9" fill="rgba(166, 172, 175, 0.1)"/>
          <circle cx="9" cy="5" r="9" fill="rgba(166, 172, 175, 0.1)"/>
          <!-- Core rosette -->
          <circle cx="0" cy="0" r="4.5" fill="#ffd700"/>
        </g>
      `;
    } else if (currentTheme === "persian") {
      svg.innerHTML = `
        <defs>
          <filter id="royal-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Ornate geometric border structure -->
        <rect x="18" y="18" width="564" height="764" fill="none" stroke="#1f4e79" stroke-width="4.5" opacity="0.9" filter="url(#royal-glow)"/>
        <rect x="25" y="25" width="550" height="750" fill="none" stroke="#ffd700" stroke-width="2.2" opacity="0.8"/>
        
        <!-- Arabesque star corner configurations -->
        <g stroke="#ffd700" stroke-width="1.8" fill="none" opacity="0.8">
          <polygon points="25,25 45,25 35,35" fill="#ffd700"/>
          <polygon points="25,25 25,45 35,35" fill="#ffd700"/>
          <polygon points="575,25 555,25 565,35" fill="#ffd700"/>
          <polygon points="575,25 575,45 565,35" fill="#ffd700"/>
          <polygon points="25,775 45,775 35,765" fill="#ffd700"/>
          <polygon points="25,775 25,755 35,765" fill="#ffd700"/>
          <polygon points="575,775 555,775 565,765" fill="#ffd700"/>
          <polygon points="575,775 575,755 565,765" fill="#ffd700"/>
        </g>
        
        <!-- Intricate Ornate Medallion at top center -->
        <g transform="translate(300, 52) scale(0.92)" stroke="#ffd700" stroke-width="1.8" fill="none" filter="url(#royal-glow)">
          <rect x="-14" y="-14" width="28" height="28" transform="rotate(45)" fill="#1f4e79" stroke="#ffd700" stroke-width="2"/>
          <circle cx="0" cy="0" r="7" fill="#ffd700"/>
          <!-- Dynamic radiating floral nodes -->
          <path d="M 0 -14 L 0 -22 M 0 14 L 0 22 M -14 0 L -22 0 M 14 0 L 22 0" stroke-width="2.2"/>
        </g>
      `;
    } else if (currentTheme === "cyber") {
      svg.innerHTML = `
        <defs>
          <filter id="neon-hud-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- High-tech HUD grid circuit border -->
        <rect x="15" y="15" width="570" height="770" rx="8" fill="none" stroke="#af7ac5" stroke-width="2.5" opacity="0.8" filter="url(#neon-hud-glow)"/>
        
        <!-- Cyber circuit trace lines and terminal brackets -->
        <g stroke="#af7ac5" stroke-width="1.5" fill="none" opacity="0.65">
          <path d="M 15 70 L 60 70 L 80 90 L 140 90" />
          <path d="M 585 70 L 540 70 L 520 90 L 460 90" />
          <path d="M 15 730 L 60 730 L 80 710 L 140 710" />
          <path d="M 585 730 L 540 730 L 520 710 L 460 710" />
          
          <!-- Terminal angle brackets in corners -->
          <path d="M 28 45 L 28 28 L 45 28" stroke-width="2.5"/>
          <path d="M 572 45 L 572 28 L 555 28" stroke-width="2.5"/>
          <path d="M 28 755 L 28 772 L 45 772" stroke-width="2.5"/>
          <path d="M 572 755 L 572 772 L 555 772" stroke-width="2.5"/>
        </g>
        
        <!-- Small circuit junction dots -->
        <g fill="#af7ac5" opacity="0.8">
          <circle cx="140" cy="90" r="3"/><circle cx="460" cy="90" r="3"/>
          <circle cx="140" cy="710" r="3"/><circle cx="460" cy="710" r="3"/>
        </g>
        
        <!-- Glowing Holographic Core Emblem at top center -->
        <g transform="translate(300, 52) scale(0.9)" stroke="#af7ac5" stroke-width="1.8" fill="none" filter="url(#neon-hud-glow)">
          <circle cx="0" cy="0" r="16" stroke-dasharray="6,3"/>
          <circle cx="0" cy="0" r="8" fill="#ffffff" fill-opacity="0.1"/>
          <polygon points="0,-4 -4,3 4,3" fill="#af7ac5"/>
        </g>
      `;
    } else if (currentTheme === "indian") {
      svg.innerHTML = `
        <defs>
          <filter id="mandala-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Sandstone temple arch border with detailed ornaments -->
        <rect x="20" y="20" width="560" height="760" rx="12" fill="none" stroke="#d4af37" stroke-width="3.5" opacity="0.95" filter="url(#mandala-glow)"/>
        
        <!-- Multi-layered floral arch design -->
        <path d="M 20 80 C 130 80, 180 35, 300 16 C 420 35, 470 80, 580 80" fill="none" stroke="#d4af37" stroke-width="2" opacity="0.75"/>
        <path d="M 20 95 C 130 95, 180 50, 300 31 C 420 50, 470 95, 580 95" fill="none" stroke="#d4af37" stroke-width="1" opacity="0.35" stroke-dasharray="4,2"/>
        
        <!-- Lotus petals in the bottom corners -->
        <g stroke="#d4af37" stroke-width="1.8" fill="none" opacity="0.6">
          <!-- Bottom Left Lotus -->
          <path d="M 25 765 C 35 765, 45 755, 45 745 C 45 735, 35 745, 25 765 Z" fill="#e67e22" fill-opacity="0.15"/>
          <path d="M 25 765 C 25 755, 35 745, 45 745"/>
          <!-- Bottom Right Lotus -->
          <path d="M 575 765 C 565 765, 555 755, 555 745 C 555 735, 565 745, 575 765 Z" fill="#e67e22" fill-opacity="0.15"/>
          <path d="M 575 765 C 575 755, 565 745, 555 745"/>
        </g>
        
        <!-- Glowing Mandala rosette emblem at top center -->
        <g transform="translate(300, 50) scale(0.92)" stroke="#ffd700" stroke-width="1.8" fill="none" filter="url(#mandala-glow)">
          <circle cx="0" cy="0" r="16" stroke-dasharray="4,2"/>
          <!-- Lotus dome shape -->
          <path d="M 0 -16 C -12 -3, -5 12, 0 16 C 5 12, 12 -3, 0 -16 Z" fill="#e67e22" fill-opacity="0.3"/>
          <path d="M 0 -16 C -20 -10, -20 10, -8 14 M 0 -16 C 20 -10, 20 10, 8 14"/>
        </g>
      `;
    } else if (currentTheme === "cosmic") {
      svg.innerHTML = `
        <defs>
          <filter id="nebula-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>
        <!-- Stellar map coordinate borders -->
        <rect x="15" y="15" width="570" height="770" rx="8" fill="none" stroke="#ffd700" stroke-width="2.5" opacity="0.8" filter="url(#nebula-glow)"/>
        
        <!-- Astrolabe alignment circles -->
        <circle cx="300" cy="65" r="45" stroke="#ffd700" stroke-width="1.5" opacity="0.35" fill="none"/>
        <circle cx="300" cy="65" r="28" stroke="#ffd700" stroke-width="1" opacity="0.2" fill="none"/>
        <line x1="300" y1="12" x2="300" y2="118" stroke="#ffd700" stroke-width="0.8" opacity="0.4"/>
        <line x1="247" y1="65" x2="353" y2="65" stroke="#ffd700" stroke-width="0.8" opacity="0.4"/>
        
        <!-- Celestial Star constellations in corners -->
        <g stroke="#ffd700" stroke-width="1" fill="none" opacity="0.45">
          <!-- Ursa Major constellation (top left) -->
          <circle cx="45" cy="40" r="1.5" fill="#fff"/><circle cx="60" cy="45" r="1.5" fill="#fff"/>
          <circle cx="75" cy="45" r="1.5" fill="#fff"/><circle cx="85" cy="55" r="1.5" fill="#fff"/>
          <line x1="45" y1="40" x2="60" y2="45"/><line x1="60" y1="45" x2="75" y2="45"/><line x1="75" y1="45" x2="85" y2="55"/>
          
          <!-- Orion's Belt (bottom right) -->
          <circle cx="530" cy="740" r="2" fill="#fff"/><circle cx="542" cy="742" r="2" fill="#fff"/><circle cx="554" cy="744" r="2" fill="#fff"/>
          <line x1="530" y1="740" x2="554" y2="744"/>
        </g>
        
        <!-- Radiant Star burst at top center -->
        <g transform="translate(300, 65) scale(0.9)" stroke="#ffffff" stroke-width="1.8" fill="none" filter="url(#nebula-glow)">
          <!-- Giant star facets -->
          <polygon points="0,-16 4,-4 16,0 4,4 0,16 -4,4 -16,0 -4,-4" fill="#ffd700" fill-opacity="0.3"/>
          <circle cx="0" cy="0" r="3" fill="#fff"/>
        </g>
      `;
    }

    sheet.prepend(svg);
  }
  
  // 4. Initialize Three.js Monolith Engine with current theme styling!
  ThreeJSMonolith.init();
  
  // 5. Display the overlay
  papyrusOverlay.classList.remove("hidden");
}

function tryInteract() {
  if (papyrusOpen) { 
    papyrusOpen = false; 
    papyrusOverlay.classList.add("hidden"); 
    return; 
  }
  
  const tx = Math.floor((player.x + player.w/2) / TILE_SIZE);
  const ty = Math.floor((player.y + player.h/2) / TILE_SIZE);

  if (currentStage === 10) {
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
  } else if (!inInterior && currentStage < 10) {
    let nearPortal = false;
    for(let y=ty-2; y<=ty+2; y++) {
      for(let x=tx-2; x<=tx+2; x++) {
        if(y>=0 && y<mapHeight && x>=0 && x<mapWidth && map[y][x] === 2) nearPortal = true;
      }
    }
    if (nearPortal) { inInterior = true; initStage(); }
  } else if (inInterior) {
    let nearMonument = false;
    for(let y=ty-2; y<=ty+2; y++) {
      for(let x=tx-2; x<=tx+2; x++) {
        if(y>=0 && y<mapHeight && x>=0 && x<mapWidth && map[y][x] === 7) nearMonument = true;
      }
    }
    if (nearMonument) {
      openPapyrus();
      if (!stagesMonumentRead[currentStage]) {
        stagesMonumentRead[currentStage] = true;
        logosCollected++;
      }
    }

    let nearExit = false;
    for(let y=ty-2; y<=ty+2; y++) {
      for(let x=tx-2; x<=tx+2; x++) {
        if(y>=0 && y<mapHeight && x>=0 && x<mapWidth && map[y][x] === 9) nearExit = true;
      }
    }
    if (nearExit) { inInterior = false; currentStage++; initStage(); }
  }
}

function isSolid(x, y) {
  const tx = Math.floor(x / TILE_SIZE);
  const ty = Math.floor(y / TILE_SIZE);
  if (tx < 0 || tx >= mapWidth || ty < 0 || ty >= mapHeight) return false;
  const t = map[ty][tx];
  return t === 1 || t === 8;
}

function updatePhysics() {
  if (papyrusOpen) return;

  // Horizontal Movement
  if (keys.has("a") || keys.has("arrowleft")) {
    player.vx = -player.speed;
    player.facingRight = false;
    player.state = "run";
  } else if (keys.has("d") || keys.has("arrowright")) {
    player.vx = player.speed;
    player.facingRight = true;
    player.state = "run";
  } else {
    player.vx = 0;
    player.state = "idle";
  }

  // Shooting Projectile (1 sec cooldown)
  if (keys.has("f") && time - lastShootTime > 1.0) {
     projectiles.push({
       x: player.facingRight ? player.x + player.w : player.x - 12,
       y: player.y + player.h / 2 - 10,
       vx: player.facingRight ? 12 : -12,
       w: 12, h: 12
     });
     lastShootTime = time;
  }

  player.vy += player.gravity;

  // Jump
  if ((keys.has("w") || keys.has("arrowup") || keys.has(" ")) && player.grounded) {
    player.vy = player.jumpPower;
    player.grounded = false;
  }

  if (!player.grounded) player.state = "jump";

  // Apply X collision
  player.x += player.vx;
  if (player.vx > 0) {
    if (isSolid(player.x + player.w, player.y) || isSolid(player.x + player.w, player.y + player.h - 1)) {
      player.x = Math.floor((player.x + player.w) / TILE_SIZE) * TILE_SIZE - player.w;
    }
  } else if (player.vx < 0) {
    if (isSolid(player.x, player.y) || isSolid(player.x, player.y + player.h - 1)) {
      player.x = Math.floor(player.x / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
    }
  }

  // Apply Y collision
  player.grounded = false;
  player.y += player.vy;
  if (player.vy > 0) {
    if (isSolid(player.x, player.y + player.h) || isSolid(player.x + player.w - 1, player.y + player.h)) {
      player.y = Math.floor((player.y + player.h) / TILE_SIZE) * TILE_SIZE - player.h;
      player.vy = 0;
      player.grounded = true;
    }
  } else if (player.vy < 0) {
    if (isSolid(player.x, player.y) || isSolid(player.x + player.w - 1, player.y)) {
      player.y = Math.floor(player.y / TILE_SIZE) * TILE_SIZE + TILE_SIZE;
      const txLeft = Math.floor(player.x / TILE_SIZE);
      const txRight = Math.floor((player.x + player.w - 1) / TILE_SIZE);
      const ty = Math.floor((player.y - 1) / TILE_SIZE);
      if (map[ty][txLeft] === 8) { if(!activeBlocks.find(b=>b.tx===txLeft&&b.ty===ty)) activeBlocks.push({ tx: txLeft, ty, time: 0, spawned: false }); }
      if (map[ty][txRight] === 8) { if(!activeBlocks.find(b=>b.tx===txRight&&b.ty===ty)) activeBlocks.push({ tx: txRight, ty, time: 0, spawned: false }); }
      player.vy = 0;
    }
  }

  if (player.y > mapHeight * TILE_SIZE) { player.y = 100; player.x = 100; player.vy = 0; }

  // Update Projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let p = projectiles[i];
    p.x += p.vx;
    if (isSolid(p.x + (p.vx>0?p.w:0), p.y + p.h/2)) {
      projectiles.splice(i, 1);
      continue;
    }
    let hit = false;
    for (let e of enemies) {
      if (!e.dead && p.x < e.x + e.w && p.x + p.w > e.x && p.y < e.y + e.h && p.y + p.h > e.y) {
        e.dead = true; e.deadTime = 0; e.vx = 0; e.vy = -5;
        hit = true; break;
      }
    }
    if (hit) projectiles.splice(i, 1);
  }

  // Update Traps
  for (let t of traps) {
    if (t.type === 'saw') {
      t.x += t.vx; t.angle += t.vx * 0.1;
      if (t.x < t.minX || t.x > t.maxX) t.vx *= -1;
      const dx = (player.x + player.w/2) - t.x; const dy = (player.y + player.h/2) - t.y;
      // Softened saw collision (radius + 8px instead of +15px)
      if (Math.sqrt(dx*dx + dy*dy) < t.radius + 8) { player.y = 100; player.x = 100; player.vy = 0; }
    } else if (t.type === 'spike') {
      // Spikes are bottom 24px of the tile. Softened side margins (18px-46px instead of 14px-50px)
      if (player.x < t.x + 46 && player.x + player.w > t.x + 18 &&
          player.y < t.y + 64 && player.y + player.h > t.y + 40) {
          player.y = 100; player.x = 100; player.vy = 0;
      }
    } else if (t.type === 'axe') {
      // Slowed down axe swinging (1.5 frequency, smaller maximum angle 2.5 divisor)
      t.angle = Math.sin(time * 1.5 + t.timeOffset) * (Math.PI / 2.5);
      const bx = t.x + 32 + Math.sin(t.angle) * 425; // Aligned directly to tile center, lengthened to 425px for perfect low sweep
      const by = t.y + Math.cos(t.angle) * 425;
      const dx = (player.x + player.w/2) - bx;
      const dy = (player.y + player.h/2) - by;
      // Softened axe collision (42px radius instead of 55px)
      if (Math.sqrt(dx*dx + dy*dy) < 42) { player.y = 100; player.x = 100; player.vy = 0; }
    }
  }

  // Update Enemies
  for (let i = enemies.length - 1; i >= 0; i--) {
    let e = enemies[i];
    
    if (e.dead) {
      e.deadTime += 0.016;
      e.vy += player.gravity; e.y += e.vy;
      if (isSolid(e.x, e.y + e.h) || isSolid(e.x + e.w - 1, e.y + e.h)) {
        e.y = Math.floor((e.y + e.h) / TILE_SIZE) * TILE_SIZE - e.h; e.vy = 0;
      }
      if (e.deadTime > 3.0) enemies.splice(i, 1);
      continue;
    }
    
    if (e.type === 'skeleton' || e.type === 'cultist') {
      e.vy = (e.vy || 0) + player.gravity; e.y += e.vy;
      if (isSolid(e.x, e.y + e.h) || isSolid(e.x + e.w - 1, e.y + e.h)) {
        e.y = Math.floor((e.y + e.h) / TILE_SIZE) * TILE_SIZE - e.h; e.vy = 0;
      }
      const aheadX = e.vx > 0 ? e.x + e.w + 10 : e.x - 10;
      const floorY = e.y + e.h + 5;
      if (!isSolid(aheadX, floorY)) e.vx *= -1; 
      else if (e.x < e.minX || e.x > e.maxX || isSolid(e.x + (e.vx>0?e.w:0), e.y + e.h/2)) e.vx *= -1;
      e.x += e.vx;
    } else if (e.type === 'bat') {
      e.x += e.vx;
      e.y += Math.sin(time * 5 + e.timeOffset) * 2; // hover
      if (e.x < e.minX || e.x > e.maxX) e.vx *= -1;
    }

    if (player.x < e.x + e.w && player.x + player.w > e.x && player.y < e.y + e.h && player.y + player.h > e.y) {
        player.y = 100; player.x = 100; player.vy = 0;
    }
  }

  // Update Blocks & Items
  for (let i = activeBlocks.length - 1; i >= 0; i--) {
    let b = activeBlocks[i];
    b.time += 0.1;
    if (b.time > Math.PI) {
      activeBlocks.splice(i, 1);
    } else if (b.time > Math.PI/2 && !b.spawned) {
      items.push({ x: b.tx * TILE_SIZE + 12, y: b.ty * TILE_SIZE - 60, life: 0 });
      b.spawned = true;
      map[b.ty][b.tx] = 1;
    }
  }

  for (let i = items.length - 1; i >= 0; i--) {
    let item = items[i];
    item.life += 0.016;
    if (item.life > 3.0) { logosCollected++; items.splice(i, 1); }
  }

  camera.x = player.x - canvas.width / 2;
  if(camera.x < 0) camera.x = 0;
  if(camera.x > mapWidth * TILE_SIZE - canvas.width) camera.x = mapWidth * TILE_SIZE - canvas.width;
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
}

function drawDeathBone(ctx, color) {
     ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.lineCap = "round";
     ctx.beginPath(); ctx.arc(-10, 5, 10, 0, Math.PI * 2); ctx.stroke(); // skull
     ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(15, 8); ctx.stroke(); // bone
     ctx.beginPath(); ctx.moveTo(5, 5); ctx.lineTo(20, 10); ctx.stroke(); // bone
     ctx.beginPath(); ctx.moveTo(-5, 0); ctx.lineTo(5, -5); ctx.stroke(); // bone
}

function drawSkeleton(ctx, e, time) {
  ctx.save();
  if (e.dead) {
     ctx.globalAlpha = Math.max(0, 1.0 - e.deadTime / 3.0);
     ctx.translate(e.x + e.w/2, e.y + e.h); // Exactly on top of platform!
     if (e.vx < 0) ctx.scale(-1, 1);
     ctx.rotate(Math.PI / 2); // Rotate to lay flat
     ctx.translate(30, -8); // Align flat on floor line
  } else {
     ctx.translate(e.x + e.w/2, e.y + e.h);
     if (e.vx < 0) ctx.scale(-1, 1);
  }
  const wAmt = e.dead ? 0 : (Math.abs(e.vx)>0?1:0); const phase = e.dead ? 0 : time*8; const bob = Math.sin(phase*2)*2*wAmt;
  const legF = Math.sin(phase)*12*wAmt; const legB = Math.sin(phase+Math.PI)*12*wAmt;
  ctx.translate(0, -60 + bob);
  ctx.lineJoin = "round"; ctx.lineCap = "round";
  
  ctx.strokeStyle = "#95a5a6"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(-10 + legB, 25); ctx.stroke(); // B Arm
  ctx.beginPath(); ctx.moveTo(-5, 35); ctx.lineTo(-5 + legF, 55); ctx.stroke(); // B Leg
  ctx.strokeStyle = "#e0e0e0"; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(0, 10); ctx.lineTo(0, 35); ctx.stroke(); // Spine
  ctx.lineWidth = 3; for(let i=0; i<3; i++) { ctx.beginPath(); ctx.moveTo(-8, 15+i*6); ctx.lineTo(8, 15+i*6); ctx.stroke(); } // Ribs
  ctx.beginPath(); ctx.moveTo(-8, 35); ctx.lineTo(8, 35); ctx.stroke(); // Pelvis
  ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(5, 35); ctx.lineTo(5 + legB, 55); ctx.stroke(); // F Leg
  
  ctx.save(); ctx.translate(0, 10); ctx.rotate(e.dead ? 0.3 : Math.sin(time*3)*0.2); // Arm
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(12, 12); ctx.stroke();
  ctx.strokeStyle = "#bdc3c7"; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(12, 12); ctx.lineTo(30, -5); ctx.stroke(); // Sword
  ctx.strokeStyle = "#c0392b"; ctx.lineWidth=4; ctx.beginPath(); ctx.moveTo(10, 8); ctx.lineTo(16, 16); ctx.stroke(); // Hilt
  ctx.restore();
  
  ctx.fillStyle = "#e0e0e0"; ctx.beginPath(); ctx.arc(0, 0, 12, 0, Math.PI*2); ctx.fill(); // Skull
  ctx.fillRect(-6, 8, 12, 6); // Jaw
  ctx.fillStyle = "#e74c3c"; ctx.beginPath(); ctx.arc(4, 0, 2, 0, Math.PI*2); ctx.arc(-4, 0, 2, 0, Math.PI*2); ctx.fill(); // Eyes
  ctx.restore();
}

function drawCultist(ctx, e, time) {
  ctx.save();
  if (e.dead) {
     ctx.globalAlpha = Math.max(0, 1.0 - e.deadTime / 3.0);
     ctx.translate(e.x + e.w/2, e.y + e.h); // Exactly on top of platform!
     if (e.vx < 0) ctx.scale(-1, 1);
     ctx.rotate(-Math.PI / 2); // Tilt backward
     ctx.translate(-30, -8); // Align flat on floor line
  } else {
     ctx.translate(e.x + e.w/2, e.y + e.h);
     if (e.vx < 0) ctx.scale(-1, 1);
  }
  const phase = e.dead ? 0 : time*10; const bob = e.dead ? 0 : Math.sin(phase*2)*3;
  ctx.translate(0, -60 + bob);
  
  // Robe body
  ctx.fillStyle = "#2c3e50";
  ctx.beginPath(); ctx.moveTo(-15, 60); ctx.lineTo(15, 60); ctx.lineTo(10, 15); ctx.lineTo(-10, 15); ctx.fill();
  
  // Hood
  ctx.fillStyle = "#1a252f";
  ctx.beginPath(); ctx.arc(0, 5, 14, 0, Math.PI*2); ctx.fill();
  
  // Glowing Eyes
  ctx.fillStyle = "#9b59b6";
  ctx.beginPath(); ctx.arc(4, 5, 2.5, 0, Math.PI*2); ctx.arc(-4, 5, 2.5, 0, Math.PI*2); ctx.fill();
  ctx.shadowColor = "#8e44ad"; ctx.shadowBlur = 10;
  ctx.beginPath(); ctx.arc(4, 5, 1.5, 0, Math.PI*2); ctx.arc(-4, 5, 1.5, 0, Math.PI*2); ctx.fill();
  ctx.shadowBlur = 0;
  
  // Magic Hand
  ctx.save(); ctx.translate(15, 30); ctx.rotate(e.dead ? 0.4 : Math.sin(time*4)*0.5);
  ctx.fillStyle = "#9b59b6"; ctx.beginPath(); ctx.arc(10, 0, 5, 0, Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.restore();
}

function drawBat(ctx, e, time) {
  ctx.save();
  if (e.dead) {
     ctx.globalAlpha = Math.max(0, 1.0 - e.deadTime / 3.0);
     ctx.translate(e.x + e.w/2, e.y + e.h/2 + e.deadTime*80); // fall down fast
     ctx.rotate(Math.PI); // Flip upside down!
  } else {
     ctx.translate(e.x + e.w/2, e.y + e.h/2);
     if (e.vx > 0) ctx.scale(-1, 1);
  }
  
  const wingPhase = e.dead ? 0.3 : Math.sin(time * 30 + e.timeOffset);
  
  // Body
  ctx.fillStyle = "#111";
  ctx.beginPath(); ctx.ellipse(0, 0, 10, 6, 0, 0, Math.PI*2); ctx.fill();
  
  // Ears
  ctx.beginPath(); ctx.moveTo(-6, -4); ctx.lineTo(-10, -12); ctx.lineTo(-2, -6); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-1, -6); ctx.lineTo(2, -12); ctx.lineTo(3, -5); ctx.fill();
  
  // Red Eyes
  ctx.fillStyle = "#e74c3c"; ctx.beginPath(); ctx.arc(-6, -2, 1.5, 0, Math.PI*2); ctx.fill();
  
  // Wings
  ctx.fillStyle = "#222";
  ctx.save(); ctx.translate(0, -3); ctx.rotate(wingPhase * 0.8);
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(15, -15); ctx.lineTo(20, -5); ctx.lineTo(10, 5); ctx.fill();
  ctx.restore();
  
  ctx.save(); ctx.translate(5, -3); ctx.rotate(-wingPhase * 0.8);
  ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(15, -15); ctx.lineTo(25, -2); ctx.lineTo(10, 5); ctx.fill();
  ctx.restore();
  
  ctx.restore();
}

function drawSpikes(ctx, t) {
  ctx.fillStyle = "#bdc3c7";
  ctx.strokeStyle = "#7f8c8d";
  ctx.lineWidth = 1;
  for(let i=0; i<4; i++) {
    const x = t.x + 8 + i*14;
    const y = t.y + TILE_SIZE;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x+6, y-20); ctx.lineTo(x+12, y); ctx.fill(); ctx.stroke();
    // Blood tip
    ctx.fillStyle = "rgba(192,57,43,0.6)";
    ctx.beginPath(); ctx.moveTo(x+4, y-10); ctx.lineTo(x+6, y-20); ctx.lineTo(x+8, y-10); ctx.fill();
    ctx.fillStyle = "#bdc3c7";
  }
}

function drawTorch(ctx, px, py, time) {
  // Metallic Bracket
  ctx.fillStyle = "#34495e"; ctx.fillRect(px + 28, py + 30, 8, 25);
  ctx.fillStyle = "#2c3e50"; ctx.beginPath(); ctx.arc(px+32, py+55, 6, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = "#7f8c8d"; ctx.fillRect(px + 24, py + 30, 16, 6);
  
  // Animated Flame
  const flamePhase = time * 15;
  ctx.save();
  ctx.translate(px + 32, py + 26);
  
  // Glow
  const grad = ctx.createRadialGradient(0, -10, 0, 0, -10, 120);
  grad.addColorStop(0, "rgba(243, 156, 18, 0.25)"); grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad; ctx.fillRect(-100, -100, 200, 200);
  
  // Outer Flame (Red/Orange)
  ctx.fillStyle = "rgba(231, 76, 60, 0.9)";
  ctx.beginPath();
  ctx.moveTo(0, 5);
  ctx.quadraticCurveTo(8 + Math.sin(flamePhase)*2, 0, 0, -20 + Math.sin(flamePhase+1)*5);
  ctx.quadraticCurveTo(-8 + Math.cos(flamePhase)*2, 0, 0, 5);
  ctx.fill();
  
  // Inner Flame (Yellow/White)
  ctx.fillStyle = "rgba(241, 196, 15, 0.9)";
  ctx.beginPath();
  ctx.moveTo(0, 3);
  ctx.quadraticCurveTo(4 + Math.sin(flamePhase+2), -2, 0, -12 + Math.cos(flamePhase)*3);
  ctx.quadraticCurveTo(-4 + Math.cos(flamePhase+1), -2, 0, 3);
  ctx.fill();
  
  ctx.restore();
}

function drawPlayer(ctx) {
  const idleAmount = player.state === "idle" ? 1 : 0;
  const walkAmount = player.state === "run" ? 1 : 0;
  const idlePhase = time * 2;
  const walkPhase = time * 10;
  
  const bob = Math.sin(idlePhase) * 0.9 * idleAmount;
  const headLift = Math.sin(idlePhase + 0.2) * 0.5 * idleAmount;
  const armSwingFront = Math.sin(walkPhase) * 10 * walkAmount;
  const armSwingBack = Math.sin(walkPhase + Math.PI) * 10 * walkAmount;
  const legSwingFront = Math.sin(walkPhase + Math.PI) * 8 * walkAmount;
  const legSwingBack = Math.sin(walkPhase) * 8 * walkAmount;

  ctx.save();
  ctx.translate(player.x + player.w/2, player.y + player.h);
  if (!player.facingRight) ctx.scale(-1, 1);
  if (golemEmpowered) {
    ctx.scale(0.85, 0.85); // Golem grows significantly!
  } else {
    ctx.scale(0.6, 0.6); 
  }
  ctx.translate(-55, -133 + bob); 

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = "#232126";
  ctx.lineWidth = 2.2;

  const fillShape = (color, points) => {
    ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
    ctx.closePath(); ctx.fillStyle = color; ctx.fill(); ctx.stroke();
  };

  fillShape("#8a6548", [[90, 29 + armSwingFront * 0.02], [103 + armSwingFront * 0.25, 35], [108 + armSwingFront * 0.46, 48], [102 + armSwingFront * 0.72, 78], [90 + armSwingFront * 0.58, 80], [84, 46]]);
  fillShape("#d0b28a", [[87 + armSwingFront * 0.62, 80], [106 + armSwingFront * 0.76, 80], [113 + armSwingFront * 0.82, 89], [108 + armSwingFront * 0.76, 100], [92 + armSwingFront * 0.66, 100], [85 + armSwingFront * 0.6, 90]]);
  fillShape("#6d4b37", [[59, 86], [69 + legSwingBack * 0.34, 84], [73 + legSwingBack * 0.62, 118], [62 + legSwingBack * 0.48, 122], [57 + legSwingBack * 0.16, 99]]);
  fillShape("#8b6448", [[57 + legSwingBack * 0.42, 116], [75 + legSwingBack * 0.56, 114], [79 + legSwingBack * 0.7, 132], [60 + legSwingBack * 0.44, 133], [52 + legSwingBack * 0.28, 125]]);
  fillShape("#c4a179", [[60 + legSwingBack * 0.44, 118], [74 + legSwingBack * 0.54, 117], [77 + legSwingBack * 0.58, 120], [77 + legSwingBack * 0.56, 126], [74 + legSwingBack * 0.52, 129], [62 + legSwingBack * 0.42, 129], [59 + legSwingBack * 0.4, 126], [58 + legSwingBack * 0.4, 121]]);
  fillShape("#7a563f", [[35, 4 + headLift], [49, -1 + headLift], [64, 4 + headLift], [66, 16 + headLift], [60, 20 + headLift], [41, 20 + headLift], [34, 16 + headLift]]);
  fillShape("#8f6748", [[14, 34], [31, 24], [82, 24], [95, 34], [91, 49], [74, 60], [27, 60], [12, 48]]);
  fillShape("#b6936d", [[31, 31], [72, 31], [76, 37], [71, 53], [38, 53], [29, 40]]);
  
  ctx.fillStyle = "#ff6a8f"; ctx.beginPath(); ctx.moveTo(48, 8 + headLift); ctx.lineTo(54, 8 + headLift); ctx.lineTo(52, 12 + headLift); ctx.lineTo(46, 12 + headLift); ctx.closePath(); ctx.fill();
  ctx.fillStyle = "#d7c5bb"; ctx.beginPath(); ctx.arc(49, 11 + headLift, 1.8, 0, Math.PI * 2); ctx.arc(56, 10 + headLift, 1.8, 0, Math.PI * 2); ctx.fill();

  if (crystalReady) {
    const isEmpowered = (typeof golemEmpowered !== 'undefined' && golemEmpowered);
    const glow = isEmpowered ? 40 : (10 + Math.sin(time * 5) * 2.6);
    ctx.save(); 
    ctx.globalAlpha = isEmpowered ? 1.0 : 0.68; 
    ctx.shadowColor = "rgba(255, 120, 180, 1.0)"; 
    ctx.shadowBlur = glow;
    
    if (isEmpowered) {
      ctx.translate(43 + 8, 33 + 8);
      ctx.scale(1.4, 1.4);
      ctx.drawImage(crystalImage, -8, -8, 16, 16); 
    } else {
      ctx.drawImage(crystalImage, 43, 33, 16, 16); 
    }
    ctx.restore();
  }

  fillShape("#6f4e39", [[35, 74], [64, 74], [67, 80], [63, 89], [38, 89], [31, 80]]);
  fillShape("#7f5b42", [[34, 86], [44 + legSwingFront * 0.34, 84], [46 + legSwingFront * 0.62, 117], [35 + legSwingFront * 0.48, 122], [30 + legSwingFront * 0.16, 99]]);
  fillShape("#8b6448", [[27 + legSwingFront * 0.42, 116], [45 + legSwingFront * 0.56, 114], [48 + legSwingFront * 0.7, 132], [28 + legSwingFront * 0.44, 133], [21 + legSwingFront * 0.28, 125]]);
  fillShape("#c4a179", [[30 + legSwingFront * 0.44, 118], [44 + legSwingFront * 0.54, 117], [47 + legSwingFront * 0.58, 120], [47 + legSwingFront * 0.56, 126], [44 + legSwingFront * 0.52, 129], [32 + legSwingFront * 0.42, 129], [29 + legSwingFront * 0.4, 126], [28 + legSwingFront * 0.4, 121]]);
  fillShape("#6f4d38", [[18, 28 + armSwingBack * 0.02], [7 + armSwingBack * 0.25, 36], [2 + armSwingBack * 0.45, 54], [7 + armSwingBack * 0.7, 84], [20 + armSwingBack * 0.55, 82], [25, 45]]);
  fillShape("#d0b28a", [[0 + armSwingBack * 0.72, 84], [19 + armSwingBack * 0.64, 84], [22 + armSwingBack * 0.68, 95], [18 + armSwingBack * 0.68, 100], [3 + armSwingBack * 0.7, 99], [-2 + armSwingBack * 0.76, 91]]);

  ctx.restore();
}

function drawPortal(px, py) {
  const room = ROOMS[currentStage] || ROOMS[0];
  const cx = px + TILE_SIZE/2 + 48; // Shifted right by 48px to align outermost pedestal rocks perfectly with platform edges!
  const cy = py + 34;
  const outerR = 56;
  const ringR = 47;
  const innerR = 34;

  const core = room.portalCore || "#c6d0ff";

  // Detailed Stone Pedestal & Stairs (Grounded at y + 128)
  ctx.save();
  ctx.translate(px + 80, py + 128); // Shifted right by 48px (px + 32 + 48 = px + 80)
  
  ctx.strokeStyle = "#1a252f";
  ctx.lineWidth = 2;

  // Step 1 (Bottom)
  ctx.fillStyle = "#2c3e50"; ctx.fillRect(-60, -16, 120, 16);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(-60, -16, 120, 3);
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(-60, -3, 120, 3);
  ctx.strokeRect(-60, -16, 120, 16);
  ctx.beginPath();
  ctx.moveTo(-30, -16); ctx.lineTo(-30, 0);
  ctx.moveTo(0, -16); ctx.lineTo(0, 0);
  ctx.moveTo(30, -16); ctx.lineTo(30, 0);
  ctx.stroke();

  // Step 2
  ctx.fillStyle = "#3b4860"; ctx.fillRect(-45, -32, 90, 16);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(-45, -32, 90, 3);
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(-45, -19, 90, 3);
  ctx.strokeRect(-45, -32, 90, 16);
  ctx.beginPath();
  ctx.moveTo(-15, -32); ctx.lineTo(-15, -16);
  ctx.moveTo(15, -32); ctx.lineTo(15, -16);
  ctx.stroke();

  // Step 3 (Top)
  ctx.fillStyle = "#4e5d7a"; ctx.fillRect(-30, -48, 60, 16);
  ctx.fillStyle = "rgba(255,255,255,0.15)"; ctx.fillRect(-30, -48, 60, 3);
  ctx.fillStyle = "rgba(0,0,0,0.3)"; ctx.fillRect(-30, -35, 60, 3);
  ctx.strokeRect(-30, -48, 60, 16);
  ctx.beginPath();
  ctx.moveTo(0, -48); ctx.lineTo(0, -32);
  ctx.stroke();

  // Rocky Outcrops
  ctx.fillStyle = "#263238"; // Dark mossy rock
  ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-80, 0); ctx.lineTo(-70, -30); ctx.lineTo(-50, -50); ctx.lineTo(-40, -16); ctx.fill();
  ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(80, 0); ctx.lineTo(75, -20); ctx.lineTo(55, -45); ctx.lineTo(40, -16); ctx.fill();

  // Rock Cracks
  ctx.beginPath(); ctx.moveTo(-70, -10); ctx.lineTo(-60, -20); ctx.lineTo(-55, -40); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(70, -5); ctx.lineTo(60, -15); ctx.lineTo(55, -30); ctx.stroke();

  ctx.restore();

  // --- HIGH FIDELITY PREMIUM PORTAL DRAWING ---
  ctx.save();
  
  // 1. Pulsing Ambient Outer Glow
  const ambientGlow = ctx.createRadialGradient(cx, cy, ringR, cx, cy, outerR + 25);
  ambientGlow.addColorStop(0, `${core}55`);
  ambientGlow.addColorStop(0.5, `${core}22`);
  ambientGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = ambientGlow;
  ctx.beginPath(); ctx.arc(cx, cy, outerR + 25, 0, Math.PI * 2); ctx.fill();

  // 2. Portal Metallic Stone Ring Body
  const ringGrad = ctx.createRadialGradient(cx - 15, cy - 20, 10, cx, cy, outerR);
  ringGrad.addColorStop(0, "#5a6a8a");
  ringGrad.addColorStop(0.4, "#2c3e50");
  ringGrad.addColorStop(0.8, "#1a252f");
  ringGrad.addColorStop(1, "#0d1318");
  ctx.fillStyle = ringGrad;
  ctx.beginPath(); ctx.arc(cx, cy, outerR, 0, Math.PI * 2); ctx.fill();

  // Draw subtle cracks / brick lines on the metallic ring itself
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for(let i=0; i<8; i++) {
     const angle = i * Math.PI / 4;
     ctx.beginPath();
     ctx.moveTo(cx + Math.cos(angle)*ringR, cy + Math.sin(angle)*ringR);
     ctx.lineTo(cx + Math.cos(angle)*outerR, cy + Math.sin(angle)*outerR);
     ctx.stroke();
  }

  // 3. Inner Glowing Neon Ring
  ctx.strokeStyle = core;
  ctx.lineWidth = 3;
  ctx.shadowColor = core;
  ctx.shadowBlur = 15;
  ctx.beginPath(); ctx.arc(cx, cy, ringR, 0, Math.PI * 2); ctx.stroke();
  ctx.shadowBlur = 0; // reset shadow

  // 4. The 4 Rhombus Runes (Baklava) - Larger, detailed, and glowing
  ctx.fillStyle = core;
  ctx.shadowColor = core;
  ctx.shadowBlur = 10;
  for(let i=0; i<4; i++) {
     const angle = (i * Math.PI / 2) + Math.PI/4 + (time * 0.4);
     const rx = cx + Math.cos(angle) * (outerR + 18);
     const ry = cy + Math.sin(angle) * (outerR + 18);
     ctx.save(); ctx.translate(rx, ry); ctx.rotate(time * 1.5 + i);
     // Rhombus shape
     ctx.beginPath(); ctx.moveTo(0, -9); ctx.lineTo(9, 0); ctx.lineTo(0, 9); ctx.lineTo(-9, 0); ctx.fill();
     // Small inner core cut-out
     ctx.fillStyle = "#fff";
     ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(4, 0); ctx.lineTo(0, 4); ctx.lineTo(-4, 0); ctx.fill();
     ctx.restore();
  }
  ctx.shadowBlur = 0;

  // 5. Procedural Ancient Glyphs along the inner rim (glowing dots & ticks)
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  for(let i=0; i<16; i++) {
     const angle = (i * Math.PI / 8) - (time * 0.2);
     const gx = cx + Math.cos(angle) * (ringR - 4);
     const gy = cy + Math.sin(angle) * (ringR - 4);
     ctx.beginPath(); ctx.arc(gx, gy, 1.5, 0, Math.PI*2); ctx.fill();
  }

  // 6. Dynamic Orbiting Spark Particles
  ctx.fillStyle = "#fff";
  for(let i=0; i<8; i++) {
     const angle = (time * 2.5) + (i * Math.PI / 4);
     const rDist = ringR + 8 + Math.sin(time*5 + i)*6;
     const sx = cx + Math.cos(angle) * rDist;
     const sy = cy + Math.sin(angle) * rDist;
     const sSize = 2 + Math.abs(Math.sin(time*8 + i))*1.5;
     ctx.beginPath(); ctx.arc(sx, sy, sSize, 0, Math.PI*2); ctx.fill();
  }

  // 7. Swirling Energy Core (Inner Clip)
  ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.clip();
  
  const portalGlow = ctx.createRadialGradient(cx, cy, 2, cx, cy, innerR + 5);
  portalGlow.addColorStop(0, "#ffffff");
  portalGlow.addColorStop(0.3, `${core}ee`);
  portalGlow.addColorStop(0.7, `${core}44`);
  portalGlow.addColorStop(1, "rgba(0,0,0,0.85)");
  ctx.fillStyle = portalGlow;
  ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.fill();

  for (let i = 0; i < 6; i += 1) {
    const swirlX = cx + Math.sin((time * 4) + i) * 10;
    const swirlY = cy + Math.cos((time * 5) + i) * 10;
    const swirl = ctx.createRadialGradient(swirlX, swirlY, 3, cx, cy, innerR + 10);
    swirl.addColorStop(0, "rgba(255,255,255,0.95)");
    swirl.addColorStop(0.4, `${core}aa`);
    swirl.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = swirl; 
    ctx.beginPath(); ctx.arc(cx, cy, innerR, 0, Math.PI * 2); ctx.fill();
  }

  ctx.restore();
}

function getColumnVerticalBounds(x) {
  // Safety check to prevent crash if map is empty or not loaded yet
  if (!map || map.length === 0 || !map[0] || x < 0) {
    return { topY: 64, bottomY: 448 };
  }
  
  let startY = 0;
  // Scan down to find first non-solid cell (corridor start)
  // Only standard solid wall blocks (tile === 1) represent structural ceilings
  while (startY < mapHeight && startY < map.length) {
    if (!map[startY]) break;
    const tile = map[startY][x];
    if (tile !== 1) {
      break;
    }
    startY++;
  }
  
  let endY = startY;
  // Scan down to find the floor platform (first solid cell)
  // Only standard solid wall blocks (tile === 1) represent structural ground
  while (endY < mapHeight && endY < map.length) {
    if (!map[endY]) break;
    const tile = map[endY][x];
    if (tile === 1) {
      break;
    }
    endY++;
  }
  
  return {
    topY: startY * TILE_SIZE,
    bottomY: endY * TILE_SIZE
  };
}

function drawThematicPlatformBackdrop(ctx, stage, time) {
  ctx.save();
  
  // Custom theme gradients
  let bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  if (stage === 0) { // Brookwell - Norse
    bgGrad.addColorStop(0, "#080a10");
    bgGrad.addColorStop(1, "#141926");
  } else if (stage === 1) { // Avvio - Egyptian
    bgGrad.addColorStop(0, "#2c1d0f");
    bgGrad.addColorStop(1, "#442e19");
  } else if (stage === 2) { // Via - Greek
    bgGrad.addColorStop(0, "#0f1115");
    bgGrad.addColorStop(1, "#1b1f26");
  } else if (stage === 3) { // Shift - Chinese
    bgGrad.addColorStop(0, "#140808");
    bgGrad.addColorStop(1, "#261010");
  } else if (stage === 4) { // Blend - Mayan
    bgGrad.addColorStop(0, "#06120b");
    bgGrad.addColorStop(1, "#0d2616");
  } else if (stage === 5) { // Promis - Gothic
    bgGrad.addColorStop(0, "#0d0e12");
    bgGrad.addColorStop(1, "#181a21");
  } else if (stage === 6) { // Vend - Persian
    bgGrad.addColorStop(0, "#050b1c");
    bgGrad.addColorStop(1, "#0d1a3a");
  } else if (stage === 7) { // DashX - Cyber
    bgGrad.addColorStop(0, "#0e051c");
    bgGrad.addColorStop(1, "#1e0b3d");
  } else if (stage === 8) { // Specie - Indian
    bgGrad.addColorStop(0, "#240606");
    bgGrad.addColorStop(1, "#450c0c");
  } else { // Port Markets / Cosmic
    bgGrad.addColorStop(0, "#030408");
    bgGrad.addColorStop(1, "#080c14");
  }
  
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw subtle, scattered ancient broken brick clusters inside camera translation
  // This locks them 100% statically in world space so they NEVER scroll or float with the player!
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.16)"; // Lighter, more visible color
  ctx.lineWidth = 1.2;
  ctx.setLineDash([3, 4]); // Dashed/dotted line effect!

  let seed = stage * 12345;
  function pseudoRandom() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  const worldWidth = mapWidth * TILE_SIZE;
  
  // Helper to draw a beautifully broken brick
  function drawBrokenBrick(bx, cy, bw, bh) {
    ctx.beginPath();
    // Top-left
    ctx.moveTo(bx, cy + bh * 0.35);
    ctx.lineTo(bx, cy);
    ctx.lineTo(bx + bw * 0.4, cy);
    
    // Top-right
    ctx.moveTo(bx + bw * 0.7, cy);
    ctx.lineTo(bx + bw);
    ctx.lineTo(bx + bw, cy + bh * 0.35);
    
    // Bottom-left
    ctx.moveTo(bx, cy + bh * 0.65);
    ctx.lineTo(bx, cy + bh);
    ctx.lineTo(bx + bw * 0.3, cy + bh);
    
    // Bottom-right
    ctx.moveTo(bx + bw * 0.75, cy + bh);
    ctx.lineTo(bx + bw, cy + bh);
    ctx.lineTo(bx + bw, cy + bh * 0.65);
    
    // Central broken crack
    ctx.moveTo(bx + bw * 0.35, cy + bh * 0.2);
    ctx.lineTo(bx + bw * 0.5, cy + bh * 0.5);
    ctx.lineTo(bx + bw * 0.45, cy + bh * 0.75);
    ctx.stroke();
  }

  // Draw 15 scattered brick clusters
  for (let i = 0; i < 15; i++) {
    const bx = pseudoRandom() * worldWidth;
    const cy = 80 + pseudoRandom() * 320;
    
    // Brick 1 (Top)
    drawBrokenBrick(bx, cy, 44, 16);
    // Brick 2 (Bottom-Left)
    drawBrokenBrick(bx - 22, cy + 16, 44, 16);
    // Brick 3 (Bottom-Right)
    drawBrokenBrick(bx + 22, cy + 16, 44, 16);
  }

  ctx.restore(); // Restore camera translation
  ctx.restore(); // Restore backdrop state
}

function drawThematicPillar(ctx, cx, topY, bottomY, stage, time) {
  ctx.save();
  const height = bottomY - topY;

  if (stage === 0) { // Brookwell - Norse
    // Dark volcanic runic basalt stone
    const shaftGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
    shaftGrad.addColorStop(0, "#1c1f24");
    shaftGrad.addColorStop(0.3, "#323742");
    shaftGrad.addColorStop(0.7, "#454c5c");
    shaftGrad.addColorStop(1, "#1c1f24");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 20, topY, 40, height);
    ctx.strokeStyle = "#0d1013"; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 20, topY, 40, height);

    // Horizontal joints
    ctx.strokeStyle = "#171a1e"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let gy = topY + 40; gy < bottomY; gy += 64) {
      ctx.moveTo(cx - 20, gy); ctx.lineTo(cx + 20, gy);
    }
    ctx.stroke();

    // Runic engravings with cyan glow!
    ctx.strokeStyle = "rgba(0, 191, 255, 0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, topY + 120); ctx.lineTo(cx, topY + 150);
    ctx.moveTo(cx, topY + 135); ctx.lineTo(cx + 8, topY + 127);
    ctx.moveTo(cx, topY + 280); ctx.lineTo(cx, topY + 310);
    ctx.moveTo(cx, topY + 295); ctx.lineTo(cx - 8, topY + 303);
    ctx.stroke();

    // Heavy slate capital and base blocks
    ctx.fillStyle = "#263238";
    ctx.fillRect(cx - 26, topY, 52, 16);
    ctx.strokeRect(cx - 26, topY, 52, 16);
    ctx.fillRect(cx - 26, bottomY - 16, 52, 16);
    ctx.strokeRect(cx - 26, bottomY - 16, 52, 16);

  } else if (stage === 1) { // Avvio - Egyptian
    // Warm lime sandstone with lotus-bud carvings
    const shaftGrad = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0);
    shaftGrad.addColorStop(0, "#a38258");
    shaftGrad.addColorStop(0.3, "#e5cfb3");
    shaftGrad.addColorStop(0.7, "#fcf3e8");
    shaftGrad.addColorStop(1, "#a38258");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 18, topY, 36, height);
    ctx.strokeStyle = "rgba(139, 90, 43, 0.4)"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 18, topY, 36, height);

    // Hieroglyphs carved on the shaft
    ctx.strokeStyle = "rgba(139, 90, 43, 0.35)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, topY + 140, 8, 0, Math.PI*2);
    ctx.moveTo(cx, topY + 148); ctx.lineTo(cx, topY + 170);
    ctx.moveTo(cx - 8, topY + 156); ctx.lineTo(cx + 8, topY + 156);

    ctx.arc(cx, topY + 280, 8, 0, Math.PI*2);
    ctx.moveTo(cx, topY + 288); ctx.lineTo(cx, topY + 310);
    ctx.stroke();

    // Lotus capital at the top
    ctx.fillStyle = "#2e7d32"; // Green lotus leaves
    ctx.beginPath();
    ctx.arc(cx, topY + 24, 20, 0, Math.PI, true);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(139, 90, 43, 0.5)"; ctx.stroke();

    // Gold/Red rings under the capital
    ctx.fillStyle = "#d84315"; ctx.fillRect(cx - 20, topY + 24, 40, 6);
    ctx.fillStyle = "#d4af37"; ctx.fillRect(cx - 18, topY + 30, 36, 4);

    // Large base block
    ctx.fillStyle = "#a38258";
    ctx.fillRect(cx - 24, bottomY - 20, 48, 20);
    ctx.strokeRect(cx - 24, bottomY - 20, 48, 20);

  } else if (stage === 2) { // Via - Greek
    // Pure Carrara White/Grey Marble Column
    const shaftGrad = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0);
    shaftGrad.addColorStop(0, "#cccccc");
    shaftGrad.addColorStop(0.3, "#f2f2f2");
    shaftGrad.addColorStop(0.7, "#ffffff");
    shaftGrad.addColorStop(1, "#cccccc");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 18, topY, 36, height);
    ctx.strokeStyle = "#b0b0b0"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 18, topY, 36, height);

    // Fluted grooves
    ctx.fillStyle = "#d8d8d8";
    for (let f = cx - 12; f <= cx + 12; f += 6) {
      ctx.fillRect(f, topY, 1.5, height);
    }

    // Ionic capital scrolls at top
    ctx.fillStyle = "#f5f5f5";
    ctx.fillRect(cx - 26, topY + 10, 52, 14);
    ctx.strokeRect(cx - 26, topY + 10, 52, 14);
    ctx.fillStyle = "#e0e0e0";
    ctx.beginPath();
    ctx.arc(cx - 20, topY + 17, 6, 0, Math.PI*2);
    ctx.arc(cx + 20, topY + 17, 6, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // Classical Corinthian abacus slab at the very ceiling
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 28, topY, 56, 10);
    ctx.strokeRect(cx - 28, topY, 56, 10);

    // Stepped white marble base
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(cx - 24, bottomY - 14, 48, 14);
    ctx.strokeRect(cx - 24, bottomY - 14, 48, 14);
    ctx.fillStyle = "#d0d0d0";
    ctx.fillRect(cx - 20, bottomY - 22, 40, 8);
    ctx.strokeRect(cx - 20, bottomY - 22, 40, 8);

  } else if (stage === 3) { // Shift - Chinese
    // Black lacquered cedar wood columns
    const shaftGrad = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0);
    shaftGrad.addColorStop(0, "#0a0a0a");
    shaftGrad.addColorStop(0.3, "#262626");
    shaftGrad.addColorStop(0.7, "#3a3a3a");
    shaftGrad.addColorStop(1, "#0a0a0a");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 18, topY, 36, height);
    ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 18, topY, 36, height);

    // Winding golden imperial cloud designs on the column shaft
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let cy_w = topY + 60; cy_w < bottomY - 40; cy_w += 90) {
      ctx.moveTo(cx - 10, cy_w);
      ctx.quadraticCurveTo(cx + 10, cy_w + 20, cx - 10, cy_w + 40);
      ctx.quadraticCurveTo(cx + 10, cy_w + 60, cx - 10, cy_w + 80);
    }
    ctx.stroke();

    // Dark crimson flared pagoda capitals
    ctx.fillStyle = "#5c0000";
    ctx.fillRect(cx - 26, topY + 12, 52, 14);
    ctx.strokeRect(cx - 26, topY + 12, 52, 14);
    ctx.fillRect(cx - 28, topY, 56, 12);
    ctx.strokeRect(cx - 28, topY, 56, 12);

    // Vermillion base block with gold borders
    ctx.fillStyle = "#c0392b";
    ctx.fillRect(cx - 24, bottomY - 18, 48, 18);
    ctx.strokeRect(cx - 24, bottomY - 18, 48, 18);
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - 24, bottomY - 18, 48, 3);

  } else if (stage === 4) { // Blend - Mayan
    // Megalithic mossy emerald stone column
    const shaftGrad = ctx.createLinearGradient(cx - 22, 0, cx + 22, 0);
    shaftGrad.addColorStop(0, "#151c17");
    shaftGrad.addColorStop(0.3, "#2b3b31");
    shaftGrad.addColorStop(0.7, "#3a5244");
    shaftGrad.addColorStop(1, "#151c17");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 22, topY, 44, height);
    ctx.strokeStyle = "#2e7d32"; ctx.lineWidth = 2;
    ctx.strokeRect(cx - 22, topY, 44, height);

    // Horizontal heavy masonry seams
    ctx.strokeStyle = "#1b2620"; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let my = topY + 48; my < bottomY; my += 72) {
      ctx.moveTo(cx - 22, my); ctx.lineTo(cx + 22, my);
    }
    ctx.stroke();

    // Climbing green jungle ivy wrapped around the pillars!
    ctx.strokeStyle = "#387f3a"; ctx.lineWidth = 1.8;
    ctx.fillStyle = "#2d5a27";
    ctx.beginPath();
    ctx.moveTo(cx, bottomY - 16);
    ctx.quadraticCurveTo(cx - 20, topY + 300, cx + 15, topY + 200);
    ctx.quadraticCurveTo(cx - 15, topY + 100, cx, topY + 16);
    ctx.stroke();

    // Add ivy leaves along the column
    for (let ly = topY + 40; ly < bottomY - 40; ly += 60) {
      ctx.beginPath();
      ctx.ellipse(cx + Math.sin(ly)*10, ly, 7, 5, Math.PI/4, 0, Math.PI*2);
      ctx.fill();
    }

    // Heavy dark capital and base stone slabs
    ctx.fillStyle = "#151d18";
    ctx.fillRect(cx - 28, topY, 56, 16);
    ctx.strokeRect(cx - 28, topY, 56, 16);
    ctx.fillRect(cx - 28, bottomY - 16, 56, 16);
    ctx.strokeRect(cx - 28, bottomY - 16, 56, 16);

  } else if (stage === 5) { // Promis - Gothic
    // Towering pointed cathedral arch shafts
    const shaftGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
    shaftGrad.addColorStop(0, "#111214");
    shaftGrad.addColorStop(0.3, "#212429");
    shaftGrad.addColorStop(0.7, "#353942");
    shaftGrad.addColorStop(1, "#111214");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 20, topY, 40, height);
    ctx.strokeStyle = "#4f5666"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 20, topY, 40, height);

    // Clustered vertical ribbed shafts (Gothic style)
    ctx.fillStyle = "#16181c";
    ctx.fillRect(cx - 10, topY, 3, height);
    ctx.fillRect(cx, topY, 4, height);
    ctx.fillRect(cx + 7, topY, 3, height);

    // Pointed gothic ribbed arch capitals at top
    ctx.fillStyle = "#2c2f38";
    ctx.beginPath();
    ctx.moveTo(cx - 24, topY + 24);
    ctx.lineTo(cx - 20, topY);
    ctx.lineTo(cx + 20, topY);
    ctx.lineTo(cx + 24, topY + 24);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#4f5666"; ctx.stroke();

    // Rose Window miniature rosette on capital
    ctx.fillStyle = "#ffd700";
    ctx.beginPath(); ctx.arc(cx, topY + 12, 4, 0, Math.PI*2); ctx.fill();

    // Heavy iron-bound stone base
    ctx.fillStyle = "#16181c";
    ctx.fillRect(cx - 24, bottomY - 18, 48, 18);
    ctx.strokeRect(cx - 24, bottomY - 18, 48, 18);

  } else if (stage === 6) { // Vend - Persian
    // Symmetrical White Marble Columns with Golden Corinthian capitals
    const shaftGrad = ctx.createLinearGradient(cx - 18, 0, cx + 18, 0);
    shaftGrad.addColorStop(0, "#dedede");
    shaftGrad.addColorStop(0.3, "#ffffff");
    shaftGrad.addColorStop(0.7, "#ffffff");
    shaftGrad.addColorStop(1, "#dedede");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 18, topY, 36, height);
    ctx.strokeStyle = "#b0b0b0"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 18, topY, 36, height);

    // Vertical flutes
    ctx.fillStyle = "#eaeaea";
    for (let f = cx - 12; f <= cx + 12; f += 6) {
      ctx.fillRect(f, topY, 1.5, height);
    }

    // Detailed Golden Corinthian capital (carved acanthus leaf clusters)
    ctx.fillStyle = "#d4af37";
    ctx.beginPath();
    ctx.moveTo(cx - 24, topY + 8);
    ctx.lineTo(cx + 24, topY + 8);
    ctx.lineTo(cx + 18, topY + 24);
    ctx.lineTo(cx - 18, topY + 24);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#996515"; ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(cx - 26, topY, 52, 8);
    ctx.strokeRect(cx - 26, topY, 52, 8);

    // Stepped gold base
    ctx.fillStyle = "#b7950b";
    ctx.fillRect(cx - 22, bottomY - 16, 44, 16);
    ctx.strokeRect(cx - 22, bottomY - 16, 44, 16);

  } else if (stage === 7) { // DashX - Cyber
    // Lapis Lazuli and double-bull columns
    const shaftGrad = ctx.createLinearGradient(cx - 16, 0, cx + 16, 0);
    shaftGrad.addColorStop(0, "#081226");
    shaftGrad.addColorStop(0.3, "#10264d");
    shaftGrad.addColorStop(0.7, "#1c3d73");
    shaftGrad.addColorStop(1, "#081226");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 16, topY, 32, height);
    ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 16, topY, 32, height);

    // Golden flutes
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - 8, topY, 1.2, height);
    ctx.fillRect(cx, topY, 1.2, height);
    ctx.fillRect(cx + 8, topY, 1.2, height);

    // Double-Bull capital at the top
    ctx.fillStyle = "#d4af37";
    ctx.beginPath();
    ctx.moveTo(cx, topY + 10);
    ctx.lineTo(cx - 22, topY + 10);
    ctx.quadraticCurveTo(cx - 26, topY + 20, cx - 20, topY + 34);
    ctx.lineTo(cx + 20, topY + 34);
    ctx.quadraticCurveTo(cx + 26, topY + 20, cx + 22, topY + 10);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#533a0b"; ctx.stroke();

    // Dark horns
    ctx.strokeStyle = "#3a2512"; ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(cx - 18, topY + 10); ctx.quadraticCurveTo(cx - 22, topY, cx - 16, topY - 4);
    ctx.moveTo(cx + 18, topY + 10); ctx.quadraticCurveTo(cx + 22, topY, cx + 16, topY - 4);
    ctx.stroke();

    // Bell-shaped sandstone base
    ctx.fillStyle = "#eae2cf";
    ctx.beginPath();
    ctx.moveTo(cx - 16, bottomY - 18);
    ctx.bezierCurveTo(cx - 24, bottomY - 18, cx - 26, bottomY - 8, cx - 26, bottomY);
    ctx.lineTo(cx + 26, bottomY);
    ctx.bezierCurveTo(cx + 26, bottomY - 8, cx + 24, bottomY - 18, cx + 16, bottomY - 18);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 1.5; ctx.stroke();

  } else if (stage === 8) { // Specie - Indian
    // Red Sandstone columns with stepped collars
    const shaftGrad = ctx.createLinearGradient(cx - 16, 0, cx + 16, 0);
    shaftGrad.addColorStop(0, "#73241d");
    shaftGrad.addColorStop(0.3, "#b03a2e");
    shaftGrad.addColorStop(0.7, "#c94f42");
    shaftGrad.addColorStop(1, "#73241d");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 16, topY, 32, height);
    ctx.strokeStyle = "#78281f"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 16, topY, 32, height);

    // Stacked octagonal gold molding collars
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - 20, topY + 120, 40, 8);
    ctx.strokeRect(cx - 20, topY + 120, 40, 8);
    ctx.fillRect(cx - 20, topY + 280, 40, 8);
    ctx.strokeRect(cx - 20, topY + 280, 40, 8);

    // Stepped Red Sandstone capital at top
    ctx.fillStyle = "#b03a2e";
    ctx.fillRect(cx - 22, topY + 14, 44, 10);
    ctx.strokeRect(cx - 22, topY + 14, 44, 10);
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - 24, topY, 48, 14);
    ctx.strokeRect(cx - 24, topY, 48, 14);

    // Bell-shaped carved base decorated with gold trim
    ctx.fillStyle = "#b03a2e";
    ctx.beginPath();
    ctx.moveTo(cx - 16, bottomY - 20);
    ctx.bezierCurveTo(cx - 24, bottomY - 20, cx - 26, bottomY - 8, cx - 26, bottomY);
    ctx.lineTo(cx + 26, bottomY);
    ctx.bezierCurveTo(cx + 26, bottomY - 8, cx + 24, bottomY - 20, cx + 16, bottomY - 20);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#78281f"; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(cx - 20, bottomY - 6, 40, 3);

  } else if (stage === 9) { // Port Markets
    // Polished obsidian black with vertical gold flutes
    const shaftGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
    shaftGrad.addColorStop(0, "#08080a");
    shaftGrad.addColorStop(0.3, "#191a21");
    shaftGrad.addColorStop(0.7, "#282b36");
    shaftGrad.addColorStop(1, "#08080a");

    ctx.fillStyle = shaftGrad;
    ctx.fillRect(cx - 20, topY, 40, height);
    ctx.strokeStyle = "rgba(255, 215, 0, 0.35)"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 20, topY, 40, height);

    // Vertical gold flutes
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(cx - 10, topY, 2, height);
    ctx.fillRect(cx - 3, topY, 2, height);
    ctx.fillRect(cx + 4, topY, 2, height);

    // Colossal shining golden Corinthian capitals
    ctx.fillStyle = "#ffd700";
    ctx.beginPath();
    ctx.moveTo(cx - 26, topY + 8);
    ctx.lineTo(cx + 26, topY + 8);
    ctx.lineTo(cx + 20, topY + 24);
    ctx.lineTo(cx - 20, topY + 24);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#b7950b"; ctx.stroke();

    ctx.fillStyle = "#191a21";
    ctx.fillRect(cx - 28, topY, 56, 8);
    ctx.strokeRect(cx - 28, topY, 56, 8);

    // Massive stepped gold base
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(cx - 24, bottomY - 18, 48, 18);
    ctx.strokeRect(cx - 24, bottomY - 18, 48, 18);
  }

  ctx.restore();
}

function drawThematicSanctum(ctx, stageIndex, time) {
  ctx.save();

  // Draw core background wall styles
  if (stageIndex === 0) { // Norse Vault
    ctx.fillStyle = "#12141c"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Runic wall grooves
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    ctx.lineWidth = 2;
    for(let x=100; x<1280; x+=200) {
      ctx.strokeRect(x, 40, 160, 408);
    }

    // Glowing blue runes
    ctx.strokeStyle = "rgba(0, 191, 255, 0.4)";
    ctx.shadowColor = "#00bfff";
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(704, 130); ctx.lineTo(704, 230);
    ctx.moveTo(704, 150); ctx.lineTo(724, 130);
    ctx.moveTo(704, 180); ctx.lineTo(724, 200);
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Heavy grey runic stone pillars
    [128, 512, 896, 1280].forEach(cx => {
       // Darker stone capital block directly on top of the column for an elegant finish
       ctx.fillStyle = "#263238"; // Dark slate grey stone cap
       ctx.fillRect(cx - 24, 180, 48, 12);
       ctx.strokeStyle = "#11171a"; ctx.lineWidth = 2;
       ctx.strokeRect(cx - 24, 180, 48, 12);

       ctx.fillStyle = "#455a64"; // Slate grey stone
       ctx.fillRect(cx - 20, 192, 40, 256);
       ctx.strokeStyle = "#1c2d37"; ctx.lineWidth = 2;
       ctx.strokeRect(cx - 20, 192, 40, 256);
       
       // Horizontal carved joints
       ctx.strokeStyle = "#263238"; ctx.lineWidth = 1.5;
       ctx.beginPath();
       for(let gy = 224; gy < 448; gy += 32) {
          ctx.moveTo(cx - 20, gy); ctx.lineTo(cx + 20, gy);
       }
       ctx.stroke();

       // Faint glowing runic carvings on the stone pillars
       ctx.strokeStyle = "rgba(0, 191, 255, 0.22)";
       ctx.lineWidth = 1.8;
       ctx.beginPath();
       ctx.moveTo(cx, 260); ctx.lineTo(cx, 290);
       ctx.moveTo(cx, 270); ctx.lineTo(cx + 8, 262);
       ctx.moveTo(cx, 340); ctx.lineTo(cx, 370);
       ctx.moveTo(cx, 350); ctx.lineTo(cx - 8, 358);
       ctx.stroke();
    });

    // Beautiful mead barrels resting on the floor next to the columns!
    [250, 1158].forEach(bx => {
       const by = 422; // resting on flat floor at y = 444
       ctx.save();
       // Barrel body stave shape
       ctx.fillStyle = "#8d6e63"; // Medium wood brown
       ctx.strokeStyle = "#4e342e"; ctx.lineWidth = 2.0;
       ctx.beginPath();
       ctx.ellipse(bx, by, 16, 22, 0, 0, Math.PI*2);
       ctx.fill(); ctx.stroke();
       
       // Vertical stave seams
       ctx.beginPath();
       ctx.moveTo(bx - 8, by - 20); ctx.quadraticCurveTo(bx - 12, by, bx - 8, by + 20);
       ctx.moveTo(bx + 8, by - 20); ctx.quadraticCurveTo(bx + 12, by, bx + 8, by + 20);
       ctx.moveTo(bx, by - 22); ctx.lineTo(bx, by + 22);
       ctx.stroke();

       // Iron hoops
       ctx.strokeStyle = "#37474f"; ctx.lineWidth = 2.5;
       ctx.beginPath();
       ctx.moveTo(bx - 15, by - 10); ctx.lineTo(bx + 15, by - 10);
       ctx.moveTo(bx - 16, by + 10); ctx.lineTo(bx + 16, by + 10);
       ctx.stroke();
       
       // Faucet plug tap
       ctx.fillStyle = "#4e342e";
       ctx.fillRect(bx - 3, by + 10, 6, 8);
       ctx.restore();
    });

    // Burning braziers
    [320, 1088].forEach(bx => {
       ctx.fillStyle = "#424242"; ctx.fillRect(bx - 12, 414, 24, 6);
       ctx.fillRect(bx - 4, 420, 8, 24);
       ctx.fillStyle = "#212121"; ctx.fillRect(bx - 16, 408, 32, 6);
       
       const flamePhase = time * 12 + bx;
       ctx.fillStyle = "rgba(255, 100, 0, 0.85)";
       ctx.beginPath(); ctx.moveTo(bx, 408);
       ctx.quadraticCurveTo(bx + 8 + Math.sin(flamePhase)*2, 408, bx, 388 + Math.sin(flamePhase)*4);
       ctx.quadraticCurveTo(bx - 8 + Math.cos(flamePhase)*2, 408, bx, 408); ctx.fill();
    });

  } else if (stageIndex === 1) { // Egyptian Vault
    ctx.fillStyle = "#d2b48c"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Large sand block markings
    ctx.strokeStyle = "rgba(139, 90, 43, 0.15)";
    ctx.lineWidth = 1.5;
    for(let y=40; y<448; y+=80) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
    }

    // Carved hieroglyphic Ankh symbol
    ctx.strokeStyle = "rgba(139, 90, 43, 0.4)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(704, 160, 16, 0, Math.PI*2);
    ctx.moveTo(704, 176); ctx.lineTo(704, 230);
    ctx.moveTo(688, 196); ctx.lineTo(720, 196);
    ctx.stroke();

    // Lotus-bud columns
    [128, 512, 896, 1280].forEach(cx => {
       ctx.fillStyle = "#f5f5dc"; ctx.fillRect(cx - 14, 192, 28, 256);
       ctx.strokeStyle = "rgba(139, 90, 43, 0.5)"; ctx.lineWidth = 1; ctx.strokeRect(cx - 14, 192, 28, 256);
       
       // Lotus bud capital
       ctx.fillStyle = "#2e7d32"; 
       ctx.beginPath(); ctx.arc(cx, 184, 16, 0, Math.PI, true); ctx.closePath(); ctx.fill();
       ctx.fillStyle = "#d84315"; ctx.fillRect(cx - 14, 188, 28, 4);
    });

    // Pharaoh Urns
    [320, 1088].forEach(jx => {
       ctx.fillStyle = "#d87047"; 
       ctx.beginPath(); ctx.arc(jx, 424, 16, 0, Math.PI*2); ctx.fill();
       ctx.fillRect(jx - 8, 402, 16, 8);
    });

  } else if (stageIndex === 2) { // Greek Temple
    ctx.fillStyle = "#f8f9fa"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Marble veins
    ctx.strokeStyle = "rgba(200, 205, 210, 0.25)"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(100, 0); ctx.lineTo(250, 448);
    ctx.moveTo(900, 0); ctx.lineTo(1100, 448);
    ctx.stroke();

    // Golden Meander Greek key border
    ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let gx = 0; gx < 1280; gx += 40) {
       ctx.moveTo(gx, 50); ctx.lineTo(gx+20, 50);
       ctx.lineTo(gx+20, 68); ctx.lineTo(gx+10, 68);
       ctx.lineTo(gx+10, 58); ctx.lineTo(gx+30, 58);
    }
    ctx.stroke();

    // Fluted Ionic columns
    [128, 512, 896, 1280].forEach(cx => {
       ctx.fillStyle = "#ffffff"; ctx.fillRect(cx - 16, 192, 32, 256);
       ctx.strokeStyle = "#d0d0d0"; ctx.lineWidth = 1; ctx.strokeRect(cx - 16, 192, 32, 256);
       
       ctx.fillStyle = "#e0e0e0";
       for(let f = cx - 10; f <= cx + 10; f += 6) {
          ctx.fillRect(f, 192, 1.5, 256);
       }
       // Capital scrolls
       ctx.fillStyle = "#f5f5f5"; ctx.fillRect(cx - 24, 180, 48, 12);
       ctx.strokeStyle = "#cccccc"; ctx.strokeRect(cx - 24, 180, 48, 12);
       ctx.beginPath(); ctx.arc(cx - 20, 186, 5, 0, Math.PI*2); ctx.arc(cx + 20, 186, 5, 0, Math.PI*2); ctx.fill();
    });

    // Tall Amphoras
    [320, 1088].forEach(ax => {
       ctx.fillStyle = "#e59866";
       ctx.fillRect(ax - 4, 400, 8, 8); // Neck
       ctx.beginPath(); ctx.ellipse(ax, 420, 12, 20, 0, 0, Math.PI*2); ctx.fill(); // Body
       ctx.beginPath(); ctx.arc(ax - 12, 412, 6, 0, Math.PI*2); ctx.arc(ax + 12, 412, 6, 0, Math.PI*2); ctx.stroke(); // Handles
    });

  } else if (stageIndex === 3) { // Chinese Pagoda
    // Dark elegant graphite slate wall backdrop instead of too loud red-red
    ctx.fillStyle = "#1e1b1a"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Symmetrical crimson-framed wall screen panels for rich texture
    ctx.strokeStyle = "rgba(139, 0, 0, 0.25)"; ctx.lineWidth = 3;
    for (let x = 80; x < 1280; x += 220) {
       ctx.strokeRect(x, 40, 180, 408);
    }

    // Circular Chinese "Moongate" Lattice Windows showing bamboo silhouettes!
    [320, 1088].forEach(wx => {
       // Glowing soft parchment circle
       ctx.fillStyle = "#fcf3cf"; 
       ctx.beginPath(); ctx.arc(wx, 190, 56, 0, Math.PI*2); ctx.fill();

       // Bamboo stalk and leaves silhouette
       ctx.strokeStyle = "#141414"; ctx.lineWidth = 3.5;
       ctx.beginPath();
       ctx.moveTo(wx - 20, 246); ctx.quadraticCurveTo(wx - 10, 180, wx - 15, 134);
       ctx.stroke();
       
       ctx.fillStyle = "#141414";
       ctx.beginPath(); ctx.arc(wx - 14, 172, 4, 0, Math.PI*2); ctx.fill();
       ctx.beginPath(); ctx.arc(wx - 8, 150, 4.5, 0, Math.PI*2); ctx.fill();

       // Golden & charcoal frames
       ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 3.5;
       ctx.beginPath(); ctx.arc(wx, 190, 56, 0, Math.PI*2); ctx.stroke();
       ctx.strokeStyle = "#141414"; ctx.lineWidth = 1.5;
       ctx.beginPath(); ctx.arc(wx, 190, 50, 0, Math.PI*2); ctx.stroke();
       
       // Lattice lines
       ctx.beginPath();
       ctx.moveTo(wx - 50, 190); ctx.lineTo(wx + 50, 190);
       ctx.moveTo(wx, 140); ctx.lineTo(wx, 240);
       ctx.stroke();
    });

    // Obsidian Black Lacquered Wood Columns with gold/crimson fittings
    [128, 512, 896, 1280].forEach(cx => {
       ctx.fillStyle = "#141414"; ctx.fillRect(cx - 16, 192, 32, 256);
       ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.5; ctx.strokeRect(cx - 16, 192, 32, 256);
       
       // Dark crimson wooden base blocks
       ctx.fillStyle = "#5c0000"; ctx.fillRect(cx - 20, 436, 40, 12);
       ctx.strokeRect(cx - 20, 436, 40, 12);

       // Dark crimson wooden capital blocks (caps)
       ctx.fillRect(cx - 22, 180, 44, 12);
       ctx.strokeRect(cx - 22, 180, 44, 12);
       
       // Golden imperial cloud lines drawn on columns
       ctx.strokeStyle = "rgba(212, 175, 55, 0.45)"; ctx.lineWidth = 1.2;
       ctx.beginPath();
       ctx.moveTo(cx - 8, 230); ctx.quadraticCurveTo(cx + 8, 260, cx - 8, 290);
       ctx.quadraticCurveTo(cx + 8, 320, cx - 8, 350);
       ctx.quadraticCurveTo(cx + 8, 380, cx - 8, 410); ctx.stroke();
    });

    // Elegant Bronze & Jade Incense Burner Urns
    [320, 1088].forEach(jx => {
       ctx.fillStyle = "#004d40"; ctx.fillRect(jx - 12, 420, 24, 24);
       ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.5; ctx.strokeRect(jx - 12, 420, 24, 24);
       
       ctx.fillStyle = "#26a69a"; ctx.shadowColor = "#4db6ac"; ctx.shadowBlur = 10;
       ctx.beginPath(); ctx.arc(jx, 412, 10, 0, Math.PI*2); ctx.fill();
       ctx.shadowBlur = 0;
    });

  } else if (stageIndex === 4) { // Mayan Vault
    // Dark mysterious mossy jade-slate sanctuary walls
    ctx.fillStyle = "#161d1a"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ancient stone brick wall lines (with slight green/mossy variation)
    ctx.strokeStyle = "rgba(46, 125, 50, 0.15)"; ctx.lineWidth = 2;
    for (let y = 40; y < 448; y += 64) {
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
       for (let x = (y % 128 === 0 ? 64 : 0); x < 1280; x += 128) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 64); ctx.stroke();
       }
    }

    // Overgrowing jungle vines hanging from the ceiling
    ctx.strokeStyle = "#2d5a27"; ctx.lineWidth = 2;
    ctx.fillStyle = "#387032";
    [80, 240, 420, 860, 1020, 1180].forEach(vx => {
       ctx.beginPath();
       ctx.moveTo(vx, 0);
       ctx.quadraticCurveTo(vx + 15, 60, vx - 5, 110);
       ctx.stroke();
       
       // Hanging ivy leaves along the vine
       [30, 60, 90].forEach(ly => {
          ctx.beginPath();
          ctx.ellipse(vx + Math.sin(ly)*6, ly, 7, 5, Math.PI/4, 0, Math.PI*2);
          ctx.fill();
       });
    });

    // Mayan Sun Stone Calendar Disc in the center (glowing with ancient emerald energy!)
    const cx = 704, cy = 230;
    ctx.save();
    ctx.shadowColor = "#00e676"; ctx.shadowBlur = 12;
    ctx.fillStyle = "#273830"; ctx.strokeStyle = "#1b5e20"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cx, cy, 96, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow for inner carvings
    
    // Inner calendar concentric circles
    ctx.beginPath();
    ctx.arc(cx, cy, 76, 0, Math.PI*2);
    ctx.arc(cx, cy, 48, 0, Math.PI*2);
    ctx.arc(cx, cy, 20, 0, Math.PI*2);
    ctx.stroke();
    
    // Mayan Sun god face in center
    ctx.fillStyle = "#00e676"; // glowing nose and eyes
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#00e676"; ctx.lineWidth = 1.5;
    ctx.strokeRect(cx - 12, cy - 6, 24, 12);
    
    // Ray carvings
    ctx.strokeStyle = "#385e38"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
       ctx.moveTo(cx + Math.cos(a)*48, cy + Math.sin(a)*48);
       ctx.lineTo(cx + Math.cos(a)*96, cy + Math.sin(a)*96);
    }
    ctx.stroke();
    ctx.restore();

    // Symmetrical Mossy Megalith Columns with climbing ivy
    [128, 512, 896, 1280].forEach(colX => {
       // Solid mossy green slate column shafts
       ctx.fillStyle = "#202c25"; ctx.fillRect(colX - 22, 192, 44, 256);
       ctx.strokeStyle = "#2e7d32"; ctx.lineWidth = 2; ctx.strokeRect(colX - 22, 192, 44, 256);
       
       // Symmetrical darker capital/base block caps
       ctx.fillStyle = "#151d18";
       ctx.fillRect(colX - 26, 180, 52, 12); ctx.strokeRect(colX - 26, 180, 52, 12);
       ctx.fillRect(colX - 26, 436, 52, 12); ctx.strokeRect(colX - 26, 436, 52, 12);

       // Climbing jungle ivy wrapped around the pillars!
       ctx.strokeStyle = "#387f3a"; ctx.lineWidth = 1.5;
       ctx.beginPath();
       ctx.moveTo(colX, 436);
       ctx.quadraticCurveTo(colX - 20, 360, colX + 15, 300);
       ctx.quadraticCurveTo(colX - 15, 240, colX, 192);
       ctx.stroke();
    });

    // Mythical Mayan Braziers burning with bright turquoise mystical fire!
    [320, 1088].forEach(bx => {
       // Ancient gold stone base stands
       ctx.fillStyle = "#795548"; ctx.fillRect(bx - 12, 414, 24, 6);
       ctx.fillRect(bx - 4, 420, 8, 24);
       ctx.fillStyle = "#5d4037"; ctx.fillRect(bx - 16, 408, 32, 6);
       ctx.strokeStyle = "#8d6e63"; ctx.lineWidth = 1.5; ctx.strokeRect(bx - 16, 408, 32, 6);
       
       // Flashing emerald/turquoise mystical flame
       const flamePhase = time * 12 + bx;
       ctx.fillStyle = "rgba(0, 230, 118, 0.85)"; ctx.shadowColor = "#00e676"; ctx.shadowBlur = 10;
       ctx.beginPath(); ctx.moveTo(bx, 408);
       ctx.quadraticCurveTo(bx + 8 + Math.sin(flamePhase)*2, 408, bx, 386 + Math.sin(flamePhase)*4);
       ctx.quadraticCurveTo(bx - 8 + Math.cos(flamePhase)*2, 408, bx, 408); ctx.fill();
       ctx.shadowBlur = 0; // Reset
    });

  } else if (stageIndex === 5) { // Japanese Dojo
    ctx.fillStyle = "#fef9e7"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Shoji screen panels
    ctx.strokeStyle = "#4a235a"; ctx.lineWidth = 2.5;
    ctx.beginPath();
    for(let sx = 0; sx < 1280; sx += 160) {
       ctx.moveTo(sx, 0); ctx.lineTo(sx, 448);
    }
    for(let sy = 0; sy < 448; sy += 80) {
       ctx.moveTo(0, sy); ctx.lineTo(1280, sy);
    }
    ctx.stroke();

    // Symmetrical polished black lacquer and cedar dojo columns
    [128, 512, 896, 1280].forEach(cx => {
       // Deep cedar wood column shaft
       ctx.fillStyle = "#2d1a12"; ctx.fillRect(cx - 18, 192, 36, 256);
       ctx.strokeStyle = "#1a0f0a"; ctx.lineWidth = 1.5; ctx.strokeRect(cx - 18, 192, 36, 256);
       
       // Flared pagoda-style black lacquer capital blocks
       ctx.fillStyle = "#141414";
       ctx.fillRect(cx - 24, 180, 48, 12);
       ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.2;
       ctx.strokeRect(cx - 24, 180, 48, 12);
       
       // Vermillion wood base blocks
       ctx.fillStyle = "#c0392b";
       ctx.fillRect(cx - 22, 436, 44, 12);
       ctx.strokeStyle = "#141414"; ctx.lineWidth = 1.5;
       ctx.strokeRect(cx - 22, 436, 44, 12);
       
       // Symmetrical decorative gold band collars
       ctx.fillStyle = "#d4af37";
       ctx.fillRect(cx - 19, 230, 38, 4);
       ctx.fillRect(cx - 19, 320, 38, 4);
       ctx.fillRect(cx - 19, 410, 38, 4);
    });

    // Hanging Calligraphy Scroll (flama) perfectly centered at x = 704
    ctx.fillStyle = "#ffffff"; ctx.fillRect(664, 70, 80, 150);
    ctx.strokeStyle = "#5d4037"; ctx.strokeRect(664, 70, 80, 150);
    ctx.strokeStyle = "#111111"; ctx.lineWidth = 3.5;
    ctx.beginPath(); ctx.moveTo(704, 94); ctx.lineTo(704, 196);
    ctx.moveTo(688, 124); ctx.quadraticCurveTo(704, 140, 720, 124); ctx.stroke();

    // Bonsai tree pots
    [320, 1088].forEach(bx => {
       ctx.fillStyle = "#2e4053"; ctx.fillRect(bx - 18, 424, 36, 20);
       ctx.strokeStyle = "#5d4037"; ctx.lineWidth = 3.5;
       ctx.beginPath(); ctx.moveTo(bx, 424); ctx.quadraticCurveTo(bx - 10, 400, bx + 10, 392); ctx.stroke();
       ctx.fillStyle = "#196f3d"; ctx.beginPath(); ctx.arc(bx + 10, 388, 14, 0, Math.PI*2); ctx.fill();
    });

  } else if (stageIndex === 6) { // Roman Basilica (Vend)
    // Deep Imperial Crimson-Porphyry marble backdrop
    ctx.fillStyle = "#2c080d"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Large ashlar masonry brick lines with faint golden mortar joints
    ctx.strokeStyle = "rgba(212, 175, 55, 0.08)"; ctx.lineWidth = 1.5;
    for (let y = 40; y < 448; y += 80) {
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
       for (let x = (y % 160 === 0 ? 80 : 0); x < 1280; x += 160) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 80); ctx.stroke();
       }
    }
    


    // Symmetrical White Carrara Marble Columns with Golden Corinthian capitals
    [128, 512, 896, 1280].forEach(cx => {
       // Pure white marble column shaft
       ctx.fillStyle = "#fafafa"; ctx.fillRect(cx - 16, 192, 32, 256);
       ctx.strokeStyle = "#dcdcdc"; ctx.lineWidth = 1.5; ctx.strokeRect(cx - 16, 192, 32, 256);
       
       // Fluted grooves along the marble shaft
       ctx.fillStyle = "#eaeaea";
       for (let f = cx - 10; f <= cx + 10; f += 5) {
          ctx.fillRect(f, 192, 1.2, 256);
       }
       
       // Detailed Golden Corinthian capital (carved acanthus leaf clusters)
       ctx.fillStyle = "#d4af37";
       ctx.beginPath();
       ctx.moveTo(cx - 22, 180);
       ctx.lineTo(cx + 22, 180);
       ctx.lineTo(cx + 16, 192);
       ctx.lineTo(cx - 16, 192);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#996515"; ctx.lineWidth = 1.0; ctx.stroke();
       
       // Additional top abacus slab
       ctx.fillStyle = "#f5f5f5";
       ctx.fillRect(cx - 24, 174, 48, 6);
       ctx.strokeRect(cx - 24, 174, 48, 6);
       
       // Symmetrical ornate gold stepped base
       ctx.fillStyle = "#b7950b";
       ctx.fillRect(cx - 20, 436, 40, 12);
       ctx.strokeRect(cx - 20, 436, 40, 12);
    });

    // Highly detailed Golden Laurel Wreaths (Corona Triumphalis) with glowing crimson centers
    [320, 1088].forEach(wx => {
       // Shadow glow
       ctx.save();
       ctx.shadowColor = "#ffb300"; ctx.shadowBlur = 8;
       ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 3.5;
       
       // Left laurel branch
       ctx.beginPath();
       ctx.arc(wx, 130, 18, Math.PI * 0.5, Math.PI * 1.6, false);
       ctx.stroke();
       
       // Right laurel branch
       ctx.beginPath();
       ctx.arc(wx, 130, 18, Math.PI * 0.5, Math.PI * 0.4, true);
       ctx.stroke();
       
       // Symmetrical leaf details along the wreaths
       ctx.fillStyle = "#d4af37";
       for (let a = Math.PI * 0.5; a < Math.PI * 2.5; a += Math.PI / 4) {
          ctx.beginPath();
          ctx.ellipse(wx + Math.cos(a)*18, 130 + Math.sin(a)*18, 4, 2, a + Math.PI/4, 0, Math.PI*2);
          ctx.fill();
       }
       
       // Royal red porphyry central circular emblem
       ctx.fillStyle = "#641e16"; ctx.shadowBlur = 0;
       ctx.beginPath(); ctx.arc(wx, 130, 10, 0, Math.PI*2); ctx.fill();
       
       // Glowing gold star/eagle emblem in center
       ctx.fillStyle = "#ffb300";
       ctx.beginPath(); ctx.arc(wx, 130, 3, 0, Math.PI*2); ctx.fill();
       
       ctx.restore();
    });

  } else if (stageIndex === 7) { // Persian Palace (DashX)
    // Deep royal Lapis Lazuli and navy stone backdrop
    ctx.fillStyle = "#0a1128"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ashlar masonry brick lines with gold mortar joints
    ctx.strokeStyle = "rgba(212, 175, 55, 0.05)"; ctx.lineWidth = 1.5;
    for (let y = 40; y < 448; y += 80) {
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
       for (let x = (y % 160 === 0 ? 80 : 0); x < 1280; x += 160) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 80); ctx.stroke();
       }
    }
    
    // Symmetrical decorative Golden Lotus Frieze bands running horizontally
    ctx.strokeStyle = "rgba(212, 175, 55, 0.3)"; ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(0, 60); ctx.lineTo(1280, 60);
    ctx.moveTo(0, 140); ctx.lineTo(1280, 140);
    ctx.stroke();
    
    // Draw repeating golden lotus bud shapes along the upper frieze lines
    ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
    for (let lx = 40; lx < 1280; lx += 80) {
       ctx.beginPath(); ctx.arc(lx, 60, 4, 0, Math.PI*2); ctx.fill();
       ctx.beginPath(); ctx.arc(lx, 140, 4, 0, Math.PI*2); ctx.fill();
    }

    // Magnificent, glowing Faravahar (Zoroastrian Sun Winged Disk) central bas-relief medallion centered at x = 704
    ctx.save();
    ctx.shadowColor = "#ffd700"; ctx.shadowBlur = 10;
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)"; ctx.lineWidth = 2.5;
    
    // Outer circular disk
    ctx.beginPath(); ctx.arc(704, 180, 24, 0, Math.PI*2); ctx.stroke();
    
    // Horizontal stylized feathered wings extending outwards
    ctx.beginPath();
    ctx.moveTo(704 - 24, 180); ctx.lineTo(704 - 120, 180);
    ctx.lineTo(704 - 100, 196); ctx.lineTo(704 - 24, 184);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(704 + 24, 180); ctx.lineTo(704 + 120, 180);
    ctx.lineTo(704 + 100, 196); ctx.lineTo(704 + 24, 184);
    ctx.stroke();
    
    // Center robed figure silhouette
    ctx.fillStyle = "rgba(212, 175, 55, 0.3)";
    ctx.beginPath();
    ctx.moveTo(704 - 8, 180); ctx.lineTo(704, 156); ctx.lineTo(704 + 8, 180);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    
    // Dual curved ring scrolls dropping downwards
    ctx.beginPath();
    ctx.arc(704 - 30, 204, 12, Math.PI*1.5, Math.PI*0.5, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(704 + 30, 204, 12, Math.PI*1.5, Math.PI*0.5, false);
    ctx.stroke();
    
    ctx.restore();

    // Symmetrical Slender Sandstone Columns with majestic Double-Bull capitals
    [128, 512, 896, 1280].forEach(cx => {
       // Slender sandstone fluted column shaft
       ctx.fillStyle = "#eae2cf"; ctx.fillRect(cx - 12, 192, 24, 256);
       ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 1.2; ctx.strokeRect(cx - 12, 192, 24, 256);
       
       // Fluted grooves
       ctx.fillStyle = "#dcd5c0";
       ctx.fillRect(cx - 6, 192, 1, 256);
       ctx.fillRect(cx, 192, 1, 256);
       ctx.fillRect(cx + 6, 192, 1, 256);
       
       // Golden spiral volute scroll bracket capital directly under the bulls
       ctx.fillStyle = "#d4af37";
       ctx.fillRect(cx - 16, 184, 32, 8);
       ctx.strokeStyle = "#533a0b"; ctx.lineWidth = 1.0;
       ctx.strokeRect(cx - 16, 184, 32, 8);
       
       // Volute spirals
       ctx.beginPath();
       ctx.arc(cx - 12, 188, 3, 0, Math.PI*2);
       ctx.arc(cx + 12, 188, 3, 0, Math.PI*2);
       ctx.fill();
       
       // Symmetrical Double-Bull capital (back-to-back bull busts)
       ctx.fillStyle = "#d4af37";
       ctx.beginPath();
       // Left bull bust looking left
       ctx.moveTo(cx, 164);
       ctx.lineTo(cx - 20, 164);
       ctx.quadraticCurveTo(cx - 24, 172, cx - 18, 184);
       ctx.lineTo(cx, 184);
       // Right bull bust looking right
       ctx.lineTo(cx + 18, 184);
       ctx.quadraticCurveTo(cx + 24, 172, cx + 20, 164);
       ctx.closePath(); ctx.fill(); ctx.stroke();
       
       // Dark bronze horns on both bulls
       ctx.strokeStyle = "#3a2512"; ctx.lineWidth = 2.0;
       ctx.beginPath();
       ctx.moveTo(cx - 16, 164); ctx.quadraticCurveTo(cx - 20, 154, cx - 14, 150);
       ctx.moveTo(cx + 16, 164); ctx.quadraticCurveTo(cx + 20, 154, cx + 14, 150);
       ctx.stroke();
       
       // Symmetrical bell-shaped sandstone column base
       ctx.fillStyle = "#eae2cf";
       ctx.beginPath();
       ctx.moveTo(cx - 12, 436);
       ctx.bezierCurveTo(cx - 20, 436, cx - 22, 444, cx - 22, 448);
       ctx.lineTo(cx + 22, 448);
       ctx.bezierCurveTo(cx + 22, 444, cx + 20, 436, cx + 12, 436);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 1.5; ctx.stroke();
    });

    // Flanking Royal Persian Fire Altars (Atashgah) burning with glowing golden-orange mythical fire
    [320, 1088].forEach(wx => {
       ctx.save();
       // Sandstone stepped pedestal base
       ctx.fillStyle = "#eae2cf"; ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 1.5;
       ctx.fillRect(wx - 16, 428, 32, 20);
       ctx.strokeRect(wx - 16, 428, 32, 20);
       ctx.fillRect(wx - 12, 412, 24, 16);
       ctx.strokeRect(wx - 12, 412, 24, 16);
       
       // Symmetrical golden fire bowl
       ctx.fillStyle = "#d4af37";
       ctx.beginPath();
       ctx.moveTo(wx - 16, 412);
       ctx.quadraticCurveTo(wx, 420, wx + 16, 412);
       ctx.lineTo(wx + 12, 404);
       ctx.lineTo(wx - 12, 404);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#533a0b"; ctx.lineWidth = 1.0; ctx.stroke();
       
       // Glowing flame effect
       const pulse = (Math.sin(time * 6) + 1) / 2;
       ctx.shadowColor = "#ff6f00"; ctx.shadowBlur = 12 + pulse * 6;
       ctx.fillStyle = "#ffab00";
       ctx.beginPath();
       ctx.moveTo(wx - 10, 404);
       ctx.quadraticCurveTo(wx - 14, 388 - pulse*6, wx, 376 - pulse*10);
       ctx.quadraticCurveTo(wx + 14, 388 - pulse*6, wx + 10, 404);
       ctx.closePath(); ctx.fill();
       
       ctx.restore();
    });

  } else if (stageIndex === 8) { // Indian Temple (Specie)
    // Deep terracotta/sunset crimson sandstone brick backdrop
    ctx.fillStyle = "#2e0b0b"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Symmetrical masonry joint lines with a faint gold mortar luster
    ctx.strokeStyle = "rgba(212, 175, 55, 0.05)"; ctx.lineWidth = 1.5;
    for (let y = 40; y < 448; y += 80) {
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
       for (let x = (y % 160 === 0 ? 80 : 0); x < 1280; x += 160) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 80); ctx.stroke();
       }
    }
    
    // Golden central Lotus Medallion relief on the back wall centered at x = 704
    ctx.save();
    ctx.shadowColor = "#ffd700"; ctx.shadowBlur = 8;
    ctx.fillStyle = "rgba(212, 175, 55, 0.25)";
    ctx.strokeStyle = "rgba(212, 175, 55, 0.4)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(704, 180, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    
    // Outer blooming lotus petals
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
       ctx.beginPath();
       ctx.ellipse(704 + Math.cos(a)*20, 180 + Math.sin(a)*20, 8, 4, a, 0, Math.PI*2);
       ctx.fill(); ctx.stroke();
    }
    ctx.restore();

    // Symmetrical Ornate Hindu Temple Columns (Stepped Red Sandstone)
    [128, 512, 896, 1280].forEach(cx => {
       // Rich red-sandstone slender column shaft
       ctx.fillStyle = "#b03a2e"; ctx.fillRect(cx - 12, 192, 24, 256);
       ctx.strokeStyle = "#78281f"; ctx.lineWidth = 1.2; ctx.strokeRect(cx - 12, 192, 24, 256);
       
       // Symmetrical stepped square and octagonal gold molding collars
       ctx.fillStyle = "#d4af37";
       ctx.fillRect(cx - 16, 260, 32, 6);
       ctx.fillRect(cx - 16, 350, 32, 6);
       ctx.strokeStyle = "#533a0b"; ctx.lineWidth = 1.0;
       ctx.strokeRect(cx - 16, 260, 32, 6);
       ctx.strokeRect(cx - 16, 350, 32, 6);
       
       // Flared brackets in sandstone under the collars
       ctx.fillStyle = "#78281f";
       ctx.fillRect(cx - 14, 266, 28, 4);
       ctx.fillRect(cx - 14, 356, 28, 4);
       
       // Tiered highly detailed Golden Lotus capital blocks at the top
       ctx.fillStyle = "#d4af37";
       ctx.beginPath();
       ctx.moveTo(cx - 20, 180);
       ctx.lineTo(cx + 20, 180);
       ctx.lineTo(cx + 12, 192);
       ctx.lineTo(cx - 12, 192);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#533a0b"; ctx.lineWidth = 1.0; ctx.stroke();
       
       // Additional top flared abacus slab
       ctx.fillStyle = "#b03a2e";
       ctx.fillRect(cx - 22, 174, 44, 6);
       ctx.strokeRect(cx - 22, 174, 44, 6);
       
       // Tiered, bell-shaped sandstone base decorated with gold trim
       ctx.fillStyle = "#b03a2e";
       ctx.beginPath();
       ctx.moveTo(cx - 12, 436);
       ctx.bezierCurveTo(cx - 20, 436, cx - 22, 444, cx - 22, 448);
       ctx.lineTo(cx + 22, 448);
       ctx.bezierCurveTo(cx + 22, 444, cx + 20, 436, cx + 12, 436);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#78281f"; ctx.lineWidth = 1.5; ctx.stroke();
       
       ctx.fillStyle = "#d4af37";
       ctx.fillRect(cx - 16, 442, 32, 3);
    });

    // Symmetrical Brass Diyas (oil lamps/torches) PRESERVED UNTOUCHED as requested!
    [320, 1088].forEach(dx => {
       ctx.fillStyle = "#b7950b"; ctx.fillRect(dx - 3, 394, 6, 50); // Stand
       ctx.beginPath(); ctx.arc(dx, 394, 10, 0, Math.PI); ctx.fill(); // Bowl
       
       const flamePhase = time * 10 + dx;
       ctx.fillStyle = "#ff5500";
       ctx.beginPath(); ctx.moveTo(dx, 390);
       ctx.quadraticCurveTo(dx + 3 + Math.sin(flamePhase), 390, dx, 380 + Math.sin(flamePhase)*2);
       ctx.quadraticCurveTo(dx - 3 + Math.cos(flamePhase), 390, dx, 390); ctx.fill();
    });

  } else if (stageIndex === 9) { // Sanctum / Port Markets
    // Deep obsidian black and royal gold backdrop
    ctx.fillStyle = "#0f0f14"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Polished obsidian ashlar masonry with thin gold joints
    ctx.strokeStyle = "rgba(255, 215, 0, 0.06)"; ctx.lineWidth = 1.5;
    for (let y = 40; y < 448; y += 80) {
       ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1280, y); ctx.stroke();
       for (let x = (y % 160 === 0 ? 80 : 0); x < 1280; x += 160) {
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 80); ctx.stroke();
       }
    }
    
    // Grand, monumental Golden Solar Gateway Arch (Porta Aurea) in the center background
    ctx.save();
    const pulse = (Math.sin(time * 4) + 1) / 2;
    ctx.shadowColor = "#ffd700"; ctx.shadowBlur = 15 + pulse * 10;
    ctx.strokeStyle = "rgba(255, 215, 0, 0.4)"; ctx.lineWidth = 6;
    ctx.fillStyle = "rgba(255, 215, 0, 0.03)";
    
    ctx.beginPath();
    ctx.arc(704, 240, 140, Math.PI, 0, false);
    ctx.fill(); ctx.stroke();
    
    // Inner glowing golden energy rings
    ctx.strokeStyle = "rgba(255, 215, 0, 0.2)"; ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.arc(704, 240, 110, Math.PI, 0, false);
    ctx.stroke();
    
    // Symmetrical glowing gold sunburst lines radiating from center
    ctx.strokeStyle = "rgba(255, 215, 0, 0.15)"; ctx.lineWidth = 1.5;
    for (let a = Math.PI; a <= Math.PI * 2; a += Math.PI / 12) {
       ctx.beginPath();
       ctx.moveTo(704 + Math.cos(a)*40, 240 + Math.sin(a)*40);
       ctx.lineTo(704 + Math.cos(a)*105, 240 + Math.sin(a)*105);
       ctx.stroke();
    }
    
    ctx.restore();

    // Symmetrical Colossal Obsidian & Golden Columns
    [128, 512, 896, 1280].forEach(cx => {
       // Massive polished black obsidian shaft
       ctx.fillStyle = "#16171d"; ctx.fillRect(cx - 18, 192, 36, 256);
       ctx.strokeStyle = "rgba(255, 215, 0, 0.3)"; ctx.lineWidth = 1.5; ctx.strokeRect(cx - 18, 192, 36, 256);
       
       // Symmetrical vertical gold fluting bands
       ctx.fillStyle = "#ffd700";
       ctx.fillRect(cx - 10, 192, 2, 256);
       ctx.fillRect(cx - 3, 192, 2, 256);
       ctx.fillRect(cx + 4, 192, 2, 256);
       
       // Colossal shining golden Corinthian capitals
       ctx.fillStyle = "#ffd700";
       ctx.beginPath();
       ctx.moveTo(cx - 24, 180);
       ctx.lineTo(cx + 24, 180);
       ctx.lineTo(cx + 18, 192);
       ctx.lineTo(cx - 18, 192);
       ctx.closePath(); ctx.fill();
       ctx.strokeStyle = "#b7950b"; ctx.lineWidth = 1.0; ctx.stroke();
       
       // Additional top flared slab
       ctx.fillStyle = "#ffffff";
       ctx.fillRect(cx - 26, 174, 52, 6);
       ctx.strokeRect(cx - 26, 174, 52, 6);
       
       // Stepped heavy golden column base
       ctx.fillStyle = "#b7950b";
       ctx.fillRect(cx - 22, 436, 44, 12);
       ctx.strokeRect(cx - 22, 436, 44, 12);
       ctx.fillStyle = "#ffd700";
       ctx.fillRect(cx - 18, 432, 36, 4);
    });

    // Symmetrical Sacred Golden Candelabras (torch-stands) - Scaled down for perfect elegant proportion
    [320, 1088].forEach(wx => {
       ctx.save();
       // Stepped golden base pedestal
       ctx.fillStyle = "#b7950b"; ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.2;
       ctx.fillRect(wx - 9, 434, 18, 14);
       ctx.strokeRect(wx - 9, 434, 18, 14);
       
       // Slim golden stand shaft
       ctx.fillStyle = "#ffd700";
       ctx.fillRect(wx - 2, 400, 4, 34);
       
       // Curved three-branched candelabra arms
       ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2.5;
       ctx.beginPath();
       // Left arm
       ctx.arc(wx - 9, 400, 9, 0, Math.PI * 0.5, false);
       // Right arm
       ctx.arc(wx + 9, 400, 9, Math.PI * 0.5, Math.PI, false);
       ctx.stroke();
       
       // Fire cups at the top of the 3 branches
       ctx.fillStyle = "#b7950b";
       ctx.fillRect(wx - 21, 388, 6, 4);
       ctx.fillRect(wx - 3, 388, 6, 4);
       ctx.fillRect(wx + 15, 388, 6, 4);
       
       // Symmetrical glowing, flickering fires on the 3 branches
       const fPulse = (Math.sin(time * 6 + wx) + 1) / 2;
       ctx.shadowColor = "#ffd700"; ctx.shadowBlur = 8 + fPulse * 4;
       ctx.fillStyle = "#ff6f00";
       
       [wx - 18, wx, wx + 18].forEach(fx => {
          ctx.beginPath();
          ctx.moveTo(fx - 3, 388);
          ctx.quadraticCurveTo(fx - 4, 380 - fPulse*3, fx, 372 - fPulse*6);
          ctx.quadraticCurveTo(fx + 4, 380 - fPulse*3, fx + 3, 388);
          ctx.closePath(); ctx.fill();
       });
       
       ctx.restore();
    });
  }

  ctx.restore();
}

function drawPalaceArches(ctx, time) {
  ctx.save();
  ctx.fillStyle = "#ebd59f"; // Golden sandstone wall color
  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 3;

  const columnsX = [128, 512, 896, 1280];
  const archBottomY = 192; // Springing height of the arches

  // Path for the carved wall with horseshoe/pointed double arches
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(1280, 0);
  ctx.lineTo(1280, archBottomY);
  
  // Rightmost half-arch
  ctx.lineTo(1280, archBottomY);
  ctx.quadraticCurveTo(1184 + 48, archBottomY - 70, 1184, archBottomY - 70);
  ctx.quadraticCurveTo(1184 - 48, archBottomY - 70, 1088, archBottomY);
  
  // Arch 5
  ctx.lineTo(1088, archBottomY);
  ctx.quadraticCurveTo(992 + 48, archBottomY - 70, 992, archBottomY - 70);
  ctx.quadraticCurveTo(992 - 48, archBottomY - 70, 896, archBottomY);
  
  // Column 3 at 896
  ctx.lineTo(896, archBottomY);
  
  // Arch 4
  ctx.quadraticCurveTo(800 + 48, archBottomY - 70, 800, archBottomY - 70);
  ctx.quadraticCurveTo(800 - 48, archBottomY - 70, 704, archBottomY);
  
  // Arch 3
  ctx.quadraticCurveTo(608 + 48, archBottomY - 70, 608, archBottomY - 70);
  ctx.quadraticCurveTo(608 - 48, archBottomY - 70, 512, archBottomY);
  
  // Column 2 at 512
  ctx.lineTo(512, archBottomY);
  
  // Arch 2
  ctx.quadraticCurveTo(416 + 48, archBottomY - 70, 416, archBottomY - 70);
  ctx.quadraticCurveTo(416 - 48, archBottomY - 70, 320, archBottomY);
  
  // Arch 1
  ctx.quadraticCurveTo(224 + 48, archBottomY - 70, 224, archBottomY - 70);
  ctx.quadraticCurveTo(224 - 48, archBottomY - 70, 128, archBottomY);
  
  // Column 1 at 128
  ctx.lineTo(128, archBottomY);
  
  // Leftmost half-arch
  ctx.quadraticCurveTo(64 + 32, archBottomY - 50, 64, archBottomY - 50);
  ctx.quadraticCurveTo(64 - 32, archBottomY - 50, 0, archBottomY);
  
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Draw the Moorish trellis grid pattern inside the sandstone wall
  ctx.save();
  ctx.clip(); 
  ctx.strokeStyle = "rgba(139, 90, 43, 0.25)";
  ctx.lineWidth = 1.5;
  const gridSpacing = 24;
  for (let i = -1000; i < 2000; i += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 300, 300);
    ctx.moveTo(i, 0);
    ctx.lineTo(i - 300, 300);
    ctx.stroke();
  }
  ctx.restore();

  // Draw elegant gold border trim along the rim of arches
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3.5;
  ctx.shadowColor = "#ffe082";
  ctx.shadowBlur = 4;
  ctx.beginPath();
  ctx.moveTo(0, archBottomY);
  ctx.quadraticCurveTo(64 - 32, archBottomY - 50, 64, archBottomY - 50);
  ctx.quadraticCurveTo(64 + 32, archBottomY - 50, 128, archBottomY);
  
  ctx.quadraticCurveTo(224 - 48, archBottomY - 70, 224, archBottomY - 70);
  ctx.quadraticCurveTo(224 + 48, archBottomY - 70, 320, archBottomY);
  ctx.quadraticCurveTo(416 - 48, archBottomY - 70, 416, archBottomY - 70);
  ctx.quadraticCurveTo(416 + 48, archBottomY - 70, 512, archBottomY);
  
  ctx.quadraticCurveTo(608 - 48, archBottomY - 70, 608, archBottomY - 70);
  ctx.quadraticCurveTo(608 + 48, archBottomY - 70, 704, archBottomY);
  ctx.quadraticCurveTo(800 - 48, archBottomY - 70, 800, archBottomY - 70);
  ctx.quadraticCurveTo(800 + 48, archBottomY - 70, 896, archBottomY);
  
  ctx.quadraticCurveTo(992 - 48, archBottomY - 70, 992, archBottomY - 70);
  ctx.quadraticCurveTo(992 + 48, archBottomY - 70, 1088, archBottomY);
  ctx.quadraticCurveTo(1184 - 48, archBottomY - 70, 1184, archBottomY - 70);
  ctx.quadraticCurveTo(1184 + 48, archBottomY - 70, 1280, archBottomY);
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Thin columns
  ctx.fillStyle = "#d5b47a";
  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 1.5;
  [320, 704, 1088].forEach(cx => {
     ctx.fillRect(cx - 6, archBottomY, 12, 448 - archBottomY);
     ctx.strokeRect(cx - 6, archBottomY, 12, 448 - archBottomY);
     ctx.fillRect(cx - 10, 436, 20, 12);
     ctx.strokeRect(cx - 10, 436, 20, 12);
     ctx.fillRect(cx - 10, archBottomY, 20, 8);
     ctx.strokeRect(cx - 10, archBottomY, 20, 8);
  });

  // Thick columns at 128, 512, 896
  columnsX.forEach(cx => {
     const colGrad = ctx.createLinearGradient(cx - 20, 0, cx + 20, 0);
     colGrad.addColorStop(0, "#8b5a2b");
     colGrad.addColorStop(0.3, "#ebd59f");
     colGrad.addColorStop(0.7, "#ffe8a1");
     colGrad.addColorStop(1, "#8b5a2b");
     
     ctx.fillStyle = colGrad;
     ctx.fillRect(cx - 20, archBottomY, 40, 448 - archBottomY);
     ctx.strokeRect(cx - 20, archBottomY, 40, 448 - archBottomY);
     
     ctx.fillStyle = "#ebd59f";
     ctx.fillRect(cx - 26, archBottomY - 12, 52, 12);
     ctx.strokeRect(cx - 26, archBottomY - 12, 52, 12);
     ctx.fillStyle = "#d4af37";
     ctx.fillRect(cx - 22, archBottomY, 44, 8);
     ctx.strokeRect(cx - 22, archBottomY, 44, 8);
     
     ctx.fillStyle = "#ebd59f";
     ctx.fillRect(cx - 26, 436, 52, 12);
     ctx.strokeRect(cx - 26, 436, 52, 12);
     
     // Mount an animated torch perfectly on the column capital
     drawTorch(ctx, cx - 32, 150, time);
  });

  ctx.restore();
}

function drawOrnateCarpet(ctx, x, y, width, height) {
  ctx.save();
  ctx.fillStyle = "#800000";
  ctx.fillRect(x, y, width, height);

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.strokeRect(x + 4, y + 4, width - 8, height - 8);

  ctx.fillStyle = "#0d3a5c"; 
  const step = 64;
  for (let offset = step; offset < width - step; offset += step) {
    ctx.beginPath();
    ctx.moveTo(x + offset, y + height/2);
    ctx.lineTo(x + offset + 20, y + 6);
    ctx.lineTo(x + offset + 40, y + height/2);
    ctx.lineTo(x + offset + 20, y + height - 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i < height; i += 4) {
    ctx.moveTo(x, y + i); ctx.lineTo(x - 6, y + i);
    ctx.moveTo(x + width, y + i); ctx.lineTo(x + width + 6, y + i);
  }
  ctx.stroke();
  ctx.restore();
}

function drawRoyalBed(ctx, px, py) {
  ctx.save();
  ctx.strokeStyle = "#1a0f00";
  ctx.lineWidth = 2;

  ctx.fillStyle = "#8b5a2b"; 
  ctx.fillRect(px + 10, py + 38, 12, 10);
  ctx.fillRect(px + 150, py + 38, 12, 10);
  ctx.strokeRect(px + 10, py + 38, 12, 10);
  ctx.strokeRect(px + 150, py + 38, 12, 10);

  ctx.fillRect(px + 6, py + 32, 160, 8);
  ctx.strokeRect(px + 6, py + 32, 160, 8);

  ctx.fillStyle = "#0f5a6a";
  roundRect(ctx, px + 8, py + 16, 156, 16, 4);
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = "#5c2a75";
  ctx.beginPath();
  ctx.moveTo(px + 60, py + 16);
  ctx.lineTo(px + 154, py + 16);
  ctx.quadraticCurveTo(px + 154, py + 40, px + 144, py + 44);
  ctx.lineTo(px + 90, py + 44);
  ctx.quadraticCurveTo(px + 70, py + 30, px + 60, py + 16);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  ctx.fillStyle = "#d35400"; 
  ctx.save();
  ctx.translate(px + 24, py + 14);
  ctx.rotate(-0.25);
  ctx.beginPath();
  ctx.ellipse(0, 0, 16, 10, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();
  ctx.restore();

  ctx.fillStyle = "#c0392b"; 
  ctx.save();
  ctx.translate(px + 42, py + 18);
  ctx.rotate(0.15);
  ctx.beginPath();
  ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI*2);
  ctx.fill(); ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function drawHourglass(ctx, px, py, time) {
  ctx.save();
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 2.5;
  ctx.lineCap = "round";

  ctx.fillStyle = "#8b5a2b";
  ctx.fillRect(px + 16, py + 12, 32, 6);
  ctx.strokeRect(px + 16, py + 12, 32, 6);
  ctx.fillRect(px + 16, py + 52, 32, 6);
  ctx.strokeRect(px + 16, py + 52, 32, 6);

  ctx.beginPath();
  ctx.moveTo(px + 18, py + 18); ctx.lineTo(px + 18, py + 52);
  ctx.moveTo(px + 46, py + 18); ctx.lineTo(px + 46, py + 52);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(px + 32, py + 26, 10, -Math.PI, 0);
  ctx.quadraticCurveTo(px + 32, py + 35, px + 32, py + 35);
  ctx.quadraticCurveTo(px + 32, py + 35, px + 22, py + 26);
  ctx.fill(); ctx.stroke();

  ctx.beginPath();
  ctx.arc(px + 32, py + 44, 10, 0, Math.PI);
  ctx.quadraticCurveTo(px + 32, py + 35, px + 32, py + 35);
  ctx.quadraticCurveTo(px + 32, py + 35, px + 42, py + 44);
  ctx.fill(); ctx.stroke();

  const sandPulse = 0.6 + Math.sin(time * 3) * 0.4;
  ctx.fillStyle = `rgba(255, 120, 180, ${sandPulse})`; 

  ctx.beginPath();
  ctx.moveTo(px + 24, py + 28);
  ctx.quadraticCurveTo(px + 32, py + 32, px + 40, py + 28);
  ctx.quadraticCurveTo(px + 32, py + 35, px + 32, py + 35);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 120, 180, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(px + 32, py + 33);
  ctx.lineTo(px + 32, py + 49);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(px + 23, py + 46);
  ctx.quadraticCurveTo(px + 32, py + 40, px + 41, py + 46);
  ctx.lineTo(px + 41, py + 52);
  ctx.lineTo(px + 23, py + 52);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawCrystal(px, py, scale) {
  if (crystalReady) {
    ctx.drawImage(crystalImage, px, py, 64*scale, 64*scale);
  } else {
    ctx.fillStyle = "#c0809b"; ctx.beginPath();
    ctx.moveTo(px+32*scale, py); ctx.lineTo(px+64*scale, py+32*scale); ctx.lineTo(px+32*scale, py+64*scale); ctx.lineTo(px, py+32*scale); ctx.fill();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  if (inInterior) {
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
      
      // Draw Moorish arches and gold columns
      drawPalaceArches(ctx, time);
    } else {
      // Draw custom thematic ancient Sanctum backgrounds
      drawThematicSanctum(ctx, currentStage, time);
    }
  } else {
    drawThematicPlatformBackdrop(ctx, currentStage, time);
  }

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  // Draw all thematic background pillars first (so they are yekpare and stay in the far background behind all blocks/portals)
  if (currentStage !== 10 && !inInterior) {
    for (let x = 2; x < mapWidth; x += 6) {
      const bounds = getColumnVerticalBounds(x);
      const px = x * TILE_SIZE;
      drawThematicPillar(ctx, px + 32, bounds.topY, bounds.bottomY, currentStage, time);
    }
  }

  for (let y = 0; y < mapHeight; y++) {
    for (let x = 0; x < mapWidth; x++) {
      const tile = map[y][x];
      let px = x * TILE_SIZE;
      if (inInterior && (tile === 7 || tile === 4)) {
        px = 672;
      }
      const py = y * TILE_SIZE;

      if (tile === 1 || tile === 8) {
        let offset = 0; const isBlock = tile === 8;
        if (isBlock) {
          const act = activeBlocks.find(b => b.tx === x && b.ty === y);
          if (act) offset = Math.sin(act.time) * -15;
        }

        const oy = py + offset;

        if (isBlock) {
          // --- BRONZE-GOLD POP-STYLE QUESTION BLOCK ---
          ctx.fillStyle = "#8a642e"; // Base warm bronze
          ctx.fillRect(px, oy, TILE_SIZE, TILE_SIZE);

          // Horizontal brick seam
          ctx.strokeStyle = "#2b1c08";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(px, oy + 32); ctx.lineTo(px + TILE_SIZE, oy + 32);
          
          // Vertical joints (staggered)
          ctx.moveTo(px + 32, oy); ctx.lineTo(px + 32, oy + 32);
          ctx.moveTo(px + 16, oy + 32); ctx.lineTo(px + 16, oy + 64);
          ctx.moveTo(px + 48, oy + 32); ctx.lineTo(px + 48, oy + 64);
          ctx.stroke();

          // Gold Highlight Lines on individual bricks
          ctx.strokeStyle = "#e5b060";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px + 2, oy + 2, 28, 28);
          ctx.strokeRect(px + 34, oy + 2, 28, 28);
          ctx.strokeRect(px + 2, oy + 34, 12, 28);
          ctx.strokeRect(px + 18, oy + 34, 28, 28);
          ctx.strokeRect(px + 50, oy + 34, 12, 28);

          // Centered Glowing Runic "?" symbol (Runic vibe, perfectly middle-aligned)
          ctx.save();
          ctx.shadowColor = "#ffb000";
          ctx.shadowBlur = 12;
          ctx.fillStyle = "#ffe29c";
          ctx.font = "bold 30px 'Cinzel', Georgia, serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("?", px + 32, oy + 32);
          ctx.restore();
        } else {
          // --- CLASSIC DYNAMIC BRICK TILE (Stage-specific themes!) ---
          let brickBase = "#465366"; 
          let brickHighlight = "#7c8ca3"; 
          let brickMortar = "#1b232e";
          
          if (currentStage === 0) { // Brookwell - Deep Obsidian Basalt
            brickBase = "#1d232b"; brickHighlight = "#384352"; brickMortar = "#0b0e12";
          } else if (currentStage === 1) { // Avvio - Glowing Lime Sandstone
            brickBase = "#4b5c3d"; brickHighlight = "#769160"; brickMortar = "#1f2619";
          } else if (currentStage === 2) { // Via - Rust Iron/Bronze Rails
            brickBase = "#5c3d33"; brickHighlight = "#916252"; brickMortar = "#261914";
          } else if (currentStage === 3) { // Shift - Metallic Platinum
            brickBase = "#707a85"; brickHighlight = "#b0bac4"; brickMortar = "#32383e";
          } else if (currentStage === 4) { // Blend - Mossy Emerald Bricks
            brickBase = "#1f3b25"; brickHighlight = "#3a6941"; brickMortar = "#0d1c10";
          } else if (currentStage === 5) { // Promis - Deep Basalt & Runic Gold Mortar
            brickBase = "#18141d"; brickHighlight = "#d9b359"; brickMortar = "#09060b";
          } else if (currentStage === 6) { // Vend - Cyber Deep Blue Tiles
            brickBase = "#1c2e42"; brickHighlight = "#3a5b80"; brickMortar = "#0b1520";
          } else if (currentStage === 7) { // DashX - Plasma Dark Violet
            brickBase = "#29183d"; brickHighlight = "#5b3a80"; brickMortar = "#10091c";
          } else if (currentStage === 8) { // Specie - Jade Stone
            brickBase = "#1c3d2f"; brickHighlight = "#3a8063"; brickMortar = "#0b1c15";
          } else if (currentStage === 9) { // Port Markets - Warm Terracotta Clay
            brickBase = "#523326"; brickHighlight = "#8f5e4b"; brickMortar = "#241610";
          } else { // Stage 10 - Seismic (Majestic Palace Black & Gold)
            brickBase = "#110b1a"; brickHighlight = "#d4af37"; brickMortar = "#3b0764";
          }

          ctx.fillStyle = brickBase;
          ctx.fillRect(px, oy, TILE_SIZE, TILE_SIZE);

          // Joint lines (dark mortar)
          ctx.strokeStyle = brickMortar;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(px, oy + 32); ctx.lineTo(px + TILE_SIZE, oy + 32);
          ctx.moveTo(px + 32, oy); ctx.lineTo(px + 32, oy + 32);
          ctx.moveTo(px + 16, oy + 32); ctx.lineTo(px + 16, oy + 64);
          ctx.moveTo(px + 48, oy + 32); ctx.lineTo(px + 48, oy + 64);
          ctx.stroke();

          // Highlight borders for each staggered brick
          ctx.strokeStyle = brickHighlight;
          ctx.lineWidth = 1.2;
          ctx.strokeRect(px + 2, oy + 2, 28, 28);
          ctx.strokeRect(px + 34, oy + 2, 28, 28);
          ctx.strokeRect(px + 2, oy + 34, 12, 28);
          ctx.strokeRect(px + 18, oy + 34, 28, 28);
          ctx.strokeRect(px + 50, oy + 34, 12, 28);

          // Subtle weathered texture/cracks on random bricks
          if ((x * 17 + y * 23) % 4 === 0) {
            ctx.strokeStyle = brickMortar;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(px + 10, oy + 10); ctx.lineTo(px + 18, oy + 18);
            ctx.stroke();
          }
        }
      } 
      else if (tile === 5) { // Background Pillar
        // Already pre-rendered in the unified background pass!
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
           
           // Draw Rising Gemstone (Seismic Crystal)!
            ctx.save();
            const gy = py + 32 - chestGemY;
            
            // 1. Pulsating glowing drop-shadow
            const pulse = (Math.sin(time * 5) + 1) / 2;
            ctx.shadowColor = `rgba(255, 120, 180, ${0.6 + pulse * 0.4})`;
            ctx.shadowBlur = 20;
            
            // 2. Beautiful radial outer glow
            const glow = ctx.createRadialGradient(px + 32, gy + 16, 2, px + 32, gy + 16, 36);
            glow.addColorStop(0, "rgba(255, 120, 180, 0.85)");
            glow.addColorStop(0.5, "rgba(255, 120, 180, 0.3)");
            glow.addColorStop(1, "rgba(255, 120, 180, 0)");
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(px + 32, gy + 16, 36, 0, Math.PI * 2);
            ctx.fill();

            // 3. Draw Seismic crystal image centered over chest
            ctx.drawImage(crystalImage, px + 12, gy - 4, 40, 40);
            ctx.restore();
         } else {
           // Chest lid closed
           ctx.fillStyle = "#b8860b";
           ctx.beginPath(); ctx.arc(px + 32, py + 32, 24, Math.PI, 0); ctx.fill();
           ctx.fillStyle = "#d4af37";
           ctx.beginPath(); ctx.arc(px + 32, py + 32, 20, Math.PI, 0); ctx.fill();
           ctx.fillStyle = "#8b4513"; ctx.fillRect(px+28, py+24, 8, 12); // lock
        }
      }
      else if (tile === 2) {
        if (y > 0 && map[y-1][x] === 2) drawPortal(px, py - TILE_SIZE);
      }
      else if (tile === 9) { // Antique Runic Stone Gate (2-tiles high exit doorway)
        if (y > 0 && map[y-1][x] === 9) {
          // This is the bottom tile, drawing is already fully handled when rendering the top tile
        } else {
          ctx.save();
          px -= 12; // Shift all doors 12px to the left to prevent right-edge screen overflow
          const style = currentStage; // Use actual stage directly
          
          if (style === 0) {
            // Style 0: Ancient Norse Runic Wood Door (Door 1)
            ctx.fillStyle = "#1e1b18"; // Heavy dark volcanic wood
            ctx.strokeStyle = "#0d0c0b"; ctx.lineWidth = 2.5;
            ctx.fillRect(px - 6, py, TILE_SIZE + 12, 16);
            ctx.strokeRect(px - 6, py, TILE_SIZE + 12, 16);
            
            // Side wooden posts
            ctx.fillRect(px - 4, py + 16, 10, TILE_SIZE * 2 - 16);
            ctx.strokeRect(px - 4, py + 16, 10, TILE_SIZE * 2 - 16);
            ctx.fillRect(px + TILE_SIZE - 6, py + 16, 10, TILE_SIZE * 2 - 16);
            ctx.strokeRect(px + TILE_SIZE - 6, py + 16, 10, TILE_SIZE * 2 - 16);
            
            // Norse Dark Wood Planks
            ctx.fillStyle = "#3a3028"; // Volcanic ash brown
            ctx.fillRect(px + 6, py + 16, TILE_SIZE - 12, TILE_SIZE * 2 - 20);
            ctx.strokeRect(px + 6, py + 16, TILE_SIZE - 12, TILE_SIZE * 2 - 20);
            
            // Vertical planks
            ctx.strokeStyle = "#1d1712"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px + 18, py + 16); ctx.lineTo(px + 18, py + TILE_SIZE * 2 - 4);
            ctx.moveTo(px + 32, py + 16); ctx.lineTo(px + 32, py + TILE_SIZE * 2 - 4);
            ctx.moveTo(px + 46, py + 16); ctx.lineTo(px + 46, py + TILE_SIZE * 2 - 4);
            ctx.stroke();

            // Glowing Blue Runic carvings on the door! (Symmetric, centered Ingwaz-style double-diamond rune)
            ctx.strokeStyle = "rgba(0, 191, 255, 0.75)";
            ctx.shadowColor = "#00bfff"; ctx.shadowBlur = 10;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            // Center vertical line
            ctx.moveTo(px + 32, py + 40); ctx.lineTo(px + 32, py + 104);
            // Top Diamond
            ctx.moveTo(px + 32, py + 48);
            ctx.lineTo(px + 44, py + 64);
            ctx.lineTo(px + 32, py + 80);
            ctx.lineTo(px + 20, py + 64);
            ctx.closePath();
            // Bottom Diamond
            ctx.moveTo(px + 32, py + 80);
            ctx.lineTo(px + 44, py + 92);
            ctx.lineTo(px + 32, py + 104);
            ctx.lineTo(px + 20, py + 92);
            ctx.closePath();
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset blur
            
            // Iron bands
            ctx.fillStyle = "#2b2b2b";
            ctx.fillRect(px + 8, py + 32, TILE_SIZE - 16, 8);
            ctx.fillRect(px + 8, py + TILE_SIZE * 2 - 24, TILE_SIZE - 16, 8);
            
            // Stone base step
            ctx.fillStyle = "#343a40";
            ctx.fillRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);
            ctx.strokeRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);
            
          } else if (style === 1) {
            // Style 1: Egyptian Golden Sandstone Pylon Door
            ctx.fillStyle = "#b8955f"; // Dark Egyptian sandstone
            ctx.strokeStyle = "#5a3d1b"; ctx.lineWidth = 2.5;
            
            // Heavy Egyptian Cavetto Cornice lintel (flared top!)
            ctx.beginPath();
            ctx.moveTo(px - 12, py);
            ctx.lineTo(px + TILE_SIZE + 12, py);
            ctx.lineTo(px + TILE_SIZE + 4, py + 20);
            ctx.lineTo(px - 4, py + 20);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Decorative blue and orange vertical stripe pattern on lintel
            ctx.fillStyle = "#2979ff"; ctx.fillRect(px + 8, py + 4, 8, 12);
            ctx.fillStyle = "#ff6d00"; ctx.fillRect(px + 20, py + 4, 8, 12);
            ctx.fillStyle = "#2979ff"; ctx.fillRect(px + 36, py + 4, 8, 12);
            ctx.fillStyle = "#ff6d00"; ctx.fillRect(px + 48, py + 4, 8, 12);

            // Side sandstone pillars (tapering inwards like pylons!)
            ctx.fillStyle = "#d2b48c";
            ctx.beginPath();
            ctx.moveTo(px - 4, py + 20);
            ctx.lineTo(px - 10, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + 4, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + 4, py + 20);
            ctx.closePath();
            ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE - 4, py + 20);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + TILE_SIZE + 10, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + TILE_SIZE + 4, py + 20);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Golden wood gate planks
            ctx.fillStyle = "#d4af37";
            ctx.fillRect(px + 4, py + 20, TILE_SIZE - 8, TILE_SIZE * 2 - 24);
            ctx.strokeRect(px + 4, py + 20, TILE_SIZE - 8, TILE_SIZE * 2 - 24);
            
            // Vertical seams
            ctx.strokeStyle = "#8b7320"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 20); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE * 2 - 4);
            ctx.stroke();

            // Eye of Horus carving outline on door
            ctx.strokeStyle = "#5a3d1b"; ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE - 12, 10, 0, Math.PI*2);
            ctx.moveTo(px + TILE_SIZE/2, py + TILE_SIZE - 2); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE + 20);
            ctx.moveTo(px + TILE_SIZE/2 - 16, py + TILE_SIZE + 6); ctx.lineTo(px + TILE_SIZE/2 + 16, py + TILE_SIZE + 6);
            ctx.stroke();
            
            // Sandstone step
            ctx.fillStyle = "#b8955f";
            ctx.fillRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            ctx.strokeRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            
          } else if (style === 2) {
            // Style 2: Greek Classical Temple Door
            ctx.fillStyle = "#ffffff"; // Pure white marble frame
            ctx.strokeStyle = "#c0c0c0"; ctx.lineWidth = 2.5;
            
            // Classical Greek Pediment/Lintel header (triangular roof top)
            ctx.beginPath();
            ctx.moveTo(px - 14, py + 16);
            ctx.lineTo(px + TILE_SIZE/2, py);
            ctx.lineTo(px + TILE_SIZE + 14, py + 16);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Lintel beam under the pediment with gold meander details
            ctx.fillRect(px - 8, py + 16, TILE_SIZE + 16, 8);
            ctx.strokeRect(px - 8, py + 16, TILE_SIZE + 16, 8);
            ctx.fillStyle = "#d4af37"; ctx.fillRect(px - 4, py + 18, TILE_SIZE + 8, 4); // Golden stripe
            
            // Side white marble columns flanking the door
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(px - 4, py + 24, 10, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px - 4, py + 24, 10, TILE_SIZE * 2 - 28);
            ctx.fillRect(px + TILE_SIZE - 6, py + 24, 10, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px + TILE_SIZE - 6, py + 24, 10, TILE_SIZE * 2 - 28);
            
            // Golden Bronze Double Door panels
            ctx.fillStyle = "#b8860b"; // Golden bronze base
            ctx.fillRect(px + 6, py + 24, TILE_SIZE - 12, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px + 6, py + 24, TILE_SIZE - 12, TILE_SIZE * 2 - 28);
            
            // Symmetrical rectangular bronze panel divisions
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 10, py + 32, (TILE_SIZE - 20)/2 - 2, 40);
            ctx.strokeRect(px + TILE_SIZE/2 + 2, py + 32, (TILE_SIZE - 20)/2 - 2, 40);
            ctx.strokeRect(px + 10, py + 80, (TILE_SIZE - 20)/2 - 2, 40);
            ctx.strokeRect(px + TILE_SIZE/2 + 2, py + 80, (TILE_SIZE - 20)/2 - 2, 40);
            
            // Central vertical door seam line
            ctx.strokeStyle = "#5d4037"; ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 24); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE*2 - 4);
            ctx.stroke();

            // Symmetrical golden rosette studs inside panels
            ctx.fillStyle = "#d4af37";
            [36, 84].forEach(ry => {
               ctx.beginPath();
               ctx.arc(px + 20, py + ry, 3, 0, Math.PI*2);
               ctx.arc(px + TILE_SIZE - 20, py + ry, 3, 0, Math.PI*2);
               ctx.fill();
            });

            // Golden ring handles
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 8, py + TILE_SIZE, 6, 0, Math.PI*2);
            ctx.arc(px + TILE_SIZE/2 + 8, py + TILE_SIZE, 6, 0, Math.PI*2);
            ctx.stroke();
            
            // White marble step
            ctx.fillStyle = "#f5f5f5";
            ctx.fillRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            ctx.strokeRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            
          } else if (style === 3) {
            // Style 3: Chinese Imperial Pagoda Door
            ctx.fillStyle = "#141414"; // Obsidian black lacquer frame
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
            
            // Pagoda flared lintel/roof top
            ctx.beginPath();
            ctx.moveTo(px - 14, py + 8);
            ctx.quadraticCurveTo(px + TILE_SIZE/2, py - 6, px + TILE_SIZE + 14, py + 8);
            ctx.lineTo(px + TILE_SIZE + 8, py + 20);
            ctx.quadraticCurveTo(px + TILE_SIZE/2, py + 12, px - 8, py + 20);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Side black lacquer pillars
            ctx.fillRect(px - 4, py + 20, 10, TILE_SIZE * 2 - 24);
            ctx.strokeRect(px - 4, py + 20, 10, TILE_SIZE * 2 - 24);
            ctx.fillRect(px + TILE_SIZE - 6, py + 20, 10, TILE_SIZE * 2 - 24);
            ctx.strokeRect(px + TILE_SIZE - 6, py + 20, 10, TILE_SIZE * 2 - 24);
            
            // Crimson Lacquer wood gate planks
            ctx.fillStyle = "#8b0000"; // Imperial dark crimson lacquer
            ctx.fillRect(px + 6, py + 20, TILE_SIZE - 12, TILE_SIZE * 2 - 24);
            ctx.strokeRect(px + 6, py + 20, TILE_SIZE - 12, TILE_SIZE * 2 - 24);
            
            // Golden Chinese Lattice lines overlay on the crimson door panels!
            ctx.strokeStyle = "rgba(212, 175, 55, 0.5)"; ctx.lineWidth = 2;
            ctx.beginPath();
            // Vertical seam
            ctx.moveTo(px + TILE_SIZE/2, py + 20); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE*2 - 4);
            // Symmetrical diagonals for lattices
            ctx.moveTo(px + 6, py + 40); ctx.lineTo(px + TILE_SIZE - 6, py + 100);
            ctx.moveTo(px + TILE_SIZE - 6, py + 40); ctx.lineTo(px + 6, py + 100);
            ctx.moveTo(px + 6, py + TILE_SIZE*2 - 80); ctx.lineTo(px + TILE_SIZE - 6, py + TILE_SIZE*2 - 20);
            ctx.moveTo(px + TILE_SIZE - 6, py + TILE_SIZE*2 - 80); ctx.lineTo(px + 6, py + TILE_SIZE*2 - 20);
            ctx.stroke();

            // Decorative heavy golden brass dragon medallion knocker centered!
            ctx.fillStyle = "#d4af37";
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE, 12, 0, Math.PI*2);
            ctx.fill();
            ctx.strokeStyle = "#8b7320"; ctx.lineWidth = 2;
            ctx.stroke();
            
            // Ring pull
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE + 12, 8, 0, Math.PI*2);
            ctx.stroke();
            
            // Dark stone step
            ctx.fillStyle = "#2d3436";
            ctx.fillRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);
            ctx.strokeRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);
            
          } else if (style === 4) {
            // Style 4: Ancient Mayan Jade Monolith Door
            ctx.fillStyle = "#202c25"; // Dark mossy slate stone frame
            ctx.strokeStyle = "#2e7d32"; ctx.lineWidth = 2.5;
            
            // Heavy squared stone lintel header
            ctx.fillRect(px - 8, py + 12, TILE_SIZE + 16, 12);
            ctx.strokeRect(px - 8, py + 12, TILE_SIZE + 16, 12);
            
            // Side massive stone pillars
            ctx.fillRect(px - 6, py + 24, 12, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px - 6, py + 24, 12, TILE_SIZE * 2 - 28);
            ctx.fillRect(px + TILE_SIZE - 6, py + 24, 12, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px + TILE_SIZE - 6, py + 24, 12, TILE_SIZE * 2 - 28);
            
            // Monolithic Jade Stone slab gate panels
            ctx.fillStyle = "#004d40"; // Deep jade base
            ctx.fillRect(px + 6, py + 24, TILE_SIZE - 12, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px + 6, py + 24, TILE_SIZE - 12, TILE_SIZE * 2 - 28);

            // Glowing emerald green carved Mayan sun scroll engravings!
            ctx.strokeStyle = "rgba(0, 230, 118, 0.55)"; ctx.lineWidth = 2.2;
            ctx.beginPath();
            // Vertical split seam
            ctx.moveTo(px + TILE_SIZE/2, py + 24); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE*2 - 4);
            
            // Left spiral sun carvings
            ctx.moveTo(px + 14, py + 40);
            ctx.quadraticCurveTo(px + 28, py + 48, px + 20, py + 64);
            ctx.quadraticCurveTo(px + 10, py + 72, px + 18, py + 88);
            
            // Right spiral sun carvings
            ctx.moveTo(px + TILE_SIZE - 14, py + 40);
            ctx.quadraticCurveTo(px + TILE_SIZE - 28, py + 48, px + TILE_SIZE - 20, py + 64);
            ctx.quadraticCurveTo(px + TILE_SIZE - 10, py + 72, px + TILE_SIZE - 18, py + 88);
            ctx.stroke();

            // Symmetrical rectangular block borders on the jade panel
            ctx.strokeStyle = "#00796b"; ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 10, py + 30, TILE_SIZE/2 - 14, TILE_SIZE*2 - 40);
            ctx.strokeRect(px + TILE_SIZE/2 + 4, py + 30, TILE_SIZE/2 - 14, TILE_SIZE*2 - 40);

            // Heavy circular stone ring handle in center
            ctx.strokeStyle = "#388e3c"; ctx.lineWidth = 3.0;
            ctx.fillStyle = "#1b5e20";
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE, 10, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            
            // Base mossy step
            ctx.fillStyle = "#273830";
            ctx.fillRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            ctx.strokeRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);

          } else if (style === 5) {
            // Style 5: Vermillion Torii Shoji Sliding Door (Japanese Dojo)
            ctx.fillStyle = "#c0392b"; // Majestic vermillion red Torii frame
            ctx.strokeStyle = "#141414"; ctx.lineWidth = 2.5;
            
            // Flared upward-curving Torii lintel roof header (very authentic!)
            ctx.beginPath();
            ctx.moveTo(px - 16, py + 12);
            ctx.quadraticCurveTo(px + TILE_SIZE/2, py, px + TILE_SIZE + 16, py + 12);
            ctx.lineTo(px + TILE_SIZE + 16, py + 22);
            ctx.quadraticCurveTo(px + TILE_SIZE/2, py + 10, px - 16, py + 22);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Side massive vermillion posts flanking the door
            ctx.fillRect(px - 6, py + 22, 12, TILE_SIZE * 2 - 26);
            ctx.strokeRect(px - 6, py + 22, 12, TILE_SIZE * 2 - 26);
            ctx.fillRect(px + TILE_SIZE - 6, py + 22, 12, TILE_SIZE * 2 - 26);
            ctx.strokeRect(px + TILE_SIZE - 6, py + 22, 12, TILE_SIZE * 2 - 26);
            
            // Translucent Paper Shoji Sliding screen panels
            ctx.fillStyle = "#fef9e7"; // Soft warm paper cream color
            ctx.fillRect(px + 6, py + 22, TILE_SIZE - 12, TILE_SIZE * 2 - 26);
            ctx.strokeRect(px + 6, py + 22, TILE_SIZE - 12, TILE_SIZE * 2 - 26);

            // Charcoal Black Cedar wood screen lattice grid pattern
            ctx.strokeStyle = "#2d1a12"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            // Vertical divisions
            ctx.moveTo(px + TILE_SIZE/2, py + 22); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE*2 - 4);
            ctx.moveTo(px + TILE_SIZE/2 - 16, py + 22); ctx.lineTo(px + TILE_SIZE/2 - 16, py + TILE_SIZE*2 - 4);
            ctx.moveTo(px + TILE_SIZE/2 + 16, py + 22); ctx.lineTo(px + TILE_SIZE/2 + 16, py + TILE_SIZE*2 - 4);
            
            // Horizontal lattice grids
            for (let ly = py + 38; ly < py + TILE_SIZE*2 - 10; ly += 24) {
               ctx.moveTo(px + 6, ly); ctx.lineTo(px + TILE_SIZE - 6, ly);
            }
            ctx.stroke();

            // Symmetrical polished black lacquer handle plates in center
            ctx.fillStyle = "#141414";
            ctx.fillRect(px + TILE_SIZE/2 - 5, py + TILE_SIZE - 16, 4, 32);
            ctx.fillRect(px + TILE_SIZE/2 + 1, py + TILE_SIZE - 16, 4, 32);
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.0;
            ctx.strokeRect(px + TILE_SIZE/2 - 5, py + TILE_SIZE - 16, 4, 32);
            ctx.strokeRect(px + TILE_SIZE/2 + 1, py + TILE_SIZE - 16, 4, 32);

            // Small gold handle ring pulls
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 3, py + TILE_SIZE, 3, 0, Math.PI*2);
            ctx.arc(px + TILE_SIZE/2 + 3, py + TILE_SIZE, 3, 0, Math.PI*2);
            ctx.stroke();
            
            // Charcoal black slate base step
            ctx.fillStyle = "#141414";
            ctx.fillRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            ctx.strokeRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);

          } else if (style === 6) {
            // Style 6: Imperial Pantheon Bronze Rectilinear Door (Roman Senate)
            // Grand white marble outer rectangular frame
            ctx.fillStyle = "#fafafa"; ctx.strokeStyle = "#dcdcdc"; ctx.lineWidth = 1.5;
            ctx.fillRect(px - 10, py + 12, TILE_SIZE + 20, TILE_SIZE * 2 - 16);
            ctx.strokeRect(px - 10, py + 12, TILE_SIZE + 20, TILE_SIZE * 2 - 16);
            
            // Classical triangular pediment at the top of the doorway
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(px - 16, py + 12);
            ctx.lineTo(px + TILE_SIZE/2, py - 10);
            ctx.lineTo(px + TILE_SIZE + 16, py + 12);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Gold SPQR imperial crest inside the pediment
            ctx.fillStyle = "#ffd700";
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + 4, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Elegant golden meander key pattern border trim on the door frame
            ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.5;
            ctx.strokeRect(px - 4, py + 18, TILE_SIZE + 8, TILE_SIZE * 2 - 22);

            // Double solid antique bronze doors
            ctx.fillStyle = "#8c6239"; // Heavy antique bronze color
            ctx.fillRect(px + 4, py + 22, TILE_SIZE - 8, TILE_SIZE * 2 - 26);
            ctx.strokeRect(px + 4, py + 22, TILE_SIZE - 8, TILE_SIZE * 2 - 26);
            
            // Symmetrical golden vertical door seam division
            ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 22); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE * 2 - 4);
            ctx.stroke();
            
            // Symmetrical detailed rectangular bronze panels with gold frames
            ctx.fillStyle = "#734d26"; // Darker bronze core
            [py + 30, py + 64, py + 98].forEach(ry => {
               ctx.fillRect(px + 8, ry, TILE_SIZE/2 - 12, 24);
               ctx.strokeRect(px + 8, ry, TILE_SIZE/2 - 12, 24);
               
               ctx.fillRect(px + TILE_SIZE/2 + 4, ry, TILE_SIZE/2 - 12, 24);
               ctx.strokeRect(px + TILE_SIZE/2 + 4, ry, TILE_SIZE/2 - 12, 24);
            });

            // Double polished gold knocker ring handles
            ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 6, py + TILE_SIZE + 10, 8, 0, Math.PI*2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 + 6, py + TILE_SIZE + 10, 8, 0, Math.PI*2);
            ctx.stroke();
            
            // Grand white marble base step
            ctx.fillStyle = "#fafafa";
            ctx.fillRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);
            ctx.strokeRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);

          } else if (style === 7) {
            // Style 7: Golden Apadana Lapis Lazuli Gate (Imperial Persian)
            // Grand sandstone outer rectangular frame
            ctx.fillStyle = "#eae2cf"; ctx.strokeStyle = "#8b7e66"; ctx.lineWidth = 2.0;
            ctx.fillRect(px - 10, py + 12, TILE_SIZE + 20, TILE_SIZE * 2 - 16);
            ctx.strokeRect(px - 10, py + 12, TILE_SIZE + 20, TILE_SIZE * 2 - 16);
            
            // Decorative golden lotus frieze header lintel on top
            ctx.fillStyle = "#d4af37";
            ctx.fillRect(px - 14, py + 12, TILE_SIZE + 28, 12);
            ctx.strokeRect(px - 14, py + 12, TILE_SIZE + 28, 12);
            
            // Fine golden lotus buds drawing on the lintel
            ctx.strokeStyle = "#533a0b"; ctx.lineWidth = 1.0;
            for (let lx = px - 8; lx <= px + TILE_SIZE + 8; lx += 16) {
               ctx.beginPath();
               ctx.arc(lx, py + 18, 4, 0, Math.PI * 2);
               ctx.stroke();
            }

            // Double solid Lapis Lazuli royal blue doors
            ctx.fillStyle = "#0c1a30"; // Deep lapis lazuli
            ctx.fillRect(px + 4, py + 24, TILE_SIZE - 8, TILE_SIZE * 2 - 28);
            ctx.strokeRect(px + 4, py + 24, TILE_SIZE - 8, TILE_SIZE * 2 - 28);
            
            // Symmetrical golden vertical dividing line
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.0;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 24); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE * 2 - 4);
            ctx.stroke();
            
            // Embossed golden rosettes and stars decoration on the door panels
            ctx.fillStyle = "#d4af37";
            [py + 36, py + 72, py + 108].forEach(ry => {
               // Left door studs
               ctx.beginPath(); ctx.arc(px + TILE_SIZE/4, ry, 3, 0, Math.PI * 2); ctx.fill();
               // Right door studs
               ctx.beginPath(); ctx.arc(px + TILE_SIZE * 0.75, ry, 3, 0, Math.PI * 2); ctx.fill();
            });
            
            // Massive twin gold lion ring pulls in the center
            ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 2.5;
            ctx.fillStyle = "#b7950b";
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 6, py + TILE_SIZE + 10, 8, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 + 6, py + TILE_SIZE + 10, 8, 0, Math.PI * 2);
            ctx.stroke();
            
            // Sandstone base step
            ctx.fillStyle = "#eae2cf";
            ctx.fillRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);
            ctx.strokeRect(px - 12, py + TILE_SIZE * 2 - 4, TILE_SIZE + 24, 6);

          } else if (style === 8) {
            // Style 8: Alchemist's Gilded Gate
            // Copper Arch
            ctx.fillStyle = "#ba4a00"; ctx.strokeStyle = "#5e2000"; ctx.lineWidth = 2.5;
            ctx.fillRect(px - 6, py + TILE_SIZE, 12, TILE_SIZE);
            ctx.fillRect(px + TILE_SIZE - 6, py + TILE_SIZE, 12, TILE_SIZE);
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE, TILE_SIZE/2 + 6, Math.PI, 0, false);
            ctx.lineTo(px + TILE_SIZE, py + TILE_SIZE*2);
            ctx.lineTo(px + TILE_SIZE - 6, py + TILE_SIZE*2);
            ctx.lineTo(px + TILE_SIZE - 6, py + TILE_SIZE);
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE, TILE_SIZE/2 - 6, 0, Math.PI, true);
            ctx.lineTo(px + 6, py + TILE_SIZE*2);
            ctx.lineTo(px - 6, py + TILE_SIZE*2);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            // Mahogany crimson planks
            ctx.fillStyle = "#78281f";
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE, TILE_SIZE/2 - 6, Math.PI, 0, false);
            ctx.lineTo(px + TILE_SIZE - 6, py + TILE_SIZE*2 - 4);
            ctx.lineTo(px + 6, py + TILE_SIZE*2 - 4);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            // Astronomical copper circles
            ctx.strokeStyle = "#e59866"; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE + 20, 16, 0, Math.PI*2);
            ctx.arc(px + TILE_SIZE/2, py + TILE_SIZE + 20, 8, 0, Math.PI*2);
            ctx.stroke();

            // Copper Gear ring handle
            ctx.strokeStyle = "#ba4a00"; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE - 20, py + TILE_SIZE + 32, 6, 0, Math.PI*2);
            ctx.stroke();

            // Step
            ctx.fillStyle = "#7b7d7d";
            ctx.fillRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);
            ctx.strokeRect(px - 10, py + TILE_SIZE * 2 - 4, TILE_SIZE + 20, 6);

          } else if (style === 9) {
            // Style 9: Golden Glowing Seismic Entrance Palace Door
            ctx.save();
            
            // Dynamic golden/orange fire glow
            const pulse = (Math.sin(time * 1.5) + 1) / 2; // Slower, calm, organic breathing-like frequency
            ctx.shadowColor = "#ffd700";
            ctx.shadowBlur = 5 + pulse * 6; // Reduced shadow blur (5 to 11 px) for a premium, non-obtrusive glow
            
            // Golden Pointed Arch Outer Frame
            ctx.fillStyle = "#ffd700"; ctx.strokeStyle = "#b45309"; ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(px - 8, py + TILE_SIZE * 2);
            ctx.lineTo(px - 8, py + TILE_SIZE - 4);
            ctx.lineTo(px + TILE_SIZE/2, py - 6); // Pointed tip
            ctx.lineTo(px + TILE_SIZE + 8, py + TILE_SIZE - 4);
            ctx.lineTo(px + TILE_SIZE + 8, py + TILE_SIZE * 2);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE * 2);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE);
            ctx.lineTo(px + TILE_SIZE/2, py + 8);
            ctx.lineTo(px + 4, py + TILE_SIZE);
            ctx.lineTo(px + 4, py + TILE_SIZE * 2);
            ctx.closePath();
            ctx.fill(); ctx.stroke();
            
            // Turn off frame shadow for inner elements to keep them crisp
            ctx.shadowBlur = 0;
            
            // Purple/Violet Double Doors
            ctx.fillStyle = "#581c87"; // Royal purple
            ctx.beginPath();
            ctx.moveTo(px + 4, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + 4, py + TILE_SIZE);
            ctx.lineTo(px + TILE_SIZE/2, py + 8);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE * 2 - 4);
            ctx.closePath(); ctx.fill(); 
            ctx.strokeStyle = "#3b0764"; ctx.lineWidth = 1.5; ctx.stroke();
            
            // Golden Center Seam
            ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 8); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE * 2 - 4);
            ctx.stroke();
            
            // Two Golden Door Knobs (handles)
            ctx.fillStyle = "#ffd700"; ctx.strokeStyle = "#9a3412"; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 7, py + TILE_SIZE + 16, 4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 + 7, py + TILE_SIZE + 16, 4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            
            // Golden Horizontal Threshold Step
            ctx.fillStyle = "#d97706";
            ctx.fillRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);
            ctx.strokeRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);
            
            ctx.restore();
          } else {
            // Style 10: Seismic Grand Royal Palace Door
            // Majestic Gold Frame
            ctx.fillStyle = "#ffb700"; ctx.strokeStyle = "#8a6300"; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(px - 6, py + TILE_SIZE * 2);
            ctx.lineTo(px - 6, py + TILE_SIZE);
            ctx.lineTo(px + TILE_SIZE/2, py); // Pointed majestic tip
            ctx.lineTo(px + TILE_SIZE + 6, py + TILE_SIZE);
            ctx.lineTo(px + TILE_SIZE + 6, py + TILE_SIZE * 2);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE * 2);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE + 4);
            ctx.lineTo(px + TILE_SIZE/2, py + 12);
            ctx.lineTo(px + 4, py + TILE_SIZE + 4);
            ctx.lineTo(px + 4, py + TILE_SIZE * 2);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            // Royal Purple Double Doors
            ctx.fillStyle = "#4c1d95";
            ctx.beginPath();
            ctx.moveTo(px + 4, py + TILE_SIZE * 2 - 4);
            ctx.lineTo(px + 4, py + TILE_SIZE + 4);
            ctx.lineTo(px + TILE_SIZE/2, py + 12);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE + 4);
            ctx.lineTo(px + TILE_SIZE - 4, py + TILE_SIZE * 2 - 4);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            
            // Cyber pink/blue neon glow in the center split
            ctx.shadowColor = "#e879f9"; ctx.shadowBlur = 10;
            ctx.strokeStyle = "#f0abfc"; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px + TILE_SIZE/2, py + 12); ctx.lineTo(px + TILE_SIZE/2, py + TILE_SIZE * 2 - 4);
            ctx.stroke();
            ctx.shadowBlur = 0; // reset
            
            // Royal Golden Knobs
            ctx.strokeStyle = "#ffb700"; ctx.fillStyle = "#8a6300"; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 - 8, py + TILE_SIZE + 24, 4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.arc(px + TILE_SIZE/2 + 8, py + TILE_SIZE + 24, 4, 0, Math.PI*2);
            ctx.fill(); ctx.stroke();
            
            // Grand Marble Step
            ctx.fillStyle = "#3b0764";
            ctx.fillRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);
            ctx.strokeRect(px - 14, py + TILE_SIZE * 2 - 4, TILE_SIZE + 28, 6);
          }
          ctx.restore();
        }
      }
      else if (tile === 7) { // Monument
        ctx.save();
        
        // Enlarged baseline measurements
        const topLx = px + 12;
        const topRx = px + 52;
        const botRx = px + 56;
        const botLx = px + 8;
        
        const topY = py + 4;
        const botY = py + 48;
        
        if (currentStage === 0) { // Brookwell - Monolithic Dwarven Basalt
          // Base
          ctx.fillStyle = "#161b22"; ctx.strokeStyle = "#0d1117"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          ctx.fillStyle = "#8c6239"; ctx.fillRect(px + 10, botY - 3, 44, 3); // Bronze trim
          
          // Slab
          ctx.fillStyle = "#2c3e50";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#1b232e"; ctx.lineWidth = 2; ctx.stroke();
          
          // Glowing cyan runic carving lines on left and right sides
          ctx.strokeStyle = "#00ffcc"; ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(topLx + 4, topY + 4); ctx.lineTo(botLx + 4, botY - 4);
          ctx.moveTo(topRx - 4, topY + 4); ctx.lineTo(botRx - 4, botY - 4);
          ctx.stroke();
          
        } else if (currentStage === 1) { // Avvio - Mossy Elven Forest Stone
          // Base
          ctx.fillStyle = "#1b2631"; ctx.strokeStyle = "#11161b"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          // Creeping moss spots on base
          ctx.fillStyle = "#2ecc71";
          ctx.beginPath(); ctx.arc(px + 12, botY + 8, 4, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(px + 48, botY + 6, 3, 0, Math.PI * 2); ctx.fill();
          
          // Slab
          ctx.fillStyle = "#273746";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#1c2833"; ctx.lineWidth = 2; ctx.stroke();
          
          // Climbing ivy curves
          ctx.strokeStyle = "#196f3d"; ctx.lineWidth = 2.0;
          ctx.beginPath();
          ctx.moveTo(botLx + 6, botY - 2);
          ctx.quadraticCurveTo(px + 20, py + 25, topLx + 6, topY + 6);
          ctx.moveTo(botRx - 6, botY - 2);
          ctx.quadraticCurveTo(px + 44, py + 25, topRx - 6, topY + 6);
          ctx.stroke();
          
        } else if (currentStage === 2) { // Via - Glistening Glacier Ice
          // Base
          ctx.fillStyle = "#2e86c1"; ctx.strokeStyle = "#1b4f72"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "rgba(174, 214, 241, 0.75)";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2; ctx.stroke();
          
        } else if (currentStage === 3) { // Shift - Steampunk Gilded Brass
          // Base
          ctx.fillStyle = "#2c1e18"; ctx.strokeStyle = "#1b120e"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#d35400";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#5e270f"; ctx.lineWidth = 2; ctx.stroke();
          
        } else if (currentStage === 4) { // Blend - Emerald Mayan Pillar
          // Base
          ctx.fillStyle = "#0e6251"; ctx.strokeStyle = "#083e33"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#0c1511"; // Polished dark jade-black stone for logo legibility
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.5; ctx.stroke();
          
        } else if (currentStage === 5) { // Promis - Gothic Obsidian Shrine
          // Base
          ctx.fillStyle = "#0f161d"; ctx.strokeStyle = "#070b0e"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#1a252f";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#000000"; ctx.lineWidth = 2; ctx.stroke();
          
          // Gothic pointed arch tracery in silver
          ctx.strokeStyle = "#bdc3c7"; ctx.lineWidth = 1.0;
          ctx.beginPath();
          ctx.moveTo(px + 18, botY);
          ctx.lineTo(px + 18, py + 18);
          ctx.quadraticCurveTo(px + 32, py + 8, px + 46, py + 18);
          ctx.lineTo(px + 46, botY);
          ctx.stroke();
          
        } else if (currentStage === 6) { // Vend - Warm Persian Altar
          // Base
          ctx.fillStyle = "#1abc9c"; ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.5;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#eae2cf";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#b5a88f"; ctx.lineWidth = 2; ctx.stroke();
          
          // Royal blue glazed tile details and gold borders
          ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.5;
          ctx.strokeRect(topLx + 3, topY + 3, (topRx - topLx) - 6, (botY - topY) - 6);
          
        } else if (currentStage === 7) { // Dashx - Cyber-Console
          // Base
          ctx.fillStyle = "#17202a"; ctx.strokeStyle = "#af7ac5"; ctx.lineWidth = 1.5;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#212f3d";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#af7ac5"; ctx.lineWidth = 1.5; ctx.stroke();
          
        } else if (currentStage === 8) { // Specie - Red Sandstone Mandir Pedestal
          // Base
          ctx.fillStyle = "#78281f"; ctx.strokeStyle = "#d4af37"; ctx.lineWidth = 1.5;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#120e0e"; // Deep volcanic black stone for logo legibility
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#78281f"; ctx.lineWidth = 2; ctx.stroke();
          
        } else if (currentStage === 9) { // Port Markets - Cosmic Star-Map Obelisk
          // Base
          ctx.fillStyle = "#b7950b"; ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 2;
          ctx.fillRect(px + 4, botY, 56, 16); ctx.strokeRect(px + 4, botY, 56, 16);
          
          // Slab
          ctx.fillStyle = "#0c0c10";
          ctx.beginPath(); ctx.moveTo(topLx, topY); ctx.lineTo(topRx, topY);
          ctx.lineTo(botRx, botY); ctx.lineTo(botLx, botY); ctx.closePath();
          ctx.fill(); ctx.strokeStyle = "#ffd700"; ctx.lineWidth = 1.5; ctx.stroke();
          
          // Speckled stars and golden constellation connections
          ctx.fillStyle = "#ffffff";
          [px + 18, px + 28, px + 44, px + 22, px + 38].forEach((sx, idx) => {
             ctx.fillRect(sx, py + 8 + idx * 8, 1.5, 1.5);
          });
          ctx.strokeStyle = "rgba(255, 215, 0, 0.35)"; ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(px + 18, py + 8); ctx.lineTo(px + 28, py + 16); ctx.lineTo(px + 44, py + 24);
          ctx.stroke();
        }
        
        ctx.restore();
        
        // Render dynamic high-fidelity brand logo using central draw function (untouched as requested!)
        const sparkColor = drawBrandLogo(ctx, px, py, currentStage, time);
        
        // Gentle glowing embers rising from the pedestal
        ctx.fillStyle = sparkColor;
        for (let j = 0; j < 3; j++) {
          const sparkX = px + 32 + Math.sin(time * 2 + j * 5) * 12;
          const sparkY = py + 20 - ((time * 30 + j * 15) % 40);
          ctx.globalAlpha = Math.max(0, 1.0 - ((py + 20 - sparkY) / 40));
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1.0;
      }
      else if (tile === 3) {
        drawTorch(ctx, px, py, time);
      }
    }
  }

  // Draw Items (Floating Logos)
  for (let i of items) {
    ctx.save();
    const floatY = i.y + Math.sin(time * 5 + i.x) * 10;
    if (i.life > 2.0) ctx.globalAlpha = 1.0 - (i.life - 2.0);
    drawCrystal(i.x, floatY, 0.6);
    const glow = ctx.createRadialGradient(i.x + 19, floatY + 19, 5, i.x + 19, floatY + 19, 50);
    glow.addColorStop(0, "rgba(255, 182, 193, 0.8)"); glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(i.x + 19, floatY + 19, 50, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  // Draw Projectiles
  for (let p of projectiles) {
     const glow = ctx.createRadialGradient(p.x + p.w/2, p.y + p.h/2, 1, p.x + p.w/2, p.y + p.h/2, 12);
     glow.addColorStop(0, "#fff"); glow.addColorStop(0.3, "#ff9bb9"); glow.addColorStop(1, "rgba(255, 155, 185, 0)");
     ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(p.x + p.w/2, p.y + p.h/2, 12, 0, Math.PI*2); ctx.fill();
     ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p.x + p.w/2, p.y + p.h/2, 3, 0, Math.PI*2); ctx.fill();
  }

  // Draw Traps
  for (let t of traps) {
    if (t.type === 'saw') {
      ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.angle);
      ctx.fillStyle = "#7f8c8d"; ctx.beginPath(); ctx.arc(0, 0, t.radius, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#c0392b"; ctx.lineWidth = 4; ctx.stroke();
      for(let i=0; i<8; i++){ ctx.rotate(Math.PI/4); ctx.beginPath(); ctx.moveTo(0, t.radius); ctx.lineTo(5, t.radius+6); ctx.lineTo(-5, t.radius+6); ctx.fill(); }
      ctx.restore();
    } else if (t.type === 'spike') {
      drawSpikes(ctx, t);
    } else if (t.type === 'axe') {
      // Draw pivot bracket centered exactly in the middle of the stone block
      ctx.fillStyle = "#2c3e50";
      ctx.fillRect(t.x + 32 - 12, t.y, 24, 16);
      ctx.strokeStyle = "#1b232e"; ctx.lineWidth = 2; ctx.strokeRect(t.x + 32 - 12, t.y, 24, 16);
      
      // Draw hanging rod/chain (lengthened to 425px for perfect low sweep!)
      const bx = t.x + 32 + Math.sin(t.angle) * 425;
      const by = t.y + Math.cos(t.angle) * 425;
      ctx.strokeStyle = "#7f8c8d";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(t.x + 32, t.y + 8);
      ctx.lineTo(bx, by);
      ctx.stroke();
      
      // Draw crescent blade
      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(t.angle);
      ctx.fillStyle = "#bdc3c7";
      ctx.strokeStyle = "#7f8c8d";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 32, -Math.PI/2, Math.PI/2, false);
      ctx.quadraticCurveTo(-15, 0, 0, -32);
      ctx.fill();
      ctx.stroke();
      
      // Inner detailed ring
      ctx.fillStyle = "#34495e";
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  }

  if (currentStage === 10) {
    // Ornate Persian Carpet on the floor (px = 320 to 960)
    drawOrnateCarpet(ctx, 320 - camera.x, 444 - camera.y, 640, 10);
    
    // Royal Couch/Bed on the left
    drawRoyalBed(ctx, 80 - camera.x, 396 - camera.y);
    
    // Hourglass next to the chest
    drawHourglass(ctx, 780 - camera.x, 386 - camera.y, time);
  }

  // Draw Enemies
  for (let e of enemies) {
    if (e.type === 'skeleton') drawSkeleton(ctx, e, time);
    else if (e.type === 'cultist') drawCultist(ctx, e, time);
    else if (e.type === 'bat') drawBat(ctx, e, time);
  }

  // Draw Player
  drawPlayer(ctx);

  // HUD (Premium cinematic cyber-fantasy HUD with chiselled stone frame and subtle white-ish glow)
  ctx.restore();
  ctx.save();
  
  // Set default alignments to prevent canvas inheritance bugs!
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  
  const hudX = 96;
  const hudY = 14;
  const hudW = 190;
  const hudH = 46;
  
  // 1. Draw Outer Chiselled Ancient Stone Frame with subtle white-ish glow
  const sX = hudX - 4;
  const sY = hudY - 4;
  const sW = hudW + 8;
  const sH = hudH + 8;
  
  ctx.fillStyle = "#20242c"; // Deep charcoal ancient granite
  ctx.strokeStyle = "#3e4450"; // Chiseled slate stone edge
  ctx.lineWidth = 2.0;
  ctx.shadowColor = "rgba(224, 230, 255, 0.4)"; // Soft white-ish glow
  ctx.shadowBlur = 6; // Low intensity
  
  ctx.beginPath();
  ctx.moveTo(sX + 11, sY);
  ctx.lineTo(sX + sW - 11, sY);
  ctx.lineTo(sX + sW, sY + 11);
  ctx.lineTo(sX + sW, sY + sH - 11);
  ctx.lineTo(sX + sW - 11, sY + sH);
  ctx.lineTo(sX + 11, sY + sH);
  ctx.lineTo(sX, sY + sH - 11);
  ctx.lineTo(sX, sY + 11);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Reset shadow for inner glass panel
  ctx.shadowBlur = 0;
  
  // 2. Draw Inner Glassmorphic Panel
  ctx.fillStyle = "rgba(10, 14, 22, 0.88)"; // Dark cyber glass
  ctx.strokeStyle = "rgba(0, 255, 204, 0.5)"; // Vibrant cyan laser trim
  ctx.lineWidth = 1.2;
  
  ctx.beginPath();
  ctx.moveTo(hudX + 10, hudY);
  ctx.lineTo(hudX + hudW - 10, hudY);
  ctx.lineTo(hudX + hudW, hudY + 10);
  ctx.lineTo(hudX + hudW, hudY + hudH - 10);
  ctx.lineTo(hudX + hudW - 10, hudY + hudH);
  ctx.lineTo(hudX + 10, hudY + hudH);
  ctx.lineTo(hudX, hudY + hudH - 10);
  ctx.lineTo(hudX, hudY + 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // 3. Secondary accent laser separator
  ctx.strokeStyle = "rgba(0, 255, 204, 0.25)";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(hudX + 38, hudY + 4);
  ctx.lineTo(hudX + 38, hudY + hudH - 4);
  ctx.stroke();
  
  // 4. Draw a gorgeous glowing 3D crystal diamond gem
  const gemX = hudX + 20;
  const gemY = hudY + hudH / 2;
  const gemPulse = 1.0 + Math.sin(time * 5.0) * 0.12; // Dynamic slow pulse
  
  ctx.save();
  ctx.translate(gemX, gemY);
  ctx.scale(gemPulse, gemPulse);
  
  // Outer pink glow aura
  ctx.shadowColor = "#ff007f";
  ctx.shadowBlur = 14;
  
  // Left facet (deep pink-purple)
  ctx.fillStyle = "#8e44ad";
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(-7, 0);
  ctx.lineTo(0, 9);
  ctx.closePath();
  ctx.fill();
  
  // Right facet (bright radiant neon pink)
  ctx.fillStyle = "#ff007f";
  ctx.beginPath();
  ctx.moveTo(0, -9);
  ctx.lineTo(7, 0);
  ctx.lineTo(0, 9);
  ctx.closePath();
  ctx.fill();
  
  // Horizontal highlight seam
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1.0;
  ctx.beginPath();
  ctx.moveTo(-7, 0);
  ctx.lineTo(7, 0);
  ctx.stroke();
  
  ctx.restore();
  
  // 5. Draw sleek cyber-fantasy labels inside the card
  // A. Top small label: SEISMIC CORES
  ctx.fillStyle = "#00ffcc";
  ctx.font = "bold 9px monospace";
  // Add sub-glow to label
  ctx.shadowColor = "#00ffcc";
  ctx.shadowBlur = 4;
  ctx.fillText("SEISMIC CORES", hudX + 48, hudY + 14);
  
  // B. Bottom value: Count in high-end bold serif
  ctx.shadowBlur = 0; // Reset blur
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 15px Georgia";
  ctx.fillText(`${logosCollected} / 10`, hudX + 48, hudY + 30);
  
  ctx.restore();

  // Interaction Prompts
  const tx = Math.floor((player.x + player.w/2) / TILE_SIZE); const ty = Math.floor((player.y + player.h/2) / TILE_SIZE);
  let nearInteractable = false;
  
  if (currentStage === 10) {
    let nearChest = false;
    for(let y=ty-2; y<=ty+2; y++) {
      for(let x=tx-2; x<=tx+2; x++) {
        if(y>=0 && y<mapHeight && x>=0 && x<mapWidth && map[y][x] === 4) nearChest = true;
      }
    }
    if (nearChest) {
      if (!chestOpened) {
        promptBox.textContent = "Press E to open the chest.";
        nearInteractable = true;
      } else if (chestGemY >= 60 && !golemEmpowered) {
        promptBox.textContent = "Press E to absorb the ultimate core power.";
        nearInteractable = true;
      } else if (golemEmpowered) {
        promptBox.textContent = "All power absorbed! Archive complete.";
      }
    } else {
      if (golemEmpowered) {
        promptBox.textContent = "All power absorbed! Archive complete.";
      } else {
        promptBox.textContent = "Reach the chest and claim the ultimate power (Press E).";
      }
    }
  }
  else if (!inInterior && currentStage < 10 && map[ty] && map[ty][tx] === 2) { promptBox.textContent = "Press E to enter the Sanctum."; nearInteractable = true; } 
  else if (inInterior && map[ty] && map[ty][tx] === 7) { promptBox.textContent = "Press E to read the Monument."; nearInteractable = true; } 
  else if (inInterior && map[ty] && map[ty][tx] === 9) { promptBox.textContent = "Press E to proceed to the next stage."; nearInteractable = true; } 
  else { promptBox.textContent = "Move with A/D. Jump with Space. Explore the relics."; }

  if (nearInteractable) {
    ctx.fillStyle = "#fff"; ctx.font = "20px monospace"; ctx.textAlign = "center";
    ctx.fillText("Press E", player.x - camera.x + player.w/2, player.y - camera.y - 20);
  }

  // Draw Premium Game Over Victory Overlay
  if (golemEmpowered) {
    ctx.save();
    // 1. Semi-transparent backing overlay
    ctx.fillStyle = "rgba(8, 4, 16, 0.94)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Rising glowing pink/blue particles
    ctx.fillStyle = "rgba(255, 120, 180, 0.6)";
    for (let i = 0; i < 40; i++) {
       const px = (i * 73 + time * 20) % canvas.width;
       const py = (canvas.height - (i * 47 + time * 50) % canvas.height);
       const r = 2 + (i % 4);
       ctx.beginPath();
       ctx.arc(px, py, r, 0, Math.PI*2);
       ctx.fill();
    }

    // 3. Ornate gold frame
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 4;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    ctx.strokeStyle = "rgba(255, 120, 180, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

    // Corner decorations
    const drawCorner = (cx, cy, flipX, flipY) => {
       ctx.save();
       ctx.translate(cx, cy);
       ctx.scale(flipX, flipY);
       ctx.strokeStyle = "#d4af37";
       ctx.lineWidth = 2.5;
       ctx.beginPath();
       ctx.moveTo(10, 10); ctx.lineTo(60, 10);
       ctx.moveTo(10, 10); ctx.lineTo(10, 60);
       ctx.stroke();
       ctx.restore();
    };
    drawCorner(40, 40, 1, 1);
    drawCorner(canvas.width - 40, 40, -1, 1);
    drawCorner(40, canvas.height - 40, 1, -1);
    drawCorner(canvas.width - 40, canvas.height - 40, -1, -1);

    // 4. Victory Information
    ctx.textAlign = "center";
    ctx.shadowColor = "#ff55ff";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#ff55ff";
    ctx.font = "bold 64px Georgia";
    ctx.fillText("ARCHIVE COMPLETE", canvas.width / 2, 180);
    
    ctx.shadowBlur = 10;
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 24px Georgia";
    ctx.fillText("SEISMIC CORE AWAKENED", canvas.width / 2, 230);
    ctx.shadowBlur = 0;

    // Story Description
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "italic 16px monospace";
    ctx.fillText("The Seismic Golem has successfully absorbed the ultimate core energy, awakening the ancient archives.", canvas.width / 2, 300);
    ctx.fillText("Brookwell, Blend, Port Markets, and the entire ecosystem are forever secured by the Seismic Shield!", canvas.width / 2, 330);

    // Statistics Box
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(440, 370, 400, 80);
    ctx.strokeRect(440, 370, 400, 80);

    ctx.fillStyle = "#00ffcc";
    ctx.font = "bold 13px monospace";
    ctx.fillText("SEISMIC CORES RECOVERED", 640, 395);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px Georgia";
    ctx.fillText(`${logosCollected} / 10 CORES`, 640, 428);

    // 5. Restart Button
    ctx.fillStyle = "#800000"; 
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2.5;
    ctx.fillRect(540, 500, 200, 48);
    ctx.strokeRect(540, 500, 200, 48);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 15px monospace";
    ctx.fillText("RESTART ARCHIVE", 640, 529);

    ctx.restore();
  }
}

function loop() {
  time += 0.016;
  if (chestOpened && chestGemY < 60) {
    chestGemY += 1;
  }
  updatePhysics();
  draw();
  drawLogoDesk(); // Keep preview logos animated live!
  requestAnimationFrame(loop);
}

// Canvas Click Event Listener for Reset/Restart Button
canvas.addEventListener("click", (e) => {
  if (golemEmpowered) {
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    // Check if clicked the Restart Button (x = 540 to 740, y = 500 to 548)
    if (clickX >= 540 && clickX <= 740 && clickY >= 500 && clickY <= 548) {
      currentStage = 0;
      inInterior = false;
      chestOpened = false;
      chestGemY = 0;
      golemEmpowered = false;
      logosCollected = 0;
      stagesMonumentRead = {};
      ROOMS.forEach(r => r.logoCollected = false);
      initStage();
    }
  }
});

initStage();
requestAnimationFrame(loop);
