//'use strict';
//import Hapi from '@hapi/hapi';
const Hapi = require ('@hapi/hapi');
//import * as routes from './routes.js';
const routes = require ('./routes.js')
const handler = require('./handler')
// const notes = require('./notes')
let notes = [];
const {nanoid} = require('nanoid')


const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    //server.route(routes);

    server.route([
        {
            method: 'POST',
            path: '/notes',
            handler: (req, h) => {
                const {title, tags, body} = req.payload;
            
                const id = nanoid(16);
                const createAt = new Date().toISOString();
                const updateAt = createAt;
            
                const newNote = {
                    title, tags, body, id, createAt, updateAt,
                };
            
                notes.push(newNote);
            
                const isSuccess = notes.filter((note) => note.id === id).length > 0;
            
                if(isSuccess) {
                    const response = h.response({
                        status: 'Success',
                        message: 'Catatan berhasil ditambahkan',
                        data: {
                            noteId: id,
                        },
                    });
                    response.code(201);
                    return response;
                }
                const response = h.response({
                    status: 'fail',
                    message: 'Catatan gagal ditambahkan',
                });
                response.code(500);
                return response;
            },
        },
        {
            method: 'GET',
            path: '/notes',
            handler: () => ({
            
                    status: 'succes',
                    data: {
                        notes,
                    }
        })}
    ]);

    await server.start();
    console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();