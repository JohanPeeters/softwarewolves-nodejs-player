softwarewolves-nodejs-player
============================

An implementation of a bot to play the digital version of the werewolves party game.
The bot does not do much - it implements the lazy villager story.

If you want to use this bot to base yours on, clone it locally on your machine:

    git clone https://github.com/JohanPeeters/softwarewolves-nodejs-player.git

Prerequisites are as follows: node.js, icu headers, node-stringprep, node-xmpp, should and mocha, the latter two to run the tests.
If you do not know how to install node.js, maybe you should not use this library.
Unfortunately, there is not the time and space to explain how to install icu headers on all platforms, but here there is some info for OS X and Linux.
On OS X, you need Xcode and MacPorts.
Again, if you do not have Xcode, this library may not be for you, as it will take ages to download and install.
With Xcode and MacPorts, you install icu headers like this:

    sudo port install icu +devel

On Linux, icu headers are in a package called libicu-devel.
After installing icu headers, you can use the node package manager:

    npm install node-stringprep
    npm install node-xmpp
    npm install should
    sudo npm install mocha

We recommend installing mocha as root so that `npm` can create a link in `/usr/local/bin`.

To run the tests, cd into the git repository and run

    mocha

You may want to experiment with some mocha reporters, e.g.

    mocha -R list

