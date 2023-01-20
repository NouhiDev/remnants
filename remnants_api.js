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

// Article Determination
// This function determines whether to use "an" or "a" before a given word.
// It takes in a single string parameter, and returns "an" if the first letter of the word is a vowel,
// otherwise it returns "a".
vowels = ["a", "e", "i", "o", "u"];

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

// #region Loader

$(window).on("load", async function () {
  await sleep(1000);
  $(".loader").fadeOut(1000);
  zoom();
  delay(1000).then(() => $(".content").fadeIn(1000));
});

// Adds delay
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// #endregion

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

// Proceed Button
function new_day() {
  if (allow_continue) {
    main_loop();
    manage_allow_continue(false);
  }
}

// Display Forwards
async function forwards() {
  game_text.innerHTML += `${forwards_var.sample()}` + "\r\n\r\n";
  await sleep(1000);
  manage_events(places_table, events_table);
}
