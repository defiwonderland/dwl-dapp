import { ChainId } from "..";

const contractAddresses = {
    bonusReward: {
        [ChainId.MAINNET]: "",
        [ChainId.TESTNET]: "0x27E9c75eD116c25010e12BC1638a693048eccAf9"
    },

    mulltiCall: {
        [ChainId.MAINNET]: '',
        [ChainId.TESTNET]: '0xB507EFe0Cf59F6F820914cB7ada622718B552DaB',
    },

    priceFeed: {
        [ChainId.MAINNET]: '',
        [ChainId.TESTNET]: '0xeCE41106e5ADc5A1671Efb976bA69212B213174c',
    },
}

export default contractAddresses