import Joi from 'joi';
import { Address, Company } from 'js-api-client';

export const addressSchema = Joi.object<Address>({
	street1: Joi.string().required(),
	street2: Joi.string().allow(''),
	city: Joi.string().required(),
	zip: Joi.string().required(),
	state: Joi.string().required(),
	country: Joi.string().required(),
});

export const companySchema = Joi.object<Company>({
	id: Joi.any(),
	name: Joi.string().min(3).max(20).required(),
	email: Joi.string().email({ tlds: false }).required(),
	companyInfo: Joi.string().allow(''),
	homepage: Joi.string().allow(''),
	address: addressSchema,
	companyHeaderImageUrl: Joi.string().allow(''),
	companyProfileImageUrl: Joi.string().allow(''),
});
