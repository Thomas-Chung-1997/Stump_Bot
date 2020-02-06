/* Libraries */
const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

/* Functions */
function Play(connection, message)
{
    var server = servers[message.guild.id]; //Current server

    //Play song supplied
    server.dispatcher = connection.playStream(__dirname + '\\MaplestoryMusic\\' + server.queue[0]);
    
    //Add song to currently playing
    playingNow[message.guild.id] = server.queue[0];

    //If Maple Radio is still active
    if(mapleRadio)
    {
        //Get next song
        server.queue.push(GetMapleSong());
    }

    //Next song
    server.queue.shift();

    //When current song has ended
    server.dispatcher.on('end', function() 
    {
        //If there is another song in queue
        if(server.queue[0])
        {
            //PLay next song
            Play(connection, message);
        }
        //No more audio, exit
        else
        {
            //Disconnect Bot from voice channel
            connection.disconnect();

            //Set current song playing
            playingNow[message.guild.id] = 'Nothing is currently being played.';
        }
    });
}

function GetMapleSong()
{
    //Get random song from maplestory music folder
    var bgm = Math.floor(Math.random() * mapleMusic.length) + 1;

    return mapleMusic[bgm];
}

/* Command */
class MapleRadioCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'mapleradio', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'mapleradio', //Name of command within group
            description: 'play maplestory music 24/7' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //Is the user in a voice channel
        if(message.member.voiceChannel)
        {
            //If the user is in a voice channel a part of the server
            if(!message.guild.voiceConnection)
            {
                //Bot joins voice channel
                message.member.voiceChannel.join()
                    .then(connection => //When Bot successfully join voice channel
                    {
                        //If no queue is present, create one
                        if(!servers[message.guild.id])
                        {
                            servers[message.guild.id] = {queue : []};
                        }

                        var server = servers[message.guild.id]; //Current server
                        playingNow[message.guild.id] = ''; //Initialize current audio 

                        message.channel.send('ITS MAPLE RADIO.');

                        server.queue.push(GetMapleSong()); //Add maplestory song to queue

                        mapleRadio = true; //Lock music to only playlist

                        Play(connection,message); //Play queue
                    });
            }
        }
        else
        {
            message.channel.send("User must be in a channel.");
        }
    }
}

//Export command
module.exports = MapleRadioCommand;