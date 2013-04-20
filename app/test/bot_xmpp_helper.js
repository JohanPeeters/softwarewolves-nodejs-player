const should = require('should');
const xmpp = require('node-xmpp');
const util = require('util');

const muc_ns = 'http://jabber.org/protocol/muc';
const room_jid = 'village1234@jabber.org';
const game_coordinator = 'sww@some_server';

const BotXmppHelper = require('../lib/bot_xmpp_helper');

const EventEmitter = require('events').EventEmitter;
const xmppClientStub = new EventEmitter();
xmppClientStub.jid = 'BotXmppHelperTest@some.server';


function TestBotXmppHelper(jid, roomnick) {

    this.client = xmppClientStub;
    this.client.send = function () {
    };
    BotXmppHelper.call(this, jid, '', 'jabber.org', game_coordinator, roomnick);
}

util.inherits(TestBotXmppHelper, BotXmppHelper);

describe('BotXmppHelper', function () {

    const jid = 'joligeheide@jabber.org';
    const roomnick = 'joligeheidi';
    var helper = new TestBotXmppHelper(jid, roomnick);

    describe('on receiving online event', function () {

            it('tells the game co-ordinator it wants to play', function (done) {
                const sendPlayIntention = function (message) {
                    const body = message.getChild('body');
                    if (message.is('message')
                        && message.to == game_coordinator
                        && body) {
                        body.getText().should.equal('I want to play');
                        done();
                    }
                };
                helper.client.send = sendPlayIntention;
                helper.client.emit('online');
            });

        }
    );

    describe('on receiving an invitation to a village', function () {

        it('joins the village and emits an event', function (done) {
            helper.client.send = function (message) {
                message.is('presence').should.be.true;
                message.to.should.equal(room_jid + '/' + roomnick);
                helper.client.send = function (message) {
                };
                done();
            };

            const invitation = new xmpp.Message({to:jid, from:room_jid});
            invitation.c('x', {xmlns:muc_ns + '#user', jid:room_jid})
                .c('invite', {to:jid})
                .c('reason')
                .t('come and join the werewolf game');

            helper.client.emit('stanza', invitation);
            helper.isInVillage.should.be.true;
        });
    });

    describe('on receiving a presence message from a moderator', function () {
        it('sends out a god_is_omnipresent event', function (done) {
            const fromin = "village516@conference.jabber.org/MC";
            const to = "fred_villager@jabber.org/1c78baec2b520fb0";

            helper.on('god_is_omnipresent', function (fromout) {
                fromout.should.equal(fromin);
                done();
            });

            var msg = new xmpp.Presence({from:fromin, to:to, xmlns:'http://etherx.jabber.org/streams'});
            msg.c('x', { xmlns:'http://jabber.org/protocol/muc#user' }).c('item', { affliation:'owner', role:"moderator" });
            helper.client.emit('stanza', msg);
        });

    });
});