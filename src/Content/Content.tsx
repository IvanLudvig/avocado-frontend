import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Drawer, FormControlLabel, IconButton, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import ProductCard from './ProductCard/ProductCard';
import SearchIcon from "@material-ui/icons/Search";
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from './utils/useWallet';
import abi from './utils/abi.json';
import { Contract } from 'web3-eth-contract';
import { Web3Provider } from '@ethersproject/providers';
import CreateCard from './CreateCard/CreateCard';

export const CONTRACT = '0xd5B990a58391402914CC80E7dC33221A20361762';


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
        width: '22%',
        wordBreak: 'break-all'
    },
    checkbox: {
        margin: '8px'
    },
    address: {
        margin: '8px',
        fontSize: '14px'
    }
});

export type CardData = {
    id: string;
    name: string;
    price: number;
    description: string;
    owner: string;
    creator: string;
    html: string;
    duration: number;
    purchaseTime: number;
    domain?: string;
    sizeX?: number;
    sizeY?: number;
}

export default function Content() {
    const classes = useStyles();

    const [search, setSearch] = useState('');
    const [domain, setDomain] = useState('');
    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [open, setOpen] = useState(false);
    const [contract, setContract] = useState<Contract>();

    const [cards, setCards] = useState([] as CardData[]);
    const { currentAccount, setCurrentAccount } = useWallet();
    const handleSearch = (e: any) => setSearch(e.target.value);
    const handleDomain = (e: any) => setDomain(e.target.value);
    const handleCheckbox = (e: any) => setChecked(e.target.checked);
    const handleCheckbox1 = (e: any) => setChecked1(e.target.checked);

    async function load() {
        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        const contract = new web3.eth.Contract(abi as any, CONTRACT);
        setContract(contract);
        console.log(contract.methods);
        contract.methods
            .getAllNFT()
            .call({ from: currentAccount })
            .then(
                (result: any) => {
                    console.log(result);
                    const newCards = result.map((res: any) => {
                        const card = {
                            id: res.id,
                            name: res.name,
                            price: web3.utils.fromWei(res.price, 'ether'),
                            description: "",
                            owner: res.owner,
                            creator: res.creator,
                            domain: res.domain,
                            duration: res.durationInSeconds,
                            purchaseTime: res.purchaseTime,
                            sizeX: parseInt(res.width),
                            sizeY: parseInt(res.height),
                            html: res.html
                        }
                        return card;
                    }) as CardData[];

                    newCards.map((card) => {
                        contract.methods
                            .getPriceForAdv(card.id)
                            .call({ from: currentAccount })
                            .then(
                                (result: any) => {
                                    console.log(result);
                                }
                            );
                    });

                    setCards(newCards);

                    console.log(newCards);
                    return () => {
                        ethereum.removeAllListeners('accountsChanged')
                    }
                }
            );
    }

    useEffect(() => {
        load();
    }, []);
    useEffect(() => {
        console.log(`listening for blocks...`)

        ethereum.enable().then((accs: any) => {
            ethereum.on('accountsChanged', (accounts: any) => {
                load();
            })
        });
    }, [currentAccount]);

    const { account, library } = useWeb3React<Web3Provider>();


    //@ts-ignore
    const { ethereum } = window;
    const connect = async () => {
        const [account] = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(account);
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
                    label="Rented by me"
                    control={
                        <Checkbox checked={checked} onChange={handleCheckbox} />
                    }
                />

                <FormControlLabel
                    className={classes.checkbox}
                    label="Created by me"
                    control={
                        <Checkbox checked={checked1} onChange={handleCheckbox1} />
                    }
                />

                <Button variant='contained' color='secondary' onClick={connect} disabled={!!currentAccount}>Connect</Button>
                <Typography className={classes.address}>
                    {currentAccount}
                </Typography>

                {contract && currentAccount && <CreateCard contract={contract} currentAccount={currentAccount} open={open} setOpen={setOpen} />}

                <Button variant='contained' color='secondary' onClick={() => setOpen(true)} disabled={!currentAccount || !contract}>
                    Create new ad space
                </Button>
            </Drawer>
            {contract && currentAccount &&
                <div className={classes.main}>
                    {cards.filter(card => card.description.toLowerCase().includes(search.toLowerCase())
                        || card.name.toLowerCase().includes(search.toLowerCase())
                        || card.domain?.toLowerCase().includes(search.toLowerCase()))
                        .filter(card => card.domain?.toLowerCase().includes(domain.toLowerCase()))
                        .filter(card => !checked || (
                            (card.owner.toLowerCase() === currentAccount.toLowerCase())
                            && (card.creator.toLowerCase() !== currentAccount.toLowerCase())
                        ))
                        .filter(card => !checked1 || (
                            (card.creator.toLowerCase() === currentAccount.toLowerCase())
                        ))
                        .map(card =>
                            <ProductCard key={'card' + card.id} card={card} account={currentAccount} contract={contract} />
                        )}
                </div>}
        </div>
    );
}
