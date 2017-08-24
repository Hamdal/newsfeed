const Telebot = require('telebot');
const request = require('request');
const bot = new Telebot('394815100:AAHTlRzKdwjAIRS51IEffYTLu70iovxrms4');
const request_url = 'https://api.telegram.org/bot394815100:AAHTlRzKdwjAIRS51IEffYTLu70iovxrms4/getUpdates?timeout=120';
const all_sources = require('./options.js')
const database = require('./database.js');




module.exports = {
    general: function(msg) {
        var user_id = msg.from.id;
        try {
            var general_sources = [
                'cnn',
                'abc-news-au',
                'al-jazeera-english',
                'bbc-news',
                'google-news', 
                'metro',
                'newsweek',
                'new-york-magazine',
                'the-guardian-au',
                'the-huffington-post',
                'the-new-york-times',
                'time'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for GENERAL ';
            for (var source of general_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \ncnn for CNN \nbbc-news for BBC NEWS \ngoogle-news for Google News').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                             // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['general'];
                                user_data.source['general'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for the general category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for the general category\n Enter the source id as they appear e.g bbc-news for BBC NEWS. \n' + 
                                'TRY AGAIN');
                                this.general(msg);
                            }
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                             bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            console.log(err);
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    sport: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'bbc-sport',
                'espn',
                'fox-sports',
                'four-four-two',
                'nfl-news',
                'talksports',
                'the-sport-bible'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for SPORT';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nbbc-sport for BBC SPORT \nespn for ESPN \nfox-sports for Fox Sports').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['sport'];
                                user_data.source['sport'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for sports category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for the sports category\n Enter the source id as they appear e.g bbc-sport for BBC SPORT. \n' + 
                                'TRY AGAIN');
                                this.sport(msg);
                            }
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        }  
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    music: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'mtv-news',
                'mtv-news-uk'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for MUSIC';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nmtv-news for MTV NEWS').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                            // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['music'];
                                user_data.source['music'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for music category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for music category\n Enter the source id as they appear e.g mtv-news for MTV NEWS. \n' + 
                                'TRY AGAIN');
                                this.music(msg);
                            }  
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        }
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    entertainment: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'buzzfeed',
                'daily-mail',
                'entertainment-weekly',
                'mashable',
                'the-lad-bible'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for ENTERTAINMENT';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \ndaily-mail for DAILY MAIL \nbuzzfeed for BUZZFEED').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['entertainment'];
                                user_data.source['entertainment'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for entertainment category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }   
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for entertainment category\n Enter the source id as they appear e.g daily-mail for DAILY MAIL. \n' + 
                                'TRY AGAIN');
                                this.entertainment(msg);
                            } 
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    technology: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'ars-technica',
                'engadget',
                'hacker-news',
                'recode',
                'techcrunch',
                'techradar',
                'the-next-web',
                'the-verge'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for TECHNOLOGY';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nhacker-news for Hacker News \nthe-verge for The Verge').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['technology'];
                                user_data.source['technology'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for technology category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for technology category\n Enter the source id as they appear e.g hacker-news for Hacker News. \n' + 
                                'TRY AGAIN');
                                this.technology(msg);
                            }  
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    business: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'bloomberg',
                'business-insider',
                'cnbc',
                'financial-times',
                'fortune',
                'handelsblatt',
                'the-economist',
                'the-wall-street-journal'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for BUSINESS';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nbusiness-insider for Business Insider \ncnbc for CNBC').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['business'];
                                user_data.source['business'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for business category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for business category\n Enter the source id as they appear e.g business-insider for Business Insider. \n' + 
                                'TRY AGAIN');
                                this.business(msg);
                            }  
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    gaming: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'ign',
                'polygon'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for Gaming';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nign for IGN').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid 
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['gaming'];
                                user_data.source['gaming'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for gaming category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for gaming category\n Enter the source id as they appear e.g ign for IGN. \n' + 
                                'TRY AGAIN');
                                this.gaming(msg);
                            }  
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    },

    science_and_nature: function(msg) {
        var user_id = msg.from.id;
        try {
            var sport_sources = [
                'national-geographic',
                'new-scientist'
            ];
            if (msg.text == '/cancel') {
                throw '/cancel';
            }
            var sources_text = 'Reply with one of the available news sources for Science And Nature';
            for (var source of sport_sources) {
                sources_text += `\n${source}`;
            }
            bot.sendMessage(user_id, sources_text).then((res) => {
                bot.sendMessage(user_id, 'REPLY AS THE SOURCES APPEAR, for example \nnational-geographic for National Geographic').then((res) => {
                    request(request_url, (err, res, body) => {
                        try {
                            var body = JSON.parse(body);
                            var text = body.result[0].message.text;
                            if (text == '/cancel') {
                                throw '/cancel';                 
                            }
                            var avail_sources = all_sources['all_sources']
                            // Checking to see if the sources entered by user is valid
                            if (avail_sources.indexOf(text) != -1) {
                                // source is valid
                                // retrieve user data from database and update it with the new source
                                user_data = database.get_user(user_id.toString());
                                old_source = user_data.source['science_and_nature'];
                                user_data.source['science_and_nature'] = text;
                                console.log(user_data);
                                // store the modified data back into the database
                                database.set_user(user_data, user_id);
                                // send a confirmation message to the user
                                bot.sendMessage(user_id, `Your news source for science and nature category has been successfully changed from "${old_source.toUpperCase()}" to "${text.toUpperCase()}".`);
                            }
                            else {
                                bot.sendMessage(user_id, 'You have entered an invalid news source for science and nature category\n Enter the source id as they appear e.g national-geographic for National Geographic. \n' + 
                                'TRY AGAIN');
                                this.science_and_nature(msg);
                            }  
                        }
                        catch (err) {
                            console.log(err);
                            if (err == '/cancel') {
                                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
                            }
                        } 
                    });
                });
            });
        }
        catch (err) {
            console.log('an error occured');
            if (err == '/cancel') {
                bot.sendMessage(user_id, 'Current operation has been cancelled. /help');
            }
        }
    }
}