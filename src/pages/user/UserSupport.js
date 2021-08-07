import React, { useState, useEffect } from 'react';
import './User.css';
import SubNavbar from '../../components/subnavbar';
import Table from '../../components/table';
import usersdata from '../../assets/data/user';
import { getPageCount, getPages } from '../../core/func/utility';
import URI from '../../assets/utils/uri';
import { useHistory } from 'react-router-dom';
// import HttpRequest from '../../core/func/httpRequest';


const goTo = (id, set) => {
    set(id);
}

const fetchMore  = async (page, key, set) => {
    let _page = page || 1;
    if (key === 'prev') {
        _page = _page < 1 ? 1 : _page;
    }

    if (key === 'next') {
        _page = page + 1;
    }

    // const res = await HttpRequest({
    //     method: 'GET',
    //     resouce: 'USER',
    //     type: 'support',
    //     page: _page
    // })
    console.log('page: ',_page, ' key: ',key,' set: ',set)
}

const UserSupport = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [option, setOption] = useState('name');
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [activePage, setActivePages] = useState(1);
    const history = useHistory();

    useEffect(() => {
       setData(usersdata);
    }, []) // [page]

    const perPage = getPageCount(10);
    const paginate = getPages(data.length, perPage); 
    const start = (activePage === 1) ? 0 : (activePage*perPage)  - perPage;
    const stop = start+perPage;
    const viewData = data.slice(start, stop);

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_support"
                    filterList={['name', 'phone','email']}
                    searchPlaceholder="Search for support user..."
                    ariaLabel="Support users"
                    ariaDescription="Support users"
                    onSearch={() => alert(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_support"
                    buttonTitle="Add Support"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => history.push(URI.CreateSupportUser)}
                />
                    <Table
                        prev={() => fetchMore(page, 'prev', setPage)}
                        next={() => fetchMore(page, 'next', setPage)}
                        goTo={(id) => goTo(id, setActivePages)}
                        activePage={activePage}
                        pages={paginate}
                        data={viewData}
                        perPage={perPage}
                        route={URI.User}
                        tableTitle="Support" 
                        tableHeader={['#','ID','Username','Email','Salary']}
                        dataFields={['id','username','email','salary']}
                    />
            </main>
        </div>
    );
}
 
export default UserSupport;