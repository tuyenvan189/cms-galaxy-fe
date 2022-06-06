import React from 'react';
import './Dashboard.scss'
import '../../index.css'
import BarChart from './Chart/barChart';
import PieChart from './Chart/pieChart';
import Card from '@mui/material/Card';
import AdbIcon from '@mui/icons-material/Adb';
import AppleIcon from '@mui/icons-material/Apple';
import ExtensionIcon from '@mui/icons-material/Extension';
import PestControlIcon from '@mui/icons-material/PestControl';


export default function Dashboard() {
  
  return (
    <div className='dashboard container'>
      <h2 style={{color:'#049372'}}>Hi, Welcome back !</h2>
      <div className='dashboard-summary j-between'>
        <Card style={{borderRadius:'10px'}}>
          <div className='card-content green'>
            <div className='icon'><AdbIcon style={{borderRadius:'50%', border:'1px solid #34a866', 
              fontSize:'25px', width:'40px', height:'auto'}}/></div>
            <h1>714k</h1>
            <p>Weekly Sales</p>
          </div>
        </Card>
        <Card style={{borderRadius:'10px'}}>
          <div className='card-content blue'>
            <div className='icon'><AppleIcon  style={{borderRadius:'50%', border:'1px solid#156dac', 
              fontSize:'25px', width:'40px', height:'auto'}}/></div>
            <h1>1.35m</h1>
            <p>New Users</p>
          </div>
        </Card>
        <Card style={{borderRadius:'10px'}}>
          <div className='card-content yellow'>
            <div className='icon'><ExtensionIcon  style={{borderRadius:'50%', border:'1px solid #c49f1c', 
              fontSize:'25px', width:'40px', height:'auto'}}/></div>
            <h1>1.72m</h1>
            <p>Item Orders</p>
          </div>
        </Card>
        <Card style={{borderRadius:'10px'}}>
          <div className='card-content pink'>
            <div className='icon'><PestControlIcon  style={{borderRadius:'50%', border:'1px solid #e72d55', 
              fontSize:'25px', width:'40px', height:'auto'}}/></div>
            <h1>234</h1>
            <p>Bug Reports</p>
          </div>
        </Card>
      </div>
      <div className='j-between'>
        <div style={{width:'73%'}}><BarChart style={{width:'100%'}}/> </div>
        <div style={{width:'25%'}}><PieChart style={{width:'100%'}}/></div>
      </div>
    </div>
  );
}