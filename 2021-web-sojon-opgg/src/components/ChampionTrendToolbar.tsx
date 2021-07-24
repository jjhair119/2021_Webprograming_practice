import React from "react";
import styled from "styled-components";
import {ChampionTrendItemCss} from "./ChampionTrendHeader";

const ChampionTrendToolbar = styled.div`
    ${ChampionTrendItemCss};

    border-left: 1px solid #e9eff4;

    & > div {
        flex: 1;
        border: 1px solid #e9eff4;
        padding: 10px 0;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;

        border-left: none;

        &.select {
            background-color: white;
            color: black;
        }

        &:not(.select) {
            background-color: none;
            color: #b6b6b6;
        }
    }
` 

export default ChampionTrendToolbar;