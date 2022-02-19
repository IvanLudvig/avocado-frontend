import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Typography } from '@material-ui/core';
import { CardData } from '../../Content';
import BidContainer from './BidContainer/BidContainer';
import Preview from './Preview/Preview';
import OwnerIcon from '../OwnerIcon/OwnerIcon';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '800px',
        minHeight: '400px'
        // height: '300px'
    },
    price: {
        position: 'absolute',
        left: '300px',
        top: '64px',
        fontWeight: 'bold',
        color: '#000c66',
        fontSize: '18px'
    },
    manage: {
        position: 'absolute',
        left: '300px',
        top: '160px'
    },
    subtitle: {
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginTop: '16px'
    },
    adField: {
        // height: '150px',
        marginTop: '8px',
        marginBottom: '8px',
        width: '284px',
        marginRight: '16px'
    },
    upload: {
        float: 'right',
        marginRight: '16px'
    }
});

interface ProductDialogProps {
    card: CardData;
    open: boolean;
    setOpen: (open: boolean) => void;
    user: string;
}

export default function ProductDialog({ card, open, setOpen, user }: ProductDialogProps) {
    const classes = useStyles();
    const [bid, setBid] = useState(card.price);
    const [error, setError] = useState('');

    const handleClose = () => setOpen(false);

    const owned = card.owner === user;

    return (
        <Dialog classes={{ paper: classes.container }} open={open} onClose={handleClose}>
            <DialogTitle>{card.name} <OwnerIcon card={card} user={user} /></DialogTitle>
            <DialogContent>
                <Preview card={card} />

                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Description
                    </Typography>
                    {card.description}
                </div>
                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Owner
                    </Typography>
                    {card.owner}
                </div>

                <Typography className={classes.price}>
                    Current Price: {card.price} ETH
                </Typography>

                {owned &&
                    <div className={classes.manage}>
                        <Typography className={classes.subtitle}>
                            Manage
                        </Typography>
                        <TextField className={classes.adField} label='HTML' variant='outlined' multiline rows={3}>

                        </TextField>
                        <Button className={classes.upload} color='secondary' >Upload Ad</Button>
                    </div>
                }

                <BidContainer card={card} bid={bid} setBid={setBid} error={error} setError={setError} />

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
