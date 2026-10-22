import { useState } from "react";
import ThuocList from "./component/ThuocList";
import ThuocAdd from "./component/ThuocAdd";

function App() {
  const [trang, setTrang] = useState("list");
  const [lanCapNhat, setLanCapNhat] = useState(0);
  const [thongBao, setThongBao] = useState("");

  const themThanhCong = () => {
    setLanCapNhat((prev) => prev + 1);
    setThongBao("Thêm mới thành công!");
    setTrang("list");
  };

  const moTrangThem = () => {
    setThongBao("");
    setTrang("add");
  };

  const quayLaiDanhSach = () => {
    setTrang("list");
  };

  return (
      <div>
        {trang === "list" ? (
            <>
              {thongBao && (
                  <div className="container mt-3 mb-0">
                    <div
                        className="alert alert-success alert-dismissible"
                        role="alert"
                    >
                      {thongBao}
                      <button
                          type="button"
                          className="btn-close"
                          aria-label="Đóng"
                          onClick={() => setThongBao("")}
                      />
                    </div>
                  </div>
              )}

              <ThuocList
                  key={lanCapNhat}
                  onThemMoi={moTrangThem}
              />
            </>
        ) : (
            <ThuocAdd
                onQuayLai={quayLaiDanhSach}
                onThemThanhCong={themThanhCong}
            />
        )}
      </div>
  );
}

export default App;