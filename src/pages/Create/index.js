import React, { useState,Component,Fragment } from 'react';
import Papa from 'papaparse';
//import Book1 from '../../assets'
//import image1 from "../Create/image1";

// const readCSVFile = (file) => {
//   return new Promise((resolve, reject) => {
//     Papa.parsePromise(file, {
//       delimiter : ',',
//       header: true,
//       dynamicTyping: true,
//       complete: (results) => {
//         resolve(results.data);
//       },
//       error: (error) => {
//         reject(error);
//       }
//     });
//   });
// };

// const Edit_sertifikat = () => {
//   const [placeholderText, setPlaceholderText] = useState('');
//   const [buttonClicked, setButtonClicked] = useState(false);

//   const handleButtonClick = async () => {
//     try {
//       const file = Book1; // Ubah sesuai dengan lokasi file CSV Anda
//       const data = await readCSVFile(file);
//       if (data && data.length > 0) {
//         const placeholder = data[1].placeholder; // Ubah sesuai dengan kolom yang sesuai di file CSV Anda
//         setPlaceholderText(placeholder);
//       }
//       setButtonClicked(true);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Placeholder Otomatis</h1>
//       {!buttonClicked && <button onClick={handleButtonClick}>Baca CSV</button>}
//       {buttonClicked && <Placeholder text={placeholderText} />}
//     </div>
//   );
// };



// Allowed extensions for input file
//const allowedExtensions = ["csv"];

// const Edit_sertifikat = () => {
	
// 	// This state will store the parsed data
// 	const [data, setData] = useState([]);
	
// 	// It state will contain the error when
// 	// correct file extension is not used
// 	const [error, setError] = useState("");
	
// 	// It will store the file uploaded by the user
// 	const [file, setFile] = useState("");

// 	// This function will be called when
// 	// the file input changes
// 	const handleFileChange = (e) => {
// 		setError("");
		
// 		// Check if user has entered the file
// 		if (e.target.files.length) {
// 			const inputFile = e.target.files[0];
			
// 			// Check the file extensions, if it not
// 			// included in the allowed extensions
// 			// we show the error
// 			const fileExtension = inputFile?.type.split("/")[1];
// 			if (!allowedExtensions.includes(fileExtension)) {
// 				setError("Please input a csv file");
// 				return;
// 			}

// 			// If input type is correct set the state
// 			setFile(inputFile);
// 		}
// 	};
// 	const handleParse = () => {
		
// 		// If user clicks the parse button without
// 		// a file we show a error
// 		if (!file) return setError("Enter a valid file");

// 		// Initialize a reader which allows user
// 		// to read any file or blob.
// 		const reader = new FileReader();
		
// 		// Event listener on reader when the file
// 		// loads, we parse it and set the data.
// 		reader.onload = async ({ target }) => {
// 			const csv = Papa.parse(target.result, { header: true });
// 			const parsedData = csv?.data;
// 			const columns = Object.keys(parsedData[0]);
// 			setData(columns);
// 		};
// 		reader.readAsText(file);
// 	};

// 	return (
// 		<div>
// 			<label htmlFor="csvInput" style={{ display: "block" }}>
// 				Enter CSV File
// 			</label>
// 			<input
// 				onChange={handleFileChange}
// 				id="csvInput"
// 				name="file"
// 				type="File"
// 			/>
// 			<div>
// 				<button onClick={handleParse}>Parse</button>
// 			</div>
// 			<div style={{ marginTop: "3rem" }}>
// 				{error ? error : data.map((col,
// 				idx) => <div key={idx}>{col}</div>)}
// 			</div>
// 		</div>
// 	);
// };



import { Stage, Layer, Rect, Text, Image } from 'react-konva';
// import QRCode from 'react-qr-code';
import QRcode from 'qrcode';
import { QrCode } from '@mui/icons-material';
import { Button } from '@mui/material';

const value ="https://youtu.be/dQw4w9WgXcQ"
function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const panjang = 1080;
const lebar = 720;
const placeholder1 =[
  {
    x: panjang/7,
    y: lebar/16,
    width:720,
    height:100,
    stroke : 'black',
    strokeWidth : 5,
    draggable:false,
    id:'Perihal',
  },
  {
    x: panjang/7,
    y: lebar/4,
    width:720,
    height:100,
    stroke : 'black',
    strokeWidth : 5,
    draggable:false,
    id:'Nama',
  },
  {
    x: panjang/7,
    y: lebar/2.3,
    width:720,
    height:100,
    stroke : 'black',
    strokeWidth : 5,
    draggable:false,
    id:'Deskripsi',
  },
  {
    x: panjang/7,
    y: lebar/1.5,
    width:150,
    height:150,
    stroke : 'black',
    strokeWidth : 5,
    draggable:false,
    id:'ttd1',
  },
  {
    x: panjang/1.5,
    y: lebar/1.5,
    width:150,
    height:150,
    stroke : 'black',
    strokeWidth : 5,
    draggable:false,
    id:'ttd2',
  },
];

function Qrcode (){
  const [url,setUrl]=useState("");
  const [qr, setQr]=useState("");
  const GenerateQRcode = () => {
    QrCode.toDataURL(
      url,
      {
        width : 800,
        margin : 2,
        color : {
          dark :"black",
          light : "white",
        },
      },
      (err, url)=>{
        if (err) return console.error(err);

        console.log(url);
        setQr(url);
      }
    );
  };
  return(
    <div>
    <Button 
    variant='contained'
    onClick={GenerateQRcode}
    > donwload </Button>
    {qr && (
      <>
      <img src={qr}/>
      <Button
      variant='contained'
      color='success'
      href={qr}
      download="qrcode.png"
      >
        hahaha
      </Button>

      </>
    )}
    </div>
  );
}

export function Edit_sertifikat() {
  const [placeholder12,placeholders]=React.useState(placeholder1);
  const stageRef = React.useRef(null);



  const handleExport = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
    downloadURI(uri, 'stage.png');
    
    // <QRCode
    // size={256}
    // style={{ height: "auto", maxWidth: 120, width: 120 }}
    // value={value}
    // viewBox={`0 0 256 256`}
    // x={panjang/1.2}
    // y={lebar/1.2}
    // />
  };
  // const qrcode =() => {
  //   <div style={{ height: "100", margin: "0 auto", maxWidth: 150, width: "100%" }}>
  //   <QRCode
  //   size={256}
  //   style={{ height: "100", maxWidth: 200, width: 120 }}
  //   value={value}
  //   viewBox={`0 0 256 256`}
  //   x={panjang/1.2}
  //   y={lebar/1.2}
  //   />
  //   </div>
  // }
  return (
    <div>
    <Fragment>
    <button onClick={handleExport}>Click here to log stage data URL</button>
    {Qrcode()}
    {/* <div style={{ height: "500", margin: "0 auto", maxWidth: 150, width: "100%" }}>
      <QRCode
      size={500}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={value}
      viewBox={`0 0 256 256`}
      x={panjang/1.2}
      y={lebar/1.2}
      
      />
      </div> */}
    <Stage 
    width={panjang} 
    height={lebar}
    visible={true}
    opacity={10}
    ref={stageRef}
    >

    <Layer>

      <Rect
      width={panjang}
      height={lebar}
      //fill='white'
      stroke = 'black'
      strokeWidth = {5}
      />

      {/* <React.Fragment>
      <Image
      image={image1}
      width={panjang}
      height={lebar}
      />
      </React.Fragment> */}



      {placeholder12.map((placeholder1)=>{
        return(
          <Rect 
            x={placeholder1.x}
            y={placeholder1.y}
            width={placeholder1.width}
            height={placeholder1.height}
            stroke={placeholder1.stroke}
            strokeWidth={placeholder1.strokeWidth}
            draggable={placeholder1.draggable}
            id={placeholder1.id}
            fill='gray'
          />
        )
      })}

    {/* <div style={{ height: "100", margin: "0 auto", maxWidth: 150, width: "100%" }}>
      <QRCode
      size={256}
      style={{ height: "100", maxWidth: 200, width: 120 }}
      value={value}
      viewBox={`0 0 256 256`}
      x={panjang/1.2}
      y={lebar/1.2}
      />
      </div> */}

    </Layer>
  </Stage>
  </Fragment>

  <Fragment >
  {/* <div style={{ height: "100", margin: "0 auto", maxWidth: 150, width: "100%" }}>
      <QRCode
      size={256}
      style={{ height: "100", maxWidth: 200, width: 120 }}
      value={value}
      viewBox={`0 0 256 256`}
      x={panjang/1.2}
      y={lebar/1.2}
      />
      </div> */}
  </Fragment>
  </div>
);
};

//export default Edit_sertifikat