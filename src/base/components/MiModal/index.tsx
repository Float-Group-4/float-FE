import React, { useState } from 'react';

import {
  Close,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material';
import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { drawerWidth, headerHeight } from '@base/config/config';

export const MIMODAL_ANCHOR_CENTER: string = 'center';
export const MIMODAL_ANCHOR_RIGHT: string = 'right';

export type MiModalAnchor = typeof MIMODAL_ANCHOR_CENTER | typeof MIMODAL_ANCHOR_RIGHT;

export interface MiModalProps {
  title?: string | React.ReactElement;
  isOpen: boolean;
  size: Breakpoint | false;
  fullScreen?: boolean;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onClose: (value: any) => void;
  onScroll?: (e: any) => void;
  anchor?: MiModalAnchor;
  disablePortal?: boolean;
  isCloseByBackdrop?: boolean; // accept close modal by click away on backdrop or not, default is false
}

const MiModal = (props: MiModalProps) => {
  const theme = useTheme();

  const {
    title,
    isOpen,
    size,
    fullScreen = false,
    children,
    footer,
    onClose,
    onScroll,
    anchor = MIMODAL_ANCHOR_CENTER,
    isCloseByBackdrop = false,
    disablePortal = false,
  } = props;

  const isMobile = false; // temp

  //state
  const [miState, setMiState] = useState({
    isShrink: false,
    isMinimize: false,
    isFullScreen: fullScreen,
    anchor: anchor,
  });

  // default don't close dialog when click backdorp
  const handleOnClose = (e: any, reason: 'escapeKeyDown' | 'backdropClick') => {
    if (reason === 'backdropClick' && !isCloseByBackdrop) {
      return;
    }
    onClose && onClose(e);
  };

  return (
    <Dialog
      disablePortal={disablePortal}
      maxWidth={size}
      fullWidth
      fullScreen={miState.isFullScreen || isMobile || miState.anchor === MIMODAL_ANCHOR_RIGHT}
      keepMounted
      onClose={handleOnClose}
      open={isOpen}
      scroll='body'
      sx={
        miState.isMinimize
          ? {
              width: 500,
              top: 'auto',
              left: 'auto',
              bottom: 0,
              transform: 'none',
              pointerEvents: 'all',
            }
          : {
              '& .MuiDialog-paper': {
                p: 0,
                ...(isMobile
                  ? {
                      mx: 0,
                      width: '100%',
                      maxHeight: '100%',
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {}),
                ...(miState.anchor === MIMODAL_ANCHOR_RIGHT && {
                  mx: 0,
                  width: 'auto',
                  maxWidth: 800,
                  minWidth: drawerWidth,
                  maxHeight: '100%',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  boxShadow: 24,
                }),
              },
              '& .MuiDialog-container': {
                justifyContent: miState.anchor === MIMODAL_ANCHOR_RIGHT ? 'flex-end' : 'center',
              },
              top: 0,
              '.MuiBackdrop-root': { bgcolor: 'rgba(15,21,32,.5)' },
            }
      }
      hideBackdrop={miState.isMinimize}
    >
      {title != null && (
        <DialogTitle
          sx={{
            p: 1,
            ml: 2,
            // bgcolor: theme.palette.header,
            height: headerHeight,
          }}
        >
          <Grid container justifyContent='space-between' alignItems='center' sx={{ px: 1 }}>
            <Grid item sx={{ color: theme.palette.common.white }}>
              {title}
            </Grid>
            <Grid item>
              {!isMobile && miState.anchor === MIMODAL_ANCHOR_CENTER && (
                <Tooltip
                  title={miState.isFullScreen ? 'Close full screen' : 'Full screen'}
                  placement='top'
                >
                  <IconButton
                    size='medium'
                    sx={{ color: theme.palette.common.white }}
                    // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setMiState({
                        ...miState,
                        isFullScreen: !miState.isFullScreen,
                        anchor: MIMODAL_ANCHOR_CENTER,
                      });
                    }}
                  >
                    {miState.isFullScreen ? <FullscreenExit /> : <Fullscreen />}
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={'Close' as string} placement='top'>
                <IconButton
                  size='medium'
                  sx={{ color: theme.palette.common.white }}
                  // sx={{ color: alpha(theme.palette.common.white, 0.5) }}
                  onClick={onClose}
                >
                  <Close />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </DialogTitle>
      )}

      {!miState.isMinimize && (
        <>
          <Divider />
          <DialogContent
            onScroll={onScroll}
            sx={{ p: 0, bgcolor: theme.palette.background.paper }}
            className='dialog-content-print scroll-box'
            id='write-grapes'
          >
            {children}
          </DialogContent>
          {footer && (
            <>
              <Divider />
              <DialogActions sx={{ py: 1, px: 2, bgcolor: theme.palette.background.paper }}>
                {footer}
              </DialogActions>
            </>
          )}
        </>
      )}
    </Dialog>
  );
};

export default MiModal;
