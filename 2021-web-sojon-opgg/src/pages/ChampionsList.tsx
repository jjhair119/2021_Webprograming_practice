import axios from "axios";
import classNames from "classnames";
import React from "react";
import styled from "styled-components";
import Champion from "../components/Champion";
import ChampionModel from "../models/ChampionModel";
import ChampionImage from "../assets/icon-champion-p.png";
import ChampionImageN from "../assets/icon-champion-n.png";
import ChampionTrendItem from "../components/ChampionTrendItem";
import ChampionTrendHeader from "../components/ChampionTrendHeader";
import ChampionTrendToolbar from "../components/ChampionTrendToolbar";
import ChampionTrendModel from "../models/ChampionTrendModel";

interface ChampionListProps{

}

interface ChampionListState{
    allChampions: ChampionModel[]
    champions: ChampionModel[]
    type: string
    text: string

    trendChampions: ChampionTrendModel[];
    trendType: string;
    trendPosition: string;
}

const ChampionListPageWrapper = styled.div`
    width: 1080px;
    margin: 0 auto;
    margin-top: 40px;
    display: flex;
`

// List of champion page
export default class ChampionsList extends React.Component<ChampionListProps, ChampionListState> {

    constructor(props: ChampionListProps){
        super(props);

        this.state = {
            allChampions: [],
            champions: [],
            type: "ALL",
            text: "",

            trendChampions: [],
            trendType: "tier",
            trendPosition: "top",
        }
    }

    async componentDidMount(){
        const response = await axios.get("http://opgg.dudco.kr/champion");
        const allChampions = response.data.map((data: any) => 
            new ChampionModel({
                id: data.id, 
                name: data.name, 
                key: data.key, 
                position: data.position
            })
        );

        const trendChampions = await this.getTrendList("tier");

        this.setState({
            allChampions,
            champions: allChampions,
            trendChampions,
        });
    }

    onChangeType = (type: string) => () => {
        console.log("onChangeType");
        this.setState({
            type: type,
            champions: this.filterChampions(type),
        });
    }

    onChangeInput = (text: string) => {
        console.log("onChangeInput");
        this.setState({
            text: text,
            champions: this.searchChampion(text),
        });
    }

    filterChampions = (type: string) => {
        document.querySelectorAll("input")[1].value = ""; 
        switch(type){
            case "TOP": return this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1);
            case "JUG": return this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1);
            case "MID": return this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1);
            case "ADC": return this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1);
            case "SUP": return this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1);
            case "ROTE": return this.state.allChampions;
            default: return this.state.allChampions;
        }
    }

    searchChampion = (text: string) => {
        console.log("searchChampion");
        var temp;
        switch(this.state.type){
            case "TOP": temp = this.state.allChampions.filter(c => c.position!!.indexOf("탑") > -1); break;
            case "JUG": temp = this.state.allChampions.filter(c => c.position!!.indexOf("정글") > -1); break;
            case "MID": temp = this.state.allChampions.filter(c => c.position!!.indexOf("미드") > -1); break;
            case "ADC": temp = this.state.allChampions.filter(c => c.position!!.indexOf("바텀") > -1); break;
            case "SUP": temp = this.state.allChampions.filter(c => c.position!!.indexOf("서포터") > -1); break;
            case "ROTE": temp = this.state.allChampions; break;
            default: temp = this.state.allChampions; break;
        }
        if(text === ""){
            return temp;
        }
        return temp.filter(c => c.name!!.indexOf(text) > -1);
    }

    onClickTrendType = (type: string) => async () => {
        const trendChampions = await this.getTrendList(type);
        this.setState({trendType: type, trendChampions, trendPosition: type === "tier" ? "top" : "all"});
    }

    onClickTrendPosition = (position: string) => async () => {
        const trendChampions = await this.getTrendList(this.state.trendType, position);
        this.setState({trendChampions, trendPosition: position});
    }

    getTrendList = async(type: string, position?:string) => {
        if(!position){
            if(type === "tier") position = "top"
            else position = "all"
        }
        
        const responseTrend = await axios.get(`http://opgg.dudco.kr/champion/trend/${type}/${position}`)
        const trendChampions = responseTrend.data.map((data: any) =>
            new ChampionTrendModel({
                id: data.id,
                rank: data.rank,
                change: data.change,
                name: data.name,
                position: data.position,
                winRate: data.winRate,
                pickRate: data.pickRate,
                banRate: data.banRate,
                tierIcon: data.tierIcon,
            })
        );
        return trendChampions;
    }

    render() {
        return(
            <ChampionListPageWrapper>
                {/* <div>챔피언 분석은 플래티넘 티어 이상의 랭크 게임만을 수집합니다</div> */}
                <ChampionsWrapper>
                    <div className="header">
                        <div className="item-wrap">
                            <div className={classNames("item", {select: this.state.type === "ALL"})} onClick={this.onChangeType("ALL")}>전체</div>
                            <div className={classNames("item", {select: this.state.type === "TOP"})} onClick={this.onChangeType("TOP")}>탑</div>
                            <div className={classNames("item", {select: this.state.type === "JUG"})} onClick={this.onChangeType("JUG")}>정글</div>
                            <div className={classNames("item", {select: this.state.type === "MID"})} onClick={this.onChangeType("MID")}>미드</div>
                            <div className={classNames("item", {select: this.state.type === "ADC"})} onClick={this.onChangeType("ADC")}>바텀</div>
                            <div className={classNames("item", {select: this.state.type === "SUP"})} onClick={this.onChangeType("SUP")}>서포터</div>
                            <div className={classNames("item rote", {select: this.state.type === "ROTE"})} onClick={this.onChangeType("ROTE")}>로테이션</div>
                        </div>
                        <input 
                            type = "text" 
                            placeholder = "챔피언 검색(가렌, ㄱㄹ, ...)"
                            onChange = {
                                (e) => {
                                    this.onChangeInput(e.target.value);
                                }
                            }
                        />
                    </div>
                    <div className="list">
                        {
                            this.state.champions.map((data) => 
                                <Champion
                                    key = {data.id}
                                    id = {Number(data.id) || 0}
                                    position = {data.position || []}
                                    name = {data.name || ""}
                                />
                            )
                            
                        }
                        {[1,2,3,4,5,6].map(() => <div style={{width: "82px", height: 0}}/>)}
                    </div>
                </ChampionsWrapper>
                <ChampionTrendWrapper>
                    <div className="trendHeader">
                        <div className="trendTitle">챔피언 순위</div>
                        <div className="trendItem-wrap">
                            <div className={classNames("trendItem", {select: this.state.trendType === "tier"})} onClick={this.onClickTrendType("tier")}><img src={this.state.trendType === "tier" ? ChampionImage : ChampionImageN}/>티어</div>
                            <div className="contour"></div>
                            <div className={classNames("trendItem", {select: this.state.trendType === "winratio"})} onClick={this.onClickTrendType("winratio")}>승률</div>
                            <div className="contour"></div>
                            <div className={classNames("trendItem", {select: this.state.trendType === "pickratio"})} onClick={this.onClickTrendType("pickratio")}>픽률</div>
                            <div className="contour"></div>
                            <div className={classNames("trendItem", {select: this.state.trendType === "banratio"})} onClick={this.onClickTrendType("banratio")}>밴률</div>
                        </div>
                    </div>
                    <div className="List">
                        <ChampionTrendToolbar>
                            <div className={classNames({select: this.state.trendPosition === "all"})} onClick={this.onClickTrendPosition("all")} hidden={this.state.trendType === "tier"}>전체</div>
                            <div className={classNames({select: this.state.trendPosition === "top"})} onClick={this.onClickTrendPosition("top")} >탑</div>
                            <div className={classNames({select: this.state.trendPosition === "jungle"})} onClick={this.onClickTrendPosition("jungle")} >정글</div>
                            <div className={classNames({select: this.state.trendPosition === "mid"})} onClick={this.onClickTrendPosition("mid")} >미드</div>
                            <div className={classNames({select: this.state.trendPosition === "adc"})} onClick={this.onClickTrendPosition("adc")} >바텀</div>
                            <div className={classNames({select: this.state.trendPosition === "support"})} onClick={this.onClickTrendPosition("support")} >서포터</div>
                        </ChampionTrendToolbar>
                        <ChampionTrendHeader>
                            <div>#</div>
                            <div>챔피언</div>
                            <div className={classNames({select: this.state.trendType === "winratio"})} hidden={this.state.trendType === "banratio"}>승률</div>
                            <div className={classNames({select: this.state.trendType === "pickratio"})} hidden={this.state.trendType === "banratio"}>픽률</div>
                            <div hidden={this.state.trendType !== "tier"}>티어</div>
                            <div hidden={this.state.trendType !== "banratio"}>밴률</div>
                        </ChampionTrendHeader>
                        {
                            this.state.trendChampions.map(c => 
                                <ChampionTrendItem
                                    championID={c.id}
                                    change={c.change}
                                    name={c.name}
                                    position={c.position}
                                    win={c.winRate}
                                    pick={c.pickRate}
                                    ban={c.banRate}
                                    tier={c.tierIcon}
                                    rank={c.rank}
                                    type={this.state.trendType}
                                />
                            )
                        }
                    </div>
                </ChampionTrendWrapper>
            </ChampionListPageWrapper>
        )
    }
}

const ChampionsWrapper = styled.div`
    width: 605px;
    border-right: 1px solid #e9eff4;

    & > .header{
        background-color: white;
        display: flex;
        justify-content: space-between;
        padding-left: 17px;
        padding-right: 8px;
        border-bottom: 1px solid #e9eff4;

        & > .item-wrap{
            display: flex;

            & > .item{
                line-height: 51px;
                padding: 0 8px;
                color: rgba(0, 0, 0, .6);
                cursor: pointer;
                font-size: 14px;

                &.select{
                    box-shadow: 0px -3px 0px 0px #5383e8 inset;
                    color: #5383e8;
                    font-weight: bold;
                }

                &.rote{
                    color: #5383e8;
                }
            }

        }

        & > input {
            margin: 8px 0;
            padding: 10px 30px 10px 10px;
            border: none;
            background-color: #f7f7f7;
            font-size: 12px;
        }
    }

    & > .list{
        width: 564px;
        background-color: #f7f7f7;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 14px 20.5px;
    }
`

const ChampionTrendWrapper = styled.div`
    flex: 1;   
    background-color: white;

    & > .trendHeader {
        display: flex;
        padding: 0 17px;
        border-bottom: 1px solid #e9eff4;
        justify-content: space-between;
        font-size: 14px;

        & > .trendTitle {
            line-height: 51px;
            font-weight: bold;
            color: #222;
        }

        & > .trendItem-wrap {
            display: flex;
            align-items: center;

            & > .select{
                box-shadow: 0px -3px 0px 0px #5383e8 inset;
                color: #5383e8;
                font-weight: bold;
            }

            & > :not(.select){
                color: #777;
            }

            & > .trendItem {
                line-height: 51px;
                padding: 0 5px;
                cursor: pointer;
            }
            
            & > .contour {
                margin: 0 8px;
                padding: 0 1px;
                display: flex;
                height: 14px;
                border-left: 1px solid #f2f3f5;
            }

            & > :first-child > img {
                margin-right: 4px;
                width: 14px;
                height: 17px;
                vertical-align: middle;
                margin-top: -2px;
            }
        }
    }

    & > .List {
        background-color: #f7f7f7;
        padding: 20px;
    }
`