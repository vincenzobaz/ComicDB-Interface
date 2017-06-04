import React from 'react';
import {Server} from './../../ComicDBServer.js';
import Select from 'react-select';

const searchPublisher = input => {
    return Server.search({
        string: input,
        enabledTables: ['Publishers'],
        max_results: 50
    }).then(res => {
        const id_index = res[0].fieldNames.findIndex(n => n =='id');
        const name_index = res[0].fieldNames.findIndex(n => n == 'name');
        let options = res[0].data.map(entry => {
            return {
                value: entry[id_index],
                label: entry[name_index],
                //obj : entry
            };
        });
        return {options: options};
    });
};


export const PublisherPicker = ({curr, onChange}) => {
    return(
        <Select.Async
            loadOptions={searchPublisher}
            onChange={onChange}
            value={curr}
            />
    );
};
