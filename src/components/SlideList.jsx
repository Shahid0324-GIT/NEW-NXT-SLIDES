import { useState } from "react";
import { v4 as uuid } from "uuid";
import { initialSlidesList } from "../data";
// console.log(initialSlidesList);

const SlideList = () => {
  const [slides, setSlides] = useState(initialSlidesList);
  const [currSlide, setCurrSlide] = useState(slides[0]);

  // const [changeHead, setChangeHead] = useState("");
  // const [changePara, setChangePara] = useState("");

  const [head, setHead] = useState(false);
  const [para, setPara] = useState(false);

  function addSlide() {
    const currIndex = slides.findIndex((slide) => slide.id === currSlide.id);

    const newSlide = {
      id: uuid(),
      heading: "Heading",
      description: "Description",
    };

    const spliceSlides = [...slides];
    spliceSlides.splice(currIndex + 1, 0, newSlide);
    setSlides(spliceSlides);
    setCurrSlide(newSlide);
  }

  const handleChangeHead = (e) => {
    const updatedSlides = slides.map((slide) =>
      slide.id === currSlide.id ? { ...slide, heading: e.target.value } : slide
    );
    setSlides([...updatedSlides]);
    setCurrSlide((prev) => {
      return {
        ...prev,
        heading: e.target.value,
      };
    });
  };

  const handleChangePara = (e) => {
    const updatedSlides = slides.map((slide) =>
      slide.id === currSlide.id
        ? { ...slide, description: e.target.value }
        : slide
    );
    setSlides([...updatedSlides]);
    setCurrSlide((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  return (
    <>
      <div className="container">
        <div className="slideshow-container">
          <button className="new-btn" type="button" onClick={addSlide}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              alt="add"
            />
            New
          </button>
          <ul className="slides-container">
            {slides.map((slide, i) => {
              const { heading, description, id } = slide;
              const index = i + 1;
              const listClass = currSlide.id === id ? "active slide" : "slide";
              return (
                <li
                  className={listClass}
                  key={id}
                  onClick={() => setCurrSlide(slide)}
                >
                  <p className="index">{index}.</p>
                  <div className="slide-card">
                    <h2 className="slide-head">{heading}</h2>
                    <p className="slide-para">{description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="big-slide-container">
          {head && (
            <input
              value={currSlide.heading}
              onChange={handleChangeHead}
              className="input-head"
              onBlur={() => setHead(!head)}
              autoFocus
            />
          )}
          {!head && (
            <h1 className="big-slide-head" onClick={() => setHead(!head)}>
              {currSlide.heading}
            </h1>
          )}
          {para && (
            <input
              value={currSlide.description}
              onChange={handleChangePara}
              className="input-para"
              onBlur={() => setPara(!para)}
              autoFocus
            />
          )}
          {!para && (
            <p className="big-slide-para" onClick={() => setPara(!para)}>
              {currSlide.description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SlideList;
