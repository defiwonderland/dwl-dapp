import { Route, Switch, Redirect } from "react-router-dom"
import Home from './pages/Home'
import Trade from "./pages/Trade"
import Funds from "./pages/Funds"
import Farms from "./pages/Farms"
import Pools from "./pages/Pools"
import Nfts from "./pages/Nfts"
import Launchpad from "./pages/Launchpad"
import Governance from "./pages/Governance"

function Routes(): JSX.Element {
    return (
        <Switch>
            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/trade" component={Trade} />
            <Route exact strict path="/funds" component={Funds} />
            <Route exact strict path="/farms" component={Farms} />
            <Route exact strict path="/pools" component={Pools} />
            <Route exact strict path="/nfts" component={Nfts} />
            <Route exact strict path="/launchpad" component={Launchpad} />
            <Route exact strict path="/governance" component={Governance} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes