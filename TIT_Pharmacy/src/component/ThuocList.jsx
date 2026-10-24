
import { useEffect, useState } from "react";
import {
    getDanhSachThuoc,
    getDanhSachDanhMuc
} from "../service/thuocService";

function ThuocList({ onThemMoi, thongBao }) {
    const [danhSachThuoc, setDanhSachThuoc] = useState([]);
    const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
    const [tenNhap, setTenNhap] = useState("");
    const [danhMucNhap, setDanhMucNhap] = useState("");
    const [tenTim, setTenTim] = useState("");
    const [danhMucTim, setDanhMucTim] = useState("");
    const [loi, setLoi] = useState("");

    useEffect(() => {
        const capNhatDuLieu = async () => {
            try {
                const [thuoc, danhMuc] = await Promise.all([
                    getDanhSachThuoc(),
                    getDanhSachDanhMuc()
                ]);

                setDanhSachThuoc(thuoc);
                setDanhSachDanhMuc(danhMuc);
                setLoi("");
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
                setLoi("Không tải được dữ liệu. Hãy kiểm tra máy chủ.");
            }
        };

        capNhatDuLieu();
    }, []);

    const dinhDangNgay = (ngay) => {
        if (!ngay) return "";

        const [nam, thang, ngayTrongThang] = ngay.split("-");
        return `${ngayTrongThang}/${thang}/${nam}`;
    };

    const timKiem = () => {
        setTenTim(tenNhap.trim());
        setDanhMucTim(danhMucNhap);
    };

    const danhSachHienThi = danhSachThuoc
        .filter((thuoc) =>
            (thuoc.tenThuoc || "")
                .toLowerCase()
                .includes(tenTim.toLowerCase())
        )
        .filter((thuoc) =>
            danhMucTim === "" ||
            String(thuoc.danhMucId) === danhMucTim
        )
        .sort((a, b) =>
            (a.tenThuoc || "").localeCompare(
                b.tenThuoc || "",
                "vi"
            )
        );

    return (
        <div className="container">
            <h2 className="page-title">TIT PHARMACY</h2>
            <h4 className="text-center mb-4">QUẢN LÝ SẢN PHẨM</h4>

            {thongBao && (
                <div
                    key={thongBao}
                    className="success-message-wrapper"
                    role="status"
                >
                    <p className="message success-message">
                        {thongBao}
                    </p>

                    <div className="success-progress-track">
                        <div className="success-progress-bar" />
                    </div>
                </div>
            )}

            <div className="toolbar">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập tên sản phẩm cần tìm..."
                    value={tenNhap}
                    onChange={(e) => setTenNhap(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") timKiem();
                    }}
                />

                <select
                    className="form-select"
                    value={danhMucNhap}
                    onChange={(e) => setDanhMucNhap(e.target.value)}
                >
                    <option value="">Tất cả thể loại</option>

                    {danhSachDanhMuc.map((dm) => (
                        <option key={dm.id} value={dm.id}>
                            {dm.tenDanhMuc}
                        </option>
                    ))}
                </select>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={timKiem}
                >
                    Tìm kiếm
                </button>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={onThemMoi}
                >
                    + Thêm sản phẩm
                </button>
            </div>

            {loi && (
                <div className="alert alert-danger">
                    {loi}
                </div>
            )}

            {danhSachHienThi.length === 0 ? (
                <p className="no-result">Không có kết quả</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Thể loại</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Ngày nhập sản phẩm</th>
                        </tr>
                        </thead>

                        <tbody>
                        {danhSachHienThi.map((thuoc, index) => {
                            const dm = danhSachDanhMuc.find(
                                (item) =>
                                    String(item.id) ===
                                    String(thuoc.danhMucId)
                            );

                            return (
                                <tr key={thuoc.id}>
                                    <td>{index + 1}</td>
                                    <td>{thuoc.maThuoc}</td>
                                    <td>{thuoc.tenThuoc}</td>
                                    <td>{dm?.tenDanhMuc || ""}</td>
                                    <td>{thuoc.soLuong}</td>
                                    <td>
                                        {Number(thuoc.gia).toLocaleString("vi-VN")} đ
                                    </td>
                                    <td>{dinhDangNgay(thuoc.ngayNhap)}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ThuocList;
