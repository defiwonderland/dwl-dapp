import React from "react";
import { StyledStatsCard, CardText } from "./elements";
import { StyledH2 } from "../../Text";
import { StatsCardProps } from "../types"

const StatsCard: React.FC<StatsCardProps> = ({ stats, desc, img, color }) => {
    return (
        <StyledStatsCard bgimg={img}>
            <StyledH2 style={{ marginBottom: "10px" }}>{stats}</StyledH2>
            <CardText color={color}>{desc}</CardText>
        </StyledStatsCard>
    )
}

export default StatsCard