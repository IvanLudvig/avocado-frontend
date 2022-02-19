import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { CardData } from '../../../Content';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    preview: {
        postion: 'relative',
        backgroundColor: primary,
        width: '300px',
        height: '300px',
        textAlign: 'center',
        verticalAlign: 'center',
    }
});

interface PreviewProps {
    card: CardData;
}

export default function Preview({ card }: PreviewProps) {
    const classes = useStyles();


    return (
        <div
            className={classes.preview}
            style={{ width: '200px', height: '100px', border: '2px #000 solid' }}
        >
            {card.sizeX}x{card.sizeY}<br />
            {card.domain}
        </div>
    );
}
