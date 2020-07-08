exports.run = async(client, message, args) => {
  const members = await message.guild.memberCount
  message.channel.send({embed: {
    color: 39423,
    fields: {
      name: `Members`,
      value: members
    },
    timestamp: new Date(),
  }})
}
