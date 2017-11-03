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
/*
class ResizableComponent extends React.Component {

  create = false;

  constructor(props) {
    super(props);
    this.state = {
			// Mouse events
			mouseHeldDown: false,
			originalY: 0,
			originalX: 0,

			// Dimensions of box
			direction: props.direction,
			initialBoxHeight: props.height,
			initialBoxWidth: props.width,
			boxHeight: props.height,
			boxWidth: props.width,
			minHeight: props.options.minHeight ? props.options.minHeight : props.height,
			minWidth: props.options.minWidth ? props.options.minWidth : props.width,
			maxHeight: props.options.maxHeight ? props.options.maxHeight : Infinity,
			maxWidth: props.options.maxWidth ? props.options.maxWidth : Infinity,
			lockAspectRatio: props.options.lockAspectRatio ? props.options.lockAspectRatio : false,

			// Stepping of resizing
			step: props.options.step ? props.options.step : 1,
			currStepY: 0,
			currStepX: 0,
			steppingMargin: props.steppingMargin,
			originalBoxWidth: props.width,
			originalBoxHeight: props.height,

			// Width of resizable handle
			cursorMargin: props.options.cursorMargin ? props.options.cursorMargin : props.cursorMargin,

			// Ghost Resizing
			allowGhostResize: props.options.allowGhostResize ? props.options.allowGhostResize : false
		};
    this._startDrag = this._startDrag.bind(this);
    this._stopDrag = this._stopDrag.bind(this);
	}

  componentDidUpdate(){
    if (!this.create){
      this.create = true;
      this.setState({
          boxWidth : this.props.width,
          boxHeight: this.props.height,
          initialBoxHeight: this.props.height,
          initialBoxWidth: this.props.height,
          originalBoxWidth: this.props.width,
          originalBoxHeight: this.props.height,
      });
    }
  }

  componentDidMount() {
	    var _this = this;
	    var parentAttrName = ReactDOM.findDOMNode(this).parentNode.attributes[0].name;
	    var parentAttrValue = ReactDOM.findDOMNode(this).parentNode.attributes[0].value;

	    // Attaches event listeners to parent div
	    document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').addEventListener('mousemove', (e) => {
	      _this._resizeDiv(e);
	    });
	    document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').addEventListener('mouseup', (e) => {
	      _this._stopDrag(e);
	    });
	    document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').addEventListener('mouseleave', (e) => {
	      _this._stopDrag(e);
	    });
	}

	_startDrag(e) {
		this.makeParentHighlightable(false);
		this.setState({
			mouseHeldDown: true,
			originalY: e.clientY,
			originalX: e.clientX
		}, function() {
			if (this.props.onStartResize) this.props.onStartResize(
				(this.state.boxWidth - this.state.originalBoxWidth) / this.state.step,
				(this.state.boxHeight - this.state.originalBoxHeight) / this.state.step
			);
		});
	}

	_stopDrag(e) {
    	this.makeParentHighlightable(true);
		// Only invoke onStopResize if this component has started resizing
		if (this.state.mouseHeldDown && this.props.onStopResize) {
			this.props.onStopResize(
				this.state.boxWidth,
				this.state.boxHeight
			);
		}
		if (!this.state.allowGhostResize) {
			this.setState({
				mouseHeldDown: false,
				initialBoxHeight: this.state.boxHeight,
				initialBoxWidth: this.state.boxWidth
			});
		} else {
			// Ghost resizing
			// Change the dimensions back to the original
			this.setState({
				mouseHeldDown: false,
				boxHeight: this.state.originalBoxHeight,
				boxWidth: this.state.originalBoxWidth
			});
		}
	}

	_resizeDiv(e) {
		if (this.state.mouseHeldDown) {
			var distanceY = e.clientY - this.state.originalY;
			var distanceX = e.clientX - this.state.originalX;

			var newHeight = this.state.initialBoxHeight + distanceY;
			var newWidth = this.state.initialBoxWidth + distanceX;

			var steppingRemainderY = distanceY % this.state.step;
			var steppingRemainderX = distanceX % this.state.step;

			// NOTE: For checking whether the new dimensions violates the minimum constraints,
			// The steeping margin is given as allowance so that the box can be re-sized to the smallest
			// dimension smoothly.
			var heightCanChange = newHeight >= (this.state.minHeight - this.state.steppingMargin)
				&& newHeight <= (this.state.maxHeight + this.state.steppingMargin) // newHeight is below maxHeight
				&& steppingRemainderY <= this.state.steppingMargin // A little allowance is given for stepping
				&& this.props.direction.indexOf('s') > -1;

			var widthCanChange = newWidth >= (this.state.minWidth - this.state.steppingMargin)
				&& newWidth <= (this.state.maxWidth + this.state.steppingMargin)
				&& steppingRemainderX <= this.state.steppingMargin
				&& this.props.direction.indexOf('e') > -1;

			// If new dimensions are indeed lesser than the minimum constraint or greater than the maximum constraint,
			// set the dimension to the minimum/maximum respectively
			newHeight = newHeight - steppingRemainderY;
			newWidth = newWidth - steppingRemainderX;
			if (newHeight < this.state.minHeight) newHeight = this.state.minHeight;
			if (newWidth < this.state.minWidth) newWidth = this.state.minWidth;
			if (newHeight > this.state.maxHeight) newHeight = this.state.maxHeight;
			if (newWidth > this.state.maxWidth) newWidth = this.state.maxWidth;

			// If lockAspectRatio is true, we programatically calculate the width
			if (this.props.direction === 'se' && this.state.lockAspectRatio) {
				var aspectRatio = this.state.originalBoxHeight / this.state.originalBoxWidth;
				newWidth = newHeight / aspectRatio;
			}

			this.setState({
				boxHeight: heightCanChange ? newHeight : this.state.boxHeight,
				boxWidth: widthCanChange ? newWidth : this.state.boxWidth
			}, function() {

				// Callback for onDuringResize
				// Not called when step is active
				if (this.props.onDuringResize && this.state.step === 1) {
					this.props.onDuringResize(this.state.boxWidth,
					this.state.boxHeight);
				}

				// Callback for onEachStep
				// Only when step size has changed, then we invoke to callback
				if ((this.state.boxHeight !== this.state.currStepY || this.state.boxWidth !== this.state.currStepX)
					&& this.props.onEachStep && this.state.step > 1) {
					this.props.onEachStep(
						(this.state.boxWidth - this.state.originalBoxWidth) / this.state.step,
						(this.state.boxHeight - this.state.originalBoxHeight) / this.state.step
					);
					this.setState({
						currStepY: this.state.boxHeight,
						currStepX: this.state.boxWidth
					});
				}

			});
    	}
	}

	// Styles the resize handler according to the direction given
	getResizeHandlerStyle() {
		var resizeHandlerStyle = {};

		if (this.props.direction === 's') {
			resizeHandlerStyle = {
				width: this.state.boxWidth + 'px',
				height: this.state.cursorMargin + 'px',
				cursor: 's-resize',
				position: 'absolute',
				bottom: '0px',
				left: '0px'
			};
		}

		if (this.props.direction === 'e') {
			resizeHandlerStyle = {
				width: this.state.cursorMargin + 'px',
				height: this.state.boxHeight + 'px',
				cursor: 'e-resize',
				position: 'absolute',
				bottom: '0px',
				right: '0px'
			};
		}

		if (this.props.direction === 'se') {
			resizeHandlerStyle = {
				width: this.state.cursorMargin + 'px',
				height: this.state.cursorMargin + 'px',
				cursor: 'se-resize',
				position: 'absolute',
				bottom: '0px',
				right: '0px'
			};
		}

		return resizeHandlerStyle;
	}

	// Helper function to make the all components in parent non-highlight-able
	makeParentHighlightable(highlight) {
		var parentAttrName = ReactDOM.findDOMNode(this).parentNode.attributes[0].name;
		var parentAttrValue = ReactDOM.findDOMNode(this).parentNode.attributes[0].value;

		// Attaches event listeners to parent div
		document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').style.userSelect = highlight ? 'all' : 'none';
		document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').style.mozUserSelect = highlight ? 'all' : 'none';
		document.querySelector('[' + parentAttrName + '="' + parentAttrValue + '"]').style.webkitUserSelect = highlight ? 'all' : 'none';
	}

	render() {
		var outerDivStyle = {
			backgroundColor: 'transparent',
			width: (!this.state.allowGhostResize) ? this.state.boxWidth + 'px' : this.state.originalBoxWidth,
			height: (!this.state.allowGhostResize) ? this.state.boxHeight + 'px' : this.state.originalBoxHeight,
			cursor: 'default',
			position: 'relative'
		};

		// Merge in any custom styles and overwrite existing styles (if any)
		if (this.props.cssStyles) {
			var customStyles = this.props.cssStyles;
			for (var prop in customStyles) outerDivStyle[prop] = customStyles[prop];
		}

    	var resizeHandlerStyle = this.getResizeHandlerStyle();

		// For ghostResizing
		var highlightDiv;
		if (this.state.allowGhostResize) {
			var ghostDivStyles = {
				zIndex: '1',
				display: this.state.mouseHeldDown ? 'block' : 'none',
				backgroundColor: '#000000',
				opacity: '0.3',
				width: this.state.boxWidth + 'px',
				height: this.state.boxHeight + 'px',
				cursor: 'default',
				position: 'absolute',
				top: '0px',
				left: '0px'
			};
			if (this.props.ghostCssStyles) {
				var css = this.props.ghostCssStyles
				for (prop in css) ghostDivStyles[prop] = css[prop];
			}
			highlightDiv = <div className="ghostDiv" style={ghostDivStyles}></div>;
		}
		return <div className={this.props.className} style={outerDivStyle}>
			{highlightDiv}
			<div className={this.props.resizeHandlerClassName} style={resizeHandlerStyle} onMouseDown={this._startDrag}></div>
			{this.props.children}
		</div>;
	}
}
*/
/*
ResizableComponent.defaultProps=  {
    options: {},
    direction: 's',

    height: 350,
    width: 500,

    steppingMargin: 20,
    cursorMargin: 10
  };

ResizableComponent.propTypes = {
  children: PropTypes.element.isRequired,
  direction: PropTypes.oneOf(['s', 'e', 'se']),

  // Dimensions
  width: PropTypes.number,
  height: PropTypes.number,

  // Styling
  cssStyles: PropTypes.object,
  ghostCssStyles: PropTypes.object,

  // Callbacks
  onStartResize: PropTypes.func,
  onStopResize: PropTypes.func,
  onEachStep: PropTypes.func,
  onDuringResize: PropTypes.func,

  // Other options
  options: PropTypes.object
};
*/
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
        this.state = {
          annotations: []
        };
        this.onEditChange = this.onEditChange.bind(this);
        this.onStopResize = this.onStopResize.bind(this);
        this.onParseError = this.onParseError.bind(this);
        this.onDiagramRendered = this.onDiagramRendered.bind(this);
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
        this.setState({
          annotations: [error]
        });
      }
    }

    onDiagramRendered(){
      if (this.processError){
        this.processError=false;
        this.setState({
          annotations: []
        });
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
                       annotations={this.state.annotations}
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
