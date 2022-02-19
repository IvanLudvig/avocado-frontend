import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import { CardData } from '../../Content';
import BidContainer from './BidContainer/BidContainer';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '800px',
        height: '300px'
    },
    price: {
        position: 'absolute',
        right: '16px',
        top: '64px',
        fontWeight: 'bold',
        color: '#000c66',
        fontSize: '18px'
    },
    subtitle: {
        fontWeight: 'bold',
    },
    preview: {
        postion: 'relative',
        backgroundColor: primary,
        width: '300px',
        height: '300px',
        textAlign: 'center',
        verticalAlign: 'center',
    },
    descriptionContainer: {
        marginTop: '16px'
    }
});

interface ProductDialogProps {
    card: CardData;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ProductDialog({ card, open, setOpen }: ProductDialogProps) {
    const classes = useStyles();
    const [bid, setBid] = useState(card.price);
    const [error, setError] = useState('');

    const handleClose = () => setOpen(false);

    return (
        <Dialog classes={{ paper: classes.container }} open={open} onClose={handleClose}>
            <DialogTitle>{card.name}</DialogTitle>
            <DialogContent>
                <div
                    className={classes.preview}
                    style={{ width: '200px', height: '100px', border: '2px #000 solid' }}
                >
                    {card.sizeX}x{card.sizeY}<br />
                    {card.domain}
                </div>

                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Description
                    </Typography>
                    {card.description}
                </div>

                <Typography className={classes.price}>
                    Current Price: {card.price} ETH
                </Typography>

                <BidContainer card={card} bid={bid} setBid={setBid} error={error} setError={setError} />

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
