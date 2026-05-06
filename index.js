// ── LOAD SAVED DATA ──
function loadSave() {
    try {
        const savedCoins = localStorage.getItem("grimorio_coins");
        const savedCollection = localStorage.getItem("grimorio_collection");
        if (savedCoins !== null) coins = parseInt(savedCoins);
        if (savedCollection !== null) {
            const parsed = JSON.parse(savedCollection);
            Object.assign(collection, parsed);
        }
    } catch (e) {
        console.warn("Could not load save data:", e);
    }
}

function saveData() {
    try {
        localStorage.setItem("grimorio_coins", coins);
        localStorage.setItem("grimorio_collection", JSON.stringify(collection));
    } catch (e) {
        console.warn("Could not save data:", e);
    }
}

let coins = 0;

const coinText  = document.getElementById("coin-count");
const addBtn    = document.getElementById("addCoins");
const pullBtn   = document.getElementById("pullBtn");
const viewBtn   = document.getElementById("viewBtn");
const moveSound = document.getElementById("moveSound");

// ── COLLECTION: track how many of each card the player owns ──
const collection = {};

// ── LOAD SAVE ON START ──
loadSave();

// ── UPDATE COIN DISPLAY ──
function updateCoins() {
    let current = parseInt(coinText.textContent);
    let target  = coins;
    let step    = target > current ? 1 : -1;

    const interval = setInterval(() => {
        current += step;
        coinText.textContent = current;
        if (current === target) clearInterval(interval);
    }, 20);

    coinText.style.textShadow = "0 0 10px gold";
    setTimeout(() => coinText.style.textShadow = "none", 200);
}

// Set coin display immediately on load (no animation)
coinText.textContent = coins;

addBtn.onclick = () => { coins += 10; updateCoins(); saveData(); };

pullBtn.onclick = () => {
    if (coins >= 10) {
        coins -= 10;
        updateCoins();
        openPack();
    } else {
        alert("Not enough coins!");
    }
};

viewBtn.onclick = () => openGrimorio();

// ── HELPER: extract a readable name from a file path ──
function nameFromPath(path) {
    let file = path.split("/").pop();
    file = file.replace(/\.(jpeg|jpg|png)$/, "");
    file = file.replace(/_(normal|especial|raro|rara|legendaria|maestra|dios)$/, "");
    return file.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ── CARDS DATA ──
const cards = [
    /* normal */
    { rareza: "normal", imagen: "Cards images/911_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/aceite_bebe_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/bro_glen_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/gefe_de_maday_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/jorge_water_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/larios_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/maday_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/nata_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/sleeping_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/tienda_china_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/clinton_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/glen_hat_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/cristo_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/glen_joker_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/glen_hood_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/clase_3as_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/julio_rizz_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/joshua_hungry_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/charli_pelo_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/coach_sanmi_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/charly_sin_pelo_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/madahy_base_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/madahy_gord_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/migue_sueter_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/nata_staring_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/victor_sleeping_2_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/caballero_working_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/jefaso_working_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/charly_kirk_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/glen_smart_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/arturo_morgan_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/beto_cheto_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/glen_rizz1_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/manu2_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/george_glasses_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/kriko_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/manu_sleep_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/willy_wanka_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/beto_woman_normal.jpeg" },
    { rareza: "normal", imagen: "Cards images/charile_more_hair_normal.jpeg" },

    /* especial */
    { rareza: "especial", imagen: "Cards images/arabe_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/eucaliptos_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/hawking_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/hillary_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/maduro_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/obama_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/69_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/alex_dormido_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/chino_ass_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/balon_voly_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/migue_sonri_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/mr_cachondo_especial.jpeg" },
    { rareza: "especial", imagen: "Cards images/jaliscazo_especial.jpeg" },

    /* raro */
    { rareza: "raro", imagen: "Cards images/isla_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/duo_dinamico_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/la_fortuna_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/marga_euca_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/marla_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/matriz_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/trump_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/glen_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/arabe_mex_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/ball_crusher_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/cheche_base_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/fusion_josh_che_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/joshua_jefaso_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/nata_chilling_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/starbucks_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/glen_big_tits_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/mencho_dead_rara.jpeg" },
    { rareza: "raro", imagen: "Cards images/chocolate_rara.jpeg" },

    /* legendaria */
    { rareza: "legendaria", imagen: "Cards images/epstein_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/67_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/fat_ass_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/pdiddy_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/profe_fisica_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/trum_clinton_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/chino_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/jack_fatass_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/marla_lengua_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/nata_cluas_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/victor_sleeping_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/marla_power_up_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/candi_god_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/golden_jeffrey_legendaria.jpeg" },
    { rareza: "legendaria", imagen: "Cards images/glen_girl_legendaria.jpeg" },

    /* maestra */
    { rareza: "maestra", imagen: "Cards images/justin_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/manu_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/marga_working_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/papeles_epstein_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/pili_mili_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/61_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/glen_mask_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/glen_angry_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/josh_pelon_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/super_cheche_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/kriko_sleeping_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/micheal_guapo_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/el_mencho_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/coach_rizz_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/beto_alberto_maestra.jpeg" },
    { rareza: "maestra", imagen: "Cards images/chino_creepy_maestra.jpeg" },

    /* dios */
    { rareza: "dios", imagen: "Cards images/chávelo_dios.jpeg" },
    { rareza: "dios", imagen: "Cards images/chávelo_brazo_izqui_dios.jpeg" },
    { rareza: "dios", imagen: "Cards images/chavelo_brazo_derech_dios.jpeg" },
    { rareza: "dios", imagen: "Cards images/chávelo_pie_derech_dios.jpeg" },
    { rareza: "dios", imagen: "Cards images/chávelo_pie_izqui_dios.jpeg" },
    { rareza: "dios", imagen: "Cards images/gama_java_dios.jpeg" }
];

// ── OPEN PACK ──
function openPack() {
    const container = document.getElementById("packContainer");
    const overlay   = document.getElementById("blurOverlay");

    container.innerHTML = '<button id="closePack">✕</button>';
    document.getElementById("closePack").onclick = closePack;

    container.classList.add("show");
    overlay.classList.add("show");

    function pickCard() {
        const roll = Math.random() * 100;
        let pool;
        if      (roll < 1)   pool = cards.filter(c => c.rareza === "dios");
        else if (roll < 5)   pool = cards.filter(c => c.rareza === "maestra");
        else if (roll < 15)  pool = cards.filter(c => c.rareza === "legendaria");
        else if (roll < 30)  pool = cards.filter(c => c.rareza === "raro");
        else if (roll < 55)  pool = cards.filter(c => c.rareza === "especial");
        else                 pool = cards.filter(c => c.rareza === "normal");
        return pool[Math.floor(Math.random() * pool.length)];
    }

    for (let i = 0; i < 5; i++) {
        const card = pickCard();

        // add to collection and save
        collection[card.imagen] = (collection[card.imagen] || 0) + 1;
        saveData();

        const cardDiv = document.createElement("div");
        cardDiv.className = "card";

        const name = nameFromPath(card.imagen);
        const rarityLabels = {
            normal: "Normal", especial: "Especial", raro: "Raro",
            legendaria: "✦ Legendaria", maestra: "★ Maestra", dios: "⚡ Dios"
        };

        cardDiv.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <img src="Cards images/card-back.webp" alt="Card Back">
                </div>
                <div class="card-front ${card.rareza}">
                    <img src="${card.imagen}" alt="${name}">
                    <div class="card-name">${name}</div>
                    <div class="card-rarity-label">${rarityLabels[card.rareza]}</div>
                </div>
            </div>
        `;

        // Click to inspect after flip
        cardDiv.addEventListener("click", () => {
            if (cardDiv.classList.contains("flip")) {
                openInspectFromData(card);
            }
        });

        container.appendChild(cardDiv);

        setTimeout(() => {
            cardDiv.classList.add("flip");
            if (card.rareza === "dios" || card.rareza === "maestra") {
                setTimeout(() => cardDiv.querySelector(".card-front").classList.add("explode"), 600);
            }
        }, i * 600);
    }
}

// ── CLOSE PACK ──
function closePack() {
    const container = document.getElementById("packContainer");
    const overlay   = document.getElementById("blurOverlay");

    container.classList.remove("show");
    overlay.classList.remove("show");

    container.innerHTML = '<button id="closePack">✕</button>';
    document.getElementById("closePack").onclick = closePack;
}

document.getElementById("closePack").onclick = closePack;

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePack();
        closeGrimorio();
    }
});

// ── GRIMORIO ──
let currentFilter = "all";

function openGrimorio() {
    const overlay = document.getElementById("grimorioOverlay");
    overlay.classList.add("show");
    renderGrimorio();
}

function closeGrimorio() {
    document.getElementById("grimorioOverlay").classList.remove("show");
}

document.getElementById("closeGrimorio").onclick = closeGrimorio;

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        renderGrimorio();
    };
});

function renderGrimorio() {
    const grid  = document.getElementById("grimorioGrid");
    const stats = document.getElementById("grimorioStats");
    grid.innerHTML = "";

    const totalOwned   = Object.values(collection).reduce((a, b) => a + b, 0);
    const uniqueOwned  = Object.keys(collection).filter(k => collection[k] > 0).length;
    stats.textContent  = `Cards collected: ${uniqueOwned} / ${cards.length}  |  Total pulls: ${totalOwned}`;

    const filtered = currentFilter === "all"
        ? cards
        : cards.filter(c => c.rareza === currentFilter);

    const rarityLabels = {
        normal: "Normal", especial: "Especial", raro: "Raro",
        legendaria: "✦ Legendaria", maestra: "★ Maestra", dios: "⚡ Dios"
    };

    const rarityColors = {
        normal: "#aaa", especial: "#60a5fa", raro: "#a855f7",
        legendaria: "gold", maestra: "red", dios: "white"
    };

    filtered.forEach(card => {
        const count   = collection[card.imagen] || 0;
        const isOwned = count > 0;
        const name    = nameFromPath(card.imagen);

        const div = document.createElement("div");
        div.className = `grimorio-card ${card.rareza} ${isOwned ? "" : "locked"}`;

        div.innerHTML = `
            ${!isOwned ? '<div class="lock-icon">🔒</div>' : ""}
            ${count > 1 ? `<div class="grimorio-card-count">x${count}</div>` : ""}
            <img src="${card.imagen}" alt="${name}">
            <div class="grimorio-card-name">${name}</div>
            <div class="grimorio-card-rarity" style="color:${rarityColors[card.rareza]}">${rarityLabels[card.rareza]}</div>
        `;

        // ── FIX: open inspect on click (only if owned) ──
        if (isOwned) {
            div.addEventListener("click", () => openInspectFromData(card));
        }

        grid.appendChild(div);
    });
}

// ── INSPECT: open from card data object directly ──
function openInspectFromData(card) {
    const overlay     = document.getElementById("inspectOverlay");
    const inspectCard = document.getElementById("inspectCard");
    const rarityLabels = {
        normal: "Normal", especial: "Especial", raro: "Raro",
        legendaria: "✦ Legendaria", maestra: "★ Maestra", dios: "⚡ Dios"
    };
    const borderMap = {
        normal: "2px solid #aaa",       especial: "2px solid #60a5fa",
        raro: "2px solid #a855f7",      legendaria: "2px solid gold",
        maestra: "2px solid red",       dios: "3px solid transparent"
    };

    const rarities = ["normal","especial","raro","legendaria","maestra","dios"];

    // reset classes
    inspectCard.className = "inspect-card";
    inspectCard.classList.add(card.rareza);
    inspectCard.style.border = borderMap[card.rareza] || "";

    document.getElementById("inspectImg").src       = card.imagen;
    document.getElementById("inspectName").textContent   = nameFromPath(card.imagen);
    document.getElementById("inspectRarity").textContent = rarityLabels[card.rareza] || card.rareza;
    document.getElementById("inspectDesc").textContent   = "";

    // Inject shine div if not present
    if (!inspectCard.querySelector(".tilt-shine")) {
        const shine = document.createElement("div");
        shine.className = "tilt-shine";
        inspectCard.appendChild(shine);
    }

    // Always re-wire X button
    document.getElementById("closeInspect").onclick = closeInspect;

    overlay.classList.add("show");
}
function openInspect(card) {
    const overlay = document.getElementById("inspectOverlay");
    const inspectCard = document.getElementById("inspectCard");
    const front = card.querySelector(".card-front");

    inspectCard.className = "inspect-card";
    const rarities = ["normal","especial","raro","legendaria","maestra","dios"];
    rarities.forEach(r => { if (front.classList.contains(r)) inspectCard.classList.add(r); });

    const img = front.querySelector("img");
    document.getElementById("inspectImg").src = img ? img.src : "";
    document.getElementById("inspectName").textContent   = front.querySelector(".card-name")?.textContent || "";
    document.getElementById("inspectRarity").textContent = front.querySelector(".card-rarity-label")?.textContent || "";
    document.getElementById("inspectDesc").textContent   = front.querySelector(".card-desc")?.textContent || "";

    const borderMap = {
        normal: "2px solid #aaa", especial: "2px solid #60a5fa",
        raro: "2px solid #a855f7", legendaria: "2px solid gold",
        maestra: "2px solid red", dios: "3px solid transparent"
    };
    rarities.forEach(r => {
        if (front.classList.contains(r)) inspectCard.style.border = borderMap[r];
    });

    overlay.classList.add("show");
}

// ── CLOSE INSPECT ──
function closeInspect() {
    document.getElementById("inspectOverlay").classList.remove("show");
    resetInspectTilt();
}

// Wire X button every time - also re-wire inside openInspectFromData to be safe
document.getElementById("closeInspect").addEventListener("click", closeInspect);

// ── 3D TILT: track mouse on the OVERLAY so full screen area tilts the card ──
const inspectOverlayEl = document.getElementById("inspectOverlay");
const inspectCardEl    = document.getElementById("inspectCard");

inspectOverlayEl.addEventListener("mousemove", (e) => {
    if (!inspectOverlayEl.classList.contains("show")) return;

    const rect = inspectCardEl.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // max tilt 25deg, dampened by distance
    const maxTilt = 25;
    const rotY =  Math.max(-maxTilt, Math.min(maxTilt, (dx / (window.innerWidth  / 2)) * maxTilt));
    const rotX = -Math.max(-maxTilt, Math.min(maxTilt, (dy / (window.innerHeight / 2)) * maxTilt));

    // shine follows mouse over the card
    const px = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width)  * 100));
    const py = Math.max(0, Math.min(100, ((e.clientY - rect.top)  / rect.height) * 100));

    inspectCardEl.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;

    // update shine div background position
    const shine = inspectCardEl.querySelector(".tilt-shine");
    if (shine) {
        shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 30%, transparent 65%)`;
    }

    inspectCardEl.classList.add("tilting");
});

inspectOverlayEl.addEventListener("mouseleave", resetInspectTilt);

function resetInspectTilt() {
    inspectCardEl.style.transition = "transform 0.4s ease";
    inspectCardEl.style.transform  = "rotateX(0deg) rotateY(0deg) scale(1)";
    inspectCardEl.classList.remove("tilting");
    setTimeout(() => inspectCardEl.style.transition = "", 400);
}