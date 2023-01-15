// #region Loader
$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1000).then(() => $(".content").fadeIn(1000));
})

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
// #endregion

// REMNANTS - A text-based RPG by nouhidev
// ---------------------------------------
// Here, the players are presented with prompts 
// and must choose between "yes" or "no" to progress the story. 
// Players must navigate through a variety of challenges to reach the end of the game.
// ---------------------------------------
// Development started on the 13th January 2023
// It was initially developed in Python and as I am not proficient at all in JavaScript 
// I don't recommend taking a look at the source code.
// ---------------------------------------

// Stores the different text containers
var game_text = document.getElementById("game-text");
var stats_text = document.getElementById("stats-text");
var region_text = document.getElementById("region-text");

// Deprecated
// var event_text = document.getElementById("event-text");

// Determines whether the "YES" / "NO" buttons can be pressed
var allow_input = false;
// Determines whether the green "PROCEED" button can be pressed
var allow_continue = true;
// Stores either "y" or "n"
var player_input = "";

// While this bool is set to true, the game is stuck in an infinite loop waiting for a response (y/n)
var awaiting_response = true;

// Vowels - used for article determination
var vowels = ["a", "e", "i", "o", "u"]

// Inventory
var inventory = ["damaged sword"];
var inventory_txt = "[Inventory: ";

// Stats
// MGL keeps running if this variable is set to true
var alive = true;
// Health Related
var max_hp = 100
var hp = 100;
// Distance Related
var steps = 0;
// Money Related
var gold = 0;
// XP Related
var xp = 0;
var max_xp = 100;
var lvl = 0;
// Mana Related
var mana = 20;
var max_mana = 20;

var region = "Forest";

// #region Regions
// CHAPTER 1: The Beginning
// ACT 1: FOREST: -
// ACT 2: LOCKWOOD VILLAGE: -
var regions = ["Lockwood Village", 

// ACT 3: EASTPORT: -
"Eastport", 

// ACT 4: OCEAN: -
"Ocean", 

// ACT 5: ROCKY SHORES: -
"Rocky Shores", 

// ACT 6: REBELLION: Finally, you reach the rebellion's stronghold. The leader of the rebellion, an experienced knight, 
// tells you that the sorcerer's power comes from an ancient artifact that he has acquired and using it to control people. 
// The rebellion needs your help to find this artifact and destroy it.
"Rebellion", 

// CHAPTER 2: After reaching the Rebellion
// ACT 7: WASTELAND: -
"Wasteland", 

// ACT 8: LOST TEMPLE: -
"Lost Temple", 

// ACT 9: SWAMP: -
"Swamp",

// ACT 10: WASTELAND: -
"Wasteland", 

// ACT 11: LOST TEMPLE: -
"Lost Temple", 

// ACT 12: SWAMP: -
"Swamp",

// CHAPTER 3: Inside the Sorcerers Stronghold

// CATACOMBS: Network of underground tunnels and tombs beneath the sorcerer's stronghold. 
// The catacombs are filled with traps and puzzles, as well as undead creatures 
// that the sorcerer has raised to guard his treasures.
// ACT 13: CATACOMBS: -
"Catacombs", 

// LABYRINTH: A massive, twisting maze located deep in the sorcerer's stronghold. 
// The labyrinth is filled with all sorts of monsters and challenges, as well as a powerful boss at the center who guards the 
// the entrance to the stronghold.
// ACT 14: LABYRINTH
"Labyrinth",

// MAIN HALL: Once you've made it inside, you find yourself in a grand hall. The walls are adorned with tapestries 
// and the floors are made of marble. But don't let the opulence fool you - this is the heart of the sorcerer's power, 
// and you can sense the dark magic that permeates the air. You'll need to find a way to navigate through this hall and 
// reach the higher levels of the stronghold.
// ACT 15: MAIN HALL
"Main Hall",

// ILLUSIONARY GARDEN: A beautiful garden filled with illusory flowers and plants, 
// which can become deadly traps or illusions of the sorcerer's enemies and allies.
// ACT 16: ILLUSIONARY GARDEN
"Illusionary Garden",

// LIBRARY: You find a stairway that leads up to the stronghold's library. Here you find rows upon rows of books, 
// some ancient, some enchanted and some cursed. The librarian is an undead creature that the sorcerer has reanimated, 
// who will attack anyone who tries to take or damage the books.
// ACT 17: LIBRARY
"Library",

// CLOCKTOWER: A tall and winding tower filled with gears and clockwork mechanisms. 
// The clocktower is home to clockwork golems that the sorcerer has imbued with magic, and it's said that the sorcerer 
// uses the clocktower to manipulate time itself.
// ACT 18: CLOCKTOWER
"Clocktower",

// TOWER OF TRIALS: A tall and imposing tower located in the stronghold, where the sorcerer tests his apprentices and visitors 
// with deadly magical trials. The tower is filled with illusions, mind-bending puzzles, and deadly traps that only the most 
// skilled and clever adventurers can overcome.
// ACT 19: TOWER OF TRIALS
"Tower of Trials",

// INNER SANCTUM: You've reached the heart of the stronghold, the inner sanctum where the sorcerer awaits. 
// The room is grand and imposing, with the sorcerer's throne at the far end. You'll need to be prepared 
// for a final battle with the sorcerer, as he unleashes all of his power to defeat you and protect his stronghold.
// ACT 20: INNER SANCTUM
"Inner Sanctum",

// ???
"Last Supper"];
current_region = "";

// #endregion

// #region Places
places_table = [];

forest_places_table = ["lush grass patch", "small hut", "secluded camp", "damp cave" ,"stone arch", "field of red mushrooms", "grand tree",
"clearing with a small pond", "dense thicket of thorns and brambles", "tall tree with a hollow trunk", "wooden cabin", "lodge",
"waterfall", "leafy grove", "overgrown ruin", "small secluded meadow", "river", "verdant grass patch", "rustic hut", "rugged camp", "crystal-clear river"];

lockwood_village_places_table = ["abandoned house", "abandoned church", "abandoned chapel", 
"abandoned town hall", "abandoned tunnel", "abandoned barn", "abandoned stable", "abandoned manor", "abandoned barrack", "park", "garden", 
"abandoned watchtower", "abandoned cottage", "abandoned mansion", "abandoned stable", "abandoned tavern", "abandoned inn", "abandoned bazaar"]

eastport_places_table = ["abandoned ship", "broken ship", "abandoned warehouse", "abandoned dock", "open container", "beacon tower",
"quay", "abandoned beacon tower", "abandoned facility", "abandoned crane", "dredging", "breakwater", "abandoned control tower", 
"abandoned tugboat", "broken tugboat"]

ocean_places_table = ["small island", "island", "shipwreck", "coral reef", "abandoned lighthouse", "ship graveyard", "buoy", "kelp forest",
"seaweed bed", "current", "mangrove forest", "sea stack", "sea arch", "maelstrom", "rock formation", "tide pool"]

shore_places_table = ["rocky cliffside", "cliffside", "lighthouse", "abandoned lighthouse", "wharf", "cove", "secluded cave", "ancient pier overrun by seaweed and barnacles", 
"shipwreck", "abandoned seaside tavern", "tidal pool", "rocky shoreline", "beachside ruin of an old temple dedicated to a sea god", 
"reef", "hidden cove", "freshwater spring", "sandy dune", "oasis", "abandoned, hidden smuggler's den", "secluded bay", "ancient ruin"]

// #endregion

// #region Events
events_table = [];

forest_events_table = ["chest", "enemy", "wishing well", "traveler", "shrine"];

lockwood_village_events_table = ["chest", "enemy", "merchant", "traveler"] //NEW: MERCHANT

eastport_events_table = ["cargo", "enemy", "nest", "nothing"] // NEW: CARGO, NEST

ocean_events_table = ["enemy", "storm", "nothing"] // NEW: STORM

shore_events_table = ["enemy", "traveler", "shrine", "object burried in the ground"] // NEW: OBJECT BURRIED IN THE GROUND
// #endregion

// #region Loot Tables
chest_loot_table = ["dagger", "axe", "sword", "bow", "healing potion", "gold", "nothing"]

cargo_loot_table = ["halberd", "greataxe", "axe", "sword", "claymore", "healing potion", "gold", "gold"]

traveler_loot_table = ["healing potion", "gold", "sword", "axe", "dagger", "halberd", "mace", "hammer", "flail"]

object_burried_in_ground_names = ["rusty treasure chest", "old chest", "rusty container", "metal chest", "metal safe", "ceramic jar",
"ceramic canister"]
object_burried_in_ground_loot_table = ["halberd", "greataxe", "axe", "sword", "claymore", "healing potion", "gold", "gold", "bow",
"dagger", "mace", "hammer", "flail", "spear", "crossbow", "scythe", "scimitar"]
// #endregion

// #region Enemies
enemies = []

enemy_desciptors = ["great", "grand", "aggrevated", "feral", "hostile", "vicious", "malevolent", "bloodthirsty", "ferocious",
"brutal", "ruthless", "predatory", "merciless", "wicked", "sinister", "tainted", "vile"]

forest_enemies = ["spider", "werewolf", "dryad", "gnome", "wendigo", "ent", "harpy", 
"basilisk", "lizard", "rat", "leech", "mosquito"]

lockwood_village_enemies = ["goblin", "orc", "wraith", "megaspider", "bandit", "troll", "wight"]

eastport_enemies = ["centipede", "megacentipede", "ghoul", "rakshasa", "hag", "hollow", "banshee", 
"maggot", "possessed"]

ocean_enemies = ["sea monster", "mermaid", "siren", "leviathan", "sea serpent", "water elemental", "charybdis", "kraken",
"megasquid", "naga", "deep one", "manta ray", "jellyfish", "octopus"]

shore_enemies = ["vulture", "werewolf", "spirit", "octopus", "bat", "dweller", "lobster", "scorpion", "jellyfish", 
"sandworm", "worm", "seagull", "turtle", "manta ray", "megacrab"]
// #endregion

// #region Forward Variations

forwards_var = ["You delve deeper.", "You walk forward.", "You continue onward.", "You proceed ahead.", "You advance.", "You tread ahead."]

across_var = ["You come across", "You stumble upon", "You happen upon", "You run into"]
// #endregion

// #region NPCs

// Origins
origins = ["Golden Wheel", "Silver Tongue", "Emerald City", "Spice Road", "Bazaar", "Bronze Coin", "Jade Caravan",
 "Sapphire Harbour", "Crimson Square", "Velvet Road", "Iron Market", "Diamond Exchange", "Silver Empire"]

// Travelers
traveler_names = ["Jeffrey", "Wilhelm", "Reinhard", "Gottfried", "Gwyndolin", "Nito", "Seath", "Quelaag", "Priscilla", 
"Sif", "Gwyn", "Manus", "Ornstein", "Smough", "Kalameet", "Artorias", "Najka", "Freja", "Mytha", "Velstadt", "Vendrick", "Magus", "Nashandra", "Aldia", 
"Vordt", "Wolnir", "Sulyvahn", "Aldrich", "Oceiros", "Gundyr", "Lothric", "Godrick"]

// Traveler Phrases
traveler_phrases = ["I can't believe how different the world is now.", "I hope I find somewhere safe soon.", "I heard there's a community of survivors a few days from here.",
"I can't believe how much of the world has been destroyed.", "I hope I can find some food and supplies.", "I heard there's a group of raiders in the area, we need to be careful.",
"I never thought I would see the world like this.", "I never thought I'd have to live like this, scavenging for survival.", 
"I can't believe the state of the world, it's like something out of a nightmare.", "I never thought I'd have to fight just to survive.",
"I can't believe how much humanity has regressed in the wake of this disaster.", "I heard there's a community of traders a few days from here, we can exchange goods.",
"I lost all of my family to this disaster. I don't know what to do."]

// Merchants
 merchant_names = ["Jeffrey", "Wilhelm", "Reinhard", "Gottfried", "Gwyndolin", "Nito", "Seath", "Quelaag", "Priscilla", 
"Sif", "Gwyn", "Manus", "Ornstein", "Smough", "Kalameet", "Artorias", "Vaati"]

// Merchant Assortment + DEFAULT HEALING POTION
merchant_assortment = ["greatsword", "greataxe", "great halberd", "claymore", "halberd", "healing potion",
"mace", "hammer", "flail", "spear", "crossbow", "scythe", "scimitar"]

// Blacksmith
blacksmith_names = ["Najka", "Freja", "Mytha", "Velstadt", "Vendrick", "Magus", "Nashandra", "Aldia", 
"Vordt", "Wolnir", "Sulyvahn", "Aldrich", "Oceiros", "Gundyr", "Lothric", "Godrick"]

// #endregion

// Checks for region switches
async function check_region_switch(distance) {
    // Forest
    if (distance == 0) {
        current_region = "Forest";
        enemies = forest_enemies;
        places_table = forest_places_table;
        events_table = forest_events_table;
        awaiting_response = true;
        // REGION SCREEN UPDATE
        region_text.innerHTML = `<span class="red">[Act 1]</span> You wake up in a dense <span class="green">forest</span>, disoriented and confused. You realize that you have no memory of how you got here or what has happened to the world around you. You see a <span class="light-green">clearing</span> ahead.\r\n`
        // STORY SCREEN UPDATE
        game_text.innerHTML = `<span class="light-blue">ACT 1: AWAKENING</span>\r\n\r\n` +
        `You wake up in a dense forest, with no memory of how you got there or what has happened to the world. As you stand up and take in your surroundings, you notice that the trees are withered and the air is thick with a putrid smell. The silence is broken only by the occasional sound of something moving in the bushes.\r\n`
        + "\r\nYou start to explore the forest, looking for any clues about the state of the world.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You wake up.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Village
    if (distance == 10) {
        current_region = regions[0];
        // Update Places / Events / Enemies
        region = regions[0];
        places_table = lockwood_village_places_table;
        events_table = lockwood_village_events_table;
        enemies = lockwood_village_enemies;
        // REGION SCREEN UPDATE
        region_text.innerHTML = `<span class="red">[Act 2]</span> As you make your way through the <span class="green">forest</span>, you come across a <span class="orange">destroyed village</span>: <span class="light-gold">Lockwood Village</span>. The buildings are in ruins, some survivors remain.\r\n`
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 2: DISCOVERY</span>\r\n\r\n` +
        `After hours of wandering, you come across a small village in the clearing. The villagers tell you that a great disaster has occurred, causing widespread destruction and the collapse of civilization. They also tell you that a powerful sorcerer has risen to power, using dark magic to control and manipulate the remaining survivors.\r\n`
        + "\r\nThey inform you of a rumored island where a group of survivors has formed a community, and hopefully, a new chance for humanity to rebuild. You start to look for a port.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You proceed.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Port
    if (distance == 20) {
        current_region = regions[1];
        // REGION SCREEN UPDATE
        region_text.innerHTML = `<span class="red">[Act 3]</span> Heading out of the <span class="orange">damaged village</span>, you make your way towards a <span class="purplebrown">port</span>, looking for a <span class="brown">ship</span> that may help you. However, as you approach, you realize the port is <span class="purple">'infected'</span>.\r\n`
        region = regions[1];
        places_table = eastport_places_table;
        events_table = eastport_events_table;
        enemies = eastport_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 3: SHIPWRECKED</span>\r\n\r\n` +
        `As you leave the ruined village, you set out to find a ship that could be of aid, making your way towards the nearest port. However, as you approach, you realize the port is infected. The ships that were once docked there, now lay abandoned.\r\n`
        + "\r\You start to look for a working ship.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You venture further.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }

    }
    // Ocean
    if (distance == 30) {
        current_region = regions[2];
        region_text.innerHTML = `<span class="red">[Act 4]</span> After reaching the <span class="purplebrown">port</span>, you finally find a <span class="brown">ship</span> that seems seaworthy. However, as you set out to sea, you quickly realize that the <span class="blue">ocean</span> is just as dangerous as the land.\r\n`
        region = regions[2];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 4: ADRIFT</span>\r\n\r\n` +
        `After arriving at the port, you successfully find a ship that appears to be in good condition. However, as soon as you set sail, it becomes clear that the ocean is equally perilous as the land. The waters are filled with mutated creatures, and the storms are more violent than ever before.\r\n`
        + "\r\nYou set out to sea.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Rocky Shores
    if (distance == 40) {
        current_region = regions[3];
        region_text.innerHTML = `<span class="red">[Act 5]</span> Your boat reaches the shore of the island, you can see the signs of the rebellion in the distance. You know that this is where you will find the rebellion's stronghold and your safety.\r\n`
        region = regions[3];
        places_table = shore_places_table;
        events_table = shore_events_table;
        enemies = shore_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 5: ASHORE</span>\r\n\r\n` +
        `As your boat reaches the shore of the island, you can see the signs of the rebellion in the distance. The air is filled with the sounds of battle, and you know that this is where you will find the rebellion's stronghold and your safety.\r\n`
        + "\r\nYou go and look for the rebellion.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Rebellion
    if (distance == 50) {
        current_region = regions[4];
        region_text.innerHTML = `<span class="red">[Act 6]</span> Upon arriving at the rebellion, they explain to you that the sorcerer's immense power is derived from an ancient artifact in his possession. The rebellion seeks your aid in defeating the sorcerer.\r\n`
        region = regions[4];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 6: REBELLION</span>\r\n\r\n` +
        `Finally, you reach the rebellion's stronghold. The leader of the rebellion, an experienced knight, tells you that the sorcerer's power comes from an ancient artifact that he has acquired and using it to control people. The rebellion needs your help to find this artifact and destroy it.\r\n`
        + "\r\nYou join the rebellion and set out on a journey.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Wasteland
    if (distance == 60) {
        current_region = regions[5];
        region_text.innerHTML = `<span class="red">[Act 7]</span> After reaching the <span class="purplebrown">port</span>, you finally find a <span class="brown">ship</span> that seems seaworthy. However, as you set out to sea, you quickly realize that the <span class="blue">ocean</span> is just as dangerous as the land.\r\n`
        region = regions[5];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 7: WASTELAND</span>\r\n\r\n` +
        `After arriving at the port, you successfully find a ship that appears to be in good condition. However, as soon as you set sail, it becomes clear that the ocean is equally perilous as the land. The waters are filled with mutated creatures, and the storms are more violent than ever before.\r\n`
        + "\r\nYou set out to sea.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Lost Temple
    if (distance == 70) {
        current_region = regions[6];
        region_text.innerHTML = `<span class="red">[Act 8]</span> After reaching the <span class="purplebrown">port</span>, you finally find a <span class="brown">ship</span> that seems seaworthy. However, as you set out to sea, you quickly realize that the <span class="blue">ocean</span> is just as dangerous as the land.\r\n`
        region = regions[6];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 8: LOST TEMPLE</span>\r\n\r\n` +
        `After arriving at the port, you successfully find a ship that appears to be in good condition. However, as soon as you set sail, it becomes clear that the ocean is equally perilous as the land. The waters are filled with mutated creatures, and the storms are more violent than ever before.\r\n`
        + "\r\nYou set out to sea.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Swamp
    if (distance == 80) {
        current_region = regions[7];
        region_text.innerHTML = `<span class="red">[Act 9]</span> After reaching the <span class="purplebrown">port</span>, you finally find a <span class="brown">ship</span> that seems seaworthy. However, as you set out to sea, you quickly realize that the <span class="blue">ocean</span> is just as dangerous as the land.\r\n`
        region = regions[7];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 9: SWAMP</span>\r\n\r\n` +
        `After arriving at the port, you successfully find a ship that appears to be in good condition. However, as soon as you set sail, it becomes clear that the ocean is equally perilous as the land. The waters are filled with mutated creatures, and the storms are more violent than ever before.\r\n`
        + "\r\nYou set out to sea.\r\n" + "\r\n<span class='choice'>Continue?</span>\r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.innerHTML += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.innerHTML += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }

    await sleep(2000);
    forwards();
}

// Abyss
function abyss_combination() {
    events_table = ["nothing"];
    enemies = [];
    places_table = ["void"];
}

// #region Helper Functions

// Random Between Two Constants
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

// Capitalizes first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Sleeps for a amount of time (in ms)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Picks random array object
Array.prototype.sample = function(){
    return this[Math.floor(Math.random()*this.length)];
}

// Prints out a seperator
function seperator() {
    game_text.innerHTML += "-------------------------------------------------------------------------------------\r\n";
}

// Displays the players stats
function display_stats() {
    stats_text.innerHTML = "";
    stats_text.innerHTML += `[ <span class="health">Health: ${hp}/${max_hp}</span> | ` + 
    `<span class="distance">Distance traveled: ${steps * 100}m</span> | ` + 
    `<span class="gold">Gold: ${gold}</span> | <span class="region">Region: ${region}</span> | <span class="lvl">LVL: ${lvl}</span> | ` + 
    `<span class="xp">XP: ${xp}/${max_xp}</span> | <span class="mana">Mana: ${mana}/${max_mana}</span>]\r\n`
    display_inventory();
}

// Displays the players inventory
function display_inventory() {
    inventory_txt = "[ Inventory: ";
    inventory.forEach(add_to_inventory_txt);
    inventory_txt = inventory_txt.substring(0,inventory_txt.length-2);
    stats_text.innerHTML += inventory_txt + " ]\r\n";
}

// Helper inventory display function
function add_to_inventory_txt(item, index, array) {
    inventory_txt += capitalizeFirstLetter(item) + ", ";
}

// Display Forwards
async function forwards() {
    game_text.innerHTML += `${forwards_var.sample()}` + "\r\n\r\n";
    await sleep(1000);
    manage_events(places_table, events_table);
}

// Clear game text
function clear_game_text() {
    game_text.innerHTML = "";
}
// #endregion

// Manages Events
async function manage_events(places, events) {
    // Place
    let place = places.sample();
    place[0].toUpperCase();

    let article = "";
    if (vowels.includes(place[0])) {
        article = "an";
    }
    else {
        article = "a";
    }

    game_text.innerHTML += `${across_var.sample()} ${article} ${place}.\r\n\r\n`;

    await sleep(1000);

    // Events
    
    // Chooses event
    let event = events.sample();

    // Event has been chosen
    if (event != "nothing") {
        // Determine correct article
        if (vowels.includes(event[0])) {
            article = "an";
        }
        else {
            article = "a";
        }

        game_text.innerHTML += `You see ${article} ${event}.\r\n\r\n`;
        
        await sleep(1000);

        manage_sub_events(event);
    }
    // No Event has been chosen
    else {
        article = "";
        game_text.innerHTML += `You find ${article} ${event}.\r\n\r\n`;
        manage_allow_continue(true);
    }
}

// Manage Sub Events
async function manage_sub_events(sub_event) {
    awaiting_response = true;

    switch(sub_event) {
        // OBJECT BURRIED IN THE GROUND
        case "object burried in the ground":
            game_text.innerHTML += `<span class='choice'>Dig it up?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);
            
            // DIGS UP OBJECT
            if (player_input == "y") {
                game_text.innerHTML += "You dig up the object.\r\n\r\n";

                let obj = object_burried_in_ground_names.sample();

                let article = "";
                // Determine correct article
                if (vowels.includes(obj[0])) {
                    article = "an";
                }
                else {
                    article = "a";
                }

                await sleep(1000);

                let d = Math.random();
                // Successfully
                if (d < 0.8) {
                    game_text.innerHTML += `It is ${article} ${obj}.\r\n\r\n`;

                    await sleep(1000);

                    open_loot_container(object_burried_in_ground_loot_table, randomIntFromInterval(1, 3))
                }
                // is trap
                else {
                    let dmg = randomIntFromInterval(5,25);
                    damage(dmg);

                    await sleep(1000);

                    game_text.innerHTML += "<span class='drastic'>It is a pipe bomb.</span>\r\n\r\n";

                    await sleep(1000);

                    game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
                    manage_allow_continue(true);
                }
                
            }
            // DOESNT OPEN CARGO
            else if (player_input == "n") {
                game_text.innerHTML += "You do not dig up the object and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
        // SHRINE
        case "shrine":
            game_text.innerHTML += `<span class="choice">Pray at the shrine?\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // APPROACH TRAVELER
            if (player_input == "y") {
                game_text.innerHTML += "You head towards the shrine.\r\n";
                pray();
            }
            // PASS BY TRAVELER
            else if (player_input == "n") {
                game_text.innerHTML += "You do not pray at the shrine and move on.\r\n";
                manage_allow_continue(true);
            }

            break;
        // TRAVELER
        case "traveler":
            game_text.innerHTML += `<span class='choice'>Approach them?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // APPROACH TRAVELER
            if (player_input == "y") {
                game_text.innerHTML += "You head towards the traveler.\r\n";
                traveler_routine();
            }
            // PASS BY TRAVELER
            else if (player_input == "n") {
                game_text.innerHTML += "You do not approach the traveler and move on.\r\n";
                manage_allow_continue(true);
            }

            break;
        // MERCHANT
        case "merchant":
            game_text.innerHTML += `<span class='choice'>Talk to merchant?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // TALK TO MERCHANT
            if (player_input == "y") {
                game_text.innerHTML += "You head towards the merchant.\r\n";
                merchant_routine();
            }
            // DOESNT TALK TO MERCHANT
            else if (player_input == "n") {
                game_text.innerHTML += "You do not talk to the merchant and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT TALK TO MERCHANT
            else {
                game_text.innerHTML += "You do not talk to the merchant and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
            break;
        // STORM
        case "storm":
            let storm_dmg = randomIntFromInterval(5,15);
            damage(storm_dmg);

            game_text.innerHTML += `A violent storm hits you.\r\n\r\n`

            await sleep(1000);

            game_text.innerHTML += `<span class="dmg">You take ${storm_dmg} damage.</span>\r\n`
            manage_allow_continue(true);
            break;
        // WISHING WELL
        case "wishing well":
            game_text.innerHTML += `<span class='choice'>Make a wish?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // MAKES WISH
            if (player_input == "y") {
                game_text.innerHTML += "You make a wish.\r\n";
                make_wish();
            }
            // DOESNT MAKE WISH
            else if (player_input == "n") {
                game_text.innerHTML += "You do not make a wish and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT MAKE WISH
            else {
                game_text.innerHTML += "You do not make a wish and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
        // NEST
        case "nest":
            enemy_encounter();
            break;
        // ENEMY
        case "enemy":
            enemy_encounter();
            break;
        // CARGO
        case "cargo":
            game_text.innerHTML += `<span class='choice'>Loot cargo?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);
            
            // OPENS CARGO
            if (player_input == "y") {
                game_text.innerHTML += "You take a look at the cargo.\r\n\r\n";
                let d = Math.random();
                // Open Cargo Successfully
                if (d < 0.8) {
                    open_loot_container(cargo_loot_table, randomIntFromInterval(3, 6))
                }
                // Cargo is trap
                else {
                    let dmg = randomIntFromInterval(5,25);
                    damage(dmg);

                    await sleep(1000);

                    game_text.innerHTML += "<span class='drastic'>It is a trap.</span>\r\n\r\n";

                    await sleep(1000);

                    game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
                    manage_allow_continue(true);
                }
                
            }
            // DOESNT OPEN CARGO
            else if (player_input == "n") {
                game_text.innerHTML += "You do not open the cargo and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT OPEN CARGO
            else {
                game_text.innerHTML += "You do not open the cargo and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
        // CHEST
        case "chest":
            game_text.innerHTML += `<span class='choice'>Open chest?</span>\r\n\r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);
            
            // OPENS CHEST
            if (player_input == "y") {
                game_text.innerHTML += "You open the chest.\r\n\r\n";
                let d = Math.random();
                // Open Chest Successfully
                if (d < 0.66) {
                    open_loot_container(chest_loot_table, randomIntFromInterval(1, 5))
                }
                // Chest is trap
                else {
                    let dmg = randomIntFromInterval(5,25);
                    damage(dmg);

                    await sleep(1000);

                    game_text.innerHTML += "<span class='drastic'>It is a trap.</span>\r\n\r\n";

                    await sleep(1000);

                    game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
                    manage_allow_continue(true);
                }
                
            }
            // DOESNT OPEN CHEST
            else if (player_input == "n") {
                game_text.innerHTML += "You do not open the chest and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT OPEN CHEST
            else {
                game_text.innerHTML += "You do not open the chest and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
    }

}

// Pray
async function pray() {
    game_text.innerHTML =  `<span class="shrine">SHRINE</span>` + `\r\n\r\n`;
    await sleep(1000);
    game_text.innerHTML += `You pray to the gods.\r\n\r\n`;
    await sleep(2000);
    let d = Math.random();
    // Success with 20% Chance
    if (d <= 0.2) {
        max_hp += 10;
        hp = max_hp;
        game_text.innerHTML += "<span class='blessing'>Your prayers have been heard.</span>\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += "<span class='heal'>Your max hp has increased by 10.</span>\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += `<span class="info">Your current max hp is ${max_hp}.</span>\r\n`;
    }

    // Fail with 80% Chance
    else {
        game_text.innerHTML += "<span class='drastic'>Your prayers have been rejected.</span>\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += `<span class="dmg">You take 20 damage.</span>\r\n`;
        damage(20);
    }
    manage_allow_continue(true);
    display_stats();
}

// Make a wish function
async function make_wish() {
    game_text.innerHTML =  `<span class="wishing-well">WISHING WELL</span>` + `\r\n\r\n`;
    await sleep(1000);

    game_text.innerHTML += `<span class="choice">Throw <span class="gold">one gold</span> into the well?</span>\r\n\r\n`;

    awaiting_response = true;

    // Wait for user input
    manage_input(true);

    while(awaiting_response) {
        await sleep(1);
    }

    manage_input(false);

    // Throw gold
    if (player_input == "y") {
        // If player has more than 1 gold
        if (gold > 0) {
            game_text.innerHTML += `You throw <span class="gold">one gold</span> into the well.\r\n\r\n`;
            gold -= 1;
            display_stats();
            await sleep(2000);
        }
        // Player has no gold
        else {
            await sleep(1000);
            game_text.innerHTML += `You don't have <span class="gold">gold</span> to throw into the well.\r\n\r\n`;
            await sleep(1000);
            game_text.innerHTML += `You move on.\r\n\r\n`;
            await sleep(1000);
            manage_allow_continue(true);
            return;
        }
    }
    // Dont throw gold
    else if (player_input == "n") {
        game_text.innerHTML += "You don't throw <span class='gold'>one gold</span> into the well and move on.\r\n";
        manage_allow_continue(true);
        return;
    }

    let d = Math.random();
    // Success with 10% Chance
    if (d <= 0.1) {
        max_hp += 10;
        hp = max_hp;
        game_text.innerHTML += "<span class='blessing'>Your wish has been fulfilled.</span>\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += "<span class='heal'>Your max hp has increased by 10.</span>\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += `<span class="info">Your current max hp is ${max_hp}.</span>\r\n`;
    }

    // Fail with 90% Chance
    else {
        game_text.innerHTML += "<span class='info'>Nothing happened.</span>\r\n\r\n";
    }

    manage_allow_continue(true);
    display_stats();
}

// Take Damage
async function damage(amount) {
    display_stats();
    hp -= amount;
    if (hp <= 0) {
        alive = false;
        game_text.innerHTML += "You died.";
        throw new Error();
    }
}

// Traveler 
async function traveler_routine() {
    let phrase = traveler_phrases.sample();
    let name = traveler_names.sample();

    game_text.innerHTML =  `<span class="traveler-name">Traveler ${name}</span>` + `\r\n\r\n`;
    
    await sleep(1000);

    game_text.innerHTML +=  `You hear ${name} say: "${phrase}"` + `\r\n\r\n`;

    await sleep(2000);

    game_text.innerHTML +=  `${name} notices you.` + `\r\n\r\n`;

    await sleep(2000);

    let d = Math.random();
    // Give Item with 75% Chance
    if (d <= 0.75) {
        game_text.innerHTML +=  `${name} decides to give you some of their spoils.` + `\r\n\r\n`;

        await sleep(1000);

        let loot_table = traveler_loot_table;
        let amount_of_items = randomIntFromInterval(1, 3);

        for (let i = 0; i < amount_of_items; i++) {
            await sleep(1000);
    
            // Choose random item from loot table
            item = loot_table.sample();
    
            // Determine correct article
            if (vowels.includes(item[0])) {
                article = "an";
            }
            else {
                article = "a";
            }
    
            // Healing Potion
            if (item == "healing potion") {
                let amt = randomIntFromInterval(10, max_hp);
    
                hp += amt;
                if (hp >= max_hp) {
                    hp = max_hp;
                }
    
                game_text.innerHTML += `${name} gives you a potion and you drink it.\r\n`;
    
                await sleep(1000);
    
                game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
                display_stats();
    
                await sleep(1000);
                break;
            }
    
            // Gold
            if (item == "gold") {
                let amt = randomIntFromInterval(det_gold("traveler")[0], det_gold("traveler")[1]);

                gold += amt;

                game_text.innerHTML += `${name} gives you <span class="gold">${amt} gold</span>.\r\n`;
                display_stats();
    
                await sleep(1000);
                break;
            }
    
            // Check if item is already in inventory
            if (inventory.includes(item)) {
                game_text.innerHTML += `${name} gives you ${article} ${item} but you already have one.\r\n`
                break;
            }
    
            // Add item to inventory
            inventory.push(item);
            game_text.innerHTML += `${name} gives you ${article} ${item}.\r\n`
            display_stats();
        }

        await sleep(1000);

        game_text.innerHTML +=  `\r\n${name} walks off.` + `\r\n\r\n`;

        manage_allow_continue(true);
    }
    // Attack Player with 25% Chance
    else {
        game_text.innerHTML +=  `${name} believes you are hostile and attacks you.` + `\r\n\r\n`;
    
        await sleep(1000);

        let miss_chance = Math.random();
        // Miss with 15% Chance
        if (miss_chance <= 0.15) {
            game_text.innerHTML +=  `${name} misses their attack and runs off.` + `\r\n\r\n`;
            manage_allow_continue(true);
        }
        // Attack with 85% Chance
        else {
            let dmg = randomIntFromInterval(5, 25);
            game_text.innerHTML +=  `<span class="dmg">${name} hits you and deals ${dmg} damage.</span>` + `\r\n\r\n`;
            
            await sleep(1000);

            let attack_chance = Math.random();
            // Attack them back and get loot with 25% Chance
            if (attack_chance <= 0.25) {
                game_text.innerHTML +=  `${name} runs off but you catch up and strike them.` + `\r\n\r\n`;
            
                await sleep(1000);

                game_text.innerHTML +=  `You loot ${name}'s body.` + `\r\n\r\n`;

                await sleep(1000);

                game_text.innerHTML +=  `Loot is yet to implemented.` + `\r\n\r\n`;

                manage_allow_continue(true);
            }
            // Let them get away with 75% Chance
            else {
                game_text.innerHTML +=  `You are too slow to respond and ${name} runs off.` + `\r\n\r\n`;
                manage_allow_continue(true);
            }
        }
    }
    
    
}

// Merchant
async function merchant_routine() {
    await sleep(1000);
    game_text.innerHTML = `<span class="lvl">Merchant "${merchant_names.sample()}" of the ${origins.sample()}</span>\r\n`;
    game_text.innerHTML += "\r\n";
    let anger = 0;
    await sleep(1000);

    game_text.innerHTML += "They offer you: \r\n\r\n";
    
    let assortment = []
    let amt_of_items = randomIntFromInterval(2, 5);
    
    // Populate Assortment
    assortment.push("lesser healing potion");
    for (let i = 0; i < amt_of_items; i++) {
        if (!assortment.includes(merchant_assortment[i])) {
            assortment.push(merchant_assortment[i]);
        }
    }

    // Display Assortment
    for (let i = 0; i < assortment.length; i++) {
        await sleep(1000);
        game_text.innerHTML += "- ";
        game_text.innerHTML += `${capitalizeFirstLetter(assortment[i])} `;
        if (assortment[i] != "healing potion" &&  assortment[i] != "lesser healing potion") {
            game_text.innerHTML += `(${weapon_damage(assortment[i])[0]}-${weapon_damage(assortment[i])[1]} dmg)`;
        }
        game_text.innerHTML += "\r\n";
    }

    // Player Input
    // Player has money
    await sleep(3000);
    awaiting_response = true;

    game_text.innerHTML += `\r\n<span class="choice">Ready to buy?</span>\r\n\r\n`;

    // Wait for user input
    manage_input(true);

    while(awaiting_response) {
        await sleep(1);
    }

    manage_input(false);

    if (player_input == "y") {
        game_text.innerHTML += `The merchant approaches you.`;
    }
    else if (player_input == "n") {
        game_text.innerHTML += `The merchant doesn't have much time.`;
    }

    await sleep(3000);

    for (let i = 0; i < assortment.length; i++) {
        game_text.innerHTML = "";
        const item = assortment[i];
        awaiting_response = true;
        price = randomIntFromInterval(item_price(item)[0], item_price(item)[1]);
        price += steps;
        if (item != "lesser healing potion" && item != "healing potion") {
            game_text.innerHTML += `<span class="choice">Buy ${item}? (${weapon_damage(item)[0]}-${weapon_damage(item)[1]} dmg) for <span class="gold">${price}G</span>?</span>\r\n\r\n`;
        }
        else {
            game_text.innerHTML += `<span class="choice">Buy ${item} for <span class="gold">${price+anger}G</span>?</span>\r\n\r\n`;
        }   
        

        // Wait for user input
        manage_input(true);
    
        while(awaiting_response) {
            await sleep(1);
        }
    
        manage_input(false);

        // wants to buy
        if (player_input == "y") {
            // if player has enough money
            if (price+anger <= gold) {
                await sleep(1000);
                gold -= (price+anger);
                game_text.innerHTML += "<span class='info'>\r\nYou bought the item and added it to your inventory.</span>\r\n\r\n";
                // add to inventory
                if (item != "lesser healing potion" && item != "healing potion") {
                    inventory.push(item);
                    display_stats();
                }
                //heal
                else {
                    let amt = 30;
                    hp += amt;
                    
                    if (hp >= max_hp) {
                        hp = max_hp;
                    }

                    await sleep(1000);

                    game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
                    display_stats();
                }
                await sleep(2000);
            }
            else {
                await sleep(1000);
                game_text.innerHTML += "<span class='info'>\r\nYou don't have enough gold.</span>\r\n";
                await sleep(1000);
                game_text.innerHTML += `<span class="drastic">You've angered the merchant.</span>\r\n\r\n`;
                await sleep(3000);
                anger += 5;
            }
        }
        // doesnt want to buy
        else if (player_input == "n") {
            continue;
        }
    }

    await sleep(1000);

    game_text.innerHTML += `The trade concludes.\r\n`

    manage_allow_continue(true);
}

// #region COMBAT RELATED

// Enemy Encounter
async function enemy_encounter() {
    // Setup Enemy
    let enemy = enemies.sample();
    let enemy_descriptor = enemy_desciptors.sample();
    let enemy_combined_name = `${enemy_descriptor} ${capitalizeFirstLetter(enemy)}`;
    let enemy_hp = randomIntFromInterval(det_enemy_hp(enemy)[0], det_enemy_hp(enemy)[1])+steps;
    
    // Determine correct article to use
    let article = "";
    if (vowels.includes(enemy_combined_name[0])) {
        article = "an";
    }
    else {
        article = "a";
    }
    
    // Anounce enemy
    game_text.innerHTML += `<span class="info">You encounter ${article} <span class="enemy">${capitalizeFirstLetter(enemy_descriptor)} ${capitalizeFirstLetter(enemy)}</span>.</span>\r\n\r\n`;


    await sleep(1000);

    // Anounce enemy hp
    game_text.innerHTML += `<span class="enemy">${capitalizeFirstLetter(enemy_combined_name)}</span> has ${enemy_hp} hp.\r\n\r\n`;

    // Prompt for combat
    game_text.innerHTML += `<span class="choice">Engage in combat?</span>\r\n\r\n`;

    // Wait for user input
    manage_input(true);

    while(awaiting_response) {
        await sleep(1);
    }

    manage_input(false);

    // Engages
    if (player_input == "y") {
        game_text.innerHTML += "You engange in combat.\r\n\r\n";

        await sleep(1000);

        combat_routine(enemy, enemy_hp, false, enemy_combined_name);
        return;
    }
    // Tries to flee
    else if (player_input == "n") {
        game_text.innerHTML += "You attempt to flee.\r\n\r\n";
        let d = Math.random();
        // Flee Successfully with 45% Chance
        if (d < 0.45) {
            await sleep(1000);

            game_text.innerHTML += "<span class='blessing'>You successfully flee.</span>\r\n";

            manage_allow_continue(true);
        }
        // Fail with 55% Chance --> Engange in Combat
        else {
            let dmg = randomIntFromInterval(1,3);
            damage(dmg);

            await sleep(1000);

            game_text.innerHTML += "<span class='drastic'>You fail to flee.</span>\r\n\r\n";

            await sleep(1000);

            game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n\r\n`;
            display_stats();

            await sleep(1000);

            combat_routine(enemy, enemy_hp, true, enemy_combined_name)

            return;
        }
    }

    manage_allow_continue(true);
}

// Combat Routine
async function combat_routine(enemy, enemy_hp, failed_to_flee, enemy_combined) {

    let d = Math.random();
    let in_combat = true;
    let player_turn = failed_to_flee;
    let enemy_max_hp = enemy_hp;


    await sleep(1000);
    game_text.innerHTML = "<span class='combat'>COMBAT</span>\r\n" + `[ <span class='enemy'>You vs ${capitalizeFirstLetter(enemy_combined)} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;;

    while(in_combat) {
        // Seperate
        await sleep(1000);

        // Check for Enemy Death
        if (enemy_hp <= 0) {
            // Win fight
            game_text.innerHTML += `<span class="blessing">You've slain the ${enemy_combined}.</span>\r\n\r\n`;

            let enemy_xp = randomIntFromInterval(det_enemy_xp(enemy)[0],det_enemy_xp(enemy)[1]);
            enemy_xp += Math.floor(steps*1.25);

            await sleep(1000);

            game_text.innerHTML += `<span class="green">You've earned ${enemy_xp} xp.</span>\r\n`;

            manage_xp(enemy_xp);

            manage_allow_continue(true);

            in_combat = false;

            break;
        }

        // Update Stats
        display_stats();

        // Switch Turns
        player_turn = !player_turn;
        
        // Players Turn
        if (player_turn) {
            game_text.innerHTML += `<span class="turn">Your turn:</span>\r\n\r\n`;

            await sleep(1000);

            // If no weapons --> use fists
            if (inventory.length <= 0) {
                let hit_chance = Math.random();
                // You miss the attack
                if (hit_chance < 0.15) {
                    let miss_or_evade_chance = Math.random();
                    // Miss the hit with 50%
                    if (miss_or_evade_chance < 0.5) {
                        game_text.innerHTML += `<span class="drastic">You miss and deal no damage</span>.\r\n\r\n`;
                    }
                    // Enemy evades with 50%
                    else {
                        game_text.innerHTML += `<span class="drastic">${capitalizeFirstLetter(enemy_combined)} evaded the attack</span>.\r\n\r\n`;
                    }
                } 
                // You hit the attack
                else {
                    let fist_dmg = randomIntFromInterval(1,3);
                    enemy_hp -= fist_dmg;
                    if (enemy_hp <= 0) {
                        enemy_hp = 0;
                    }
    
                    game_text.innerHTML += `You use your fists.\r\n\r\n`;
    
                    await sleep(1000);
    
                    game_text.innerHTML += `<span class="deal-dmg"> You deal ${fist_dmg} damage. </span>\r\n`;
                }
                
                await sleep(2000);

                game_text.innerHTML = "";
            }
            // Player has weapons 
            else {
                let weapon_to_use = "";
                for (let i = 0; i < inventory.length; i++) {
                    awaiting_response = true;
                    const item = inventory[i];
                    game_text.innerHTML += `<span class="choice">Use ${item}? (${weapon_damage(item)[0]}-${weapon_damage(item)[1]} dmg)</span>\r\n\r\n`;

                    // Wait for user input
                    manage_input(true);
                
                    while(awaiting_response) {
                        await sleep(1);
                    }
                
                    manage_input(false);

                    if (player_input == "y") {
                        weapon_to_use = item;
                        break;
                    }
                    else if (player_input == "n") {
                        continue;
                    }
                }

                // No weapon was chosen
                if (weapon_to_use == "") {
                    let hit_chance = Math.random();
                    // You miss the attack
                    if (hit_chance < 0.15) {
                        let miss_or_evade_chance = Math.random();
                        // Miss the hit with 50%
                        if (miss_or_evade_chance < 0.5) {
                            game_text.innerHTML += `<span class="drastic">You miss and deal no damage</span>.\r\n\r\n`;
                        }
                        // Enemy evades with 50%
                        else {
                            game_text.innerHTML += `<span class="drastic">${enemy_combined} evaded the attack</span>.\r\n\r\n`;
                        }
                    } 
                    // You hit the attack
                    else {
                        let fist_dmg = randomIntFromInterval(1,3);
                        enemy_hp -= fist_dmg;
                        if (enemy_hp <= 0) {
                            enemy_hp = 0;
                        }
        
                        game_text.innerHTML += `You use your fists.\r\n\r\n`;
        
                        await sleep(1000);
        
                        game_text.innerHTML += `<span class="deal-dmg"> You deal ${fist_dmg} damage. </span>\r\n`;
                    }
                }
                
                // Weapon has been chosen
                else {
                    await sleep(1000);

                    game_text.innerHTML += `You chose to use ${weapon_to_use}.\r\n\r\n`;

                    let weapon_dmg = randomIntFromInterval(weapon_damage(weapon_to_use)[0],weapon_damage(weapon_to_use)[1]);

                    let hit_chance = Math.random();
                    // You miss / evade
                    if (hit_chance < 0.15) {
                        let miss_or_evade_chance = Math.random();
                        // Miss the hit with 50%
                        if (miss_or_evade_chance < 0.5) {
                            game_text.innerHTML += `<span class="drastic">You miss and deal no damage</span>.\r\n\r\n`;
                        }
                        // Enemy evades with 50%
                        else {
                            game_text.innerHTML += `<span class="drastic">${enemy_combined} evaded the attack</span>.\r\n\r\n`;
                        }
                    }
                    // You hit
                    else {
                        enemy_hp -= weapon_dmg;
                        if (enemy_hp <= 0) {
                            enemy_hp = 0;
                        }

                        await sleep(1000);

                        game_text.innerHTML += `<span class="deal-dmg"> You deal ${weapon_dmg} damage. </span>\r\n\r\n`;

                        // Randomly break weapon
                        let d = Math.random();
                        if (d <= 0.15) {
                            indx = inventory.indexOf(weapon_to_use);
                            inventory.splice(indx, 1);

                            await sleep(1000);

                            game_text.innerHTML += `<span class="dark-red"> ${capitalizeFirstLetter(weapon_to_use)} broke. </span>\r\n`;
                        }
                    }

                }

                await sleep(2000);
                
                game_text.innerHTML = "<span class='combat'>COMBAT</span>\r\n" + `[ <span class='enemy'>You vs ${capitalizeFirstLetter(enemy_combined)} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;;
                
            }
        }
        // Enemys Turn
        else {
            game_text.innerHTML += `<span class="turn">${capitalizeFirstLetter(enemy)}'s turn:</span>\r\n\r\n`;

            let dmg = randomIntFromInterval(det_enemy_dmg(enemy)[0], det_enemy_dmg(enemy)[1]);
            dmg += Math.floor(steps/2);

            await sleep(1000);

            game_text.innerHTML += `${capitalizeFirstLetter(enemy)} attacks.\r\n\r\n`;

            let miss_chance = Math.random();
            // Enemy misses with 15% Chance
            if (miss_chance < 0.15) {
                let miss_or_evade_chance = Math.random();
                // Miss with 50% Chance
                if (miss_or_evade_chance < 0.5) {
                    await sleep(1000);

                    game_text.innerHTML += `<span class="blessing">${capitalizeFirstLetter(enemy_combined)} misses and deals no damage.</span>\r\n\r\n`; 
                }
                // Player evades with 50%
                else {
                    await sleep(1000);

                    game_text.innerHTML += `<span class="blessing">You evade the attack.</span>\r\n\r\n`; 
                }
                
            }
            // Enemy hits
            else
            {
                await sleep(1000);

                game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n\r\n`;

                damage(dmg);
                display_stats();

                // if player will die break loop
                if (hp <= 0) {
                    in_combat = false;
                    break;
                }
            }

            await sleep(2000);
                
            game_text.innerHTML = "<span class='combat'>COMBAT</span>\r\n" + `[ <span class='enemy'>You vs ${capitalizeFirstLetter(enemy_combined)} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;;
        }
    }
}

// #endregion

// #region Determiners

// Item Price Determiner
function item_price(item) {
    switch(item) {
        case "lesser healing potion":
            return [10, 20];
        case "healing potion":
            return [20, 40];
        case "greataxe":
            return [40, 60];
        case "greatsword":
            return [60, 90];
        case "claymore":
            return [46, 76];
        case "great halberd":
            return [52, 84];
        case "halberd":
            return[20, 34];
        case "mace":
            return [30, 60];
        case "hammer":
            return [20, 50];
        case "flail":
            return [50, 100];
        case "spear":
            return [37, 54];
        case "crossbow":
            return [42, 87];
        case "scythe":
            return [52, 84];
        case "scimitar":
            return[56, 106];
    }
}

// Weapon Damage Determiner
function weapon_damage(weapon) {
    switch(weapon) {
        case "damaged sword":
            return [3, 6];
        case "dagger":
            return [4, 8];
        case "axe":
            return [6, 13];
        case "sword":
            return [7, 12];
        case "bow":
            return [5, 9];
        case "halberd":
            return [8, 16];
        case "greataxe":
            return [10, 20];
        case "claymore":
            return [11, 23];
        case "great halberd":
            return [15, 26];
        case "greatsword":
            return [17, 30];
        case "mace":
            return [11, 20];
        case "hammer":
            return [9, 17];
        case "flail":
            return [19, 40];
        case "spear":
            return [10, 17];
        case "crossbow":
            return [13, 22];
        case "scythe":
            return [17, 26];
        case "scimitar":
            return[21, 45];
    }
}

// Enemy Damage Determiner
function det_enemy_dmg(enemy) {
    // ENEMY DAMAGE CLASSES
    let weak = [2, 7];
    let below_avg = [4, 8];
    let common = [6, 11];
    let above_avg = [8, 14];
    let strong = [10, 17];
    let monster = [12, 19];
    let abomination = [14, 23];
    if (!enemies.includes(enemy)) {
        return [1, 1];
    }
    switch(enemy) {
        // REGION 0: FOREST
        case "spider":
            return weak;
        case "werewolf":
            return below_avg;
        case "dryad":
            return below_avg;
        case "gnome":
            return weak;
        case "wendigo":
            return common;
        case "ent":
            return common;
        case "harpy":
            return below_avg;
        case "basilisk":
            return common;
        case "lizard":
            return common;
        case "rat":
            return weak;
        case "leech":
            return weak;
        case "mosquito":
            return weak;
        // REGION 1: LOCKWOOD VILLAGE + 10-19
        case "goblin":
            return below_avg;
        case "orc":
            return above_avg;
        case "wraith":
            return above_avg;
        case "megaspider":
            return common;
        case "bandit":
            return below_avg;
        case "troll":
            return strong;
        case "wight":
            return common;
        // REGION 2: EASTPORT + 20-29
        case "centipede":
            return weak;
        case "megacentipede":
            return above_avg;
        case "ghoul":
            return common;
        case "rakshasa":
            return common;
        case "hag":
            return weak;
        case "hollow":
            return weak;
        case "banshee":
            return common;
        case "maggot":
            return weak;
        case "possessed":
            return below_avg;
        // REGION 3: OCEAN + 30-39
        case "sea monster":
            return above_avg;
        case "mermaid":
            return weak;
        case "siren":
            return below_avg;
        case "leviathan":
            return abomination;
        case "sea serpent":
            return strong;
        case "water elemental":
            return above_avg;
        case "charybdis":
            return monster;
        case "kraken":
            return abomination;
        case "megasquid":
            return strong;
        case "megacrab":
            return above_avg;
        case "naga":
            return above_avg;
        case "deep one":
            return common;
        case "manta ray":
            return weak;
        case "jellyfish":
            return weak;
        case "octopus":
            return below_avg;
        // REGION 4: SHORE
        case "vulture":
            return weak;
        case "werewolf":
            return below_avg;
        case "spirit":
            return below_avg;
        case "bat":
            return weak;
        case "dweller":
            return below_avg;
        case "lobster":
            return weak;
        case "scorpion":
            return weak;
        case "sandworm":
            return strong;
        case "worm":
            return weak;
        case "seagull":
            return weak;
        case "turtle":
            return weak;
    }
}

// Enemy XP Determiner
function det_enemy_xp(enemy) {
    // ENEMY XP CLASSES
    let weak = [5, 15];
    let below_avg = [15, 25];
    let common = [25, 35];
    let above_avg = [35, 45];
    let strong = [45, 55];
    let monster = [55, 65];
    let abomination = [65, 75];
    if (!enemies.includes(enemy)) {
        return [1, 1];
    }
    switch(enemy) {
        // REGION 0: FOREST
        case "spider":
            return weak;
        case "werewolf":
            return below_avg;
        case "dryad":
            return below_avg;
        case "gnome":
            return weak;
        case "wendigo":
            return common;
        case "ent":
            return common;
        case "harpy":
            return below_avg;
        case "basilisk":
            return common;
        case "lizard":
            return common;
        case "rat":
            return weak;
        case "leech":
            return weak;
        case "mosquito":
            return weak;
        // REGION 1: LOCKWOOD VILLAGE + 10-19
        case "goblin":
            return below_avg;
        case "orc":
            return above_avg;
        case "wraith":
            return above_avg;
        case "megaspider":
            return common;
        case "bandit":
            return below_avg;
        case "troll":
            return strong;
        case "wight":
            return common;
        // REGION 2: EASTPORT + 20-29
        case "centipede":
            return weak;
        case "megacentipede":
            return above_avg;
        case "ghoul":
            return common;
        case "rakshasa":
            return common;
        case "hag":
            return weak;
        case "hollow":
            return weak;
        case "banshee":
            return common;
        case "maggot":
            return weak;
        case "possessed":
            return below_avg;
        // REGION 3: OCEAN + 30-39
        case "sea monster":
            return above_avg;
        case "mermaid":
            return weak;
        case "siren":
            return below_avg;
        case "leviathan":
            return abomination;
        case "sea serpent":
            return strong;
        case "water elemental":
            return above_avg;
        case "charybdis":
            return monster;
        case "kraken":
            return abomination;
        case "megasquid":
            return strong;
        case "megacrab":
            return above_avg;
        case "naga":
            return above_avg;
        case "deep one":
            return common;
        case "manta ray":
            return weak;
        case "jellyfish":
            return weak;
        case "octopus":
            return below_avg;
        // REGION 4: SHORE
        case "vulture":
            return weak;
        case "werewolf":
            return below_avg;
        case "spirit":
            return below_avg;
        case "bat":
            return weak;
        case "dweller":
            return below_avg;
        case "lobster":
            return weak;
        case "scorpion":
            return weak;
        case "sandworm":
            return strong;
        case "worm":
            return weak;
        case "seagull":
            return weak;
        case "turtle":
            return weak;
    }
}

// Enemy HP Determiner
function det_enemy_hp(enemy) {
    // ENEMY HP CLASSES
    let weak = [5, 10];
    let below_avg = [8, 14];
    let common = [11, 19];
    let above_avg = [14, 25];
    let strong = [17, 30];
    let monster = [20, 34];
    let abomination = [23, 39];

    if (!enemies.includes(enemy)) {
        return [1, 1];
    }
    switch(enemy) {
        // REGION 0: FOREST
        case "spider":
            return weak;
        case "werewolf":
            return below_avg;
        case "dryad":
            return below_avg;
        case "gnome":
            return weak;
        case "wendigo":
            return common;
        case "ent":
            return common;
        case "harpy":
            return below_avg;
        case "basilisk":
            return common;
        case "lizard":
            return common;
        case "rat":
            return weak;
        case "leech":
            return weak;
        case "mosquito":
            return weak;
        // REGION 1: LOCKWOOD VILLAGE + 10-19
        case "goblin":
            return below_avg;
        case "orc":
            return above_avg;
        case "wraith":
            return above_avg;
        case "megaspider":
            return common;
        case "bandit":
            return below_avg;
        case "troll":
            return strong;
        case "wight":
            return common;
        // REGION 2: EASTPORT + 20-29
        case "centipede":
            return weak;
        case "megacentipede":
            return above_avg;
        case "ghoul":
            return common;
        case "rakshasa":
            return common;
        case "hag":
            return weak;
        case "hollow":
            return weak;
        case "banshee":
            return common;
        case "maggot":
            return weak;
        case "possessed":
            return below_avg;
        // REGION 3: OCEAN + 30-39
        case "sea monster":
            return above_avg;
        case "mermaid":
            return weak;
        case "siren":
            return below_avg;
        case "leviathan":
            return abomination;
        case "sea serpent":
            return strong;
        case "water elemental":
            return above_avg;
        case "charybdis":
            return monster;
        case "kraken":
            return abomination;
        case "megasquid":
            return strong;
        case "megacrab":
            return above_avg;
        case "naga":
            return above_avg;
        case "deep one":
            return common;
        case "manta ray":
            return weak;
        case "jellyfish":
            return weak;
        case "octopus":
            return below_avg;
        // REGION 4: SHORE
        case "vulture":
            return weak;
        case "werewolf":
            return below_avg;
        case "spirit":
            return below_avg;
        case "bat":
            return weak;
        case "dweller":
            return below_avg;
        case "lobster":
            return weak;
        case "scorpion":
            return weak;
        case "sandworm":
            return strong;
        case "worm":
            return weak;
        case "seagull":
            return weak;
        case "turtle":
            return weak;
    }
}

// Gold Determiner
function det_gold(entity) {
    switch(entity) {
        case "traveler":
            return [5, 105];
    }
}

// #endregion

// Manage Input
function manage_input(x) {
    if (x) {
        allow_input = true;
        document.getElementById("yesbtn").style.backgroundColor = "#CFBFA0";
        document.getElementById("nobtn").style.backgroundColor = "#CFBFA0";
    }
    else {
        allow_input = false;
        document.getElementById("yesbtn").style.backgroundColor = "#8E8E8E";
        document.getElementById("nobtn").style.backgroundColor = "#8E8E8E";
    }
}

// Open Loot Container
async function open_loot_container(container, amount_of_items) {
    for (let i = 0; i < amount_of_items; i++) {
        await sleep(1000);

        // Choose random item from loot table
        item = container.sample();

        // Determine correct article
        if (vowels.includes(item[0])) {
            article = "an";
        }
        else {
            article = "a";
        }

        // Healing Potion
        if (item == "healing potion") {
            let amt = randomIntFromInterval(10, Math.floor(max_hp/2));

            hp += amt;
            if (hp >= max_hp) {
                hp = max_hp;
            }

            game_text.innerHTML += `You found a healing potion and drank it.\r\n`;

            await sleep(1000);

            game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
            display_stats();

            await sleep(1000);
            continue;
        }

        // Gold
        if (item == "gold") {
            let amt = randomIntFromInterval(1, 250);
            gold += amt;
            game_text.innerHTML += `You found <span class="gold">${amt} gold</span>.\r\n`;

            await sleep(1000);
            continue;
        }

        // Nothing
        if (item == "nothing") {
            if (amount_of_items == 1) {
                game_text.innerHTML += "It is empty.\r\n";
            }
            // game_text.innerHTML += "...\r\n";
            continue;
        }

        // Check if item is already in inventory
        if (inventory.includes(item)) {
            game_text.innerHTML += `You found ${article} ${item} but you already have one.\r\n`
            continue;
        }

        // Add item to inventory
        inventory.push(item);
        game_text.innerHTML += `You found ${article} ${item}.\r\n`
    }

    await sleep(1000);

    game_text.innerHTML += `\r\nYou finish looting.\r\n`
    manage_allow_continue(true);
}

// Yes Button Function
function yes_btn() {
    player_input = "y";
    awaiting_response = false;
}

// No Button Function
function no_btn() {
    player_input = "n";
    awaiting_response = false;
}

// XP Managing
async function manage_xp(amount) {
    xp += amount;
    if (xp >= max_xp) {
        await sleep(1000);

        game_text.innerHTML += `\r\n<span class="lvl">You leveled up!</span>\r\n\r\n`;

        await sleep(1000);

        // Increase LVL
        lvl++;
        
        // Increase Max XP
        max_xp += lvl*20;

        // Increase Max HP
        max_hp += lvl*5;

        // Increase Max Mana
        max_mana += lvl*5;
        mana = max_mana;

        xp = Math.abs(max_xp-xp);
        hp = max_hp;

    }
    display_stats();
}

// Main Game Loop (MGL)
async function main_loop() {
    game_text.innerHTML = `<span class="region-title">${current_region.toUpperCase()}</span>\r\n\r\n`;
    // Check if player is alive
    if (!alive) {
        return;
    }
    check_region_switch(steps);
    
    // Stat Displays
    display_stats();
    steps++;
}

// Allow to continue to new day
function manage_allow_continue(x) {
    if (x) {
        allow_continue = true;
        document.getElementById("cbtn").style.backgroundColor = "#aaffa6";
    }
    else {
        allow_continue = false;
        document.getElementById("cbtn").style.backgroundColor = "#8E8E8E";
    }
}

// Continues to next day
function new_day() {
    if (allow_continue) {
        main_loop();
        manage_allow_continue(false);
    }
}


// Regularly update to auto scroll to end of div
window.setInterval(function() {
    var elem = document.getElementById('game');
    elem.scrollTop = elem.scrollHeight;
  }, 10);

function restart() {
    window.location.reload();
}

function zoom() {
    document.body.style.zoom = "80%" 
    document.getElementById("stats-text").style.fontSize = "19px";
}

zoom();