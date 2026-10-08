const cards = [
   "Archer Queen",
"Archers",
"Arrows",
"Baby Dragon",
"Bandit",
"Barbarian Barrel",
"Barbarian Hut",
"Barbarians",
"Battle Healer",
"Battle Ram",   
"Bats",
"Berserker",
"Balloon",
"Bomb Tower",
"Bomber",
"Boss Bandit",
"Bowler",
"Cannon",
"Cannon Cart",
"Cannoneer",
"Clone",
"Dagger Duchess",
"Dark Prince",
"Dart Goblin",
"Earthquake",
"Electro Dragon",
"Electro Giant",
"Electro Spirit",
"Electro Wizard",
"Elite Barbarians",
"Elixir Collector",
"Elixir Golem",
"Executioner",
"Fire Spirit",
"Fireball",
"Firecracker",
"Fisherman",
"Flying Machine",
"Freeze",
"Furnace",
"Giant",
"Giant Skeleton",
"Giant Snowball",
"Goblin Barrel",
"Goblin Cage",
"Goblin Curse",
"Goblin Demolisher",
"Goblin Drill",
"Goblin Gang",
"Goblin Giant",
"Goblin Hut",
"Goblin Machine",
"Goblins",
"Goblinstein",
"Golden Knight",
"Golem",
"Graveyard",
"Guards",
"Heal Spirit",
"Hog Rider",
"Hunter",
"Ice Golem",
"Ice Spirit",
"Ice Wizard",
"Inferno Dragon",
"Inferno Tower",
"Knight",
"Lava Hound",
"Lightning",
"Little Prince",
"Lumberjack",
"Magic Archer",
"Mega Knight",
"Mega Minion",
"Miner",
"Mini Pekka",
"Minion Horde",
"Minions",
"Mirror",
"Monk",
"Mortar",
"Mother Witch",
"Mighty Miner",
"Musketeer",
"Night Witch",
"Pekka",
"Phoenix",
"Poison",
"Prince",
"Princess",
"Rage",
"Ram Rider",
"Rascals",
"Rocket",
"Royal Chef",
"Royal Delivery",
"Royal Ghost",
"Royal Giant",
"Royal Hogs",
"Royal Recruits",
"Rune Giant",
"Skeleton Army",
"Skeleton Barrel",
"Skeleton Dragons",
"Skeleton King",
"Skeletons",
"Sparky",
"Spear Goblins",
"Spirit Empress",
"Suspicious Bush",
"Tesla",
"The Log",
"Three Musketeers",
"Tombstone",
"Tornado",
"Tower Princess",
"Valkyrie",
"Vines",
"Void",
"Wall Breakers",
"Witch",
"Wizard",
"Xbow",
"Zap",
"Zappies"
].sort();

const colors = [
    "#ff595e",
    "#ff924c",
    "#ffca3a",
    "#8ac926",
    "#52b788",
    "#1982c4",
    "#6a4c93",
    "#e63946"
];

const grid = document.getElementById("grid");
const input = document.getElementById("cardInput");
const progress = document.getElementById("progress");

const guessed = new Set();

cards.forEach((card, index) => {
    const div = document.createElement("div");

    div.classList.add("card", "hidden");
    div.id = "card-" + index;
    div.style.backgroundColor = colors[index % colors.length];

    grid.appendChild(div);
});

function normalize(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, "")
        .replace(/[^a-z0-9]/g, "");
}

const normalizedCards = cards.map(normalize);

input.addEventListener("input", function () {

    const typed = normalize(this.value);

    normalizedCards.forEach((card, index) => {

        if (typed === card && !guessed.has(card)) {

            guessed.add(card);

            const slot = document.getElementById("card-" + index);

            slot.textContent = cards[index];
            slot.classList.remove("hidden");
            slot.classList.add("revealed");

            progress.textContent =
                `${guessed.size} / ${cards.length} Found`;

            this.value = "";

            if (guessed.size === cards.length) {
                alert("You found every card!");
            }
        }
    });
});

let timeLeft = 900;

const timerElement = document.getElementById("timer");

const timer = setInterval(() => {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerElement.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    timeLeft--;

    if (timeLeft < 0) {

        clearInterval(timer);

        input.disabled = true;

        alert(
            `Time's up!\nYou found ${guessed.size} out of ${cards.length} cards.`
        );
    }

}, 1000);