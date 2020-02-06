/* Libraries */
const commando = require('discord.js-commando');

/* Command */
class BanCommand extends commando.Command
{
    /* Constructor */
    constructor(client)
    {
        super(client,
        {
            name: 'ban', //Name of command
            group: 'admin', //Command group it's apart of
            memberName: 'ban', //Name of command within group
            description: 'ban supplied user; logging ban into message. Can write reason for ban' //help text displayed when help command is used
        });
    }

    /* Main */
    async run(message, args)
    {
        var ban = message.guild.member(message.mentions.users.first()); //Get user to ban

        //If no user was mentioned, ERROR
        if(!ban)
        {
            message.channel.send('ERROR : Supply a user to ban.');
        }
        //If user has permission to ban
        if(message.member.hasPermission('BAN_MEMBERS'))
        {
            //If user can not be banned
            if(!message.guild.member(ban).bannable)
            {
                message.reply("User can not be banned.");
                return;
            }

            try
            {
                var reason = args.split(' ').slice(1).join(' '); //Reason for ban

                //Delete user's ban message
                message.channel.bulkDelete(1);

                //ban user
                message.guild.member(ban).ban(reason).then(message.channel.send(ban + " has been banned. REASON : " + reason));

            }
            catch
            {
                return;
            }
        }
        else
        {
            message.reply("Does not have permissions to ban.");
        }
    }
}

//Export command
module.exports = BanCommand;