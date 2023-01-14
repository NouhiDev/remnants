$(window).on("load",function(){
    $(".loader").fadeOut(1000);
    delay(1000).then(() => $(".content").fadeIn(1000));
})

// Adds delay
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

// Game
var game_text = document.getElementById("game-text");
var stats_text = document.getElementById("stats-text")
var region_text = document.getElementById("region-text")

var allow_input = false;
var allow_continue = true;
var player_input = "";

var awaiting_response = true;

// Vowels
var vowels = ["a", "e", "i", "o", "u"]

// Inventory
var inventory = ["damaged sword"];
var inventory_txt = "[Inventory: ";

// Stats
var alive = true;
var max_hp = 100
var hp = 100;
var steps = 10;
var gold = 0;
var xp = 0;
var max_xp = 100;
var lvl = 0;
var region = "Forest";

// Regions
var regions = ["Lockwood Village", "Eastport", "Ocean", "Rocky Shores", "Abyss"];

// #region Places
places_table = ["grass patch", "hut", "camp", "cave" ,"stone arch", "field of red mushrooms", "grand tree", "shrine", "temple"];

forest_places_table = ["grass patch", "hut", "camp", "cave" ,"stone arch", "field of red mushrooms", "grand tree", "shrine", "temple"];

lockwood_village_places_table = ["abandonend house", "abandonend church", "abandonend chapel", 
"abandonend town hall", "abandonend tunnel", "abandonend barn", "abandonend stable", "abandonend manor"]

eastport_places_table = ["abandonend ship", "broken ship", "abandonend warehouse", "abandonend dock", "open container"]

ocean_places_table = ["small island", "island", "shipwreck", "coral reef", "abandonend lighthouse", "ship graveyard"]

// #endregion

// Events
events_table = ["nothing", "chest", "enemy", "wishing well"];

forest_events_table = ["nothing", "chest", "enemy", "wishing well"];
                                //"nothing", "chest", "enemy"
lockwood_village_events_table = ["merchant"] //NEW: MERCHANT

eastport_events_table = ["cargo", "enemy", "nest", "nothing"] // NEW: CARGO, NEST

ocean_events_table = ["enemy", "storm", "nothing"] // NEW: STORM

// Loot Tables
chest_loot_table = ["dagger", "axe", "sword", "bow", "healing potion", "gold", "nothing"]

cargo_loot_table = ["halberd", "great axe", "axe", "sword", "claymore", "healing potion", "gold", "gold"]

// Enemies
enemies = ["spider", "werewolf", "dryad", "gnome", "wendigo", "ent", "harpy"]

forest_enemies = ["spider", "werewolf", "dryad", "gnome", "wendigo", "ent", "harpy"]

lockwood_village_enemies = ["goblin", "orc", "wraith", "giant spider", "bandit"]

eastport_enemies = ["humanoid creature", "indiscernible entity", "ghoul"]

ocean_enemies = ["sea monster", "mermaid", "siren", "leviathan", "sea serpent", "water elemental", "charybdis"]

// Forward Variations

forwards_var = ["You delve deeper.", "You walk forward.", "You continue onward.", "You proceed ahead.", "You advance.", "You tread ahead."]

across_var = ["You come across", "You stumble upon", "You happen upon", "You run into"]

// Travelers
traveler_names = ["Jeffrey", "Wilhelm", "Reinhard", "Gottfried", "Gwyndolin", "Nito", "Seath", "Quelaag", "Priscilla", 
"Sif", "Gwyn", "Manus", "Ornstein", "Smough", "Kalameet", "Artorias", "Najka", "Freja", "Mytha", "Velstadt", "Vendrick", "Magus", "Nashandra", "Aldia", 
"Vordt", "Wolnir", "Sulyvahn", "Aldrich", "Oceiros", "Gundyr", "Lothric", "Godrick"]

// Origins
origins = ["Golden Wheel", "Silver Tongue", "Emerald City", "Spice Road", "Bazaar", "Bronze Coin", "Jade Caravan",
 "Sapphire Harbour", "Crimson Square", "Velvet Road", "Iron Market", "Diamond Exchange", "Silver Empire"]

 // Merchants
 merchant_names = ["Jeffrey", "Wilhelm", "Reinhard", "Gottfried", "Gwyndolin", "Nito", "Seath", "Quelaag", "Priscilla", 
"Sif", "Gwyn", "Manus", "Ornstein", "Smough", "Kalameet", "Artorias", "Vaati"]

// Blacksmith
blacksmith_names = ["Najka", "Freja", "Mytha", "Velstadt", "Vendrick", "Magus", "Nashandra", "Aldia", 
"Vordt", "Wolnir", "Sulyvahn", "Aldrich", "Oceiros", "Gundyr", "Lothric", "Godrick"]

// Checks for region switches
async function check_region_switch(distance) {
    // Forest
    if (distance == 0) {
        awaiting_response = true;
        // REGION SCREEN UPDATE
        region_text.innerHTML = `<span class="red">[Act 1]</span> You wake up in a dense <span class="green">forest</span>, disoriented and confused. You realize that you have no memory of how you got here or what has happened to the world around you. You see a <span class="light-green">clearing</span> ahead.\r\n`
        // STORY SCREEN UPDATE
        game_text.innerHTML += `<span class="light-blue">ACT 1: AWAKENING</span>\r\n\r\n` +
        `You wake up in a dense forest, with no memory of how you got there or what has happened to the world. As you stand up and take in your surroundings, you notice that the trees are withered and the air is thick with a putrid smell. The silence is broken only by the occasional sound of something moving in the bushes.\r\n`
        + "\r\nYou start to explore the forest, looking for any clues about the state of the world.\r\n" + "\r\nContinue? (y/n) \r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.textContent += "You wake up.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Village
    if (distance == 10) {
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
        + "\r\nThey inform you of a rumored island where a group of survivors has formed a community, and hopefully, a new chance for humanity to rebuild. You start to look for a port.\r\n" + "\r\nContinue? (y/n) \r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.textContent += "You proceed.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Port
    if (distance == 20) {
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
        + "\r\You start to look for a working ship.\r\n" + "\r\nContinue? (y/n) \r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.textContent += "You venture further.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }

    }
    // Ocean
    if (distance == 30) {
        region_text.innerHTML = `<span class="red">[Act 4]</span> After reaching the <span class="purplebrown">port</span>, you finally find a <span class="brown">ship</span> that seems seaworthy. However, as you set out to sea, you quickly realize that the <span class="blue">ocean</span> is just as dangerous as the land.\r\n`
        region = regions[2];
        places_table = ocean_places_table;
        events_table = ocean_events_table;
        enemies = ocean_enemies;
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">ACT 4: ADRIFT</span>\r\n\r\n` +
        `After arriving at the port, you successfully find a ship that appears to be in good condition. However, as soon as you set sail, it becomes clear that the ocean is equally perilous as the land. The waters are filled with mutated creatures, and the storms are more violent than ever before.\r\n`
        + "\r\nYou set out to sea.\r\n" + "\r\nContinue? (y/n) \r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.textContent += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
    }
    // Abyss
    if (distance == 40) {
        region_text.innerHTML = `<span class="red">[End]</span> You've reached the end of your journey, traveler.\r\n`
        region = regions.slice(-1);
        abyss_combination();
        // STORY SCREEN
        awaiting_response = true;
        game_text.innerHTML = `<span class="light-blue">End: Abyss</span>\r\n\r\n` +
        `.The path before you comes to an end, beyond this point lies nothing but oblivion. Nothing but the abyss. The laws of nature don't apply within these realms, for the rules of this realm are set by the chaos itself.\r\n`
        + "\r\nThis is it.\r\n" + "\r\nContinue? (y/n) \r\n";
        // Wait for user input
        manage_input(true);

        while(awaiting_response) {
            await sleep(1);
        }

        manage_input(false);

        if (player_input == "y") {
            game_text.textContent += "You continue.\r\n";
            manage_allow_continue(true);
            return;
        }
        else if (player_input == "n") {
            game_text.textContent += "You can't change fate.\r\n";
            manage_allow_continue(true);
            return;
        }
        else {
            game_text.textContent += "You can't change fate.\r\n";
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
    stats_text.innerHTML += `[ <span class="health">Health: ${hp}/${max_hp}</span> | ` + 
    `<span class="distance">Distance traveled: ${steps * 100}m</span> | ` + 
    `<span class="gold">Gold: ${gold}</span> | <span class="region">Region: ${region}</span> | <span class="lvl">LVL: ${lvl}</span> | ` + 
    `<span class="xp">XP: ${xp}/${max_xp}</span> ]\r\n`
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
    game_text.textContent += forwards_var.sample() + "\r\n";
    short_seperator();
    await sleep(1000);
    manage_events(places_table, events_table);
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

    game_text.textContent += `${across_var.sample()} ${article} ${place}.\r\n`;

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

        game_text.textContent += `You see ${article} ${event}.\r\n`;
        
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
        case "merchant":
            game_text.textContent += `Talk to merchant?\r\n (y/n) \r\n`;

            // Wait for user input
            manage_input(true);

            while(awaiting_response) {
                await sleep(1);
            }

            manage_input(false);

            // TALK TO MERCHANT
            if (player_input == "y") {
                game_text.textContent += "You head towards the merchant.\r\n";
                merchant_routine();
            }
            // DOESNT TALK TO MERCHANT
            else if (player_input == "n") {
                game_text.textContent += "You do not talk to the merchant and move on.\r\n";
                manage_allow_continue(true);
            }
            // WRONG INPUT --> DOESNT TALK TO MERCHANT
            else {
                game_text.textContent += "You do not talk to the merchant and move on.\r\n";
                manage_allow_continue(true);
            }
            break;
            break;
        case "storm":
            let storm_dmg = randomIntFromInterval(5,15);
            damage(storm_dmg);

            game_text.textContent += `A violent storm hits you.\r\n`

            await sleep(1000);

            game_text.textContent += `You take ${storm_dmg} damage.\r\n`
            manage_allow_continue(true);
            break;
        // WISHING WELL
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

                    game_text.textContent += "It was a trap.\r\n";

                    await sleep(1000);

                    game_text.textContent += `You took ${dmg} damage.\r\n`;
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

                    game_text.textContent += "It was a trap.\r\n";

                    await sleep(1000);

                    game_text.textContent += `You took ${dmg} damage.\r\n`;
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
    if (d <= 0.2) {
        max_hp += 10;
        hp = max_hp;
        game_text.textContent += "Your prayers have been heard.\r\n";

        await sleep(1000);

        game_text.textContent += "Your max hp has increased by 10. \r\n";

        await sleep(1000);

        game_text.textContent += `Your current max hp is ${max_hp}.\r\n`;
    }

    // Fail
    else {
        game_text.textContent += "Your prayers have been rejected.\r\n";

        await sleep(1000);

        game_text.textContent += "You take 20 damage.\r\n";
        damage(20);
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
        throw new Error();
    }
}

// merchant
async function merchant_routine() {
    await sleep(1000);
    game_text.innerHTML = "";
    game_text.innerHTML += `Merchant "${merchant_names.sample()}" of the ${origins.sample()}\r\n`;
    game_text.innerHTML += `Blacksmith "${blacksmith_names.sample()}" of the ${origins.sample()}\r\n`;
    game_text.innerHTML += `Traveler "${traveler_names.sample()}" of the ${origins.sample()}\r\n`;

}

// #region COMBAT RELATED

// Enemy Encounter
async function enemy_encounter() {
    // Setup Enemy
    let enemy = enemies.sample();
    let enemy_hp = randomIntFromInterval(det_enemy_hp(enemy)[0], det_enemy_hp(enemy)[1]);

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

            game_text.textContent += "[!] You fail to flee. [!]\r\n";

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

            game_text.textContent += "[!] You fail to flee. [!]\r\n";

            await sleep(1000);

            game_text.textContent += `[!] You took ${dmg} damage. [!]\r\n`;

            await sleep(1000);

            combat_routine(enemy, enemy_hp, true)

            return;
        }
    }

    manage_allow_continue(true);
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
        case "great axe":
            return [10, 20];
        case "claymore":
            return [11, 23];
    }
}

// Enemy Damage Determiner
function det_enemy_dmg(enemy) {
    switch(enemy) {
        // REGION 0: FOREST
        case "spider":
            return [2, 5];
        case "werewolf":
            return [4, 7];
        case "dryad":
            return [2, 5];
        case "gnome":
            return [2, 4];
        case "wendigo":
            return [5, 9];
        case "ent":
            return [4, 7];
        case "harpy":
            return [2, 5];
        // REGION 1: LOCKWOOD VILLAGE
        case "goblin":
            return [8, 9];
        case "orc":
            return [8, 14];
        case "wraith":
            return [8, 10];
        case "giant spider":
            return [8, 11];
        case "bandit":
            return [6, 9];
        // REGION 2: EASTPORT
        case "humanoid creature":
            return [12, 16];
        case "indiscernible entity":
            return [11, 14];
        case "ghoul":
            return [8, 11];
        // REGION 3: OCEAN
        case "sea monster":
            return [10, 16];
        case "mermaid":
            return [8, 14];
        case "siren":
            return [8, 11];
        case "leviathan":
            return [8, 26];
        case "sea serpent":
            return [7, 20];
        case "water elementals":
            return [8, 21];
        case "charybdis":
            return [9, 16];
    }
}

// Enemy HP Determiner
function det_enemy_hp(enemy) {
    switch(enemy) {
        // REGION 0: FOREST
        case "spider":
            return [5, 10];
        case "werewolf":
            return [8, 14];
        case "dryad":
            return [5, 10];
        case "gnome":
            return [4, 7];
        case "wendigo":
            return [10, 18];
        case "ent":
            return [7, 15];
        case "harpy":
            return [5, 10];
        // REGION 1: LOCKWOOD VILLAGE
        case "goblin":
            return [16, 18];
        case "orc":
            return [16, 27];
        case "wraith":
            return [16, 19];
        case "giant spider":
            return [16, 21];
        case "bandit":
            return [12, 18];
        // REGION 2: EASTPORT
        case "humanoid creature":
            return [24, 32];
        case "indiscernible entity":
            return [21, 28];
        case "ghoul":
            return [16, 21];
        // REGION 3: OCEAN
        case "sea monster":
            return [19, 32];
        case "mermaid":
            return [15, 28];
        case "siren":
            return [16, 21];
        case "leviathan":
            return [19, 52];
        case "sea serpent":
            return [15, 39];
        case "water elementals":
            return [16, 42];
        case "charybdis":
            return [19, 32];
    }
}

// Combat Routine
async function combat_routine(enemy, enemy_hp, failed_to_flee) {

    let d = Math.random();
    let in_combat = true;
    let player_turn = failed_to_flee;
    let enemy_max_hp = enemy_hp;

    await sleep(1000);
    game_text.textContent = "";

    while(in_combat) {
        // Seperate
        await sleep(1000);

        // Check for enemy hp
        if (enemy_hp <= 0) {
            // Win fight
            game_text.innerHTML += `[!] You've slain the ${enemy}. [!]\r\n`;

            let enemy_xp = randomIntFromInterval(5, 100);

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
            await sleep(1000);

            game_text.textContent += `[i] Player's turn. [i]\r\n`;

            await sleep(1000);

            // If no weapons --> use fists
            if (inventory.length <= 0) {
                let fist_dmg = randomIntFromInterval(1,3);
                enemy_hp -= fist_dmg;
                if (enemy_hp <= 0) {
                    enemy_hp = 0;
                }

                game_text.textContent += `[!] You use your fists. [!]\r\n`;

                await sleep(1000);

                game_text.innerHTML += `<span class="light-gold">[!] You deal ${fist_dmg} damage. [!]</span>\r\n`;

                await sleep(1000);

                game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp}/${enemy_max_hp} hp. [!]\r\n`;
                
                await sleep(2000);

                game_text.textContent = "";
            }
            // Player has weapons 
            else {
                let weapon_to_use = "";
                for (let i = 0; i < inventory.length; i++) {
                    awaiting_response = true;
                    const item = inventory[i];
                    game_text.textContent += `Use ${item}? (${weapon_damage(item)[0]}-${weapon_damage(item)[1]} dmg)\r\n (y/n) \r\n`;

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
                    let fist_dmg = randomIntFromInterval(1,3);
                    enemy_hp -= fist_dmg;
                    if (enemy_hp <= 0) {
                        enemy_hp = 0;
                    }

                    game_text.textContent += `[!] You use your fists. [!]\r\n`;

                    await sleep(1000);

                    game_text.innerHTML += `<span class="light-gold">[!] You deal ${fist_dmg} damage. [!]</span>\r\n`;

                    await sleep(2000);

                    game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp}/${enemy_max_hp} hp. [!]\r\n`;
                }
                
                // Weapon has been chosen
                else {
                    await sleep(1000);

                    game_text.textContent += `You chose to use ${weapon_to_use}.\r\n`;

                    let weapon_dmg = randomIntFromInterval(weapon_damage(weapon_to_use)[0],weapon_damage(weapon_to_use)[1]);
                    enemy_hp -= weapon_dmg;
                    if (enemy_hp <= 0) {
                        enemy_hp = 0;
                    }

                    await sleep(1000);

                    game_text.innerHTML += `<span class="light-gold">[!] You deal ${weapon_dmg} damage. [!]</span>\r\n`;

                    await sleep(1000);

                    game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} has ${enemy_hp}/${enemy_max_hp} hp. [!]\r\n`;

                    // Randomly break weapon
                    let d = Math.random();
                    if (d <= 0.15) {
                        indx = inventory.indexOf(weapon_to_use);
                        inventory.splice(indx, 1);

                        await sleep(1000);

                        game_text.innerHTML += `<span class="dark-red">[!] ${capitalizeFirstLetter(weapon_to_use)} broke. [!]</span>\r\n`;
                    }
                }

                await sleep(2000);
                
                game_text.textContent = "";
                
            }
        }
        // Enemys Turn
        else {
            await sleep(1000);

            game_text.textContent += `[i] ${capitalizeFirstLetter(enemy)}'s turn. [i]\r\n`;

            let dmg = randomIntFromInterval(det_enemy_dmg(enemy)[0], det_enemy_dmg(enemy)[1]);

            await sleep(1000);

            game_text.textContent += `[!] ${capitalizeFirstLetter(enemy)} attacks. [!]\r\n`;

            await sleep(1000);

            game_text.innerHTML += `<span class="red-bright">[!] You took ${dmg} damage. [!]</span>\r\n`;

            damage(dmg);
            display_stats();

            // if player will die break loop
            if (hp <= 0) {
                in_combat = false;
                break;
            }

            await sleep(2000);
                
            game_text.textContent = "";
        }
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
            display_stats();

            await sleep(1000);
            break;
        }

        // Gold
        if (item == "gold") {
            let amt = randomIntFromInterval(1, 250);
            gold += amt;
            game_text.textContent += `You found ${amt} gold.\r\n`;

            await sleep(1000);
            break;
        }

        // Nothing
        if (item == "nothing") {
            if (amount_of_items == 1) {
                game_text.textContent += "It is empty.\r\n";
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

      game_text.textContent += `You finish looting.\r\n`
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
        max_hp += lvl*5;
        xp = Math.abs(max_xp-xp);
        hp = max_hp;
    }
    display_stats();
}

// Main Game Loop (MGL)
async function main_loop() {
    clear_game_text();
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

// Updates Time of Update
function update_time() {
    let subtitle = document.getElementById("123");
    let current_date = new Date();
    let time_str = `-${current_date.getDay()}.${current_date.getMonth()+1}.${current_date.getFullYear()}-${current_date.getHours()}-${current_date.getMinutes()}-${current_date.getSeconds()}`;
    subtitle.textContent += time_str;
}

// update_time();

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