// ██╗████████╗███████╗███╗░░░███╗
// ██║╚══██╔══╝██╔════╝████╗░████║
// ██║░░░██║░░░█████╗░░██╔████╔██║
// ██║░░░██║░░░██╔══╝░░██║╚██╔╝██║
// ██║░░░██║░░░███████╗██║░╚═╝░██║
// ╚═╝░░░╚═╝░░░╚══════╝╚═╝░░░░░╚═╝
// ██████╗░███████╗████████╗███████╗██████╗░███╗░░░███╗██╗███╗░░██╗███████╗██████╗░
// ██╔══██╗██╔════╝╚══██╔══╝██╔════╝██╔══██╗████╗░████║██║████╗░██║██╔════╝██╔══██╗
// ██║░░██║█████╗░░░░░██║░░░█████╗░░██████╔╝██╔████╔██║██║██╔██╗██║█████╗░░██████╔╝
// ██║░░██║██╔══╝░░░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║██║██║╚████║██╔══╝░░██╔══██╗
// ██████╔╝███████╗░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██║██║░╚███║███████╗██║░░██║
// ╚═════╝░╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝

function change_item_determinator_class(det_class) {
  switch (det_class) {
    case "dmg":
      w_weak = [5, 10];
      w_common = [10, 15];
      w_uncommon = [15, 25];
      w_above_avg = [20, 35];
      w_strong = [25, 45];
      w_mythical = [30, 55];
      w_legendary = [35, 65];
      break;
    case "price":
      w_weak = [10, 25];
      w_common = [35, 55];
      w_uncommon = [55, 70];
      w_above_avg = [75, 90];
      w_strong = [90, 120];
      w_mythical = [155, 265];
      w_legendary = [275, 400];
      break;
    case "mana cost":
      // Not used: w_weak = [5, 10];
      // Not used: w_common = [10, 15];
      w_uncommon = [7, 12];
      w_above_avg = [12, 17];
      w_strong = [17, 23];
      w_mythical = [22, 28];
      w_legendary = [27, 33];
      break;
  }
}

// Item Determiner
function item_determiner(item, determiner) {
  change_item_determinator_class(determiner);
  switch (item) {
    // █▀█ █▀█ ▀█▀ █ █▀█ █▄░█ █▀
    // █▀▀ █▄█ ░█░ █ █▄█ █░▀█ ▄█
    case "lesser healing potion":
      return w_weak;
    case "healing potion":
      return w_common;
    case "mana potion":
      return w_common;

    //  █▀ █▀█ █▀▀ █░░ █░░ █▀
    //  ▄█ █▀▀ ██▄ █▄▄ █▄▄ ▄█
    case "magic arrow":
      return w_uncommon;
    case "great magic arrow":
      return w_above_avg;
    case "heavy magic arrow":
      return w_above_avg;
    case "great heavy magic arrow":
      return w_strong;
    case "magic spear":
      return w_above_avg;
    case "self heal":
      return w_legendary;
    case "firebolt":
      return w_uncommon;
    case "frost nova":
      return w_uncommon;
    case "thunderstorm":
      return w_above_avg;
    case "holy light":
      return w_mythical;
    case "engulfing darkness":
      return w_strong;
    case "meteor":
      return w_strong;
    case "tidal wave":
      return w_above_avg;
    case "earthquake":
      return w_above_avg;
    case "radiance":
      return w_legendary;
    case "chaos tempest":
      return w_legendary;

    // █░█░█ █▀▀ ▄▀█ █▀█ █▀█ █▄░█ █▀
    // ▀▄▀▄▀ ██▄ █▀█ █▀▀ █▄█ █░▀█ ▄█
    case "damaged sword":
      return w_weak;
    case "dagger":
      return w_weak;
    case "axe":
      return w_common;
    case "sword":
      return w_common;
    case "bow":
      return w_common;
    case "halberd":
      return w_uncommon;
    case "greataxe":
      return w_above_avg;
    case "claymore":
      return w_above_avg;
    case "great halberd":
      return w_strong;
    case "greatsword":
      return w_strong;
    case "mace":
      return w_above_avg;
    case "warhammer":
      return w_uncommon;
    case "flail":
      return w_strong;
    case "spear":
      return w_above_avg;
    case "crossbow":
      return w_uncommon;
    case "scythe":
      return w_above_avg;
    case "scimitar":
      return w_strong;
    case "bastard sword":
      return w_uncommon;
    case "shortsword":
      return w_common;
    case "longsword":
      return w_above_avg;
    case "flamberge":
      return w_strong;
    case "falchion":
      return w_uncommon;
    case "rapier":
      return w_uncommon;
    case "estoc":
      return w_above_avg;
    case "club":
      return w_uncommon;
    case "wooden staff":
      return w_strong;
    case "small trident":
      return w_uncommon;
  }
}
