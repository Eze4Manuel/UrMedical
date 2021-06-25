import React, { useState } from 'react';
import './User.css';
import SubNavbar from '../../components/subnavbar';
import { useHistory } from 'react-router-dom';
import URI from '../../assets/utils/uri';

const handleDataSearch = () => {}

const UserPartner = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [option, setOption] = useState('name');
    const history = useHistory();

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_partner_user"
                    filterList={['name', 'phone','email']}
                    searchPlaceholder="Search for partners"
                    ariaLabel="Partner users account"
                    ariaDescription="Partner users account"
                    onSearch={() => handleDataSearch(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_partner_user"
                    buttonTitle="Add Partner"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => history.push(URI.CreatePartnerUser)}
                />
            </main>
        </div>
    );
}
 
export default UserPartner;