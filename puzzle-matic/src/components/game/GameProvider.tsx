'use client';

import React, { createContext, useEffect, useState } from "react";
import { GameData, GameState } from "./GameData";

export const GameContext = createContext({} as GameData);

export default function GameProvider({ src, children }: { src: string, children: React.ReactNode }) {

    const [data, setData] = useState<GameData>({
        state: GameState.Init,
        puzzles: [],
        character: null,
        final: {
            title: '',
            message: '',
            speech: '',
            image: ''
        }
    });

    // switch state to execute each next step
    useEffect(() => {
        console.log(`State: ${GameState[data.state]}`, data);
        switch (data.state) {
            case GameState.Init:
                setData({ ...data, state: GameState.Loading });
                break;
            
                case GameState.Loading:
                fetch(src)
                    .then(response => response.json())
                    .then(json => setData({ ...data, ...json, state: GameState.Ready }))
                    .catch(error => { console.error(error); setData({ ...data, state: GameState.Error })});
                break;
            
            case GameState.Error:
                break;
            
            case GameState.Ready:
                break;
        }

    }, [data.state]);

    return (<GameContext.Provider value={data}>{children}</GameContext.Provider>);
}