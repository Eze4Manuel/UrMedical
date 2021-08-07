import React, {useState} from 'react';
import './Partner.css';
import SubNavbar from '../../../components/subnavbar';
import NoData from '../../../components/widgets/NoData';


const handleDataSearch = () => {}


const Partner = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [option, setOption] = useState('name');
    const [, setOpenForm] = useState(false)

    return (
        <div className="main-content">
            <NavigationBar {...props} />
            <main>
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_partner"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for pharmacy..."
                    ariaLabel="Pharmacies"
                    ariaDescription="Pharmacies"
                    onSearch={() => handleDataSearch(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_partner"
                    buttonTitle="Add Partner"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => setOpenForm(true)}
                />
                <NoData 
                    title="You haven't created any partner yet."
                    paragraph="You can create a partner yourself by clicking on the button Add partner."
                />
            </main>
        </div>
    )
}

export default Partner
