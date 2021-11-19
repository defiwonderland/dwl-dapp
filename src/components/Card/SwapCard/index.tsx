import React, { useState, useCallback } from "react";
import { StyledCard, CardText } from "../elements";
import { StyledH3 } from "../../Text";
import { Box } from "@mui/system";
import { StyledIconButton } from "../../Button";
import { FiSettings } from "react-icons/fi"
import { StyledBox, InputContainer, TradeInput } from "./elements";
import { PrimaryButton } from "../../Button";
import useActiveWeb3React from "../../../hooks/useActiveWeb3React";
import { CustomImg } from "../elements";
import UnlockButton from "../../UnlockButton";
import {useDerivedSwapInfo} from "./hooks"

import { useSwapCallback } from "../../../hooks/useSwapCallback";
import { useUserSlippageTolerance } from "../../../state/user/hooks";
import { Percent } from "@sushiswap/sdk";

const SwapCard: React.FC = () => {
  const { account } = useActiveWeb3React();
  const [fromValue, setFromValue] = useState<string>("0");
  const [toValue, setToValue] = useState<string>("0");

  const {
    v2Trade,
    currencyBalances,
    parsedAmount,
    currencies,
    inputError: swapInputError,
    allowedSlippage,
  } = useDerivedSwapInfo(fromValue);

  const trade = v2Trade;

  // the callback to execute the swap
  const { callback: swapCallback, error: swapCallbackError } = useSwapCallback(
    trade,
    allowedSlippage,
    recipient,
    signatureData,
    doArcher ? ttl : undefined
  );

  const handleSwap = useCallback(() => {
    swapCallback()
      .then((hash) => {
        console.log(hash);
      })
      .catch((error) => {});
  }, [priceImpactWithoutFee, swapCallback, tradeToConfirm, t]);

  return (
    <StyledBox>
      <StyledCard bgcolor="#000000">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <StyledH3 style={{ color: "#ffffff" }}>Swap</StyledH3>

          <StyledIconButton bgcolor="#0b2d28">
            <FiSettings />
          </StyledIconButton>
        </Box>

        <StyledCard
          bgcolor="#0b2d28"
          style={{ width: "100%", margin: "20px 0" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: "200px",
              }}
            >
              <CustomImg src="./images/trades/eth.png" />

              <Box>
                <CardText
                  ml="15px"
                  mt="5px"
                  mb="5px"
                  fontWeight={600}
                  color="#ffffff"
                >
                  From
                </CardText>
                <CardText
                  ml="15px"
                  mt="5px"
                  mb="5px"
                  fontWeight={400}
                  color="#ffffff"
                >
                  ETH
                </CardText>
              </Box>
            </Box>

            <InputContainer>
              <TradeInput
                disableUnderline={true}
                value={fromValue}
                onChange={(e: any) => setFromValue(e.target.value)}
              />
            </InputContainer>
          </Box>
        </StyledCard>

        <StyledCard
          bgcolor="#0b2d28"
          style={{ width: "100%", margin: "20px 0" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                width: "200px",
              }}
            >
              <CustomImg src="./images/trades/wndr.png" />

              <Box>
                <CardText
                  ml="15px"
                  mt="5px"
                  mb="5px"
                  fontWeight={600}
                  color="#ffffff"
                >
                  To
                </CardText>
                <CardText
                  ml="15px"
                  mt="5px"
                  mb="5px"
                  fontWeight={400}
                  color="#ffffff"
                >
                  WNDR
                </CardText>
              </Box>
            </Box>

            <InputContainer>
              <TradeInput disableUnderline={true} value={toValue} />
            </InputContainer>
          </Box>
        </StyledCard>

        {account ? (
          <PrimaryButton onClick={handleSwap}>Swap</PrimaryButton>
        ) : (
          <UnlockButton />
        )}
      </StyledCard>
    </StyledBox>
  );
}

export default SwapCard