import { ChainId } from "..";

const contractAddresses = {
    bonusReward: {
        [ChainId.MAINNET]: "",
        [ChainId.TESTNET]: "0xb0FBe4C9aBddFE543906b600f6D258C446D866FC"
    },

    mulltiCall: {
        [ChainId.MAINNET]: '',
        [ChainId.TESTNET]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
    },

    priceFeed: {
        [ChainId.MAINNET]: '',
        [ChainId.TESTNET]: '0x0d426169314cbe5D27a7926E85adEf467fcCa7B1',
    },
}

export default contractAddresses