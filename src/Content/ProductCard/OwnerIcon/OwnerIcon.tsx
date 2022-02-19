import React from 'react';
import { CardData } from '../../Content';
import OwnedIcon from '@material-ui/icons/CheckCircleOutline';


interface OwnerIconProps {
    card: CardData;
    user: string;
}

export default function OwnerIcon({ card, user }: OwnerIconProps) {

    const owned = card.owner === user;

    return owned ? (
        <>
            &nbsp;
            <OwnedIcon style={{ color: '#00c853', verticalAlign: 'middle', transform: 'translateY(-2px)' }} />
        </>
    ) : <></>;
}
