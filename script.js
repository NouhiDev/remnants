$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1).then(() => $(".content").fadeIn(1000));
})

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

// Game
var game_text = document.getElementById("game-text");

var allow_input = false;
var allow_continue = true;
var player_input = "";

var awaiting_response = true;

// Vowels
var vowels = ["a", "e", "i", "o", "u"]

// Inventory
var inventory = [];
var inventory_txt = "[Inventory: ";

// Stats
var alive = true;
var hp = 100;
var steps = 0;
var gold = 0;
var region = "Forest";

// Regions
var regions = ["Grasslands", "Lockwood Village", "Easthaven", "Farlands"];

// Places
places_table = ["grass patch", "hut", "camp", "cave" ,"staircase"];

// Events
events_table = ["nothing", "chest"];

// Loot Tables
chest_loot_table = ["sword", "bow", "gold", "nothing"]

// Checks for region switches
async function check_region_switch(distance) {
    if (distance == 0) {
        game_text.textContent += "[!] You wake up in a forest. [!]\r\n"
    }

    if (distance == 10) {
        game_text.textContent += `[!] You have reached the ${regions[0]}. [!]\r\n`
        region = regions[0];
    }
    else if (distance == 20) {
        game_text.textContent += `[!] You have reached the ${regions[1]}. [!]\r\n`
        region = regions[1];
    }
    else if (distance == 30) {
        game_text.textContent += `[!] You have reached the ${regions[2]}. [!]\r\n`
        region = regions[2];
    }
    else if (distance == 40) {
        game_text.textContent += `[!] You have reached the ${regions[3]}. [!]\r\n`
        region = regions[3];
    }
}

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
    game_text.textContent += "-------------------------------------------------------------------------------------\r\n";
}

// Displays the players stats
function display_stats() {
    game_text.textContent += `[Health: ${hp}/100 | Distance traveled: ${steps * 100}m | Gold: ${gold} | Region: ${region}]\r\n`
}

// Displays the players inventory
function display_inventory() {
    inventory_txt = "[Inventory: ";
    inventory.forEach(add_to_inventory_txt);
    inventory_txt = inventory_txt.substring(0,inventory_txt.length-2);
    game_text.textContent += inventory_txt + "]\r\n";
}

// Helper inventory display function
function add_to_inventory_txt(item, index, array) {
    inventory_txt += capitalizeFirstLetter(item) + ", ";
}

// Display Forwards
function forwards() {
    game_text.textContent += "You walk forward.\r\n";
}

// Clear game text
function clear_game_text() {
    game_text.textContent = "";
}

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

    game_text.textContent += `You come across ${article} ${place}.\r\n`;

    await sleep(1000);

    // Events
    
    // Chooses event
    let event = events.sample();

    // Event has been chosen
    if (event != "nothing") {
        // Determine correct article
        if (vowels.includes(place[0])) {
            article = "an";
        }
        else {
            article = "a";
        }

        game_text.textContent += `You find ${article} ${event}.\r\n`;
        
        await sleep(1000);

        manage_sub_events(event);
    }
    // No Event has been chosen
    else {
        article = "";
        game_text.textContent += `You find ${article} ${event}.\r\n`;
        manage_allow_continue(true);
    }
}

async function manage_sub_events(sub_event) {
    awaiting_response = true;

    switch(sub_event) {
        // CHEST
        case "chest":
            game_text.textContent += `Open chest?\r\n (y/n) \r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);
            
            // OPENS CHEST
            if (player_input == "y") {
                game_text.textContent += "You open the chest.\r\n";
                open_loot_container(chest_loot_table, randomIntFromInterval(1, 5))
            }
            // DOESNT OPEN CHEST
            else if (player_input == "n") {
                game_text.textContent += "You do not open the chest and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT OPEN CHEST
            else {
                game_text.textContent += "You do not open the chest and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
    }

}

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
        item = chest_loot_table.sample();

        // Determine correct article
        if (vowels.includes(item[0])) {
            article = "an";
        }
        else {
            article = "a";
        }

        // Gold
        if (item == "gold") {
            let amt = randomIntFromInterval(1, 250);
            gold += amt;
            game_text.textContent += `You found ${amt} gold.\r\n`;

            await sleep(1000);

            game_text.textContent += `You're currently holding ${gold} gold.\r\n`;

            await sleep(1000);
            break;
        }

        // Nothing
        if (item == "nothing") {
            if (amount_of_items == 1) {
                game_text.textContent += "The chest was empty.\r\n";
            }
            game_text.textContent += "The chest was empty.\r\n";
            break;
        }

        // Check if item is already in inventory
        if (inventory.includes(item)) {
            game_text.textContent += `You found ${article} ${item} but you already have one.\r\n`
            break;
        }

        // Add item to inventory
        inventory.push(item);
        game_text.textContent += `You found ${article} ${item}.\r\n`
      }

      await sleep(1000);

      game_text.textContent += `You finished looting the chest.\r\n`
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


// Main Game Loop (MGL)
async function main_loop() {
    clear_game_text();
    
    // Check if player is alive
    if (!alive) {
      return;
    }
    
    // Stat Displays
    seperator();
    display_stats();
    display_inventory();
    seperator();

    // Game Events
    check_region_switch(steps);
    await sleep(1000);
    forwards();
    await sleep(1000);
    manage_events(places_table, events_table);
    steps++;
}

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

function new_day() {
    if (allow_continue) {
        main_loop();
        manage_allow_continue(false);
    }
}