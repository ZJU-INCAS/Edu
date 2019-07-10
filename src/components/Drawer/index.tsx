import React, { useState } from 'react';
import { navigate } from '@reach/router'
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UploadIcon from '@material-ui/icons/cloudUpload';
import MailIcon from '@material-ui/icons/Mail';
import User from '@/components/TopBar/User'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import IssueIcon from '@material-ui/icons/Send';
import InfoIcon from '@material-ui/icons/Info'
import BookIcon from '@material-ui/icons/bookmarks'
import ExitIcon from '@material-ui/icons/ExitToApp'
import useModel from '@/hooks/useModel'
import stateModel from '@/models/state'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/button'
import TextField from '@material-ui/core/TextField'
import {recharge} from '@/services/user'

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      display: 'flex',
      height: '4rem'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    grow: {
      flexGrow: 1,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    menu: {
      root: {
        width: '4rem'
      }
    }
  }),
);

export default function PersistentDrawerLeft() {
  const [dOpen, setDOpen] = React.useState(false);

  function handleDialogOpen() {
    setDOpen(true);
  }

  function handleDialogClose() {
    setDOpen(false);
  }

  const classes = useStyles();
  const theme: any = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  const isProfileMenuOpen = Boolean(profileAnchorEl);

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null)
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({ profileAnchorEl: event.currentTarget });
  };
  const renderProfileMenu = (
    <Menu
      anchorEl={profileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
    </Menu>
  );

  const { isLogIn, type } = useModel(stateModel, ['isLogIn', 'type'])
  const [balance, setBalance] = useState('')
  const handleBalanceChange = (e: any) => {
    setBalance(e.target.value)
  }

  const submit = async () => {
    const res = await recharge(Number(balance) )
    res.map((r:any) => {
      alert('充值成功')
      handleDialogClose()
    })
  }

  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}>
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            数字教育资源平台
            </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <User />
          </div>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem onClick={() => navigate('/')} button key={'主页'}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={'主页'} />
          </ListItem>

          <ListItem onClick={() => navigate('/resource')} button key={'资源中心'}>
            <ListItemIcon><IssueIcon /></ListItemIcon>
            <ListItemText primary={'资源中心'} />
          </ListItem>

          <ListItem onClick={() => navigate('/myResource')} button key={'我的资源'}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary={'我的资源'} />
          </ListItem>

        </List>
        {
          type==='0'&& <List>
          <ListItem onClick={() => setDOpen(true)} button key={'充值'} >
            <ListItemIcon><UploadIcon /></ListItemIcon>
            <ListItemText primary={'充值'} />
          </ListItem>
        </List>
        }
        {type==='2'&&
       <List>
       <ListItem onClick={() => navigate('/verifyList')} button key={'审核列表'} >
         <ListItemIcon><UploadIcon /></ListItemIcon>
         <ListItemText primary={'审核列表'} />
       </ListItem>
     </List>
      }
        {type==='1' &&<>
        <Divider />
        <List>
          <ListItem onClick={() => navigate('/upload')} button key={'上传资源'} >
            <ListItemIcon><UploadIcon /></ListItemIcon>
            <ListItemText primary={'上传资源'} />
          </ListItem>
        </List></>}
        <Divider />
        <List>
          {isLogIn &&
            <ListItem onClick={() => stateModel.LOG_OUT()} button key={'注销'} >
              <ListItemIcon><ExitIcon /></ListItemIcon>
              <ListItemText primary={'注销'} />
            </ListItem>}
        </List>
      </Drawer>
    </div>
    <Dialog open={dOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">氪金</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请输入希望充值的金额
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="balance"
            label="金额"
            type="number"
            fullWidth
            onChange={handleBalanceChange}
            value={balance}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            取消
          </Button>
          <Button onClick={submit} color="primary">
            提交
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
