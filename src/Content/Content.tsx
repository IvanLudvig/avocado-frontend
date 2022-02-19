import React from 'react';
import { makeStyles } from '@material-ui/core';
import ProductCard from './ProductCard/ProductCard';


const useStyles = makeStyles({
    root: {
        width: '70%',
        padding: '8px',
        display: 'inline-block',
        marginLeft: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    main: {
        width: '100%',
        margin: '0, auto',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    }
});

export type CardData = {
    name: string;
    price: number;
    description: string;
    domain?: string;
    sizeX?: number;
    sizeY?: number;
}


export default function Content() {
    const classes = useStyles();

    const cards: CardData[] = [
        { name: "Top Banner 1", price: 1.09, description: "300x200", domain: 'google.com', sizeX: 300, sizeY: 200 },
        { name: "Left Banner 1", price: 12, description: "100x100", domain: 'google.com', sizeX: 100, sizeY: 100 },
        { name: "Bottom Box", price: 1, description: "200x200", domain: 'google.com', sizeX: 300, sizeY: 200 },
        { name: "Top Banner 2", price: 0.87, description: "200x200", domain: 'google.com', sizeX: 56, sizeY: 72 },
        { name: "Left Banner 2", price: 0.9110, description: "200x200", domain: 'google.com', sizeX: 32, sizeY: 32 },
        { name: "Top Banner 3", price: 100, description: "200x200", domain: 'google.com', sizeX: 128, sizeY: 64 },
        { name: "Left Banner 3", price: 1.32, description: "200x200", domain: 'google.com', sizeX: 200, sizeY: 200 },
        { name: "Left Banner 4", price: 0.32, description: "200x200", domain: 'google.com', sizeX: 1800, sizeY: 600 },
        { name: "Top Banner 4", price: 4.56, description: "200x200", domain: 'google.com', sizeX: 840, sizeY: 320 },
    ]

    return (
        <div className={classes.root}>
            <div className={classes.main}>

                {/* <Grid container> */}
                {cards.map(card =>
                    <ProductCard card={card} />
                )}
                {/* </Grid> */}
            </div>
        </div>
    );
}
