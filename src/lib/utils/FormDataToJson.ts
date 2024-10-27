const FormDataToJson = (data: FormData) => {
	const dataToJson: { [x: string]: string } = {};
	for (const key of data.keys()) {
		dataToJson[key] = data.get(key)!.toString();
	}

	return dataToJson;
};
export default FormDataToJson;
