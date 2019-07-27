import AbilityContext = require('../AbilityContext');
import DrawCard = require('../drawcard');
import BaseCard = require('../basecard');
import Player = require('../player');
import { CardGameAction, CardActionProperties } from './CardGameAction';
import { Locations, EventNames }  from '../Constants';

export interface RevealProperties extends CardActionProperties {
    chatMessage?: boolean;
    player?: Player;
    onDeclaration?: boolean;
}

export class RevealAction extends CardGameAction {
    name = 'reveal';
    eventName = EventNames.OnCardRevealed;
    effect = 'reveal a card';
    cost = 'revealing {0}';
    defaultProperties: RevealProperties = { chatMessage: false };
    constructor(properties: ((context: AbilityContext) => RevealProperties) | RevealProperties) {
        super(properties);
    }

    canAffect(card: BaseCard, context: AbilityContext): boolean {
        if(!card.facedown && (card.isInProvince() || card.location === Locations.PlayArea)) {
            return false;
        }
        return super.canAffect(card, context);
    }

    addPropertiesToEvent(event, card: BaseCard, context: AbilityContext, additionalProperties): void {
        let { onDeclaration } = this.getProperties(context, additionalProperties) as RevealProperties;
        event.onDeclaration = onDeclaration;
        super.addPropertiesToEvent(event, card, context, additionalProperties);
    }

    eventHandler(event, additionalProperties): void {
        let properties = this.getProperties(event.context, additionalProperties) as RevealProperties;
        if(properties.chatMessage) {
            event.context.game.addMessage('{0} reveals {1} due to {2}', properties.player || event.context.player, event.card, event.context.source);
        }
        event.card.facedown = false;
    }
}
