// Command made by TypicallyShadow
// Any suggestions? Feel free to contact me.
// Feel free to change any of the footers but do not claim that you made this command as it can be completely rude.

const roblox = require("noblox.js");
const Discord = require("discord.js");
require('dotenv').config();

exports.run = async (client, message, args) => {
    const getRoles = await roblox.getRoles(Number(process.env.groupId))
    const formattedRoles = getRoles.map((r) => `\`${r.name}\` - ${r.rank} **(${r.memberCount})**`);

    const rankListEmbed = new Discord.MessageEmbed() 
      .setTitle('Rank Information:')
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(8311585)
      .setDescription(formattedRoles)
      .setFooter(`qbot | Plugin by TypicallyShadow`);
    message.channel.send(rankListEmbed)
}
