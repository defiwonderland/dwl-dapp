import React from "react"
import { StyledCard, CardTitle } from "../elements";
import { Box } from "@mui/system";
import { NftCardProps } from "../types";

const NftCard: React.FC<NftCardProps> = ({ id, img }) => {
    return (
        <StyledCard>
            <Box sx={{
                margin: "10px 0"
            }}>
                <img src={img} alt={id} style={{
                    borderRadius: "4px",
                    width: "100%",
                    minHeight: "250px",
                }} />
            </Box>

            <CardTitle>Defi Wonderland - #{id}</CardTitle>

        </StyledCard>
    )
}

export default NftCard