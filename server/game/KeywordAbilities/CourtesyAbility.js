const TriggeredAbility = require('../triggeredability.js');
const { AbilityTypes } = require('../Constants');

class CourtesyAbility extends TriggeredAbility {
    constructor(game, card) {
        super(game, card, AbilityTypes.ForcedInterrupt, {
            when: {
                onCardLeavesPlay: (event, context) => event.card === context.source &&
                                                      context.source.hasCourtesy()
            },
            title: card.name + '\'s Courtesy',
            printedAbility: false,
            message: '{0} gains a fate due to {1}\'s Courtesy',
            messageArgs: context => [context.player, context.source],
            handler: context => this.game.applyGameAction(context, { gainFate: context.player })
        });
    }

    isTriggeredAbility() {
        return false;
    }

    isKeywordAbility() {
        return true;
    }
}

module.exports = CourtesyAbility;
