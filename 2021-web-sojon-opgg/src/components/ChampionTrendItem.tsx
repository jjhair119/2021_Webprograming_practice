import React from "react";
import styled from "styled-components";
import classNames from "classnames";

import ChampionTierUP from "../assets/icon-championtier-up.png";
import ChampionTierDOWN from "../assets/icon-championtier-down.png";
import ChampionTierEQUAL from "../assets/icon-championtier-stay.png";

import Champion32 from "../assets/champion32.png";
import ChampionTrendHeader from "./ChampionTrendHeader";

interface ChampionTrendItemProps {
    championID: number;
    change: number;
    name: string;
    position: string;
    win: string;
    pick: string;
    tier: string;
    rank: string;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader)`
    background-color: white;
    border: 1px solid #e9eff4;

    &:not(:last-child){
        border-bottom: none;
    }

    & > .rank {
        font-style: italic;
        font-size: 20px;
    }

    & > .champ {
        display: flex;
        align-items: center;
        text-align: left;

        & > .change {
            width: 40px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            padding: 0 10px;

            & > img {
                margin-right: 2px;
            }

            &.up {
                color : green;
            }

            &.down {
                color : red;
            }
        }

        & > .champ-img {
            width: 32px;
            height: 32px;
            background-image: url(${Champion32});
        }

        & > .champ-desc {
            font-size: 12px;
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & > :first-child {
                font-weight: bold;
            }
        }

    }
`

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = (props) => {

    const getTierChangeIcon = () => {
        if(props.change > 0) {
            return ChampionTierUP;
        }else if(props.change < 0){
            return ChampionTierDOWN;
        }else {
            return ChampionTierEQUAL;
        }
    }

    return(
         <ChampionTrendItemWrapper>
            <div className="rank">{props.rank}</div>
            <div className="champ">
                <div className={classNames("change", {up: props.change > 0, down: props.change < 0})}>
                    <img src={getTierChangeIcon()} alt=""/>
                    {Math.abs(props.change)}
                </div>
                <div className={`champ-img __spc32-${props.championID}`}>
                </div>
                <div className="champ-desc">
                    <div>{props.name}</div>
                    <div>{props.position}</div>
                </div>
            </div>
            <div className="win">{props.win}</div>
            <div className="pick">{props.pick}</div>
            <div className="tier">
                <img src={props.tier} alt=""/>
            </div>
        </ChampionTrendItemWrapper>
         
    )
}

export default ChampionTrendItem;