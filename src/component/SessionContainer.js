import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SequenceDiagram from 'react-sequence-diagram';
import {
  Wrapper
} from 'react-download-svg';
import ResizableComponent from 'react-resizable-component';
import AceEditor from 'react-ace';

import 'brace/mode/java';

const styles = theme => ({
  content: {
      backgroundColor: theme.palette.background.default,
      width: '100%',
      padding: theme.spacing.unit * 3,
      height: 'calc(100% - 100px)',
      maxHeight: '100%',
      marginTop: 56,
      [theme.breakpoints.up('sm')]: {
          marginTop: 64,
      },
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
  },
  verticalContainer: {
    flexDirection: 'row'
  },
  horizontalContainer:{
    flexDirection: 'column'
  },
  resizableVertical: {
    height:'100% !important',
    width: '350px'
  },
  resizableHorizontal: {
    width:'100% !important',
    height: '250px'
  },
  verticalEditor:{
    height: '100% !important',
    width:'auto !important',
    marginRight:'10px'
  },
  resizeHandlerVertical:{
    height:'100% !important'
  },
  resizeHandlerHorizontal:{
    width:'100% !important',
    bottom: '-10px !important'
  },
  verticalDiagram:{
     textAlign: 'center',
     height: '100%',
     overflow: 'overlay',
     width: '100%',
     maxWidth: '100%'
  },
  horizontalEditor:{
    width:'100% !important',
    height: '100% !important'
  },
  horizontalDiagram:{
     textAlign: 'center',
     width: '100%',
     overflow: 'overlay',
     height: '100%',
     maxHeight: '100%',
     marginTop: '10px'
  }
});

const convertToKebabCase = (string) => {
  return string.replace(/\s+/g, '-').toLowerCase();
}

class SessionContainer extends Component {

    processError = false;
    shouldUpdate = false;

    constructor() {
        super();
        this.onEditChange = this.onEditChange.bind(this);
        this.onStopResize = this.onStopResize.bind(this);
        this.onParseError = this.onParseError.bind(this);
    }

    componentDidMount(){
      this.processError = true;
      this.shouldUpdate = true;
    }

    onEditChange(value){
        this.processError = true;
        this.shouldUpdate = false;
        if (typeof this.props.onEditChange === 'function') {
            this.props.onEditChange(value);
        }
    }

    onStopResize(width,height){
      if (typeof this.props.onResize === 'function') {
          this.props.onResize(this.props.type, width, height);
      }
    }

    onParseError(error){
      if (this.processError){
        this.shouldUpdate = true;
        this.processError=false;
        if (typeof this.props.onError === 'function') {
            this.props.onError([error]);
        }
      }
    }

    componentDidUpdate(){
      if (this.props.download){
        this.download();
        if (typeof this.props.onDownloadReset === 'function') {
            this.props.onDownloadReset();
        }
      }
    }

    download() {
      this.wrapper.startDownload({
        filename: convertToKebabCase(this.props.diagramTitle) + '.png'
      });
    }

    render() {
        const { classes } = this.props;
        let width = 350;
        let height = 250;
        if(this.props.windowSizeOption){
          width = this.props.windowSizeOption.vertical.width;
          height = this.props.windowSizeOption.horizontal.height;
        }
        const diagramOptions = {
          theme: this.props.diagramTheme
        };
        return (
        <div className={this.props.type === 'vertical' ? classes.content + ' ' + classes.verticalContainer : classes.content + ' ' + classes.horizontalContainer}>
            <ResizableComponent
                className={this.props.type === 'vertical' ? classes.resizableVertical : classes.resizableHorizontal}
                resizeHandlerClassName={this.props.type === 'vertical' ? classes.resizeHandlerVertical : classes.resizeHandlerHorizontal}
                direction={this.props.type === 'vertical' ? "e" : "s"}
                onStopResize={this.onStopResize}
                width={width}
                height={height}
                >
                <AceEditor
                       mode="java"
                       className={this.props.type === 'vertical' ? classes.verticalEditor : classes.horizontalEditor}
                       theme={this.props.aceTheme}
                       onChange={this.onEditChange}
                       fontSize={15}
                       name="editor"
                       value={this.props.diagramInputs}
                       editorProps={{$blockScrolling: true}}
                       annotations={this.props.annotations}
                       debounceChangePeriod={100}
                       setOptions={{
                        maxLines: Infinity
                      }}/>
            </ResizableComponent>
                <Wrapper ref={n => this.wrapper = n}
                         className={this.props.type === 'vertical' ? classes.verticalDiagram : classes.horizontalDiagram}>
                  <SequenceDiagram
                  ref={n => this.diagram = n}
                     input={this.props.diagramInputs}
                     options={diagramOptions}
                     onError={this.onParseError}
                     onRendered={this.onDiagramRendered}
                   />
                 </Wrapper>
        </div>);
    }
}

SessionContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SessionContainer);
