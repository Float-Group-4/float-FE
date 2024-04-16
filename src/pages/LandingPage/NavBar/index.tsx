import React, { useState } from 'react';
import FloatIcon from '../../../base/assets/imgs/float.svg';
import { AppBar, Button, CssBaseline, Link, Toolbar, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleToggleFeature = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOnClick = () => {
    const path = '/sign-up';
    navigate(path);
  };

  const navList = ['Customer', 'Integration', 'Pricing'];

  return (
    <CssBaseline>
      <AppBar position='sticky' elevation={0}>
        <div style={{ backgroundColor: 'white', padding: '0 20px' }}>
          <Toolbar disableGutters style={{ justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '30px', height: '30xp' }}>
                <img src={FloatIcon} style={{ width: '100%' }} />
              </div>
              <Typography
                noWrap
                component='a'
                href='/'
                sx={{
                  ml: 1,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'Lexend Deca, sans-serif',
                  fontWeight: 1000,
                  color: 'black',
                  textDecoration: 'none',
                  fontSize: '30px',
                }}
              >
                Proma
              </Typography>
            </div>

            {/* Center Navigation */}
            <div style={{ display: 'flex' }}>
              <Link
                onClick={handleToggleFeature}
                style={{
                  textDecoration: 'none',
                  color: 'Black',
                  fontSize: '20px',
                  padding: '0 10px',
                  fontFamily: 'Lexend Deca, sans-serif',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                className='flex justify-center align-items-center '
                href='#'
              >
                Feature
                {isExpanded ? <KeyboardArrowUpOutlinedIcon /> : <KeyboardArrowDownOutlinedIcon />}
              </Link>
              {navList.map((item, index) => (
                <Link
                  key={index}
                  style={{
                    textDecoration: 'none',
                    color: 'Black',
                    fontSize: '20px',
                    padding: '0 10px',
                    fontFamily: 'Lexend Deca, sans-serif',
                    fontWeight: '200',
                  }}
                  href='#'
                >
                  {item}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'Black',
                  fontSize: '18px',
                  padding: '0 20px 0 0',
                  fontFamily: 'Lexend Deca, sans-serif',
                  display: 'flex',
                }}
                className='flex justify-center align-items-center '
                href='/sign-in'
              >
                Log in
              </Link>
              <Button
                variant='contained'
                style={{
                  backgroundColor: isHovered ? '#FFFFFF' : '#2e5fe8',
                  border: '1px solid #2e5fe8',
                  color: isHovered ? '#2e5fe8' : '#FFFFFF',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                  fontWeight: 'bold',
                  textTransform: 'none',
                }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={handleOnClick}
              >
                <span
                  style={{
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                    transform: isHovered ? 'translateX(-5px)' : 'none',
                  }}
                >
                  Try for free
                </span>
              </Button>
            </div>
          </Toolbar>
        </div>
        {isExpanded && (
          <div
            style={{
              backgroundColor: 'white',
              position: 'absolute',
              top: '100%',
              left: 0,
              width: '100%',
              padding: '20px',
              zIndex: 1000,
              transition: 'transform 0.3s ease',
              boxShadow: '0 5px 5px 0 rgb(0,0,0,0.3)',
            }}
          >
            <Typography color={'black'}>This is the expanded content</Typography>
          </div>
        )}
      </AppBar>
    </CssBaseline>
  );
}

export default NavBar;
