# GreenMile <img src="https://i.ibb.co/9T9y67S/logo-transparent.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png" width="40" height="40" /> 
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
   - Things Required:
      - [ESP8266](https://www.amazon.in/Lolin-NodeMCU-ESP8266-CP2102-Wireless/dp/B010O1G1ES/ref=sxts_sxwds-bia-wc-nc-drs1_0?cv_ct_cx=ESP8266+WiFi+Module&dchild=1&keywords=ESP8266+WiFi+Module&pd_rd_i=B010O1G1ES&pd_rd_r=904933b1-0ea6-4431-82e4-f5c96b2d4ef1&pd_rd_w=UPHTD&pd_rd_wg=CiApK&pf_rd_p=4856a1b6-75e2-4f99-bb59-edf3db6a4f74&pf_rd_r=H8B6CSPWN9X8EW85MQ4R&psc=1&qid=1611814473&sr=1-1-606822b7-04c2-4c74-a611-acbe80e94641)
      - [Ultrasonic Sensor](https://www.amazon.in/Ultrasonic-Sensor-Module-HC-SR-04-Robokart/dp/B00ZNB01HI)
      - [1 ohm resistors](https://www.amazon.in/REES52-Value-Resistor-Kit-ohm/dp/B07KS83TX6)
      - [Breadboard](https://www.amazon.in/REES52-400-Point-Solderless-Breadboard/dp/B01IN0QGP6/ref=pd_all_pref_1?pd_rd_w=uKp77&pf_rd_p=c10d0b9c-438d-4711-90c0-57b4b7f6b336&pf_rd_r=1V6C5WX8SYVXE27Z92ZJ&pd_rd_r=97046aef-7fec-402d-a709-ed8ec942f79c&pd_rd_wg=x92rQ&pd_rd_i=B01IN0QGP6&psc=1)
      - [Jumper wires](https://www.amazon.in/Electrobot-Jumper-Wires-120-Pieces/dp/B071VQLQQQ/ref=sr_1_6?dchild=1&keywords=wires&qid=1611814687&sr=8-6)
   - Circuit image:
     - <img src="https://i.ibb.co/kVLRMyL/Screenshot-2021-01-27-163417.png" alt="" data-canonical-src="https://gyazo.com/eb5c5741b6a9a16c692170a41a49c858.png"/>
7. SetUp Google Billing A/C in google cloud console and setup your project in it to get the API related to `Direction API` and `Maps JavaScript API`.
8. Setup a [Thingspeak](https://thingspeak.com/login?skipSSOCheck=true) IoT Cloud account.
   - Go to Channel and create a new channel
   - Make the channel public and note the write API command so that you can use in the String API key in NODEMCU_DATA_UPLOAD.ino.
8. Clone the repository: `git@github.com:shreyshreyansh/GreenMile.git`
9. Open the repository in VS code.
10. Install the application: `npm install` in hyper. 
11. Start the server: `node index.js`
12. View in browser at `http://localhost:3000`

## WEBSITE
Various GIF of the website.

- Landing Page
  - ![](https://github.com/shreyshreyansh/GreenMile/blob/master/landPage.gif)
- Map Page
  - ![](https://github.com/shreyshreyansh/GreenMile/blob/master/map.gif)
- Mainframe Page
  - ![](https://github.com/shreyshreyansh/GreenMile/blob/master/mainFrameG.gif)


Good Luck!
