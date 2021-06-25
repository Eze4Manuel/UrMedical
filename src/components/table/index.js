import React from 'react';
import './Style.css';
import { useHistory } from 'react-router-dom';
import Pagination from '../widgets/Pagination';

const navigateTo = (route, id, history) => {
    if (typeof history.push === 'function') {
        history.push(`${route}/${id}`);
    }
}

const Table = (props) => {
    const history = useHistory();
    const tableHeader = props.tableHeader.map(_th => (<th scope="col">{_th}</th>))
    const tableRow = props.data.map((_tr, _idx) => {
    const keys = Object.keys(_tr);
        return (
            <tr 
                onClick={() => typeof props.onSelectData === 'function' 
                        ? props.onSelectData(_tr) 
                        : navigateTo(props.route, _tr?.id, history)
                }
            >
                <th scope="row">
                    {_idx+1}
                </th>
                {keys.map( key => (
                    props.dataFields.includes(key) 
                    ? <td>{_tr[key]}</td> 
                    : null
                ))}
            </tr>
        )
    })

    return (
        <div className="white px-5 pt-5 table-responsive table-height">
            <h1>{props.tableTitle}</h1>
            <table class="table table-hover table-sm">
                <thead>
                    <tr>{tableHeader}</tr>
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
