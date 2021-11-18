import React, { useState } from 'react';
import MapGL, {
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pins from './Pins';
import PostOrBid from './PostOrBid';
import { Box } from '@mui/system';
import { styled } from '@mui/system';
import {
    useSnackbarState,
    useLoadingState,
    useErrorState,
    useTransactionHash,
    useSuccessState
} from "../../../state/snackbar/hooks"
import CircularProgress from '@mui/material/CircularProgress';
import CustomSnackbar from '../../../components/Snackbar';
import { useGetWonderVerseDetails, useFetchWonderVerseBaseInfo } from '../../../hooks/useFetchWonderVerse';
import { getTokenAddress, getWonderVerseAddress } from '../../../utils/addressHelpers';
import { useTokenContract } from '../../../hooks/useContract';
import { BigNumber } from 'bignumber.js';
import { useWndrAllowance } from '../../../hooks/useAllowance';
import { useTokenBalance } from '../../../hooks/useTokenBalance';
import { getTokenDecimals } from '../../../utils/decimalHelpers';

const TOKEN = process.env.REACT_APP_MAP_TOKEN

const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px',
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px',
};

const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

const MapLoadingLayout = styled('div')({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(250, 250, 250, 0.5)",
    zIndex: 2,
})

const chainId = Number(process.env.REACT_APP_CHAIN_ID)

const Mapbox: React.FC = () => {
    const [viewport, setViewport] = useState({
        latitude: 51.29,
        longitude: 0,
        zoom: 1.5,
        bearing: 0,
        pitch: 0
    });
    const [popupInfo, setPopupInfo] = useState<any>(null);
    const [openSnackbar, setOpenSnackbar] = useSnackbarState()
    const [loadingState] = useLoadingState()
    const [successState] = useSuccessState()
    const [errorState] = useErrorState()
    const [transactionHash] = useTransactionHash()
    const cities = useGetWonderVerseDetails()
    const baseInfo = useFetchWonderVerseBaseInfo()
    const isMounted = cities && cities.length > 0
    const wndrAddress = getTokenAddress("WNDR", chainId)
    const wndrDecimals = getTokenDecimals("WNDR")
    const wonderVerseAddress = getWonderVerseAddress(chainId)
    const wndrContract = useTokenContract(wndrAddress) as any
    const wndrAllowance = new BigNumber(useWndrAllowance(wndrContract, wonderVerseAddress) || 0).toNumber()
    const wndrBalance = useTokenBalance(wndrContract, wndrDecimals) || 0

    return (
        <Box>
            <MapGL
                {...viewport}
                width="100%"
                height="100vh"
                mapStyle={"mapbox://styles/mapbox/streets-v10"}
                onViewportChange={setViewport}
                mapboxApiAccessToken={TOKEN}
            >
                {
                    isMounted
                        ? <Pins cities={cities} onClick={setPopupInfo} zoom={viewport.zoom} /> : <MapLoadingLayout>
                            <CircularProgress size="45px" />
                        </MapLoadingLayout>
                }

                <PostOrBid info={popupInfo} setPopupInfo={setPopupInfo} allowance={wndrAllowance} tokenBalance={wndrBalance} baseInfo={baseInfo} />

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>

            <CustomSnackbar
                open={openSnackbar}
                onClose={() => setOpenSnackbar(false)}
                loading={loadingState.loading}
                loadingMessage={loadingState.loadingMessage}
                success={successState.success}
                successMessage={successState.successMessage}
                error={errorState.error}
                errorMessage={errorState.errorMessage}
                transactionHash={transactionHash}
            />
        </Box>
    )

}

export default Mapbox