exports.run = async (client, message, args) => {
    const pingMessage = await message.channel.send("🏓 **Ping?**");
    pingMessage.edit(`Pong! Latency is ${pingMessage.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
