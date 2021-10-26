import { styled } from '@mui/system';
import { switchUnstyledClasses } from '@mui/core/SwitchUnstyled';
import { StyledH5 } from '../../Text';

export const Root = styled('span')(({ theme }) => (`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  cursor: pointer;

  & .${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background:#c241b4;
    border-radius: 20px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;

    ${[theme.breakpoints.down("sm")]} {
       background: #A2AFAD;,
    },
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 26px;
    height: 26px;
    top: 4px;
    left: 4px;
    border-radius: 50%;
    background-color: #032621;
    position: relative;
    transition: all 300ms ease;
  }

  & .${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left:30px;
      top:4px;
      background-color:#ffffff;
    }

    .${switchUnstyledClasses.track} {
      background: #032621;

      ${[theme.breakpoints.down("sm")]} {
       background: #DEDEDE;,
      },
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`));


export const StyledSwitchText = styled(StyledH5)<{ textcolor?: string }>(({ theme, textcolor }) => ({
  margin: "0 10px",
  opacity: 1,
  color: textcolor,

  [theme.breakpoints.down("sm")]: {
    color: "#000000",
    fontSize: "14px"
  },
}))