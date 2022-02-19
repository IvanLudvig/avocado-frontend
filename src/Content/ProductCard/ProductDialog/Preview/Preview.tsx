import React from 'react';
import { makeStyles } from '@material-ui/core';
import { CardData } from '../../../Content';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    preview: {
        width: '200px',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'inline-block',
    }
});

interface PreviewProps {
    card: CardData;
}

export default function Preview({ card }: PreviewProps) {
    const classes = useStyles();

    const size = 200;

    const scale = size / Math.max(card.sizeX || size, card.sizeY || size);
    const w = Math.max(card.sizeX ? scale * card.sizeX : size, 100);
    const h = Math.max(card.sizeY ? scale * card.sizeY : size, 40);

    return (
        <div
            className={classes.preview}
        >
            <div style={{ width: w, height: h, border: '2px #000 solid', backgroundColor: '#eeeeee', verticalAlign: 'middle' }}>
                <div
                    style={{ verticalAlign: 'middle', marginTop: (h - 40) * 0.5, height: '40px' }}
                >
                    {card.sizeX}x{card.sizeY}
                    <br />
                    <img
                        src={`https://s2.googleusercontent.com/s2/favicons?domain=${card.domain}?size=32`}
                        style={{ width: '20px', verticalAlign: 'middle' }}
                    />
                    &nbsp;
                    {card.domain}
                </div>
            </div>
        </div>
    );
}
