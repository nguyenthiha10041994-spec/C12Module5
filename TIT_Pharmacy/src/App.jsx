
import { useEffect, useState } from "react";
import ThuocList from "./component/ThuocList";
import ThuocAdd from "./component/ThuocAdd";

function App() {
  const [trang, setTrang] = useState("list");
  const [lanCapNhat, setLanCapNhat] = useState(0);
  const [thongBao, setThongBao] = useState("");

  useEffect(() => {
    if (!thongBao) return;

    const timer = setTimeout(() => {
      setThongBao("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [thongBao]);

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
            <ThuocList
                key={lanCapNhat}
                onThemMoi={moTrangThem}
                thongBao={thongBao}
            />
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
