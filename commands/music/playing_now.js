/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class PlayingNowCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'playingnow', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'playingnow', //Name of command within group
            description: 'display current audio playing' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If queue is present
        if(servers[message.guild.id])
        {
            var server = servers[message.guild.id]; //Current server

            //If no audio has been played on the server
            if(!playingNow[message.guild.id])
            {
                message.channel.send("Nothing is currently being played.");
                return;
            }

            //Display current audio being played
            message.channel.send(playingNow[message.guild.id]);
        }
        else
        {
            //Server has not be accessed.
            message.channel.send("Nothing is currently being played.");
        }
    }
}

//Export command
module.exports = PlayingNowCommand;