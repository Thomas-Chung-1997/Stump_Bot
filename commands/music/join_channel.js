/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class JoinChannelCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'join', //Name of command
            group: 'music', //Command group it's apart of
            memberName: 'join', //Name of command within group
            description: 'joins voice channel of user' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
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
                        message.channel.send('Successfully joined the channel.');
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
module.exports = JoinChannelCommand;