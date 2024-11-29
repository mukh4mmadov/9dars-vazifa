import { AiOutlineCaretUp } from "react-icons/ai";
import logo from "./assets/logo.svg";
import norma from "./images/norma.png";
import ProgressCircles from "./components/ProgressCircles";
import RechartGrafik from "./components/GraphDisplay";
import grafika from "./images/grafika.png";
import ShaxsKasbiyXususiyat from "./components/PersonalSkills";
import PsixalogikDiagnostik from "./components/PsychologicalAssessment";
import Kompeten from "./components/CompetenceDisplay";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState([]);
  const [datas, setDatas] = useState([]);

  const chart2 = 78;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://trello.vimlc.uz/get-personal-info"
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  console.log(user);

  useEffect(() => {
    fetch("https://trello.vimlc.uz/knowlodge")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        setDatas([data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="font-Rubic py-20">
      <header className="container mt-5 md:mt-10 flex items-center justify-between">
        <img
          src={logo}
          alt="logo"
          className="w-[114px] md:w-[214px]"
          loading="lazy"
        />

        <h1 className="text-center text-2xl md:text-[32px] leading-9 font-semibold w-1/2">
          Республика Ассессмент маркази онлайн платформаси
        </h1>
        <div className="relative">
          <h1 className="text-[56px] md:text-[72px] leading-[86px] font-semibold text-[#0956AF]">
            78
          </h1>
          <p className="flex items-center absolute text-[#28A264] text-[26px] md:text-[32px] -top-2 -right-12">
            <span>
              <AiOutlineCaretUp />
            </span>
            2
          </p>
        </div>
      </header>

      <section className="container flex justify-between mt-16 py-4">
        <div className="flex gap-10">
          <img src={user.imageUrl} loading="lazy" alt="img face 3x4 rasm" />
          <div className="flex flex-col justify-between">
            <h1 className="text-32px md:text-[44px] flex flex-col leading-[52px]">
              <span className="font-semibold">{user.firstName}</span>
              {user.lastName}
            </h1>
            <div className="flex justify-between text-[#495057] text-base md:text-xl">
              <div className="flex flex-col">
                <p>Тугилган сана:</p>
                <p>Тугилган жой:</p>
              </div>
              <div className="flex flex-col  ">
                <p>{user.birthday}</p>
                <p>{user.address}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <p className="text-lg flex flex-col">
                Буйи:
                <span className="font-medium">{user.height}</span>
              </p>
              <p className="text-lg flex flex-col">
                Вазни:
                <span className="font-medium">{user.weight}</span>
              </p>
              <p className="text-lg flex flex-col">
                Индекс:
                <span className="font-medium">{user.index}</span>
              </p>
              <img src={norma} loading="lazy" alt="" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-1/3">
          <div className="text-base md:text-xl">
            <span className="text-[#495057]">Лавозими:</span>
            <p className="text-[#212529]">{user.position}</p>
          </div>
          <div className="text-base md:text-xl">
            <span className="text-[#495057]">Номзод:</span>
            <p className="text-[#212529]">{user.candidate}</p>
          </div>
        </div>
      </section>

      <main className="py-4 bg-[#F7F7F7] ">
        <div className="container flex flex-col">
          <div className="flex items-center gap-2 w-full">
            <div className="w-[13px] h-[43px] bg-[#0956AF]"></div>
            <h1 className="text-3xl md:text-[36px] font-semibold">
              Билим тести
            </h1>
            <div className="h-1 flex-1 bg-[#DEE2E6]"></div>
          </div>
          <div className="w-full flex h-[322px] items-center gap-4 mt-5">
            <div className="w-1/2 h-full">
              <ProgressCircles />
            </div>
            <div>
              {datas.length > 0 &&
                datas.map(function (data) {
                  return (
                    <>
                      <RechartGrafik
                        data={data.lineChart.data}
                        labels={data.lineChart.labels}
                      />
                      <div>
                        <h1 className="text-[48px] text-[#0956AF] font-medium">
                          {data.lineChart.thanOthers}%
                        </h1>
                        <div className="w-[333px] h-[45px] rounded-lg bg-[#DEE2E6]">
                          <div
                            className="h-full rounded-lg"
                            style={{
                              width: `${chart2}%`,
                              backgroundColor: "#28A264",
                            }}
                          ></div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>

            <img src={grafika} alt="" />
          </div>
        </div>
      </main>

      <ShaxsKasbiyXususiyat />
      <PsixalogikDiagnostik />
      <Kompeten />
      <footer className="w-full container flex justify-center items-center py-10">
        <p className="text-xl leading-[31px]">Argos.uz 2024</p>
      </footer>
    </div>
  );
}

export default App;
