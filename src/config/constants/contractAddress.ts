import { ChainId } from ".."

const contractAddresses = {
    bonusReward: {
        [ChainId.MATIC]: "",
        [ChainId.KOVAN]: "0x27E9c75eD116c25010e12BC1638a693048eccAf9",
        [ChainId.MATIC_TESTNET]: "0xb0FBe4C9aBddFE543906b600f6D258C446D866FC"
    },

    mulltiCall: {
        [ChainId.MATIC]: '',
        [ChainId.KOVAN]: '0xB507EFe0Cf59F6F820914cB7ada622718B552DaB',
        [ChainId.MATIC_TESTNET]: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc"
    },

    priceFeed: {
        [ChainId.MATIC]: '',
        [ChainId.KOVAN]: '0xeCE41106e5ADc5A1671Efb976bA69212B213174c',
        [ChainId.MATIC_TESTNET]: "0x0d426169314cbe5D27a7926E85adEf467fcCa7B1"
    },

    wonderVerse: {
        [ChainId.MATIC]: "",
        [ChainId.KOVAN]: '0x380810E78ae4D9b8f243bD728a5569030D1E4dE3',
        [ChainId.MATIC_TESTNET]: ""
    }
}

export default contractAddresses