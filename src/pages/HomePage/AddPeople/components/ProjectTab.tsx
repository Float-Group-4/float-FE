import { Box, Button, ClickAwayListener, FormControl, IconButton, List, ListItem, ListItemButton, ListItemText, Popover, Stack, TextField, Typography } from "@mui/material";
import { PersonInfo } from "../models";
import { Close, ArrowDropDown } from "@mui/icons-material";
import { useState } from "react";

interface CustomTextFieldProps {
    placeHolder: string;
    showClearIcon: boolean;
    showDropdownIcon: boolean;
    name: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
    placeHolder,
    showClearIcon,
    showDropdownIcon,
    name,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
    const [currentText, setCurrentText] = useState('');

    const handleClose = () => {
        setIsOpen(false);
        setAnchor(null);
    };

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnchor(e.currentTarget);
        setIsOpen(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentText(e.target.value.trim());
    };

    return (
        <Box>
            <TextField
                size='medium'
                value={currentText}
                placeholder={placeHolder}
                onInput={onInput}
                onChange={handleChange}
                name={name}
                sx={{ maxWidth: '90%', minWidth: '100%' }}
                InputProps={{
                    endAdornment: (
                        <Stack direction='row'>
                            {currentText.length > 0 && showClearIcon && (
                                <IconButton onClick={handleClose}>
                                    <Close />
                                </IconButton>
                            )}
                            {showDropdownIcon && (
                                <IconButton onClick={handleClose}>
                                    <ArrowDropDown />
                                </IconButton>
                            )}
                        </Stack>
                    ),
                }}
            />
            <Popover
                id='simple-popover'
                open={isOpen}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Typography>
                        <Button onClick={handleClose}>Add "{currentText}"</Button>
                    </Typography>
                </ClickAwayListener>
            </Popover>
        </Box>
    );
};

interface ProjectSubBodyProps {
    info: PersonInfo,
    setInfo: (info: any) => void
}

const ProjectSubBody = (props: ProjectSubBodyProps) => {
    const { info, setInfo } = props
    return (
        <Box display='flex' flexDirection='column' justifyContent='space-between' paddingX={2}>
            <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5%' }}>
                <FormControl fullWidth>
                    <Typography>Role</Typography>
                    <CustomTextField
                        placeHolder=''
                        showDropdownIcon={true}
                        showClearIcon={false}
                        name=''
                    />
                </FormControl>

            </Box>
            <Box sx={{height: '30vh'}}>
                <List>
                {info.projects?.map(p => {
                    return (
                    <ListItem>
                        <ListItemText>{p}</ListItemText>
                        <ListItemButton><Close/></ListItemButton>
                    </ListItem>);
                })}
            </List>
            </Box>
            
        </Box>
    );
}

export default ProjectSubBody;