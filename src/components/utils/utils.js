function all_values_array({ newarr, arr }) {
	for (let i = 0; i < arr.length; i++) {
		if (is_array(arr[i])) {
			all_values_array({ newarr, arr: arr[i] });

		} else if (is_obj(arr[i])) {
			all_values_object({ newarr, obj: arr[i] });
		} else {

			newarr.push(arr[i]);
		}
	}
}

function is_array(val) {
	return Object.prototype.toString.call(val) === "[object Array]";
}
function is_obj(val) {
	return Object.prototype.toString.call(val) === "[object Object]";
}


function all_values_object({ newarr, obj }) {

	const obj_val = Object.values(obj);

	for (let i = 0; i < obj_val.length; i++) {

		if (is_array(obj_val[i])) {
			all_values_array({ newarr, arr: obj_val[i] });

		} else if (is_obj(obj_val[i])) {
			all_values_object({ newarr, obj: obj_val[i] });

		} else {
			newarr.push(obj_val[i]);
		}
	}

}

function getAllNestedValues(obj) {
	let newarr = [];
	all_values_object({ newarr: newarr, obj: obj });
	return newarr;
}

const export_obj = {
    getAllNestedValues : getAllNestedValues
}

export default export_obj;