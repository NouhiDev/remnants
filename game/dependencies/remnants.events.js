//███████╗██╗░░░██╗███████╗███╗░░██╗████████╗░██████╗
//██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝██╔════╝
//█████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░╚█████╗░
//██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░░╚═══██╗
//███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░██████╔╝
//╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░╚═════╝░
// This section contains arrays filled with events / encounters used for every region in the game.
// These events randomly occur every step following Laplace's principle (each event has the same chance of occurring).
// All the following entries are to be formulated in singular form as the article determination only works with
// singular form.

// ░█▀▀▀ ░█──░█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀ 　 ▀▀█▀▀ ─█▀▀█ ░█▀▀█ ░█─── ░█▀▀▀ ░█▀▀▀█
// ░█▀▀▀ ─░█░█─ ░█▀▀▀ ░█░█░█ ─░█── 　 ─░█── ░█▄▄█ ░█▀▀▄ ░█─── ░█▀▀▀ ─▀▀▀▄▄
// ░█▄▄▄ ──▀▄▀─ ░█▄▄▄ ░█──▀█ ─░█── 　 ─░█── ░█─░█ ░█▄▄█ ░█▄▄█ ░█▄▄▄ ░█▄▄▄█

// #region

events_table = [];

forest_events_table = [
  "chest",
  "enemy",
  "wishing well",
  "traveler",
  "shrine",
  "nothing",
];

lockwood_village_events_table = [
  "chest",
  "enemy",
  "merchant",
  "traveler",
  "nothing",
];

eastport_events_table = ["cargo", "enemy", "nest", "nothing"];

ocean_events_table = ["enemy", "storm", "shipwreck", "seafarer", "nothing"];

rocky_shore_events_table = [
  "enemy",
  "traveler",
  "shrine",
  "object burried in the ground",
  "nothing",
];

rebellion_events_table = ["friendly traveler", "merchant", "pair of monks"];

wasteland_events_table = [
  "enemy",
  "blurry object",
  "traveler",
  "small dungeon",
  "bandit",
  "nothing",
];

lost_temple_events_table = [
  "enemy",
  "stone chest",
  "bandit",
  "golden statue",
  "lost scripture",
  "ancient device",
  "nothing",
];

swamp_events_table = ["enemy", "nothing"];

mountains_events_table = ["enemy", "nothing"];

// #endregion

// ░█▀▀▀ ░█──░█ ░█▀▀▀ ░█▄─░█ ▀▀█▀▀ 　 ░█▀▀█ ░█▀▀▀█ ░█─░█ ▀▀█▀▀ ▀█▀ ░█▄─░█ ░█▀▀▀ ░█▀▀▀█
// ░█▀▀▀ ─░█░█─ ░█▀▀▀ ░█░█░█ ─░█── 　 ░█▄▄▀ ░█──░█ ░█─░█ ─░█── ░█─ ░█░█░█ ░█▀▀▀ ─▀▀▀▄▄
// ░█▄▄▄ ──▀▄▀─ ░█▄▄▄ ░█──▀█ ─░█── 　 ░█─░█ ░█▄▄▄█ ─▀▄▄▀ ─░█── ▄█▄ ░█──▀█ ░█▄▄▄ ░█▄▄▄█

// #region

// █▀ █▀▄▀█ ▄▀█ █░░ █░░   █▀▄ █░█ █▄░█ █▀▀ █▀▀ █▀█ █▄░█
// ▄█ █░▀░█ █▀█ █▄▄ █▄▄   █▄▀ █▄█ █░▀█ █▄█ ██▄ █▄█ █░▀█

// Small Dungeon
async function small_dungeon() {
  game_text.innerHTML += `<span class="choice">Enter the small dungeon?\r\n\r\n`;

  await await_input();

  // APPROACH SMALL DUNGEON
  if (player_input == "y") {
    game_text.innerHTML += "You head towards the small dungeon.\r\n";
  }
  // PASS BY SMALL DUNGEON
  else if (player_input == "n") {
    game_text.innerHTML += "You move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  // 1/3% Trapped Chest, 2/3% Enemy
  let rooms = ["trapped chest", "enemy", "enemy"];

  game_text.innerHTML =
    `<span class="small-dungeon">SMALL DUNGEON</span>` +
    `\r\n(Entrance)\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML +=
    "You push open the heavy wooden door and step into the dungeon.\r\n\r\n";

  await sleep(2000);

  game_text.innerHTML +=
    "The cool air sends shivers down your spine as you scan the dimly lit chamber for signs of danger.\r\n\r\n";

  await sleep(2500);

  game_text.innerHTML +=
    "<span class='info'>You pick up a torch from the wall.</span>\r\n\r\n";

  await sleep(1000);

  game_text.innerHTML +=
    "The flickering torch in your hand casts dancing shadows on the rough-hewn walls as you make your way deeper into the dungeon.\r\n\r\n";

  await sleep(2000);

  // Randomly determine the Number of Rooms (Between 3 and 1)
  // The last Room is always reserved for the Mini Boss
  let amount_of_rooms = randomIntFromInterval(3, 5);

  // Iterate through the Rooms
  for (let i = 0; i < amount_of_rooms - 1; i++) {
    game_text.innerHTML += `\r\n<span class="choice">Proceed?\r\n\r\n`;

    await await_input();

    // YES: Next Room, NO: Next Room anyways
    player_input == "y"
      ? (game_text.innerHTML += "You enter the next room.\r\n")
      : "The doors closed behind you. You can't turn back now.\r\n";

    await sleep(2000);

    // Setup Title
    game_text.innerHTML =
      `<span class="small-dungeon">SMALL DUNGEON</span>` +
      `\r\n(Room ${i + 1})\r\n\r\n`;

    // Choose random Room from possible Rooms
    let room_type = rooms.sample();

    await sleep(1000);

    switch (room_type) {
      // Room is Enemy Room
      case "enemy":
        // Setup Enemy
        // Replace Enemies with Small Dungeon Enemies
        enemies = small_dungeon_enemies;

        // Choose random Enemy from Small Dungeon Enemies
        let enemy = enemies.sample();

        // Choose random descriptor for Enemy
        let enemy_descriptor = enemy_desciptors.sample();

        // Combined Enemy Name
        let enemy_combined_name = enemy_descriptor + " " + enemy;

        // Determine Enemy HP
        let enemy_hp =
          randomIntFromInterval(
            enemy_determiner(enemy, "hp")[0],
            enemy_determiner(enemy, "hp")[1]
          ) + steps;

        // Anounce enemy
        game_text.innerHTML += `<span class="info">You encounter <span class="enemy">${capitalize_first_letters(
          enemy_combined_name
        )}</span>.</span>\r\n\r\n`;

        await sleep(1000);

        // Display Enemy HP
        game_text.innerHTML += `<span class="enemy">${capitalize_first_letters(
          enemy_combined_name
        )}</span> has ${enemy_hp} hp.\r\n\r\n`;

        // Prompt for Combat
        game_text.innerHTML += `<span class="choice">Engage in combat?</span>\r\n\r\n`;

        await await_input();

        // YES: Engages
        if (player_input == "y") {
          game_text.innerHTML += "You engange in combat.\r\n\r\n";

          await sleep(1000);

          in_small_dungeon_combat = true;

          await combat_routine(
            enemy,
            enemy_hp,
            false,
            enemy_combined_name,
            true
          );
          // NO: Engages anyways
        } else {
          game_text.innerHTML += "There is no way around it.\r\n\r\n";

          await sleep(1000);

          in_small_dungeon_combat = true;

          await combat_routine(
            enemy,
            enemy_hp,
            false,
            enemy_combined_name,
            true
          );
        }
        break;
      // Room is trapped Chest
      case "trapped chest":
        game_text.innerHTML += "You see a trapped chest.\r\n\r\n";

        await sleep(1000);

        game_text.innerHTML += `<span class="choice">Attempt to disarm the trap?\r\n\r\n`;

        await await_input();

        // Attempt to disarm the trapped Chest
        if (player_input == "y") {
          let disarm_chance = Math.random();
          // Succeed the Disarm
          if (disarm_chance < 0.5) {
            await sleep(1000);

            game_text.innerHTML +=
              "<span class='blessing'>You successfully disarm the trap and open the chest.</span>\r\n\r\n";

            // Randomly choose 2 to 6 items from Small Dungeon Trapped Chest Loot Table
            let amount_of_items = randomIntFromInterval(2, 6);

            for (let i = 0; i < amount_of_items; i++) {
              await sleep(1000);

              // Choose random Item from Small Dungeon Trapped Chest Loot Table
              item = small_dungeon_trapped_chest_loot_table.sample();

              // Healing Potion
              if (item == "healing potion") {
                let amt = randomIntFromInterval(10, max_hp / 2);

                // Add HP
                hp += amt;

                // If HP exceeds Max HP set it to Max HP
                if (hp >= max_hp) {
                  hp = max_hp;
                }

                game_text.innerHTML += `You find a healing potion and drink it.\r\n`;

                await sleep(1000);

                game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
                update_stats();

                await sleep(1000);
                continue;
              }

              // Gold
              if (item == "gold") {
                // Choose random Amount of Gold
                let amt = randomIntFromInterval(
                  det_gold("trappedchest")[0],
                  det_gold("trappedchest")[1]
                );

                // Add Gold
                gold += amt;

                game_text.innerHTML += `You find <span class="gold">${amt} gold</span>.\r\n`;
                update_stats();

                await sleep(1000);
                continue;
              }

              // Check if Item is already in Inventory
              if (inventory.includes(item)) {
                game_text.innerHTML += `You find ${article} ${item} but you already have one.\r\n`;
                continue;
              }

              // Add Item to Inventory
              add_to_inventory(item);
              game_text.innerHTML += `You find ${article} ${item}.\r\n`;
              update_stats();
            }
          }
          // Fail to disarm the trapped Chest
          else {
            await sleep(1000);

            game_text.innerHTML +=
              "<span class='drastic'>You fail to disarm the chest.</span>\r\n\r\n";

            await sleep(1000);

            // Determine how much Damage the Trap will deal
            let chest_dmg = randomIntFromInterval(9, 18);

            game_text.innerHTML += `<span class="dmg">You take ${chest_dmg} damage.</span>\r\n\r\n`;
            damage(chest_dmg);
            update_stats();
          }
        }
        // Ignore Chest
        else if (player_input == "n") {
          game_text.innerHTML +=
            "You choose to ignore the chest and the treasures it could have contained and move on.\r\n\r\n";
        }
        break;
    }
    await sleep(2000);
  }

  // Mini Boss
  game_text.innerHTML =
    `<span class="small-dungeon">SMALL DUNGEON</span>` +
    `\r\n(Before the Boss Door)\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `You stand before the imposing door, your heart pounding with anticipation.\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `You can feel the aura of a powerful boss radiating from the other side.\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `\r\n<span class="choice">Are you ready?\r\n\r\n`;

  await await_input();

  player_input == "y"
    ? (game_text.innerHTML +=
        "You take a deep breath, and with a fierce determination, you open the door and step forward to face your foe.\r\n")
    : "You aren't ready, but the door to the boss chamber suddenly swings open.\r\n";

  await sleep(5000);

  small_dungeon_boss();
}

async function small_dungeon_boss() {
  // Set up Small Dungeon Boss (SDB)
  // Choose random Boss from Small Dungeon Bosses
  let boss = small_dungeon_bosses.sample();

  // Determine Boss HP
  let boss_max_hp = randomIntFromInterval(100, 200);
  let boss_hp = boss_max_hp;

  game_text.innerHTML =
    "<span class='combat'>MINI BOSSFIGHT</span>\r\n" +
    `[ <span class='enemy'>You vs ${capitalize_first_letters(
      boss
    )} (${boss_hp}/${boss_max_hp} hp)</span> ]\r\n\r\n`;

  let in_combat = true;
  let player_turn = false;

  while (in_combat) {
    await sleep(1000);

    // Check for Boss Death
    if (boss_hp <= 0) {
      game_text.innerHTML += `<span class="blessing">You've slain the ${boss}.</span>\r\n\r\n`;

      // Determine Boss XP = Boss Max HP * 2
      let boss_xp = boss_max_hp * 2;

      await sleep(1000);

      game_text.innerHTML += `<span class="green">You've earned ${boss_xp} xp.</span>\r\n`;

      await manage_xp(boss_xp);

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

      // If no Weapons use Fists
      if (inventory.length <= 0) {
        let hit_chance = Math.random();

        // You miss the attack
        if (hit_chance < 0.15) {
          let miss_or_evade_chance = Math.random();

          // Pseudo Miss the Hit with 50%
          if (miss_or_evade_chance < 0.5) {
            game_text.innerHTML += `<span class="drastic">You miss and deal no damage.</span>\r\n\r\n`;
          }
          // Pseudo Enemy evades with 50%
          else {
            game_text.innerHTML += `<span class="drastic">${capitalize_first_letters(
              boss
            )} evaded the attack.</span>\r\n\r\n`;
          }
        }
        // You hit the Attack
        else {
          // Determine Fist Damage
          let fist_dmg = randomIntFromInterval(1, 3);

          // Subtract Fist damage from Enemy HP
          enemy_hp -= fist_dmg;

          // If Enemy HP reaches below zero set it to zero
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
      // Player has Weapons
      else {
        let weapon_to_use = "";
        // Loop through all Weapons until Weapon is chosen
        while (weapon_to_use == "") {
          for (let i = 0; i < inventory.length; i++) {
            const item = inventory[i];
            game_text.innerHTML += `<span class="choice">Use ${item}? (${
              item_determiner(item, "dmg")[0]
            }-${item_determiner(item, "dmg")[1]} dmg)</span>\r\n\r\n`;

            await await_input();

            player_input == "y" ? (weapon_to_use = item) : (weapon_to_use = "");
          }
        }

        // Weapon has been chosen
        await sleep(1000);

        game_text.innerHTML += `You chose to use ${weapon_to_use}.\r\n\r\n`;

        // Determine Weapon Damage
        let weapon_dmg = randomIntFromInterval(
          item_determiner(weapon_to_use, "dmg")[0],
          item_determiner(weapon_to_use, "dmg")[1]
        );

        let hit_chance = Math.random();

        // You miss / evade
        if (hit_chance < 0.15) {
          let miss_or_evade_chance = Math.random();

          // Pseudo Miss the hit with 50%
          if (miss_or_evade_chance < 0.5) {
            game_text.innerHTML += `<span class="drastic">You miss and deal no damage.</span>\r\n\r\n`;
          }
          // Pseudo evades with 50%
          else {
            game_text.innerHTML += `<span class="drastic">${capitalize_first_letters(
              boss
            )} evaded the attack.</span>\r\n\r\n`;
          }
        }
        // You hit the Attack
        else {
          // Subtract Boss HP
          boss_hp -= weapon_dmg;

          // If Boss HP reaches below zero set it to zero
          if (boss_hp <= 0) {
            boss_hp = 0;
          }

          await sleep(1000);

          game_text.innerHTML += `<span class="deal-dmg"> You deal ${weapon_dmg} damage. </span>\r\n\r\n`;

          // Randomly break Weapon
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

        await sleep(2000);

        game_text.innerHTML =
          "<span class='combat'>MINI BOSSFIGHT</span>\r\n" +
          `[ <span class='enemy'>You vs ${capitalize_first_letters(
            boss
          )} (${boss_hp}/${boss_max_hp} hp)</span> ]\r\n\r\n`;
      }
    }
    // Enemys Turn
    else {
      game_text.innerHTML += `<span class="turn">${capitalize_first_letters(
        boss
      )}'s turn:</span>\r\n\r\n`;

      // Determine Enemy Damage
      let dmg = randomIntFromInterval(
        enemy_determiner("small_dungeon_boss", "dmg")[0],
        enemy_determiner("small_dungeon_boss", "dmg")[1]
      );

      await sleep(1000);

      game_text.innerHTML += `${capitalize_first_letters(
        boss
      )} attacks.\r\n\r\n`;

      let miss_chance = Math.random();
      // Enemy misses with 15% Chance
      if (miss_chance < 0.15) {
        let miss_or_evade_chance = Math.random();
        // Miss with 50% Chance
        if (miss_or_evade_chance < 0.5) {
          await sleep(1000);

          game_text.innerHTML += `<span class="blessing">${capitalize_first_letters(
            boss
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

        damage(dmg);
        update_stats();

        // If Player will die break Loop
        if (hp <= 0) {
          in_combat = false;
          break;
        }
      }

      await sleep(2000);

      game_text.innerHTML =
        "<span class='combat'>MINI BOSSFIGHT</span>\r\n" +
        `[ <span class='enemy'>You vs ${capitalize_first_letters(
          boss
        )} (${boss_hp}/${boss_max_hp} hp)</span> ]\r\n\r\n`;
    }
  }

  // Defeat Mini Boss
  await sleep(1000);

  game_text.innerHTML += `\r\nYou hear a heavy door opening.\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `You see a glowing room with a chest inside.\r\n`;

  await sleep(1000);

  game_text.innerHTML += `\r\n<span class="choice">Loot the chest?\r\n\r\n`;

  await await_input();

  // YES: Loot Chest
  if (player_input == "y") {
    game_text.innerHTML += "You loot the chest.\r\n\r\n";

    await sleep(1000);

    await open_loot_container(
      small_dungeon_trapped_chest_loot_table,
      3,
      7,
      false
    );

    update_stats();

    await sleep(2000);

    game_text.innerHTML += `\r\nYou finish looting.\r\n\r\n`;
  }
  // NO: Don't loot Chest
  else if (player_input == "n") {
    game_text.innerHTML += "You decide to not open the chest.\r\n\r\n";
  }

  await sleep(2000);

  game_text.innerHTML += `You turn your attention to the exit of the dungeon.\r\n`;

  manage_allow_continue(true);
}

// █▀ █▀▀ ▄▀█ █▀▀ ▄▀█ █▀█ █▀▀ █▀█
// ▄█ ██▄ █▀█ █▀░ █▀█ █▀▄ ██▄ █▀▄

// Seafarer
async function seafarer_routine() {
  game_text.innerHTML += `<span class='choice'>Make contact with them?</span>\r\n\r\n`;

  await await_input();

  // APPROACH SEAFARER
  if (player_input == "y") {
    game_text.innerHTML += "You iniate interaction with them.\r\n";
  }
  // PASS BY SEAFARER
  else if (player_input == "n") {
    game_text.innerHTML += "You do not approach the seafarer and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  // Choose random Traveler name
  let name = traveler_names.sample();

  // Determine random Map Price
  let map_price = randomIntFromInterval(60, 160);

  game_text.innerHTML =
    `<span class="traveler-name">Seafarer ${name}</span>` + `\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML +=
    "Ahoy, me hearties! I've got me trusty treasure map here. Who wants in on this grand adventure to discover what lies beyond the X that marks the spot?\r\n\r\n";

  await sleep(4000);

  game_text.innerHTML += `They offer to sell you a treasure map for <span class="gold">${map_price} gold</span>.\r\n\r\n`;

  await sleep(2000);

  game_text.innerHTML += `<span class="choice">Give them <span class="gold">${map_price} gold</span> for the treasure map?</span>\r\n\r\n`;

  await await_input();

  // YES: Buy Map
  if (player_input == "y") {
    // If Player has more or equal Gold
    if (gold >= map_price) {
      game_text.innerHTML += `You buy the treasure map for <span class="gold">${map_price} gold</span>.\r\n\r\n`;
      gold -= map_price;
      update_stats();

      await sleep(2000);

      game_text.innerHTML = `<span class="traveler-name">TREASURE HUNT</span>\r\n\r\n`;

      await sleep(1000);

      game_text.innerHTML += `<span class="info">The X marks the spot, a destination unknown, but with the aid of this map, you shall uncover the riches that lay hidden.</span>\r\n\r\n`;

      await sleep(4000);

      game_text.innerHTML += `<span class="info">After some time, you've finally reach the destination marked on the map.</span>\r\n\r\n`;

      await sleep(2000);

      let d = Math.random();

      // FIND TREASURE 70%
      if (d < 0.7) {
        game_text.innerHTML += `<span class="blessing">The X was true, and the treasure is real!</span>\r\n\r\n`;

        await sleep(2000);

        await open_loot_container(
          treasure_map_treasure_loot_table,
          4,
          7,
          false
        );

        update_stats();

        await sleep(2000);

        game_text.innerHTML += "\r\nYou finish looting and sail away.\r\n";
        manage_allow_continue(true);
        return;
      }
      // DONT FIND TREASURE 30%
      else {
        game_text.innerHTML += `<span class="drastic">The X marks not the spot of treasure, but a pit of despair. Your journey was in vain, and you've been led astray.</span>\r\n\r\n`;

        await sleep(2000);

        game_text.innerHTML += "You sail away.\r\n";
        manage_allow_continue(true);
        return;
      }
    }
    // Player has not enough gold
    else {
      await sleep(1000);
      game_text.innerHTML += `You don't have enough <span class="gold">gold</span>.\r\n\r\n`;
      await sleep(1000);
      game_text.innerHTML += `You don't buy the map and sail away.\r\n`;
      await sleep(1000);
      manage_allow_continue(true);
      return;
    }
  }
  // DONT BUY
  else if (player_input == "n") {
    game_text.innerHTML += "You don't buy the map and sail away.\r\n";
    manage_allow_continue(true);
    return;
  }
}

// █▀▄▀█ █▀▀ █▀█ █▀▀ █░█ ▄▀█ █▄░█ ▀█▀
// █░▀░█ ██▄ █▀▄ █▄▄ █▀█ █▀█ █░▀█ ░█░

// Merchant
async function merchant_routine() {
  game_text.innerHTML += `<span class='choice'>Talk to merchant?</span>\r\n\r\n`;

  await await_input();

  // TALK TO MERCHANT
  if (player_input == "y") {
    game_text.innerHTML += "You head towards the merchant.\r\n";
  }
  // DOESNT TALK TO MERCHANT
  else if (player_input == "n") {
    game_text.innerHTML += "You do not talk to the merchant and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  // Choose random Merchant Name
  let merchant_name = merchant_names.sample();

  // Choose random Merchant Origin
  let merchant_origin = origins.sample();

  game_text.innerHTML = `<span class="lvl">Merchant "${merchant_name}" of the ${merchant_origin}</span>\r\n`;
  game_text.innerHTML += "\r\n";

  // Anger Level increases the Price
  let anger = 0;

  await sleep(1000);

  game_text.innerHTML += "They offer you: \r\n\r\n";

  let assortment = [];
  let amt_of_items = randomIntFromInterval(2, 6);

  // Populate Assortment
  // Populate Assortment with Lesser Healing Potion by default
  assortment.push("lesser healing potion");
  for (let i = 0; i < amt_of_items; i++) {
    // Choose random Item
    let random_item = merchant_assortment.sample();
    // Only add Item if it is not already in the Assortment
    if (!assortment.includes(random_item)) {
      assortment.push(random_item);
    }
  }

  // Display Assortment
  for (let i = 0; i < assortment.length; i++) {
    await sleep(1000);
    game_text.innerHTML += "- ";
    game_text.innerHTML += `${capitalize_first_letters(assortment[i])} `;
    // Add Damage if Items aren't Healing or Mana Potions
    if (
      assortment[i] != "healing potion" &&
      assortment[i] != "lesser healing potion"
    ) {
      game_text.innerHTML += `(${item_determiner(assortment[i], "dmg")[0]}-${
        item_determiner(assortment[i], "dmg")[1]
      } dmg)`;
    }
    game_text.innerHTML += "\r\n";
  }

  // Player Input
  // Player has enough Gold
  await sleep(3000);

  game_text.innerHTML += `\r\n<span class="choice">Ready to buy?</span>\r\n\r\n`;

  await await_input();

  player_input == "y"
    ? (game_text.innerHTML += `The merchant approaches you.`)
    : (game_text.innerHTML += `The merchant approaches you anyway.`);

  await sleep(3000);

  for (let i = 0; i < assortment.length; i++) {
    game_text.innerHTML = `<span class="lvl">Merchant "${merchant_name}" of the ${merchant_origin}</span>\r\n`;
    game_text.innerHTML += "\r\n";

    await sleep(1000);

    let item = assortment[i];

    // Determine Item Price
    price = randomIntFromInterval(
      item_determiner(assortment[i], "price")[0],
      item_determiner(assortment[i], "price")[1]
    );
    // Add Stepts to Price for Scaling
    price += steps;
    if (assortment[i] != "lesser healing potion" && item != "healing potion") {
      game_text.innerHTML += `<span class="choice">Buy ${item}? (${
        item_determiner(assortment[i], "dmg")[0]
      }-${
        item_determiner(assortment[i], "dmg")[1]
      } dmg) for <span class="gold">${price}G</span>?</span>\r\n\r\n`;
    } else {
      game_text.innerHTML += `<span class="choice">Buy ${item} for <span class="gold">${
        price + anger
      }G</span>?</span>\r\n\r\n`;
    }

    await await_input();

    // Wants to buy
    if (player_input == "y") {
      // If Player has enough Gold
      if (price + anger <= gold) {
        await sleep(1000);
        gold -= price + anger;
        game_text.innerHTML +=
          "<span class='info'>You bought the item.</span>\r\n\r\n";

        // Add to Inventory if it is Weapon
        if (item != "lesser healing potion" && item != "healing potion") {
          // Check if Item is already in Inventory
          if (inventory.includes(item)) {
            game_text.innerHTML += `${item} is already in your inventory. What a waste!\r\n`;
            continue;
          } else {
            add_to_inventory(item);
            update_stats();
          }
        }
        // Heal or Add Mana
        else {
          let amt = 30;
          hp += amt;

          if (hp >= max_hp) {
            hp = max_hp;
          }

          await sleep(1000);

          game_text.innerHTML += `<span class="heal">You healed ${amt} hp.</span>\r\n\r\n`;
          update_stats();
        }
        await sleep(2000);
      } else {
        await sleep(1000);
        game_text.innerHTML +=
          "<span class='info'>\r\nYou don't have enough gold.</span>\r\n\r\n";
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

  game_text.innerHTML += `The trade concludes.\r\n`;

  manage_allow_continue(true);
}

// █▀▄▀█ ▄▀█ █▄▀ █▀▀   ▄▀█   █░█░█ █ █▀ █░█
// █░▀░█ █▀█ █░█ ██▄   █▀█   ▀▄▀▄▀ █ ▄█ █▀█

// Make a Wish
async function make_wish() {
  game_text.innerHTML += `<span class='choice'>Make a wish?</span>\r\n\r\n`;

  await await_input();

  // MAKES WISH
  if (player_input == "y") {
    game_text.innerHTML += "You make a wish.\r\n";
  }
  // DOESNT MAKE WISH
  else if (player_input == "n") {
    game_text.innerHTML += "You do not make a wish and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  game_text.innerHTML =
    `<span class="wishing-well">WISHING WELL</span>` + `\r\n\r\n`;
  await sleep(1000);

  game_text.innerHTML += `<span class="choice">Throw <span class="gold">one gold</span> into the well?</span>\r\n\r\n`;

  await await_input();

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

// ▀█▀ █▀█ ▄▀█ █░█ █▀▀ █░░ █▀▀ █▀█
// ░█░ █▀▄ █▀█ ▀▄▀ ██▄ █▄▄ ██▄ █▀▄

// Traveler
async function traveler_routine(is_friendly_traveler) {
  game_text.innerHTML += `<span class='choice'>Approach them?</span>\r\n\r\n`;

  await await_input();

  // APPROACH TRAVELER
  if (player_input == "y") {
    game_text.innerHTML += "You head towards the traveler.\r\n";
  }
  // PASS BY TRAVELER
  else if (player_input == "n") {
    game_text.innerHTML += "You do not approach the traveler and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  // Choose Traveler Phrase
  let phrase = traveler_phrases.sample();

  // Choose Traveler Name
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
  if (d <= 0.75 || is_friendly_traveler) {
    game_text.innerHTML +=
      `<span class="blessing">${name} decides to give you some of their spoils.</span>` +
      `\r\n\r\n`;

    await sleep(1000);

    await open_loot_container(traveler_loot_table, 1, 3, false);

    update_stats();

    await sleep(1000);

    game_text.innerHTML += `\r\n${name} walks off.` + `\r\n\r\n`;

    manage_allow_continue(true);
    return;
  }
  // Attack Player with 25% Chance
  if (d > 0.75) {
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

        await open_loot_container(traveler_loot_table, 1, 3, false);

        update_stats();

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

// █▀▄▀█ █▀█ █▄░█ █▄▀
// █░▀░█ █▄█ █░▀█ █░█

// Monk
async function monk_routine() {
  game_text.innerHTML += `<span class='choice'>Approach them?</span>\r\n\r\n`;

  await await_input();

  // APPROACH MONK
  if (player_input == "y") {
    game_text.innerHTML += "You approach the monk.\r\n";
  }
  // PASS BY MONKS
  else if (player_input == "n") {
    game_text.innerHTML += "You do not approach the monk and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

  // Choose Monk 1 Name
  let name_1 = monk_names.sample();

  // Choose Monk 2 Name
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
    // Heal if not Max HP
    if (hp != max_hp) {
      let loot_table = ["healing potion"];
      open_loot_container(loot_table, 1, 3, false);

      update_stats();
      await sleep(1000);

      game_text.innerHTML += `You thank the monks.\r\n\r\n`;

      await sleep(1000);

      game_text.innerHTML += `<span class="green">You've earned 25 xp.</span>\r\n`;

      manage_xp(25);
    } else {
      await sleep(1000);

      game_text.innerHTML += `You are not injured.\r\n`;
    }

    await sleep(1000);

    game_text.innerHTML += `\r\n${name_1} and ${name_2} walk off.` + `\r\n\r\n`;

    manage_allow_continue(true);
  } // Ignore player 20%
  else {
    game_text.innerHTML +=
      `<span class="drastic">They look away.</span>` + `\r\n\r\n`;

    await sleep(1000);

    game_text.innerHTML += `${name_1} and ${name_2} walk away.` + `\r\n\r\n`;

    await sleep(1000);

    manage_allow_continue(true);
  }
}

// █▀█ █▀█ ▄▀█ █▄█
// █▀▀ █▀▄ █▀█ ░█░

// Pray
async function pray() {
  game_text.innerHTML += `<span class="choice">Pray at the shrine?\r\n\r\n`;

  await await_input();

  // APPROACH SHRINE
  if (player_input == "y") {
    game_text.innerHTML += "You head towards the shrine.\r\n";
  }
  // PASS BY SHRINE
  else if (player_input == "n") {
    game_text.innerHTML += "You do not pray at the shrine and move on.\r\n";
    manage_allow_continue(true);
    return;
  }

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
      "<span class='heal'>Your max hp has increased by 10 and fully healed.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="info">Your current max hp is ${max_hp}.</span>\r\n`;
  }

  // Fail with 80% Chance
  else {
    game_text.innerHTML +=
      "<span class='drastic'>Your prayers have been rejected.</span>\r\n\r\n";

    await sleep(1000);

    game_text.innerHTML += `<span class="dmg">You take 15 damage.</span>\r\n`;
    await damage(15);
    update_stats();
  }
  manage_allow_continue(true);
  update_stats();
}

// █▄▄ ▄▀█ █▄░█ █▀▄ █ ▀█▀
// █▄█ █▀█ █░▀█ █▄▀ █ ░█░

// Bandit
async function bandit() {
  game_text.innerHTML += `<span class="choice">Try to flee?\r\n\r\n`;

  await await_input();

  // TRIES TO FLEE
  if (player_input == "y") {
    let flee_chance = Math.random();
    // Flee with 20% Chance
    if (flee_chance < 0.2) {
      await sleep(1000);

      game_text.innerHTML +=
        "<span class='blessing'>You successfully flee from the bandit.</span>\r\n";
      manage_allow_continue(true);
      return;
    }
    // Fail with 80% Chance
    else {
      await sleep(1000);

      game_text.innerHTML +=
        "<span class='drastic'>You fail to flee.</span>\r\n";

      await sleep(2000);
    }
  }
  // TRIES TO NOT FLEE
  else if (player_input == "n") {
    game_text.innerHTML += "You choose to approach the bandit.\r\n";

    await sleep(2000);
  }

  game_text.innerHTML = `<span class="bandit">BANDIT</span>` + `\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `The bandit ambushes you.\r\n\r\n`;

  await sleep(2000);

  let steal_chance = Math.random();

  // STEAL 55%
  if (steal_chance < 0.55) {
    let steal_item_chance = Math.random();

    // STEAL ITEM
    if (steal_item_chance < 0.5) {
      // HAS ITEMS
      if (inventory.length != 0) {
        let weapon_to_steal = inventory.sample();
        inventory.pop(weapon_to_steal);
        update_stats();
        game_text.innerHTML += `The bandit steals the ${weapon_to_steal}.\r\n\r\n`;

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
    // STEAL GOLD 45%
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

    game_text.innerHTML += `<span class="dmg">You take 10 damage.</span>\r\n\r\n`;
    await damage(10);
    update_stats();

    await sleep(1000);

    game_text.innerHTML += `The bandit flees.\r\n\r\n`;
    manage_allow_continue(true);
  }
}

// █▀▀ █░█ █▀▀ █▀ ▀█▀   █▀▀ █░█ █▀▀ █▄░█ ▀█▀
// █▄▄ █▀█ ██▄ ▄█ ░█░   ██▄ ▀▄▀ ██▄ █░▀█ ░█░

// Chest Event
async function chest_event(chest_name, is_stone_chest) {
  switch (chest_name) {
    case "shipwreck":
      game_text.innerHTML += `<span class='choice'>Take a look at the shipwreck?</span>\r\n\r\n`;
      break;
    case "chest":
      game_text.innerHTML += `<span class='choice'>Open ${chest_name}?</span>\r\n\r\n`;
      break;
    case "stone chest":
      game_text.innerHTML += `<span class='choice'>Open ${chest_name}?</span>\r\n\r\n`;
      break;
  }

  await await_input();

  // OPENS CHEST
  if (player_input == "y") {
    switch (chest_name) {
      case "shipwreck":
        game_text.innerHTML += "You sail to the shipwreck.\r\n\r\n";
        break;
      case "chest":
        game_text.innerHTML += `You open the ${chest_name}.\r\n\r\n`;
        break;
      case "stone chest":
        game_text.innerHTML += `You open the ${chest_name}.\r\n\r\n`;
        break;
    }
    let d = Math.random();

    // Open Chest Successfully
    if (d < 0.7) {
      await open_loot_container(chest_loot_table, 1, 5, false);

      update_stats();

      manage_allow_continue(true);
    }
    // Chest is trap
    else {
      let dmg = randomIntFromInterval(5, 10);
      damage(dmg);

      await sleep(1000);

      if (is_stone_chest) {
        game_text.innerHTML +=
          "<span class='drastic'>It is a mimic.</span>\r\n\r\n";
      }

      if (chest_name == "shipwreck") {
        game_text.innerHTML +=
          "<span class='drastic'>It collapses.</span>\r\n\r\n";
      } else if (!is_stone_chest) {
        game_text.innerHTML +=
          "<span class='drastic'>It is a trap.</span>\r\n\r\n";
      }

      await sleep(1000);

      game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;
      update_stats();
      manage_allow_continue(true);
    }
  }
  // DOESNT OPEN CHEST
  else if (player_input == "n") {
    switch (chest_name) {
      case "shipwreck":
        game_text.innerHTML += "You ignore the shipwreck and move on.\r\n";
        break;
      case "chest":
        game_text.innerHTML +=
          `You do not open the ${chest_name} and move on.` + `\r\n`;
        break;
      case "stone chest":
        game_text.innerHTML +=
          `You do not open the ${chest_name} and move on.` + `\r\n`;
        break;
    }

    manage_allow_continue(true);
  }
}

// █▀▄ ▄▀█ █▀▄▀█ ▄▀█ █▀▀ █▀▀   █▀▀ █░█ █▀▀ █▄░█ ▀█▀
// █▄▀ █▀█ █░▀░█ █▀█ █▄█ ██▄   ██▄ ▀▄▀ ██▄ █░▀█ ░█░

// Damage Event
async function damage_event(
  damage_event_name,
  damage_event_min_damage,
  damage_event_max_damage
) {
  let dmg = randomIntFromInterval(
    damage_event_min_damage,
    damage_event_max_damage
  );

  game_text.innerHTML += `A violent ${damage_event_name} hits you.\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `<span class="dmg">You take ${dmg} damage.</span>\r\n`;

  await damage(dmg);

  if (alive) {
    manage_allow_continue(true);
  }
}

// █▀▄ █ █▀ █▀▀ █░█ █ █▀ █▀▀ █▀▄   █▀▀ █░█ █▀▀ █▄░█ ▀█▀
// █▄▀ █ ▄█ █▄█ █▄█ █ ▄█ ██▄ █▄▀   ██▄ ▀▄▀ ██▄ █░▀█ ░█░

// Disguised Event
async function disguised_event(disguised_event) {
  switch (disguised_event) {
    case "blurry object":
      game_text.innerHTML += `<span class='choice'>Come closer?</span>\r\n\r\n`;
      break;
    case "object burried in the ground":
      game_text.innerHTML += `<span class='choice'>Dig it up?</span>\r\n\r\n`;
      break;
  }

  await await_input();

  // APPROACH OBJ
  if (player_input == "y") {
    game_text.innerHTML += "You approach.\r\n\r\n";

    let obj = blurry_object.sample();

    await sleep(1000);

    let d = Math.random();
    // Successfully 60%
    if (d < 0.6) {
      game_text.innerHTML += `It is ${correct_article(obj)} ${obj}.\r\n\r\n`;

      await sleep(1000);

      await open_loot_container(blurry_object_loot_table, 1, 4, false);

      update_stats();
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
  // DOESNT APPROACH
  else if (player_input == "n") {
    switch (disguised_event) {
      case "blurry object":
        game_text.innerHTML +=
          "You do not approach the blurry object and proceed.\r\n";
        break;
      case "object burried in the ground":
        game_text.innerHTML +=
          "You do not approach the object burried in the ground.\r\n";
        break;
    }

    manage_allow_continue(true);
  }
}

// █░░ █▀█ █▀ ▀█▀   █▀ █▀▀ █▀█ █ █▀█ ▀█▀ █░█ █▀█ █▀▀
// █▄▄ █▄█ ▄█ ░█░   ▄█ █▄▄ █▀▄ █ █▀▀ ░█░ █▄█ █▀▄ ██▄

// Lost Scripture
// DESCRIPTION: LEARN NEW SPELL
async function lost_scripture() {
  game_text.innerHTML += `<span class="choice">Attempt to decipher the lost scripture?</span>\r\n\r\n`;

  await await_input();

  if (player_input == "y") {
    game_text.innerHTML += "You take a look at the lost scripture.\r\n\r\n";
  } else {
    game_text.innerHTML += "You pass by the lost scripture.";
    manage_allow_continue(true);
    return;
  }

  await sleep(1000);

  let decipher_chance = Math.random();

  // Succeed decipher with 80%
  if (decipher_chance < 0.8) {
    let spell_to_learn = lost_scripture_loot_table.sample();

    game_text.innerHTML += `<span class="blessing">You deciphered the lost scripture.</span>\r\n\r\n`;

    await sleep(1000);

    // Check if Spell is already learnt
    if (spell_inventory.includes(spell_to_learn)) {
      game_text.innerHTML += `The lost scripture contained instructions on using the spell <span class="info">${capitalize_first_letters(
        spell_to_learn
      )}.</span> However, you already know how to use this spell.\r\n\r\n`;
    }
    // Spell is new Spell
    else {
      game_text.innerHTML += `You learned how to use the spell: <span class="info">${capitalize_first_letters(
        spell_to_learn
      )}.</span>\r\n\r\n`;
      // Add Spell to Spell Inventory
      spell_inventory.push(spell_to_learn);
    }
  }
  // Fail to decipher with 20%
  else {
    game_text.innerHTML += `<span class="drastic">You fail to decipher the lost scripture.</span>\r\n\r\n`;
  }

  await sleep(1000);

  game_text.innerHTML += `You walk off.`;
  manage_allow_continue(true);
}

// █▀▀ █▀█ █░░ █▀▄ █▀▀ █▄░█   █▀ ▀█▀ ▄▀█ ▀█▀ █░█ █▀▀
// █▄█ █▄█ █▄▄ █▄▀ ██▄ █░▀█   ▄█ ░█░ █▀█ ░█░ █▄█ ██▄

// Golden Statue
// DESCRIPTION: SACRIFICE ONE ITEM FOR REWARD
async function golden_statue() {
  await sleep(1000);

  game_text.innerHTML += `The statue is standing on a pressure plate.\r\n\r\n`;

  await sleep(1000);

  game_text.innerHTML += `<span class="choice">Sacrifice a weapon for the gold statue?</span>\r\n\r\n`;

  await await_input();

  // Player doesn't sacrifice Weapon
  if (player_input == "n") {
    await sleep(1000);
    game_text.innerHTML += "You walk away.";
    manage_allow_continue(true);
    return;
  }
  // Player sacrifices Weapon
  else {
    await sleep(1000);
    // Check if Player has Weapon
    if (inventory.length > 0) {
      let weapon_to_sacrifice = "";
      while (weapon_to_sacrifice == "") {
        for (let i = 0; i < inventory.length; i++) {
          game_text.innerHTML += `<span class="choice">Sacrifice ${capitalize_first_letters(
            inventory[i]
          )}?</span>\r\n\r\n`;

          await await_input();

          if (player_input == "y") {
            weapon_to_sacrifice = inventory[i];
            await sleep(1000);

            game_text.innerHTML += `You sacrifice the ${capitalize_first_letters(
              inventory[i]
            )} for the golden statue.\r\n\r\n`;
            inventory.pop(inventory[i]);
            update_stats();

            await sleep(1000);

            game_text.innerHTML += `The statue cracks open.\r\n\r\n`;

            await sleep(1000);

            let gold_chance = Math.random();

            if (gold_chance < 0.85) {
              game_text.innerHTML += `<span class="blessing">Gold coins fall out.</span>\r\n\r\n`;

              let gold_amt = randomIntFromInterval(60, 300);
              gold += gold_amt;

              await sleep(1000);

              game_text.innerHTML += `You find <span class="gold">${gold_amt}</span> gold.\r\n\r\n`;
              update_stats();
            } else {
              game_text.innerHTML += `<span class="drastic">There was nothing inside.</span>\r\n\r\n`;
            }

            await sleep(1000);

            break;
          } else {
            continue;
          }
        }
      }
      await sleep(1000);
      game_text.innerHTML += "You walk away.";
      manage_allow_continue(true);
      return;
    }
    // Player has no Weapon
    await sleep(1000);
    game_text.innerHTML += "You have no weapon to sacrifice.";
    await sleep(1000);
    game_text.innerHTML += "You walk away.";
    manage_allow_continue(true);
    return;
  }
}

// ▄▀█ █▄░█ █▀▀ █ █▀▀ █▄░█ ▀█▀   █▀▄ █▀▀ █░█ █ █▀▀ █▀▀
// █▀█ █░▀█ █▄▄ █ ██▄ █░▀█ ░█░   █▄▀ ██▄ ▀▄▀ █ █▄▄ ██▄

// Ancient Device
async function ancient_device() {
  await sleep(1000);

  game_text.innerHTML += `<span class="choice">Use ancient device?</span>\r\n\r\n`;

  await await_input();

  if (player_input == "y") {
    let outcomes = ["heal", "max hp", "mana", "max mana", "dmg", "mana depl"];
    let outcome = outcomes.sample();

    await sleep(1000);

    game_text.innerHTML += `The machine comes alive, its gears and levers moving in a complex, enigmatic process that you can't quite comprehend.\r\n\r\n`;

    await sleep(3000);

    switch (outcome) {
      case "heal":
        let amt_to_heal = randomIntFromInterval(20, Math.floor(max_hp / 2));

        hp += amt_to_heal;
        if (hp > max_hp) hp = max_hp;
        update_stats();

        game_text.innerHTML += `<span class="heal">You healed ${amt_to_heal} hp.</span>\r\n\r\n`;
        break;
      case "max hp":
        max_hp += 7;
        update_stats();

        game_text.innerHTML += `<span class="blessing">Your maximal hp has increased.</span>\r\n\r\n`;
        break;
      case "mana":
        let mana_amt = randomIntFromInterval(5, max_mana);

        mana += mana_amt;
        if (mana > max_mana) mana = max_mana;
        update_stats();

        game_text.innerHTML += `<span class="mana">You channeled ${mana_amt} mana.</span>\r\n\r\n`;
        break;
      case "max mana":
        max_mana += 5;
        update_stats();

        game_text.innerHTML += `<span class="mana">Your mana capacity has increased.</span>\r\n\r\n`;
        break;
      case "dmg":
        let dmg = randomIntFromInterval(5, 15);

        game_text.innerHTML += `<span class="drastic">The machine exploded.</span>\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `<span class="dmg">You took ${dmg} damage.</span>\r\n\r\n`;
        damage(dmg);

        break;
      case "mana depl":
        let amt = randomIntFromInterval(1, mana);

        game_text.innerHTML += `<span class="drastic">The machine drains your mana.</span>\r\n\r\n`;

        await sleep(1000);

        game_text.innerHTML += `<span class="dmg">The machine drained ${amt} mana.</span>\r\n\r\n`;
        mana -= amt;
        update_stats();
        break;
    }

    await sleep(1000);

    game_text.innerHTML += `The device stops working.\r\n\r\n`;

    await sleep(1000);

    game_text.innerHTML += `You walk away.\r\n\r\n`;
  } else {
    await sleep(1000);

    game_text.innerHTML += `You decide to ignore the ancient device.\r\n\r\n`;
  }

  manage_allow_continue(true);
}
// #endregion
