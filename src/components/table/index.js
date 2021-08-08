import React from 'react';
import './Style.css';
import { useHistory } from 'react-router-dom';
import Pagination from '../widgets/Pagination';

const navigateTo = (route, id, history) => {
    if (typeof history.push === 'function') {
        history.push(`${route}/${id}`);
    }
}

const Table = (props = {
    tableHeader: null,
    data: [],
    dataFields: [],
    tableTitle: '',
    onSelectData: null,
    route: null,
    pages: 0,
    goTo: null,
    next: null,
    prev: null,
    activePage: 0,
}) => {
    const history = useHistory();
    const tableHeader = props.tableHeader.map(_th => (<th scope="col">{_th}</th>))
    const tableRow = props.data.map((_tr, _idx) => {
        return (
            <tr 
                className="table-effect" 
                onClick={() => typeof props.onSelectData === 'function' 
                        ? props.onSelectData(_tr) 
                        : navigateTo(props.route, _tr?.id, history)
                }
            >
                <th scope="row">
                    {_idx+1}
                </th>
                {
                    props.dataFields.map((key) => {
                        let dk = key
                        if (key === 'username')  {
                            dk = 'email'
                        }
                        return (<td>{_tr[dk]}</td> )
                    })
                }
            </tr>
        )
    })

    return (
        <div className="px-5 pt-5 table-responsive table-height card mt-4 overflow-scroll">
            <h1>{props.tableTitle}</h1>
            <table class="table table-hover table-sm">
                <thead>
                    <tr className="app-table__header">{tableHeader}</tr>
                </thead>
                <tbody>
                    {tableRow}
                </tbody>
            </table>
            <Pagination {...props} />
        </div>
    )
}

export default Table;
