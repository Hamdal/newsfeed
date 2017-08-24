const fs = require('fs');

module.exports = {
    set_user: function(new_data, user_id) {
        data = JSON.parse(fs.readFileSync('dependencies/database.json', 'utf-8'));
        data.users[user_id] = new_data;
        // Write data back to server
        fs.writeFileSync('dependencies/database.json', JSON.stringify(data));
    },
    get_user: function(user_id) {
        data = JSON.parse(fs.readFileSync('dependencies/database.json', 'utf-8'));
        // console.log(data[user_id]);
        return data.users[user_id];
    }
}
