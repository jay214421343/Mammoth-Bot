{
  "name": "LoadServerPrefixes",
  "temp": "",
  "event-type": "1",
  "_id": "LoadSubs",
  "actions": [
    {
      "behavior": "1",
      "interpretation": "0",
      "code": "// Make sure it only runs once!!\n//------------\n\nif(!globalVars(\"server_prefixes_loaded\")){ \n  this.callNextAction(cache);\n  this.storeValue(true, 3,\"server_prefixes_loaded\", cache);\n}",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    },
    {
      "behavior": "0",
      "interpretation": "0",
      "code": "Bot.prefixes = {};\nconsole.log('(Server Prefixes) Initiating Server Prefixes....');\nBot.checkCommand = function(msg) {\n\tconst fs = require(\"fs\");\n\tconst path = require(\"path\");\n\n\ttry {\n\t\tconst defaultTag = Files.data.settings.tag;\n\t\tconst separator = Files.data.settings.separator || '\\\\s+';\n\t\n\t\tlet content = msg.content;\n\t\tlet guild = msg.guild;\n\t\n\t\tcontent = content.split(new RegExp(separator))[0];\n\t\n\t\tconst filePath = path.join(\"data\",\"serverPrefixes.json\");\t\t\n\t\tif(fs.existsSync(filePath)){\n\t\t\tlet saved_prefixes = fs.readFileSync(filePath, \"utf8\");\n\t\t\ttry {\n\t\t\t\tthis.prefixes = JSON.parse(saved_prefixes);\t\t\n\t\t\t} catch(err){}\t\t\t\n\t\t}else{\n\t\t\tthis.prefixes[guild.id] = defaultTag;\n\t\t\tfs.writeFileSync(filePath, JSON.stringify(this.prefixes));\n\t\t}\n\n\t\tlet tag = this.prefixes[guild.id] || defaultTag;\n\n                if(Array.isArray(this.prefixes)){ \n                  console.log(\"Old version serverPrefixes.json detected.  Please remove serverPrefixes.json and restart your bot otherwise setting new prefixes will not work!\")\n                  tag = defaultTag;\n                }\n\n\t\tif(tag){\t\n\t\t\tif(guild) guild.tag = tag;\t\n\n\t\t\tif(content.startsWith(tag)) {\t\t\t\t\n\t\t\t\tlet command = content.substring(tag.length);\n\t\t\t\tif(command) {       \n\t\t\t\t\tif(!Bot._caseSensitive) {\n\t\t\t\t\t\tcommand = command.toLowerCase();\n\t\t\t\t\t}\n\t\t\t\t\tconst cmd = Bot.$cmds[command];\n\t\t\t\t\tif(cmd) {\t\t\t\t\t\n\t\t\t\t\t\tActions.preformActions(msg, cmd);\n\t\t\t\t\t}\n\t\t\t\t}\t\t\t\t\n\t\t\t}\n\t\t}\t\t\t\n\t} catch (e) {\n\t\tconsole.error(e);\n\t}\n   \n};\nconsole.log('(Server Prefixes) Loaded Function Overwrite: CheckCommand');\n",
      "storage": "0",
      "varName": "",
      "name": "Run Script"
    }
  ]
}
