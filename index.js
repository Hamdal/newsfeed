console.log('starting bot');
var active = false;

const Telebot = require('telebot');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const bot = new Telebot('394815100:AAHTlRzKdwjAIRS51IEffYTLu70iovxrms4');
const fs = require('fs');
const database = require('./dependencies/database.js');
// const all_sources = require('./dependencies/options.js')
const change_source = require('./dependencies/change_source.js');
const request_url = 'https://api.telegram.org/bot394815100:AAHTlRzKdwjAIRS51IEffYTLu70iovxrms4/getUpdates?timeout=240';


// Setting up
var context = 'default';

bot.on('/start', (msg) => {
    console.log(msg);

    // capturing user details
    var user = msg.from;
    var user_id = user.id;
    var first_name = user.first_name;
    var last_name = user.last_name
    var username = user.username;
    var update_time = '';

    bot.sendMessage(user_id, 'Your account has been created');
        // Save new user on database
        if ((database.get_user(user_id.toString())) == undefined) {
            new_user = {
                user_id: user_id,
                username: username,
                first_name: first_name,
                last_name: last_name,
                receive_update: 'yes',
                headline_time: update_time,
                source: {
                    'general': 'the-guardian-uk',
                    'sport': 'bbc-sport',
                    'music': 'mtv-news',
                    'entertainment': 'buzzfeed',
                    'business': 'business-insider',
                    'technology': 'hacker-news',
                    'gaming': 'ign',
                    'science_and_nature': 'national-geographic'
                },
                category: 'General'
            };

            database.set_user(new_user, user_id);
        }
    });


// getting default headlines

bot.on(['/headlines', '/headlines-sport', '/headlines-entertainment', '/headlines-music', '/headlines-business', '/headlines-gaming', '/headlines-technology', '/headlines-science_and_nature'], (msg) => {
    // Get user information
    var user_id = msg.from.id;
    var text = msg.text;
    var source_key = text.split('-')[1];
    //getting the corresponding news source for the command from the database
    var user_data = database.get_user(user_id.toString());

    // Get headlines
    if (text == '/headlines') {
        request(`https://newsapi.org/v1/articles?source=${user_data.source.sport}&apiKey=de67485020c64cc3a3b12b3c3922b638`, (err, res, body) => {
            if (err) {
                console.log(err);
            }
            var body = JSON.parse(body);
            var articles = body.articles;
            console.log(body.articles);
            for (var headline of articles) {
                msg.reply.text(headline.url);
            }
        });
    }
    else {
        request(`https://newsapi.org/v1/articles?source=${user_data.source[source_key]}&apiKey=de67485020c64cc3a3b12b3c3922b638`, (err, res, body) => {
            if (err) {
                console.log(err);
            }
            var body = JSON.parse(body);
            var articles = body.articles;
            console.log(body.articles);
            for (var headline of articles) {
                msg.reply.text(headline.url);
            }
        });
    }
});



// Help command
bot.on('/defaults', (msg) => {
    // getting user data from database
    var user_id = msg.from.id;    
    var user_data = database.get_user(user_id.toString());
    
    bot.sendMessage(user_id, 'These are your defaults').then(res => {
        // Displaying defaults to user and how it can be changed
        for (var category in user_data.source) {
            msg.reply.text(`Your default for ${category.toUpperCase()} headlines is "${user_data.source[category].toUpperCase()}", to change this send /changesource_${category}`)
        }
    });
});


// Change user defaults
bot.on([
    '/changesource_general',
    '/changesource_sport',
    '/changesource_business',
    '/changesource_music',
    '/changesource_entertainment',
    '/changesource_gaming',
    '/changesource_technology',
    '/changesource_science_and_nature'
], (msg) => {
    var command = msg.text.split('_')[1];
    // Determine what to do based on what type of command was used
    switch(command) {
        case 'general':
            // change_defaults_general(msg);
            change_source.general(msg);
            break;
        case 'sport':
            change_source.sport(msg);
            break;
        case 'music':
            change_source.music(msg);
            break;
        case 'entertainment':
            change_source.entertainment(msg);
            break;
        case 'technology':
            change_source.technology(msg);
            break;
        case 'business':
            change_source.business(msg);
            break;
        case 'gaming':
            change_source.gaming(msg);
            break;
        case 'science_and_nature':
            change_source.science_and_nature(msg);
            break;            
    }
});


bot.on('/help', (msg) => {
    const user_id = msg.from.id;
    console.log(msg);
    bot.sendMessage(user_id, '➡️ To use headlines_bot effectively, you may send /commands to view a list of available commands. \n\n' + 
    '➡️ To view the default sites from which your headlines are sourced send /defaults . \n\n' + 
    '➡️ If you wish to change the news sites you receive your updates from, send /changesource_category, where category is the category of the news e.g /changesource_sport to change the source for sport headlines. \n\n' + 
    '➡️ If you are in the middle of a process but you wish to cancel it send /cancel .\n\n' + 
    '➡️ If the bot is malfunctioning in any way, you may try sending /cancel to reset it. \n\n' +
    '️️️️➡️ To keep the bot and telegram from lagging you may consider clearing the bot messages if you have been using it for a long time');
});


bot.on('/commands', (msg) => {
    const user_id = msg.from.id;
    bot.sendMessage(user_id, 'The following are the available commands').then((res) => {
        bot.sendMessage(user_id, '/commands - view a list of available commands.');
        bot.sendMessage(user_id, '/help - shows you tips on how to use the bot effectively.');
        bot.sendMessage(user_id, '/defaults - view a list of default news source for each category');
        bot.sendMessage(user_id, '/about - about the app, state and version and developer');
        bot.sendMessage(user_id, '/options - change set options');
        bot.sendMessage(user_id, '/cancel - cancel an ongoing operation');
        bot.sendMessage(user_id, '/headlines - view headlines, customise by adding category to it');
    });
    

});


bot.on('/about', (msg) => {
    const user_id = msg.from.id;
    bot.sendMessage(user_id, 'This bot is made to retrieve headlines from news websites. Powered by News API \n\n The default news source is ' +
    'The Guardian and  the default category of news is GENERAL\n\n' + 
    'Version 1.0 beta \n\n' + 
    'Developed by Devayo' )
});




bot.start();
