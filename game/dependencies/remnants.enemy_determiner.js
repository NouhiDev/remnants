// ███████╗███╗░░██╗███████╗███╗░░░███╗██╗░░░██╗
// ██╔════╝████╗░██║██╔════╝████╗░████║╚██╗░██╔╝
// █████╗░░██╔██╗██║█████╗░░██╔████╔██║░╚████╔╝░
// ██╔══╝░░██║╚████║██╔══╝░░██║╚██╔╝██║░░╚██╔╝░░
// ███████╗██║░╚███║███████╗██║░╚═╝░██║░░░██║░░░
// ╚══════╝╚═╝░░╚══╝╚══════╝╚═╝░░░░░╚═╝░░░╚═╝░░░
// ██████╗░███████╗████████╗███████╗██████╗░███╗░░░███╗██╗███╗░░██╗███████╗██████╗░
// ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗░████║██║████╗░██║██╔════╝██╔══██╗
// ██║░░██║█████╗░░░░░██║░░░█████╗░░██████╔╝██╔████╔██║██║██╔██╗██║█████╗░░██████╔╝
// ██║░░██║██╔══╝░░░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║██║██║╚████║██╔══╝░░██╔══██╗
// ██████╔╝███████╗░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██║██║░╚███║███████╗██║░░██║
// ╚═════╝░╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝

// Intervals (Classes) used for enemy XP, enemy DMG, enemy HP, etc.
var weak = [0, 0];
var below_avg = [0, 0];
var common = [0, 0];
var above_avg = [0, 0];
var strong = [0, 0];
var monster = [0, 0];
var abomination = [0, 0];

function change_enemy_determinator_class(det_class) {
  switch (det_class) {
    case "xp":
      weak = [5, 15];
      below_avg = [15, 25];
      common = [25, 35];
      above_avg = [35, 45];
      strong = [45, 55];
      monster = [55, 65];
      abomination = [65, 75];
      break;
    case "dmg":
      weak = [2, 7];
      below_avg = [4, 8];
      common = [6, 11];
      above_avg = [8, 14];
      strong = [10, 17];
      monster = [12, 19];
      abomination = [14, 23];
      break;
    case "hp":
      weak = [5, 10];
      below_avg = [8, 14];
      common = [11, 19];
      above_avg = [14, 25];
      strong = [17, 30];
      monster = [20, 34];
      abomination = [23, 39];
      break;
  }
}

// Enemy Determiner
function enemy_determiner(enemy, determiner) {
  change_enemy_determinator_class(determiner);
  switch (enemy) {
    case "small_dungeon_boss":
      return strong;
    // REGION 0: FOREST
    case "spider":
      return weak;
    case "werewolf":
      return below_avg;
    case "dryad":
      return below_avg;
    case "gnome":
      return weak;
    case "wendigo":
      return common;
    case "ent":
      return common;
    case "harpy":
      return below_avg;
    case "basilisk":
      return common;
    case "lizard":
      return common;
    case "rat":
      return weak;
    case "leech":
      return weak;
    case "mosquito":
      return weak;
    // REGION 1: LOCKWOOD VILLAGE + 10-19
    case "goblin":
      return below_avg;
    case "orc":
      return above_avg;
    case "wraith":
      return above_avg;
    case "megaspider":
      return common;
    case "bandit":
      return below_avg;
    case "troll":
      return strong;
    case "wight":
      return common;
    // REGION 2: EASTPORT + 20-29
    case "centipede":
      return weak;
    case "megacentipede":
      return above_avg;
    case "ghoul":
      return common;
    case "rakshasa":
      return common;
    case "hag":
      return weak;
    case "hollow":
      return weak;
    case "banshee":
      return common;
    case "maggot":
      return weak;
    case "possessed":
      return below_avg;
    // REGION 3: OCEAN + 30-39
    case "sea monster":
      return above_avg;
    case "mermaid":
      return weak;
    case "siren":
      return below_avg;
    case "leviathan":
      return abomination;
    case "sea serpent":
      return strong;
    case "water elemental":
      return above_avg;
    case "charybdis":
      return monster;
    case "kraken":
      return abomination;
    case "megasquid":
      return strong;
    case "megacrab":
      return above_avg;
    case "naga":
      return above_avg;
    case "deep one":
      return common;
    case "manta ray":
      return weak;
    case "jellyfish":
      return weak;
    case "octopus":
      return below_avg;
    // REGION 4: SHORE
    case "vulture":
      return weak;
    case "werewolf":
      return below_avg;
    case "spirit":
      return below_avg;
    case "bat":
      return weak;
    case "dweller":
      return below_avg;
    case "lobster":
      return weak;
    case "scorpion":
      return weak;
    case "sandworm":
      return strong;
    case "worm":
      return weak;
    case "seagull":
      return weak;
    case "turtle":
      return weak;
    // REGION 6: WASTELAND
    case "insect":
      return weak;
    case "giant":
      return monster;
    case "golem":
      return above_avg;
    case "witch":
      return above_avg;
    case "druid":
      return common;
    case "infernal":
      return strong;
    case "beetle":
      return weak;
    case "fly":
      return weak;
    case "wasp":
      return weak;
    case "snake":
      return weak;
    // REGION 7: LOST TEMPLE
    case "skeleton":
      return common;
    case "skeletal warrior":
      return above_avg;
    case "mummy":
      return weak;
    case "cultist":
      return above_avg;
    case "homunculus":
      return strong;
    case "necromancer":
      return strong;
    case "kobold":
      return weak;
    case "lich":
      return strong;
    // REGION 8: SWAMP
    case "snail":
      return weak;
    case "blood snail":
      return common;
    case "crawler":
      return below_avg;
    case "shaman":
      return above_avg;
    case "sludge worm":
      return common;
    case "crocodile":
      return above_avg;
    case "alligator":
      return above_avg;
    case "frog":
      return weak;
    case "slime":
      return below_avg;
    case "piranha":
      return common;
    case "skunk ape":
      return strong;
    // REGION 9: MOUNTAINS
    case "lion":
      return above_avg;
    case "bear":
      return above_avg;
    case "rock elemental":
      return above_avg;
    case "rock drake":
      return strong;
    case "eagle":
      return weak;
    case "dwarf":
      return weak;
    case "roc":
      return below_avg;
    case "chimera":
      return strong;
    case "gnoll":
      return below_avg;
    case "centaur":
      return above_avg;
  }
}
