/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class PauseCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'pause', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'pause', //Name of command within group
            description: 'Pauses current audio that is being played; can be resumed.' //help text displayed when help command is used
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
                server.dispatcher.pause(); //Stop sending voice packets to server
            }
        }
    }
}

//Export command
module.exports = PauseCommand;