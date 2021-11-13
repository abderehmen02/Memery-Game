import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box' ;
import data from './data';
import './index.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function BasicTabs({data}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
const reviewComponent = (item)=>{
return <div className="reviewItem" >
  <h3>{item.recommendedBy}</h3><p>{item.summary}</p>
</div>
}
console.log('this is the data reiews')
console.log(data.reviews)
  return (<div>{data.photos && (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <div className="tabsBtn" >
   <div className="content" > 
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Photos" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs></div></div>
      </Box>
      <TabPanel value={value} index={0}>
        <div className='images' >
          {data.photos.map((item)=>{
          console.log(item)
          console.log('this is the item which is above')  
            return <div className='image' 
          style={{backgroundImage: `url(${item.mainUrl})`}}
           >
          </div>})}
   </div>   </TabPanel>
      <TabPanel value={value} index={1}>
<div className="reviewnings" >
{data.reviews &&  data.reviews.groupReview.map(item =>{
return <div className="reviewCategory" > <h2>{item.id}</h2>
{item.reviews.map(reviewComponent)}
</div>
})} 
        </div>
      </TabPanel>
    </Box> )}</div>
  );
}