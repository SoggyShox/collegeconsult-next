import React, { useRef } from "react";
import clsx from "clsx";

import {
  makeStyles,
  ThemeProvider,
  createTheme
} from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

//Dialog
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//Form
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//Color
import blue from "@material-ui/core/colors/blue";

//Icons
import pickConsultant from "./images/pickConsultant.png"
import shareYourGoals from "./images/shareYourGoals.png"
import weConnect from "./images/weConnect.png"
import oneIcon from "./images/1.png"
import twoIcon from "./images/2.png"
import threeIcon from "./images/3.png"
import { any } from "prop-types";

const appTheme = createTheme({
  palette: {
    primary: {
      main: blue[400]
    },
    secondary: {
      main: "#f4FFFFFF"
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  app: {
    textAlign: "left"
  },
  container: {
    alignItems: "center"
  },
  appBar: {
    backgroundColor: "#282828",
    color: "#5DD1F1"
  },
  gridthing: {
    marginTop: theme.spacing(0)
  },
  paper: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  media: {
    height: 200
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  title: {
    textAlign: "center",
    fontWeight: 800
  },
  universityImage: {
    width: "100%",
    textAlign: "center"
  },
  instructionsImage: {
    height: "100px"
  },
  numberIcon: {
    height: "30px"
  },
  browseTitle: {
    fontWeight: 500
  },
  gridRestraint: {
    width: "70%"
  },
  browseTitleContainer: {
    marginTop: theme.spacing(9)
  },
  getStartedButton: {
    marginBottom: theme.spacing(4)
  },
  dialogTextField: {
    paddingTop: theme.spacing(4)
  }
}));

function GridPerson({person}: {person: any}) {
  const classes = useStyles();

  const [requester_firstname, setRequester_firstname] = React.useState("");
  const [requester_email, setRequester_email] = React.useState("");
  const [requester_subject, setRequester_subject] = React.useState("");
  const [requester_duration, setRequester_duration] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (name: string) => {
    console.log(name);
    setOpen(false);
  };

  const [connectButtonOpen, setConnectButtonOpen] = React.useState(false);

  const connectButtonHandleOpen = () => {
    setConnectButtonOpen(true);
  };

  const connectButtonHandleClose = () => {
    setConnectButtonOpen(false);
  };

  const timeButtonHandleChange = (e: any) => {
    setRequester_duration(e.target.value);
  };

  const func1 = async () => {
    const body = {
      requester_firstname: requester_firstname,
      consultant_firstname: person.name,
      requester_subject: requester_subject,
      requester_email: requester_email,
      requester_duration: requester_duration,
      school_name: person.school_name
    };

    await fetch("api/hello", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    });
  };

  return (
    ////////////////////////////////////////// GRID PERSON //////////////////////////////////////////
    <Grid item id={person.id} xs={12} sm={6} md={4}>
      <Card className={classes.root} variant="outlined">
        <CardActionArea onClick={handleClickOpen}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {person.name}
            </Typography>
            <Typography variant="body2" component="p">
              {person.description}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            height="350"
            image={person.profile_picture}
          />
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Connect
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Connect with {person.name}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            fullWidth
            value={requester_firstname}
            onChange={event => setRequester_firstname(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={requester_email}
            onChange={event => setRequester_email(event.target.value)}
          />
          <DialogContentText className={classes.dialogTextField}>
            What would you like to ask {person.name}? Here are some common
            questions to ask your consultant: What camps or extracurriculars did
            you take that helped you get into the college? What did you do to
            prepare to enter {person.school_name}?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="Subject"
            fullWidth
            value={requester_subject}
            onChange={event => setRequester_subject(event.target.value)}
          />

          <DialogContentText className={classes.dialogTextField}>
            How long would you like to meet with {person.name}? Our team will
            find the best time that works for both of your schedules.
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="duration">Duration of Session</InputLabel>
            <Select
              labelId="duration"
              id="duration"
              value={requester_duration}
              onChange={timeButtonHandleChange}
            >
              <MenuItem value={5}> 5 Minutes –– $5</MenuItem>
              <MenuItem value={15}>15 Minutes –– $10</MenuItem>
              <MenuItem value={30}>30 Minutes –– $15</MenuItem>
              <MenuItem value={60}>60 Minutes –– $25</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose("")} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose(person.name);
              connectButtonHandleOpen();
              func1();
            }}
            color="primary"
          >
            Connect
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={connectButtonOpen}
        onClose={connectButtonHandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We have recieved your request and will follow up shortly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={connectButtonHandleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

const Landing = () => {
  const classes = useStyles();
  const myRef = useRef<HTMLDivElement>(null);

  const [expanded1, setExpanded1] = React.useState(false);
  const handleExpandClick1 = () => {
    setExpanded1(!expanded1);
  };

  const [expanded2, setExpanded2] = React.useState(false);
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (name: string) => {
    console.log(name);
    setOpen(false);
  };
  const executeScroll = () => {
    if (myRef && myRef.current){
      myRef.current.scrollIntoView()
    }
  };

  const collegepeople = [
    {
      id: "jonathanshi",
      profile_picture:
        "https://d2gr0dan0snfpj.cloudfront.net/files/9roEHL0zGZ3ZvWhRh-original.png",
      name: "Jonathan Shi",
      school_name: "UCLA",
      description: "Junior at UCLA"
    },
    {
      id: "waylenlam",
      profile_picture:
        "https://d2gr0dan0snfpj.cloudfront.net/attachments/ke7AOoHUmQWrWA_Yj0DPm..jpg",
      name: "Waylen Lam",
      school_name: "UCLA",
      description: "Senior at UCLA"
    },
    {
      id: "vivianlam",
      name: "Vivian Lam",
      school_name: "Harvey Mudd",
      description: "Junior at Harvey Mudd"
    },
    {
      id: "fontannayee",
      name: "Fontanna Yee",
      school_name: "UCLA",
      description: "Junior at UCLA"
    },
    {
      id: "calebkang",
      name: "Caleb Kang",
      school_name: "UCSD",
      description: "Junior at UCSD"
    },
    {
      id: "kelalaniluong-kha",
      name: "Kelalani Luong-Kha",
      school_name: "UCLA",
      description: "Junior at UCLA"
    },
    {
      id: "alvinvo",
      name: "Alvin Vo",
      school_name: "UCLA",
      description: "Junior at UCLA"
    }
  ];
  return (
    ////////////////////////////////////////// LANDING PAGE //////////////////////////////////////////
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h4" align="center" className={classes.title}>
              Get the inside scoop on how to get into your dream college!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={4}
        >
          <Grid item container xs={4} justify="center" alignItems="center">
            <Grid item className={classes.gridRestraint}>
              <img
                className={classes.universityImage}
                src="https://www.drought.gov/sites/default/files/hero/partners/UCLA-logo-blue.png"
              />
            </Grid>
          </Grid>
          <Grid xs={4}>
            <img
              className={classes.universityImage}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWAmw_MoTwzhUhUJMBjJF23iASoR6Ljc7vMIpuQrcvrcDR-YVDQAr4j7DFBwKREwblIA&usqp=CAU"
            />
          </Grid>
          <Grid xs={4}>
            <img
              className={classes.universityImage}
              src="https://mdtoday.com/wp-content/uploads/2014/11/ucsd-logo-1.jpg"
            />
          </Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          pt={2}
          pb={6}
        >
          <Box>
            <Typography variant="h4" align="center">
              Just $5 per call!
            </Typography>
          </Box>

          <Box>
            <Typography variant="body1" align="center" color="textSecondary">
              calls starting at minimum of 5 minutes
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.getStartedButton}
        >
          <Grid item>
            <Button onClick={executeScroll} variant="contained" color="primary">
              Get Started!
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <img className={classes.numberIcon} src={oneIcon.src} />
            <Typography variant="h6">Pick a consultant</Typography>
            <img className={classes.instructionsImage} src={pickConsultant.src} />
            <Typography variant="body2" color="textSecondary">
              Choose from a wide array of consultants from UCLA, HMC, and more!
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <img className={classes.numberIcon} src={twoIcon.src} />

            <Typography variant="h6">Share your goals</Typography>

            <img className={classes.instructionsImage} src={shareYourGoals.src} />

            <Typography variant="body2" color="textSecondary">
              Share what topics you would like to discuss with your consultant!
            </Typography>
          </Grid>
          <Grid
            item
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            xs={12}
            sm={4}
          >
            <img className={classes.numberIcon} src={threeIcon.src} />

            <Typography variant="h6">We connect you</Typography>

            <img className={classes.instructionsImage} src={weConnect.src} />

            <Typography variant="body2" color="textSecondary">
              We will autobook you for a mutually beneficial time!
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.browseTitleContainer}
        >
          <Grid item>
            <Typography
              variant="h4"
              align="center"
              className={classes.browseTitle}
              ref={myRef}
            >
              Browse some top consultants
            </Typography>
          </Grid>
        </Grid>


        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
          spacing={4}
          className={classes.gridthing}
        >
          {collegepeople.map(person => (
            <GridPerson person={person} />
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Landing;
