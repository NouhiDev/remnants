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

// Enables the timer on default
var timer_active = true;

// Determines whether the "YES" / "NO" buttons can be pressed
var allow_input = false;
// Determines whether the green "PROCEED" button can be pressed
var allow_continue = true;
// Stores either "y" or "n"
var player_input = "";

var in_small_dungeon_combat = false;

// While this bool is set to true, the game is stuck in an infinite loop waiting for a response (y/n)
var awaiting_response = true;

// Inventory
// Holds all the weapons of the player
// Weapons added here are to be seen as default equipment
var inventory = ["damaged sword"];

// Helper string used for displaying the inventory on the stats container
var inventory_txt = "[Inventory: ";

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

var region = "Forest";

// Intervals (Classes) used for enemy XP, enemy DMG, enemy HP, etc.
var weak = [0, 0];
var below_avg = [0, 0];
var common = [0, 0];
var above_avg = [0, 0];
var strong = [0, 0];
var monster = [0, 0];
var abomination = [0, 0];

// Intervals (Classes) used for weapon DMG, weapon Price, etc.
var w_weak = [0, 0];
var w_common = [0, 0];
var w_uncommon = [0, 0];
var w_above_avg = [0, 0];
var w_strong = [0, 0];
var w_mythical = [0, 0];
var w_legendary = [0, 0];

// ---- VARIABLES END ----

// ---- GAME START ----

// Checks for region switches
async function check_region_switch(distance) {
  switch (distance) {
    // Forest
    case 0:
      current_region = "Forest";
      await act_update(0);
      region_update(forest_places_table, forest_events_table, forest_enemies);
      break;
    // Lockwood Village
    case 10:
      current_region = regions[0];
      await act_update(1);
      region_update(
        lockwood_village_places_table,
        lockwood_village_events_table,
        lockwood_village_enemies
      );
      break;
    // Eastport
    case 20:
      current_region = regions[1];
      await act_update(2);
      region_update(
        lockwood_village_places_table,
        lockwood_village_events_table,
        lockwood_village_enemies
      );
      break;
    // Ocean
    case 30:
      current_region = regions[2];
      await act_update(3);
      region_update(ocean_places_table, ocean_events_table, ocean_enemies);
      break;
    // Rocky Shores
    case 40:
      current_region = regions[3];
      await act_update(4);
      region_update(
        rocky_shore_places_table,
        rocky_shore_events_table,
        rocky_shore_enemies
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
        wasteland_enemies
      );
      break;
    // Lost Temple
    case 70:
      current_region = regions[6];
      await act_update(7);
      region_update(
        lost_temple_places_table,
        lost_temple_events_table,
        lost_temple_enemies
      );
      break;
  }

  if (steps != 0 && steps % 10 != 0) {
    // No new Region is reached
    await sleep(2000);
    forwards();
  }
}

// Manages Events
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

// Manage Sub Events
async function manage_events(sub_event) {
  awaiting_response = true;

  switch (sub_event) {
    // GOLDEN STATUE
    case "golden statue":
      game_text.innerHTML += `Not implemented yet.\r\n\r\n`;
      manage_allow_continue(true);
      break;
    // ANCIENT DEVICE
    case "ancient device":
      game_text.innerHTML += `Not implemented yet.\r\n\r\n`;
      manage_allow_continue(true);
      break;
    // LOST SCRIPTURE
    case "lost scripture":
      game_text.innerHTML += `Not implemented yet.\r\n\r\n`;
      manage_allow_continue(true);
      break;
    // STONE CHEST
    case "stone chest":
      game_text.innerHTML += `Not implemented yet.\r\n\r\n`;
      manage_allow_continue(true);
      break;
    // SEAFARER
    case "seafarer":
      game_text.innerHTML += `<span class='choice'>Make contact with them?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // APPROACH SEAFARER
      if (player_input == "y") {
        game_text.innerHTML += "You iniate interaction with them.\r\n";
        seafarer_routine();
      }
      // PASS BY SEAFARER
      else if (player_input == "n") {
        game_text.innerHTML +=
          "You do not approach the seafarer and move on.\r\n";
        manage_allow_continue(true);
      }
      break;
    // SHIPWRECK
    case "shipwreck":
      game_text.innerHTML += `<span class='choice'>Take a look at the shipwreck?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // APPROACHES SHIPWRECK
      if (player_input == "y") {
        game_text.innerHTML += "You sail to the shipwreck.\r\n\r\n";
        let d = Math.random();
        // Open Cargo Successfully
        if (d < 0.8) {
          open_loot_container(
            shipwreck_loot_table,
            randomIntFromInterval(3, 5)
          );
        }
        // Cargo is trap
        else {
          let e = Math.random();
          // Shark
          if (e < 0.5) {
            let dmg = randomIntFromInterval(5, 10);
            await damage(dmg);

            await sleep(1000);

            game_text.innerHTML +=
              "<span class='drastic'>A shark attacks you.</span>\r\n\r\n";

            await sleep(1000);

            game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
            manage_allow_continue(true);
          }
          // Collapse
          else {
            let dmg = randomIntFromInterval(5, 10);
            await damage(dmg);

            await sleep(1000);

            game_text.innerHTML +=
              "<span class='drastic'>The shipwreck collapses.</span>\r\n\r\n";

            await sleep(1000);

            game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
            manage_allow_continue(true);
          }
        }
      }
      // DOESNT OPEN CARGO
      else if (player_input == "n") {
        game_text.innerHTML += "You ignore the shipwreck and move on.\r\n";
        manage_allow_continue(true);
      }
      break;
    // FRIENLDY TRAVELER
    case "friendly traveler":
      game_text.innerHTML += `<span class='choice'>Approach them?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // APPROACH TRAVELER
      if (player_input == "y") {
        game_text.innerHTML += "You head towards the traveler.\r\n";
        friendly_traveler_routine();
      }
      // PASS BY TRAVELER
      else if (player_input == "n") {
        game_text.innerHTML +=
          "You do not approach the traveler and move on.\r\n";
        manage_allow_continue(true);
      }
      break;
    // PAIR OF MONKS
    case "pair of monks":
      game_text.innerHTML += `<span class='choice'>Approach them?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // APPROACH TRAVELER
      if (player_input == "y") {
        game_text.innerHTML += "You approach the monk.\r\n";
        monk_routine();
      }
      // PASS BY TRAVELER
      else if (player_input == "n") {
        game_text.innerHTML += "You do not approach the monk and move on.\r\n";
        manage_allow_continue(true);
      }

      break;
    // SMALL DUNGEON
    case "small dungeon":
      game_text.innerHTML += `<span class="choice">Enter the small dungeon?\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // APPROACH TRAVELER
      if (player_input == "y") {
        game_text.innerHTML += "You head towards the small dungeon.\r\n";
        small_dungeon();
      }
      // PASS BY TRAVELER
      else if (player_input == "n") {
        game_text.innerHTML += "You move on.\r\n";
        manage_allow_continue(true);
      }

      break;
    // BANDIT
    case "bandit":
      game_text.innerHTML += `<span class="choice">Try to flee?\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // TRIES TO FLEE
      if (player_input == "y") {
        let flee_chance = Math.random();
        // Flee with 20% Chance
        if (flee_chance < 0.2) {
          game_text.innerHTML +=
            "<span class='blessing'>You successfully flee from the bandit.</span>\r\n";
          manage_allow_continue(true);
        }
        // Fail with 80% Chance
        else {
          await sleep(1000);

          game_text.innerHTML +=
            "<span class='drastic'>You fail to flee.</span>\r\n";

          await sleep(2000);

          bandit();
        }
      }
      // TRIES TO NOT FLEE
      else if (player_input == "n") {
        game_text.innerHTML += "You choose to approach the bandit.\r\n";

        await sleep(2000);

        bandit();
      }

      break;
    // BLURRY OBJECT
    case "blurry object":
      game_text.innerHTML += `<span class='choice'>Come closer?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // DIGS UP OBJECT
      if (player_input == "y") {
        game_text.innerHTML += "You approach.\r\n\r\n";

        let obj = blurry_object.sample();

        await sleep(1000);

        let d = Math.random();
        // Successfully 60%
        if (d < 0.6) {
          game_text.innerHTML += `It is ${correct_article(
            obj
          )} ${obj}.\r\n\r\n`;

          await sleep(1000);

          open_loot_container(
            blurry_object_loot_table,
            randomIntFromInterval(1, 4)
          );
        }
        // is trap 40%
        else {
          let dmg = randomIntFromInterval(5, 10);
          await damage(dmg);

          await sleep(1000);

          game_text.innerHTML +=
            "<span class='drastic'>It is a trap.</span>\r\n\r\n";

          await sleep(1000);

          game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
          manage_allow_continue(true);
        }
      }
      // DOESNT OPEN CARGO
      else if (player_input == "n") {
        game_text.innerHTML +=
          "You do not approach the blurry object and proceed.\r\n";
        manage_allow_continue(true);
      }
      break;
    // OBJECT BURRIED IN THE GROUND
    case "object burried in the ground":
      game_text.innerHTML += `<span class='choice'>Dig it up?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
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
        } else {
          article = "a";
        }

        await sleep(1000);

        let d = Math.random();
        // Successfully
        if (d < 0.8) {
          game_text.innerHTML += `It is ${article} ${obj}.\r\n\r\n`;

          await sleep(1000);

          open_loot_container(
            object_burried_in_ground_loot_table,
            randomIntFromInterval(1, 3)
          );
        }
        // is trap
        else {
          let dmg = randomIntFromInterval(5, 25);
          await damage(dmg);

          await sleep(1000);

          game_text.innerHTML +=
            "<span class='drastic'>It is a mine.</span>\r\n\r\n";

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

      while (awaiting_response) {
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

      while (awaiting_response) {
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
        game_text.innerHTML +=
          "You do not approach the traveler and move on.\r\n";
        manage_allow_continue(true);
      }

      break;
    // MERCHANT
    case "merchant":
      game_text.innerHTML += `<span class='choice'>Talk to merchant?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
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
        game_text.innerHTML +=
          "You do not talk to the merchant and move on.\r\n";
        manage_allow_continue(true);
      }
      // WRONG INPUT --> DOESNT TALK TO MERCHANT
      else {
        game_text.innerHTML +=
          "You do not talk to the merchant and move on.\r\n";
        manage_allow_continue(true);
      }
      break;
      break;
    // STORM
    case "storm":
      let storm_dmg = randomIntFromInterval(5, 15);
      await damage(storm_dmg);

      game_text.innerHTML += `A violent storm hits you.\r\n\r\n`;

      await sleep(1000);

      game_text.innerHTML += `<span class="dmg">You take ${storm_dmg} damage.</span>\r\n`;

      if (alive) {
        manage_allow_continue(true);
      }
      break;
    // WISHING WELL
    case "wishing well":
      game_text.innerHTML += `<span class='choice'>Make a wish?</span>\r\n\r\n`;

      // Wait for user input
      manage_input(true);

      while (awaiting_response) {
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

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // OPENS CARGO
      if (player_input == "y") {
        game_text.innerHTML += "You take a look at the cargo.\r\n\r\n";
        let d = Math.random();
        // Open Cargo Successfully
        if (d < 0.8) {
          open_loot_container(cargo_loot_table, randomIntFromInterval(3, 6));
        }
        // Cargo is trap
        else {
          let dmg = randomIntFromInterval(5, 10);
          await damage(dmg);

          await sleep(1000);

          game_text.innerHTML +=
            "<span class='drastic'>It is a trap.</span>\r\n\r\n";

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

      while (awaiting_response) {
        await sleep(1);
      }

      manage_input(false);

      // OPENS CHEST
      if (player_input == "y") {
        game_text.innerHTML += "You open the chest.\r\n\r\n";
        let d = Math.random();
        // Open Chest Successfully
        if (d < 0.66) {
          open_loot_container(chest_loot_table, randomIntFromInterval(1, 5));
        }
        // Chest is trap
        else {
          let dmg = randomIntFromInterval(5, 10);
          damage(dmg);

          await sleep(1000);

          game_text.innerHTML +=
            "<span class='drastic'>It is a trap.</span>\r\n\r\n";

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

// #region Events



// Bandit
async function bandit() {
  game_text.innerHTML = `<span class="bandit">BANDIT</span>` + `\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `The bandit ambushes you.\r\n\r\n`;

  await sleep(2000);

  let steal_chance = Math.random();
  // STEAL
  if (steal_chance < 0.45) {
    let steal_item_chance = Math.random();
    // STEAL ITEM
    if (steal_item_chance < 0.5) {
      // HAS ITEMS
      if (inventory.length != 0) {
        let weapon_to_steal = inventory.sample();
        inventory.pop(weapon_to_steal);
        update_stats();
        game_text.innerHTML += `The bandit steals ${weapon_to_steal}.\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `The bandit flees.\r\n\r\n`;
        manage_allow_continue(true);
      } else {
        game_text.innerHTML += `The bandit tries to steal your weapons but notices you don't have any.\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `The bandit feels sorry for you and flees.\r\n\r\n`;
        manage_allow_continue(true);
      }
    }
    // STEAL GOLD
    else {
      // HAS MONEY
      if (gold != 0) {
        let amt_gold_steal = randomIntFromInterval(1, gold);
        gold -= amt_gold_steal;
        game_text.innerHTML += `The bandit steals <span class="gold">${amt_gold_steal} gold</span>.\r\n\r\n`;
        update_stats();

        await sleep(1000);

        game_text.innerHTML += `The bandit flees.\r\n\r\n`;
        manage_allow_continue(true);
      }
      // NO MONEY --> BANDIT FEELS SORRY
      else {
        game_text.innerHTML += `The bandit tries to steal your gold but notices you don't have any.\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `The bandit feels sorry for you and flees.\r\n\r\n`;
        manage_allow_continue(true);
      }
    }
  }
  // DAMAGE
  else {
    game_text.innerHTML += "The bandit attacks you.\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="dmg">You take 20 damage.</span>\r\n\r\n`;
    await damage(20);
    update_stats();

    await sleep(1000);

    game_text.innerHTML += `The bandit flees.\r\n\r\n`;
    manage_allow_continue(true);
  }
}

// Pray
async function pray() {
  game_text.innerHTML = `<span class="shrine">SHRINE</span>` + `\r\n\r\n`;
  await sleep(1000);
  game_text.innerHTML += `You pray to the gods.\r\n\r\n`;
  await sleep(2000);
  let d = Math.random();
  // Success with 20% Chance
  if (d <= 0.2) {
    max_hp += 10;
    hp = max_hp;
    game_text.innerHTML +=
      "<span class='blessing'>Your prayers have been heard.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML +=
      "<span class='heal'>Your max hp has increased by 10.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="info">Your current max hp is ${max_hp}.</span>\r\n`;
  }

  // Fail with 80% Chance
  else {
    game_text.innerHTML +=
      "<span class='drastic'>Your prayers have been rejected.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="dmg">You take 20 damage.</span>\r\n`;
    await damage(20);
    update_stats();
  }
  manage_allow_continue(true);
  update_stats();
}

// Make a wish function
async function make_wish() {
  game_text.innerHTML =
    `<span class="wishing-well">WISHING WELL</span>` + `\r\n\r\n`;
  await sleep(1000);

  game_text.innerHTML += `<span class="choice">Throw <span class="gold">one gold</span> into the well?</span>\r\n\r\n`;

  awaiting_response = true;

  // Wait for user input
  manage_input(true);

  while (awaiting_response) {
    await sleep(1);
  }

  manage_input(false);

  // Throw gold
  if (player_input == "y") {
    // If player has more than 1 gold
    if (gold > 0) {
      game_text.innerHTML += `You throw <span class="gold">one gold</span> into the well.\r\n\r\n`;
      gold -= 1;
      update_stats();
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
    game_text.innerHTML +=
      "You don't throw <span class='gold'>one gold</span> into the well and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  let d = Math.random();
  // Success with 10% Chance
  if (d <= 0.1) {
    max_hp += 10;
    hp = max_hp;
    game_text.innerHTML +=
      "<span class='blessing'>Your wish has been fulfilled.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML +=
      "<span class='heal'>Your max hp has increased by 10.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="info">Your current max hp is ${max_hp}.</span>\r\n`;
  }

  // Fail with 90% Chance
  else {
    game_text.innerHTML +=
      "<span class='info'>Nothing happened.</span>\r\n\r\n";
  }

  manage_allow_continue(true);
  update_stats();
}



// Traveler
async function traveler_routine() {
  let phrase = traveler_phrases.sample();
  let name = traveler_names.sample();

  game_text.innerHTML =
    `<span class="traveler-name">Traveler ${name}</span>` + `\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `You hear ${name} say: "${phrase}"` + `\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `${name} notices you.` + `\r\n\r\n`;

  await sleep(2000);

  let d = Math.random();
  // Give Item with 75% Chance
  if (d <= 0.75) {
    game_text.innerHTML +=
      `<span class="blessing">${name} decides to give you some of their spoils.</span>` +
      `\r\n\r\n`;

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
      } else {
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
        update_stats();

        await sleep(1000);
        continue;
      }

      // Gold
      if (item == "gold") {
        let amt = randomIntFromInterval(
          det_gold("traveler")[0],
          det_gold("traveler")[1]
        );

        gold += amt;

        game_text.innerHTML += `${name} gives you <span class="gold">${amt} gold</span>.\r\n`;
        update_stats();

        await sleep(1000);
        continue;
      }

      // Check if item is already in inventory
      if (inventory.includes(item)) {
        game_text.innerHTML += `${name} gives you ${article} ${item} but you already have one.\r\n`;
        continue;
      }

      // Add item to inventory
      inventory.push(item);
      game_text.innerHTML += `${name} gives you ${article} ${item}.\r\n`;
      update_stats();
    }

    await sleep(1000);

    game_text.innerHTML += `\r\n${name} walks off.` + `\r\n\r\n`;

    manage_allow_continue(true);
  }
  // Attack Player with 25% Chance
  else {
    game_text.innerHTML +=
      `<span class="drastic">${name} believes you are hostile and attacks you.</span>` +
      `\r\n\r\n`;

    await sleep(1000);

    let miss_chance = Math.random();
    // Miss with 15% Chance
    if (miss_chance <= 0.15) {
      game_text.innerHTML +=
        `${name} misses their attack and runs off.` + `\r\n\r\n`;
      manage_allow_continue(true);
    }
    // Attack with 85% Chance
    else {
      let dmg = randomIntFromInterval(5, 25);
      game_text.innerHTML +=
        `<span class="dmg">${name} hits you and deals ${dmg} damage.</span>` +
        `\r\n\r\n`;
      await damage(dmg);
      update_stats();

      await sleep(1000);

      let attack_chance = Math.random();
      // Attack them back and get loot with 25% Chance
      if (attack_chance <= 0.25) {
        game_text.innerHTML +=
          `<span class="blessing">${name} runs off but you catch up and strike them.</span>` +
          `\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `You loot ${name}'s body.` + `\r\n\r\n`;

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
          } else {
            article = "a";
          }

          // Healing Potion
          if (item == "healing potion") {
            let amt = randomIntFromInterval(10, max_hp);

            hp += amt;
            if (hp >= max_hp) {
              hp = max_hp;
            }

            game_text.innerHTML += `${name} had a potion and you drink it.\r\n`;

            await sleep(1000);

            game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
            update_stats();

            await sleep(1000);
            continue;
          }

          // Gold
          if (item == "gold") {
            let amt = randomIntFromInterval(
              det_gold("traveler")[0],
              det_gold("traveler")[1]
            );

            gold += amt;

            game_text.innerHTML += `${name} had <span class="gold">${amt} gold</span>.\r\n`;
            update_stats();

            await sleep(1000);
            continue;
          }

          // Check if item is already in inventory
          if (inventory.includes(item)) {
            game_text.innerHTML += `${name} had ${article} ${item} but you already have one.\r\n`;
            continue;
          }

          // Add item to inventory
          inventory.push(item);
          game_text.innerHTML += `${name} had ${article} ${item}.\r\n`;
          update_stats();
        }

        await sleep(1000);

        game_text.innerHTML +=
          `You finish looting their body and go away.` + `\r\n\r\n`;

        manage_allow_continue(true);
      }
      // Let them get away with 75% Chance
      else {
        game_text.innerHTML +=
          `You are too slow to respond and ${name} runs off.` + `\r\n\r\n`;
        manage_allow_continue(true);
      }
    }
  }
}

// Friendly Traveler
async function friendly_traveler_routine() {
  let phrase = traveler_phrases.sample();
  let name = traveler_names.sample();

  game_text.innerHTML =
    `<span class="traveler-name">Traveler ${name}</span>` + `\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `You hear ${name} say: "${phrase}"` + `\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `${name} notices you.` + `\r\n\r\n`;

  await sleep(2000);

  let d = Math.random();
  // Give Item with 75% Chance
  if (d <= 0.75) {
    game_text.innerHTML +=
      `<span class="blessing">${name} decides to give you some of their spoils.</span>` +
      `\r\n\r\n`;

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
      } else {
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
        update_stats();

        await sleep(1000);
        continue;
      }

      // Gold
      if (item == "gold") {
        let amt = randomIntFromInterval(
          det_gold("traveler")[0],
          det_gold("traveler")[1]
        );

        gold += amt;

        game_text.innerHTML += `${name} gives you <span class="gold">${amt} gold</span>.\r\n`;
        update_stats();

        await sleep(1000);
        continue;
      }

      // Check if item is already in inventory
      if (inventory.includes(item)) {
        game_text.innerHTML += `${name} gives you ${article} ${item} but you already have one.\r\n`;
        continue;
      }

      // Add item to inventory
      inventory.push(item);
      game_text.innerHTML += `${name} gives you ${article} ${item}.\r\n`;
      update_stats();
    }

    await sleep(1000);

    game_text.innerHTML += `\r\n${name} walks off.` + `\r\n\r\n`;

    manage_allow_continue(true);
  }
  // Ignore player
  else {
    game_text.innerHTML +=
      `<span class="drastic">${name} ignores you.</span>` + `\r\n\r\n`;

    await sleep(1000);

    manage_allow_continue(true);
  }
}

// Monk
async function monk_routine() {
  let name_1 = monk_names.sample();
  let name_2 = monk_names.sample();

  game_text.innerHTML =
    `<span class="traveler-name">Monks ${name_1} and ${name_2}</span>` +
    `\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `${name_1} and ${name_2} notice you.` + `\r\n\r\n`;

  await sleep(2000);

  let d = Math.random();
  // Heal with 80%
  if (d <= 0.8) {
    game_text.innerHTML +=
      `<span class="blessing">They decide to tend to your wounds.</span>` +
      `\r\n\r\n`;

    await sleep(1000);

    let loot_table = ["healing potion"];
    let amount_of_items = randomIntFromInterval(1, 3);

    for (let i = 0; i < amount_of_items; i++) {
      await sleep(1000);

      // Choose random item from loot table
      item = loot_table.sample();

      // Determine correct article
      if (vowels.includes(item[0])) {
        article = "an";
      } else {
        article = "a";
      }

      // Healing Potion
      if (item == "healing potion") {
        let amt = randomIntFromInterval(10, max_hp);

        hp += amt;
        if (hp >= max_hp) {
          hp = max_hp;
        }

        game_text.innerHTML += `They give you a potion and you drink it.\r\n`;

        await sleep(1000);

        game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
        update_stats();

        await sleep(1000);
        continue;
      }
    }

    await sleep(1000);

    game_text.innerHTML += `You thank the monks.\r\n`;

    await sleep(1000);

    game_text.innerHTML += `<span class="green">You've earned 25 xp.</span>\r\n\r\n`;

    manage_xp(25);

    await sleep(1000);

    game_text.innerHTML += `\r\n${name_1} and ${name_2} walk off.` + `\r\n\r\n`;

    manage_allow_continue(true);
  }
  // Ignore player 20%
  else {
    game_text.innerHTML +=
      `<span class="drastic">They look away.</span>` + `\r\n\r\n`;

    await sleep(1000);

    game_text.innerHTML += `Daniel and Philipp walk away.` + `\r\n\r\n`;

    await sleep(1000);

    manage_allow_continue(true);
  }
}





// #endregion

// #region COMBAT RELATED

// Enemy Encounter
async function enemy_encounter() {
  // Setup Enemy
  let enemy = enemies.sample();
  let enemy_descriptor = enemy_desciptors.sample();
  let enemy_combined_name = `${enemy_descriptor} ${capitalize_first_letters(
    enemy
  )}`;
  let enemy_hp =
    randomIntFromInterval(
      enemy_determiner(enemy, "hp")[0],
      enemy_determiner(enemy, "hp")[1]
    ) + steps;

  // Determine correct article to use
  let article = "";
  if (vowels.includes(enemy_combined_name[0])) {
    article = "an";
  } else {
    article = "a";
  }

  // Anounce enemy
  game_text.innerHTML += `<span class="info">You encounter ${article} <span class="enemy">${capitalize_first_letters(
    enemy_descriptor
  )} ${capitalize_first_letters(enemy)}</span>.</span>\r\n\r\n`;

  await sleep(1000);

  // Anounce enemy hp
  game_text.innerHTML += `<span class="enemy">${capitalize_first_letters(
    enemy_combined_name
  )}</span> has ${enemy_hp} hp.\r\n\r\n`;

  // Prompt for combat
  game_text.innerHTML += `<span class="choice">Engage in combat?</span>\r\n\r\n`;

  // Wait for user input
  manage_input(true);

  while (awaiting_response) {
    await sleep(1);
  }

  manage_input(false);

  // Engages
  if (player_input == "y") {
    game_text.innerHTML += "You engange in combat.\r\n\r\n";

    await sleep(1000);

    combat_routine(enemy, enemy_hp, false, enemy_combined_name, false);
    return;
  }
  // Tries to flee
  else if (player_input == "n") {
    game_text.innerHTML += "You attempt to flee.\r\n\r\n";
    let d = Math.random();
    // Flee Successfully with 45% Chance
    if (d < 0.45) {
      await sleep(1000);

      game_text.innerHTML +=
        "<span class='blessing'>You successfully flee.</span>\r\n";

      manage_allow_continue(true);
    }
    // Fail with 55% Chance --> Engange in Combat
    else {
      let dmg = randomIntFromInterval(1, 3);
      await damage(dmg);

      await sleep(1000);

      game_text.innerHTML +=
        "<span class='drastic'>You fail to flee.</span>\r\n\r\n";

      await sleep(1000);

      game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n\r\n`;
      update_stats();

      await sleep(1000);

      combat_routine(enemy, enemy_hp, true, enemy_combined_name, false);

      return;
    }
  }

  manage_allow_continue(true);
}

// Combat Routine
async function combat_routine(
  enemy,
  enemy_hp,
  failed_to_flee,
  enemy_combined,
  is_from_small_dungeon
) {
  let d = Math.random();
  let in_combat = true;
  let player_turn = failed_to_flee;
  let enemy_max_hp = enemy_hp;

  await sleep(1000);
  game_text.innerHTML =
    "<span class='combat'>COMBAT</span>\r\n" +
    `[ <span class='enemy'>You vs ${capitalize_first_letters(
      enemy_combined
    )} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;

  while (in_combat) {
    // Seperate
    await sleep(1000);

    // Check for Enemy Death
    if (enemy_hp <= 0) {
      // Win fight
      game_text.innerHTML += `<span class="blessing">You've slain the ${enemy_combined}.</span>\r\n\r\n`;

      let enemy_xp = randomIntFromInterval(
        enemy_determiner(enemy, "xp")[0],
        enemy_determiner(enemy, "xp")[1]
      );
      enemy_xp += Math.floor(steps * 1.25);

      await sleep(1000);

      game_text.innerHTML += `<span class="green">You've earned ${enemy_xp} xp.</span>\r\n`;

      manage_xp(enemy_xp);

      if (!is_from_small_dungeon) {
        manage_allow_continue(true);
      } else {
        in_small_dungeon_combat = false;
      }

      in_combat = false;

      break;
    }

    // Update Stats
    update_stats();

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
            game_text.innerHTML += `<span class="drastic">You miss and deal no damage.</span>\r\n\r\n`;
          }
          // Enemy evades with 50%
          else {
            game_text.innerHTML += `<span class="drastic">${capitalize_first_letters(
              enemy_combined
            )} evaded the attack.</span>\r\n\r\n`;
          }
        }
        // You hit the attack
        else {
          let fist_dmg = randomIntFromInterval(1, 3);
          enemy_hp -= fist_dmg;
          if (enemy_hp <= 0) {
            enemy_hp = 0;
          }

          game_text.innerHTML += `You use your fists.\r\n\r\n`;

          await sleep(1000);

          game_text.innerHTML += `<span class="deal-dmg"> You deal ${fist_dmg} damage. </span>\r\n`;
        }

        await sleep(2000);

        game_text.innerHTML =
          "<span class='combat'>COMBAT</span>\r\n" +
          `[ <span class='enemy'>You vs ${capitalize_first_letters(
            enemy_combined
          )} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;
      }
      // Player has weapons
      else {
        let weapon_to_use = "";
        for (let i = 0; i < inventory.length; i++) {
          awaiting_response = true;
          const item = inventory[i];
          game_text.innerHTML += `<span class="choice">Use ${item}? (${
            item_determiner(item, "dmg")[0]
          }-${item_determiner(item, "dmg")[1]} dmg)</span>\r\n\r\n`;

          // Wait for user input
          manage_input(true);

          while (awaiting_response) {
            await sleep(1);
          }

          manage_input(false);

          if (player_input == "y") {
            weapon_to_use = item;
            break;
          } else if (player_input == "n") {
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
              game_text.innerHTML += `<span class="drastic">You miss and deal no damage.</span>\r\n\r\n`;
            }
            // Enemy evades with 50%
            else {
              game_text.innerHTML += `<span class="drastic">${capitalize_first_letters(
                enemy_combined
              )} evaded the attack.</span>\r\n\r\n\r\n\r\n`;
            }
          }
          // You hit the attack
          else {
            let fist_dmg = randomIntFromInterval(1, 3);
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

          let weapon_dmg = randomIntFromInterval(
            item_determiner(weapon_to_use, "dmg")[0],
            item_determiner(weapon_to_use, "dmg")[1]
          );

          let hit_chance = Math.random();
          // You miss / evade
          if (hit_chance < 0.15) {
            let miss_or_evade_chance = Math.random();
            // Miss the hit with 50%
            if (miss_or_evade_chance < 0.5) {
              game_text.innerHTML += `<span class="drastic">You miss and deal no damage.</span>\r\n\r\n`;
            }
            // Enemy evades with 50%
            else {
              game_text.innerHTML += `<span class="drastic">${capitalize_first_letters(
                enemy_combined
              )} evaded the attack.</span>\r\n\r\n\r\n\r\n`;
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

              game_text.innerHTML += `<span class="dark-red"> ${capitalize_first_letters(
                weapon_to_use
              )} broke. </span>\r\n`;
            }
          }
        }

        await sleep(2000);

        game_text.innerHTML =
          "<span class='combat'>COMBAT</span>\r\n" +
          `[ <span class='enemy'>You vs ${capitalize_first_letters(
            enemy_combined
          )} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;
      }
    }
    // Enemys Turn
    else {
      game_text.innerHTML += `<span class="turn">${capitalize_first_letters(
        enemy
      )}'s turn:</span>\r\n\r\n`;

      let dmg = randomIntFromInterval(
        enemy_determiner(enemy, "dmg")[0],
        enemy_determiner(enemy, "dmg")[1]
      );

      // Scale Enemy DMG with Distance Traveled
      dmg += Math.floor(steps / 8);

      await sleep(1000);

      game_text.innerHTML += `${capitalize_first_letters(enemy)} attacks.\r\n\r\n`;

      let miss_chance = Math.random();
      // Enemy misses with 15% Chance
      if (miss_chance < 0.15) {
        let miss_or_evade_chance = Math.random();
        // Miss with 50% Chance
        if (miss_or_evade_chance < 0.5) {
          await sleep(1000);

          game_text.innerHTML += `<span class="blessing">${capitalize_first_letters(
            enemy_combined
          )} misses and deals no damage.</span>\r\n\r\n`;
        }
        // Player evades with 50%
        else {
          await sleep(1000);

          game_text.innerHTML += `<span class="blessing">You evade the attack.</span>\r\n\r\n`;
        }
      }
      // Enemy hits
      else {
        await sleep(1000);

        game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n\r\n`;

        await damage(dmg);
        update_stats();

        // if player will die break loop
        if (hp <= 0) {
          in_combat = false;
          break;
        }
      }

      await sleep(2000);

      game_text.innerHTML =
        "<span class='combat'>COMBAT</span>\r\n" +
        `[ <span class='enemy'>You vs ${capitalize_first_letters(
          enemy_combined
        )} (${enemy_hp}/${enemy_max_hp} hp)</span> ]\r\n\r\n`;
    }
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