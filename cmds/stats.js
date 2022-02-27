// Получение discord.js и других библиотек
const FileSystem = require('fs')
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')

class BotCommand {
    static async run(bot, message, args, Config, authorMember) {

        let sec = Math.floor((bot.uptime/1000)%60).toString().padStart(2, '0');
        let min = Math.floor((bot.uptime/1000/60)%60).toString().padStart(2, '0');
        let hours = Math.floor((bot.uptime/1000/60/60)%24).toString().padStart(2, '0');
        let days = Math.floor((bot.uptime/1000/60/60/24)).toString().padStart(2, '0');

        let ping = Math.floor(bot.ws.ping)

        let avatarURL = bot.user.avatarURL

        let infoString = ''
        infoString += 'Время работы бота: **' + days + ':' + hours + ':' + min + ':' + sec + '**\n'
        infoString += 'Пинг: **' + ping + '**\n'

        // Send message
        message.channel.send('Информация бота:\n' + infoString)

    }
}

module.exports = {
    commandClass: BotCommand,
    Description: 'Показывает статистику бота',
    Visible: true,
 }