import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Drawer, FormControlLabel, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import ProductCard from './ProductCard/ProductCard';
import SearchIcon from "@material-ui/icons/Search";
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { injected } from '../App';
import { Balance } from './utils/Balance';
import { useWallet } from './utils/useWallet';
import abi from './utils/abi.json';


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

    const [cards, setCards] = useState([] as CardData[]);
    // const [account, setAccount] = useState('');
    const { currentAccount, setCurrentAccount } = useWallet();
    const handleSearch = (e: any) => setSearch(e.target.value);
    const handleDomain = (e: any) => setDomain(e.target.value);
    const handleCheckbox = (e: any) => setChecked(e.target.checked);

    const user = '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e';

    // const cards: CardData[] = [
    //     { name: "Top Banner 1", price: 1.09, description: "300x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'google.com', sizeX: 300, sizeY: 200 },
    //     { name: "Left Banner 1", price: 12, description: "100x100", owner: '0xc1b', domain: 'google.com', sizeX: 100, sizeY: 100 },
    //     { name: "Bottom Box", price: 1, description: "200x200", owner: '0x9nw', domain: 'ethereum.org', sizeX: 300, sizeY: 200 },
    //     { name: "Top Banner 2", price: 0.87, description: "200x200", owner: '0xcb', domain: 'stackoverflow.com', sizeX: 56, sizeY: 72 },
    //     { name: "Left Banner 2", price: 0.9110, description: "200x200", owner: '0xcb', domain: 'google.com', sizeX: 32, sizeY: 32 },
    //     { name: "Top Banner 3", price: 100, description: "200x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'google.com', sizeX: 128, sizeY: 64 },
    //     { name: "Left Banner 3", price: 1.32, description: "200x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'stackoverflow.com', sizeX: 200, sizeY: 200 },
    //     { name: "Left Banner 4", price: 0.32, description: "200x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'facebook.com', sizeX: 1800, sizeY: 600 },
    //     { name: "Top Banner 4", price: 4.56, description: "200x200", owner: '0xcbcefb49280bfa3a91d5f5e4f6e56f125ebe199e', domain: 'github.com', sizeX: 840, sizeY: 320 },
    // ];

    useEffect(() => {
        async function load() {
            const web3 = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider("https://ropsten.infura.io/"));

            const contract = new web3.eth.Contract(abi as any, '0x14579973C57C5ED737b110f894d84BB8F4931061');
            //@ts-ignore
            console.log(contract);
            contract.methods
                .getAllNFT()
                .call({ from: currentAccount })
                .then(
                    (result: any) => {
                        console.log(result);
                        const newCards = result.map((res: any) => {
                            const card = {
                                name: res.name,
                                price: parseFloat(res.price),
                                description: "",
                                owner: res.owner,
                                domain: res.domain,
                                sizeX: parseInt(res._length),
                                sizeY: parseInt(res.height),

                            }
                            return card;
                        }) as CardData[];
                        setCards(newCards);
                    }
                );
            //   setContactList(contactList);
            //   const counter = await contactList.methods.count().call();
            //   for (var i = 1; i <= counter; i++) {
            //     const contact = await contactList.methods.contacts(i).call();
            //     setContacts((contacts) => [...contacts, contact]);
            //   }
        }

        load();
    }, []);

    const { active, account, library, connector, activate, deactivate } = useWeb3React();

    //@ts-ignore
    const { ethereum } = window;
    const connect = async () => {
        const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(account);
    }

    async function disconnect() {
        try {
            deactivate()
        } catch (ex) {
            console.log(ex)
        }
    }

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

                <Button variant='contained' color='secondary' onClick={connect}>Connect</Button>
                {currentAccount}
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
