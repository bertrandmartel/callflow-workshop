// This file is shared across the demos.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PaletteIcon from 'material-ui-icons/Palette';
import EditorIcon from 'material-ui-icons/BorderColor';

import classNames from 'classnames';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';

const styles = theme => ({
    nested: {
         paddingLeft: 20
    },
    unselected: {
        opacity: 0.4
    }
});

class MenuData extends React.Component {

    state = {
        diagramThemeOpen:false,
        aceThemeOpen: false
    };

    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleDiagramThemeItemClick = this.handleDiagramThemeItemClick.bind(this);
        this.handleDiagramThemeClick = this.handleDiagramThemeClick.bind(this);
        this.handleAceThemeClick = this.handleAceThemeClick.bind(this);
        this.handleAceThemeItemClick = this.handleAceThemeItemClick.bind(this);
    }

    componentDidMount() {
    }

    handleMenuClick() {
        if (!this.props.drawerOpen) {
            if (typeof this.props.onHandleDrawerOpen === 'function') {
                this.props.onHandleDrawerOpen();
            }
        }
    }

    handleDiagramThemeItemClick(theme) {
        if (typeof this.props.onDiagramThemeChange === 'function') {
            this.setState({ diagramThemeOpen: false });
            this.props.onDiagramThemeChange(theme);
        }
    }

    handleDiagramThemeClick() {
        this.handleMenuClick();
        this.setState({ diagramThemeOpen: !this.state.diagramThemeOpen });
    }

    handleAceThemeClick(){
      this.handleMenuClick();
      this.setState({ aceThemeOpen: !this.state.aceThemeOpen });
    }

    handleAceThemeItemClick(theme){
      if (typeof this.props.onAceThemeChange === 'function') {
          this.setState({ aceThemeOpen: false });
          this.props.onAceThemeChange(theme);
      }
    }

    render() {
        const classes = this.props.classes;
        return (
            <div>
            <ListItem button onClick={this.handleDiagramThemeClick}>
              <ListItemIcon>
                <PaletteIcon />
              </ListItemIcon>
              <ListItemText inset primary="Diagram theme" secondary={this.props.selectedDiagramTheme ? this.props.selectedDiagramTheme : ""}/>
              {(this.props.drawerOpen && this.state.diagramThemeOpen) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.props.drawerOpen && this.state.diagramThemeOpen} transitionDuration="auto" unmountOnExit>
                {this.props.diagramThemes.map(n => {
                            return (
                                <ListItem
                                  key={n}
                                  onClick={this.handleDiagramThemeItemClick.bind(this, n)}
                                  button className={n === this.props.selectedDiagramTheme ? classes.nested : classNames(classes.nested, classes.unselected) } >
                                  <ListItemText inset primary={n} />
                                </ListItem>
                              );
                            })
                }
            </Collapse>

            <ListItem button onClick={this.handleAceThemeClick}>
              <ListItemIcon>
                <EditorIcon />
              </ListItemIcon>
              <ListItemText inset primary="Editor theme" secondary={this.props.selectedAceTheme ? this.props.selectedAceTheme : ""}/>
              {(this.props.drawerOpen && this.state.aceThemeOpen) ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.props.drawerOpen && this.state.aceThemeOpen} transitionDuration="auto" unmountOnExit>
                {this.props.aceThemes.map(n => {
                            return (
                                <ListItem
                                  key={n}
                                  onClick={this.handleAceThemeItemClick.bind(this, n)}
                                  button className={n === this.props.selectedAceTheme ? classes.nested : classNames(classes.nested, classes.unselected) } >
                                  <ListItemText inset primary={n} />
                                </ListItem>
                              );
                            })
                }
            </Collapse>
      </div>
        );
    }
}

MenuData.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuData);
