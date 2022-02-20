import { React, Component } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

class MTSCard extends Component {
    render() {
        const { info } = this.props;
        return (
            <Card style={{margin: 30, backgroundColor: 'lightblue'}}>
                <CardActionArea >
                    <CardMedia 
                        component="img"
                        alt="img"
                        height="140"
                        image={info.img}
                        title={info.title}
                    />
                    <CardContent>
                        <Typography variant="body1" color="textSecondary" component="p">
                            {info.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default MTSCard;