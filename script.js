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
var stats_text = document.getElementById("stats-text")

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
var max_hp = 100
var hp = 100;
var steps = 0;
var gold = 0;
var region = "Forest";

// Regions
var regions = ["Grasslands", "Lockwood Village", "Easthaven", "Farlands"];

// Places
places_table = ["grass patch", "hut", "camp", "cave" ,"stone arch", "field of red mushrooms", "grand tree", "shrine", "temple"];

// Events
events_table = ["nothing", "chest", "enemy", "wishing well"];

// Loot Tables
chest_loot_table = ["dagger", "axe", "sword", "bow", "gold", "nothing"]

// Enemies
enemies = ["spider", "wolf", "goblin", "gnome"]

// Checks for region switches
async function check_region_switch(distance) {
    if (distance == 0) {
        game_text.innerHTML += `[!] You wake up in a forest. [!]\r\n`
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
    stats_text.textContent = "";
    stats_text.textContent += `[Health: ${hp}/${max_hp} | Distance traveled: ${steps * 100}m | Gold: ${gold} | Region: ${region}]\r\n`
    display_inventory();
}

// Displays the players inventory
function display_inventory() {
    inventory_txt = "[Inventory: ";
    inventory.forEach(add_to_inventory_txt);
    inventory_txt = inventory_txt.substring(0,inventory_txt.length-2);
    stats_text.textContent += inventory_txt + "]\r\n";
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
        if (vowels.includes(event[0])) {
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
        case "wishing well":
            game_text.textContent += `Make a wish?\r\n (y/n) \r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // MAKES WISH
            if (player_input == "y") {
                game_text.textContent += "You make a wish.\r\n";
                make_wish();
            }
            // DOESNT MAKE WISH
            else if (player_input == "n") {
                game_text.textContent += "You do not make a wish and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT MAKE WISH
            else {
                game_text.textContent += "You do not make a wish and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
        // ENEMY
        case "enemy":
            enemy_encounter();
            break;
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

                    game_text.textContent += "[!] It was a trap. [!]\r\n";

                    await sleep(1000);

                    game_text.textContent += `[!] You took ${dmg} damage.[!]\r\n`;
                    manage_allow_continue(true);
                }
                
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

// Make a wish function
async function make_wish() {
    await sleep(1000);
    let d = Math.random();
    // Success
    if (d <= 0.1) {
        max_hp += 10;
        hp = max_hp;
        game_text.textContent += "Your prayers have been heard.\r\n";

        await sleep(1000);

        game_text.textContent += "[!] Your max hp has increased by 10. [!]\r\n";

        await sleep(1000);

        game_text.textContent += `Your current max hp is ${max_hp}.\r\n`;
    }

    // Fail
    else {
        damage(20);
        game_text.textContent += "Your prayers have been rejected.\r\n";

        await sleep(1000);

        game_text.textContent += "You take 20 damage.\r\n";
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
        game_text.textContent += "You died.";
    }
}

// Enemy Encounter
async function enemy_encounter() {
    // Setup Enemy
    let enemy = enemies.sample();
    let enemy_hp = randomIntFromInterval(10,30);

    game_text.textContent += `[!] You encounter a ${enemy}. [!]\r\n`;


    await sleep(1000);

    game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp} hp. [!]\r\n`;

    game_text.textContent += `Engage in combat?\r\n (y/n) \r\n`;

    // Wait for user input
    manage_input(true);

    while(awaiting_response) {
        await sleep(1);
    }

    manage_input(false);

    // Engages
    if (player_input == "y") {
        game_text.textContent += "You engange in combat.\r\n";

        await sleep(1000);

        combat_routine(enemy, enemy_hp);
        return;
    }
    // Tries to flee
    else if (player_input == "n") {
        game_text.textContent += "You attempt to flee.\r\n";
        let d = Math.random();
        // Flee Successfully
        if (d < 0.33) {
            await sleep(1000);

            game_text.textContent += "You successfully flee.\r\n";

            manage_allow_continue(true);
        }
        // Fail --> Engange in Combat
        else {
            let dmg = randomIntFromInterval(1,10);
            damage(dmg);

            await sleep(1000);

            game_text.textContent += "[!] You fail to flee and trip on branch. [!]\r\n";

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage.[!]\r\n`;

            await sleep(1000);

            combat_routine(enemy, enemy_hp)

            return;
        }
    }
    // WRONG INPUT --> DOESNT OPEN CHEST
    else {
        game_text.textContent += "You attempt to flee.\r\n";
        let d = Math.random();
        // Flee Successfully
        if (d < 0.33) {
            await sleep(1000);

            game_text.textContent += "You successfully flee.\r\n";

            manage_allow_continue(true);

            return;
        }
        // Fail --> Engange in Combat
        else {
            let dmg = randomIntFromInterval(1,10);
            damage(dmg);

            await sleep(1000);

            game_text.textContent += "[!] You fail to flee and trip on branch. [!]\r\n";

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage.[!]\r\n`;

            await sleep(1000);

            combat_routine(enemy, enemy_hp)

            return;
        }
    }

    manage_allow_continue(true);
}

// Combat Routine
async function combat_routine(enemy, enemy_hp) {
    let d = Math.random();
    let in_combat = true;
    let player_turn = false;
    
    while(in_combat) {
        // Seperate
        await sleep(1000);
        seperator();

        // Check for enemy hp
        if (enemy_hp <= 0) {
            // Win fight
            game_text.textContent += `[!] You've slain the ${enemy}. [!]\r\n`;

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
            await sleep(1000);

            game_text.textContent += `[!] Player's turn. [!]\r\n`;

            await sleep(1000);

            // If no weapons --> use fists
            if (inventory.length >= 0) {
                let fist_dmg = randomIntFromInterval(1,5);
                enemy_hp -= fist_dmg;

                game_text.textContent += `[!] You use your fists. [!]\r\n`;

                await sleep(1000);

                game_text.textContent += `[!] You deal ${fist_dmg} damage. [!]\r\n`;

                await sleep(1000);

                game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp} hp. [!]\r\n`;
            }
        }
        // Enemys Turn
        else {
            await sleep(1000);

            game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)}'s turn. [!]\r\n`;

            let dmg = randomIntFromInterval(1,15);
            
            // if player will die break loop
            if (hp <= 0) {
                in_combat = false;
                break;
            }

            damage(dmg);

            await sleep(1000);

            game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} attacks. [!]\r\n`;

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage. [!]\r\n`;
        }
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
            //game_text.textContent += "...\r\n";
            continue;
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
    display_stats();

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

// Updates Time of Update
function update_time() {
    let subtitle = document.getElementById("123");
    let current_date = new Date();
    let time_str = `| [${current_date.getDay()}.${current_date.getMonth()+1}.${current_date.getFullYear()}] [${current_date.getHours()}:${current_date.getMinutes()}:${current_date.getSeconds()}]`;
    subtitle.textContent += time_str;
}

update_time();

// Regularly update to auto scroll to end of div
window.setInterval(function() {
    var elem = document.getElementById('game');
    elem.scrollTop = elem.scrollHeight;
  }, 10);