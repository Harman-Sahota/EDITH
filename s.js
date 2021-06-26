const { exec } = require('child_process');
const Discord = require('discord.js');
var Scraper = require('images-scraper');
const { executablePath } = require('puppeteer');
const translate = require('@iamtraction/google-translate');
const { measureMemory } = require('vm');
const { clear } = require('console');
const ms = require('ms');

const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });
  


const client = new Discord.Client();

const prefix = '';



client.commands = new Discord.Collection();



client.once('ready', () => {
    console.log('Edith is online');
    client.user.setActivity('over viber',{type: 'WATCHING'}).catch(console.error);
});

client.on('message', async(message) =>{
      if(!message.content.startsWith(prefix) || message.author.bot)return;

     const args = message.content.slice(prefix.length).split(/ +/);
     const command = args.shift().toLowerCase();


     //avatar
     if(command === 'avatar'){
        avatar(client,message,args);
     }

     async function avatar(client,message,args){
       let member = message.mentions.users.first() || message.author

       let avatar = member.displayAvatarURL({size: 1024})

       const embed = new Discord.MessageEmbed()
       .setTitle(`${member.username}'s avatar`)
       .setImage(avatar)
       .setColor('#A2FFD7')

       message.channel.send(embed); 
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
     var badWords = ["boobs","fucking","fuck you","dick", "ass","pussy","vagina","sex","fuck","asshole","gore","s3x","nsfw","pp","penis","porn", "hentai","thighs","anime thighs","anime boobs"
     ,"bobs","tits","boobie", "tiddy","tiddies","titty","titties","rule 34 Zootopia","sexy samsung virtual assistant","nigger", "nigga", "niggger", "faggot", "fag", "cunt", "slut", "retard", "cock","bitch", "whore", "dyke"
     ,"ass", "arse","blowjob","cum","jizz","kike","tit","piss","kys"];
     var content = message.content;

     for(var i=0;i<=badWords.length;i++){
      if (content === badWords[i]){  
        message.delete();
        break;
    }
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
       
       if(image_query  === "boobs" || image_query  ===  "dick"|| image_query  === "ass"|| image_query  === "pussy"|| image_query  === "vagina"||
       image_query  === "sex"||image_query  === "fuck"||image_query  === "asshole"||image_query  === "gore"||image_query  === "s3x"||command ==="nsfw"||
       image_query === "pp"||image_query === "penis"||image_query === "porn"||image_query === "hentai"||image_query === "thighs"||image_query === "anime thighs"||image_query === "anime boobs"
       ||image_query === "bobs"||image_query === "tits"||image_query === "boobie"|| image_query === "tiddy"||image_query === "tiddies"||image_query === "titty"||image_query === "sexy samsung virtual assistant"||image_query ==="titties"||image_query ==="rule 34 Zootopia"||image_query ==="nigger"||image_query === "nigga"||
       image_query === "niggger"|| image_query ==="faggot"|| image_query ==="fag"|| image_query === "cunt"||image_query === "slut"||image_query === "retard"|| image_query === "cock"||image_query === "bitch"||image_query === "whore"|| image_query === "dyke"
       ||image_query ==="ass"|| image_query ==="arse"||image_query ==="blowjob"||image_query ==="cum"||image_query ==="jizz"||image_query ==="kike"||image_query ==="tit"||image_query ==="piss"||image_query ==="kys"){
       
     
     
        return message.channel.send("the word entered is nsfw and not permitted");
      
         }
  
       const image_results = await google.scrape(image_query,200);
       var i = Math.floor(Math.random() * 200);

       message.channel.send(image_results[i].url.toString());
   }


     //translate
     if(command === 'translate' || command === 'Translate' ){
        const query = args.join(' ');
        if(!query)message.channel.send('Please specify text to translate');

        const translated = await translate(query, {to: 'en' });
        message.channel.send(translated.text);

    }
  
   //fun
   if(command === 'viber'){
    message.channel.send("Hello I am vibers younger sister uwu");
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

  //help
  if(command === 'help'){
    help(message,args,Discord);
  }
 
  if(command == 'say'){
    say(message,args);
  }


  function say(message,args){
    const sayMessage = args.join(' ');
    if(sayMessage){
      message.delete();
      message.channel.send(sayMessage);
    }else{
      message.channel.send("please include a message");
    }
  }

  function help(message,args,Discord){
    const neweEmbed = new Discord.MessageEmbed()
    .setColor('#A2FFD7') 
    .setTitle('Commands')
    .setThumbnail('https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80') 
    .addFields(
      {  name: 'set timer',value: 'timer (duration(1s/1m/1h/1d))'  },
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
client.login('ODU3OTAyNTI1Njk2MzExMjk2.YNWV_Q.MJX1cDwu2utsWA1Yr2VGzKpIUNE');








