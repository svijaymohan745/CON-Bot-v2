module.exports.helpEmbed = function(client, message, Discord) {
  var embed = new Discord.RichEmbed()
    .setDescription("List of extended commands")
    .setColor(0x00AE86)
    .setThumbnail(client.user.displayAvatarURL)
    .addField("Commands", `**_leaderboard**
**_rank**
**_rank** \`\`@User\`\`
**_help**
**_help** \`\`COMMAND\`\`
**_rlevel** \`\`add/remove rolename (Admin Command)\`\`
**:?blacklist** \`\`add/remove rolename (Admin Command)\`\`
` ,true)
    .setFooter("© CON Bot", `${client.user.displayAvatarURL}`)
    message.channel.send(embed)
}