const { exec } = require('child_process');
const Discord = require('discord.js');
var Scraper = require('images-scraper');
const { executablePath } = require('puppeteer');
const translate = require('@iamtraction/google-translate');
const { measureMemory, runInContext } = require('vm');
const { clear } = require('console');
const ms = require('ms');
const { disconnect } = require('process');
const db = require('quick.db');
const { Server } = require('http');
const { hangman } = require('reconlx');
const Distube = require('distube');
const { verify } = require('crypto');
const { Canvas } = require('canvacord');
const Greyscale = require('canvacord/libs/Greyscale');
const { beautiful } = require('canvacord/src/Canvacord');

const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });
  


const client = new Discord.Client();


const prefix = '';



client.commands = new  Discord.Collection();
 

 

client.once('ready', () => {
    console.log('Edith is online');
    client.user.setActivity('with your sad life',{type: 'STREAMING'}).catch(console.error);
});




client.on('message', async(message) =>{
      if(!message.content.startsWith(prefix) || message.author.bot)return;

     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();
    
     //steal emoji
     if(command === 'steal'){
       emoji(client,message,args);
     }
     async function emoji(client,message,args){
       if(!args.length)return message.reply('Please specify some emoji');
       for(const rawEmoji of args)
       {
         const parsedEmoji = Discord.Util.parseEmoji(rawEmoji);
         if(parsedEmoji.id)
         {
           const extension = parsedEmoji.animated ? '.gif' : '.png';
           const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;
           message.guild.emojis
           .create(url,parsedEmoji.name)
           .then((emoji) => message.channel.send(`Added: \`${emoji.url}\``));
         }

       }
     }

    /* //music
const distube = new Distube(client, { searchSongs: false, emitNewSongOnly: true });

 if (command === "play" || command === "p") {
  embedbuilder(client, message, "#fffff0", "Searching!", args.join(" ")).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
  return distube.play(message, args.join(" "));
}
else if (command === "skip" || command === "s") {
  embedbuilder(client, message, "#fffff0", "SKIPPED!", `Skipped the song`).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
  try { 
     distube.skip(message);
  } catch (error) {
      console.error(error)
  }
  return distube.skip(message);
} 
else if (command === "stop" || command === "leave") {
  embedbuilder(client, message, "RED", "STOPPED!", `Left the channel`).then(msg => msg.delete({ timeout: 5000 }).catch(console.error))
  try {
    message.guild.me.voice.channel.leave();
  } catch (error) {
      console.error(error)
      
  }
  return distube.stop(message);
} 
else if (command == "pause") {
  embedbuilder(client, message, "#fffff0", "Paused!")
  return distube.pause(message);
}


distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

   
    function embedbuilder(client, message, color, title, description, thumbnail) {
      try{   let embed = new Discord.MessageEmbed()
          .setColor(color)
          .setAuthor(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }),"https://harmonymusic.tk")
          .setFooter(client.user.username, client.user.displayAvatarURL());
      if (title) embed.setTitle(title);
      if (description) embed.setDescription(description);
      if (thumbnail) embed.setThumbnail(thumbnail)
      return message.channel.send(embed);
  }catch (error){
      console.error
   }
  }*/
     //avatar
     if(command === 'avatar'){
        avatar(client,message,args);
     }

     async function avatar(client,message,args){
       let member = message.mentions.users.first() || message.author

       let avatar ;
      
        
       const embed = new Discord.MessageEmbed()
       .setTitle(`${member.username}'s avatar`)
       .setImage( member.displayAvatarURL({size: 1024,dynamic : true}))
       .setColor('#A2FFD7')

       message.channel.send(embed); 
     }

     if(command === 'add'){
      let rolename;
      if(args[2]){
      rolename =(args[0]+' '+args[1])
      
      }
      else if(!args[2])
      rolename = args[0]
      let role = message.guild.roles.cache.find(r => r.name === rolename );
      let member = message.mentions.members.first();
      let guild = message.guild;
      if(message.member.hasPermission(['KICK_MEMBERS'])||message.member.hasPermission(['ADMINISTRATOR'])){
       if(!member)message.reply('please mention a user to verify')
    
      if(member){
        
        const targetmember = guild.members.cache.get(member.id);
       if(!role)message.channel.send('role doesnt exist');
        targetmember.roles.add(role);
        message.channel.send(`Added role ${role.name} to ${member.displayName}`);        

      }


      }else{
        message.channel.send('you must be a mod to do this')
    }}

    if(command === 'remove'){
      let rolename;
      if(args[2])
      rolename =(args[0]+' '+args[1])
      else if(!args[2])
      rolename = args[0]
     
      let role = message.guild.roles.cache.find(r => r.name === rolename );
      let member = message.mentions.members.first();
      let guild = message.guild;
      if(message.member.hasPermission(['KICK_MEMBERS'])||message.member.hasPermission(['ADMINISTRATOR'])){
       if(!member)message.reply('please mention a user')
      if(member){
        
        const targetmember = guild.members.cache.get(member.id);
        targetmember.roles.remove(role);

        message.channel.send(`Removed role ${role.name} from ${member.displayName}`);

      }


      }else{
        message.channel.send('you must be a mod to do this')
    }}
    
    if(command === 'create'){
      if(message.member.hasPermission(['KICK_MEMBERS'])||message.member.hasPermission(['ADMINISTRATOR'])){
      var guild = message.guild
      let member = message.mentions.members.first();
      const targetmember = guild.members.cache.get(member.id);
      try {
          message.guild.roles.create({
              data:{
              name:args[0],
              color:args[1],
          },
          reason: args[0],
          
      }).then((role) => targetmember.roles.add(role)).catch(console.error);
      message.channel.send('role added');
      } catch (error) {
          console.log(error);
      } }else{
        message.channel.send('you must be a mod to do this')
    }
    }
  //delete
    if(command === 'delete'){
      let rolename;
      if(args[2])
      rolename =(args[0]+' '+args[1])
      else if(!args[2])
      rolename = args[0]
      if(message.member.hasPermission(['KICK_MEMBERS'])||message.member.hasPermission(['ADMINISTRATOR'])){
      let role = message.guild.roles.cache.find(r => r.name === rolename ).delete();
      message.channel.send(`deleted role: ${rolename} from ${message.guild.name}`);
    if(!role)message.channel.send('this role doesnt exist');
    
    }

      else {
        message.channel.send('you must be a mod to do this');
      }
    }
    
    
  
     //countdown/alarm
     if(command==='timer'){
       let time = args[0];
       if(!time)return message.channel.send('please enter a time of format (1s/1m/1h)');
       if(ms(time) > ms('id'))return message.channel.send("cant set a countdown bigger than 1 day");
       let reason = args.slice(1).join(' ');
       if(!reason)return message.channel.send('please specify a reason');


       const embed = new Discord.MessageEmbed()
       .setAuthor(`${message.author.tag} Timer`, message.author.displayAvatarURL())
       .setColor("#A2FFD7")
       .setDescription(`Time: \`${time}\`\nReason:  \`${reason}\``)
       .setTimestamp()
       message.channel.send(embed);

       setTimeout(() => {
         const embed = new Discord.MessageEmbed()
         .setAuthor(`${message.author.tag} Your Timer has ended `, message.author.displayAvatarURL())
         .setColor("#A2FFD7")
         .setDescription( `Time: \`${time}\`\nReason:  \`${reason}\`  \nTimer set in the server:  \`${message.guild.name}\ `)
         .setTimestamp()
         message.channel.send(embed);
         message.channel.send(`${message.author.toString()} your timer has ended`);
         

       }, ms(time))

     }

     //clear
     if (command === 'clear'){
      if(message.member.hasPermission(['KICK_MEMBERS'])||message.member.hasPermission(['ADMINISTRATOR'])){
      clr(message,args);
       }
       else{
         message.channel.send('you must be a mod to run this command');
       }
     }

       async function clr(message,args){
       if(!args[0])return message.channel.send('please enter the number of messages you want to clear');
       if(isNaN(args[0])) return message.channel.send('please enter a real number');
       if(args[0]>100)return message.channel.send('you cannot delete more than 100 messages');
       if(args[0]<1)return message.channel.send('you must delete atleast one message');

       await message.channel.messages.fetch({limit: args[0]}).then(messages => {
              message.channel.bulkDelete(messages);
       });
     }
     
    
    
    //fiter
     var badWords = ["boobs","cunt","hoe","hoes","fucking","stfu","hoe","assass","fuck you","dick","pussy","vagina","sex","fuck","asshole","gore","s3x","penis","porn", "hentai","thighs","anime thighs","anime boobs"
     ,"bobs","tits","boobie", "tiddy","tiddies","titty","titties","rule 34 Zootopia","samsung virtual assistant","nigger", "nigga", "niggger", "faggot", "fag", "cunt", "slut", "retard", "cock","bitch", "whore", "dyke"
     , "arse","penis","blowjob","motherfucker","cum","jizz","kike","shitty","tit","piss","kys","naked","shit","nude","boob","nudes","tets","stripper","strippers","sissiness","wuss","wimp"];
    
    
        let sentence = args.join(' '); 
     for(var i=0;i<=badWords.length;i++){
      
           if (message.content.toLowerCase().includes(badWords[i])){  
        message.delete();
       
        break;
    }
    


    if (message.member.nickname.includes(badWords[i])){
      message.channel.send("i suggest you change your name, nvm i will do it for you");
      const member = message.guild.members.cache.get(message.author.id);
      member.setNickname("poophead");
     }

   }
//hangman
if(command === "hangman"){
  hangman_game(client,message,args);
}


async function hangman_game(client,message,args){
  const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) return message.channel.send('Please specify a channel')
        const word = args.slice(1).join(" ")
        if(!word) return  message.channel.send('Please specify a word to guess.');
        message.delete();
        const hang = new hangman({
          message: message,
          word: word,
          client: client,
          channelID: channel.id
        })
        hang.start();

}
   //images and delete bad words
   if(command === 'image'){
       execute(client,message,args);
   }
  
  
   async function execute(client,message,args){
       const image_query = args.join(' ');
      
       if(!image_query ){
           return message.channel.send("please include an image to search for");
       }
       
       if( image_query === "quality hd porn" || image_query === "anime dick"||image_query  === "boobs" ||image_query==="hoe" || image_query==="hoes" ||image_query == "motherfucker" || image_query  ===  "dick"||image_query=="penis" ||image_query  === "ass"|| image_query  === "pussy"|| image_query  === "vagina"||
       image_query  === "sex"||image_query  === "fuck"||image_query  === "asshole"||image_query  === "gore"||image_query  === "s3x"||command ==="nsfw"||
       image_query === "pp"||image_query === "penis"||image_query === "porn"||image_query === "hentai"||image_query === "thighs"||image_query === "anime thighs"||image_query === "anime boobs"
       ||image_query === "bobs"||image_query === "tits"||image_query === "boobie"|| image_query === "tiddy"||image_query === "tiddies"||image_query === "titty"||image_query === "sexy samsung virtual assistant"||image_query ==="titties"||image_query ==="rule 34 Zootopia"||image_query ==="nigger"||image_query === "nigga"||
       image_query === "niggger"|| image_query ==="faggot"|| image_query ==="fag"|| image_query === "cunt"||image_query === "slut"||image_query === "retard"|| image_query === "cock"||image_query === "bitch"||image_query === "whore"|| image_query === "dyke"
       ||image_query ==="ass"|| image_query === 'nude' || image_query === "boob" || image_query == "nakey" || image_query === "tets" || image_query === "no clothes" || image_query==="nudes" ||
        image_query === "dong"||image_query == "hottie" ||image_query=== "dirty sanchez" || image_query==="butt" ||image_query==="stinky caca" ||image_query === "butts" || image_query==="booty" ||image_query==="booties"|| image_query === "wuss" || image_query === "milf" || image_query === "dilf"|| image_query === "wimp"||image_query === "stripper"|| image_query==="sexier" || image_query === "sexiest" || image_query === "sexy"|| image_query === "strippers"||image_query==="furry" || image_query==="furries" ||image_query ==="cum"||image_query ==='naked'||image_query ==="jizz"||image_query ==="kike"||image_query ==="tit"||image_query ==="piss"||image_query ==="kys"){
       
    
     
        return message.channel.send("the word entered is nsfw and not permitted");
      
         }
  
       const image_results = await google.scrape(image_query,10);
       var i = Math.floor(Math.random() * 10);

       const embed = new Discord.MessageEmbed()
       .setTitle(`${image_query.toString()}`)
       .setImage(image_results[i].url.toString())
       .setColor('#A2FFD7')

       message.channel.send(embed); 

      
   }


     //translate
     if(command === 'translate' || command === 'Translate' ){
        const query = args.join(' ');
        if(!query)message.channel.send('Please specify text to translate');

        const translated = await translate(query, {to: 'en' });
        message.channel.send(translated.text);

    }
  
   //fun
   if(command === 'siblings'){
    message.channel.send("Hello I have 2 siblings viber and grill uwu");
  }
  
  if(command === "sadness"){
    message.channel.send("We all go through hard times in life.");
  }

  if(command === 'E' || command === 'e'){
    message.channel.send("E");
  }

  if(command === 'F' || command === 'f'){
    message.channel.send("F");
  }

  if(command === 'sensei' || command === 'Sensei'){
    message.channel.send("pro noodel grower hialite aka noodel sensei");
  }
  //poll
  if(command === "poll"){
    let pollchannel = message.mentions.channels.first();
    let pollDesc = args.slice(1).join(' ');
   if(!pollchannel)return message.channel.send("please enter a channel");
   if(!pollDesc)return message.channel.send("please enter a  description");

    let embedPoll = new Discord.MessageEmbed()
    .setTitle('New poll!')
    .setDescription(pollDesc)
    .setColor('#A2FFD7')
    let msgembed = await pollchannel.send(embedPoll);
    await msgembed.react('👍');
    await msgembed.react('👎');
    await msgembed.react('😑');
    
    
  }
  
 


  //help
  if(command === 'help'){
    help(message,args,Discord);
  }
 
  if(command == 'say'){
   
    say(message,args);
  
  }


  function say(message,args){
    const sayMessage = args.join(' ');
    if(message.author.id == '638037003224743936'){
      message.channel.send("I'll shef you up bruv, shut it")
    }else{
    if(sayMessage){
      message.delete();
      message.channel.send(sayMessage);
    }else{
      message.channel.send("please include a message");
    }}
  }
//image manipulation
if(command === 'trigger'){
  trigger(client,message,args);
}

async function trigger(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.trigger(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'invert'){
  invert(client,message,args);
}

async function invert(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.invert(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'facepalm'){
  facepalm(client,message,args);
}

async function facepalm(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.facepalm(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}
if(command === 'greyscale'){
  greyscale(client,message,args);
}

async function greyscale(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.greyscale(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}


if(command === 'slap'){
  slap(client,message,args);
}

async function slap(client,message,args){

  const user = message.mentions.users.first() || message.author;
  if(!user)return message.reply('please mention a user');
  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.slap(message.author.displayAvatarURL({format: 'png'}),avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'hitler'){
  hitler(client,message,args);
}

async function hitler(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.hitler(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'jail'){
  jail(client,message,args);
}

async function jail(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.jail(avatar,false);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'kiss'){
  kiss(client,message,args);
}

async function kiss(client,message,args){

  const user = message.mentions.users.first() || message.author;
  if(!user)return message.reply('please mention a user');
  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.kiss(message.author.displayAvatarURL({format: 'png'}),avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'pixelate'){
  pixelate(client,message,args);
}

async function pixelate(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.pixelate(avatar,10);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'rip'){
  rip(client,message,args);
}

async function rip(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.rip(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'sharpen'){
  sharpen(client,message,args);
}

async function sharpen(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.sharpen(avatar,10);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'trash'){
  trash(client,message,args);
}

async function trash(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.trash(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'wanted'){
  wanted(client,message,args);
}

async function wanted(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.wanted(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'wasted'){
  wasted(client,message,args);
}

async function wasted(client,message,args){

  const user = message.mentions.users.first() || message.author;

  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.wasted(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}


if(command === 'fuse'){
  fuse(client,message,args);
}

async function fuse(client,message,args){

  const user = message.mentions.users.first() || message.author;
  if(!user)return message.reply('please mention a user');
  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.fuse(message.author.displayAvatarURL({format: 'png'}),avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}

if(command === 'beautiful'){
  beautiful(client,message,args);
}

async function beautiful(client,message,args){

  const user = message.mentions.users.first() || message.author;
 
  const avatar = user.displayAvatarURL({format: 'png'});

  const image = await Canvas.beautiful(avatar);

  

  message.channel.send(
    new Discord.MessageAttachment(image,'image.gif')
  )
}





 
  function help(message,args,Discord){
    const neweEmbed = new Discord.MessageEmbed()
    .setColor('#A2FFD7') 
    .setTitle('Commands')
    .setThumbnail('https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80') 
    .addFields(
      {  name: 'image stuff',value: 'trigger,invert,facepalm,greyscale,slap,hitler,jail,kiss,pixelate,rip,sharpen,trash,wanted,wasted,fuse,beautiful'  },
      {  name: 'create role',value: 'create rolename color @user'  },
      {  name: 'remove role',value: 'remove rolename color @user' },
      {  name:  'add role',value: 'add rolename  @user' },
      {  name: 'set timer',value: 'timer (duration(1s/1m/1h/1d))'  },
      {  name: 'poll',value: 'poll #channel description'  },
      {  name: 'clear (purges messages, mod only command)',value: 'clear (number)'  },
      {  name: 'avatar',value: 'avatar/ avatar @user'  },
      {  name: 'image search',value: 'type image (anything)'  },
      {  name: 'translate',value: 'type translate (text in language other than english)'  },
      {  name: 'viber',value: 'replies with - Hello I am vibers younger sister uwu '  },
      {  name: 'sadness',value: ' replies with - We all go through hard times in life.'  },
      {  name: 'E',value: 'replies with E'  },
      {  name: 'F',value: 'replies with F'  },
      {  name: 'sensei',value: 'special command for the queen of this server'  }



      
      

    )

    .setFooter('uwu have fun', 'https://images.unsplash.com/photo-1531549216498-80e1dc380632?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80');

    message.channel.send(neweEmbed);
  }




})
client.login('');//hidden for security purposes








