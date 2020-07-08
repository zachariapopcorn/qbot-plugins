// Command made by TypicallyShadow
// Any suggestions? Feel free to contact me.
// Feel free to change any of the footers but do not claim that you made this command as it can be completely rude.
const roblox = require("noblox.js");
require('dotenv').config();

exports.run = async (client, message, args) => {

  let givenUsername = args[0];
  if (!givenUsername) 
  return message.channel.send({
     embed: {
       color: 13632027,
       description:
          `**You did not provide the \`username\` argument.**\n` +
          `\n` +
          `**Usage:** \`${process.env.prefix}getinfo <username>\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "qbot | Plugin by TypicallyShadow"
        }
      }
   });
  
   roblox.getIdFromUsername(givenUsername).then(function(id) {
     roblox.getUsernameFromId(id).then(function(completeUsername) {
       roblox.getRankInGroup(Number(process.env.groupId), id).then(function(rankSet) {
        roblox.getRankNameInGroup(Number(process.env.groupId), id).then(function(rankName) {
    
        message.channel.send({
           content: `${completeUsername}:${id}`,
           embed: {
             title: `User Information`,
             color: 8311585,              
           author: {
             name: message.author.tag,
             icon_url: message.author.displayAvatarURL()
              },
              fields: [
                {
                  name: `Username`,
                  value: `[${completeUsername}](https://www.roblox.com/users/${id}/profile)`,
                  inline: false
                },
                {
                  name: `ID`,
                  value: id,
                  inline: false
                },
                {
                  name: `Group Rank`,
                  value: `${rankName} **(${rankSet})**`,
                  inline: false
                }
              ],
              thumbnail: {
                url: `https://assetgame.roblox.com/Thumbs/Avatar.ashx?userid=${id}`
              },              
          footer: {
          text: "qbot | Plugin by TypicallyShadow"
              }
             }
           });
          })
        })
      })
    }).catch(function(err) {
      return message.channel.send({
        embed: {
          title: `User Invalid`,
          color: 13632027,
          description: `I couldn't find that user, perhaps you gave the wrong username?` + `\n` + `You provided: \`${givenUsername}\``,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        },
        footer: {
          text: "qbot | Plugin by TypicallyShadow"
        }
      }
    });
   })
};
