const Discord = require('discord.js');

const config = {
    description: 'Plays a RPS game with the bot',
    aliases: [],
    usage: '<choice>',
    rolesRequired: [],
    category: 'Fun'
}

module.exports = {
    config,

    /**
    * @param {Discord.Message} message
    * @param {Discord.Client} client
    * @param {String[]} args
    */

    run: async (client, message, args) => {
        
        function embedMaker(type, title, description) {
            let embed = new Discord.MessageEmbed();
            embed.setColor(client.config.colors[type]);
            embed.setTitle(title);
            embed.setDescription(description);
            embed.setFooter("Plugin made by zachariapopcorn#8105");
            return embed;
        }

        if(!args[0]) {
            return message.channel.send(embedMaker("error", "No Option Supplied", `You didn't supply an option for the RPS game`));
        }

        let userChoice = args[0].toLowerCase();
        var number = Math.round(Math.random() * 3)
        let computerChoice
        
        if(number == 1) {
            computerChoice = "rock"
        }
        else if(number == 2) {
            computerChoice = "paper"
        }
        else {
            computerChoice = "scissors"
        }

        if(userChoice == "rock" && computerChoice == "paper") {
            return message.channel.send(embedMaker("info", "Results", `You have lost! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "paper" && computerChoice == "rock") {
          return message.channel.send(embedMaker("info", "Results", `You have won! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "paper" && computerChoice == "scissors") {
            return message.channel.send(embedMaker("info", "Results", `You have lost! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "scissors" && computerChoice == "paper") {
            return message.channel.send(embedMaker("info", "Results", `You have won! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "rock" && computerChoice == "scissors") {
            return message.channel.send(embedMaker("info", "Results", `You have won! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "rock" && computerChoice == "scissors") {
            return message.channel.send(embedMaker("info", "Results", `You have lost! You chose ${userChoice} while I chose ${computerChoice}.`));
        }
        else if(userChoice == "rock" && computerChoice == "rock") {
            return message.channel.send("TIE!")
        }
        else if(userChoice == "paper" && computerChoice == "paper") {
            return message.channel.send("TIE!")
        }
        else if(userChoice == "scissors" && computerChoice == "scissors") {
            return message.channel.send("TIE!")
        } else {
            return message.channel.send(embedMaker("error", `Invalid Option`, `You didn't supply a valid option for the game`));
        }
    }
}
