
import React, { Component } from 'react';
import Dialog, {
    DialogContent,
    DialogActions,
    DialogTitle,
} from 'material-ui/Dialog';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

const styles = theme => ({
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 500,
    }
});

class EditView extends Component {

    title = '';

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setTitle = this.setTitle.bind(this);
    }

    close() {
        if (typeof this.props.onDialogClose === 'function') {
            this.props.onDialogClose();
        }
    };

    /**
     * Set the title field
     *
     */
    setTitle() {
        if (typeof this.props.onSetTitle === 'function') {
            this.close();
            this.props.onSetTitle(this.title);
        }
    }

    handleChange(e) {
        this.title = e.target.value;
    }

    /**
     * handle the enter key
     *
     * @param  {Object} e event
     */
    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.setTitle(e.target.value);
        }
    }

    render() {
        const { classes } = this.props;
        return  <div>
                <Dialog open={this.props.open} onRequestClose={this.close}>
                    <DialogTitle>{"Edit Title"}</DialogTitle>
                    <DialogContent>
                      <TextField
                        placeholder="Your awesome title"
                        defaultValue={this.props.title}
                        onKeyPress={(e) => this.handleKeyPress(e)}
                        onChange={this.handleChange}
                        className={classes.textField}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => this.close()}>Close</Button>
                      <Button onClick={() => this.setTitle()}>OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
    }
}

EditView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditView);
