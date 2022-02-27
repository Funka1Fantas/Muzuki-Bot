console.info('Запуск...')

// Инициализация файлов бота
const FileSystem = require('fs')
let Config = JSON.parse(FileSystem.readFileSync('Config.json'))

// Инициализация Бота

console.info('Запуск бота...')

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')

const Bot = new Discord.Client({intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
]})

// Регистрация бота
Bot.login(Config.Token)

// Инициализация ивентов
Bot.once('ready', () => {
    console.info('Бот запущен успешно')
})

Bot.on('messageCreate', async message => {
    if(message.content.startsWith(Config.Prefix) && !message.author.bot){
        let args = message.content.split(' ')
        let cmd = args[0].replace(Config.Prefix, '')
        try {
            let { commandClass } = require(`./cmds/${cmd}.js`)
            let authorMember = message.guild.members.cache.get(message.author.id);
            try {
                commandClass.run(Bot, message, args, Config, authorMember);
            } catch (error) {
                message.channel.send('Команда **' + Config.Prefix + cmd + '** вернула исключение. Обратитесь к администратору проекта')
                console.error('Ошибка во время выполнения команды ' + cmd + ':\n', error);
            }
        } catch (error) {
            message.channel.send('Команда **' + Config.Prefix + cmd + '** не найдена. Используйте **' + Config.Prefix + 'help** для списка команд!')
        }
    }
})

Bot.on('shardError', async error => {
	console.error('Ошибка подключения:', error);
});

Bot.on('shardReady', () => {
	console.info('Подключение успешно');
});