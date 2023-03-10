const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: 'suggest',
    description: 'Suggest something for the server.',
    usage: 'suggest [suggestion]',
    category: 'Misc',
    cooldown: 10,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false // you can delete the ownerOnly if its false
},
  run: async (client, message, args) => {
    const suggestion = args.join(' ');
    if (!suggestion) {
      return message.reply('Please provide a suggestion.');
    }

    const channel = message.guild.channels.cache.find(
      (channel) => channel.name === 'suggestions'
    );
    if (!channel) {
      return message.reply(
        'I could not find a channel named suggestions on this server.'
      );
    }

    const embed = new EmbedBuilder()
      .setColor('#FFC300')
      .setTitle('New Suggestion')
      .setDescription(suggestion)
      .addFields({ name: 'Suggested By', value: message.author.tag })
      .setTimestamp();

    const sentMessage = await message.channel.send({ embeds: [embed] });

    sentMessage.react('👍');
    sentMessage.react('👎');

    message.reply('Your suggestion has been submitted!');
  },
};