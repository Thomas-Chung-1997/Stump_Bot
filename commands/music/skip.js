/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class SkipCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'skip', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'skip', //Name of command within group
            description: 'skip current youtube video playing' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If queue is present
        if(servers[message.guild.id])
        {
            var server = servers[message.guild.id]; //Current server

            //If dispatcher is active
            if(server.dispatcher)
            {
                //End current song
                server.dispatcher.end();
            }
        }
    }
}

//Export command
module.exports = SkipCommand;