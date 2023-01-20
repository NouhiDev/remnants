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
function region_update(new_places, new_events, new_enemies) {
  places_table = new_places;
  events_table = new_events;
  enemies = new_enemies;
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
  await sleep(1000);
  $(".loader").fadeOut(1000);
  zoom();
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

// Updates the players stats
function update_stats() {
  stats_text.innerHTML =
    // Health
    `[ <span class="health">Health: ${hp}/${max_hp}</span> | ` +
    // Distance
    `<span class="distance">Distance traveled: ${steps * 100}m</span> | ` +
    // Gold
    `<span class="gold">Gold: ${gold}</span> | ` +
    // Region
    `<span class="region">Region: ${region}</span> | ` +
    // Level
    `<span class="lvl">LVL: ${lvl}</span> | ` +
    // XP
    `<span class="xp">XP: ${xp}/${max_xp}</span> | ` +
    // Mana
    `<span class="mana">Mana: ${mana}/${max_mana}</span>]\r\n`;

  // Auto Update Inventory
  display_inventory();
}

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
}

// Helper Function to Inventory Display
function add_to_inventory_txt(item, index, array) {
  inventory_txt += capitalize_first_letters(item) + ", ";
}

// XP Managing
async function manage_xp(amount) {
  xp += amount;
  while (xp >= max_xp) {
    game_text.innerHTML += `\r\n<span class="lvl">You leveled up!</span>\r\n`;

    // Increase LVL
    lvl++;

    // Increase Max XP
    max_xp += lvl * 20;

    // Increase Max HP
    max_hp += lvl * 5;

    // Increase Max Mana
    max_mana += lvl * 5;
    mana = max_mana;

    xp = Math.abs(max_xp - xp);
    hp = max_hp;

    // Increase Inventory Item Cap
    inventory_cap += 1;
  }
  update_stats();
}
