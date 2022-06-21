//import * as handler from './handler.js';
const handler = require('./handler')

//handler.addNoteHandler()
//handler.getAllNotesHandler()
const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: handler.addNoteHandler,
    },
    {
        method: 'GET',
        path: './notes',
        handler: handler.getAllNotesHandler
    },
];

//export {routes};