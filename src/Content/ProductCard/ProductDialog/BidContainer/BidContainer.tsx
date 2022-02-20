import React, { useState } from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { CardData, CONTRACT } from '../../../Content';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    bid: {
        marginTop: '8px',
        postion: 'absolute',
        margin: 0,
        height: '40px',
        width: '254px'
    },
    bidField: {
        width: '150px',
        padding: '0px',
        position: 'relative'
    },
    daysField: {
        width: '100px',
        padding: '0px',
        position: 'relative',
        marginLeft: '4px'
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
    contract: Contract;
    account: string;
    handleClose: () => void;
}

export default function BidContainer({ card, bid, setBid, error, setError, contract, account, handleClose }: BidContainerProps) {
    const classes = useStyles();

    const [daysError, setDaysError] = useState('');
    const [days, setDays] = useState(1);

    const handleChange = (e: any) => {
        const value = parseFloat(e.target.value);
        setBid(value);
        if (value) {
            if (value < card.price) {
                setError('Must be higher than current price')
            } else {
                setError('');

            }
        }
    }

    const handleDaysChange = (e: any) => {
        const value = parseFloat(e.target.value);
        setDays(value);
        if (value) {
            if (value < 1) {
                setDaysError('Must be more than 1')
            } else {
                setDaysError('');
            }
        }
    }

    const makeBid = async () => {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log(parseInt(card.id), bid, days);

        const value = web3.utils.toHex(web3.utils.toWei(bid + '', 'ether'));
        const valueTotal = web3.utils.toHex(web3.utils.toWei(bid * days + '', 'ether'));
        var transfer = contract.methods.buyAdvertisementSpace(parseInt(card.id), value, days);
        var encodedABI = transfer.encodeABI();

        var tx = {
            from: account,
            to: CONTRACT,
            gas: '300000',
            value: valueTotal,
            data: encodedABI
        };

        //@ts-ignore
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [tx],
            })
            .then((result: any) => window.location.reload());

        handleClose();
    }

    return (
        <div className={classes.bidContainer}>
            <TextField
                label='ETH/day'
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
                        min: card.price
                    }
                }}
            />
            <TextField
                label='days'
                variant='outlined'
                type='number'
                className={classes.daysField}
                size='small'
                color='secondary'
                value={days}
                onChange={handleDaysChange}
                error={!!daysError}
                helperText={daysError}
                InputProps={{
                    type: 'number',
                    inputProps: {
                        min: 1
                    }
                }}
            />
            <Button
                disableElevation
                className={classes.bid}
                variant='contained'
                color='secondary'
                disabled={!!(error || daysError)}
                onClick={makeBid}
            >
                Bid {bid * days} ETH for {days} days
            </Button>
        </div>
    );
}
