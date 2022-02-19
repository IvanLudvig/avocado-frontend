import { Web3Provider } from "@ethersproject/providers"
import { useWeb3React } from "@web3-react/core"
import { useEffect } from "react"
import useSWR from "swr"


export const fetcher = (library: any) => (...args: any) => {
    const [method, ...params] = args
    return library[method](...params)
}

export const Balance = () => {
    const { account, library } = useWeb3React<Web3Provider>()
    const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'], {
        fetcher: fetcher(library),
    })

    useEffect(() => {
        if (library) {
            console.log(`listening for blocks...`)
            library.on('block', () => {
                console.log('update balance...')
                mutate(undefined, true)
            })
            return () => {
                library.removeAllListeners('block')
            }
        }
    }, [])

    if (!balance) {
        return <div>...</div>
    }
    return <div>Ξ {(parseFloat(balance)/1e18).toPrecision(4)}</div>
}