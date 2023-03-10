const { EmbedBuilder } = require('discord.js');

module.exports = {
  config: {
    name: '8ball',
    description: 'Ask the magic 8ball a question!',
    category: 'Fun',
    usage: '8ball <question>',
    cooldown: 5,
    permissions: 'everyone',
    type: 'prefix',
  },
  requirements: {
    clientPerms: ["SendMessages"],
    userPerms: ["SendMessages"],
    ownerOnly: false // you can delete the ownerOnly if its false
},
  run: async (client, message, args) => {
    const answers = [
      'It is certain.',
      'It is decidedly so.',
      'Without a doubt.',
      'Yes - definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      'Outlook good.',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Dont count on it',
      'Outlook not so good',
      'My sources say no.',
      'Very doubtful.',
    ];

    if (!args.length) {
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Error')
        .setDescription('You need to ask a question!')
        .setTimestamp();

      return message.channel.send({ embeds: [embed.build()] });
    }

    const question = args.join(' ');
    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('8ball')
      .setDescription(`Your question: ${question}\n\nMy answer: ${answer}`)
      .setTimestamp();

      await message.channel.send({ embeds: [embed] });
  },
};