/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class QueueCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'queue', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'queue', //Name of command within group
            description: 'Add youtube video to queue' //help text displayed when help command is used
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

        //If queue is present
        if(servers[message.guild.id])
        {
            var server = servers[message.guild.id]; //Current server

            //If maple radio is active, do not add song to queue
            if(mapleRadio)
            {
                message.channel.send("CAN'T STOP THE MAPLE HYPE.");
                return;
            }

            //Add youtube video to queue
            server.queue.push(args);
        }
    }
}

//Export command
module.exports = QueueCommand;