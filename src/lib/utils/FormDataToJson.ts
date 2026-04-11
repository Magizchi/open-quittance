const FormDataToJson = (data: FormData) => {
	const dataToJson: Record<string, any> = {};

	for (const key of data.keys()) {
		const value = data.get(key)?.toString() ?? "";

		if (key.includes("[")) {
			const path = key.split(/\[|\]/).filter((part) => part !== "");
			let current = dataToJson;

			for (let i = 0; i < path.length; i += 1) {
				const part = path[i];
				const isLast = i === path.length - 1;

				if (isLast) {
					current[part] = value;
				} else {
					if (current[part] === undefined || typeof current[part] !== "object") {
						current[part] = {};
					}
					current = current[part];
				}
			}
		} else {
			dataToJson[key] = value;
		}
	}

	return dataToJson;
};
export default FormDataToJson;
