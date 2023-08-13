const { Client, Message, MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    data: new SlashCommandBuilder()
    .setName("add-accounts")
    .setDescription("adds new accounts to a category")
    .addStringOption(option => option.setName("category-name").setRequired(true).setDescription("The Category Name"))
    .addStringOption(option => option.setName("accounts").setRequired(true).setDescription("email:pass please Read the help guide")),
    run : async (client, interaction) => {	
        let category = interaction.options.getString("category-name").toLowerCase();
        let data = await db.get(`accounts_${interaction.guild.id}_${client.user.id}`)
        if(!data || data === null) return interaction.reply({content: `:x:** No Categories Found **`, ephemeral: true});
        let check = data.find(x => x.name === category)

        if(check === undefined) return interaction.reply({content: `:x:** Category Not Found **`, ephemeral: true});
			let admins = await db.get(`admins_${interaction.guild.id}_${client.user.id}`)
			if(!admins) {
				if(interaction.member.id !== client.config.ownerID && interaction.member.id !== check.recipent) return interaction.reply({content:`You Are Not The Bot Owner Or The Recipent` , ephemeral: true})
				
			} else {
				if(interaction.member.id !== client.config.ownerID && !admins.includes(interaction.member.id) && interaction.member.id !== check.recipent) return interaction.reply({content: `You Are Not An Admin` , ephemeral: true})
			}
        if(!interaction.options.getString("accounts").includes(":")) return interaction.reply({content: `:x:** Invalid Format Example: /add-accounts [${category}] [email1:pass1 email2:pass2 email3:pass3] **`, ephemeral: true});
        let accounts = interaction.options.getString("accounts").split(" ");

        check.emails.push(...accounts);
        db.set(`accounts_${interaction.guild.id}_${client.user.id}`, data);
        await interaction.reply({content: `:white_check_mark:** Accounts Added Successfully **`, ephemeral: true});
     
        let log = await db.get(`log_${interaction.guild.id}_${client.user.id}`)
        let logChannel = interaction.guild.channels.cache.get(log)
        if(!logChannel || log === null) return;
        let embed = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Accounts Added")
        .setDescription(`${interaction.member.user.tag} Added ${accounts.length} Accounts To ${category}`)
        .setTimestamp()
        logChannel.send({embeds:[embed]})






          


   



    }
}