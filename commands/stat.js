const { version } = require("discord.js");
require("moment-duration-format");
const moment = require("moment");
exports.run = (bot, message, args, sql) =>{
            const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            message.channel.send(`= STATISTICS =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${bot.users.size.toLocaleString()}
• Servers    :: ${bot.guilds.size.toLocaleString()}
• Channels   :: ${bot.channels.size.toLocaleString()}
• Node       :: ${process.version}`, {code: "asciidoc"});

}