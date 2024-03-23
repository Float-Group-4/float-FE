import React, { useState } from 'react';

import {
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
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

const CustomMiModal = (props: MiModalProps) => {
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

  const [isDismissOpen, setIsDismissOpen] = useState(false);

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
      onBackdropClick={() => {
        setIsDismissOpen(true);
      }}
      BackdropProps={{ onClick: () => setIsDismissOpen(true) }}
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
          {title}
        </DialogTitle>
      )}

      {!miState.isMinimize && (
        <>
          <DialogContent
            onScroll={onScroll}
            sx={{ p: 0, bgcolor: theme.palette.background.paper }}
            className='dialog-content-print scroll-box'
            id='write-grapes'
          >
            {children}
          </DialogContent>
          {footer && (
            <DialogActions
              sx={{
                py: 1,
                px: 4,
                bgcolor: theme.palette.background.paper,
                justifyContent: 'flex-start',
              }}
            >
              {footer}
            </DialogActions>
          )}
        </>
      )}
      {isDismissOpen && (
        <DismissDialog
          isOpen={isDismissOpen}
          setIsOpen={setIsDismissOpen}
          handleDismiss={() => {
            setIsDismissOpen(false);
            onClose(true);
          }}
        />
      )}
    </Dialog>
  );
};

interface DismissDialogProp {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleDismiss: () => void;
}

const DismissDialog = (props: DismissDialogProp) => {
  const { isOpen, setIsOpen, handleDismiss } = props;

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth='sm'>
      <DialogTitle>
        <Typography variant='h2' fontWeight={400}>
          You have unsaved changes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography fontSize='16px'>Are you sure you want to leave?</Typography>
      </DialogContent>
      <DialogActions sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
        <Button variant='contained' onClick={handleDismiss} color='primary' sx={{ marginLeft: 2 }}>
          Leave
        </Button>
        <Button variant='contained' onClick={() => setIsOpen(false)} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomMiModal;
