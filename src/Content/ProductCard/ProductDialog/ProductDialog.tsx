import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core';
import { CardData } from '../../Content';
import BidContainer from './BidContainer/BidContainer';
import Preview from './Preview/Preview';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '800px',
        // height: '300px'
    },
    price: {
        position: 'absolute',
        left: '320px',
        top: '64px',
        fontWeight: 'bold',
        color: '#000c66',
        fontSize: '18px'
    },
    subtitle: {
        fontWeight: 'bold',
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
                <Preview card={card} />

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
