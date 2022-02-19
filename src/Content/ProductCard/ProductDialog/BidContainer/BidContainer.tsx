import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { CardData } from '../../../Content';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    bid: {
        postion: 'absolute',
        right: '-14px',
        margin: 0,
        height: '40px',
        marginLeft: '-8px'
    },
    bidField: {
        width: '200px',
        padding: '0px',
        position: 'relative'
    },
    bidContainer: {
        position: 'absolute',
        left: '300px',
        top: '108px'
    }
});

interface BidContainerProps {
    card: CardData;
    bid: number;
    setBid: (bid: number) => void;
    error: string;
    setError: (bid: string) => void;
}

export default function BidContainer({ card, bid, setBid, error, setError }: BidContainerProps) {
    const classes = useStyles();

    const handleChange = (e: any) => {
        const value = parseFloat(e.target.value);
        setBid(value);
        setError('');
        if (value) {
            if (value < card.price) {
                setError('Must be higher than current price')
            }
        }
    }

    const makeBid = () => {

    }

    return (
        <div className={classes.bidContainer}>
            <TextField
                label='ETH'
                variant='outlined'
                type='number'
                className={classes.bidField}
                size='small'
                color='secondary'
                value={bid}
                onChange={handleChange}
                error={!!error}
                helperText={error}
                InputProps={{
                    type: 'number',
                    inputProps: {
                        max: 100, min: 10
                    },
                    endAdornment: (
                        <Button
                            disableElevation
                            className={classes.bid}
                            variant='contained'
                            color='secondary'
                            disabled={!!error}
                            onClick={makeBid}
                        >
                            Bid
                        </Button>
                    )
                }}
            />
        </div>
    );
}
