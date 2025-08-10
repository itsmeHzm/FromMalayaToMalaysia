import { useRef, Suspense, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { timelineData } from "../data/timelineData";


const stateImages = {
  Sarawak: [
    {
      src: "1947_penentangan_penyerahan.jpeg",
      caption: "Demonstrasi rakyat Sarawak menentang British. Foto ini kemudiannya menjadi lambang gerakan Anti-penyerahan Sarawak.",
    },
    {
      src: "16_September_1963_Sarawak_Sertai_Malaysia.jpg",
      caption: "Ketua Menteri Sarawak yang pertama, Tan Sri Datuk Amar Stephen Kalong Ningkan, membaca Proklamasi Kemerdekaan Sarawak.",
    },
    {
      src: "1962_Suruhanjaya_Cobbold_Ditubuhkan.jpg",
      caption: "Suruhan Jaya Cobbold terdiri daripada  The Commission Chaiman The Former Governer Of The Bank Of Englad Honourable Lord Cameron  Cobbold , Sir Anthony Abell Former Governer of Sarawak  , Sir David Waltherson former Chief Secretary of Malaya  , Tan Sri Wong Paw Nee  Chief Minister of Penang dan Tun Mohammad Ghazalie bin Shafie Permenant Secretary to the Minister of Foreign Affair",
    },
    {
      src: "penyerahan_Sarawak.jpg",
      caption: "Wakil-wakil Sarawak di Lapangan Terbang Kuching pada 12 Julai 1963 selepas pulang dari London, di mana mereka menandatangani perjanjian bersejarah untuk membentuk Malaysia dan menamatkan pemerintahan kolonial.",
    },
    {
      src: "Rosli_Dhobi.jpg",
      caption: "Rosli Dhobi",
    },
    {
      src: "Stephen_Kalong.jpg",
      caption: "Stephen Kalong Ningkan",
    },
    {
      src: "Abdul_rahman_yaakub.jpg",
      caption: "Tun Abdul Rahman Ya’kub",
    },
    {
      src: "Tun_Temenggong_Jugah_Barieng.jpg",
      caption: "Tun Temenggong Jugah Barieng",
    },
    {
      src: "Awang_Rambli bin_Amit.jpeg",
      caption: "Awang Rambli bin Amit",
    },
  ],
    Sabah: [
      {
      src: "16_September_1963_Pembentukan_Malaysia.jpg",
      caption: "Laungan Merdeka telah dilaungkan sebanyak 3 kali",
    },
    {
      src: "1961_Idea_Penubuhan_Malaysia_Dicadangkan.jpg",
      caption: "Penubuhan Malaysia akhirnya berlaku pada 16 September 1963",
    },
    {
      src: "31_Ogos_1963 _Sabah_Merdeka.jpg",
      caption: "Sabah mencapai kemerdekaan daripada British pada 31 Ogos 1963",
    },
    {
      src: "Tun_Datu_Mustapha_Datu_Harun.jpg",
      caption: "Tun Datu Mustapha Datu Harun",
    },
    {
      src: "Tun_Muhammad_Fuad_Stephens.jpg",
      caption: "Tun Muhammad Fuad Stephens (Donald Stephens)",
    },
    {
      src: "OKK_Sedomon_Gunsanad.jpg",
      caption: "OKK Sedomon Gunsanad",
    },
    {
      src: "Tun_Sakaran_Dandai.jpeg",
      caption: "Tun Sakaran Dandai",
    },
  ],
  Labuan: [
    {
      src: "bandar_labuan.jpg",
      caption: "Bandar Labuan",
    },
  ],
  Perlis: [
    {
      src: "Tuanku_Syed_Putra_Jamalullail.jpg",
      caption: "Tuanku Syed Putra Jamalullail",
    },
    {
      src: "Syed_Hassan_Aidid.jpg",
      caption: "Syed Hassan Aidid",
    },
  ],
  Kedah: [
    {
      src: "Tunku_Abdul_Rahman_Putra_Al-Haj.jpg",
      caption: "Tunku Abdul Rahman Putra Al-Haj",
    },
    {
      src: "Syed_Omar_bin_Syed_Abdullah_Shahabuddin.jpg",
      caption: "Syed Omar bin Syed Abdullah Shahabuddin",
    },
    {
      src: "Dr._Mahathir_Mohamad.jpg",
      caption: "Dr. Mahathir Mohamad",
    },
  ],
  Perak: [
    {
      src: "1946_Penentangan_terhadap_Malayan_Union.jpg",
      caption: "1946 Penentangan terhadap Malayan Union di Perak",
    },
    {
      src: "Tun_Dr._Abdul_Wahab.jpg",
      caption: "Tun Dr. Abdul Wahab",
    },
    {
      src: "Sultan_Yusuf_Izzuddin_Shah.jpg",
      caption: "Sultan Yusuf Izzuddin Shah",
    },
    {
      src: "Abdul_Aziz_Ishak.jpg",
      caption: "Abdul Aziz Ishak",
    },
    {
      src: "Ahmad_Boestamam.jpg",
      caption: "Ahmad Boestamam",
    },
  ],
  Pulau_Pinang: [
    {
      src:"Dato_Sir_Haji_Mohamed_Eusoffe_Abdoolcader.jpg",
      caption:"Dato Sir Haji Mohamed Eusoffe Abdoolcader",
    },
    {
      src:"Abdul_Khalid_bin_Awang_Osman.jpg",
      caption:"Abdul Khalid bin Awang Osman",
    },
    {
      src:"Ahmad_Boestamam.jpg",
      caption:"Ahmad Boestamam",
    },
  ],
  Selangor: [
    {
      src:"Dato_Onn_Jaafar.jpg",
      caption:"Dato Onn Jaafar",
    },
    {
      src:"Tun_Dr_Ismail_Abdul_Rahman.jpeg",
      caption:"Tun Dr. Ismail Abdul Rahman",
    },
    {
      src:"Tun_Abdul_Razak_Hussein.jpg",
      caption:"Tun Abdul Razak Hussein",
    },
    {
      src:"Abdul_Samad_smail.jpg",
      caption:"Abdul Samad Ismail",
    }
  ],
  Putrajaya: [
    {
      src:"putrajaya3.jpg",
      caption:"Pada tahun 1995, YAB Perdana Menteri, Dato’ Seri Dr Mahathir bin Mohamad telah menyempurnakan Majlis Pelancaran Putrajaya di Sepang, Selangor",
    },
    {
      src:"putrajaya.jpg",
      caption:"Pejabat Perdana Menteri",
    },
    {
      src:"putrajaya2.jpg",
      caption:"Putrajaya menjadi simbol kemajuan, perancangan bandar dan identiti Malaysia moden pasca-kemerdekaan.",
    },
  ],
 Negeri_Sembilan: [
    {
      src:"Tuanku_Abdul_Rahman_ibni_Almarhum_Tuanku_Muhammad.jpg",
      caption:"Tuanku Abdul Rahman ibni Almarhum Tuanku Muhammad",
    },
    {
      src:"Dr_Burhanuddin_al_Helmy.jpg",
      caption:"Dr. Burhanuddin al-Helmy",
    },
    {
      src:"Dato_Abdul_Malek_Yusuf.jpg",
      caption:"Dato Abdul Malek Yusuf",
    },
  ],
  Melaka: [
    {
      src:"Melaka_Merdeka.jpeg",
      caption:"Pemuda UMNO menunggang motorsikal mengarak YTM Tunku Abdul Rahman Putra, Ketua Menteri Persekutuan Tanah Melayu dan Rombongan Kemerdekaan yang disambut meriah di sepanjang jalan dari Lapangan Terbang Batu Berendam hingga ke Padang Banda Hilir, Melaka pada 20 Februari 1956, sekembali daripada menandatangani Perjanjian Kemerdekaan Persekutuan Tanah Melayu di London.",
    },
    {
      src:"Tun_Ghafar_Baba.jpg",
      caption:"Tun Ghafar Baba",
    },
  ],
  Johor: [
    {
      src:"1946_Penubuhan_UMNO.jpg",
      caption:" Pertubuhan kebangsaan Melayu Bersatu (UMNO) telah tertubuh dengan rasminya di Istana Besar Johor, Johor Baharu pada 11 Mei 1946",
    },
    {
      src:"Sultan_Ibrahim_ibni_Sultan_Abu_Bakar.jpg",
      caption:"Sultan Ibrahim ibni Sultan Abu Bakar",
    },
    {
      src:"Tan_Sri_Abdul_Hamid_Jumat.jpg",
      caption:"Tan Sri Abdul Hamid Jumat",
    },
  ],
  Pahang: [
    {
      src:"1955_Pilihan_Raya_Umum_Pertama.jpg",
      caption:"perhimpunan rakyat semasa pilihan raya umum atau aktiviti politik awal UMNO — mencerminkan semangat penyertaan politik rakyat, termasuk rakyat Pahang, dalam menyokong pergerakan menuju kemerdekaan",
    },
    {
      src:"Sultan_Abu_Bakar.jpeg",
      caption:"Sultan Abu Bakar Ri'ayatuddin Al-Mu'azzam Shah Ibni Almarhum Sultan Abdullah Al-Mu'tassim Billah Shah",
    },
  ],
  Terengganu: [
    {
      src:"Sultan_Ismail_Nasiruddin_Shah.jpg",
      caption:"Sultan Ismail Nasiruddin Shah",
    },
  ],
  Kelantan: [
    {
      src:"1946_Penolakan_Malayan_Union.jpg",
      caption:"1946 Penolakan Malayan Union",
    },
    {
      src:"Sultan_Yahya_Petra.jpg",
      caption:"Sultan Yahya Petra",
    },
    {
      src:"Dato_Asri_Muda.jpg",
      caption:"Dato Asri Muda",
    },
    {
      src:"Sultan_Ibrahim_ibni_Sultan_Muhammad_IV.jpeg",
      caption:"Sultan Ibrahim ibni Sultan Muhammad IV",
    },
  ],
  Kuala_Lumpur: [
    {
      src:"1946_Kongres_Melayu_Se_Malaya_Pertama.jpg",
      caption:"1946 - Kongres Melayu SeMalaya Pertama",
    },
    {
      src:"1955_Pilihan_Raya_Persekutuan_Pertama.jpg",
      caption:"1955 - Pilihan Raya Persekutuan Pertama",
    },
    {
      src:"Rombongan_London.jpeg",
      caption:"Rombongan Merdeka ke London. Berdiri dari kiri ke kanan: Dato' Abdul Razak bin Hussein, Encik  Abdul Aziz Majid, Kolonel H.S. Lee, Dato' Mohd Seth bin Mohd Said, YTM Tunku Abdul Rahman Putra, Datuk Panglima Bukit Gantang Haji Abdul Wahab bin Toh Muda Abdul Aziz, Dr. Ismail bin Abdul Rahman, Nik Ahmad Kamil. Berdiri di belakang sebelah kiri: Encik Abdul Kadir bin Shamsuddin (Setiausaha wakil Raja-raja) dan T.H. Tan (Setiausaha Perikatan).",
    },
    {
      src:"Kepulangan_TAR.png",
      caption:"Gambar menunjukkan Tunku Abdul Rahman Putra Al-Haj sedang dialu-alukan oleh Encik Abdul Aziz bin Ishak dan orang ramai.",
    },
    {
      src:"1957_Merdeka.jpg",
      caption:"Tunku Abdul Rahman Putra Al-Haj mengumumkan kemerdekaan Tanah Melayu daripada British pada 31 Ogos 1957 di Stadium Merdeka.",
    },
    {
      src:"Watikah_pemasyhuran_Malaysia.jpeg",
      caption:"Watikah pemasyhuran Malaysia yang ditandatangani oleh Perdana Menteri, YTM Tunku Abdul Rahman Putra Al-Haj pada 16 September 1963.",
    },
    {
      src:"Tunku_Abdul_Rahman_Putra_Al-Haj.jpg",
      caption:"Tunku Abdul Rahman Putra Al-Haj",
    },
    {
      src:"Tun_H.S_Lee.jpeg",
      caption:"Tun H.S. Lee",
    },
    {
      src:"Tun_V.T_Sambanthan.jpg",
      caption:"Tun V.T. Sambanthan",
    },
    {
      src:"Dato_Onn_Jaafar.jpg",
      caption:"Dato Onn Jaafar",
    },
    {
      src:"Ishak_Haji_Muhammad.jpeg",
      caption:"Ishak Haji Muhammad",
    },
    
  ],
  // Add more states
};



// KL Scene
const KualaLumpurScene = () => {
  const { scene } = useGLTF("/models/kl_model.glb");
  const ref = useRef();
  return <primitive object={scene} ref={ref} scale={0.0025} position={[0, -1.2, 0]} />;
};

// Penang Scene
const PulauPinangScene = () => {
  const { scene } = useGLTF("/models/penang_model.glb");
  const ref = useRef();
  return <primitive object={scene} ref={ref} scale={0.005} position={[0, -1.2, 0]} />;
};

const TimelinePanel = ({ selectedState, onClose, resetZoom }) => {

  const [selectedImage, setSelectedImage] = useState(null);

  const stateName = selectedState?.name;
  const images = stateImages[stateName] || [];

  const history = timelineData[stateName] || "No data available.";

  const historyText = Array.isArray(history)
    ? history
        .map(entry => {
          const detailLines = Array.isArray(entry.detail)
            ? entry.detail.join('\n') // join array of strings line by line
            : entry.detail.toString().replace(/\s+/g, ' ').trim(); // fallback if it's a single string

          return `${entry.title}\n\n${detailLines}\n`;
        })
        .join("\n")
    : history;

  const handleClose = () => {
    if (resetZoom) resetZoom();
    if (onClose) onClose();
  };

  return (
    <motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(10px)",
    color: "white",
    zIndex: 100,
    overflowY: "auto",
    pointerEvents: "auto",
    display: "flex",
    flexDirection: "column",
  }}
>
  {/* Close Button */}
  <div style={{ alignSelf: "flex-end", padding: "20px" }}>
    <button
      onClick={handleClose}
      style={{
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "28px",
        cursor: "pointer",
      }}
      aria-label="Close"
    >
      ×
    </button>
  </div>

  {/* State Name */}
  <h2
    style={{
      fontSize: "28px",
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "capitalize",
      marginBottom: "20px",
    }}
  >
    {stateName?.replace(/_/g, " ") || "State"}
  </h2>

  {/* KL / Penang*/}
{["Kuala_Lumpur", "Pulau_Pinang"].includes(stateName) ? (
  <div style={{ width: "100%", height: "100%", position: "relative" }}>
    
    {/* Canvas Section */}
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <ambientLight intensity={6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        {stateName === "Kuala_Lumpur" && <KualaLumpurScene />}
        {stateName === "Pulau_Pinang" && <PulauPinangScene />}
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.4} />
    </Canvas>

    {/* BELOW Canvas: Flex layout (text left, images right) */}
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "30px 60px",
        gap: "40px",
        background: "black",
        flexWrap: "wrap",
      }}
    >
      {/* Text Section (Left) */}
      <div
        style={{
          flex: "1",
          minWidth: "300px",
          color: "#fff",
          fontSize: "16px",
          fontFamily: "monospace",
          lineHeight: 1.6,
        }}
      >
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{ whiteSpace: "pre-line" }}
        />
      </div>

      {/* Images Section (Right) */}
      <div style={{ flex: "1", minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Fullscreen preview */}
    {selectedImage && (
      <div
        onClick={() => setSelectedImage(null)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "300vh",
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop:"20px",
          alignItems: "center",
          zIndex: 9999,
          cursor: "pointer",
          overflowY: "auto",
        }}
      >
        <img
          src={`/images/${selectedImage.src}`}
          alt={selectedImage.caption}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        />
        <p style={{ marginTop: "20px", color: "#fff", fontSize: "20px" }}>
          {selectedImage.caption}
        </p>
        <p style={{ color: "#ccc", fontSize: "14px" }}>
          (Click anywhere to close)
        </p>
      </div>
    )}
  </div>
) : stateName === "Putrajaya" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Johor" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
  ) : stateName === "Sarawak" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
    ) : stateName === "Sabah" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
  ) : stateName === "Pahang" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Kedah" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Kelantan" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Melaka" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Negeri_Sembilan" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Perak" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Perlis" ? (
 <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Selangor" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Labuan" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : stateName === "Terengganu" ? (
  <div
      style={{
        padding: "30px 60px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* Left: History Text */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <TypeAnimation
          key={selectedState?.uuid}
          sequence={[historyText, 1000]}
          wrapper="span"
          cursor={true}
          repeat={0}
          style={{
            whiteSpace: "pre-line",
            lineHeight: 1.6,
            fontFamily: "monospace",
            fontSize: "18px",
            textAlign: "left",
          }}
        />
      </div>

      {/* Right: Image Gallery */}
      <div style={{ flex: 1, minWidth: "300px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => setSelectedImage(img)}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
            >
              <img
                src={`/images/${img.src}`}
                alt={img.caption}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </div>
          ))}
        </div>

        {/* Fullscreen Image Preview */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "300vh",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              paddingTop:"20px",
              alignItems: "center",
              zIndex: 9999,
              cursor: "pointer",
              overflowY: "auto",
            }}
          >
            <img
              src={`/images/${selectedImage.src}`}
              alt={selectedImage.caption}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}
            />
            <p
              style={{
                marginTop: "20px",
                color: "#fff",
                fontSize: "20px",
                textAlign: "center",
                maxWidth: "80%",
              }}
            >
              {selectedImage.caption}
            </p>
            <p
              style={{ color: "#ccc", fontSize: "14px", marginTop: "8px" }}
            >
              (Click anywhere to close)
            </p>
          </div>
        )}
      </div>
    </div>
) : (
    <div style={{ padding: "30px 60px" }}>
      <TypeAnimation
        key={selectedState?.uuid}
        sequence={[historyText, 1000]}
        wrapper="span"
        cursor={true}
        repeat={0}
        style={{
          whiteSpace: "pre-line",
          lineHeight: 1.6,
          fontFamily: "monospace",
          fontSize: "18px",
        }}
      />
    </div>
  )}
</motion.div>

  );
};

export default TimelinePanel;
