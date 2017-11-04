import './css/App.css';

//react
import React, { Component } from 'react';

import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuData from './component/MenuData.js';
import DiagramModalView from './component/DiagramModal.js';
import InfoView from './component/InfoView.js';
import EditView from './component/EditView.js';
import SessionContainer from './component/SessionContainer.js';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import BuildIcon from 'material-ui-icons/Build';
import Typography from 'material-ui/Typography';
import * as Storage from './storage/Storage.js';
import * as Constant from './constant/Constant.js';

// other react components
import TopNavbar from './component/TopNavbar.js';

//import utils
import * as Utils from './utils/Utils.js';

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        type: 'light', // Switching the dark mode on is a single property value change.
    },
});

const diagramThemeList = ['simple', 'hand'];

const aceThemeList = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
];

aceThemeList.forEach((theme) => {
  require(`brace/theme/${theme}`)
})

const styles = theme => ({
    root: {
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        zIndex: theme.zIndex.navDrawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflow: 'hidden',
        border: '0px !important',
        height: '100%',
    },
    drawerPaperClose: {
        width: 60,
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
        height: '100%',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    dockedDrawer: {
        height: '100%',
    },
    list: {
        border: 0,
        marginTop: 24,
        paddingTop: 0,
        height: 'calc(100% - 100px)',
        overflowY: 'overlay'
        //height:(window.innerHeight-64)
    },
    drawerBorder: {
        borderRight: '1px solid #E0E0E0',
        height: '100%'
    },
    listContainer: {
        height: '100%',
    },
    titleCentered: {
        margin: '0 auto'
    },
    iconHeadline: {
        marginLeft: 10
    }
});

/**
 * Main app component
 */
class App extends Component {

    state = {
        ready: false,
        openUrlDialog: false,
        drawerOpen: false,
        diagramInputs: '',
        diagramTheme: 'simple',
        title: '',
        openModal:false,
        openInfo:false,
        openEdit:false,
        configView: 'vertical',
        download: false,
        annotations: []
    };

    constructor() {
        super();
        this.share = this.share.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.onDiagramThemeChange = this.onDiagramThemeChange.bind(this);
        this.onAceThemeChange = this.onAceThemeChange.bind(this);
        this.onSetView = this.onSetView.bind(this);
        this.onFullscreenDiagram = this.onFullscreenDiagram.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onShowInfo = this.onShowInfo.bind(this);
        this.setTitle = this.setTitle.bind(this);
        this.onEditTitle = this.onEditTitle.bind(this);
        this.onDownload = this.onDownload.bind(this);
        this.onDownloadReset = this.onDownloadReset.bind(this);
        this.onDiagramError = this.onDiagramError.bind(this);
        this.initStorage();
    }

    /**
     * Initliaze data from storage.
     */
    initStorage() {
      this.diagramInput = Storage.getDiagramInput();
      this.diagramTheme = Storage.getDiagramTheme();
      this.aceTheme = Storage.getAceTheme();
      this.configView = Storage.getConfigView();
      this.windowSizeOption = Storage.getWindowSizeOptions();
      this.title = Storage.getTitle();
    }

    /**
     * Parse url parameter in case it is a shared page.
     */
    parseUrlParams() {
        var query = Utils.getQueryParams(document.location.search);

        if (query.diagram_input) {
            Storage.setDiagramInput(atob(query.diagram_input));
            this.diagramInput = atob(query.diagram_input);
        }
        if (query.diagram_theme) {
            Storage.setDiagramTheme(query.diagram_theme);
            this.diagramTheme = query.diagram_theme;
        }
        if (query.ace_theme) {
            Storage.setAceTheme(query.ace_theme);
            this.aceTheme = query.ace_theme;
        }
        if (query.config_view) {
            Storage.setConfigView(query.config_view);
            this.configView = query.config_view;
        }
        if (query.window_size_options) {
            Storage.setWindowSizeOption(JSON.parse(query.window_size_options));
            this.windowSizeOption = JSON.parse(query.window_size_options);
        }
        if (query.title) {
            Storage.setTitle(query.title);
            this.title = query.title;
        }
        return null;
    }

    /**
     * On mount check the mode ("live" or "demo") and refresh the data according to this
     */
    componentDidMount() {
        this.parseUrlParams();
        //var options = this.parseUrlParams();
        //this.refresh("create", false, options);
        this.setState({
          diagramInputs:this.diagramInput,
          diagramTheme: this.diagramTheme,
          aceTheme: this.aceTheme,
          configView: this.configView,
          windowSizeOption: this.windowSizeOption,
          title: this.title
        });
    }

    /**
     * Share the current page with all parameters
     */
    share() {
        var url = window.location.href + "?";

        url += "diagram_input=" + encodeURIComponent(btoa(Storage.getDiagramInput())) + "&";
        url += "diagram_theme=" + encodeURIComponent(Storage.getDiagramTheme()) + "&";
        url += "ace_theme=" + encodeURIComponent(Storage.getAceTheme()) + "&";
        url += "config_view=" + encodeURIComponent(Storage.getConfigView()) + "&";
        url += "window_size_options=" + encodeURIComponent(JSON.stringify(Storage.getWindowSizeOptions())) + "&";
        url += "title=" + encodeURIComponent(Storage.getTitle());

        //https://stackoverflow.com/a/6055620/2614364
        window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
    }

    handleDrawerOpen() {
        this.setState({ drawerOpen: true });
    }

    handleDrawerClose() {
        this.setState({ drawerOpen: false });
    }

    onEditChange(value) {
      Storage.setDiagramInput(value);
      this.setState({
        diagramInputs: value,
        annotations: []
      });
    }

    onDiagramThemeChange(theme){
      Storage.setDiagramTheme(theme);
      this.setState({
        diagramTheme: theme
      });
    }

    onAceThemeChange(theme){
      Storage.setAceTheme(theme);
      this.setState({
        aceTheme: theme
      });
    }

    onSetView(type){
      Storage.setConfigView(type);
      this.setState({
        configView: type
      });
    }

    onFullscreenDiagram(){
        this.setState({
          openModal: true
        });
    }

    closeDialog(){
      this.setState({
        openModal: false,
        openInfo: false,
        openEdit: false
      });
    }

    onResize(type, width, height){
      var windowSizeOption = this.state.windowSizeOption;

      if (type === 'vertical'){
        windowSizeOption.vertical.width = width;
      }
      else if (type === 'horizontal'){
        windowSizeOption.horizontal.height = height;
      }
      Storage.setWindowSizeOption(windowSizeOption);
      this.setState({
        windowSizeOption: windowSizeOption
      });
    }

    onShowInfo(){
      this.setState({
        openInfo: true
      });
    }

    onEditTitle(){
      this.setState({
        openEdit: true
      });
    }

    onDownload() {
      this.setState({
        download: true
      });
    }

    onDownloadReset() {
      this.setState({
        download: false
      });
    }

    setTitle(title){
      Storage.setTitle(title);
      this.setState({
        title: title
      });
    }

    onDiagramError(annotations){
      this.setState({
        annotations: annotations
      });
    }

    render() {
        const aceTheme = (this.state.aceTheme)?this.state.aceTheme:Constant.defaultAceTheme;
        const configView = (this.state.configView)?this.state.configView:Constant.defaultConfigView;
        const { classes } = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <div className={classes.appFrame}>

                        <TopNavbar mode={this.state.mode}
                                   onShare={this.share}
                                   drawerOpen={this.state.drawerOpen}
                                   onSetView={this.onSetView}
                                   onFullscreenDiagram={this.onFullscreenDiagram}
                                   onHandleDrawerOpen={this.handleDrawerOpen}
                                   onShowInfo={this.onShowInfo}
                                   onEditTitle={this.onEditTitle}
                                   onDownload={this.onDownload}
                                   title={this.state.title}
                                   className={classNames(classes.appBar, this.state.drawerOpen && classes.appBarShift)}/>

                        <div className={classes.drawerBorder}>
                            <Drawer
                              type="permanent"
                              classes={{
                                  paper: classNames(classes.drawerPaper, !this.state.drawerOpen && classes.drawerPaperClose),
                                }}
                              className={classes.dockedDrawer}
                              open={this.state.drawerOpen}
                            >
                              <div className={classes.drawerInner}>
                                    <div className={classes.drawerHeader}>

                                        <BuildIcon className={classes.iconHeadline}/>
                                        <Typography type="headline" color="inherit" className={classes.titleCentered}>
                                            {'Style'}
                                        </Typography>

                                        <IconButton onClick={this.handleDrawerClose}>
                                          <ChevronLeftIcon />
                                        </IconButton>
                                    </div>
                                    <Divider />
                                    <div className={classes.listContainer}>
                                        <List className={classes.list}>
                                            <MenuData
                                                theme={theme}
                                                diagramThemes={diagramThemeList}
                                                aceThemes={aceThemeList}
                                                onDiagramThemeChange={this.onDiagramThemeChange}
                                                onAceThemeChange={this.onAceThemeChange}
                                                selectedDiagramTheme={this.state.diagramTheme}
                                                selectedAceTheme={aceTheme}
                                                drawerOpen={this.state.drawerOpen}
                                                onHandleDrawerOpen={this.handleDrawerOpen}
                                                />
                                        </List>
                                    </div>
                                </div>
                            </Drawer>
                        </div>
                        <SessionContainer
                          onDownloadReset={this.onDownloadReset}
                          download={this.state.download}
                          type={configView}
                          aceTheme={aceTheme}
                          annotations={this.state.annotations}
                          diagramInputs={this.state.diagramInputs}
                          diagramTheme={this.state.diagramTheme}
                          onEditChange={this.onEditChange}
                          onError={this.onDiagramError}
                          onResize={this.onResize}
                          diagramTitle={this.state.title}
                          windowSizeOption={this.state.windowSizeOption}
                        />
                        <DiagramModalView
                            diagramInputs={this.state.diagramInputs}
                            diagramTheme={this.state.diagramTheme}
                            onDialogClose={this.closeDialog}
                            title={this.state.title}
                            onEditTitle={this.onEditTitle}
                            open={this.state.openModal}
                          />
                        <InfoView
                              onDialogClose={this.closeDialog}
                              open={this.state.openInfo}
                        />
                        <EditView
                              onDialogClose={this.closeDialog}
                              open={this.state.openEdit}
                              title={this.state.title}
                              onSetTitle={this.setTitle}
                        />
                    </div>
                </div>
             </MuiThemeProvider>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
