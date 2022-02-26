// Получение discord.js и других библиотек
const FileSystem = require('fs')
const Discord = require('discord.js')
const {Client, Intents} = require('discord.js')

class BotCommand {
    static run(bot, message, args, Config) {
        let commandsString = ""
        let commandFiles = FileSystem.readdirSync('./cmds', { withFileTypes: true })
        commandFiles.forEach(file => {
            if(file.name.endsWith('.js')){
                let commandName = Config.Prefix + file.name.replace('.js', '')
                let {_, Description} = require('./' + file.name)
                commandsString += '**' + commandName + '** ' + Description + "\n"
            }
        });
        message.channel.send(commandsString)
    }
}

module.exports = {
    commandClass: BotCommand,
    Description: 'Показывает список команд',
 }