// Получение discord.js и других библиотек
const FileSystem = require('fs')
const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')

class BotCommand {
    static async run(bot, message, args, Config, authorMember) {
        let commandsString = ""
        let commandFiles = FileSystem.readdirSync('./cmds', { withFileTypes: true })
        commandFiles.forEach(file => {
            if(file.name.endsWith('.js')){
                let commandName = Config.Prefix + file.name.replace('.js', '')
                let {_, Description, Visible} = require('./' + file.name)
                if(Visible)
                    commandsString += '**' + commandName + '** ' + Description + "\n"
            }
        });
        message.channel.send(commandsString + '\nНекоторые команды не отображаются в **help**')
    }
}

module.exports = {
    commandClass: BotCommand,
    Description: 'Показывает список команд',
    Visible: true,
 }