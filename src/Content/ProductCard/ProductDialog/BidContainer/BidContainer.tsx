import React from 'react';
import { Button, makeStyles, TextField } from '@material-ui/core';
import { CardData, CONTRACT } from '../../../Content';
import { Contract } from 'web3-eth-contract';
import Web3 from 'web3';

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
    contract: Contract;
    account: string;
    handleClose: () => void;
}

export default function BidContainer({ card, bid, setBid, error, setError, contract, account, handleClose }: BidContainerProps) {
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

    const makeBid = async () => {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        console.log((parseInt(card.id)), bid, 60);

        const value = web3.utils.toHex(web3.utils.toWei(bid + '', 'ether'));
        var transfer = contract.methods.buyAdvertisementSpace(parseInt(card.id), value, 60);
        var encodedABI = transfer.encodeABI();

        var tx = {
            from: account,
            to: CONTRACT,
            gas: '30000',
            value: value,
            data: encodedABI
        };

        //@ts-ignore
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [tx],
            });

        handleClose();
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
