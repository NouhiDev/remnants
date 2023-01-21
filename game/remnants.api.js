//██████╗░███████╗███╗░░░███╗███╗░░██╗░█████╗░███╗░░██╗████████╗░██████╗
//██╔══██╗██╔════╝████╗░████║████╗░██║██╔══██╗████╗░██║╚══██╔══╝██╔════╝
//██████╔╝█████╗░░██╔████╔██║██╔██╗██║███████║██╔██╗██║░░░██║░░░╚█████╗░
//██╔══██╗██╔══╝░░██║╚██╔╝██║██║╚████║██╔══██║██║╚████║░░░██║░░░░╚═══██╗
//██║░░██║███████╗██║░╚═╝░██║██║░╚███║██║░░██║██║░╚███║░░░██║░░░██████╔╝
//╚═╝░░╚═╝╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚═╝░░╚══╝░░░╚═╝░░░╚═════╝░

//  ░█████╗░██████╗░██╗
//  ██╔══██╗██╔══██╗██║
//  ███████║██████╔╝██║
//  ██╔══██║██╔═══╝░██║
//  ██║░░██║██║░░░░░██║
//  ╚═╝░░╚═╝╚═╝░░░░░╚═╝

// Stores the different text containers
var game_text = document.getElementById("game-text");
var stats_text = document.getElementById("stats-text");
var region_text = document.getElementById("region-text");

// Determines whether the "YES" / "NO" buttons can be pressed
var allow_input = false;
// Determines whether the green "PROCEED" button can be pressed
var allow_continue = true;
// Stores either "y" or "n"
var player_input = "";

// Enables the timer on default
var timer_active = true;

// Handles Small Dungeon Combat
var in_small_dungeon_combat = false;

// While this bool is set to true, the game is stuck in an infinite loop waiting for a response (y/n)
var awaiting_response = true;

forwards_var = [
  "You delve deeper.",
  "You continue onward.",
  "You proceed ahead.",
  "You advance.",
  "You tread ahead.",
  "You venture further.",
];

across_var = [
  "You come across",
  "You stumble upon",
  "You happen upon",
  "You run into",
];

vowels = ["a", "e", "i", "o", "u"];

// ─█▀▀█ ░█▀▀█ ▀▀█▀▀ 　 ░█▀▄▀█ ─█▀▀█ ░█▄─░█ ─█▀▀█ ░█▀▀█ ░█▀▀▀ ░█▀▄▀█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀
// ░█▄▄█ ░█─── ─░█── 　 ░█░█░█ ░█▄▄█ ░█░█░█ ░█▄▄█ ░█─▄▄ ░█▀▀▀ ░█░█░█ ░█▀▀▀ ░█░█░█ ─░█──
// ░█─░█ ░█▄▄█ ─░█── 　 ░█──░█ ░█─░█ ░█──▀█ ░█─░█ ░█▄▄█ ░█▄▄▄ ░█──░█ ░█▄▄▄ ░█──▀█ ─░█──

// #region

// Act Update
function act_update(act_index) {
  $.getJSON(
    "https://opensheet.elk.sh/1Mqmoa5uMpg6ndF7OKaH3dHbyuXt2puz_HPsZje9hotE/1",
    async function (data) {
      let act_data = data[act_index];
      let act_description = act_data.act_desc;
      let act_title = act_data.act_title;
      let act_story = act_data.act_story;
      let act_action = act_data.act_action;

      // Updates Act Description
      act_desc_update(act_description, act_index);

      // Updates Game Text
      act_story_update(act_story, act_title, act_action, act_index);

      // Pauses Game
      await await_input();

      game_text.innerHTML += `\r\n\r\n`;
      player_input == "y"
        ? (game_text.innerHTML += "You wake up.")
        : (game_text.innerHTML += "You can't change fate.");

      manage_allow_continue(true);
    }
  );
}

// Act Description Update
function act_desc_update(act_desc, act_index) {
  region_text.innerHTML =
    `<span class="red">[Act ${act_index + 1}] </span>` + act_desc;
}

// Act Story Update
function act_story_update(act_story, act_title, act_action, act_index) {
  game_text.innerHTML =
    `<span class="light-blue">ACT ${
      act_index + 1
    }: ${act_title}</span>\r\n\r\n` +
    `${act_story}` +
    `\r\n\r\n` +
    `${act_action}` +
    `\r\n\r\n` +
    "<span class='choice'>Continue?</span>";
}

// Region Update
function region_update(
  new_places,
  new_events,
  new_enemies,
  new_enemy_loot_table
) {
  places_table = new_places;
  events_table = new_events;
  enemies = new_enemies;
  enemy_loot_table = new_enemy_loot_table;
}

// Display Forwards
async function forwards() {
  game_text.innerHTML += `${forwards_var.sample()}` + "\r\n\r\n";
  await sleep(1000);
  manage_places(places_table, events_table);
}

// #endregion

// ░█▀▀█ ░█─░█ ▀▀█▀▀ ▀▀█▀▀ ░█▀▀▀█ ░█▄─░█ ░█▀▀▀█
// ░█▀▀▄ ░█─░█ ─░█── ─░█── ░█──░█ ░█░█░█ ─▀▀▀▄▄
// ░█▄▄█ ─▀▄▄▀ ─░█── ─░█── ░█▄▄▄█ ░█──▀█ ░█▄▄▄█

// #region

// Yes Button
function yes_btn() {
  player_input = "y";
  awaiting_response = false;
}

// No Button
function no_btn() {
  player_input = "n";
  awaiting_response = false;
}

// Colorizes or decolorizes the "yes" and "no" buttons
function changeBtnClrs(colorize) {
  var r = document.querySelector(":root");
  if (colorize) {
    r.style.setProperty("--btn-color", "rgb(255, 219, 146)");
    r.style.setProperty("--btn-zoom", "1.1");
  } else {
    r.style.setProperty("--btn-color", "#8E8E8E");
    r.style.setProperty("--btn-zoom", "1");
  }
}

// Proceed Button
function new_day() {
  if (allow_continue) {
    main_loop();
    manage_allow_continue(false);
  }
}

// Colorizes or decolorizes the "proceed" button
function changeProceedBtnClrs(colorize) {
  var r = document.querySelector(":root");
  if (colorize) {
    r.style.setProperty("--p-btn-color", "#6aff4d");
    r.style.setProperty("--p-btn-zoom", "1.1");
  } else {
    r.style.setProperty("--p-btn-color", "#8E8E8E");
    r.style.setProperty("--p-btn-zoom", "1");
  }
}

// Back Button
function back_btn() {
  location.href = "https://nouhi.dev/";
}

// #endregion

// ▀█▀ ░█▄─░█ ░█▀▀█ ░█─░█ ▀▀█▀▀
// ░█─ ░█░█░█ ░█▄▄█ ░█─░█ ─░█──
// ▄█▄ ░█──▀█ ░█─── ─▀▄▄▀ ─░█──

// #region

// Enables or disables the "yes" or "no" buttons
function manage_input(enable_input) {
  changeBtnClrs(enable_input);
  allow_input = enable_input;
}

async function await_input() {
  // Await Reponse (In case it was forgotten in game.js)
  awaiting_response = true;

  // Enable choice buttons
  manage_input(true);

  // Pause Game
  while (awaiting_response) {
    await sleep(100);
  }

  // Disable choice buttons
  manage_input(false);
}

// Get Player Response
function player_response() {
  player_input == "y" ? true : false;
}

// Allow to continue to new day
function manage_allow_continue(enable_continue) {
  changeProceedBtnClrs(enable_continue);
  allow_continue = enable_continue;
}

// #endregion

// ░█▀▀▀█ ▀▀█▀▀ ─█▀▀█ ▀▀█▀▀ ░█▀▀▀█
// ─▀▀▀▄▄ ─░█── ░█▄▄█ ─░█── ─▀▀▀▄▄
// ░█▄▄▄█ ─░█── ░█─░█ ─░█── ░█▄▄▄█

// #region

// Updates the players stats
function update_stats() {
  // Stats
  stats_text.innerHTML =
    // Health
    `[ <span class="health">${hp}/${max_hp} HP</span> | ` +
    // Distance
    `<span class="distance">Distance: ${steps * 100}m</span> | ` +
    // Gold
    `<span class="gold">${gold} G</span> | ` +
    // Region
    `<span class="region">Region: ${current_region}</span> | ` +
    // Level
    `<span class="lvl">LVL: ${lvl}</span> | ` +
    // XP
    `<span class="xp">${xp}/${max_xp} XP</span> | ` +
    // Mana
    `<span class="mana">${mana}/${max_mana} MANA</span>]\r\n`;

  stats_text.innerHTML +=
    // Health
    `[ <span class="health">Vitality: ${vitality}</span> | ` +
    // Distance
    `<span class="mana">Intelligence: ${intelligence}</span> | ` +
    // Gold
    `<span class="xp">Luck: ${luck}</span> | ` +
    // Region
    `<span class="gold">Strength: ${strength}</span> ]\r\n`;

  // Auto Update Inventory
  display_inventory();
}

// XP Managing
async function manage_xp(amount) {
  xp += amount;
  while (xp >= max_xp) {
    // Level Up
    await level_up();
  }
  update_stats();
}

async function level_up() {
  await sleep(1000);

  game_text.innerHTML += `<span class="lvl">You leveled up!</span>\r\n\r\n`;

  // Increase LVL
  lvl++;

  // Increase Max XP
  max_xp += lvl * 20;

  let stats = ["vitality", "intelligence", "luck", "strength"];

  let chosen_stat = "";

  while (chosen_stat == "") {
    await sleep(1000);
    for (let i = 0; i < stats.length; i++) {
      game_text.innerHTML += `<span class="choice">Level up ${capitalize_first_letters(
        stats[i]
      )}?</span>\r\n\r\n`;

      await await_input();

      if (player_input == "y") {
        chosen_stat = stats[i];
        break;
      } else {
        continue;
      }
    }
  }

  switch (chosen_stat) {
    case "vitality":
      vitality++;
      max_hp += vitality * 8;

      await sleep(1000);

      game_text.innerHTML += `You leveled up Vitality and increased your maximal hp.\r\n\r\n`;
      break;
    case "intelligence":
      intelligence++;
      max_mana += intelligence * 10;

      await sleep(1000);

      game_text.innerHTML += `You leveled up Intelligence and increased your maximal mana.\r\n\r\n`;
      break;
    case "luck":
      luck++;

      await sleep(1000);

      game_text.innerHTML += `You leveled up Luck and increased your favorable chances.\r\n\r\n`;
      break;
    case "strength":
      strength++;
      inventory_cap += strength;

      await sleep(1000);

      game_text.innerHTML += `You leveled up Strength and can carry more items now.\r\n\r\n`;
      break;
  }

  // Set Values
  xp = Math.abs(max_xp - xp);
  hp = max_hp;
}

// Take Damage
async function damage(amount) {
  update_stats();
  hp -= amount;
  if (hp <= 0) {
    alive = false;
    game_text.innerHTML += `<span class="dmg">You died.</span>`;
    update_stats();
    throw new Error();
  }
}

// #endregion

// ▀█▀ ░█▄─░█ ░█──░█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀ ░█▀▀▀█ ░█▀▀█ ░█──░█
// ░█─ ░█░█░█ ─░█░█─ ░█▀▀▀ ░█░█░█ ─░█── ░█──░█ ░█▄▄▀ ░█▄▄▄█
// ▄█▄ ░█──▀█ ──▀▄▀─ ░█▄▄▄ ░█──▀█ ─░█── ░█▄▄▄█ ░█─░█ ──░█──

// #region

// Inventory

// Displays the Players Inventory
function display_inventory() {
  // Inventory String Beginning
  inventory_txt = "[ Inventory: ";
  // Inventory Iteration
  inventory.forEach(add_to_inventory_txt);
  // Inventory Item Addition
  inventory_txt = inventory_txt.substring(0, inventory_txt.length - 2);
  // Inventory String Ending
  stats_text.innerHTML += inventory_txt + " ]\r\n";

  // Automatically center Stats
  stats = document.getElementById("stats");
  vertical_shift = stats.scrollHeight / 10;
  stats.scrollTo(0, vertical_shift);

  // Deprecated: display_spell_inventory();
}

// Helper Function to Inventory Display
function add_to_inventory_txt(item) {
  inventory_txt += capitalize_first_letters(item) + ", ";
}

function display_spell_inventory() {
  // Inventory String Beginning
  spell_inventory_txt = "[ Spells: ";
  // Inventory Iteration
  spell_inventory.forEach(add_to_spell_inventory_txt);
  // Inventory Item Addition
  spell_inventory_txt = spell_inventory_txt.substring(
    0,
    spell_inventory_txt.length - 2
  );
  // Inventory String Ending
  stats_text.innerHTML += spell_inventory_txt + " ]\r\n";
}

// Helper Function to Inventory Display
function add_to_spell_inventory_txt(item) {
  spell_inventory_txt += capitalize_first_letters(item) + ", ";
}

// Open Loot Container
async function open_loot_container(
  loot_table,
  amount_of_items_min,
  amount_of_items_max,
  is_enemy_drop
) {
  let amount_of_items = randomIntFromInterval(
    amount_of_items_min,
    amount_of_items_max
  );

  for (let i = 0; i < amount_of_items; i++) {
    await sleep(1000);

    // Choose random item from loot table
    item = loot_table.sample();

    // Healing Potion
    if (item == "healing potion") {
      let amt = randomIntFromInterval(10, Math.floor(max_hp / 2));

      hp += amt;
      if (hp >= max_hp) {
        hp = max_hp;
      }

      game_text.innerHTML += `You found a healing potion and drank it.\r\n`;

      await sleep(1000);

      game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
      update_stats();

      await sleep(1000);
      continue;
    }

    // Mana Potion
    if (item == "mana potion") {
      let amt = randomIntFromInterval(10, Math.floor(max_mana / 1.5));

      mana += amt;
      if (mana >= max_mana) {
        mana = max_mana;
      }

      game_text.innerHTML += `You found a mana potion and drank it.\r\n`;

      await sleep(1000);

      game_text.innerHTML += `<span class="heal">You channeled ${amt} mana.</span>\r\n\r\n`;
      update_stats();

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
      game_text.innerHTML += `You found ${correct_article(
        item
      )} ${item} but you already have one.\r\n`;
      continue;
    }

    // Add item to inventory
    game_text.innerHTML += `You found ${correct_article(item)} ${item}.\r\n`;
    await add_to_inventory(item);
  }

  await sleep(1000);

  if (!is_enemy_drop) {
    game_text.innerHTML += `\r\nYou finish looting.\r\n`;
  } else {
    game_text.innerHTML += "";
  }
}

async function add_to_inventory(item) {
  // If Weapon Cap is not reached
  if (inventory.length < inventory_cap) {
    // Add Item
    inventory.push(item);
  } else {
    // Ask to replace Items in Inventory
    for (let i = 0; i < inventory.length; i++) {
      await sleep(1000);
      game_text.innerHTML += `<span class="choice">Replace ${capitalize_first_letters(
        inventory[i]
      )} with ${capitalize_first_letters(item)}?</span>\r\n\r\n`;

      await await_input();

      // Replace Inventory Item with new Item
      if (player_input == "y") {
        await sleep(1000);
        game_text.innerHTML += `You replace ${capitalize_first_letters(
          inventory[i]
        )} with ${capitalize_first_letters(item)}.\r\n`;
        inventory.pop(inventory[i]);
        inventory.push(item);
        return;
      }
      // Don't replace Inventory Item with new Item
      else {
        continue;
      }
    }
    // No Item was chosen
    await sleep(1000);

    game_text.innerHTML += `You throw the ${item} away.\r\n`;
  }
}

// #endregion

//  █▀▄▀█ ▀█▀ ░█▀▀▀█ ░█▀▀█
// ░█░█░█ ░█─ ─▀▀▀▄▄ ░█───
// ░█──░█ ▄█▄ ░█▄▄▄█ ░█▄▄█

// #region

// Article Determination
// This function determines whether to use "an" or "a" before a given word.
// It takes in a single string parameter, and returns "an" if the first letter of the word is a vowel,
// otherwise it returns "a".
function correct_article(input) {
  return vowels.includes(input[0]) ? "an" : "a";
}

// Capitilization
// This function capitalizes the first letter of each word in a given string.
// It takes in a single string parameter, and returns the modified string with
// the first letters of each word capitalized.
function capitalize_first_letters(input) {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Timer Functionality
function start_timer() {
  if (timer_active) {
    var timer = document.getElementById("timer").innerHTML;
    var arr = timer.split(":");
    var hour = arr[0];
    var min = arr[1];
    var sec = arr[2];

    if (sec == 59) {
      if (min == 59) {
        hour++;
        min = 0;
        if (hour < 10) hour = "0" + hour;
      } else {
        min++;
      }
      if (min < 10) min = "0" + min;
      sec = 0;
    } else {
      sec++;
      if (sec < 10) sec = "0" + sec;
    }
  }

  document.getElementById("timer").innerHTML = `${hour}:${min}:${sec}`;
  setTimeout(start_timer, 1000);
}

// Regularly update to auto scroll to end of div
window.setInterval(function () {
  var elem = document.getElementById("game");
  elem.scrollTop = elem.scrollHeight;
}, 10);

// Zooms out 20% on initialization
function zoom() {
  document.body.style.zoom = "80%";
  document.getElementById("stats-text").style.fontSize = "19px";
}

// Manages Background Music
let audio_muted = true;
function bgm() {
  let audio_element = document.getElementById("bg_loop");
  let audio_btn = document.getElementById("bgmbtn");
  audio_muted = !audio_muted;

  audio_element.muted = audio_muted;
  audio_element.volume = 0.1;

  if (audio_muted) {
    audio_btn.style.filter = "grayscale(1)";
  } else {
    audio_element.play();
    audio_btn.style.filter = "grayscale(0)";
  }
}

// Loader Fading
$(window).on("load", async function () {
  zoom();
  await sleep(1000);
  $(".loader").fadeOut(1000);
  sleep(1000).then(() => $(".content").fadeIn(1000));
});

// Adds delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Random Between Two Constants
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Picks random array object
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

// Gold Determiner
function det_gold(entity) {
  switch (entity) {
    case "traveler":
      return [5, 40];
    case "trappedchest":
      return [30, 100];
  }
}

// #endregion
