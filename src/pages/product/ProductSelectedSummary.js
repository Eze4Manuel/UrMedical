import React, { useEffect, Fragment } from 'react';
import './ProductSelectedSummary.css';
import { Dialog } from 'primereact/dialog';
import config from '../../assets/utils/config';
import Flash from '../../components/flash/Flash';
import { toNumber } from '../../core/func/format';
import lib from './lib';
import { useAuth } from '../../core/hooks/useAuth';
import { useNotifications } from '@mantine/notifications';
import helpers from '../../core/func/Helpers';

const deleteWarning = "Are you sure you want to delete this account. This action is not reversible."

const CustomerData = ({ data, show, onHide, onDeleted}) => {
    const { set, user } = useAuth();
    const notify = useNotifications();
    const [values, setValues] = React.useState(config.userData);
    const [, setLoading] = React.useState(false);
    const [showProduct, ] = React.useState(true);
    const [delWarning, setDelWarning] = React.useState(false);
    const [, setError] = React.useState(false);

    useEffect(() => {
        setValues(data);
        setDelWarning(false)
    }, [data])

    
    const deleteAccount = async () => {
        setError('')
        setDelWarning(false)
        setLoading(true)
        let reqData = await lib.delete(data?._id, user?.token)
        setLoading(false)
        // error
        if (reqData.status === 'error') {
            helpers.sessionHasExpired(set, reqData?.msg, setError)
        }
        if (reqData.status === 'ok') {
            onDeleted(data?.auth_id)
            onHide()
            helpers.alert({notifications: notify, icon: 'success', color:'green', message: 'Product deleted'})
        }
        
    }

    return (
        <Dialog closeOnEscape header="Product Basic Information" visible={show} modal onHide={() => onHide()} style={{width: "50vw"}}>
            <div className="product-info__ctn">
                <div className="row">
                    <div className="col-12 mt-1">
                        <Flash title="Warning!" show={delWarning} message={deleteWarning} onCancel={() => setDelWarning(false)} onProceed={() => deleteAccount()} />
                        <ProductDetailSummary data={values} />
                    </div>
                    
                </div>
            </div>
        </Dialog>
    )
}

export default CustomerData





const Detail = ({name, value}) => value ? (<p className="product-info__detail"><span>{name}</span> <span>{value}</span></p>) : null

const ProductDetailSummary = ({ data }) => {
  
    return (
        <Fragment>
            <div className="my-3">
                <Detail name="Name" value={data?.name} />
                <Detail name="Price" value={`₦${toNumber(data?.price)}`} />
                <Detail name="Quantity" value={data?.quantity} />
                <Detail name="Category" value={data?.category} />
                { data?.description ? <p className="product-info__detail"><span>Description</span></p> : null}
                <p><span className="product-desc">{data?.description}</span></p>
                { data?.ingredients ? <p className="product-info__detail"><span>Ingredients</span></p> : null}
                <p><span className="product-desc">{data?.ingredients}</span></p>
                { data?.precautions ? <p className="product-info__detail"><span>Precautions</span></p> : null}
                <p><span className="product-desc">{data?.precautions}</span></p>
            </div>
            <div className="my-3">
                <h6 className="mb-3">More Detail</h6>
                <Detail name="Discount type" value={data?.discount_type} />
                <Detail name="Discount value" value={data?.discount_amount} />
                <Detail name="Unit type" value={data?.unit} />
                <Detail name="Unit value" value={data?.unit_value} />
                <Detail name="Discount value" value={data?.discount_amount} />
                <Detail name="Discount value" value={data?.discount_amount} />
                <Detail name="In Stock" value={data?.availability_status ? "Yes" : "No"} />
            </div>
        </Fragment>
    )
}
