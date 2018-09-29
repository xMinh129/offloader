import React from "react";
import {render} from "react-dom";
import {data as data2} from './temp';
import ReactTable from "react-table";
import "react-table/react-table.css";


const columns = [
    {
        Header: "Full Name",
        accessor: "name"
    },
    {
        Header: "Score",
        id: "score",
        accessor: "score"
    }
];

class ScoreTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data2
        };

    }


    render() {
        const {data} = this.state;

        return (

            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                    SubComponent={row => {
                        var subrows = [];
                        Object.entries(row.original.details).forEach(([key, value]) => {
                            subrows.push(<p>{key} : {value}</p>);
                        });
                        return <div>
                            {subrows}
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
