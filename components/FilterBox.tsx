import React, { FC } from "react";
import {makeStyles} from '@material-ui/core';

interface IFilterBoxPropsType {
    options: string[],
    selected: string[],
    selectTopicFilters: (e: (prev: string[]) => string[]) => void
}

const useStyles = makeStyles({
    listItem: {
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0',
    },
    filterList: {
        color: '#4b4b4b',
        fontSize: '16px',
        padding: '5px 0',
        '& label': {
            marginLeft: '10px',
        },
    },
})

const FilterBox:FC <IFilterBoxPropsType> = ({options, selected, selectTopicFilters}) => {

    const classes = useStyles();

    const handleClick = (option: string) => {
        if (selected.includes(option))
            selectTopicFilters((prev: string[]) => prev.filter(val => val !== option))
        else
            selectTopicFilters((prev: string[])  => prev.concat([option]))
    }

    return (
        <div className={classes.listItem}>
            {options.map((opt: string) => (
                <div className={classes.filterList} key={opt}>
                    <input
                        name={opt}
                        type='checkbox'
                        checked={selected.includes(opt)}
                        onChange={() => handleClick(opt)}
                    />
                    <label htmlFor={opt}>{opt}</label>
                </div>
            ))}
        </div>
    );
}

export default FilterBox;
