import GovernanceHeader from "./GovernanceHeader"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { Grid } from "@mui/material"
import VoteCard from "../../components/Card/VoteCard"
import GovernanceInto from "./GovernanceIntro"
import VotingPowerCard from "../../components/Card/VotingPowerCard"
import StakeCard from "../../components/Card/StakeCard"
import SettingsCard from "../../components/Card/SettingsCard"
import GovernanceStats from "./GovernanceStats"

function Governance(): JSX.Element {
    return (
        <section style={{ marginTop: "70px" }}>
            <GovernanceHeader />

            <Wrapper>
                <WidthWrapper>
                    <Grid container spacing={6}>
                        <Grid container item md={12} lg={7} xl={8} justifyContent="center" alignItems="start">
                            <Grid container spacing={2}>
                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[80]}
                                        totalVote="1465859.3631"
                                        title="Swap Fee"
                                        addressVolume="674"
                                    />
                                </Grid>

                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[70]}
                                        totalVote="1465859.3631"
                                        title="Referral Reward"
                                        addressVolume="674"
                                    />
                                </Grid>

                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[70]}
                                        totalVote="1465859.3631"
                                        title="Referral Reward"
                                        addressVolume="674"
                                    />
                                </Grid>

                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[70]}
                                        totalVote="1465859.3631"
                                        title="Planet Earth Fund"
                                        addressVolume="674"
                                    />
                                </Grid>

                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[70]}
                                        totalVote="1465859.3631"
                                        title="Referral Reward"
                                        addressVolume="674"
                                    />
                                </Grid>

                                <Grid container item sm={6}>
                                    <VoteCard
                                        series={[70]}
                                        totalVote="1465859.3631"
                                        title="Insurance Fund"
                                        addressVolume="674"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container item md={12} lg={5} xl={4} justifyContent="center" alignItems="flex-start">
                            <StakeCard />
                            <SettingsCard />
                            <GovernanceStats />
                        </Grid>
                    </Grid>
                </WidthWrapper>
            </Wrapper>

            <Wrapper>
                <WidthWrapper>
                    <GovernanceInto />
                </WidthWrapper>
            </Wrapper>

            <Wrapper>
                <WidthWrapper>
                    <VotingPowerCard />
                </WidthWrapper>
            </Wrapper>
        </section>
    )
}

export default Governance