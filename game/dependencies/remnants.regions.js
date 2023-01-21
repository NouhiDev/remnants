//██████╗░███████╗░██████╗░██╗░█████╗░███╗░░██╗░██████╗
//██╔══██╗██╔════╝██╔════╝░██║██╔══██╗████╗░██║██╔════╝
//██████╔╝█████╗░░██║░░██╗░██║██║░░██║██╔██╗██║╚█████╗░
//██╔══██╗██╔══╝░░██║░░╚██╗██║██║░░██║██║╚████║░╚═══██╗
//██║░░██║███████╗╚██████╔╝██║╚█████╔╝██║░╚███║██████╔╝
//╚═╝░░╚═╝╚══════╝░╚═════╝░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░
// This section contains an array filled with the regions / acts changing every 10 steps (1000m)
// All the following entries are to be set in correct capitalization

// CHAPTER 1: The Beginning
// ACT 1: FOREST: -
// ACT 2: LOCKWOOD VILLAGE: -
var regions = [
  "Lockwood Village",

  // ACT 3: EASTPORT: -
  "Eastport",

  // ACT 4: OCEAN: -
  "Ocean",

  // ACT 5: ROCKY SHORE: -
  "Rocky Shore",

  // ACT 6: REBELLION: Finally, you reach the rebellion's stronghold. The leader of the rebellion, an experienced knight,
  // tells you that the sorcerer's power comes from an ancient artifact that he has acquired and using it to control people.
  // The rebellion needs your help to find this artifact and destroy it.
  "Rebellion",

  // CHAPTER 2: After reaching the Rebellion
  // ACT 7: WASTELAND: -
  "Wasteland",

  // ACT 8: LOST TEMPLE: -
  "Lost Temple",

  // ACT 9: SWAMP: -
  "Swamp",

  // ACT 10: MOUNTAINS: -
  "Mountains",

  // ACT 11: ICY PEAK: -
  "Icy Peak",

  // ACT 12: ???: -
  "???",

  // CHAPTER 3: Inside the Sorcerers Stronghold

  // CATACOMBS: Network of underground tunnels and tombs beneath the sorcerer's stronghold.
  // The catacombs are filled with traps and puzzles, as well as undead creatures
  // that the sorcerer has raised to guard his treasures.
  // ACT 13: CATACOMBS: -
  "Catacombs",

  // LABYRINTH: A massive, twisting maze located deep in the sorcerer's stronghold.
  // The labyrinth is filled with all sorts of monsters and challenges, as well as a powerful boss at the center who guards the
  // the entrance to the stronghold.
  // ACT 14: LABYRINTH
  "Labyrinth",

  // MAIN HALL: Once you've made it inside, you find yourself in a grand hall. The walls are adorned with tapestries
  // and the floors are made of marble. But don't let the opulence fool you - this is the heart of the sorcerer's power,
  // and you can sense the dark magic that permeates the air. You'll need to find a way to navigate through this hall and
  // reach the higher levels of the stronghold.
  // ACT 15: MAIN HALL
  "Main Hall",

  // ILLUSIONARY GARDEN: A beautiful garden filled with illusory flowers and plants,
  // which can become deadly traps or illusions of the sorcerer's enemies and allies.
  // ACT 16: ILLUSIONARY GARDEN
  "Illusionary Garden",

  // LIBRARY: You find a stairway that leads up to the stronghold's library. Here you find rows upon rows of books,
  // some ancient, some enchanted and some cursed. The librarian is an undead creature that the sorcerer has reanimated,
  // who will attack anyone who tries to take or damage the books.
  // ACT 17: LIBRARY
  "Library",

  // CLOCKTOWER: A tall and winding tower filled with gears and clockwork mechanisms.
  // The clocktower is home to clockwork golems that the sorcerer has imbued with magic, and it's said that the sorcerer
  // uses the clocktower to manipulate time itself.
  // ACT 18: CLOCKTOWER
  "Clocktower",

  // TOWER OF TRIALS: A tall and imposing tower located in the stronghold, where the sorcerer tests his apprentices and visitors
  // with deadly magical trials. The tower is filled with illusions, mind-bending puzzles, and deadly traps that only the most
  // skilled and clever adventurers can overcome.
  // ACT 19: TOWER OF TRIALS
  "Tower of Trials",

  // INNER SANCTUM: You've reached the heart of the stronghold, the inner sanctum where the sorcerer awaits.
  // The room is grand and imposing, with the sorcerer's throne at the far end. You'll need to be prepared
  // for a final battle with the sorcerer, as he unleashes all of his power to defeat you and protect his stronghold.
  // ACT 20: INNER SANCTUM
  "Inner Sanctum",

  // ???
  "Last Supper",
];
current_region = "";
