// import React from 'react';
// import './NewProductForm.css';
// import { Dialog } from 'primereact/dialog';
// import { InputText } from 'primereact/inputtext';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Button } from 'primereact/button';
// import config from '../../assets/utils/config';
// import ErrorMessage from '../../components/error/ErrorMessage';
// import Spinner from 'react-loader-spinner';
// import { productData } from './data';
// import { validateNewProduct } from './validation';

// const NewProductForm = ({ onSubmit, onHide, show}) => {
//     const [values, setValues] = React.useState(productData);
//     const [loading, setLoading] = React.useState(false);
//     const [error, setError] = React.useState(false);


//     const onCreateProduct = () => {
//         let builder = validateNewProduct({}, values, setError)
//         if (!builder) {
//             return
//         }
//         builder.availability_status = true
//         onSubmit(builder, setLoading, setError, setValues, config.userData)
//     }

//     return (
//         <Dialog header="New Product" visible={show} modal onHide={() => typeof onHide === 'function' ? onHide() : {}} style={{width: "45vw"}}>
//             <div>
//                 <div className="user-form__button-wp">
//                     {loading ? <Spinner type="TailSpin" color="green" height={30} width={30} /> : null}
//                 </div> 
//                 {error ? <ErrorMessage message={error} /> : null}
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="p-field mb-2">
//                             <label htmlFor="name">Product name*</label><br />
//                             <InputText style={{width: '100%'}} id="name" name="name" onChange={e => setValues(d => ({...d, name: e.target.value}))} value={values?.name} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Name of product" />
//                         </div>
//                     </div>
//                 </div> 
//                 <div className="row">
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label htmlFor="quantity">Quantity</label><br />
//                             <InputText style={{width: '100%'}} id="quantity" name="quantity" onChange={e => setValues(d => ({...d, quantity: e.target.value}))} value={values?.quantity} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="0" />
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label htmlFor="price">Unit Price*</label><br />
//                             <InputText style={{width: '100%'}} id="price" name="price" type="text" onChange={e => setValues(d => ({...d, price: e.target.value}))} value={values?.price} className="p-inputtext-sm p-d-block p-mb-2" placeholder="1200" />
//                         </div>
//                     </div>
//                 </div> 
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="p-field mb-2">
//                             <label htmlFor="category">Product category*</label><br />
//                             <p className="small">This should be the category of the product in your pharmacy catalog. It would enable customers find your products easily. eg Baby Items, Naturals, Pain relievers, Anti-Malaria</p>
//                             <InputText style={{width: '100%'}} id="category" name="category" onChange={e => setValues(d => ({...d, category: e.target.value}))} value={values?.category} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="Other" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="p-field mb-2">
//                             <label htmlFor="description">Product description</label><br />
//                             <InputTextarea style={{width: '100%', height: 100}} id="description" name="description" onChange={e => setValues(d => ({...d, description: e.target.value}))} value={values?.description} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="description" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="p-field mb-2">
//                             <label htmlFor="ingredients">Product ingredients</label><br />
//                             <p className="small">This should be the active ingredients the product contains that the customers should be aware of befor purchase</p>
//                             <InputTextarea style={{width: '100%', height: 100}} id="ingredients" name="ingredients" onChange={e => setValues(d => ({...d, ingredients: e.target.value}))} value={values?.ingredients} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="The ingredients" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-sm-12">
//                         <div className="p-field mb-2">
//                             <label htmlFor="precautions">Product precautions</label><br />
//                             <p className="small">This should be contract indications or conditions for user and conditions where use is not advicable.</p>
//                             <InputTextarea style={{width: '100%', height: 100}} id="precautions" name="precautions" onChange={e => setValues(d => ({...d, precautions: e.target.value}))} value={values?.precautions} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="The precautions" />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label htmlFor="discount_type">Discount type</label><br />
//                             <p className="small">This is the amount deductable from the actual display price if its on promo. Discount type should be <strong>percentage</strong> or <strong>amount</strong>.</p>
//                             <InputText style={{width: '100%'}} id="discount_type" name="discount_type" type="text" onChange={e => setValues(d => ({...d, discount_type: e.target.value}))} value={values?.discount_type} className="p-inputtext-sm p-d-block p-mb-2" placeholder="percentage" />
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label style={{marginBlock: '9px'}} className="mb-5" htmlFor="discount_amount">Discounted value</label><br />
//                             <InputText style={{width: '100%'}} id="discount_amount" name="discount_amount" onChange={e => setValues(d => ({...d, discount_amount: e.target.value}))} value={values?.discount_amount} type="text" className="p-inputtext-sm p-d-block p-mb-2 mt-4" placeholder="0" />
//                         </div>
//                     </div>
//                 </div> 
//                 <div className="row">
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label htmlFor="unit">Unit type</label><br />
//                             <p className="small">This product unit. e.g kg, g, ml, m etc.</p>
//                             <InputText style={{width: '100%'}} id="unit" name="unit" type="text" onChange={e => setValues(d => ({...d, unit: e.target.value}))} value={values?.unit} className="p-inputtext-sm p-d-block p-mb-2" placeholder="kg" />
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="p-field mb-2">
//                             <label htmlFor="unit_value">Unit value</label><br />
//                             <p className="small">This product unit value e.g 300</p>
//                             <InputText style={{width: '100%'}} id="unit_value" name="unit_value" onChange={e => setValues(d => ({...d, unit_value: e.target.value}))} value={values?.unit_value} type="text" className="p-inputtext-sm p-d-block p-mb-2" placeholder="10" />
//                         </div>
//                     </div>
//                 </div> 
//                 <div className="partner-form__button-wp">
//                     <Button onClick={() => onCreateProduct() } style={{width: 100, height: 30}} loading={loading} color="#fff" label="Create"/>
//                 </div>  
//             </div>
//         </Dialog>
//     )
// }

// export default NewProductForm
