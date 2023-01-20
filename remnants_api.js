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

// Article Determination
vowels = ["a", "e", "i", "o", "u"];

function correct_article(input) {
  return vowels.includes(input[0]) ? "an" : "a";
}

// Capitilization
function capitalize_first_letters(input) {
  return input
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Loader
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
//
