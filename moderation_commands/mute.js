exports.run = async (client, message, args) => {
  if(message.member.roles.cache.some(role => ['Mute Permissions'].includes(role.name))) {
    const mention =
      (await message.mentions.members.first()) ||
      (await message.guild.members.cache.get(args[0]));
    if(mention) {
      if(!mention.roles.cache.some(role => ["Mute Permissions"].includes(role.name))) {
        if(message.member.roles.highest.position > mention.roles.highest.position) {
          if(mention.manageable) {
            const muted = message.guild.roles.cache.find(role => role.name === 'Muted');
            if(muted) {
              if(!mention.roles.cache.some(role => ['Muted'].includes(role.name))) {
                if(message.guild.me.hasPermission("MANAGE_ROLES")) {
                  if(mention.id != message.author.id) {
                    mention.roles.add(muted)
                    message.channel.send({embed: {
                      color: 9240450,
                      description: `Successfully muted <@${mention.id}>!`,
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
                        description: `<@${message.author.id}> (${message.author.tag}) muted <@${mention.id}> (${mention.user.tag}) with reason ${args.slice(1).join(" ")}.`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        },
                        footer: {
                          text: 'Mute Logs'
                        },
                        timestamp: new Date(),
                      }})
                    } else {
                      return logchannel.send({embed: {
                        color: 2127726,
                        description: `<@${message.author.id}> (${message.author.tag}) muted <@${mention.id}> (${mention.user.tag}) with no reason.`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        },
                        footer: {
                          text: 'Mute Logs'
                        },
                        timestamp: new Date(),
                      }})
                    }
                  } else return message.channel.send({embed: {
                    color: 16733013,
                    description: `You cannot mute yourself!`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }})
                } else return message.channel.send({embed: {
                  color: 16733013,
                  description: `I need the \`MANAGE_ROLES\` permission!`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              } else return message.channel.send({embed: {
                color: 16733013,
                description: `That person is already muted!`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else return message.channel.send({embed: {
              color: 16733013,
              description: `There is no \`Muted\` role! Please make one!`,
              author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL()
              }
            }})
          } else return message.channel.send({embed: {
            color: 16733013,
            description: `My role is not high enough to manage this person!`,
            author: {
              name: message.author.tag,
              icon_url: message.author.displayAvatarURL()
            }
          }})
        } else return message.channel.send({embed: {
          color: 16733013,
          description: `Your highest role is too low to mute this person!`,
          author: {
            name: message.author.tag,
            icon_url: message.author.displayAvatarURL()
          }
        }})
      } else return message.channel.send({embed: {
        color: 16733013,
        description: `That person also has the \`Mute Permissions\` role so I won't mute them!`,
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
          description: `Do you want to mute <@${findname.first().id}> (${findname.first().user.tag})?`,
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
              if(!findname.first().roles.cache.some(role => ["Mute Permissions"].includes(role.name))) {
                if(message.member.roles.highest.position > findname.first().roles.highest.position) {
                  if(findname.first().manageable) {
                    const muted = message.guild.roles.cache.find(role => role.name === 'Muted');
                    if(muted) {
                      if(!findname.first().roles.cache.some(role => ['Muted'].includes(role.name))) {
                        if(message.guild.me.hasPermission("MANAGE_ROLES")) {
                          if(findname.first().id != message.author.id) {
                            findname.first().roles.add(muted)
                            message.channel.send({embed: {
                              color: 9240450,
                              description: `Successfully muted <@${findname.first().id}>!`,
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
                                description: `<@${message.author.id}> (${message.author.tag}) muted <@${findname.first().id}> (${findname.first().user.tag}) with reason ${args.slice(1).join(" ")}.`,
                                author: {
                                  name: message.author.tag,
                                  icon_url: message.author.displayAvatarURL()
                                },
                                footer: {
                                  text: 'Mute Logs'
                                },
                                timestamp: new Date(),
                              }})
                            } else {
                              return logchannel.send({embed: {
                                color: 2127726,
                                description: `<@${message.author.id}> (${message.author.tag}) muted <@${findname.first().id}> (${findname.first().user.tag}) with no reason.`,
                                author: {
                                  name: message.author.tag,
                                  icon_url: message.author.displayAvatarURL()
                                },
                                footer: {
                                  text: 'Mute Logs'
                                },
                                timestamp: new Date(),
                              }})
                            }
                          } else return message.channel.send({embed: {
                            color: 16733013,
                            description: `You cannot mute yourself!`,
                            author: {
                              name: message.author.tag,
                              icon_url: message.author.displayAvatarURL()
                            }
                          }})
                        } else return message.channel.send({embed: {
                          color: 16733013,
                          description: `I need the \`MANAGE_ROLES\` permission!`,
                          author: {
                            name: message.author.tag,
                            icon_url: message.author.displayAvatarURL(),
                          }
                        }})
                      } else return message.channel.send({embed: {
                        color: 16733013,
                        description: `That person is already muted!`,
                        author: {
                          name: message.author.tag,
                          icon_url: message.author.displayAvatarURL()
                        }
                      }})
                    } else return message.channel.send({embed: {
                      color: 16733013,
                      description: `There is no \`Muted\` role! Please make one!`,
                      author: {
                        name: message.author.tag,
                        icon_url: message.author.displayAvatarURL()
                      }
                    }})
                  } else return message.channel.send({embed: {
                    color: 16733013,
                    description: `My role is not high enough to manage this person!`,
                    author: {
                      name: message.author.tag,
                      icon_url: message.author.displayAvatarURL()
                    }
                  }})
                } else return message.channel.send({embed: {
                  color: 16733013,
                  description: `Your highest role is too low to mute this person!`,
                  author: {
                    name: message.author.tag,
                    icon_url: message.author.displayAvatarURL()
                  }
                }})
              } else return message.channel.send({embed: {
                color: 16733013,
                description: `That person also has the \`Mute Permissions\` role so I won't mute them!`,
                author: {
                  name: message.author.tag,
                  icon_url: message.author.displayAvatarURL()
                }
              }})
            } else if(answer === "no") {
              return message.channel.send({embed: {
                description: `Did not mute them.`,
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
    description: "You need the `Mute Permissions` role to use this command.",
    color: 16733013,
    author: {
      name: message.author.tag,
      icon_url: message.author.displayAvatarURL()
    }
 }})
}
