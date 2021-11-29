import React from "react"
import { StyledCard, CardTitle, CardText } from "../elements";
import { Box } from "@mui/system";
import { NftCardProps } from "../types";
import { styled } from "@mui/system";
import { ExpandButton } from "../../Button"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import Collapse from '@mui/material/Collapse';
import { Grid } from "@mui/material";

const CollectionImage = styled('img')({
    borderRadius: "4px",
    minWidth: "150px",
    minHeight: "150px",
    maxHeight: "200px",
    maxWidth: "100%"
})

const TraitContainer = styled('div')(({ theme }) => ({
    border: `2px solid ${theme.palette.primary.main}`,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
}))

const NftCard: React.FC<NftCardProps> = ({ collection }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <StyledCard>
            <Box sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                <CollectionImage src={collection.image} alt={collection.name} />
                <CardTitle style={{ textAlign: "center", margin: "10px" }}>{collection.name}</CardTitle>
            </Box>

            <Box sx={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}>
                <ExpandButton endIcon={expanded ? <MdArrowDropUp /> : <MdArrowDropDown />} onClick={handleExpandClick}>More Details</ExpandButton>
            </Box>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{
                    padding: "10px"
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: "start",
                        justifyContent: "center",
                        margin: "10px 0",
                        flexDirection: "column"
                    }}>
                        <CardText mb="0px" mt="0px" mr="5px" fontWeight={600}>Description:</CardText>
                        <CardText fontWeight={400} mt="0px" mb="0px">{collection.description}</CardText>
                    </Box>

                    <Grid container spacing={2}>
                        {
                            collection.attributes.map(attribute => (
                                <Grid container item sm={12} md={6} lg={4} alignItems="center" justifyContent="center" key={attribute.trait_type}>
                                    <TraitContainer>
                                        <CardText mb="0px" mt="0px" fontWeight={600} style={{ textAlign: "center" }}>{attribute.trait_type}</CardText>
                                        <CardText fontWeight={400} mt="0px" mb="0px">{attribute.value}</CardText>
                                    </TraitContainer>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Collapse>
        </StyledCard>
    )
}

export default NftCard