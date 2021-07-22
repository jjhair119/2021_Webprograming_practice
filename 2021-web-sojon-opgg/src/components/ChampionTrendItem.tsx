import React from "react";
import styled from "styled-components";
import ChampionImage from "../assets/icon-champion-n.png";
import ChampionTier1 from "../assets/icon-champtier-1.png";
import ChampionTier2 from "../assets/icon-champtier-2.png";
import ChampionTier3 from "../assets/icon-champtier-3.png";
import ChampionTier4 from "../assets/icon-champtier-4.png";
import ChampionTier5 from "../assets/icon-champtier-5.png";
import ChampionTierUP from "../assets/icon-championtier-up.png";
import ChampionTierDOWN from "../assets/icon-championtier-down.png";
import ChampionTierEQUAL from "../assets/icon-championtier-stay.png";
import Champion32 from "../assets/champion32.png";
import ChampionTrendHeader from "./ChampionTrendHeader";

interface ChampionTrendItemProps {
    championID: number;
    change: number;
    position: string[];
    win: string;
    pick: string;
    tier: number;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader)`
    background-color: white;

    & > .rank {
        font-style: italic;
        font-size: 20px;
    }

    & > .champ {
        display: flex;
        align-items: center;
        text-align: left;

        & > .change {
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            padding: 0 10px;

            & > img {
                margin-right: 2px;
            }
        }

        & > .champ-img {
            width: 32px;
            height: 32px;
            background-image: url(${Champion32});
            background-position: 0 0;
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

const ChampionTrendItem: React.FC = () => {
    return(
         <ChampionTrendItemWrapper className="List-item champion">
            <div className="rank">1</div>
            <div className="champ">
                <div className="change">
                    <img src={ChampionTierEQUAL}/>
                    0
                </div>
                <div className="champ-img">

                </div>
                <div className="champ-desc">
                    <div>아트록스</div>
                    <div>탑</div>
                </div>
            </div>
            <div className="win">50.23%</div>
            <div className="pick">14.21%</div>
            <div className="tier">
                <img src={ChampionTier1} alt=""/>
            </div>
        </ChampionTrendItemWrapper>
         
    )
}

export default ChampionTrendItem;