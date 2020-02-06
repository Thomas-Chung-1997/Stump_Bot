/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class BulkDeleteCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'clear', //Name of command
            group: 'chat', //Command group it's apart of
            memberName: 'clear', //Name of command within group
            description: 'Bulk delete messages in messaged channel' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If no arguments, ERROR
        if(!args)
        {
            message.channel.send("ERROR : Define how many messages to delete.");
            return;
        }

        //If argument is NaN, ERROR
        if(isNaN(args))
        {
            message.channel.send("ERROR : [" + args + "] is not a proper argument (ex. 10)");
            return;
        }

        //If user has permission to delete messages
        if(message.member.hasPermission("MANAGE_MESSAGES"))
        {
            try
            {
                //Delete specified amount of messages in channel
                message.channel.bulkDelete(args + 1);
            }
            catch
            {
                return;
            }
        }
        else
        {
            message.reply("Does not have permissions to delete messages.");
        }
    }
}

//Export command
module.exports = BulkDeleteCommand;