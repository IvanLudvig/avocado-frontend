import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Typography } from '@material-ui/core';
import { CardData, CONTRACT } from '../../Content';
import BidContainer from './BidContainer/BidContainer';
import Preview from './Preview/Preview';
import OwnerIcon from '../OwnerIcon/OwnerIcon';
import { Contract } from 'web3-eth-contract';
import description from 'material-ui/svg-icons/action/description';
import domain from 'material-ui/svg-icons/social/domain';
import Web3 from 'web3';
import moment from 'moment';

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
        top: '100px'
    },
    subtitle: {
        fontWeight: 'bold',
    },
    descriptionContainer: {
        marginTop: '16px',
        width: '250px',
        wordBreak: 'break-all'
    },
    adField: {
        marginTop: '8px',
        marginBottom: '8px',
        width: '284px',
        marginRight: '16px'
    },
    upload: {
        float: 'right',
        marginRight: '16px'
    },
    ban: {
        color: '#ff0000',
        marginTop: '8px',
        marginLeft: '-8px'
    }
});

interface ProductDialogProps {
    card: CardData;
    open: boolean;
    setOpen: (open: boolean) => void;
    account: string;
    contract: Contract;
}

export default function ProductDialog({ card, open, setOpen, account, contract }: ProductDialogProps) {
    const classes = useStyles();
    const [bid, setBid] = useState(card.price);
    const [manage, setManage] = useState(card.html);
    const [error, setError] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        let secTimer = setInterval(() => {
            const duration = moment.duration(Math.max(card.duration - (Math.floor(Date.now() / 1000) - card.purchaseTime), 0), 'seconds');
            let d = duration.days() ? duration.days() + 'd:' : '';
            d += d || duration.hours() ? duration.hours() + 'h:' : '';
            d += d || duration.minutes() ? duration.minutes() + 'm:' : '';
            d += d || duration.seconds() ? duration.seconds() + 's' : '';
            setTime(d);
        }, 1000)

        return () => clearInterval(secTimer);
    }, []);


    const handleClose = () => setOpen(false);

    const owned = card.owner.toLowerCase() === account.toLowerCase();
    const created = card.creator.toLowerCase() === account.toLowerCase();

    const update = async () => {
        if (contract && account) {
            var transfer = contract.methods.setHtml(card.id, manage);
            var encodedABI = transfer.encodeABI();

            var tx = {
                from: account,
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

    const ban = async () => {
        if (contract && account) {
            if ((!owned) && (created)) {
                console.log('banUser');
                var transfer = contract.methods.banUser(card.id);
                var encodedABI = transfer.encodeABI();

                var tx = {
                    from: account,
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
            if ((!created) && (owned)) {
                console.log('banSpaceOwners');
                var transfer = contract.methods.banSpaceOwners(card.id);
                var encodedABI = transfer.encodeABI();

                var tx = {
                    from: account,
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

        }
        setOpen(false)
    }

    const handleMange = (e: any) => setManage(e.target.value);

    return (
        <Dialog classes={{ paper: classes.container }} open={open} onClose={handleClose}>
            <DialogTitle>{card.name} <OwnerIcon card={card} user={account} /></DialogTitle>
            <DialogContent>
                <Preview card={card} owned={owned} />

                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Description
                    </Typography>
                    {card.description}
                </div>
                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Time left
                    </Typography>
                    {time}
                </div>
                <div className={classes.descriptionContainer}>
                    <Typography className={classes.subtitle}>
                        Owner
                    </Typography>
                    {card.owner}
                </div>

                <Typography className={classes.price}>
                    Current Price: {card.price} ETH/day
                </Typography>

                {owned &&
                    <div className={classes.manage}>
                        <Typography className={classes.subtitle}>
                            Manage
                        </Typography>
                        <TextField value={manage} onChange={handleMange} color='secondary' className={classes.adField} label='HTML' variant='outlined' multiline rows={3}>
                        </TextField>
                        <Button className={classes.upload} color='secondary' onClick={update}>Update</Button>
                    </div>
                }

                {(!owned) && (created) && <Button className={classes.ban} color='secondary' variant='text' onClick={ban}>Ban Advertiser</Button>}
                {(owned) && (!created) && <Button className={classes.ban} color='secondary' variant='text' onClick={ban}>Ban Space Owner</Button>}

                {!owned &&
                    <BidContainer
                        card={card}
                        bid={bid}
                        setBid={setBid}
                        error={error}
                        setError={setError}
                        account={account}
                        contract={contract}
                        handleClose={handleClose}
                    />
                }

            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
