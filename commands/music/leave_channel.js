/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class LeaveChannelCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'leave', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'leave', //Name of command within group
            description: 'leaves voice channel of user' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        //If Bot is in a voice channel a part of the server
        if(message.guild.voiceConnection)
        {
            //Bot leaves voice channel
            message.guild.voiceConnection.disconnect();
        }
    }
}

//Export command
module.exports = LeaveChannelCommand;