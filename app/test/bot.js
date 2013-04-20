const util = require('util');

const magic_strings = require('../lib/magic_strings');
const magicStrings = new magic_strings.MagicStrings();

const ME = 'fred_villager';

const WEREWOLF = magicStrings.getMagicString('WEREWOLF');
const VILLAGER = magicStrings.getMagicString('VILLAGER');
const WHO_DO_YOU_WANT_TO_EAT = magicStrings.getMagicString('WHO_DO_YOU_WANT_TO_EAT');
const I_EAT = magicStrings.getMagicString('I_EAT');
const REQUEST_VOTE = magicStrings.getMagicString('REQUEST_VOTE');
const VOTE = magicStrings.getMagicString('VOTE');
const HANG_ANNOUNCEMENT = magicStrings.getMagicString('HANG_ANNOUNCEMENT');

const Bot = require('../lib/bot');

const EventEmitter = require('events').EventEmitter;

function TestBot() {
    const xmppClientStub = new EventEmitter();
    xmppClientStub.publiclySpeakInVillage = function () {
    };
    xmppClientStub.privatelySpeakInVillage = function () {
    };
    Bot.call(this, ME, xmppClientStub);
}

util.inherits(TestBot, Bot);

describe('Bot', function () {
    const mcjid = 'village1234@some.server/MC';

    var testbot;

    beforeEach(function () {
        testbot = new TestBot();
        testbot.xmppHelper.emit('god_is_omnipresent', mcjid);
    });

    describe('when it is hanged', function () {
        it('protests', function (done) {
            testbot.xmppHelper.publiclySpeakInVillage = function (message) {
                message.should.equal("it wasn't me!");
                done();
            };
            testbot.xmppHelper.emit('villagechatter', mcjid, HANG_ANNOUNCEMENT + ME);
        });
    });
});