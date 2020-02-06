/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class ResumeCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'resume', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'resume', //Name of command within group
            description: 'Resume current audio thats been paused.' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If Bot is in a voice channel a part of the server
        if(message.guild.voiceConnection)
        {
            var server = servers[message.guild.id]; //Current server

            //If a dispatcher is active
            if(server.dispatcher)
            {
                //Check if dispatcher is paused
                if(server.dispatcher.paused)
                {
                    server.dispatcher.resume(); //Resume sending voice packets to server
                }
            }
        }
    }
}

//Export command
module.exports = ResumeCommand;