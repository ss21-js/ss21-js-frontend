import Joi from 'joi';
import { Address, Company, CreateJobDto, Student, University } from 'js-api-client';

export const germanJoiMessages: Joi.LanguageMessages = {
	'any.required': '{{#label}} ist ein Pflichtfeld',
	'string.alphanum': '{{#label}} darf nur aus alpha-numerischen Zeichen bestehen',
	'string.base': '{{#label}} muss eine Zeichenfolge sein',
	'string.base64': '{{#label}} muss eine Base64 Zeichenfolge sein',
	'string.creditCard': '{{#label}} muss eine Kreditkartennummer sein',
	'string.dataUri': '{{#label}} muss eine gültige Data-URL sein',
	'string.domain': '{{#label}} muss einen gültigen Domainnamen enthalten',
	'string.email': '{{#label}} muss eine gültige Email sein',
	'string.empty': '{{#label}} darf nicht leer sein',
	'string.guid': '{{#label}} muss eine gültige GUID sein',
	'string.hex': '{{#label}} darf nur aus Hexadezimal Zeichen bestehen',
	'string.hexAlign': 'In {{#label}} muss die hexadezimal decodierte Darstellung byteorientiert sein',
	'string.hostname': '{{#label}} muss ein gültiger Hostname sein',
	'string.ip': '{{#label}} muss eine gültige IP-Adresse mit {{#cidr}} CIDR sein',
	'string.ipVersion':
		'{{#label}} muss eine gültige IP-Adresse einer der Versionen {{#version}} mit {{#cidr}} CIDR sein',
	'string.isoDate': '{{#label}} muss ein Datum im ISO-Format sein',
	'string.isoDuration': '{{#label}} muss eine nach ISO 8601 gültige Dauer sein',
	'string.length': '{{#label}} muss {{#limit}} Zeichen lang sein',
	'string.lowercase': '{{#label}} darf nur aus Kleinbuchstaben bestehen',
	'string.max': '{{#label}} darf maximal {{#limit}} Zeichen lang sein',
	'string.min': '{{#label}} muss mindestens {{#limit}} Zeichen lang sein',
	'string.normalize': '{{#label}} muss im {{#form}} unicode Format formatiert sein.',
	'string.token': '{{#label}} darf nur aus alpha-numerischen Zeichen und Unterstrichen bestehen',
	'string.pattern.base': '{{#label}} mit dem Wert {:[.]} entspricht nicht dem Muster: {{#regex}}',
	'string.pattern.name': '{{#label}} mit dem Wert {:[.]} entspricht nicht {{#name}} Muster',
	'string.pattern.invert.base': '{{#label}} mit dem Wert {:[.]} entspricht dem invertierten Muster: {{#regex}}',
	'string.pattern.invert.name': '{{#label}} mit dem Wert {:[.]} entspricht dem invertierten {{#name}} Muster',
	'string.trim': '{{#label}} darf keine anführenden oder nachlaufenden Leerzeichen enthalten',
	'string.uri': '{{#label}} muss eine gültige URI sein',
	'string.uriCustomScheme':
		'{{#label}} muss eine gültige URI mit einem Schema das dem {{#scheme}} Muster entspricht sein',
	'string.uriRelativeOnly': '{{#label}} muss eine gültige relative URI sein',
	'string.uppercase': '{{#label}} darf nur aus Großbuchstaben bestehen',
	'array.min': '{{#label}} muss mindestens {{#limit}} Element enthalten',
};

export const addressSchema = Joi.object<Address>({
	street1: Joi.string().required().label('Straße'),
	street2: Joi.string().allow('').label('Adresszusatz'),
	city: Joi.string().required().label('Stadt'),
	zip: Joi.number().required().label('PLZ'),
	state: Joi.string().required().label('Bundesstaat'),
	country: Joi.string().required().label('Land'),
}).messages(germanJoiMessages);

export const companySchema = Joi.object<Company>({
	id: Joi.any(),
	name: Joi.string().min(3).required().label('Unternehmensname'),
	email: Joi.string().email({ tlds: false }).required().label('E-Mail'),
	companyInfo: Joi.string().required().max(500).label('Unternehmensinfo'),
	homepage: Joi.string().allow('').label('Homepage'),
	address: addressSchema,
	companyHeaderImageUrl: Joi.string().allow(''),
	companyProfileImageUrl: Joi.string().allow(''),
}).messages(germanJoiMessages);

export const universitySchema = Joi.object<University>({
	name: Joi.string().min(3).required().label('Name'),
	homepage: Joi.string().allow('').label('Homepage'),
}).messages(germanJoiMessages);

export const studentSchema = Joi.object<Student>({
	id: Joi.any(),
	firstName: Joi.string().min(3).required().label('Vorname'),
	lastName: Joi.string().min(3).required().label('Nachname'),
	description: Joi.string().allow('').label('Beschreibung'),
	yearsOfExperience: Joi.number().label('Jahre Erfahrung'),
	address: addressSchema,
	email: Joi.string().email({ tlds: false }).required().label('E-Mail'),
	githubUrl: Joi.string().allow('').label('Github Nutzername'),
	university: universitySchema,
	semester: Joi.number().min(1).max(20).required().label('Semester'),
	languages: Joi.array().min(1).required().label('Sprachen'),
	skills: Joi.array().min(1).required().label('Programmiersprachen'),
	workArea: Joi.string().required().label('Arbeitsbereich'),
	workBasis: Joi.number().required().label('Anstellungsart'),
	fromAvailable: Joi.date().required().label('Verfügbar ab'),
	toAvailable: Joi.date().required().label('Verfügbar bis'),
	identities: Joi.any(),
	jobsMarkedIds: Joi.any(),
}).messages(germanJoiMessages);

export const createJobDtoSchema = Joi.object<CreateJobDto>({
	jobName: Joi.string().min(10).max(50).required().label('Jobtitel'),
	jobDescription: Joi.string().min(30).required().label('Beschreibung'),
	workArea: Joi.string().required().label('Arbeitsbereich'),
	workBasis: Joi.number().required().label('Anstellungsart'),
	languages: Joi.array().min(1).required().label('Sprachen'),
	jobQualifications: Joi.array().min(1).required().label('Qualifikationen'),
	skills: Joi.array().min(1).required().label('Programmiersprachen'),
	from: Joi.date().required().label('Von'),
	to: Joi.date().required().label('Bis'),
	contactMail: Joi.string().email({ tlds: false }).required().label('E-Mail'),
}).messages(germanJoiMessages);
