
const { MessageEmbed , MessageActionRow , MessageSelectMenu, MessageButton} = require('discord.js');
const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require('pro.db')
module.exports = {
    name: 'buy',
    aliases: ['شراء'],
    category:"info",
    description: 'Te',
    usage: '',
    run : async (client, message, args) => {

///
			if(db.has(`buying_${message.guild.id}_${message.author.id}`)) return message.reply({content: `:x:**You Already Have A Buying Process.**`});
						let blacklist = await db.get(`blacklist_${message.guild.id}_${client.user.id}`)
			if(blacklist && blacklist.includes(message.member.id)) {
				return message.reply({content: `You Are Black Listed!`})
			}
        const cool = new MessageActionRow()
		
        .addComponents(
    new MessageButton()
    .setCustomId("1")
    .setLabel('😔 Cooldown')
    .setStyle('DANGER')
    .setDisabled(true)
)
  const check = await db.get(`cooldown_${message.guild.id}_${message.author.id}`)
const timeout = 30000  //your time
if(check && check !== null && timeout - (Date.now() - check) > 0) {
const ms = require("pretty-ms")
const timeLeft = ms(timeout - (Date.now() - check))
return message.reply({content: `Cool It Down! , Wait For **${timeLeft}** To Buy Again. ` , components: [cool]})
}

    let buyChannel  = await db.get(`buyChannel_${message.guild.id}_${client.user.id}`)
    if(buyChannel && message.channel.id !== buyChannel)  return message.reply({content: `:x:** You Must Be In The <#${buyChannel}> To Buy.**`});

        let amount = args[0];
        if(!amount) amount = 1;
			if(isNaN(amount)) return message.reply({content: `Right Usage is buy [amount]`})
			if(amount < 1) return message.reply({content:`Amount Cann't Be Negative`})
        let store = await db.get(`store_${message.guild.id}_${client.user.id}`)
        if(!store || store === "close") return message.reply({content: `** The Store Is Closed🔒 .**`});
        let status = await db.get(`accounts_${message.guild.id}_${client.user.id}`)
        if(!status || status === null) return message.reply({content: `:x:** No Categories Found.**`});
        let probotID = await db.get(`probot_${message.guild.id}_${client.user.id}`) || "282859044593598464";
        await db.set(`buying_${message.guild.id}_${message.author.id}`, true)

             let menu = new MessageSelectMenu()
        .setCustomId("buy")
        .setPlaceholder("اضغط هنا لاختيار المنتج")
        .setMinValues(1)
        .setMaxValues(1)
        status.forEach(x => {
            menu.addOptions([
                {
                    label: `${x.name.toUpperCase()}`,
                    value: x.name,
                    description: `${x.description}`,
                    emoji: `${x.emoji ? x.emoji : `🛒`}`,
								}
            ])
      })

        let cancel = new MessageButton()
        .setLabel("Cancel The Operation")
        .setStyle("DANGER")
        .setDisabled(false)
        .setCustomId("cancel")


        const row = new MessageActionRow()
        .addComponents(
            menu
        )
        const row2 = new MessageActionRow()
        .addComponents(cancel)

        const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle(`**شراء من المتجر**`)
        .setDescription(`**يرجى الاختيار من القائمة ما تريد شرائه
        عدد المنتجات: \`${amount}\`**`)
        //.setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()

        const msg = await message.reply({embeds: [embed], components: [row, row2] , fetchReply: true});
			let cancelled = false
						setTimeout(() => {
				if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
					db.delete(`buying_${message.guild.id}_${message.author.id}`)
				}
				
			} , 100000)
        const filter = i => i.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({filter , time: 60000 });

        collector.on("collect", async (i) => {
            await i.deferUpdate();
            if(i.isSelectMenu()) {
                // making a loop in the status array to find the account type
                let accountType = i.values[0];
                let account = status.find(x => x.name === accountType);
                let errorEmbed = new MessageEmbed()
                .setColor("RED")
                .setTitle(`**ERROR Occured**`)
                

                if(!account) {
                    errorEmbed.setDescription(`**No Account Found With The Name: \`${accountType}\`**`)
                    if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
										}

                    await msg.edit({embeds: [errorEmbed] , components: []});
                    return;
                }
                let accPrice = account.price;
                if(accPrice === 0) {
                    errorEmbed.setDescription(`**The Price Of This Account Isn't Valid Please contact The Bot Admins.**`)
                    if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
										}
                    await msg.edit({embeds: [errorEmbed] , components: []});
                    return;
                } 
                let accountName = account.name;
                let tax = account.tax;
                let finalPrice = tax * amount
                let recipentID = account.recipent
                let emails = account.emails
                if(emails.length < amount) {
                    errorEmbed.setDescription(`**The Amount Of Current Accounts In ${accountName.toUpperCase()} Is Less Than The Amount You Want To Buy.**`)
 if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
 }

                    await msg.edit({embeds: [errorEmbed] , components: []});
                    return;
                }
                let buy = new MessageEmbed()
                .addField(`**You Will Purchase ${accountName.toUpperCase()} accounts :**`,
`
- عدد المنتجات: \`${amount}\`
- المجموع الكلي : ${finalPrice + 5}  
- لديك 1 دقيقة للتحويل
- يرجى ابقاء خاصك مفتوح
      
**:pencil: \`|\` Please Transfer \`$${finalPrice + 5}\` Credits to <@${recipentID}>**\`\`\`#credit <@${recipentID}> ${finalPrice + 5}\`\`\``)
        
                .setColor("GREEN");                
      
      
              msg.edit({ content: `#credit ${recipentID} ${finalPrice + 5}` , embeds: [buy]  , components: [row2]})

  const filter = ({ content, author: { id } }) => {
  
            return content.startsWith(
              `**:moneybag: | ${message.author.username}, has transferred `
            ) &&
              content.includes(`${recipentID}`) &&
              id === probotID &&
              (Number(content.slice(content.lastIndexOf("`") - String(finalPrice).length, content.lastIndexOf("`"))) >= accPrice * amount);
          }
							console.log(accPrice * amount)
          msg.channel.awaitMessages({
            filter,
            max: 1,
            time: 65000,
            errors: ["time"]
          }).then(async messge => {
            // splice the accounts from the array then save the new array
						while(cancelled) {return};
						
          const accs = emails.splice(0, amount)
          status[status.indexOf(account)].emails = emails;
            await db.set(`accounts_${message.guild.id}_${client.user.id}`, status)
 
            let button = new MessageButton()
            .setLabel("For Phones")
            .setCustomId('acc')
            .setDisabled(false)
            .setStyle("SUCCESS")
            .setEmoji("📱")
            
            let phone = new MessageActionRow() 
  .addComponents(
      button
  )  
  const collectedMessage = await message.author.send({
    embeds: [new MessageEmbed()


      .setDescription(`**Hi** ${message.author.tag}, :shopping_cart: \`|\` **You Have Purchased Account${amount > 1 ? "s" : ""}**
\`\`\`
${accs.join("\n")}
\`\`\`

> **Account type:** ${accountName.toUpperCase()}
> **Amount of account${amount > 1 ? "s" : ""}:** \`${amount}\`
> **Total price:** \`${finalPrice + 5}\`
> **Purchase date:** <t:${Math.round(Date.now()  /1000)}:F>
`)
    .setColor("GREEN")
    ] , components: [phone]
  }).catch(err => {
    errorEmbed.setDescription(`**Your DM Is Closed!!! .. Couldn't Send The Accounts**`)
     msg.edit({content: `.` , embeds: [errorEmbed] , components: []});
if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
}


  })
    if(collectedMessage) {
        let feedback = await db.get(`feedback_${message.guild.id}_${client.user.id}`)
        let feedbackChannel = message.guild.channels.cache.find(x => x.id === feedback)
if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
}
        


        try {
            msg.delete()
            
        } catch (error) {
            console.log(`Error Deleting Message: ${error}`)
            
        }
        if(feedbackChannel) {

        message.reply({content: `**انظر لخاصك ولا تنسى تقيمنا هنا
 ${feedbackChannel} **`
      
         , components: []})
    } else {
        message.reply({content: `**Check Your DM's & Don't Forget To Rate The Service** `  , components: []})
    }
    let roleID = await db.get(`role_${message.guild.id}_${client.user.id}`)
    let role = message.guild.roles.cache.find(x => x.id === roleID)
    if(role) {
        message.member.roles.add(role).catch(err => {
            console.log(`error adding the role ${err}`)})
    }
    let log = await db.get(`log_${message.guild.id}_${client.user.id}`)
    let logChannel = message.guild.channels.cache.get(log)
    if(logChannel && log !== null) {
        let emb = new MessageEmbed()
        .setColor("#00ff00")
        .setTitle("Bought Accounts")
        .setDescription(`**:shopping_cart: \`|\` \`${message.author.tag}\` \`(${message.author.id})\` I have bought**`)
        .addFields({
            name: "Accounts",
            value: `||${accs.join("\n")}||`
        } , {
            name: "Category",
            value: `${accountName.toUpperCase()}`
        } , {
            name: `Amount Of ${amount > 1 ? "Accounts" : "Account"}`,
            value: `${amount} ${amount > 1 ? "Accounts" : "Account"}`
        } , {
            name: "Total Price",
            value: `${accPrice * amount}`
        } , {
            name: "Purchase Date",
            value: `<t:${Math.round(Date.now()  /1000)}:F>`
        }
)
        ///.setTimestamp()

        logChannel.send({embeds:[emb]})
    }
  
    const filter2 = i => i.user.id === message.author.id
    const collector2 = collectedMessage.createMessageComponentCollector({filter2 , time: 1200000})
    collector2.on('collect', async i => {
        await i.deferUpdate();
        if(i.customId === "acc") {
            button.setDisabled(true)
            collectedMessage.edit({content: `||${accs.join("\n")}||` , components: [phone]})
        }
    })
    collector2.on('end', async (reason , collected) => {
        if(reason === "time" && collected.size === 0) {
                        button.setDisabled(true)
            collectedMessage.edit({ components: [phone]})
        }
    })

    

    
    }     
}).catch(err => {
if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
}
    errorEmbed.setDescription(`**Transfer Timed Out**`)
    msg.edit({content: ` ` , embeds: [errorEmbed] , components: []});
})
              

            }
            if(i.isButton()) {
                if(i.customId === "cancel") {
                    
                    if(db.has(`buying_${message.guild.id}_${message.author.id}`)) {
	 db.delete(`buying_${message.guild.id}_${message.author.id}`)
 }                   
									cancelled = true
     
                    let embed = new MessageEmbed()
                    .setColor("black")
                    .setTitle(`**Cancelled**`)
                    .setDescription(`**You Have Cancelled The Purchase**`)
                    //.setThumbnail(client.user.displayAvatarURL())
                    .setTimestamp()


                    return msg.edit({content: ` ` , embeds: [embed] , components: []});


                }

            }
        })
				
        
    }
}

			

