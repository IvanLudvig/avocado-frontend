import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { Contract } from "ethers"
import { useEffect } from "react"
import useSWR from "swr"
import abi from "./abi.json"
import { fetcher } from "./Balance"

// @ts-nocheck

interface TokenBalanceProps {
    symbol: any;
    address: string;
}

export default function TokenBalance ({ symbol, address }: TokenBalanceProps) {
    const { account, library } = useWeb3React<Web3Provider>()
    const { data: balance, mutate } = useSWR([address, 'balanceOf', account], {
        fetcher: fetcher(library),
    })

    useEffect(() => {
        if (library) {
            const contract = new Contract(address, abi, library.getSigner())
            const fromMe = contract.filters.Transfer(account, null)
            library.on(fromMe, (from, to, amount, event) => {
                console.log('Transfer|sent', { from, to, amount, event })
                mutate(undefined, true)
            })
            const toMe = contract.filters.Transfer(null, account)
            library.on(toMe, (from, to, amount, event) => {
                console.log('Transfer|received', { from, to, amount, event })
                mutate(undefined, true)
            })
            return () => {
                library.removeAllListeners(toMe)
                library.removeAllListeners(fromMe)
            }
        }
    }, [])

    if (!balance) {
        return <div>...</div>
    }
    return (
        <div>
            {parseFloat(balance).toPrecision(4)} {symbol}
        </div>
    )
}