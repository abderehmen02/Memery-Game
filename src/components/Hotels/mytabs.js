import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box' ;
import data from './data';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="hotelInfoTabs"
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
const Aminity = (item)=>{
    return    <div className="aminity" > <h2 className="aminityTitel" >{item.heading}</h2>
    <div className="itemsInternal" > {item.listItems.map(itemInternal =>{
        return <div className="itemInternal" ><h3> {itemInternal.heading} </h3> <div> {
itemInternal.listItems.map(item =>{
    return <div> {item} </div>
})            
} </div> </div>
    })} </div> </div>
}
  return (<div className="basicTabs" >{data && (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
    <div className="tabsBtn" >
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="basic info" {...a11yProps(0)} />
          <Tab label="amenities info" {...a11yProps(1)} />
        </Tabs>
   </div>   </Box>
      <TabPanel value={value} index={0}>
        <div className="Tab" >
<div className="tabLine" > <span className="label" > address: </span> { data.address.fullAddress } </div>
<div className="tabLine" > <span className="label" > postal code : </span> {data.address.postalCode}  </div>
<div className="tabLine" > <span className="label" > country: </span> {data.address.countryName} </div>
<div className="tabLine" > <span className="label" > price: </span> {data.featuredPrice.currentPrice.formatted} </div>
<div className="tabLine" > <span className="label" > currency: </span> {data.header.currencyCode}   </div>
</div>  </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="Tab" >
<h1 className="amenitiesTitle" >amenities</h1>
<div className="aminitiesSection" >
    {data.amenities.map(Aminity)}
</div></div>
      </TabPanel>
    </Box> )}</div>
  );
}