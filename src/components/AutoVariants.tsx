import React, { useEffect, useState } from 'react';

interface Suggestion {
    query: string
}

interface ApiResponse {
    status: string,
    data: Array<Suggestion>
}

const suggestionsCacheMap = new Map<string, Promise<ApiResponse>>();
const initialState: ApiResponse = {} as ApiResponse;

function useAutoInfo(value: string): ApiResponse {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        let isRaceCondition = false;

        setData(initialState);

        getSuggestionsByQuery(value)?.then((data) => {
            if (!isRaceCondition) {
                setData(data);
            }
        });
    }, [value]);

    return data;
}

function getSuggestions(query: string): Promise<ApiResponse> {
    // return fetch('https://web-search-autocomplete.p.rapidapi.com/autocomplete?region=us&language=en&query=' + value, {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': 'd0ea719350msh4c6d5686e24241fp1a1d96jsn6c93b9a09a38',
    //         'X-RapidAPI-Host': 'web-search-autocomplete.p.rapidapi.com'
    //     }
    // })

    // I used real api but for free it provides only 50 requests a month
    // if needed real api can be used with newly generated key
    return fetch('test.json')
        .then((res) => res.json())
        .then((respData) => {
            return respData;
        })
        .catch((e) => {
            suggestionsCacheMap.delete(query);
            console.log('Something went wrong. Reason: ' + e.message);
        })
}

function getSuggestionsByQuery(query: string) {
    if (!suggestionsCacheMap.has(query)) {
        suggestionsCacheMap.set(query, getSuggestions(query));
    }

    return suggestionsCacheMap.get(query);
}

function transFormText(query: string, value: string): React.ReactNode {
    let highlightText: string = '';

    for (let i = 0; i < value.length; i++) {
        if (query[i] === value[i]) {
            highlightText += query[i];
        } else {
            break;
        }
    }

    const otherText = query.substring(highlightText.length);

    return (
        <span><strong>{highlightText}</strong>{otherText}</span>
    )
}

function AutoVariants({value, updateInput}: {value: string, updateInput: Function}) {
    const variants: ApiResponse = useAutoInfo(value);

    return (
        <ul>
            {variants?.data?.map((variant: Suggestion, index: number) => 
                <li onClick={() => updateInput(variant.query)} key={index}>{transFormText(variant.query, value)}</li>)}
        </ul>
    );
}

export default AutoVariants;