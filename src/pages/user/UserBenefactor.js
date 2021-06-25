import React, { useState } from 'react';
import './User.css';
import SubNavbar from '../../components/subnavbar';

const handleBenefactorUserSearch = () => {}

const UserBenefactor = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [option, setOption] = useState('name');

    return (
        <div className='main-content'>
            <NavigationBar {...props} />
            <main>
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton={false}
                    filterName="filter_partner_user"
                    filterList={['name', 'phone','email']}
                    searchPlaceholder="Search for partners"
                    ariaLabel="Partner users account"
                    ariaDescription="Partner users account"
                    onSearch={() => handleBenefactorUserSearch(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_partner_user"
                    buttonTitle="Add Partner"
                    onSelectChange={setOption}
                    option={option}
                />
            </main>
        </div>
    );
}
 
export default UserBenefactor;