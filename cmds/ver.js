const FileSystem = require('fs')
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')

class BotCommand {
    static async run(bot, message, args, Config, authorMember) {

        let member = message.mentions.members.first()

        let addRoleObject = message.guild.roles.cache.find(role => role.id == '925002883622142022')
        let removeRoleObject = message.guild.roles.cache.find(role => role.id == '925009982242574437')

        // Проверка прав доступа
        if(!authorMember.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)){
            message.channel.send('У вас нет прав использовать эту команду.')
            return
        }

        // Роль игрока не существует?
        if(!addRoleObject){
            message.channel.send('Роль игрока не найдена')
            return
        }

        // Роль верификации не существует?
        if(!removeRoleObject){
            message.channel.send('Роль верификации не найдена')
            return
        }

        // Указан ли участник?
        if(!member){
            message.channel.send('Укажите участника через @')
            return
        }

        // Участник был уже верифицирован?
        if(member.roles.cache.some(role => role.id == '925002883622142022')){
            message.channel.send('Этот участник уже был верифицирован.')
            return
        }

        await member.roles.remove(removeRoleObject)
        await member.roles.add(addRoleObject)

        message.channel.send('Участник верифицирован.')

    }
}

module.exports = {
    commandClass: BotCommand,
    Description: 'Выдать игроку роль!',
    Visible: false,
 }