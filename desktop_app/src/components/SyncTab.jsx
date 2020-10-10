import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types'
import { Grid, Button} from '@material-ui/core'; // don't know if all of these are nessarcy

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
    },
}));

function Sync(props) {

    // Stuff goes here

    const classes = useStyles()
    
    return(
        <div hidden={props.index !== props.value}>
         
         <Button variant="contained" color="primary" onClick={() => { alert('Will add real things later') }}>Sync Now </Button>

        </div>

    )

    //Display text of either 'your passwords are up to date' or 'your passwords are already up to date'

    //timer to sync every 5 mins
}

Sync.propTypes = {
    name: PropTypes.string
}

export default Sync