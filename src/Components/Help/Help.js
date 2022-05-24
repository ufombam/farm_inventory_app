import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Help.scss';

const Help = () => {
    return( 
        <div className='help_body'>
            <div className='sidebar'>
                <Logo height={60} />
                <a href="#Dashboard">Dashboard</a><br />
                <a href='#finance'>Finance</a><br />
                <a href='#record'>Record</a><br />
                <a href='#settings'>Settings</a><br />
                <Link to={'/dashboard'}><button>Go back to the app</button></Link>
            </div>
            <div className='content'>
                <h2>USER'S GUIDE</h2>
                <p>This help page gives you a complete guide on the usage of this app, after going through this page, you should be able to navigate your way easily on this app. The first thing to do on this app is to get familiar with all the menus. The second most important thing to do is set the rate for the various egg sizes from the <Link to="/settings">settings page</Link> and lastly register all your customers into the system to easily track their debt status. This customer registration can be done from the <Link to='/record'>record page.</Link></p>
                <h3 id='Dashboard'>DASHBOARD</h3>
                    <p><strong>Dashboard</strong> - Here you find useful analytics about your business, news, weather report, and a fancy watch to keep time.</p>
                <h3 id='finance'>FINANCE</h3>
                    <p><strong>Finance Menu</strong> - This place gives you access to manage your daily business procedures. Those pertaining to money, in this case, recording egg sales. You also can see on the top right a three boxes displaying.</p>
                    <ul>
                        <p>
                            <li><strong>The rate per create for different sizes of crate:</strong> - You should set this from the settings Menu. you want to make sure this value is correct at all times because its value is used to compute the egg sales reports on the app.</li>
                        </p>
                        <p>
                            <li><strong>The running profit:</strong> - This is a monthly value and it will reset itself at the end of every month to zero. if you find any different value like NaN, you can ignore it or record zero (0) against your egg sales for the day.</li>
                        </p>
                        <p>
                            <li><strong>Running debt:</strong> - This value is generated from the debts owed by customers. The value is shown as a positive number but it isn't. so you have to keep in mind that this value affects the running profit at all times. To clear up the confusion, this value will always be taken out from the net sales.Hence the running profit you see will be different from the net sales until all debts are cleared. Its figure will also rollover into the next month if there are outstanding debts.</li>
                        </p>
                    </ul>
                    <p><strong>Record sales</strong> - Here you input every sale you make for the different sizes of eggs accordingly. (please always use the crates as a unit of recording at all times as the "eggs" unit will likely produce some inconsistencies in the overall record). Please take NOTE that you must record the same value for the number of crates sold into the <Link to='/record'>Record menu</Link> of the app. They are computed differently.</p>
                    <p>The <strong>TRANSACTIONS</strong> section, displays income and expenses and calculates the net profit at all times for any particular month.</p>
                <h3 id='record'>RECORD MENU</h3>
                    <p>This page has three tabs:</p>
                    <p><strong>New Record tab:</strong> Here you record like in an inventory the daily activities where the need arises. You have to at all times update the egg inventory on this page alongside the egg sales on the finance page to keep accurate records ie for damaged and the good eggs(egg count). It also contains several other inputs like -</p>
                    <ul>
                        <p>
                            <li><strong>Feed input:</strong>  Here, you input the daily usage of the feed. Whenever the farm makes a new procurement, a fresh entry must be created by filling in all the fields. If the farm hasn't used from the newly procured bags of feed, the "used" field should be left blank, if not the amount used can also be updated immediately. If there's a new usage afterwards, you only need to update the "used" field and click submit. The stock will be updated in the database and on the <Link to='/record'>records page.</Link> You can always see the amount of feed left in stock from the "view records tab" of this same page.</li>
                        </p>
                        <p>
                            <li><strong>bird input:</strong>  For this input, you must ensure care while manipulating the information you key in. First you want to record the number of birds you have already purchased or owned. Afterwards, you can make changed to the stored information <em>(for death or culling)</em>. If you want to record a new "culling" or "death", leave the "New Birds Purchased" and "store" fields  blank, only input either the figure culled or dead and submit. Each record is intentionally designed to be recorded to a new entry on the database to enable the farm operator monitor the lifetime of the birds. Every information about the bird is calculated from the input made here. You can see the record in the "View Records" tab of this same page.</li>
                        </p>
                        <p>
                            <li><strong>customer input</strong> - You have two default options: select name and add new customer. you should use the add new customer to add a new customer to the database. it will display a new field for that purpose. In the case of recording customer debt, input a positive number. But if the customer pays up, please record that using a negative number as the database is set to increment any value gotten from this input. <br />
                            Have it in mind that you should always record the quantity of eggs bought by your customers, this will help you keep good records. So whenever a customer makes a new purchase, you should record it against her name. You can view the complete record on the "view record tab" on this same page.
                            </li>
                        </p>
                        <p>
                            <li><strong>compost:</strong> You are to record every profit made from the sales of compost here. It will be updated on the <Link to='/dashboard'>dashboard</Link> and the <Link to='/finance'>finance</Link> page.</li>
                        </p>
                        <p>
                            <li><strong>miscellaneous</strong> - Record every other expense here.</li>
                        </p>
                    </ul>
                    <p>
                    <strong>View Records tab:</strong> All the inputs recorded can be found on this page as a table. No print functionality has been added to this app currently for printing out table directly, but you can use the browsers default print feature to print any information you need.</p>
                    <p><strong>Summary tab:</strong> This is a cumulative summary of every record. It is displayed correctly for every entry on this app.</p>
                <h3 id='settings'>SETTINGS</h3>
                    <p>This page give you the permission to set the rate for the different crates sizes. The second option on this page allows you to delete a customers information completely from the database.</p> <p><strong>Note that this action is irreversible and final. Be careful while using this feature.</strong></p>
            </div>
        </div>
    );
}

export default Help;