const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const { PREFIX } = require("../../config")

module.exports = {
    config: {
        name: "prefix",
        description: "Change/apprends le préfix du bot pour ce serveur.",
        usage: "m/prefix <new prefix/reset>",
        example: "1) m/prefix = \n2) m/prefix reset",
        aliases: ["prefix"]
    },

    run: async (bot, message, args) => {
        let option = args[0];

            //PERMISSION
     if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("Vous n'avez pas la permission de changer de prefix !")
              }
            
            if(!option) {
                prefix = db.fetch(`prefix_${message.guild.id}`)
                if (!prefix) prefix = PREFIX;
                let prefEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setThumbnail(message.guild.iconURL())
                .setDescription(`**\nMon préfix pour \`${message.guild.name}\`  est  **` + `  \`${prefix}\` \n**Ecris \`${prefix}help\` pour avoir de l'aide.**`)
              
              message.channel.send(prefEmbed);
            }

            if(option.toLowerCase() === "reset") {
                db.delete(`prefix_${message.guild.id}`)
                return await message.channel.send("Préfix réinitialisé ✅")
            }
            
            if(args[1]) {
              return message.channel.send("Tu ne peux pas mettre plusieurs arguments comme préfix.")
            }
            
            if(args[0].length > 4) {
              return message.channel.send("Tu ne peux pas mettre plus de 4 lettres en préfix.")
            }
            
            if(args.join("") === PREFIX) {
              db.delete(`prefix_${message.guild.id}`)
             return await message.channel.send("Préfix réinitialisé ✅")
            }
            
            db.set(`prefix_${message.guild.id}`, args[0])
          await message.channel.send(`Fait ✅ | Le préfix du bot est ${args[0]}`)
            

        }
        
    }