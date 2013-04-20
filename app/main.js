const BotXmppHelper = require('./lib/bot_xmpp_helper');
const Bot = require('./lib/bot');

new Bot('Franky',
    new BotXmppHelper('francis@awtest1.vm.bytemark.co.uk',
        'francis',
        'awtest1.vm.bytemark.co.uk',
        'sww@awtest1.vm.bytemark.co.uk',
        'Franky'));
