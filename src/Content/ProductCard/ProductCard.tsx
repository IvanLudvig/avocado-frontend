import React from 'react';
import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import { CardData } from '../Content';
import ProductDialog from './ProductDialog/ProductDialog';


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
        // textAlign: 'left'
    },
    datalabel: {
        margin: '8px'
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
}

export default function ProductCard({ card }: ProductCardProps) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    return (
        <>
            <Card className={classes.container}>
                <Typography className={classes.datalabel}>{card.name}</Typography>
                <Button className={classes.details} variant='contained' color='secondary' onClick={() => setOpen(true)}>Details</Button>
                <Typography className={classes.price}>{card.price} ETH</Typography>
            </Card>
            <ProductDialog card={card} open={open} setOpen={setOpen} />
        </>
    );
}
