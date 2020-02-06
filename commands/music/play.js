/* Libraries */
const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');

/* Functions */
function Play(connection, message)
{
    var server = servers[message.guild.id]; //Current server

    //Play youtube link supplied
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter : "audioonly"}));

    //Add youtube audio to currently playing
    playingNow[message.guild.id] = server.queue[0];
    
    //Next youtube audio
    server.queue.shift();

    //When current youtube audio has ended
    server.dispatcher.on('end', function() 
    {
        //If there is another youtube audio in queue
        if(server.queue[0])
        {
            //Play next youtube audio
            Play(connection, message);
        }
        //No more audio, exit
        else
        {
            //Disconnect Bot from voice channel
            connection.disconnect();

            //Set current youtube audio playing
            playingNow[message.guild.id] = 'Nothing is currently being played.';
        }
    });
}


/* Command */
class PlayCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'play', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'play', //Name of command within group
            description: 'plays youtube video given' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If nothing is given
        if(!args)
        {
            message.channel.send('Please provide youtube link to play');
            return;
        }

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

                        server.queue.push(args); //Add Youtube link to queue

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
module.exports = PlayCommand;