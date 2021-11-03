import { ChainId } from ".."

const lpAddresses = {
    wndr_matic: {
        [ChainId.MATIC]: "",
        [ChainId.KOVAN]: "",
        [ChainId.MATIC_TESTNET]: "0xb6dffbee68f725226c5d5cb7c04ecd29bd259c8f"
    },
    wndr_eth: {
        [ChainId.MATIC]: "",
        [ChainId.KOVAN]: "0xf9b61602e7f45d7264b2f7c578d4534b6f39125d",
        [ChainId.MATIC_TESTNET]: ""
    }
}

export default lpAddresses