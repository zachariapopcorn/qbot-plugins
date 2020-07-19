exports.run = async (client, message, args) => {
  if(message.member.hasPermission("BAN_MEMBERS")) {
    const mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    if(mention) {
      if(message.member.roles.highest.position > mention.roles.highest.position) {
        if(mention.bannable) {
          if(message.guild.me.hasPermission("BAN_MEMBERS")) {
            if(mention.id != message.author.id) {
              if(args[1]) {
                mention.ban({reason: `Banned by ${message.author.tag} with reason: ${args.slice(1).join(" ")}`})
              } else {
                mention.ban({reason: `Banned by ${message.author.tag}, no reason given.`})
              }
              message.channel.send({embed: {
                color: 9240450,
                description: `Successfully banned <@${mention.id}>!`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
              if(process.env.logchannelid === 'false') return;
              let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
              if(args[1]) {
                return logchannel.send({embed: {
                color: 2127726,
                description: `<@${message.author.id}> (${message.author.tag}) banned <@${mention.id}> (${mention.user.tag}) with reason ${args.slice(1).join(" ")}.`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                },
                footer: {
                  text: 'Ban Logs'
                },
                timestamp: new Date(),
                }})
              } else {
                return logchannel.send({embed: {
                  color: 2127726,
                  description: `<@${message.author.id}> (${message.author.tag}) banned <@${mention.id}> (${mention.user.tag}) with no reason.`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  },
                  footer: {
                    text: 'Ban Logs'
                  },
                  timestamp: new Date(),
                }})
              }
            } else return message.channel.send({embed: {
              color: 16733013,
              description: `You cannot ban yourself!`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }})
          } else return message.channel.send({embed: {
            color: 16733013,
            description: `I need the \`BAN_MEMBERS\` permission!`,
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            }
          }})
        } else return message.channel.send({embed: {
          color: 16733013,
          description: `My role is not high enough to ban this person!`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }})
      } else return message.channel.send({embed: {
        color: 16733013,
        description: `Your highest role is too low to ban this person!`,
        author: {
          name: message.author.tag,
          icon_url: message.author.displayAvatarURL()
        }
      }})
    } else {
      let findname = await message.guild.members.fetch({query: args[0], limit: 1});
      if(findname.first()) {
        let filter = (msg) => msg.author.id === message.author.id;
        const msg = await message.channel.send({embed: {
          color: 39423,
          description: `Do you want to ban <@${findname.first().id}> (${findname.first().user.tag})?`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          },
          footer: {
            text: `Options: yes | no`
          }
        }});
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(async collected => {
          if (collected.size === 0) {
            message.channel.send({embed: {
              description: `You took to long.`,
              color: 16733013,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }});
          } else {
            let answer = collected.first().content.toLowerCase();
            if(answer === "yes") {
              if(message.member.roles.highest.position > findname.first().roles.highest.position) {
                if(findname.first().bannable) {
                  if(message.guild.me.hasPermission("BAN_MEMBERS")) {
                    if(findname.first().id != message.author.id) {
                      findname.first().ban(args.slice(1).join(" "))
                      message.channel.send({embed: {
                        color: 9240450,
                        description: `Successfully banned <@${findname.first().id}>!`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        }
                      }})
                      if(process.env.logchannelid === 'false') return;
                      let logchannel = await message.guild.channels.cache.get(process.env.logchannelid);
                      if(args[1]) {
                        return logchannel.send({embed: {
                          color: 2127726,
                          description: `<@${message.author.id}> (${message.author.tag}) banned <@${findname.first().id}> (${findname.first().user.tag}) with reason ${args.slice(1).join(" ")}.`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL()
                          },
                          footer: {
                            text: 'Ban Logs'
                          },
                          timestamp: new Date(),
                        }})
                      } else {
                        return logchannel.send({embed: {
                          color: 2127726,
                          description: `<@${message.author.id}> (${message.author.tag}) banned <@${findname.first().id}> (${findname.first().user.tag}) with no reason.`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL()
                          },
                          footer: {
                            text: 'Ban Logs'
                          },
                          timestamp: new Date(),
                        }})
                      }
                    } else return message.channel.send({embed: {
                            color: 16733013,
                            description: `You cannot ban yourself!`,
                            author: {
                              name: message.author.tag,
                              icon_url: message.author.displayAvatarURL()
                            }
                          }})
                        } else return message.channel.send({embed: {
                          color: 16733013,
                          description: `I need the \`BAN_MEMBERS\` permission!`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                          }
                        }})
                  } else return message.channel.send({embed: {
                    color: 16733013,
                    description: `My role is not high enough to ban this person!`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }})
                } else return message.channel.send({embed: {
                  color: 16733013,
                  description: `Your highest role is too low to ban this person!`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
            } else if(answer === "no") {
              return message.channel.send({embed: {
                description: `Did not ban them.`,
                color: 9240450,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else return message.channel.send({embed: {
              description: `That is not a valid option!`,
              color: 16733013,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }})
          }
        })
      } else return message.channel.send({embed: {
        description: `Please mention or say someones name!`
      }})
    }
  } else return message.channel.send({embed:{
    description: "You need the `BAN_MEMBERS` permission to use this command.",
    color: 16733013,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
 }})
}
