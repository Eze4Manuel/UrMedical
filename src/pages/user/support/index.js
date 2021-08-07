import React, { useState } from 'react';
import './Support.css';
import NoData from '../../../components/widgets/NoData';
import SubNavbar from '../../../components/subnavbar/index';
import NewSupportForm from './NewSupportForm';
import lib from './lib'

const Support = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [option, setOption] = useState('name');

    const onSearch = () => {}

    const onCreate = (values, setLoading, setError, setValues) => {
        lib.create()
    }

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <NewSupportForm show={openForm} onHide={() => setOpenForm(false)} onSubmit={onCreate} />
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="support"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for user..."
                    ariaLabel="support"
                    ariaDescription="support"
                    onSearch={() => onSearch()}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_pharmacy"
                    buttonTitle="Add support"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <NoData 
                    title="You haven't created any support user yet."
                    paragraph="You can create a support yourself by clicking on the button Add support."
                />
            </main>
        </div>
    );
}

export default Support;