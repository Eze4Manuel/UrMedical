import React, {useState} from 'react';
import './Pharmacy.css';
import SubNavbar from '../../components/subnavbar';
import { useHistory } from 'react-router-dom';
import URI from '../../assets/utils/uri';
import NoData from '../../components/widgets/NoData';

const handleDataSearch = () => {}

const Pharmacy = (props) => {
    const NavigationBar = props.NavigationBar;
    const [searchInput, setSearchInput] = useState('');
    const [option, setOption] = useState('name');
    const history = useHistory();

    return (
        <div className="main-content">
            <NavigationBar {...props} />
            <main>
                <SubNavbar  
                    showFilter
                    showSearch
                    showButton
                    filterName="filter_pharmacy"
                    filterList={['name', 'location','phone']}
                    searchPlaceholder="Search for pharmacy..."
                    ariaLabel="Pharmacies"
                    ariaDescription="Pharmacies"
                    onSearch={() => handleDataSearch(searchInput)}
                    searchInput={searchInput}
                    onChangeInput={setSearchInput}
                    searchID="search_pharmacy"
                    buttonTitle="Add Pharmacy"
                    onSelectChange={setOption}
                    option={option}
                    onAddItem={() => history.push(URI.CreatePartnerUser)}
                />
                <NoData 
                    title="You haven't created any pharmacy yet."
                    paragraph="You can create a Phamarcy yourself by clicking on the button Add pharmacy."
                />
            </main>
        </div>
    )
}

export default Pharmacy
