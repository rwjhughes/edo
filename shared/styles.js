import { css, Global, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: ${props => props.p || "0"};
  align-items: ${props => props.alignItems || ""};
  max-width: ${props => props.mw || "none"};
  justify-content: ${p => p.justify || "flex-start"};
`

export const FlexRowWrapped = styled(FlexRow)`
  flex-wrap: wrap;
`

export const FlexGrow = styled.div`
  flex-grow: 1;
`

export const SliderWrap = styled.div`
  padding: ${props => props.p || "0"};
  width: 48%;
  font-size: ${props => props.fontSize || "13px"};
`

export const Slider = styled.input`
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: ${p => p.big ? "24" : "18"}px; /* Specified height */
  border-radius: 5px;
  background: #a8b6ca; /* background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;

  /* Mouse-over effects */
  &:hover {
    opacity: 1; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: ${p => p.big ? "24" : "18"}px; /* Set a specific slider handle width */
    height: ${p => p.big ? "36" : "18"}px; /* Slider handle height */
    border-radius: 18px;
    border-right: ${p => p.big ? "2px" : "1px"} solid rgb(71, 72, 151);
    border-top: ${p => p.big ? "2px" : "1px"}  solid rgb(71, 72, 151);
    background: #66518a; /* background */
    cursor: pointer; /* Cursor on hover */
  }

  &::-webkit-slider-thumb:active{
    background: #671ca5;
  }
`

export const DesktopNotesGap = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
`

export const NoteGap = styled(DesktopNotesGap)`
  flex-grow: 1;
  flex-basis: 100%;
`
export const NoteIndent = styled(DesktopNotesGap)`
  display: inline-block;
  width: ${p => p.w};
`

export const AudioPlayer = styled.audio`
  width: 100%;
`

export const Note = styled.div`
  height: 80px;
  width: 80px;
  background: rgb(255, 181, 97);
  display: inline-block;
  border-right: 2px solid rgb(156, 156, 156);
  border-top: 1px solid rgb(170, 170, 170);
  border-radius: 15px;

  span {
    opacity: 0.5;
    font-size: 12px;
    padding: 8px;
  }

  &:active {
    background: rgb(255, 145, 72);
  }

  &:nth-of-type(5n){
    background: #9492d5;
    &:active, &.current {
      background: #8381bd;
    }
  }


  &:nth-of-type(5n+1){
    background: #c1e5f0;
    &:active, &.current {
      background: #a1cfdf;
    }
  }


  &:nth-of-type(5n+2){
    background: #75bea0;
    &:active, &.current {
      background: #69a88f;
    }
  }


  &:nth-of-type(5n+3){
    background: #f3b42c;
    &:active, &.current {
      background: #e2a41d;
    }
  }


  &:nth-of-type(5n+4){
    background: #e66e88;
    &:active, &.current {
      background: #ce627a;
    }
  }


`



