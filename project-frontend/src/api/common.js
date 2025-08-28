import { fetcherPost, fetcherPostFormData } from "../utils/axios";

export const endpoints = {
    key: "/",
    tyres: "tyres",
    oils: "oils",
    batterys: "batterys",
    tyresdetails: "tyres/tyresdetails",
    deletetyrebyid: "tyres/deletetyrebyid",
    togglestatus: "tyres/togglestatus",
    gettyre: "tyres/gettyre",
    oilsdetails: "oils/oilsdetails",
    deleteoilbyid: "oils/deleteoilbyid",
    togglestatusoils: "oils/togglestatusoils",
    deletebatterybyid: "batterys/deletebatterybyid",
    togglestatusbatterys: "batterys/togglestatusbatterys",
    batterysdetails: "batterys/batterysdetails"
};

// get portal tyre list
export async function tyres(formValue) {
  try {
    const newData = await fetcherPost([
      endpoints.key + endpoints.tyres,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

// get portal oils list
export async function oils(formValue) {
    try {
      const newData = await fetcherPost([
        endpoints.key + endpoints.oils,
        formValue,
      ]);
      return newData;
    } catch (error) {
      return error;
    }
  }


  // get portal battery list
export async function batterys(formValue) {
    try {
      const newData = await fetcherPost([
        endpoints.key + endpoints.batterys,
        formValue,
      ]);
      return newData;
    } catch (error) {
      return error;
    }
  }

   // get portal battery list
export async function tyresdetails(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.tyresdetails,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

//delete tyre by id
export async function deletetyrebyid(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.deletetyrebyid,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

//status tyre by id
export async function togglestatus(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.togglestatus,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

export async function gettyre(id) {
  try {
    const newData = await fetcherPostFormData(endpoints.key + endpoints.gettyre + "/" + id);
    return newData;
  } catch (error) {
    return error;
  }
}


//post engine oil
export async function oilsdetails(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.oilsdetails,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

//delete oil by id
export async function deleteoilbyid(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.deleteoilbyid,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}

//status oil by id
export async function togglestatusoils(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.togglestatusoils,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}


//delete batttery by id
export async function deletebatterybyid(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.deletebatterybyid,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}


//status battery by id
export async function togglestatusbatterys(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.togglestatusbatterys,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}


   // get portal battery list
export async function batterysdetails(formValue) {
  try {
    const newData = await fetcherPostFormData([
      endpoints.key + endpoints.batterysdetails,
      formValue,
    ]);
    return newData;
  } catch (error) {
    return error;
  }
}
