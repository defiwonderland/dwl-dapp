import React, { useState } from "react"
import { OptionsContainer, WidthWrapper } from "../../../components/Layout"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import CustomTab from "../../../components/Tab"

const LaunchpadOptions: React.FC = () => {
    const [launchpadStatus, setLaunchpadStatus] = useState<number>(0)

    return (
        <OptionsContainer>
            <WidthWrapper>
                <Grid container spacing={0}>
                    <Grid container item sm={12} justifyContent="center" alignItems="center">
                        <Box sx={{
                            display: 'flex',
                            alignItems: "center",
                            justifyContent: "center",
                            flexGrow: 0.5
                        }}>
                            <CustomTab
                                value={launchpadStatus}
                                onChange={(event, newValue) => setLaunchpadStatus(newValue)}
                                labelText={["Active IDO", "Upcoming IDO", "Ended IDO"]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </WidthWrapper>
        </OptionsContainer>
    )
}

export default LaunchpadOptions