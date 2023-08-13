const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')

module.exports = {
    name: 'stock',
    category:"info",
    description: 'Te',
    usage: '',
    run : async (client, message, args) => {
        let status = await db.get(`accounts_${message.guild.id}_${client.user.id}`)
        if(!status || status === null) return message.reply({content: `:x:** No Categories Found.**`});
            // map all categories in status
            let categories = []
            status.forEach(x => {
                categories.push({
                    name: x.name,
                    description: x.description,
                    price: x.price,
                    recipent: x.recipent,
                    emails: x.emails,
                })
            })
    
            // map the categories 
            let mappedCategories = categories.map((x , i) => {
                return `**------[ ${x.name.toUpperCase()} ]------**\n- **Price**: \`$${x.price}\` \n - **Stock**: \`${x.emails.length}\` \n`
            }
            ) 
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`**Stock Of ${client.user.username}**`)
            .setDescription(`${mappedCategories.join("\n")}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()

            return message.reply({embeds: [embed]});

        
       

       
        







          


   



    }
}