import React from "react";
import {render} from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "../components/CustomButton.jsx";
import _ from "lodash";
import axios from 'axios';
import {data as data2} from './temp';


const columns = [
    {
        Header: "First Name",
        accessor: "first_name"
    },
    {
        Header: "Last Name",
        accessor: "last_name"
    },
    {
        Header: "Score",
        id: "score",
        accessor: "score"
    }
];

class ScoreTable extends React.Component {
    constructor(props) {
        super(props);
        var rankedData;
        if (_.isEmpty(this.props))
            rankedData = data2;
        else
            rankedData = this.props.newState
        this.state = {
            rankedData
        };
        this.sendOffloadEmail = this.sendOffloadEmail.bind(this);
    }

    sendOffloadEmail(email, passenger){
        var self = this;
        axios.post("http://0.0.0.0:5010/api/notify_passengers", {
            name: passenger,
            recipient: email
        })
            .then(function (response) {
                self.props.successNotification();
            }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const {rankedData} = this.state;

        return (

            <div>
                <ReactTable
                    data={rankedData}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        var subrows = [];
                        Object.entries(row.original.details).forEach(([key, value]) => {
                            subrows.push(
                                <p>{key} : {value}</p>);
                        });
                        return <div>
                            {subrows}
                            <Button bsStyle="info" pullRight fill name="submit"
                                    onClick={this.sendOffloadEmail(
                                        row.original.details.email, row.original.first_name + ' ' +  row.original.last_name)}>
                                Notify Offload
                            </Button>
                        </div>
                    }}
                />
                <br/>
                {/*<Tips />*/}
                {/*<Logo />*/}
            </div>
        );
    }
}

export default ScoreTable;
