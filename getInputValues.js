const getInputValues = (idArray, isRequired = true) => {
  let isError = false;
  const values = {};
  let count = 0;
  idArray.map((data) => {
    let id = data;
    let property = data;
    if (typeof data == "object") {
      id = data[0];
      property = data[1];
    }

    const input = $(`#${id}`);
    const inputType = input.attr("type");
    let value =
      inputType == "checkbox" ? input.prop("checked")  : input.val();
    if (/^\d+$/.test(value)) {
      value = parseFloat(value);
    }
    let changedValue = value;
    if (inputType == "number" && value == "") {
      changedValue = 0;
    }
    values[property] = changedValue;
    if (isRequired) {
      if (value === "") {
        $(`#${id}`).addClass("border-danger");
        $(`#${id}ErrorMessage`).removeClass("d-none");
        isError = true;
      } else {
        $(`#${id}`).removeClass("border-danger");
        $(`#${id}ErrorMessage`).addClass("d-none");
      }
    }
    count++;
  });
  return isError === true ? false : values;
};
