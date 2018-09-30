import React from "react";
import {render} from "react-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "../components/CustomButton.jsx";
import _ from "lodash";
import axios from 'axios';
import {data as data2} from './temp';
import NotificationSystem from 'react-notification-system';
import {style} from "../variables/Variables.jsx";


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
        Header: "STATUS",
        accessor: "status"
    },
    {
        Header: "Score",
        id: "score",
        accessor: "score"
    },

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
            rankedData,
            _notificationSystem: null
        };
        this.sendOffloadEmail = this.sendOffloadEmail.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(){
        this.setState({_notificationSystem: this.refs.notificationSystem})
    }

    handleClick(){
        var level = 'success'; // 'success', 'warning', 'error' or 'info'
        setTimeout(function(){this.state._notificationSystem.addNotification({
            title: (<span data-notify="icon" className="pe-7s-gift"></span>),
            message: (
                <div>
                    Email successfully sent
                </div>
            ),
            level: level,
            position: 'bc',
            autoDismiss: 15,
        })}.bind(this), 3000);
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
        let rankedData = this.props.newState;

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
                                    onClick={this.handleClick(
                                        row.original.details.email, row.original.first_name + ' ' +  row.original.last_name)}>
                                Offload this passenger
                            </Button>
                            <br/>
                            <br/>
                        </div>
                    }}
                />
                <br/>
                {/*<Tips />*/}
                {/*<Logo />*/}
                <NotificationSystem ref="notificationSystem" style={style}/>
            </div>
        );
    }
}

export default ScoreTable;
