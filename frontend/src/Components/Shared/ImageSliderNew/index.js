import React, { useState } from "react";

import styled, { css } from 'styled-components';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

// set carousel card heights
const level1Height = '250px';
const level1Width = '310px';
const level0Height = '340px';
const level0Width = '362px';

const levelM1Left = '690px';
const level0Left = '320px';
const level1Left = '0px';

const OuterContainer = styled.div`
    margin: 0px auto;
    width: 100%;
    height: 500px;
`;
const CarouselContainer = styled.div`
    position: absolute;
    width: 1000px;
    margin: 100px auto;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
`;

const ArrowIcon = styled.div`
    position: absolute;
    width: 30px;
    height: 30px;
    text-align: center;
    font-size: 25px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    color: #228291;
    line-height: 30px;
    margin-top: 175px;
    z-index: 1000;
    ${props => props.arrowLeft && css`
        left: -40px;
        right: initial;
    `}
    ${props => props.arrowRight && css`
        left: initial;
        right: -40px;
    `}
`;

const Image = styled.img`
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
    border-radius: 10px;
`;

const StyledGrid = styled.div`
    .left-enter {
        opacity: 0;
        left: ${level0Left} - ${level1Width};
        height: ${level1Height} - 30;
        width: ${level1Width} - 20;
        line-height: ${level1Height} - 30;
        margin-top: 40px;
    }
    
    .left-enter.left-enter-active {
        opacity: 1;
        left: ${level0Left};
        height: ${level1Height};
        width: ${level1Width};
        line-height: ${level1Height};
        margin-top: 25px;
        transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
    }
    
    .left-exit {
        opacity: 1;
        left: ${levelM1Left};
        height: ${level1Height};
        width: ${level1Width};
        line-height: ${level1Height};
        margin-top: 25px;
    }
    
    .left-exit.left-exit-active {
        left: ${levelM1Left} + ${level1Width} + 20;
        opacity: 0;
        height: ${level1Height} - 30;
        line-height: 120px;
        margin-top: 40px;
        width: ${level1Width} - 20;
        transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
    }
    
    .right-enter {
        opacity: 0;
        left: ${levelM1Left} + ${level1Width};
        height: ${level1Height} - 30;
        width: ${level1Width} - 20;
        line-height: ${level1Height} - 30;
        margin-top: 40px;
    }
    
    .right-enter.right-enter-active {
        left: ${levelM1Left};
        opacity: 1;
        height: ${level1Height};
        margin-top: 25px;
        line-height: ${level1Height};
        width: ${level1Width};
        transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
    }
    
    .right-exit {
        left: ${level0Left};
        height: ${level1Height};
        opacity: 1;
        margin-top: 25px;
        line-height: ${level1Height};
        width: ${level1Width};
    }
    
    .right-exit.right-exit-active {
        left: ${level0Left} - ${level1Width};
        opacity: 0;
        height: ${level1Height} - 30;
        width: ${level1Width} - 20;
        line-height: ${level1Height} - 30;
        margin-top: 40px;
        transition: left 1s, opacity 1s, height 1s, width 1s, margin-top 1s, line-height 1s;
    }
`;

const ItemSection = styled.div.attrs(props => ({
    // className: props.className,
}))`
    width: 200px;
    text-align: center;
    color: white;
    font-size: 40px;
    position: absolute;
    transition: height 1s, width 1s, left 1s, margin-top 1s, line-height 1s, background-color 1s;
    
    &.level-1 {
        height: ${level1Height};
        width: ${level1Width};
        line-height: ${level1Height};
        left: ${levelM1Left};
        margin-top: 60px;
    }
    
    &.level0 {
        height: ${level0Height};
        width: ${level0Width};
        line-height: ${level0Height};
        left: ${level0Left};
        z-index: 9999;
    }
    
    &.level1 {
        height: ${level1Height};
        width: ${level1Width};
        line-height: ${level1Height};
        margin-top: 60px;
        left: ${level1Left};
    }

    &.level-2 {
        opacity: 0
    }
    
    &.level2 {
        opacity: 0
    }
`;

const ImageSliderNew = (props) => {
    const [active, setActive] = useState(props.active);
    const [direction, setDirection] = useState('right');
    // const nodeRef = React.useRef(null);

    const getImages = () => {
        const { slides } = props;
        let items = [];
        let level;

        // get previous, current and next node
        for (let i = active - 1; i < active + 2; i++) {
            let index = i;
            if (i < 0) {
                index = slides.length + i;
            } else if (i >= slides.length) {
                index = i % slides.length;
            }
            level = active - i;
            items.push(
                <CSSTransition
                    key={slides[index].image}
                    // nodeRef={nodeRef}
                    in={true}
                    classNames={direction}
                    // classNames={{
                    //     enter: `${direction}-enter`,
                    //     enterActive: `${direction}-enter-active`,
                    //     exit: `${direction}-exit`,
                    //     exitActive: `${direction}-exit-active`
                    // }}
                    timeout={500}
                >
                    <Item slide={slides[index]} direction={direction} level={level} />
                </CSSTransition>
            );
        }
        
        return <>{items}</>
    }
    
    const rightClick = () => {
        const { slides } = props;
        let newActive = active;
        newActive--;
        setActive(newActive < 0 ? slides.length - 1 : newActive);
        setDirection('right');
    }
    
    const leftClick = () => {
        const { slides } = props;
        let newActive = active;
        setActive((newActive + 1) % slides.length);
        setDirection('left');
    }
    
    return(
        <OuterContainer>
            <CarouselContainer>
                <ArrowIcon arrowLeft onClick={leftClick}>
                    <FaArrowAltCircleLeft />
                </ArrowIcon>
                <TransitionGroup appear={true} component={StyledGrid}>
                    {getImages()}
                </TransitionGroup>
                <ArrowIcon arrowRight onClick={rightClick}>
                    <FaArrowAltCircleRight />
                </ArrowIcon>
            </CarouselContainer>
        </OuterContainer>
    )
}

const Item = (props) => {
    const { slide, level, direction } = props;
    return(
        <ItemSection direction={direction} className={`level${level}`}>
            <Image src={slide.image} />
        </ItemSection>
    )
}


export default ImageSliderNew;