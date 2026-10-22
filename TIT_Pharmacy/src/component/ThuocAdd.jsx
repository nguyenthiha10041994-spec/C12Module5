import { useEffect, useState } from "react";
import {
    getDanhSachThuoc,
    getDanhSachDanhMuc,
    themThuoc
} from "../service/thuocService";

function ThuocAdd({ onQuayLai, onThemThanhCong }) {
    const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);

    const [thuoc, setThuoc] = useState({
        maThuoc: "",
        tenThuoc: "",
        danhMucId: "",
        gia: "",
        soLuong: "",
        ngayNhap: "",
        moTa: ""
    });

    const [loi, setLoi] = useState("");

    useEffect(() => {
        getDanhSachDanhMuc()
            .then((data) => setDanhSachDanhMuc(data))
            .catch((error) => {
                console.error("Lỗi tải danh mục:", error);
                setLoi("Không tải được danh mục sản phẩm.");
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setThuoc((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoi("");

        if (
            !thuoc.maThuoc.trim() ||
            !thuoc.tenThuoc.trim() ||
            !thuoc.danhMucId ||
            !thuoc.gia ||
            !thuoc.soLuong ||
            !thuoc.ngayNhap ||
            !thuoc.moTa.trim()
        ) {
            setLoi("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        const maThuoc = thuoc.maThuoc.trim();

        if (!/^PROD-\d{4}$/.test(maThuoc)) {
            setLoi("Mã sản phẩm phải có dạng PROD-XXXX, X là chữ số.");
            return;
        }

        if (
            !Number.isInteger(Number(thuoc.soLuong)) ||
            Number(thuoc.soLuong) <= 0
        ) {
            setLoi("Số lượng phải là số nguyên lớn hơn 0.");
            return;
        }

        if (
            !Number.isFinite(Number(thuoc.gia)) ||
            Number(thuoc.gia) <= 0
        ) {
            setLoi("Giá phải lớn hơn 0.");
            return;
        }

        const ngayHienTai = new Date();
        ngayHienTai.setHours(0, 0, 0, 0);

        const ngayNhap = new Date(`${thuoc.ngayNhap}T00:00:00`);

        if (ngayNhap > ngayHienTai) {
            setLoi("Ngày nhập không được lớn hơn ngày hiện tại.");
            return;
        }

        try {
            const danhSachThuoc = await getDanhSachThuoc();

            const maDaTonTai = danhSachThuoc.some(
                (item) =>
                    item.maThuoc.toLowerCase() === maThuoc.toLowerCase()
            );

            if (maDaTonTai) {
                setLoi("Mã sản phẩm đã tồn tại.");
                return;
            }

            await themThuoc({
                maThuoc: maThuoc,
                tenThuoc: thuoc.tenThuoc.trim(),
                danhMucId: Number(thuoc.danhMucId),
                gia: Number(thuoc.gia),
                soLuong: Number(thuoc.soLuong),
                ngayNhap: thuoc.ngayNhap,
                moTa: thuoc.moTa.trim()
            });

            onThemThanhCong();
        } catch (error) {
            console.error("Lỗi thêm sản phẩm:", error);
            setLoi("Thêm sản phẩm thất bại. Hãy kiểm tra máy chủ.");
        }
    };

    const ngayHomNay = [
        new Date().getFullYear(),
        String(new Date().getMonth() + 1).padStart(2, "0"),
        String(new Date().getDate()).padStart(2, "0")
    ].join("-");

    return (
        <div className="container mt-4 mb-5">
            <div className="card shadow-sm">
                <div className="card-header fw-bold">
                    Thêm mới sản phẩm
                </div>

                <div className="card-body">
                    <h3 className="text-center mb-4">
                        Thêm mới sản phẩm
                    </h3>

                    {loi && (
                        <div className="alert alert-danger" role="alert">
                            {loi}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Mã sản phẩm
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="maThuoc"
                                value={thuoc.maThuoc}
                                onChange={handleChange}
                                placeholder="PROD-0003"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Tên sản phẩm
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="tenThuoc"
                                value={thuoc.tenThuoc}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Thể loại
                            </label>
                            <select
                                className="form-select"
                                name="danhMucId"
                                value={thuoc.danhMucId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Chọn thể loại</option>
                                {danhSachDanhMuc.map((dm) => (
                                    <option key={dm.id} value={dm.id}>
                                        {dm.tenDanhMuc}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Giá</label>
                            <input
                                type="number"
                                className="form-control"
                                name="gia"
                                min="1"
                                value={thuoc.gia}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Số lượng</label>
                            <input
                                type="number"
                                className="form-control"
                                name="soLuong"
                                min="1"
                                step="1"
                                value={thuoc.soLuong}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Ngày nhập sản phẩm
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                name="ngayNhap"
                                max={ngayHomNay}
                                value={thuoc.ngayNhap}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                Mô tả sản phẩm
                            </label>
                            <textarea
                                className="form-control"
                                name="moTa"
                                rows="3"
                                value={thuoc.moTa}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >
                            Thêm mới
                        </button>

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onQuayLai}
                        >
                            Hủy
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ThuocAdd;