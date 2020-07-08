// Don't forget to add the images as a link on lines 11 and 15

const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  var coin = Math.random() >= 0.5;

  if (coin >= 0.5) {
    var coinflip = "Heads";
    var coinURL =
      ""; // Put your own HEADs url here
  } else {
    var coinflip = "Tails";
    var coinURL =
      ""; // Put your own TAIL url here
  }
  const embed = new Discord.MessageEmbed({
            color: 7948427,
            description: `**Flipped Coin**`,
            image: {
              url: coinURL
            },
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            },
            footer: {
              text: coinflip
            }
  })
  const embed1 = message.channel
    .send({
      embed: {
        color: 7948427,
        description: `**Flipping Coin...**` // If you would like to add an emoji see z-emoji.md below
      }
    })
    .then(embed1 => {
      setTimeout(function() {
        embed1.edit(embed)
      }, 10000); // Time in milliseconds | 1000 = 1 second
    });
};
