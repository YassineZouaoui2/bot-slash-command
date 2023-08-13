const client = require('../../main.js');
const config = require(`../../config.json`)


const db = require('pro.db')
	client.once('ready' , async () => {
    console.log(client.user.username)
     let status = await db.get(`status_${client.user.id}`)
    if(status) {
      await client.user.setActivity(`${status}` , {type:`${config.ActivityType}`})
    } else {
     setTimeout(async () => {
       status = await db.get(`status_${client.user.id}`)
       if(status) {
         await client.user.setActivity(`${status}` , {type:`${config.ActivityType}`})
       } else {
         setTimeout(async () => {
           status = await db.get(`status_${client.user.id}`) 
           await client.user.setActivity(`${status ? status : `${config.Activity}`}` , {type:`${config.ActivityType}`})
         } , 5000)
       }
     } , 5000)
    }
		
	setInterval(async () => {
    let status = await db.get(`status_${client.user.id}`)
    if(status) {
       await client.user.setActivity(`${status}` , {type:`${config.ActivityType}`})
    }
  } , 300000)




		
	})





