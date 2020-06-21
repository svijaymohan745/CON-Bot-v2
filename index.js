const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const sql = require('sqlite');
const config = require('./config.json');
const levelerCore = require('./functions/levelSystem');
const talkedRecently = new Set();
const botconfig = require("./botconfig.json");
const bot = new Discord.Client();
const token = "NzIwOTI4MTQyMTA5MTc5OTU0.Xu0xVQ.L1qGDX1_kCj6O4lB4onRl_5RlUU";
bot.commands = new Discord.Collection();
const fetch = require('node-fetch');
let purple = botconfig.purple;
const { MessageEmbed  } = require("discord.js");
const randomPuppy = require("random-puppy");
const prefix  = config.prefix;



sql.open(`./db/mainDB.sqlite`);

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split('.')[0];

    client.on(eventName, (...args) => eventFunction.run(client, ...args, sql));
  });
});

bot.on('message', msg=>{
    
  let args = msg.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
          
        case 'help':
          msg.channel.send({embed: {
              color: 3447003,
              author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
              },
              "title": "Help Commands",
              "description": "All the Commands that this amazing bot can do <:pog:716321868528877599>",
           
              "fields": [
                {
                  "name": "**Meme Command**",
                  "value": "_meme"
                },
                {
                  "name": "**Help Command(You are looking right at it**)",
                  "value": "_help "
                },
                {
                  "name": "**Levels - Check your Server Level**",
                  "value": "_rank"
                }
            
                
              ]
            }
            
          })
            
  }
})


client.on("message", message => {
  if (message.author.bot) return; //ignores bots
  //if (message.channel.type !== 'text') return; 
  if (message.channel.type === 'dm'){
    if (!message.content.startsWith(config.prefix)){
      client.users.get(config.ownerID).send(`${message.author.id}, ${message.author.username}: ${message.content}`);
    }else{
      let command = message.content.split(' ')[0];
      command = command.slice(config.prefix.length);
  
      let args = message.content.split(' ').slice(1); //passing through the argument content
  
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, sql, Discord);
      } catch (err) {
        console.log(err);
        
      }
    }
  }else{
    if (!message.content.startsWith(config.prefix)){//checks if the user is NOT typing a command
      sql.all(`SELECT roleName FROM bListRoles WHERE guildID=${message.guild.id}`).then(rCheck=>{
        var blRoles = rCheck.map(g=>g.roleName);
        if(message.member.roles.some(r=>blRoles.includes(r.name)) || message.guild.id == "264445053596991498" || message.guild.id == "110373943822540800") {
          return;
        }else{
          if (talkedRecently.has(message.author.id)) {
            return;
          }else{
            levelerCore.scoreSystem(client, message, sql, Discord);
            talkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after 2.5 seconds
            talkedRecently.delete(message.author.id);
            }, 4000);
          }
        }
      });
    }else{//user IS typing a command
    //splits input to commands
      let command = message.content.split(' ')[0];
      command = command.slice(config.prefix.length);
  
      let args = message.content.split(' ').slice(1); //passing through the argument content
  
      try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args, sql, Discord);
      } catch (err) {};
        
        
      }
    }
  }
);

client.login(config.token);


const PREFIX = '_';


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
  });
});

bot.login(token);



 
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === "meme") {
    let msg = await message.channel.send("Fetching a meme, please wait a second!");
    fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(json => {
            let embed = new Discord.RichEmbed()
                .setTitle(json.title)
                .setImage(json.url)
                .setFooter(`Link: ${json.postLink} | Subreddit: ${json.subreddit}`)
            msg.edit(embed)
        });
}


});



bot.on('ready', () => {
  var testChannel = bot.channels.find(channel => channel.id === '716557043628245025');
  console.log('Welcome me into this nasty World');
  bot.user.setActivity('your darkest secrets [_help]', { type: 'LISTENING'}).catch(console.error);

setInterval(() => {
  testChannel.send("Hey there humans, make sure you spam those contracts till there is none left. <:hi:716321862661177404>");
}, 604800000);
setInterval(() => {
  testChannel.send("Hey there humans, make sure you spam those contracts till there is none left. <:hi:716321862661177404>");
}, 691200000);
setInterval(() => {
  testChannel.send("Hey there humans, make sure you spam those contracts till there is none left. <:hi:716321862661177404>");
}, 777600000);
setInterval(() => {
  testChannel.send("Hey there humans, make sure you spam those contracts till there is none left. <:hi:716321862661177404>");
}, 864000000);
setInterval(() => {
  testChannel.send("Hey there humans, make sure you spam those contracts till there is none left. <:hi:716321862661177404>");
}, 950400000);
 
})
bot.on('guildMemberAdd', member => {
  const embed = {
    "title": "Welcome To Committee Of Noobs",
    "description": "Hello Peeps, Welcome to the CON server!",
    "color": 831018,
    "thumbnail": {
      "url": "https://i.imgur.com/mGJVLXz.png"
    },
    "image": {
      "url": "https://i.imgur.com/Ckzaw3t.png"
    },
    "fields": [
      {
        "name": "💣",
        "value": " Before diving into the different games you love in the server, get your Roles first by Going to <#716551185431265331>."
      },
      {
        "name": "🎮",
        "value": "New to Discord ?, check out <#717339670974824519> to see how its done. Feel free to ping any of the admins for any kind of stuff."
      },
      {
        "name": "🤖",
        "value": "Join a voice channel, talk about",
        "inline": true
      },
      {
        "name": "💪",
        "value": "memes and ofc Go Pwn Some Noobs!",
        "inline": true
      }
    ]
  };
 member.send({embed});
},
bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.find(channel => channel.name === "👥people-incoming");
    if(!channel) return;


    channel.send(`Hey ${member}, welcome to CON! :tada::hugging: ! Head over to <#716551185431265331>  to assign yourself roles and get into the channels :D Good luck, Have fun`)
}));

bot.on('message', message =>{
 
    }
)