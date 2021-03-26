/**
 * O Comando "botinfo" mostrará informações do bot
*/

const Discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-br");

module.exports = {
  run: function (client, message, args) {
    const inline = true;
    const date = client.user.createdAt;
    const userName = client.user.username;
    const status = {
      online: "`🟢` Online",
      offline: "`⚫` Offline",
    };
    const link = 'https://github.com/Liga-dos-Programadores/Project-A';


    const embed = new Discord.MessageEmbed()
      .setColor(process.env.COLOR)
      .setThumbnail(`${client.user.avatarURL({ dynamic: true })}?size=1024`)
      .setAuthor("🤖 Minhas informações")
      .addField("**Meu nome**", userName)
      .addField("**Meu ID**", client.user.id)
      .addField("**Estou online a**", moment().to(client.startTime, true))
      .addField("**Fui criado em**", formatDate("DD/MM/YYYY, às HH:mm:ss", date))
      .addField('🔗 **Meu código fonte**', link)
      .setFooter('2021 © Liga dos Programadores.')
      .setTimestamp()

    if (client.user.presence.status) {
      embed.addField(
        "**Status**",
        `${status[client.user.presence.status]}`,
        inline,
        true
      );
    }

    message.channel.send(embed);
  },

  conf: {},

  get help() {
    return {
      name: "botinfo",
      category: "Info",
      description: "Mostra informações do bot.",
      usage: "botinfo",
    };
  },
};
/**
 * Formata a data passada para o padrão do Brasil.
 * @param {string} template
 * @param {Date=} [date]
 * @return {string}
 */
function formatDate(template, date) {
  var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function (template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}