import React from "react"
import SwapCard from "../../components/Card/SwapCard"
import { WidthWrapper, Wrapper } from "../../components/Layout"
import { Box } from "@mui/system"

const Trade: React.FC = () => {
    return (
      <section style={{ marginTop: "70px" }}>
        <Wrapper>
          <WidthWrapper>
            <Box>
              <SwapCard />
            </Box>
          </WidthWrapper>
        </Wrapper>
      </section>
    );
}

export default Trade