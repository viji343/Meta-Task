import React from 'react';
import { connect } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent";
import Table from 'react-bootstrap/Table';
import { getData } from "../../Actions/ApiAction";
import Pagination from 'react-bootstrap/Pagination';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            pageSize: 10
        };
    }

    /**
    * To get api data 
    */
    handlePageChange = (page) => {
        var params = {
            apiType: this.props.apiType,
            page: page,
            client_page: this.props.client_page['button-' + this.props.type],
            type: this.props.type,
            isFrom: 'pagination'
        }

        this.props.getData(params).then(response => {
            if (response) {
                this.setState({ data: response, activePage: page });
            }
        }, error => {
            this.error(error);
        });
    };

    /**
     * To render the view
     * @returns 
     */
    render() {
        let { pageSize } = this.state;
        let items = [];
        let total = this.props.totalCount / pageSize;
        for (let number = 1; number <= total; number++) {
            items.push(
                <Pagination.Item key={number} active={number === this.state.activePage} onClick={() => this.handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return (
            <div className="container">
                <div className="d-flex justify-content-center">
                    <ButtonComponent type="1" label="Matrix" />
                    <ButtonComponent type="2" label="Matrix Reloaded" />
                    <ButtonComponent type="3" label="Matrix Revolution" />
                </div>
                <h4> {this.props.apiType} </h4>
                {this.props.apiData && this.props.apiData.length > 0 && (
                    <div className="table-center">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>IMDB ID</th>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Type</th>
                                    <th>Poster</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.apiData.map((value, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{value.imdbID}</td>
                                            <td>{value.title}</td>
                                            <td>{value.year}</td>
                                            <td>{value.type}</td>
                                            <td>{value.poster ? <img src={value.poster.poster} alt="poster" width="50" height="50" /> : 'NA'}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <Pagination>{items}</Pagination>
                    </div>
                )}
                {(!this.props.apiData || !this.props.apiData.length) &&
                    <div className="table-center">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td>No Data Found...!</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apiData: state.api.apiData,
        apiType: state.api.apiType,
        type: state.api.type,
        totalCount: state.api.totalCount,
        client_page: state.api.client_page
    }
}

const mapDispatchToProps = {
    getData,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
