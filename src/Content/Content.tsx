import React, { useState } from 'react';
import { Checkbox, Drawer, FormControlLabel, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import ProductCard from './ProductCard/ProductCard';
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
    root: {
        width: '70%',
        padding: '8px',
        display: 'inline-block',
        marginLeft: '20%',
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
    },
    searchField: {
        width: '90%',
        margin: '16px'
    },
    customField: {
        margin: '16px',
        width: '90%'
    },
    sidebar: {
        width: '20%'
    },
    checkbox: {
        margin: '8px'
    }
});

export type CardData = {
    name: string;
    price: number;
    description: string;
    owner: string;
    domain?: string;
    sizeX?: number;
    sizeY?: number;
}


export default function Content() {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [domain, setDomain] = useState('');
    const [checked, setChecked] = useState(false);
    const handleSearch = (e: any) => setSearch(e.target.value);
    const handleDomain = (e: any) => setDomain(e.target.value);
    const handleCheckbox = (e: any) => setChecked(e.target.checked);

    const user = '0xcb';

    const cards: CardData[] = [
        { name: "Top Banner 1", price: 1.09, description: "300x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'google.com', sizeX: 300, sizeY: 200 },
        { name: "Left Banner 1", price: 12, description: "100x100", owner: '0xc1b', domain: 'google.com', sizeX: 100, sizeY: 100 },
        { name: "Bottom Box", price: 1, description: "200x200", owner: '0x9nw', domain: 'ethereum.org', sizeX: 300, sizeY: 200 },
        { name: "Top Banner 2", price: 0.87, description: "200x200", owner: '0xcb', domain: 'stackoverflow.com', sizeX: 56, sizeY: 72 },
        { name: "Left Banner 2", price: 0.9110, description: "200x200", owner: '0xcb', domain: 'google.com', sizeX: 32, sizeY: 32 },
        { name: "Top Banner 3", price: 100, description: "200x200", owner: '0xcb', domain: 'google.com', sizeX: 128, sizeY: 64 },
        { name: "Left Banner 3", price: 1.32, description: "200x200", owner: '0xcxab', domain: 'stackoverflow.com', sizeX: 200, sizeY: 200 },
        { name: "Left Banner 4", price: 0.32, description: "200x200", owner: '0xcb', domain: 'facebook.com', sizeX: 1800, sizeY: 600 },
        { name: "Top Banner 4", price: 4.56, description: "200x200", owner: '0xcb', domain: 'github.com', sizeX: 840, sizeY: 320 },
    ]

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{ paper: classes.sidebar }}
            >
                <TextField
                    className={classes.searchField}
                    color='secondary'
                    label='Search'
                    variant='outlined'
                    value={search}
                    onChange={handleSearch}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        )
                    }}
                />
                <TextField
                    className={classes.customField}
                    color='secondary'
                    label='Domain'
                    variant='outlined'
                    value={domain}
                    onChange={handleDomain}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        )
                    }}
                />

                <FormControlLabel
                    className={classes.checkbox}
                    label="Owned by me"
                    control={
                        <Checkbox checked={checked} onChange={handleCheckbox} />
                    }
                />
            </Drawer>
            <div className={classes.main}>
                {cards.filter(card => card.description.toLowerCase().includes(search.toLowerCase())
                    || card.name.toLowerCase().includes(search.toLowerCase())
                    || card.domain?.toLowerCase().includes(search.toLowerCase()))
                    .filter(card => card.domain?.toLowerCase().includes(domain.toLowerCase()))
                    .filter(card => !checked || (card.owner === user))
                    .map(card =>
                        <ProductCard card={card} user={user} />
                    )}
            </div>
        </div>
    );
}
