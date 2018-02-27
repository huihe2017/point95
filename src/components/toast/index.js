import React from 'react';
import {render} from 'react-dom';
import Model from './Model';

const div = document.createElement("div");
document.body.appendChild(div);
const container = render(<Model />, div);

const Toast = function (opt) {
    opt = opt || {};
    if (opt.msg) {
        container.show(opt);
    }
};

export default Toast;
