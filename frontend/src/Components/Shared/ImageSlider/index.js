import { useState } from "react"

import styled, { css } from 'styled-components';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

const Slider = styled.section`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledFaArrowAltCircleLeft = styled(FaArrowAltCircleLeft)`
    position: absolute;
    top: 50%;
    left: 32px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`;

const StyledFaArrowAltCircleRight = styled(FaArrowAltCircleRight)`
    position: absolute;
    top: 50%;
    right: 32px;
    font-size: 3rem;
    color: #000;
    z-index: 10;
    cursor: pointer;
    user-select: none;
`;

// const Image = styled.img`
//     width: 350px;
//     height: 250px;
//     border-radius: 10px;
// `;

// const ImgSlide = styled.div`
//     opacity: ${(props) => props.active ? "1" : "0"};
//     transition-duration: ${(props) => props.active ? "1s" : "1s ease"};
//     ${props => props.active && css`
//         transform: scale(1.08);
//     `}
// `;

// const ImgSlide = styled.div`
//     opacity: 1;
//     margin: 0px 12px;
//     transition-duration: ${(props) => props.active ? "1s" : "1s ease"};
//     ${props => props.active && css`
//         transform: scale(1.15);
//     `}
//     ${props => props.leftActive && css`
//         transform: scale(0.95);
//         transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
//     `}
//     ${props => props.rightActive && css`
//         transform: scale(0.95);
//         transition: right 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
//     `}
// `;

const ImgSlide = styled.div`
    transition: all 0.5s ease;
    margin: 0px 12px;

    ${props => props.active && css`
        transform: scale(1.15);
        height: 200px;
        width: 150px;
        line-height: 200px;
        left: 330px;
    `}

    ${props => props.leftActive && css`
        height: 180px;
        width: 130px;
        margin-top: 10px;
        left: 180px;
        line-height: 180px;
    `}
    ${props => props.leftEnter && css`
        opacity: 0;
        height: 150px;
        left: 370px;
        width: 110px;
        line-height: 150px;
        margin-top: 40px;
    `}
    ${props => props.leftEnterActive && css`
        opacity: 1;
        height: 180px;
        left: 500px;
        width: 130px;
        line-height: 180px;
        margin-top: 25px;
        transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
    `}


    ${props => props.rightActive && css`
        height: 180px;
        width: 130px;
        margin-top: 10px;
        left: 500px;
        line-height: 180px;
    `}
    ${props => props.rightEnterActive && css`

    `}  
    ${props => props.rightEnterActive && css`

    `} 
`;

const Image = styled.img`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(null);

    const length = slides.length;
  
    const nextSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
        setDirection('RIGHT');
    };
    
    const prevSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
        setDirection('LEFT');
    };
  
    if (!Array.isArray(slides) || slides.length <= 0) {
        return null;
    }
  
    return (
        <Slider>
            <StyledFaArrowAltCircleLeft onClick={prevSlide} />
            <StyledFaArrowAltCircleRight onClick={nextSlide} />
            <ImgSlide leftActive leftEnter={direction === 'LEFT'} leftEnterActive={direction === 'LEFT'} key={`left-${current}`}>
                <Image src={slides[(current) % length].image} alt='travel image'/>
            </ImgSlide>
            <ImgSlide active key={`center-${current}`}>
                <Image src={slides[(current + 1) % length].image} alt='travel image'/>
            </ImgSlide>
            <ImgSlide rightActive leftLeave={direction === 'LEFT'} leftLeaveActive={direction === 'LEFT'} key={`right-${current}`}>
                <Image src={slides[(current + 2) % length].image} alt='travel image'/>
            </ImgSlide>
            {/* {slides.map((slide, index) => {
                return (
                    <>
                        {current === ((index % length)) && (
                            <ImgSlide leftActive={index === current} key={`left-${index}`}>
                                <Image src={slide.image} alt='travel image'/>
                            </ImgSlide>
                        )}
                        {current === ((index + 1) % length) && (
                            <ImgSlide active={index + 1 === current} key={`center-${index}`}>
                                <Image src={slide.image} alt='travel image'/>
                            </ImgSlide>
                        )}
                        {current === ((index + 2) % length) && (
                            <ImgSlide rightActive={index + 2=== current} key={`right-${index}`}>
                                <Image src={slide.image} alt='travel image'/>
                            </ImgSlide>
                        )}
                    </>
                );
            })} */}
            {/* {slides.map((slide, index) => {
                return (
                    <ImgSlide active={index === current} key={index}>
                        {index === current && (
                            <Image src={slide.image} alt='travel image'/>
                        )}
                    </ImgSlide>
                );
            })} */}
        </Slider>
    );
  };
  
  export default ImageSlider;