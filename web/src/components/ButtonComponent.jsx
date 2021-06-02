import React from 'react';
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import { getData } from "../Actions/ApiAction";
import toastr from 'toastr';

class ButtonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            page: 1
        };

    }
    /**
     * To get api data 
     */
    getAPIData = () => {
        var params = {
            apiType: this.props.label,
            page: this.state.page,
            client_page: this.props.client_page['button-' + this.props.type],
            type: this.props.type,
            isFrom: 'button'
        }
        this.props.getData(params).then(response => {
            if (response) {
                this.setState({ data: response });
            }
        }, error => {
            toastr.error(error);
        });
    };
    /**
     * To renders view
     * @returns 
     */
    render() {
        return (
            <div className="col-xs-3">
                <Button variant="info" className="mr-3" onClick={() => this.getAPIData()}>{this.props.label}</Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apiData: state.api.apiData,
        client_page: state.api.client_page,
    }
}

const mapDispatchToProps = {
    getData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ButtonComponent);
