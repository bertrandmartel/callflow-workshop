
import React, { Component } from 'react';
import Dialog, {
    DialogContent,
    DialogActions,
    DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AppsIcon from 'material-ui-icons/Apps';
import InfoIcon from 'material-ui-icons/InfoOutline';
import CopyrightIcon from 'material-ui-icons/Copyright';
import CodeIcon from 'material-ui-icons/Code';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';

const styles = theme => ({
});

class InfoView extends Component {

    components = [
      {
        "name" : "create react app",
        "link" : "https://github.com/facebookincubator/create-react-app"
      },
      {
        "name" : "js sequence diagram",
        "link" : "https://bramp.github.io/js-sequence-diagrams/"
      },
      {
        "name" : "react-ace",
        "link" : "https://github.com/securingsincity/react-ace"
      },
      {
        "name" : "material-ui",
        "link" : "http://www.material-ui.com/#/"
      },
      {
        "name" : "react-sequence-diagram",
        "link" : "https://github.com/zfanta/react-sequence-diagram"
      },
      {
        "name" : "react-resizable-component",
        "link" : "https://github.com/wongherlung/react-resizable-component"
      },
      {
        "name" : "react-download-svg",
        "link" : "https://github.com/derrickpelletier/react-download-svg"
      }
    ];

    sourceCode = {
      "name" : "https://github.com/bertrandmartel/callflow-workshop",
      "link" : "https://github.com/bertrandmartel/callflow-workshop"
    };

    copyright = "The MIT License (MIT) Copyright (c) 2017 Bertrand Martel";

    version = 'CallFlow Workshop v' + process.env.REACT_APP_VERSION;

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        if (typeof this.props.onDialogClose === 'function') {
            this.props.onDialogClose();
        }
    };

    render() {
        return  <div>
                <Dialog open={this.props.open} onRequestClose={this.close}>
                    <DialogTitle>{"About"}</DialogTitle>
                    <DialogContent>
                        <ListItem>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Info" secondary={this.version} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CopyrightIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Copyright" secondary={this.copyright} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CodeIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Source code" secondary={<a href={this.sourceCode.link} target="_blank">{this.sourceCode.name}</a>} />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <AppsIcon />
                          </ListItemIcon>
                          <ListItemText inset primary="Open Source components" />
                        </ListItem>
                        <Collapse in={true} transitionDuration="auto" unmountOnExit>
                            {this.components.map(n => {
                                return (
                                    <ListItem key={n.name} >
                                      <ListItemText inset primary={<a href={n.link} target="_blank">{n.name}</a>} />
                                    </ListItem>
                                  );
                                })
                            }
                        </Collapse>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.close()}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
    }
}

InfoView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoView);
