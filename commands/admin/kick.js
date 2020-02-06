/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class KickCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'kick', //Name of command
            group: 'admin', //Command group it's apart of
            memberName: 'kick', //Name of command within group
            description: 'kick supplied user; logging ban into message. Can write reason for ban' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        var kick = message.guild.member(message.mentions.users.first()); //Get user to kick

        //If no user was mentioned, ERROR
        if(!kick)
        {
            message.channel.send('ERROR : Supply a user to kick.');
        }
        //If user has permission to kick
        if(message.member.hasPermission('KICK_MEMBERS'))
        {
            //If user can not be banned
            if(!message.guild.member(kick).kickable)
            {
                message.reply("User can not be kicked.");
                return;
            }

            try
            {
                var reason = args.split(' ').slice(1).join(' '); //Reason for kick

                //Delete user's kick message
                message.channel.bulkDelete(1);

                //Kick user
                message.guild.member(kick).kick(reason).then(message.channel.send(kick + " has been kicked. REASON : " + reason));

            }
            catch
            {
                return;
            }
        }
        else
        {
            message.reply("Does not have permissions to kick.");
        }
    }
}

//Export command
module.exports = KickCommand;