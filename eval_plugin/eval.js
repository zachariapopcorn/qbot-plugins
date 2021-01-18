const Discord = require('discord.js');

const config = {
    description: 'Executes code on the Node.js process',
    aliases: ['execute'],
    usage: '<code>',
    rolesRequired: ['Execution Permissions'],
    category: 'Execution'
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

        let code = args.splice(0).join(" ");
        if(!code) {
            return message.channel.send(embedMaker("error", "No Code Supplied", "You didn't supply code for me to execute"));
        }

        try {
            await eval(code);
        } catch (err) {
            return message.channel.send(embedMaker("error", "Error", `There was an error while attempting to execute this code: ${err}`));
        }

        return message.channel.send(embedMaker("success", "Success", `I have successfully executed the code supplied`));
    }
}
