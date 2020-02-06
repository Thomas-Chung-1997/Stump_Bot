/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class StopCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'stop', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'stop', //Name of command within group
            description: 'stop youtube video, cancel queue, and disconnect bot from voice channel' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If Bot is in a voice channel a part of the server
        if(message.guild.voiceConnection)
        {
            //If queue is present
            if(servers[message.guild.id])
            {
                var server = servers[message.guild.id]; //Current server
                var playing = playingNow[message.guild.id]; //Current audio

                mapleRadio = false; //Stop Maple Radio

                //Clear queue
                while(server.queue[0])
                {
                    server.queue.shift();
                }

                //If dispatcher is active
                if(server.dispatcher)
                {
                    //End current song
                    server.dispatcher.end();
                }

                //Set current song playing
                playing = 'Nothing is currently being played.';
            }
        }
    }
}

//Export command
module.exports = StopCommand;