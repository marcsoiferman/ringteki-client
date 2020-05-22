import React from 'react';
import PropTypes from 'prop-types';

class DeckStatusSummary extends React.Component {
    render() {
        let { basicRules, officialRole, noUnreleasedCards, faqVersion, faqRestrictedList, skirmishMode } = this.props.status;
        let items = []
        if (!skirmishMode) {
            items = [
                { title: 'Basic deckbuilding rules', value: basicRules },
                { title: 'Official FFG OP role', value: officialRole },
                { title: `FAQ v${faqVersion} restricted/ban list`, value: faqRestrictedList },
                { title: 'Only released cards', value: noUnreleasedCards },
            ];
        } else {
            items = [
                { title: 'Basic deckbuilding rules', value: basicRules },
                { title: `FAQ v${faqVersion} restricted/ban list`, value: faqRestrictedList },
                { title: 'Only released cards', value: noUnreleasedCards },
            ];
        }


        return (
            <ul className='deck-status-summary'>
                { items.map((item, index) => (
                    <li className={ item.value ? 'valid' : 'invalid' } key={ index }>
                        <span className={ item.value ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-remove' } />
                        { ` ${item.title}` }
                    </li>
                )) }
            </ul>);
    }
}

DeckStatusSummary.propTypes = {
    status: PropTypes.object.isRequired
};

export default DeckStatusSummary;
