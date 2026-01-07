import Img from "./Img";
import rehtio from "@/assets/d.png";
import bin from "@/assets/roooo.png";
import ron from "@/assets/r.png";
import sundeh from "@/assets/sd.png";
import es from "@/assets/es.png";
import ven from "@/assets/v.png";
import stelle from "@/assets/st.png";
import paz from "@/assets/p.png";
import swan from "@/assets/bs.png";
import nobu from "@/assets/s.png";
import yuhh from "@/assets/g.png";
import mueh from "@/assets/m.png";
import fei from "@/assets/f.png";

export default function ImgLinks() {
  return (
    <>
      <div className="grid grid-cols-7 gap-0.5 p-2 rounded-2xl bg-zinc-700/50">
        <Img
          imgLink={rehtio}
          link="https://usc.instructure.com/login/canvas"
          name="Canvas"
        ></Img>
        <Img
          imgLink={bin}
          link="https://music.youtube.com/"
          name="Youtube Music"
        ></Img>
        <Img imgLink={ron} link="https://www.canva.com/" name="Canva"></Img>
        <Img
          imgLink={sundeh}
          link="https://open.spotify.com/"
          name="Spotify"
        ></Img>
        <Img
          imgLink={es}
          link="https://gemini.google.com/u/1/app?pageId=none"
          name="Gemini"
        ></Img>
        <Img
          imgLink={ven}
          link="https://mail.google.com/mail/u/3/#inbox"
          name="Gmail"
        ></Img>
        <Img imgLink={fei} link="https://chatgpt.com/" name="ChatGPT"></Img>
        <Img
          imgLink={stelle}
          link="https://www.messenger.com/t/8627017844058247"
          name="Messenger"
        ></Img>
        <Img
          imgLink={paz}
          link="https://www.facebook.com/?_rdc=2&_rdr#"
          name="Facebook"
        ></Img>
        <Img
          imgLink={swan}
          link="https://drive.google.com/drive/u/3/home"
          name="Google Drive"
        ></Img>
        <Img
          imgLink={nobu}
          link="https://github.com/alessaaandraaa"
          name="GitHub"
        ></Img>
        <Img
          imgLink={yuhh}
          link="https://www.youtube.com/"
          name="YouTube"
        ></Img>
        <Img
          imgLink={mueh}
          link="https://ismis.usc.edu.ph/Account/Login?ReturnUrl=%2F"
          name="ISMIS"
        ></Img>
      </div>
    </>
  );
}
