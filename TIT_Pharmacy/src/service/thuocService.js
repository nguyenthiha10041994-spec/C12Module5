
import axios from "axios";

const API_THUOC = "http://localhost:8080/thuoc";
const API_DANH_MUC = "http://localhost:8080/danhMuc";

export const getDanhSachThuoc = async () => {
    const response = await axios.get(API_THUOC);
    return response.data;
};

export const getDanhSachDanhMuc = async () => {
    const response = await axios.get(API_DANH_MUC);
    return response.data;
};

export const themThuoc = async (thuoc) => {
    const response = await axios.post(API_THUOC, thuoc);
    return response.data;
};
