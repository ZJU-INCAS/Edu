import React from 'react'
import { navigate, Link } from '@reach/router'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'
import AccountCircle from '@material-ui/icons/AccountCircle'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default () => {
  const  {isLogIn, myInfo} = useModel(stateModel, ['isLogIn','myInfo'])
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function handleMenuClose() {
    setAnchorEl(null);
  }
  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleLogOut(){
    stateModel.LOG_OUT()
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu';
  const isMenuOpen = Boolean(anchorEl);
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>个人信息</MenuItem>
      <MenuItem onClick={handleLogOut}>注销</MenuItem>
    </Menu>)
  return <>
    {isLogIn&&myInfo ? <IconButton
      aria-haspopup="true"
      color="inherit"
      aria-controls={menuId}
      onClick={handleProfileMenuOpen}
    >
      <AccountCircle /> {myInfo.email}
    </IconButton> : <Link style={{textDecoration: 'none'}} to={'/login'}>登录</Link>}
      {renderMenu}
  </>
}
