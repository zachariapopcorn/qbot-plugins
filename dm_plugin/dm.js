exports.run = async (client, message, args) => {
  let filter = (msg) => msg.author.id === message.author.id;
  if (
    message.member.roles.cache.some(role =>
      ["DM Permissions"].includes(role.name)
    )
  ) {
    let mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    const tosend = args.slice(1).join(" ");
    if (tosend) {
      if (mention) {
        await mention
          .send(`**${message.member.displayName}:** ${tosend}`)
          .then(async () => {
            message.channel.send({
              embed: {
                color: 9240450,
                description: "Successfully sent DM!",
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
            if (process.env.logchannelid === "false") return;
            let logchannel = await message.guild.channels.cache.get(
              process.env.logchannelid
            );
            logchannel.send({
              embed: {
                color: 2127726,
                description: `<@${message.author.id}> (${message.author.tag}) sent a DM to <@${mention.id}> (${mention.user.tag}) saying: \`${tosend}\``,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                },
                footer: {
                  text: "DM Logs"
                },
                timestamp: new Date()
              }
            });
          })
          .catch(async (err) => {
            return message.channel.send({
              embed: {
                color: 16733013,
                description: "That person does not have their DMs on!",
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          });
      } else {
        let findname = await message.guild.members.fetch({
          query: args[0],
          limit: 1
        });
        if (findname.first().id) {
          const msg = await message.channel.send({
            embed: {
              color: 39423,
              description: `Do you want to send this DM to <@${
                findname.first().id
              }> (${findname.first().user.tag})?`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              },
              footer: {
                text: `Options: no | yes`
              }
            }
          });
          message.channel
            .awaitMessages(filter, { max: 1, time: 60000 })
            .then(async collected => {
              if (collected.size === 0) {
                message.channel.send({
                  embed: {
                    description: `You took to long.`,
                    color: 16733013,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
              let answer = collected.first().content.toLowerCase();
              if (answer === "no") {
                return message.channel.send({
                  embed: {
                    color: 9240450,
                    description: `Did not send a DM.`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }
                });
              } else {
              if (answer === "yes") {
        await findname.first()
          .send(`**${message.member.displayName}:** ${tosend}`)
          .then(async () => {
            message.channel.send({
              embed: {
                color: 9240450,
                description: "Successfully sent DM!",
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
            if (process.env.logchannelid === "false") return;
            let logchannel = await message.guild.channels.cache.get(
              process.env.logchannelid
            );
            logchannel.send({
              embed: {
                color: 2127726,
                description: `<@${message.author.id}> (${message.author.tag}) sent a DM to <@${findname.first().id}> (${findname.first().user.tag}) saying: \`${tosend}\``,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                },
                footer: {
                  text: "DM Logs"
                },
                timestamp: new Date()
              }
            });
          })
          .catch(async (err) => {
            return message.channel.send({
              embed: {
                color: 16733013,
                description: "That person does not have their DMs on!",
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }
            });
          });
              } else {
                return message.channel.send({embed: {
                  color: 16733013,
                  description: 'That is not a valid option.',
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              }
              }
            }
            });
        }
      }
    } else
      message.channel.send({
        embed: {
          color: 16733013,
          description: "You did not say what to send!",
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }
      });
  } else {
    message.channel.send({
      embed: {
        color: 16733013,
        description: "You need the `DM Permissions` role to use this command!",
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        }
      }
    });
  }
};
