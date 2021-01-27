# GreenMile
Green Mile is a smart system which monitors fill level of dustbin using IoT sensors and gives an optimized route to garbage truck drivers passing through all the dustbins with 60% or above fill level and the dustbin which hasn't been picked since 3 days using Google Maps Apis.

## Requirements

- <img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="25" height="25" />   [Node and npm](http://nodejs.org)
- <img src="https://img.icons8.com/color/100/000000/mongodb.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="15" height="15" />   [MongoDB](https://docs.mongodb.com/manual/): Make sure you have your own local or remote MongoDB database 
- <img src="https://img.icons8.com/color/48/ffffff/mr--hustler-robot.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="15" height="15"/>   [Robo 3T](https://robomongo.org/download): A UI to manage your database.
- <img src="https://img.icons8.com/pastel-glyph/64/26e07f/hyperlink--v1.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="15" height="15"/>  [Hyper](https://hyper.is/): A terminal to run the javascript.
- <img src="https://img.icons8.com/color/48/26e07f/visual-studio-code-2019.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="15" height="15"/> [VS Code](https://code.visualstudio.com/download): An ide to write your code.
- <img src="https://img.icons8.com/color/48/26e07f/git.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="15" height="15"/> [Git Bash](https://gitforwindows.org/): Hyper terminal uses git bash.

## Installation Steps

1. Install Node.js (I am assuming you are on windows).
   - Download the Windows installer from the [Nodes.js® web site](http://nodejs.org).
   - Choose the LTS version that’s shown on the left. 
   - Run the installer (the .msi file you downloaded in the previous step.)
   - Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).
   - Restart your computer. You won’t be able to run Node.js® until you restart your computer.
   - Confirm that Node has been installed successfully on your computer by opening cmd and typing in the commands `node --version`
2. Installing the Git Bash
   - Download [Git Bash](https://gitforwindows.org/) 
   - You can tick the box to add a Desktop icon in the installation Wizard.
   - Select Use Vim
   - Use OpenSSH
   - Use OpenSSL
   - Checkout Windows-style
   - Use MinTTY
   - Enable File System cashing and the Credential Manager
   - Leave the experimental features unchecked and click install.
   - Once it's done, just check the Launch Git Bash option and click Finish.
3. Installing the Hyper terminal
   - Download [Hyper](https://hyper.is/)
   - After download open Hyper and click the top left icon Edit->Preferences. hyper.js will open and delete everything and replace it with [this](https://gist.github.com/coco-napky/404220405435b3d0373e37ec43e54a23). 
   - To confirm that installation is successful give `echo $SHELL` command in hyper and the output should be `\bin\bash`.
4. Installing MongoDB
   - Download [MongoDB](https://www.mongodb.com/try/download/community) as per the given config:
     <img src="https://i.ibb.co/FJFjK6B/Screenshot-2021-01-27-134020.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="700" height="282"/>
   - Install MongoDB and keep a note of the Data Directory link:
     <img src="https://i.ibb.co/FVcBm4q/Screenshot-2021-01-27-134745.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
   - Click next and uncheck Install MongoDB Compass and click next and finish the installation.
   - Go to `C:\` and make a folder name `data` and inside that make a folder name `db` `C:\data\db`
   - Now we need to create two shortcut for `mongo.exe` and `mongod.exe` for hyper terminal:
     - Open Hyper and commands: 
        - `cd ~`
        - `touch .bash_profile`
        - `vim .bash_profile`
     - Now press i key which will start INSERT mode in vim for hyper.
     - Paste `alias mongod="/c/Program\ files/MongoDB/Server/4.0/bin/mongod.exe"
              alias mongo="/c/Program\ Files/MongoDB/Server/4.0/bin/mongo.exe"`
       {Note : replace 4.0 with the current version of mondoDB installed}
       and write `:wq!`.
     <img src="https://miro.medium.com/max/875/1*3JX8Tg3MxhoPqC65r1pfew.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
5. Install mongo 3T and make a `greenmileDB` database with these collections:
   - <img src="https://i.ibb.co/NF5cYq5/Screenshot-2021-01-27-141328.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
   - driverinfos
     - <img src="https://i.ibb.co/0Jvq6ZD/Screenshot-2021-01-27-141537.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
   - driverlogins
     - <img src="https://i.ibb.co/kJkwzrd/Screenshot-2021-01-27-141753.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
   - dustbins
     - <img src="https://i.ibb.co/wKvwS2p/Screenshot-2021-01-27-141935.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
6. Configuring the IoT device:
   - Circuit image:
     -
7. Clone the repository: `git@github.com:shreyshreyansh/GreenMile.git`
8. Open the repository in VS code.
9. Install the application: `npm install` in hyper. 
10. Start the server: `node index.js`
11. View in browser at `http://localhost:3000`

## Tutorial Series

This repo corresponds to the Node Todo Tutorial Series on [scotch.io](http://scotch.io)

Each branch represents a certain tutorial.
- tut1-starter: [Creating a Single Page Todo App with Node and Angular](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular)
- tut2-organization: [Application Organization and Structure](https://scotch.io/tutorials/node-and-angular-to-do-app-application-organization-and-structure)
- tut3-services: [Controllers and Services](https://scotch.io/tutorials/node-and-angular-to-do-app-controllers-and-services)

Happy Todo-ing!

![Todo-aholic](https://img.icons8.com/color/100/000000/mongodb.png)
