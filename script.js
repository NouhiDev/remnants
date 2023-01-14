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
var xp = 0;
var max_xp = 100;
var lvl = 0;
var region = "Forest";

// Regions
var regions = ["Lockwood Village", "Eastport", "Ocean", "Rocky Shores"];

// Places
places_table = ["grass patch", "hut", "camp", "cave" ,"stone arch", "field of red mushrooms", "grand tree", "shrine", "temple"];

lockwood_village_places_table = ["abandonend house", "abandonend church", "abandonend chapel", 
"abandonend town hall", "abandonend tunnel", "abandonend barn", "abandonend stable", "abandonend manor"]

eastport_places_table = ["abandonend ship", "broken ship", "abandonend warehouse", "abandonend dock", "open container"]

// Events
events_table = ["nothing", "chest", "enemy", "wishing well"];

lockwood_village_events_table = ["nothing", "chest", "enemy", "merchant"] //NEW: MERCHANT

eastport_places_events_table = ["cargo", "enemy", "nest", "nothing"] // NEW: CARGO, NEST

// Loot Tables
chest_loot_table = ["dagger", "axe", "sword", "bow", "healing potion", "gold", "nothing"]
cargo_loot_table = ["halberd", "great axe", "axe", "sword", "claymore", "healing potion", "gold", "gold"]

// Enemies
enemies = ["spider", "wolf", "goblin", "gnome"]
lockwood_village_enemies = []
eastport_enemies = ["humanoid creature", "indiscernible creature"]


// Checks for region switches
async function check_region_switch(distance) {
    if (distance == 0) {
        game_text.innerHTML += `[!] You wake up in a dense forest, disoriented and confused. You realize that you have no memory of how you got here or what has happened to the world around you. You see a clearing ahead. [!]\r\n`
        seperator();
    }

    if (distance == 10) {
        game_text.textContent += `[!] As you make your way through the forest, you come across an abandoned village: Lockwood Village. The buildings are in ruins, and there are no signs of life.  [!]\r\n`
        region = regions[0];
        places_table = lockwood_village_places_table;
        events_table = lockwood_village_events_table;
        seperator();

    }
    else if (distance == 20) {
        game_text.textContent += `[!] Heading out of the abandoned village, you make your way towards a port, looking for a ship that may help you. However, as you approach, you realize the port is 'infected'. [!]\r\n`
        region = regions[1];
        places_table = eastport_places_table;
        events_table = eastport_places_events_table;
        seperator();
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
    game_text.textContent += "-------------------------------------------------------------------------------------\r\n";
}

// Prints out a seperator
function short_seperator() {
    game_text.textContent += "---\r\n";
}

// #endregion

// Displays the players stats
function display_stats() {
    stats_text.textContent = "";
    stats_text.textContent += `[Health: ${hp}/${max_hp} | Distance traveled: ${steps * 100}m | Gold: ${gold} | Region: ${region} | LVL: ${lvl} | XP: ${xp}/${max_xp}]\r\n`
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
    short_seperator();
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

    short_seperator();

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

    short_seperator();
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
            game_text.textContent += `Loot cargo?\r\n (y/n) \r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);
            
            // OPENS CARGO
            if (player_input == "y") {
                game_text.textContent += "You take a look at the cargo.\r\n";
                let d = Math.random();
                // Open Cargo Successfully
                if (d < 0.8) {
                    open_loot_container(cargo_loot_table, randomIntFromInterval(3, 10))
                }
                // Cargo is trap
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
            // DOESNT OPEN CARGO
            else if (player_input == "n") {
                game_text.textContent += "You do not open the cargo and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT OPEN CARGO
            else {
                game_text.textContent += "You do not open the cargo and move on.\r\n";
                manage_allow_continue(true);
            }
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

        combat_routine(enemy, enemy_hp, false);
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
            let dmg = randomIntFromInterval(1,3);
            damage(dmg);

            await sleep(1000);

            game_text.textContent += "[!] You fail to flee and trip on a branch. [!]\r\n";

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage.[!]\r\n`;

            await sleep(1000);

            combat_routine(enemy, enemy_hp, true)

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
            let dmg = randomIntFromInterval(1,3);
            damage(dmg);

            await sleep(1000);

            game_text.textContent += "[!] You fail to flee and trip on a branch. [!]\r\n";

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage. [!]\r\n`;

            await sleep(1000);

            combat_routine(enemy, enemy_hp, true)

            return;
        }
    }

    manage_allow_continue(true);
}

// Combat Routine
async function combat_routine(enemy, enemy_hp, failed_to_flee) {

    let d = Math.random();
    let in_combat = true;
    let player_turn = failed_to_flee;
    
    while(in_combat) {
        // Seperate
        await sleep(1000);
        seperator();

        // Check for enemy hp
        if (enemy_hp <= 0) {
            // Win fight
            game_text.textContent += `[!] You've slain the ${enemy}. [!]\r\n`;

            let enemy_xp = randomIntFromInterval(5, 100);

            await sleep(1000);

            game_text.textContent += `You've earned ${enemy_xp} xp.\r\n`;

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
            await sleep(1000);

            game_text.textContent += `[!] Player's turn. [!]\r\n`;

            await sleep(1000);

            // If no weapons --> use fists
            if (inventory.length <= 0) {
                let fist_dmg = randomIntFromInterval(1,5);
                enemy_hp -= fist_dmg;

                game_text.textContent += `[!] You use your fists. [!]\r\n`;

                await sleep(1000);

                game_text.textContent += `[!] You deal ${fist_dmg} damage. [!]\r\n`;

                await sleep(1000);

                game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp} hp. [!]\r\n`;
            }
            // Player has weapons 
            else {
                let weapon_to_use = "";
                for (let i = 0; i < inventory.length; i++) {
                    awaiting_response = true;
                    const item = inventory[i];
                    game_text.textContent += `Use ${item}?\r\n (y/n) \r\n`;

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
                    let fist_dmg = randomIntFromInterval(1,5);
                    enemy_hp -= fist_dmg;

                    game_text.textContent += `[!] You use your fists. [!]\r\n`;

                    await sleep(1000);

                    game_text.textContent += `[!] You deal ${fist_dmg} damage. [!]\r\n`;

                    await sleep(1000);

                    game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp} hp. [!]\r\n`;
                }
                
                // Weapon has been chosen
                else {
                    await sleep(1000);

                    game_text.textContent += `You chose to use ${weapon_to_use}.\r\n`;

                    let weapon_dmg = randomIntFromInterval(5,15);
                    enemy_hp -= weapon_dmg;

                    await sleep(1000);

                    game_text.textContent += `[!] You deal ${weapon_dmg} damage. [!]\r\n`;

                    await sleep(1000);

                    game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp} hp. [!]\r\n`;

                    // Randomly break weapon
                    let d = Math.random();
                    if (d <= 0.15) {
                        indx = inventory.indexOf(weapon_to_use);
                        inventory.splice(indx, 1);

                        await sleep(1000);

                        game_text.textContent += `[!] ${capitalizeFirstLetter(weapon_to_use)} broke. [!]\r\n`;
                    }
                }
                
            }
        }
        // Enemys Turn
        else {
            await sleep(1000);

            game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)}'s turn. [!]\r\n`;

            let dmg = randomIntFromInterval(1,15);

            damage(dmg);

            // if player will die break loop
            if (hp <= 0) {
                in_combat = false;
                break;
            }

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

        // Healing Potion
        if (item == "healing potion") {
            let amt = randomIntFromInterval(10, max_hp);

            hp += amt;
            if (hp >= max_hp) {
                hp = max_hp;
            }

            game_text.textContent += `You found a healing potion and drank it.\r\n`;

            await sleep(1000);

            game_text.textContent += `You healed ${amt} hp.\r\n`;

            await sleep(1000);
            break;
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

// XP Managing
function manage_xp(amount) {
    xp += amount;
    if (xp >= max_xp) {
        lvl++;
        max_xp += lvl*10;
        xp = Math.abs(max_xp-xp);
    }
    display_stats();
}

// Main Game Loop (MGL)
async function main_loop() {
    clear_game_text();
    check_region_switch(steps);
    
    // Check if player is alive
    if (!alive) {
      return;
    }
    
    // Stat Displays
    display_stats();

    // Game Events
    await sleep(2000);
    forwards();
    await sleep(1000);
    manage_events(places_table, events_table);
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

// Updates Time of Update
function update_time() {
    let subtitle = document.getElementById("123");
    let current_date = new Date();
    let time_str = `-${current_date.getDay()}.${current_date.getMonth()+1}.${current_date.getFullYear()}-${current_date.getHours()}-${current_date.getMinutes()}-${current_date.getSeconds()}`;
    subtitle.textContent += time_str;
}

update_time();

// Regularly update to auto scroll to end of div
window.setInterval(function() {
    var elem = document.getElementById('game');
    elem.scrollTop = elem.scrollHeight;
  }, 10);