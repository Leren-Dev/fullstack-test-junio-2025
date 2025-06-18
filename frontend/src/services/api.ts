import axios from "axios";

export const getCustomerNameById = async (id: string) => {
  try {
    const response = await axios.get(`/customers/get_name/${id}`);

    if (response?.data?.name) {
      const name = response.data.name;
      return name || "";
    }
  } catch (error) {
    console.error("Error fetching customer name:", error);
    return null;
  }
};
