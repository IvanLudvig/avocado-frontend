import React from 'react';
import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import { CardData } from '../Content';
import ProductDialog from './ProductDialog/ProductDialog';
import Preview from './ProductDialog/Preview/Preview';
import OwnerIcon from './OwnerIcon/OwnerIcon';
import { Contract } from 'web3-eth-contract';

export const primary = '#e1f5fe';

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '300px',
        height: '300px',
        backgroundColor: primary,
        borderRadius: '16px',
        margin: '16px',
        padding: '8px',
        display: 'inline-block',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    datalabel: {
        margin: '8px'
    },
    preview: {
        height: '200px',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        display: 'flex'
    },
    bottom: {
        height: '100px',
        width: '100%'
    },
    price: {
        position: 'absolute',
        margin: '8px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#000c66',
        fontSize: '18px',
        bottom: '12px',
        left: '16px'
    },
    details: {
        position: 'absolute',
        fontWeight: 'bold',
        bottom: '16px',
        right: '16px'
    }
});

interface ProductCardProps {
    card: CardData;
    account: string;
    contract: Contract;
}

export default function ProductCard({ card, account, contract }: ProductCardProps) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Card className={classes.container}>
                <Typography className={classes.datalabel}>
                    {card.name}
                    <OwnerIcon card={card} user={account} />
                </Typography>
                <div className={classes.preview}>
                    <Preview card={card} owned={card.owner.toLowerCase() === account.toLowerCase()} />
                </div>
                <div className={classes.bottom}>
                    <Button className={classes.details} variant='contained' color='secondary' onClick={() => setOpen(true)}>Details</Button>
                    <Typography className={classes.price}>{card.price} ETH</Typography>
                </div>

            </Card>
            <ProductDialog card={card} open={open} setOpen={setOpen} account={account} contract={contract} />
        </>
    );
}
