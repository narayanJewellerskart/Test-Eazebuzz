import express, { response } from "express";
import dotenv from "dotenv";
import { sha512 } from "js-sha512";
import crypto from "crypto";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
// import { URLSearchParams } from "url";
import cors from "cors";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var whitelist = ["http://localhost:5173"];
var corsOptions = {
	credentials: true,
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
};

app.use(cors(corsOptions));

const generateHashForEazeBuzz = ({ key, txnid, amount, productinfo, firstname, email }) => {
	const salt = process.env.EAZEBUZZ_SALT;
	const hashString = key + "|" + txnid + "|" + amount + "|" + productinfo + "|" + firstname + "|" + email + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + salt;
	const hashSequence = sha512(hashString);
	return hashSequence;
};

app.post(
	"/api/test/initiate_payment",
	expressAsyncHandler(async (req, res) => {
		const {
			amount,
			productinfo,
			firstname,
			phone,
			email,
			surl,
			furl,
			udf1,
			udf2,
			udf3,
			udf4,
			udf5,
			udf6,
			udf7,
			udf8,
			udf9,
			udf10,
			address1,
			address2,
			city,
			state,
			country,
			zipcode,
			unique_id,
			split_payments,
			sub_merchant_id,
			customer_authentication_id,
		} = req.body;

		const key = process.env.EASEBUZZ_KEY;
		const txnid = crypto.randomBytes(10).toString("hex");
		const hashSequence = generateHashForEazeBuzz({ key, txnid, amount, productinfo, firstname, email });

		const formData = {
			key,
			txnid,
			amount,
			email,
			phone,
			firstname,
			hash: hashSequence,
			productinfo,
			udf1,
			udf2,
			udf3,
			udf4,
			udf5,
			udf6,
			udf7,
			udf8,
			udf9,
			udf10,
			furl,
			surl,
		};

		if (unique_id !== "") {
			formData.unique_id = unique_id;
		}

		if (split_payments !== "") {
			formData.split_payments = split_payments;
		}

		if (sub_merchant_id !== "") {
			formData.sub_merchant_id = sub_merchant_id;
		}

		if (customer_authentication_id !== "") {
			formData.customer_authentication_id = customer_authentication_id;
		}

		const eazebuzz_env = process.env.EAZEBUZZ_ENV;
		const geturl = (env) => {
			let url_link;
			if (env === "test") {
				url_link = "https://testpay.easebuzz.in/";
			} else if (env === "prod") {
				url_link = "https://pay.easebuzz.in/";
			} else {
				url_link = "https://testpay.easebuzz.in/";
			}
			return url_link;
		};

		let payment_url = geturl(eazebuzz_env);
		let call_url = payment_url + "payment/initiateLink";

		const options = {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Accept: "application/json",
			},
		};

		const iframe = process.env.EASEBUZZ_IFRAME;

		try {
			const { data } = await axios.post(call_url, formData, options);

			// if (iframe === "0") {
			// 	const url = call_url + "pay/" + data.data;
			// 	return res.json({ url });
			// } else {
			// 	return res.json({
			// 		key,
			// 		access_key: data.data,
			// 	});
			// }

			return res.json({ access_url: data.data, url: call_url, iframe });
		} catch (error) {
			console.error(error);
			return res.json({ message: error.message });
		}
	})
);

const PORT = 8000;

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));
