/* Libraries */
const commando = require('discord.js-commando'); //Discord Commando
const discord = require('discord.js'); //Discord
const config = require('./config.json'); //Important access data
const fs = require('fs'); //File Stream

/* Variables */
const bot = new commando.Client({ //Stump Bot
    commandPrefix: config.prefix, //Set Prefix for commands
    disableEveryone: true //Unables bot to use '@everyone'
});
global.servers = {}; //Server list
global.weeklyAnnoucements = {}; //List of week
global.mapleMusic = []; //Music files in Maplestory Music folder
global.mapleRadio = false; //Is MapleRadio on
global.playingNow = {}; //Current audio being played

/* Register Commands Section */
//Add custom commands
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('chat', 'Chat');
bot.registry.registerGroup('admin', 'Admin');

//Add default commands
//bot.registry.registerDefaults();

//Register all commands into bot
bot.registry.registerCommandsIn(__dirname + '/commands');

/* Time Based Section */
setInterval(() => {
    var cTime = new Date(); //Current Time

    //On thursday at 12AM
    if(cTime.getUTCDay() == 4 && cTime.getUTCHours() == 0)
    {
        console.log("hi");
    }

}, config.intervalTimer);

/* Maplestory Music Section*/
//Search every file in MaplestoryMusic folder
fs.readdir(__dirname + '\\commands\\music\\MaplestoryMusic', function(err, items)
{
    //Foreach file, add to Maplestory Music array
    for(var i = 1; i < items.length + 1; ++i)
    {
        mapleMusic.push(items[i]);
    }

    //For grammer; shows if bot has uploaded all files
    console.log("Installed all files from Maplestory Music folder.");
});

/* Initialization Section */
bot.once('ready', () => 
    {
        //For programmer; shows if bot has responded
        console.log('Stump Bot is ONLINE.');
    }
)

// Start Bot
bot.login(config.token);