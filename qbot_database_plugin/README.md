# qbot database plugin
A plugin that adds the ability for qbot to have a database.

To build a plugin off of this plugin use this format and have your users install this plugin as well as yours in your plugin's instructions:

```js
const db = require('../db.js');   // Or your db.js file location

db.set('variable', 'value');      // Set a variable.
db.get('variable');               // Returns a variable's value.
db.delete('variabale');           // Deletes a variable.
db.clear();                       // Deletes every variable in the database.
```

## Instructions
* Make an empty file named `.data/db.sqlite` (will be named `db.sqlite` and in the `.data` folder - this file will not show in some editors after you make it and refresh the page)
* Open the bot terminal/repl.it shell.
* Run `npm install keyv @keyv/sqlite`
* Run `wget -O db.js https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/qbot_database_plugin/db.js`
* Run `wget -O dbplugin_LICENSE https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/qbot_database_plugin/LICENSE`
* Run `wget -O dbplugin_acknowledgements.md https://raw.githubusercontent.com/yogurtsyum/qbot-plugins/master/qbot_database_plugin/acknowledgements.md`
* Restart the bot.
