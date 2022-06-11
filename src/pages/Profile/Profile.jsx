import * as React from 'react';
import './Profile.scss'
import '../../index.css'
import coverImage from './assets/cover4.jpg'
import avatar from './assets/img.JPG';
import travel from './assets/travel.jpeg';
import health from './assets/health.jpg';
import facebook from './assets/icons8-facebook.svg'
import instagram from './assets/icons8-instagram.svg'
import linkedin from './assets/icons8-linkedin.svg'
import twitter from './assets/icons8-twitter.svg'
import ava1 from './assets/1.jpg'
import ava2 from './assets/2.jpg'
import ava3 from './assets/3.jpg'
import ava4 from './assets/4.jpg'

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

import FavoriteIcon from '@mui/icons-material/Favorite';

import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Profile() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div className='container'>
            <h2>Profile</h2>
            <div>
              <div className='cover-image'>
                <img className='cover-photo' src={coverImage} alt='' href='/'/>
                <div>
                  <img className='avatar' src={avatar} href='/' alt='avatar'/>
                  <div className='cover-profile'>
                    <h3>Tuyen Cat Van</h3>
                    <p>Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box className='box-menu'>
                    <TabList onChange={handleChange}>
                        <Tab label="Profile" value="1" />
                        <Tab label="Followers" value="2" />
                        <Tab label="Friends" value="3" />
                        <Tab label="Gallery" value="4" />
                    </TabList>
                    </Box>
                    <TabPanel value="1" className='profile-content j-between'>
                      <div className='profile-left'>
                        <Card variant="outlined" className='follower card-styled j-between'>
                          <div className='center follower-column'>
                            <h2>36,293</h2>
                            <p>Follower</p>
                          </div>
                          <div className='vl'></div>
                          <div className='center follower-column'>
                            <h2>16,923</h2>
                            <p>Following</p>
                          </div>
                        </Card>
                        <Card variant="outlined" className='card-styled about-content'>
                            <h2>About</h2>
                            <p className=''>I love strawberry refresher and Vietnamese cuisines...</p>
                            <p className='info'><LocationOnIcon className='icon'/> Live at Denver</p>
                            <p className='info'><EmailIcon className='icon'/> vancattuyen92@gmail.com</p>
                            <p className='info'><SchoolIcon className='icon'/> University of Colorado Boulder</p>
                            <p className='info'><LocalPhoneIcon className='icon'/> +1 (720) 579 7932</p>
                        </Card>
                        <Card className='card-styled social-media'>
                          <h2>Social</h2>
                          <div className='social'><img src={linkedin} alt=''/> linkedin.com/in/tuyenvan/</div>
                          <div className='social'><img src={twitter} alt=''/> twitter.com/cattuyen0909</div>
                          <div className='social'><img src={instagram} alt=''/> instagram.com/cattuyen0909</div>
                          <div className='social'><img src={facebook} alt=''/> facebook.com/cattuyen0909</div>    
                        </Card>
                      </div>
                      <div className='profile-right'>
                        <Card className='card-styled'>
                          <textarea className='textarea-post' placeholder='Share what you are thinking here...'/>
                          <div className='j-between'>
                            <div className='j-between'></div>
                            <button>Post</button>
                          </div>
                        </Card>
                        <Card className='card-styled post-content'>
                            <div className='j-between'>
                              <div className='ava-name flex'>
                                <div><img src={avatar} alt='' href='/'/></div>
                                <div className='name-info'>
                                  <strong>Tuyen Cat Van</strong>
                                  <p>20 May 2022</p>
                                </div>
                              </div>
                              <div><MoreVertIcon /></div>
                            </div>
                            <p className='caption'>"The way I see it, if you want the rainbow, you gotta put up with the rain." - Dolly Parton</p>
                            <div className='post-img'><img src={travel} alt='' href=''/></div>
                            <div className='j-between group'>
                              <div className='j-between groupA'>
                                <div><FavoriteIcon className='fav-icon'/></div>
                                <p style={{color:'gray',fontSize:'15px'}}>24</p>
                                <div>
                                  <AvatarGroup total={24}>
                                    <Avatar alt="Remy Sharp" src={ava1} />
                                    <Avatar alt="Travis Howard" src={ava2} />
                                    <Avatar alt="Agnes Walker" src={ava3} />
                                    <Avatar alt="Trevor Henderson" src={ava4} />
                                  </AvatarGroup>
                                </div>
                              </div>
                              <div className='j-between groupIcon'>
                                  <MarkChatReadIcon/>
                                  <NetworkPingIcon />
                                </div>
                            </div>
                            <br/>
                            <div className='comment j-between'>
                              <Avatar alt="Trevor Henderson" src={ava4} />
                              <div className='comment-card'>
                                <div className='j-between'>
                                  <strong>Katie Tran</strong>
                                  <p className='date'>22 May 2022</p>
                                </div>
                                <p className='comment-content'>Praesent venenatis metus at</p>
                              </div>
                            </div>
                            <br/>
                            <div className='comment j-between'>
                              <Avatar alt="Trevor Henderson" src={ava3} />
                              <div className='comment-card'>
                                <div className='j-between'>
                                  <strong>Harry Nguyen</strong>
                                  <p className='date'>22 May 2022</p>
                                </div>
                                <p className='comment-content'>Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.</p>
                              </div>
                            </div>
                        </Card>
                        <Card className='card-styled post-content'>
                            <div className='j-between'>
                              <div className='ava-name flex'>
                                <div><img src={avatar} alt='' href='/'/></div>
                                <div className='name-info'>
                                  <strong>Tuyen Cat Van</strong>
                                  <p>20 May 2022</p>
                                </div>
                              </div>
                              <div><MoreVertIcon /></div>
                            </div>
                            <p className='caption'>“Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.” - Buddha</p>
                            <div className='post-img'><img src={health} alt='' href=''/></div>
                            <div className='j-between group'>
                              <div className='j-between groupA'>
                                <div><FavoriteIcon className='fav-icon'/></div>
                                <p style={{color:'gray',fontSize:'15px'}}>24</p>
                                <div>
                                  <AvatarGroup total={24}>
                                    <Avatar alt="Remy Sharp" src={ava1} />
                                    <Avatar alt="Travis Howard" src={ava2} />
                                    <Avatar alt="Agnes Walker" src={ava3} />
                                    <Avatar alt="Trevor Henderson" src={ava4} />
                                  </AvatarGroup>
                                </div>
                              </div>
                              <div className='j-between groupIcon'>
                                  <MarkChatReadIcon/>
                                  <NetworkPingIcon />
                                </div>
                            </div>
                            <br/>
                            <div className='comment j-between'>
                              <Avatar alt="Trevor Henderson" src={ava4} />
                              <div className='comment-card'>
                                <div className='j-between'>
                                  <strong>Katie Tran</strong>
                                  <p className='date'>22 May 2022</p>
                                </div>
                                <p className='comment-content'>Praesent venenatis metus at</p>
                              </div>
                            </div>
                            <br/>
                            <div className='comment j-between'>
                              <Avatar alt="Trevor Henderson" src={ava3} />
                              <div className='comment-card'>
                                <div className='j-between'>
                                  <strong>Harry Nguyen</strong>
                                  <p className='date'>22 May 2022</p>
                                </div>
                                <p className='comment-content'>Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.</p>
                              </div>
                            </div>
                        </Card>
                      </div>
                    </TabPanel>

                    <TabPanel value="2"></TabPanel>
                    <TabPanel value="3"></TabPanel>
                    <TabPanel value="4"></TabPanel>
                </TabContext>
              </Box>
            </div>
        </div>
    )
}