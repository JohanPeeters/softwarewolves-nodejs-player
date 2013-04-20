/**
 * Created with JetBrains WebStorm.
 * User: nelis
 * Date: 16/11/12
 * Time: 14:43
 * To change this template use File | Settings | File Templates.
 */
const magic_strings = require('./magic_strings');
const magicStrings = new magic_strings.MagicStrings();

const REQUEST_VOTE = magicStrings.getMagicString('REQUEST_VOTE');
const VOTE = magicStrings.getMagicString('VOTE');
const HANG_ANNOUNCEMENT = magicStrings.getMagicString('HANG_ANNOUNCEMENT');
const VICTIM_ANNOUNCEMENT = magicStrings.getMagicString('VICTIM_ANNOUNCEMENT');


const BotXmppHelper = require('./bot_xmpp_helper');

function Bot(nickname, xmppHelper){
    this.xmppHelper = xmppHelper;
    const self = this;

    xmppHelper.on('arrived_at_village',function(){
        xmppHelper.publiclySpeakInVillage("Howdy!");

    });

    xmppHelper.on('god_is_omnipresent',function(moderator){
        self.moderator = moderator;
    });

    xmppHelper.on('villagechatter', onHangingAnnouncement);

    xmppHelper.on('villagechatter', onDayBreak);

    function die() {
        xmppHelper.removeListener('villagechatter', onHangingAnnouncement);
        xmppHelper.removeListener('villagechatter', onDayBreak);
    }

    function onHangingAnnouncement(from, message){
        if(from == self.moderator && message == HANG_ANNOUNCEMENT + nickname){
            xmppHelper.publiclySpeakInVillage("it wasn't me!");
            die();
        }
    }

    function onDayBreak(from, message){
        if(from == self.moderator && message == VICTIM_ANNOUNCEMENT + nickname){
            die();
        }
    }
}

module.exports = Bot;
