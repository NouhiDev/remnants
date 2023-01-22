//██████╗░███████╗███╗░░░███╗███╗░░██╗░█████╗░███╗░░██╗████████╗░██████╗
//██╔══██╗██╔════╝████╗░████║████╗░██║██╔══██╗████╗░██║╚══██╔══╝██╔════╝
//██████╔╝█████╗░░██╔████╔██║██╔██╗██║███████║██╔██╗██║░░░██║░░░╚█████╗░
//██╔══██╗██╔══╝░░██║╚██╔╝██║██║╚████║██╔══██║██║╚████║░░░██║░░░░╚═══██╗
//██║░░██║███████╗██║░╚═╝░██║██║░╚███║██║░░██║██║░╚███║░░░██║░░░██████╔╝
//╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚═════╝░

//▀▀█▀▀ ▒█▀▀▀ ▀▄▒▄▀ ▀▀█▀▀ 　 ▒█▀▀█ ░█▀▀█ ▒█▀▀▀█ ▒█▀▀▀ ▒█▀▀▄ 　 ▒█▀▀█ ▒█▀▀█ ▒█▀▀█
//░▒█░░ ▒█▀▀▀ ░▒█░░ ░▒█░░ 　 ▒█▀▀▄ ▒█▄▄█ ░▀▀▀▄▄ ▒█▀▀▀ ▒█░▒█ 　 ▒█▄▄▀ ▒█▄▄█ ▒█░▄▄
//░▒█░░ ▒█▄▄▄ ▄▀▒▀▄ ░▒█░░ 　 ▒█▄▄█ ▒█░▒█ ▒█▄▄▄█ ▒█▄▄▄ ▒█▄▄▀ 　 ▒█░▒█ ▒█░░░ ▒█▄▄█

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

// Enables the Debug Stats
var debug_stats = false;

// Deprecated
// var event_text = document.getElementById("event-text");

// Inventory
// Holds all the weapons of the player
// Weapons added here are to be seen as default equipment
var inventory = ["damaged sword"];

// Helper string used for displaying the inventory on the stats container
var inventory_txt = "[Inventory: ";

var spell_inventory = ["firebolt"];

// Inventory Item Cap
// Determines how many items the player can hold
// Increases with increasing strength level
var inventory_cap = 5;

// Stats
// MGL keeps running if this variable is set to true
var alive = true;

// Maximal HP
// Increases as game progresses through leveling up vitality or wishing wells / prayers
var max_hp = 100;

// Current HP
// Changes through encounters such as combat situations or traps
var hp = 100;

// Counts the amount of "days" passed
// (Amount of times the "PROCEED" button is pressed)
var steps = 0;

// Keeps track of how much gold the player holds
var gold = 0;

// Maximal XP
// Amount of XP needed to level up
// Increases with increasing player level
var max_xp = 100;

// Current XP
// Increases by defeating enemies or thanking friendly encounters
var xp = 0;

// Current Level
// Increases when XP reaches or surpasses Max XP - increases Max HP when leveled up
var lvl = 0;

// Maximal Mana
// Increases as game progresses through leveling up intelligence or encounters with wizards
var max_mana = 20;
// Current Mana
// Regenerates every step you take
// Can be used with wands/staff
var mana = 20;

// Levelable Stats
// When leveled up, Vitality increases the players maximal health --> max_hp += vitality*8;
var vitality = 0;

// When leveled up, Intelligence increases the players maximal mana --> max_mana += intelligence*10
var intelligence = 0;

// When leveled up, Luck increases the favourable chances of all events --> all chances += luck*0.02
var luck = 0;

// When leveled up, Strength increases the players inventory cap --> inventory_cap += Math.floor(strength*0.5)
var strength = 0;

// ---- VARIABLES END ----

// ---- GAME START ----

// █▀█ █▀▀ █▀▀ █ █▀█ █▄░█   █▀ █░█░█ █ ▀█▀ █▀▀ █░█   █▀▀ █░█ █▀▀ █▀▀ █▄▀
// █▀▄ ██▄ █▄█ █ █▄█ █░▀█   ▄█ ▀▄▀▄▀ █ ░█░ █▄▄ █▀█   █▄▄ █▀█ ██▄ █▄▄ █░█

// Checks for region switches
async function check_region_switch(distance) {
  switch (distance) {
    // Forest
    case 0:
      current_region = "Forest";
      await act_update(0);
      region_update(
        forest_places_table,
        forest_events_table,
        forest_enemies,
        forest_enemies_loot_table
      );
      break;
    // Lockwood Village
    case 10:
      current_region = regions[0];
      await act_update(1);
      region_update(
        lockwood_village_places_table,
        lockwood_village_events_table,
        lockwood_village_enemies,
        lockwood_village_enemies_loot_table
      );
      break;
    // Eastport
    case 20:
      current_region = regions[1];
      await act_update(2);
      region_update(
        eastport_places_table,
        eastport_events_table,
        eastport_enemies,
        eastport_enemies_loot_table
      );
      break;
    // Ocean
    case 30:
      current_region = regions[2];
      await act_update(3);
      region_update(
        ocean_places_table,
        ocean_events_table,
        ocean_enemies,
        ocean_enemies_loot_table
      );
      break;
    // Rocky Shores
    case 40:
      current_region = regions[3];
      await act_update(4);
      region_update(
        rocky_shore_places_table,
        rocky_shore_events_table,
        rocky_shore_enemies,
        rocky_shore_enemies_loot_table
      );
      break;
    // Rebellion
    case 50:
      current_region = regions[4];
      await act_update(5);
      region_update(
        rebellion_places_table,
        rebellion_events_table,
        rebellion_enemies
      );
      break;
    // Wasteland
    case 60:
      current_region = regions[5];
      await act_update(6);
      region_update(
        wasteland_places_table,
        wasteland_events_table,
        wasteland_enemies,
        wasteland_enemies_loot_table
      );
      break;
    // Lost Temple
    case 70:
      current_region = regions[6];
      await act_update(7);
      region_update(
        lost_temple_places_table,
        lost_temple_events_table,
        lost_temple_enemies,
        lost_temple_enemies_loot_table
      );
      break;
    // Swamp
    case 80:
      current_region = regions[7];
      await act_update(8);
      region_update(
        swamp_places_table,
        swamp_events_table,
        swamp_enemies,
        swamp_enemies_loot_table
      );
      break;
    // Mountains
    case 90:
      current_region = regions[8];
      await act_update(9);
      region_update(
        mountains_places_table,
        mountains_events_table,
        mountains_enemies,
        mountains_enemies_loot_table
      );
      break;
    // Icy Peak
    case 100:
      current_region = regions[9];
      await act_update(10);
      region_update(
        icy_peak_places_table,
        icy_peak_events_table,
        icy_peak_enemies,
        icy_peak_enemies_loot_table
      );
      break;
    // Abandonend Mines
    case 110:
      current_region = regions[10];
      await act_update(11);
      region_update(
        abandonend_mines_places_table,
        abandonend_mines_events_table,
        abandonend_mines_enemies,
        abandonend_mines_enemies_loot_table
      );
      break;
  }

  if (steps != 0 && steps % 10 != 0) {
    // No new Region is reached
    await sleep(2000);
    forwards();
  }
}

// █▀▄▀█ ▄▀█ █▄░█ ▄▀█ █▀▀ █▀▀   █▀█ █░░ ▄▀█ █▀▀ █▀▀ █▀
// █░▀░█ █▀█ █░▀█ █▀█ █▄█ ██▄   █▀▀ █▄▄ █▀█ █▄▄ ██▄ ▄█

// Manages Places
async function manage_places(places, events) {
  // Choose random Place from current Region
  let place = places.sample();

  game_text.innerHTML += `${across_var.sample()} ${correct_article(
    place
  )} ${place}.\r\n\r\n`;

  await sleep(1000);

  // Events

  // Chooses random Event from current Region
  let event = events.sample();

  // Event has been chosen
  if (event != "nothing") {
    game_text.innerHTML += `You see ${correct_article(
      event
    )} ${event}.\r\n\r\n`;

    await sleep(1000);

    manage_events(event);
  }
  // No Event has been chosen
  else {
    game_text.innerHTML += `You find ${event}.\r\n\r\n`;
    manage_allow_continue(true);
  }
}

// █▀▄▀█ ▄▀█ █▄░█ ▄▀█ █▀▀ █▀▀   █▀▀ █░█ █▀▀ █▄░█ ▀█▀ █▀
// █░▀░█ █▀█ █░▀█ █▀█ █▄█ ██▄   ██▄ ▀▄▀ ██▄ █░▀█ ░█░ ▄█

// Manage Events
async function manage_events(events) {
  awaiting_response = true;

  switch (events) {
    // GOLDEN STATUE
    case "golden statue":
      golden_statue();
      break;
    // ANCIENT DEVICE
    case "ancient device":
      ancient_device();
      break;
    // LOST SCRIPTURE
    case "lost scripture":
      lost_scripture();
      break;
    // STONE CHEST
    case "stone chest":
      chest_event("stone chest", true);
      break;
    // SEAFARER
    case "seafarer":
      seafarer_routine();
      break;
    // SHIPWRECK
    case "shipwreck":
      chest_event("shipwreck");
      break;
    // FRIENLDY TRAVELER
    case "friendly traveler":
      traveler_routine(true);
      break;
    // PAIR OF MONKS
    case "pair of monks":
      monk_routine();
      break;
    // SMALL DUNGEON
    case "small dungeon":
      small_dungeon();
      break;
    // BANDIT
    case "bandit":
      bandit();
      break;
    // BLURRY OBJECT
    case "blurry object":
      disguised_event("blurry object");
      break;
    // OBJECT BURRIED IN THE GROUND
    case "object burried in the ground":
      disguised_event("object burried in the ground");
      break;
    // SHRINE
    case "shrine":
      pray();
      break;
    // TRAVELER
    case "traveler":
      traveler_routine(false);
      break;
    // MERCHANT
    case "merchant":
      merchant_routine();
      break;
    // STORM
    case "storm":
      damage_event("storm", 5, 10);
      break;
    // WISHING WELL
    case "wishing well":
      make_wish();
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
      chest_event("cargo", false);
      break;
    // CHEST
    case "chest":
      chest_event("chest", false);
      break;
  }
}

// #endregion

// ███╗░░░███╗░█████╗░██╗███╗░░██╗
// ████╗░████║██╔══██╗██║████╗░██║
// ██╔████╔██║███████║██║██╔██╗██║
// ██║╚██╔╝██║██╔══██║██║██║╚████║
// ██║░╚═╝░██║██║░░██║██║██║░╚███║
// ╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚══╝
// ░██████╗░░█████╗░███╗░░░███╗███████╗
// ██╔════╝░██╔══██╗████╗░████║██╔════╝
// ██║░░██╗░███████║██╔████╔██║█████╗░░
// ██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░
// ╚██████╔╝██║░░██║██║░╚═╝░██║███████╗
// ░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝
// ██╗░░░░░░█████╗░░█████╗░██████╗░
// ██║░░░░░██╔══██╗██╔══██╗██╔══██╗
// ██║░░░░░██║░░██║██║░░██║██████╔╝
// ██║░░░░░██║░░██║██║░░██║██╔═══╝░
// ███████╗╚█████╔╝╚█████╔╝██║░░░░░
// ╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░

// Main Game Loop (MGL)
async function main_loop() {
  // Start Timer on start
  if (steps == 0) start_timer();

  // Add Region Title Text
  game_text.innerHTML = `<span class="region-title">${current_region.toUpperCase()}</span>\r\n\r\n`;

  // Check if Player is alive
  if (!alive) {
    return;
  }

  // Check for new Region / Continue if no new Region
  await check_region_switch(steps);

  // Regenrate Mana
  mana += 2;
  if (mana > max_mana) mana = max_mana;

  // Stat Displays
  update_stats();

  // Increase Steps
  steps++;
}

// Debug Mode
if (debug_stats) {
  max_hp = 999;
  hp = 999;
  mana = 999;
  max_mana = 999;
  inventory = [
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
    "scimitar",
  ];
  gold = 9999;
}
