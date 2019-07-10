import { IResource } from '@edu'
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button'
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {acceptResource, refuseResource} from '@/services/verify'

const styles = (theme: any) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

export interface Props extends WithStyles<typeof styles> { }
interface State{
  expanded: boolean
}

class RecipeReviewCard extends React.Component<Props&{data: IResource,callback:()=>void}, State> {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  accept = async () => {
    const res = await acceptResource(this.props.data.id)
    res.map((r:any)=>{
      this.props.callback()
    })
  }

  refuse = async () => {
    const res = await refuseResource(this.props.data.id)
    res.map((r:any)=>{
      this.props.callback()
    })
  }

  render() {
    const { classes, data } = this.props;

    return (
      <Card className={classes.card} style={{marginTop: '2rem', width: '100%'}}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={data.fileTitle}
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={data.fileImage}
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
          {data.fileDescription}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={()=>{
            const r = confirm('确定要通过审核吗？')
            if(r){
              this.accept()
            }
            }} variant="contained" color="primary">通过</Button>
          <Button onClick={()=>{
            const r = confirm('确定要拒绝审核吗？')
            if(r){
              this.refuse()
            }
            }} variant="contained" color="secondary">拒绝</Button>
        </CardActions>
      </Card>
    );
  }
}

// RecipeReviewCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(RecipeReviewCard);
