import { FundConfig } from "../types";
import { LeaderboardFundConfig } from "../types";
import { PublicPostConfig } from "../types";
import wonderland from "../../assets/images/funds/fund.svg"
import mikey from "../../assets/images/funds/mikey.png"
import rabbit from "../../assets/images/funds/rabbit.png"
import nocratos from "../../assets/images/funds/nocratos.png"
import union from "../../assets/images/funds/Union.svg"
import unionBlue from "../../assets/images/funds/Union-blue.svg"

export const featuredFunds: FundConfig[] = [
    {
        fid: "001",
        title: "Medium Yield Investment Account",
        subtitle: "Defi Wonderland",
        buttonText: "View Pool",
        managedValue: "$881.9K",
        return: "+35.8%",
        risk: "1/5"
    },

    {
        fid: "002",
        title: "High Yield Investment Account",
        subtitle: "Defi Wonderland",
        buttonText: "View Pool",
        managedValue: "$1231.9K",
        return: "+51.8%",
        risk: "1/3"
    },
]

export const topFunds: FundConfig[] = [
    {
        fid: "001",
        title: "Resurgence Squad",
        subtitle: "Mikey",
        buttonText: "Invest",
        managedValue: "$881.9K",
        return: "+35.8%",
        risk: "1/5"
    },

    {
        fid: "002",
        title: "Muchas",
        subtitle: "Cerc.co",
        buttonText: "Invest",
        managedValue: "$881.9K",
        return: "+35.8%",
        risk: "1/5"
    },

    {
        fid: "003",
        title: "Imitdolor",
        subtitle: "Mikey",
        buttonText: "Invest",
        managedValue: "$881.9K",
        return: "+35.8%",
        risk: "1/5"
    },
]

export const leaderboardFunds: LeaderboardFundConfig[] = [
    {
        rank: 1,
        score: 5655,
        network: "matic",
        pool: "Medium Yield Investment Account",
        managerImg: wonderland,
        manager: "Defi Wonderland",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "2/5"
    },
    {
        rank: 2,
        score: 5655,
        network: "eth",
        pool: "Medium Yield Investment Account",
        managerImg: nocratos,
        manager: "Nocratos",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "1/5"
    },
    {
        rank: 3,
        score: 5655,
        network: "eth",
        pool: "Medium Yield Investment Account",
        managerImg: nocratos,
        manager: "Nocratos",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "1/5"
    },
    {
        rank: 4,
        score: 5655,
        network: "eth",
        pool: "Medium Yield Investment Account",
        managerImg: wonderland,
        manager: "Defi Wonderland",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "2/5"
    },

    {
        rank: 5,
        score: 5655,
        network: "matic",
        pool: "Medium Yield Investment Account",
        managerImg: rabbit,
        manager: "GMS",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "2/5"
    },

    {
        rank: 6,
        score: 5655,
        network: "matic",
        pool: "Medium Yield Investment Account",
        managerImg: mikey,
        manager: "Mikey",
        managedValue: "$2.31M",
        oneDay: -8,
        oneWeek: 10,
        oneMonth: -8,
        threeMonths: 10,
        sixMonths: 38,
        lifeTime: 108,
        risk: "2/5"
    },
]

export const posts: PublicPostConfig[] = [
    {
        pid: 1,
        title: "Binance Coin",
        img: wonderland,
        smImg: union,
    },
    {
        pid: 2,
        title: "Binance Coin",
        img: wonderland,
        smImg: union,
    },
    {
        pid: 3,
        title: "GMS",
        img: rabbit,
        smImg: unionBlue,
    },
    {
        pid: 4,
        title: "Nocratos",
        img: nocratos,
        smImg: unionBlue,
    },
    {
        pid: 5,
        title: "Nocratos",
        img: nocratos,
        smImg: unionBlue,
    },
    {
        pid: 6,
        title: "GMS",
        img: rabbit,
        smImg: union,
    }
]
