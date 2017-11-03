//react
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import PanoramaIcon from 'material-ui-icons/Panorama';
import InfoIcon from 'material-ui-icons/InfoOutline';
import FullscreenIcon from 'material-ui-icons/Fullscreen';
import ViewHorizontal from 'material-ui-icons/ViewStream';
import LinkIcon from 'material-ui-icons/Link';
import ViewColumn from 'material-ui-icons/ViewColumn';
import Share from 'material-ui-icons/Share';
import Download from 'material-ui-icons/FileDownload';
import EditIcon from 'material-ui-icons/Edit';
import classNames from 'classnames';
import Tooltip from 'material-ui/Tooltip';

const styles = theme => ({
    flexOpen: {
        flex: 1,
        marginLeft: 25
    },
    flexClosed: {
        flex: 1,
        marginLeft: 11
    },
    menuButton: {
        marginLeft: 6,
        marginRight: 20,
    },
    button: {
        marginRight: 10
    },
    lastButton: {
        marginRight: 20
    },
    chip: {
        marginRight: 10,
        backgroundColor: 'white'
    },
    hide: {
        display: 'none',
    },
});

/**
 * The navigation bar
 */
class TopNavbar extends Component {

    constructor(props) {
        super(props);
        this.urlSettings = this.urlSettings.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.setView = this.setView.bind(this);
        this.fullscreenDiagram = this.fullscreenDiagram.bind(this);
    }

    /**
     * Open URL settings modal
     */
    urlSettings() {
        if (typeof this.props.onOpenUrlSettings === 'function') {
            this.props.onOpenUrlSettings();
        }
    }

    /**
     * Open Global settings modal
     */
    globalSettings() {
        if (typeof this.props.onOpenSettings === 'function') {
            this.props.onOpenSettings();
        }
    }

    handleDrawerOpen() {
        if (typeof this.props.onHandleDrawerOpen === 'function') {
            this.props.onHandleDrawerOpen();
        }
    }

    /**
     * https://stackoverflow.com/a/32100295/2614364
     */
    fullscreen() {
        // if already full screen; exit
        // else go fullscreen
        if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        ) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        } else {
            var element = document.body;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }
    }

    /**
     * Share this page
     */
    share() {
        if (typeof this.props.onShare === 'function') {
            this.props.onShare();
        }
    }

    setView(type){
        if (typeof this.props.onSetView === 'function') {
            this.props.onSetView(type);
        }
    }

    fullscreenDiagram(){
        if (typeof this.props.onFullscreenDiagram === 'function') {
            this.props.onFullscreenDiagram();
        }
    }

    showInfo(){
      if (typeof this.props.onShowInfo === 'function') {
          this.props.onShowInfo();
      }
    }

    editTitle(){
      if (typeof this.props.onEditTitle === 'function') {
          this.props.onEditTitle();
      }
    }

    download() {
      if (typeof this.props.onDownload === 'function') {
          this.props.onDownload();
      }
    }

    render() {
        const { classes } = this.props;

        return (<AppBar position="static" className={this.props.className}>
                    <Toolbar disableGutters>
                      <IconButton
                        color="contrast"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        className={classNames(classes.menuButton, this.props.drawerOpen && classes.hide)}
                      >
                        <MenuIcon />
                      </IconButton>

                      <Typography type="headline" color="inherit" className={this.props.drawerOpen ? classes.flexOpen : classes.flexClosed}>
                        {this.props.title || 'Sequence Diagram Draft'}
                        <IconButton
                          color="contrast"
                          aria-label="edit title"
                          onClick={() => this.editTitle()}
                        >
                          <EditIcon />
                        </IconButton>
                      </Typography>

                      <Tooltip enterDelay={500} disableTriggerFocus title="horizontal window" placement="bottom">
                          <IconButton onClick={() => this.setView("horizontal")} className={classes.button} color="contrast" aria-label="horizontal window">
                            <ViewHorizontal />
                          </IconButton>
                      </Tooltip>

                      <Tooltip enterDelay={500} disableTriggerFocus title="column window" placement="bottom">
                          <IconButton onClick={() => this.setView("vertical")} className={classes.button} color="contrast" aria-label="column window">
                            <ViewColumn />
                          </IconButton>
                      </Tooltip>

                      <Tooltip enterDelay={500} disableTriggerFocus title="fullscreen diagram" placement="bottom">
                          <IconButton onClick={() => this.fullscreenDiagram()} className={classes.button} color="contrast" aria-label="fullscreen diagram">
                            <PanoramaIcon />
                          </IconButton>
                      </Tooltip>

                      <Tooltip enterDelay={500} disableTriggerFocus title="share this page" placement="bottom">
                          <IconButton onClick={() => this.share()} className={classes.button} color="contrast" aria-label="share">
                            <Share />
                          </IconButton>
                      </Tooltip>

                      <Tooltip enterDelay={500} disableTriggerFocus title="download" placement="bottom">
                          <IconButton onClick={() => this.download()} className={classes.button} color="contrast" aria-label="download">
                            <Download />
                          </IconButton>
                      </Tooltip>

                      <Tooltip enterDelay={500}  disableTriggerFocus title="fullscreen" placement="bottom">
                          <IconButton onClick={() => this.fullscreen()} className={classes.button} color="contrast" aria-label="fullscreen">
                            <FullscreenIcon />
                          </IconButton>
                      </Tooltip>
                      <Tooltip enterDelay={500}  disableTriggerFocus title="clear url param" placement="bottom">
                          <IconButton href={window.location.href.split('?')[0]} className={classes.button} color="contrast" aria-label="clear url">
                            <LinkIcon />
                          </IconButton>
                      </Tooltip>
                      <Tooltip enterDelay={500}  disableTriggerFocus title="information" placement="bottom">
                          <IconButton onClick={() => this.showInfo()} color="contrast" className={classes.lastButton} aria-label="information">
                            <InfoIcon />
                          </IconButton>
                      </Tooltip>
                    </Toolbar>
                  </AppBar>)
    }
}

TopNavbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopNavbar);
