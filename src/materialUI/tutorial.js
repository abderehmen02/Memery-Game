import React , {useState} from 'react'
import { Button, Checkbox, Paper , Fab , FormControl, Radio ,FormControlLabel, Typography ,TextField , Grid , Container, RadioGroup , List ,ListItem , ListItemIcon , ListItemText ,Divider  , Drawer , Hidden } from '@material-ui/core'
import { makeStyles ,  ThemeProvider , createTheme } from '@material-ui/core/styles';
import PlayArrow from '@material-ui/icons/PlayArrow'
import AddIcon from '@material-ui/icons/Add';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import blue from '@material-ui/core/colors/blue';
import Card from './card';
import './materialUi.css'
const usesyles = makeStyles({
    btn : {
color: 'white' ,  
background: 'radial-gradient( circle farthest-corner at 7.2% 13.6%,  rgba(37,249,245,1) 0%, rgba(8,70,218,1) 90% )'
    }
})
const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});
function tutorial() {
const [drawer, setDrawer] = useState(false)
const styles = usesyles()
    return (
<div>
<div className='rank'>
{/* butttons */}  --------- +++ -----
<Button  startIcon={<PlayArrow/>} variant='contained' size='large' disabled={false} href='#' color='primary' >Click Here</Button>
{/* when we put disabled we can not click the button */}
<Button className={styles.btn} ></Button>
<Button startIcon={<AddIcon/>} variant='outlined' size='small' disabled={true} href='#' color='secondry' >Click Here</Button>
</div>
{/* checkboxes */} --------- +++ -----
<div className='rank'>
<Checkbox  onChange={()=>{console.log('this function will run when you clicked the check box ')}}
    disabled={false} color="primary"
    icon={<AddIcon/>}
    checkedIcon={<ThumbUpIcon/>}
></Checkbox>
<Checkbox checked={true
}></Checkbox>
{/* forms */}  --------- +++ -----
<FormControlLabel
control={<Checkbox ></Checkbox>  }
label="testing check box"
></FormControlLabel></div>
{/* textFields */}  --------- +++ -----
<div>
    <TextField  type='date' ></TextField>
    <TextField variant='outlined' size='small' value='kfdmsq'></TextField>
    <TextField type='time' lable=' the time'></TextField>
    <TextField type='email'></TextField>
</div>
{/* themes */}  --------- +++ -----
<div>
    <ThemeProvider theme={theme}>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
    </ThemeProvider>
</div>
{/* containers */}    --------- +++ -----
<Container maxWidth='sm'>
  {/* in max with there is sm  , md , lg and xd */}
  {/* xd is used for the mobile version */}
  <h1>this div is inside the container that i imported from material ui
</h1>
</Container>
<Grid container   >
<Grid item lg={4} md={5} sm={12} > <Paper  style={{height: 75 , width: '100%' , backgroundColor: 'black'}} >  this is a grid item</Paper></Grid>
<Grid item lg={4} md={5} sm={12} > <Paper style={{height: 75 , width: '100%' , backgroundColor: 'black'}} >  this is a grid item</Paper> </Grid>
<Grid item lg={4} md={5} sm={12} > <Paper style={{height: 75 , width: '100%' , backgroundColor: 'black'}} >  this is a grid item</Paper> </Grid>
</Grid>
{/* typography */} -------------------*--------------*---------*------*----
<div>
<Typography  variant='h3' color='primary' noWrap={true}>
this is a typography with the variant of h3 
and this text is longer
</Typography>
{/* radio button */} ------------------------------------------------------*----------*---*-*-
<Radio value='name'></Radio>
<Radio value='age'></Radio>
{/* we use the value to store the value in javascript */}
<RadioGroup>
  <Radio></Radio>
  <Radio></Radio>
</RadioGroup>
{/* in the radio groupe the user can only select one radio */}
<RadioGroup aria-label="gender" name="gender1"  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
    <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />
    <Card/>
  </RadioGroup></div>
  {/* lists and drawer */} ------------------------------------------------------*----------*---*-*-
  <div>
  <Button onClick={()=>{setDrawer(true)}} > display drawer </Button> 
   <Drawer anchor='left' open={drawer}  onClose={()=>{setDrawer(false)}}  >
     <List>
       <ListItem> <ListItemIcon> <ThumbUpIcon/> </ListItemIcon> <ListItemText>this is the list item text</ListItemText>  </ListItem> 
     </List>
   </Drawer>
  </div>
  {/* Hidden  */} -------------------*--------------**--------------*----------
  <div>
    <Hidden mdUp>
<Paper>this paper will be hiden if the screen is medium or greater tha medium</Paper>
    </Hidden>
  </div>
  {/* Floating Action Button(FBA) */} ----------+-+------------------+-++++++++++++++++++++++----------------------------+++++++++++
  <div>
    <Fab color='secondary' >
      <AddIcon/>
    </Fab>
  </div>
  </div>
    )
}

export default tutorial
