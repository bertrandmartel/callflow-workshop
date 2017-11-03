
import React, { Component } from 'react';
import Dialog, {
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import EditIcon from 'material-ui-icons/Edit';

import SequenceDiagram from 'react-sequence-diagram';

const styles = theme => ({
    title: {
        margin: '0 auto'
    },
    parent : {
      height: '100%',
      display: 'grid'
    },
    container: {
      margin: 'auto'
    }
});

class DiagramModalView extends Component {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        if (typeof this.props.onDialogClose === 'function') {
            this.props.onDialogClose();
        }
    };

    editTitle(){
      if (typeof this.props.onEditTitle === 'function') {
          this.props.onEditTitle();
      }
    }

    render() {
        const { classes } = this.props;

        const diagramOptions = {
          theme: this.props.diagramTheme
        };

        return <div>
                <Dialog
                    fullScreen
                    open={this.props.open}
                    onRequestClose={this.close}
                    >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                          <IconButton color="contrast" onClick={this.close} aria-label="Close">
                            <CloseIcon />
                          </IconButton>
                          <Typography type="title" color="inherit" className={classes.flex}>
                            Close
                          </Typography>
                          <Typography type="title" color="inherit" className={classes.title}>
                            {this.props.title || 'Sequence Diagram Draft'}<IconButton
                              color="contrast"
                              aria-label="edit title"
                              onClick={() => this.editTitle()}
                            >
                              <EditIcon />
                            </IconButton>
                          </Typography>
                        </Toolbar>
                    </AppBar>
                    <DialogTitle>{this.props.title || 'Sequence Diagram Draft'}</DialogTitle>
                    <DialogContent className={classes.parent}>
                      <div className={classes.container}>
                      <SequenceDiagram
                         input={this.props.diagramInputs}
                         options={diagramOptions}
                       />
                       </div>
                    </DialogContent>
                </Dialog>
            </div>
    }
}

DiagramModalView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DiagramModalView);
