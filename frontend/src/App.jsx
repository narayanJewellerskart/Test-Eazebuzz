import { useState } from "react";
import "./App.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const App = () => {
	const [formData, setFormData] = useState({
		amount: "5021.00",
		productinfo: "vercel Data",
		firstname: "Narayan",
		phone: "8974269456",
		email: "narayan@jewellerskart.com",
		surl: "http://localhost:8000/api/test/payment_result",
		furl: "http://localhost:8000/api/test/payment_result",
		udf1: "",
		udf2: "",
		udf3: "",
		udf4: "",
		udf5: "",
		udf6: "",
		udf7: "",
		udf8: "",
		udf9: "",
		udf10: "",
		address1: "",
		address2: "",
		city: "",
		state: "",
		country: "",
		zipcode: "",
		unique_id: "",
		split_payments: "",
		sub_merchant_id: "",
		customer_authentication_id: "",
	});

	const handleChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("http://localhost:8000/api/test/initiate_payment", formData);
			console.log(data);
			if (data) {
				let eazebuuzzCheckout = new EasebuzzCheckout(data.key, "test");
				let options = {
					access_key: data.access_url,
					onResponse: async (response) => {
						const { data } = await axios.post("http://localhost:8000/api/test/payment_result", response);
						console.log(data);
					},
				};
				eazebuuzzCheckout.initiatePayment(options);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div>
				<h2>INITIATE PAYMENT API</h2>
				<hr />
				<form onSubmit={submitHandler}>
					<div className='main-form'>
						<h3>Mandatory Parameters</h3>
						<hr />
						<div className='mandatory-data'>
							<div className='form-field'>
								<label htmlFor='amount'>
									Amount<sup>(should be float)*</sup>
								</label>
								<input id='amount' className='amount' name='amount' value={formData.amount} onChange={handleChange} placeholder='' />
							</div>

							<div className='form-field'>
								<label htmlFor='firstname'>
									First Name<sup>*</sup>
								</label>
								<input id='first_name' className='name' name='firstname' value={formData.firstname} onChange={handleChange} placeholder='' />
							</div>

							<div className='form-field'>
								<label htmlFor='email'>
									Email ID<sup>*</sup>
								</label>
								<input type='email' id='email' className='email' name='email' value={formData.email} placeholder='' onChange={handleChange} />
							</div>

							<div className='form-field'>
								<label htmlFor='phone'>
									Phone<sup>*</sup>
								</label>
								<input id='phone' className='phone' name='phone' value={formData.phone} onChange={handleChange} placeholder='' />
							</div>

							<div className='form-field'>
								<label htmlFor='productinfo'>
									Product Information<sup>*</sup>
								</label>
								<input id='productinfo' className='productinfo' name='productinfo' value={formData.productinfo} placeholder='' onChange={handleChange} />
							</div>

							<div className='form-field'>
								<label htmlFor='surl'>
									Success URL<sup>*</sup>
								</label>
								<input id='surl' className='surl' name='surl' value={formData.surl} onChange={handleChange} />
							</div>

							<div className='form-field'>
								<label htmlFor='furl'>
									Failure URL<sup>*</sup>
								</label>
								<input id='furl' className='furl' name='furl' value={formData.furl} onChange={handleChange} />
							</div>
						</div>
						<h3>Optional Parameters</h3>
						<hr />
						<div className='optional-data'>
							<div className='form-field'>
								<label htmlFor='udf1'>UDF1</label>
								<input id='udf1' className='udf1' name='udf1' value='' onChange={handleChange} placeholder='User description1' />
							</div>

							<div className='form-field'>
								<label htmlFor='udf2'>UDF2</label>
								<input id='udf2' className='udf2' name='udf2' value='' onChange={handleChange} placeholder='User description2' />
							</div>

							<div className='form-field'>
								<label htmlFor='udf3'>UDF3</label>
								<input id='udf3' className='udf3' name='udf3' value='' onChange={handleChange} placeholder='User description3' />
							</div>

							<div className='form-field'>
								<label htmlFor='udf4'>UDF4</label>
								<input id='udf4' className='udf4' name='udf4' value='' onChange={handleChange} placeholder='User description4' />
							</div>

							<div className='form-field'>
								<label htmlFor='udf5'>UDF5</label>
								<input id='udf5' className='udf5' name='udf5' value='' onChange={handleChange} placeholder='User description5' />
							</div>
							<div className='form-field'>
								<label htmlFor='address1'>Address 1</label>
								<input id='address1' className='address1' name='address1' value='' onChange={handleChange} placeholder='#250, Main 5th cross,' />
							</div>

							<div className='form-field'>
								<label htmlFor='address2'>Address 2</label>
								<input id='address2' className='address2' name='address2' value='' onChange={handleChange} placeholder='Saket nagar, Pune' />
							</div>

							<div className='form-field'>
								<label htmlFor='city'>City</label>
								<input id='city' className='city' name='city' value='' onChange={handleChange} placeholder='Pune' />
							</div>

							<div className='form-field'>
								<label htmlFor='state'>State</label>
								<input id='state' className='state' name='state' value='' onChange={handleChange} placeholder='Maharashtra' />
							</div>

							<div className='form-field'>
								<label htmlFor='country'>Country</label>
								<input id='country' className='country' name='country' value='' onChange={handleChange} placeholder='India' />
							</div>

							<div className='form-field'>
								<label htmlFor='zipcode'>Zip-Code</label>
								<input id='zipcode' className='zipcode' name='zipcode' value='' onChange={handleChange} placeholder='123456' />
							</div>

							<div className='form-field'>
								<label htmlFor='sub_merchant_id'>Sub-Merchant ID</label>
								<input id='sub_merchant_id' className='sub_merchant_id' name='sub_merchant_id' value='' placeholder='123456' onChange={handleChange} />
							</div>

							<div className='form-field'>
								<label htmlFor='unique_id'>Unique Id</label>
								<input id='unique_id' className='unique_id' name='unique_id' value='' onChange={handleChange} placeholder='Customer unique Id' />
							</div>

							<div className='form-field'>
								<label htmlFor='split_payments'>Split payment</label>
								<input id='split_payments' className='split_payments' name='split_payments' value='' placeholder='{ "axisaccount" : 100, "hdfcaccount" : 100}' onChange={handleChange} />
							</div>
							<div className='form-field'>
								<label htmlFor='customer_authentication_id'>Customer Authentication ID</label>
								<input
									id='customer_authentication_id'
									className='customer_authentication_id'
									name='customer_authentication_id'
									value=''
									onChange={handleChange}
									placeholder='customer authentication number'
								/>
							</div>
						</div>
						<div className='btn-submit'>
							<button type='submit'>SUBMIT</button>
						</div>
						<input id='udf6' type='hidden' className='udf6' name='udf6' value='' onChange={handleChange} placeholder='User description6' />
						<input id='udf7' type='hidden' className='udf7' name='udf7' value='' onChange={handleChange} placeholder='User description7' />
						<input id='udf8' type='hidden' className='udf8' name='udf8' value='' onChange={handleChange} placeholder='User description8' />
						<input id='udf9' type='hidden' className='udf9' name='udf9' value='' onChange={handleChange} placeholder='User description9' />
						<input id='udf10' type='hidden' className='udf10' name='udf10' value='' onChange={handleChange} placeholder='User description10' />
					</div>
				</form>
			</div>
		</>
	);
};

export default App;
