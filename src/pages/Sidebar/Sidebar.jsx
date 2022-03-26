import React from 'react'
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-content'>
                <div className='sidebar-menu'>
                    <div className="sidebar-name">Application</div>
                    <div className="sidebar-group">
                        <div className=''><span className='icon'></span>Report</div>
                        <div className=''><span className='icon'></span>Playbackground</div>
                    </div>
                    <div className="sidebar-name">Dashboard</div>
                    <div className="sidebar-group">
                        <div className=''><span className='icon'></span>Product</div>
                        <div className=''><span className='icon'></span>Kanban</div>
                    </div>
                    <div className="sidebar-name">Users</div>
                    <div className="sidebar-group">
                        <div className=''><span className='icon'></span>Users</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Sidebar;