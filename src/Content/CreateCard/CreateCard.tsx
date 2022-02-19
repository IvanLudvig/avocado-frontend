import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Typography } from '@material-ui/core';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { Contract } from 'web3-eth-contract';
import { Web3Provider } from '@ethersproject/providers';
import { useWallet } from '../utils/useWallet';
import { CONTRACT } from '../Content';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '800px',
        minHeight: '400px'
        // height: '300px'
    },
    address: {
        margin: '8px',
        fontSize: '14px'
    },
    field: {
        margin: '8px',
    }
});

export type CardData = {
    id: string;
    name: string;
    price: number;
    description: string;
    owner: string;
    html: string;
    domain?: string;
    sizeX?: number;
    sizeY?: number;
}

interface CreateCardProps {
    contract: Contract;
    currentAccount: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function CreateCard({ contract, currentAccount, open, setOpen }: CreateCardProps) {
    const classes = useStyles();

    const [name, setName] = useState('Banner');
    const [description, setDescription] = useState('Footer banner');
    const [domain, setDomain] = useState('github.com');
    const [price, setPrice] = useState(0.1);
    const [timespan, setTimespan] = useState(60 * 60);
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);


    //@ts-ignore
    const { ethereum } = window;
    const mint = async () => {
        if (contract && currentAccount) {
            const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            const nonce = await web3.eth.getTransactionCount(currentAccount, 'latest');

            const value = web3.utils.toHex(web3.utils.toWei(price + '', 'ether'));
            var transfer = contract.methods.addAdvSpace(value, timespan, domain, height, width, name, description);
            var encodedABI = transfer.encodeABI();

            var tx = {
                from: currentAccount,
                to: CONTRACT,
                gas: '150000',
                data: encodedABI
            };

            try {
                //@ts-ignore
                console.log(await window.ethereum
                    .request({
                        method: 'eth_sendTransaction',
                        params: [tx],
                    }));
            } catch (error) {
                console.log(error)
            }
        }
        setOpen(false)
    }

    const handleChange = (f: any) => (e: any) => f(e.target.value);

    return (
        <Dialog classes={{ paper: classes.container }} open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Create new Ad</DialogTitle>
            <DialogContent>
                <TextField value={name} onChange={handleChange(setName)} className={classes.field} color='secondary' label='Name' variant='standard' />
                <TextField className={classes.field} value={domain} onChange={handleChange(setDomain)} color='secondary' label='Domain' variant='standard' />
                <TextField className={classes.field} value={price} onChange={handleChange(setPrice)} color='secondary' label='Price, ETH' variant='standard' type='number' />
                <TextField className={classes.field} value={description} onChange={handleChange(setDescription)} color='secondary' label='Description' variant='standard' />
                <TextField className={classes.field} value={timespan} onChange={handleChange(setTimespan)} color='secondary' type='number' label='Timespan, seconds' variant='standard' />
                <TextField className={classes.field} value={width} onChange={handleChange(setWidth)} color='secondary' label='Width, px' variant='standard' type='number' />
                <TextField className={classes.field} value={height} onChange={handleChange(setHeight)} color='secondary' label='Height, px' variant='standard' type='number' />

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={() => setOpen(false)}>Close</Button>
                <Button variant='contained' color='secondary' onClick={mint}>Create new ad space</Button>
            </DialogActions>
        </Dialog>
    );
}
