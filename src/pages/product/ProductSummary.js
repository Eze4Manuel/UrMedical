import React, { useEffect } from 'react';
import './ProductSummary.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import lib from './lib';
import ProgressBar from '../../components/progressbar/ProgressBar';

const salesData = [
    {month: 'APR', amount: 19000},
    {month: 'MAY', amount: 20000},
    {month: 'JUN', amount: 34950},
    {month: 'JUL', amount: 18000},
    {month: 'AUG', amount: 10000},
]

const SupportUserData = ({ data, show, onHide, onDeleted}) => {
    const [values, setValues] = React.useState(config.userData);
    const [loading, setLoading] = React.useState(false);
    const [showProfile, setShowProfile] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);
    const [delWarning, setDelWarning] = React.useState(false);
    const [error, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    const onEditPassword = () => {
        setShowProfile(false)
        setShowPassword(true)
    }
  
    const onEditLincense = () => {
        setShowProfile(false)
        setShowPassword(false)
    }

    const onCancelPasswordEdit = () => {
        setShowPassword(false)
        setShowProfile(true)
    }

    return (
        <Dialog closeOnEscape header="Pharmacy Product Summary" visible={show} modal onHide={() => onHide()} style={{width: "70vw"}}>
            <div className="product-summary__ctn mt-5">
                <div className="row">
                    <div className="col-3">
                       <div className="card p-2 pl-3">
                            <h5><span>Lifetime Revenue</span></h5>
                            <h2><span>2.85M</span></h2>
                            <p className="small"><span>July 12, 2021 - </span></p>
                       </div>
                    </div> 
                    <div className="col-3">
                       <div className="card p-2 pl-3">
                            <h5><span>August</span></h5>
                            <h2 className="text-success"><span>285.6K</span></h2>
                            <p className="small"><span>August 12, 2021</span></p>
                       </div>
                    </div> 
                    <div className="col-3">
                       <div className="card p-2 pl-3">
                            <h5><span>Products</span></h5>
                            <h2 className="text-primary"><span>3,000</span></h2>
                            <p className="small"><span>Listed products</span></p>
                       </div>
                    </div> 
                    <div className="col-3">
                       <div className="card p-2 pl-3">
                            <h5><span>Categories</span></h5>
                            <h2 className="text-warning"><span>201</span></h2>
                            <p className="small"><span>Products categories</span></p>
                       </div>
                    </div> 
                </div>
                {/* REVENUE CHART */}
                <div className="row">
                    <div className="col-6 mt-4">
                        <div className="shadow-sm card border-light">
                            <div className="d-flex flex-row align-items-center flex-0 border-bottom card-body">
                                <div className="d-block">
                                    <h5>Sales Revenue</h5>
                                    <div className="small mt-2 mb-3">
                                        <span><i class="las la-book-open"></i> 6 month sales</span>
                                    </div>
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center mr-3 pc-line">
                                            <span class="shape-xs rounded-circle bg-secondary mr-2"></span>
                                            <small class="fw-normal">April - August</small>
                                        </div>
                                    </div>
                                    <div className="p-2 card-body">
                                        <ProgressBar format={true} data={salesData} barValue="amount"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <div className="px-5 pt-3 table-responsive table-height card mt-4 overflow-scroll">
                            <h6>Sale Location Hubs (City Area)</h6>
                            <table class="table table-hover table-sm">
                                <thead>
                                    <tr className="small fw-bold">
                                        <td>Area</td>
                                        <td>Orders</td>
                                        <td>Products</td>
                                        <td>Amount</td>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                <tr className="small">
                                    <td>Maitama</td>
                                    <td>76</td>
                                    <td>600</td>
                                    <td>₦120,000</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default SupportUserData
