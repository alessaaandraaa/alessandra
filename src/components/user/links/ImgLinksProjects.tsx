import Img from "./Img";
import yg from "@/assets/yg.png";
import sx from "@/assets/sx.png";
import ev from "@/assets/ev.png";
import ph from "@/assets/ph.png";
import pl from "@/assets/pl.png";
import the from "@/assets/the.png";
import bh from "@/assets/bh.png";

export default function ImgLinksProjects() {
  return (
    <div className="items-center relative group">
      <div className="grid grid-cols-7 gap-0.5 p-2 rounded-2xl z-10 bg-zinc-700/50">
        <Img
          imgLink={the}
          link="https://www.codebility.tech/home/kanban/b887bc11-3ec3-431c-8401-42bcc07b0257/54c16661-15e8-4623-b6fb-b175216384d6"
          name="Codebility"
        ></Img>
        <Img
          imgLink={sx}
          link="https://www.figma.com/design/8njf3dp82cvMu5GFkMD6Gf/TC-Website?node-id=0-1&p=f&t=ha8JHY1y1wdJ7zDK-0"
          name="TC Website Figma"
        ></Img>
        <Img
          imgLink={yg}
          link="https://docs.google.com/document/d/1CY_DCFLyHN_HlSc8V0ixeQVhwE5-0O66reQ99NdWbHg/edit?tab=t.0#heading=h.15r4pbix9cmd"
          name="TC Website System Doc"
        ></Img>
        <Img
          imgLink={pl}
          link="https://docs.google.com/document/d/1QCCDLB3mRh4t0DQNWm_QB_5z-G-iEzQc8Rc-tc7iKqk/edit?tab=t.1je5hsp08xj8"
          name="TC Website Features"
        ></Img>
        <Img
          imgLink={ev}
          link="https://fine-vision-100.notion.site/303b953516bc8066886af63f82639a77?v=303b953516bc808a805c000c66780404"
          name="TC Website Notion"
        ></Img>
        <Img
          imgLink={bh}
          link="https://docs.google.com/presentation/d/1EuxUQLtp3PuJ82CzxAaN9ip9M6fOczI2/edit?slide=id.g3b8ab5c2222_0_69#slide=id.g3b8ab5c2222_0_69"
          name="TC Website PPT"
        ></Img>
        <Img
          imgLink={ph}
          link="https://usc-cisco.github.io/philnits-mock/?fbclid=IwY2xjawQU9WFleHRuA2FlbQIxMQBzcnRjBmFwcF9pZAEwAAEeoQu_ZaAAfza9OJZAS_k9cRPFqtPZ_fbGTCcF-D4y4fIliFNww_9u32FYQWM_aem_--FI7OY603vjtA7Z_Lymvw"
          name="PhilNITS Mock Exam"
        ></Img>
      </div>
    </div>
  );
}
