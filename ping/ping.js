exports.run = async (client, message, args) => {
    const pingMessage = await message.channel.send("🏓 **Ping?**");
    pingMessage.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
