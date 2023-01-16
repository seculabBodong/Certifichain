import Navbar from "../../components/Login.css";
export function Login() {
  return (
    // <>
    //   <h1>Selamat datang kembali</h1>
    //   <text>
    //     Silahkan login untuk dapat menggunakan fitur lengkap, yahaayuuk!
    //   </text>
    // </>
    <div className="App">
      <div className="appAside">
        <div className="logoContainer">{/* logo */}</div>
        <div className="mainContainer">
          <div className="textContainer">
            <span className="title">Selamat datang kembali</span>
            <span className="secondary">
              Silahkan login untuk dapat menggunakan fitur lengkap, yahaayuuk!
            </span>
          </div>
        </div>
      </div>
      <div className="appForm"></div>
    </div>
  );
}
