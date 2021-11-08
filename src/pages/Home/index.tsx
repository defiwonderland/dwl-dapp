import React from "react"
import Intro from "./Intro"
import Stats from "./Stats"
import HorizontalContent from "./HorizontalContent"
import VerticalContent from "./VerticalContent"
import Community from "./Community"
import BottomImg from "./BottomImg"

function Home(): JSX.Element {
    const desc1 = "Defi Wonderland is committed to protecting and rebuilding forests and our beautiful planet. \n A percentage of all platform revenues is directed to our Planet Earth Fund, which is \n governed by our community DINK token."
    const desc2 = "No registration required to start. Simply connect \n your wallet and follow the white \n rabbit into DeFi Wonderland!"

    return (
        <section style={{ marginTop: "70px" }}>
            <Intro />
            <Stats />
            <HorizontalContent />
            <VerticalContent title="Every Transaction Saves The Planet" desc={desc1} />
            <Community />
            <VerticalContent title="Start Now" desc={desc2} buttonText="Let's Start" />
            <BottomImg />
        </section>
    )
}

export default Home
