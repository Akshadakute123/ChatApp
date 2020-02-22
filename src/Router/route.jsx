import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Startingpage from '../component/Startingpage';
import tableformat from '../component/tableformat';
import Dashboard from '../component/Dashboard';
import Socketjs from '../component/socketjs'
import nextpage from '../component/nextpage';
import Message from '../component/message';
import Messaging from '../component/messaging';
import Finalpage from '../component/Finalpage';
import Firstpage from '../component/Firstpage';

export default function Router() {
    return (

        <BrowserRouter>
            <Switch>
                
                    {/* <Route path={'/'} exact component={Socketjs} /> */}
                    {/* <Route path={'/register'} component={Register} /> */}
                    {/* <Route path={'/'} exact component={Startingpage} /> */}
                    {/* <Route path={'/tableformat'} exact component={tableformat} /> */}
                     {/* <Route path={'/nextpage'} exact component={nextpage} /> */}
                     {/* <Route path={'/message'} exact component={Message} /> */}
                     {/* <Route path={'/messaging'} exact component={Messaging} /> */}
                     <Route path={'/'} exact component={Firstpage} />
                     <Route path={'/finalpage'} exact component={Finalpage} />
                     
                     

                
            </Switch>
        </BrowserRouter>
    );
}