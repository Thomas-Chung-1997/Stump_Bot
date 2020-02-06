/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class SetVolumeCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'setvolume', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'setvolume', //Name of command within group
            description: 'Set internal volume of Bot between 0.01 - 2.00' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If argument is not a number
        if(isNaN(args) || args > 200 || args < 1)
        {
            message.channel.send('Please supply a number between 1-200.');
            return;
        }
        
        //If queue is present
        if(servers[message.guild.id])
        {
            var server = servers[message.guild.id]; //Current server

            //If dispatcher is active
            if(server.dispatcher)
            {
                //Set internal volume of Bot
                server.dispatcher.setVolume(args / 100.0);
            }
        }
    }
}

//Export command
module.exports = SetVolumeCommand;